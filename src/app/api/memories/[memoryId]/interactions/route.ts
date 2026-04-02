import prisma from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { interactionSchema } from "@/lib/validation";
import { getInteractionWeight } from "@/lib/memoryScoring";
import { recomputeMemoryCache } from "@/lib/memoryCache";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ memoryId: string }> },
) {
  const { memoryId } = await params;
  const user = await requireUser();
  const parsed = interactionSchema.parse(await request.json());

  if (!process.env.DATABASE_URL) {
    return Response.json(
      { ok: false, error: "Database not configured. Add DATABASE_URL before recording interactions." },
      { status: 503 },
    );
  }

  await prisma.memoryInteraction.create({
    data: {
      memoryId,
      userId: user.id,
      interactionType: parsed.interactionType,
      weight: getInteractionWeight(parsed.interactionType),
    },
  });

  const { cache } = await recomputeMemoryCache(memoryId);

  return Response.json({
    ok: true,
    data: {
      strengthScore: Number(cache.strengthScore),
      clarityScore: Number(cache.clarityScore),
      feedScore: Number(cache.feedScore),
    },
  });
}
