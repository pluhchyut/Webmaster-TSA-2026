import prisma from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { commentSchema } from "@/lib/validation";
import { recomputeMemoryCache } from "@/lib/memoryCache";
import { getInteractionWeight } from "@/lib/memoryScoring";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ memoryId: string }> },
) {
  const { memoryId } = await params;
  const user = await requireUser();
  const parsed = commentSchema.parse(await request.json());

  if (!process.env.DATABASE_URL) {
    return Response.json(
      { ok: false, error: "Database not configured. Add DATABASE_URL before commenting." },
      { status: 503 },
    );
  }

  const comment = await prisma.memoryComment.create({
    data: {
      memoryId,
      userId: user.id,
      body: parsed.body,
      status: "active",
    },
  });

  await prisma.memoryInteraction.create({
    data: {
      memoryId,
      userId: user.id,
      interactionType: "comment",
      weight: getInteractionWeight("comment"),
    },
  });

  const { cache } = await recomputeMemoryCache(memoryId);

  return Response.json({
    ok: true,
    data: {
      id: comment.id,
      strengthScore: Number(cache.strengthScore),
      clarityScore: Number(cache.clarityScore),
      feedScore: Number(cache.feedScore),
    },
  });
}
