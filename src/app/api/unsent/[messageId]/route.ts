import prisma from "@/lib/prisma";
import { demoUnsentMessages } from "@/lib/demoContent";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ messageId: string }> },
) {
  const { messageId } = await params;

  if (!process.env.DATABASE_URL) {
    const message = demoUnsentMessages.find((entry) => entry.id === messageId);
    if (!message) {
      return Response.json({ ok: false, error: "Message not found." }, { status: 404 });
    }
    return Response.json({ ok: true, data: message });
  }

  const message = await prisma.unsentMessage.findUnique({
    where: { id: messageId },
    include: {
      replies: {
        where: { status: "approved" },
        orderBy: { createdAt: "asc" },
      },
      reactions: true,
    },
  });

  if (!message) {
    return Response.json({ ok: false, error: "Message not found." }, { status: 404 });
  }

  return Response.json({ ok: true, data: message });
}
