import prisma from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { evaluateUnsentText } from "@/lib/moderationRules";
import { unsentReplySchema } from "@/lib/validation";
import { UNSENT_MAX_THREAD_DEPTH } from "@/lib/constants";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ messageId: string }> },
) {
  const { messageId } = await params;
  const user = await requireUser();
  const parsed = unsentReplySchema.parse(await request.json());

  if (!process.env.DATABASE_URL) {
    return Response.json(
      { ok: false, error: "Database not configured. Add DATABASE_URL before replying." },
      { status: 503 },
    );
  }

  const message = await prisma.unsentMessage.findUnique({
    where: { id: messageId },
    select: { replyEnabled: true },
  });

  if (!message || !message.replyEnabled) {
    return Response.json({ ok: false, error: "Replies are disabled for this message." }, { status: 400 });
  }

  let depth = 1;
  if (parsed.parentReplyId) {
    const parent = await prisma.unsentReply.findUnique({
      where: { id: parsed.parentReplyId },
      select: { id: true, parentReplyId: true },
    });

    if (!parent) {
      return Response.json({ ok: false, error: "Parent reply not found." }, { status: 404 });
    }

    depth = parent.parentReplyId ? 3 : 2;
  }

  if (depth > UNSENT_MAX_THREAD_DEPTH) {
    return Response.json(
      { ok: false, error: "Replies may only go one level deep." },
      { status: 400 },
    );
  }

  const recentBodies = await prisma.unsentReply.findMany({
    where: { authorId: user.id },
    orderBy: { createdAt: "desc" },
    take: 5,
    select: { body: true, createdAt: true },
  });

  const moderation = evaluateUnsentText(parsed.body, {
    isTrustedUser: user.role === "trusted_user" || user.role === "moderator" || user.role === "admin",
    recentBodies: recentBodies.map((item: { body: string }) => item.body),
    cooldownActive:
      recentBodies[0] != null &&
      Date.now() - new Date(recentBodies[0].createdAt).getTime() < 30_000,
  });

  if (moderation.decision === "reject") {
    return Response.json({ ok: false, error: "Reply rejected by moderation rules." }, { status: 400 });
  }

  const status = moderation.decision === "pending" ? "pending" : "approved";

  const reply = await prisma.unsentReply.create({
    data: {
      messageId,
      authorId: user.id,
      parentReplyId: parsed.parentReplyId ?? null,
      body: parsed.body,
      status,
    },
  });

  await prisma.moderationLog.create({
    data: {
      targetType: "unsent_reply",
      targetId: reply.id,
      action: status === "approved" ? "auto_approve" : "queue_for_review",
      moderatorId: user.id,
      notes: moderation.flags.join(", "),
    },
  });

  return Response.json({ ok: true, data: { id: reply.id, status } });
}
