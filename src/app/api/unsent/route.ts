import prisma from "@/lib/prisma";
import { demoUnsentMessages } from "@/lib/demoContent";
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, RATE_LIMIT_DEFAULTS } from "@/lib/constants";
import { assertWithinRateLimit } from "@/lib/rateLimit";
import { evaluateUnsentText } from "@/lib/moderationRules";
import { requireUser } from "@/lib/auth";
import { unsentSchema } from "@/lib/validation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(Number(searchParams.get("limit") ?? DEFAULT_PAGE_SIZE), MAX_PAGE_SIZE);

  if (!process.env.DATABASE_URL) {
    return Response.json({
      ok: true,
      data: {
        items: demoUnsentMessages.slice(0, limit),
        nextCursor: null,
      },
    });
  }

  const messages = await prisma.unsentMessage.findMany({
    where: { status: "approved" },
    take: limit,
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    include: {
      replies: {
        where: { status: "approved" },
      },
      reactions: true,
    },
  });

  return Response.json({
    ok: true,
    data: {
      items: messages,
      nextCursor: null,
    },
  });
}

export async function POST(request: Request) {
  const user = await requireUser();
  const parsed = unsentSchema.parse(await request.json());

  assertWithinRateLimit({
    key: `unsent:${user.id}`,
    windowMs: RATE_LIMIT_DEFAULTS.windowMs,
    max: RATE_LIMIT_DEFAULTS.maxRequests,
  });

  if (!process.env.DATABASE_URL) {
    return Response.json(
      { ok: false, error: "Database not configured. Add DATABASE_URL before posting unsent messages." },
      { status: 503 },
    );
  }

  const recentMessages = await prisma.unsentMessage.findMany({
    where: { authorId: user.id },
    orderBy: { createdAt: "desc" },
    take: 5,
    select: { body: true, createdAt: true },
  });

  const moderation = evaluateUnsentText(parsed.body, {
    isTrustedUser: user.role === "trusted_user" || user.role === "moderator" || user.role === "admin",
    allowLinks: false,
    recentBodies: recentMessages.map((item: { body: string }) => item.body),
    cooldownActive:
      recentMessages[0] != null &&
      Date.now() - new Date(recentMessages[0].createdAt).getTime() < 30_000,
  });

  if (moderation.decision === "reject") {
    return Response.json(
      { ok: false, error: "Message rejected by moderation rules.", fieldErrors: { body: moderation.flags } },
      { status: 400 },
    );
  }

  const status = moderation.decision === "pending" ? "pending" : "approved";

  const message = await prisma.unsentMessage.create({
    data: {
      authorId: user.id,
      title: parsed.title ?? null,
      body: parsed.body,
      displayMode: parsed.displayMode,
      replyEnabled: parsed.replyEnabled,
      visibility: parsed.visibility,
      toneTag: parsed.toneTag ?? null,
      status,
    },
  });

  await prisma.moderationLog.create({
    data: {
      targetType: "unsent_message",
      targetId: message.id,
      action: status === "approved" ? "auto_approve" : "queue_for_review",
      moderatorId: user.id,
      notes: moderation.flags.join(", "),
    },
  });

  await prisma.auditEvent.create({
    data: {
      actorUserId: user.id,
      eventType: "unsent_message_created",
      entityType: "unsent_message",
      entityId: message.id,
      payloadJson: {
        status,
        flags: moderation.flags,
      },
    },
  });

  return Response.json({
    ok: true,
    data: {
      id: message.id,
      status,
    },
  });
}
