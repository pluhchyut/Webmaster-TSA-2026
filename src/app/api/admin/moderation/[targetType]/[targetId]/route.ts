import prisma from "@/lib/prisma";
import { canModerate } from "@/lib/permissions";
import { requireUser } from "@/lib/auth";
import { moderationActionSchema } from "@/lib/validation";

function resolveStatus(action: string) {
  switch (action) {
    case "approve":
      return "approved";
    case "reject":
      return "rejected";
    case "remove":
      return "removed";
    case "restore":
      return "approved";
    default:
      return null;
  }
}

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ targetType: string; targetId: string }>;
  },
) {
  const { targetType, targetId } = await params;
  const user = await requireUser();

  if (!canModerate(user)) {
    return Response.json({ ok: false, error: "Forbidden." }, { status: 403 });
  }

  const parsed = moderationActionSchema.parse(await request.json());

  if (!process.env.DATABASE_URL) {
    return Response.json(
      { ok: false, error: "Database not configured. Add DATABASE_URL before moderating content." },
      { status: 503 },
    );
  }

  const nextStatus = resolveStatus(parsed.action);

  switch (targetType) {
    case "unsent_message":
      await prisma.unsentMessage.update({
        where: { id: targetId },
        data: {
          status: (nextStatus as "approved" | "rejected" | "removed" | null) ?? undefined,
          featured:
            parsed.action === "feature" ? true : parsed.action === "unfeature" ? false : undefined,
        },
      });
      break;
    case "unsent_reply":
      await prisma.unsentReply.update({
        where: { id: targetId },
        data: {
          status: (nextStatus as "approved" | "rejected" | "removed" | null) ?? undefined,
        },
      });
      break;
    case "memory":
      await prisma.memory.update({
        where: { id: targetId },
        data: {
          status: (nextStatus as "approved" | "rejected" | "removed" | null) ?? undefined,
        },
      });
      break;
    case "memory_comment":
      await prisma.memoryComment.update({
        where: { id: targetId },
        data: {
          status: (nextStatus as "approved" | "rejected" | "removed" | null) ?? undefined,
        },
      });
      break;
    case "issue":
      await prisma.issue.update({
        where: { id: targetId },
        data: {
          status: (nextStatus as "approved" | "rejected" | "removed" | null) ?? undefined,
        },
      });
      break;
    default:
      return Response.json({ ok: false, error: "Unsupported moderation target." }, { status: 400 });
  }

  await prisma.moderationLog.create({
    data: {
      targetType: targetType as "memory" | "memory_comment" | "unsent_message" | "unsent_reply" | "issue",
      targetId,
      action: parsed.action,
      moderatorId: user.id,
      notes: parsed.notes ?? null,
    },
  });

  await prisma.auditEvent.create({
    data: {
      actorUserId: user.id,
      eventType: "moderation_action",
      entityType: targetType,
      entityId: targetId,
      payloadJson: {
        action: parsed.action,
        notes: parsed.notes ?? null,
      },
    },
  });

  return Response.json({ ok: true, data: { targetType, targetId, action: parsed.action } });
}
