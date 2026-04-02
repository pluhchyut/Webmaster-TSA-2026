import prisma from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { unsentReactionSchema } from "@/lib/validation";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ messageId: string }> },
) {
  const { messageId } = await params;
  const user = await requireUser();
  const parsed = unsentReactionSchema.parse(await request.json());

  if (!process.env.DATABASE_URL) {
    return Response.json(
      { ok: false, error: "Database not configured. Add DATABASE_URL before reacting." },
      { status: 503 },
    );
  }

  await prisma.unsentReaction.upsert({
    where: {
      messageId_userId_reactionType: {
        messageId,
        userId: user.id,
        reactionType: parsed.reactionType,
      },
    },
    update: {},
    create: {
      messageId,
      userId: user.id,
      reactionType: parsed.reactionType,
    },
  });

  return Response.json({ ok: true, data: { messageId, reactionType: parsed.reactionType } });
}
