import prisma from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { commentSchema } from "@/lib/validation";
import { recomputeMemoryCache } from "@/lib/memoryCache";
import { getInteractionWeight } from "@/lib/memoryScoring";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ memoryId: string; commentId: string }> },
) {
  const { memoryId, commentId } = await params;
  const user = await requireUser();
  const parsed = commentSchema.parse(await request.json());

  if (!process.env.DATABASE_URL) {
    return Response.json(
      { ok: false, error: "Database not configured. Add DATABASE_URL before replying." },
      { status: 503 },
    );
  }

  const parent = await prisma.memoryComment.findUnique({
    where: { id: commentId },
  });

  if (!parent || parent.memoryId !== memoryId) {
    return Response.json({ ok: false, error: "Parent comment not found." }, { status: 404 });
  }

  if (parent.parentCommentId) {
    return Response.json(
      { ok: false, error: "Only one reply level is supported for memory discussions." },
      { status: 400 },
    );
  }

  const reply = await prisma.memoryComment.create({
    data: {
      memoryId,
      userId: user.id,
      parentCommentId: commentId,
      body: parsed.body,
      status: "active",
    },
  });

  await prisma.memoryInteraction.create({
    data: {
      memoryId,
      userId: user.id,
      interactionType: "reply",
      weight: getInteractionWeight("reply"),
    },
  });

  const { cache } = await recomputeMemoryCache(memoryId);

  return Response.json({
    ok: true,
    data: {
      id: reply.id,
      strengthScore: Number(cache.strengthScore),
      clarityScore: Number(cache.clarityScore),
      feedScore: Number(cache.feedScore),
    },
  });
}
