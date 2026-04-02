import type { ContentReport, UnsentMessage, UnsentReply } from "@/generated/prisma/client";

import prisma from "@/lib/prisma";
import { canModerate } from "@/lib/permissions";
import { requireUser } from "@/lib/auth";
import { demoModerationQueue } from "@/lib/demoContent";

export async function GET() {
  const user = await requireUser();
  if (!canModerate(user)) {
    return Response.json({ ok: false, error: "Forbidden." }, { status: 403 });
  }

  if (!process.env.DATABASE_URL) {
    return Response.json({ ok: true, data: { items: demoModerationQueue, nextCursor: null } });
  }

  const [pendingMessages, pendingReplies, openReports] = await Promise.all([
    prisma.unsentMessage.findMany({
      where: { status: "pending" },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.unsentReply.findMany({
      where: { status: "pending" },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.contentReport.findMany({
      where: { status: "open" },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
  ]);

  return Response.json({
    ok: true,
    data: {
      items: [
        ...pendingMessages.map((item: UnsentMessage) => ({
          id: item.id,
          targetType: "unsent_message",
          title: item.title ?? item.body.slice(0, 60),
          reason: "Pending moderation review",
          status: item.status,
        })),
        ...pendingReplies.map((item: UnsentReply) => ({
          id: item.id,
          targetType: "unsent_reply",
          title: item.body.slice(0, 60),
          reason: "Pending moderation review",
          status: item.status,
        })),
        ...openReports.map((item: ContentReport) => ({
          id: item.id,
          targetType: item.targetType,
          title: item.reason.slice(0, 60),
          reason: item.reason,
          status: item.status,
        })),
      ],
      nextCursor: null,
    },
  });
}
