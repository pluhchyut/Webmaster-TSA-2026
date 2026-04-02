import { Prisma } from "@/generated/prisma/client";

import prisma from "@/lib/prisma";
import { computeClarity, computeFeedScore, computeFreshnessScore, computeStrengthScore } from "@/lib/memoryScoring";

type MemoryWithRelations = Prisma.MemoryGetPayload<{
  include: {
    interactions: true;
    comments: true;
  };
}>;

export async function recomputeMemoryCache(memoryId: string) {
  const memory = (await prisma.memory.findUnique({
    where: { id: memoryId },
    include: {
      interactions: true,
      comments: true,
    },
  })) as MemoryWithRelations | null;

  if (!memory) {
    throw new Error("MEMORY_NOT_FOUND");
  }

  const daysOld = Math.max(
    0,
    (Date.now() - new Date(memory.createdAt).getTime()) / (1000 * 60 * 60 * 24),
  );
  const lastSevenDays = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const weightedInteractions = memory.interactions.reduce(
    (sum: number, interaction: MemoryWithRelations["interactions"][number]) =>
      sum + Number(interaction.weight),
    0,
  );
  const recentWeightedInteractions = memory.interactions.reduce(
    (sum: number, interaction: MemoryWithRelations["interactions"][number]) => {
      return new Date(interaction.createdAt).getTime() >= lastSevenDays
        ? sum + Number(interaction.weight)
        : sum;
    },
    0,
  );
  const uniqueParticipants = new Set(
    memory.interactions.map((interaction: MemoryWithRelations["interactions"][number]) => interaction.userId),
  ).size;
  const commentCount = memory.comments.length;
  const contextAdditions = memory.interactions.filter(
    (interaction: MemoryWithRelations["interactions"][number]) =>
      interaction.interactionType === "context_add",
  ).length;
  const locationVerifications = memory.interactions.filter(
    (interaction: MemoryWithRelations["interactions"][number]) =>
      interaction.interactionType === "verify_location",
  ).length;

  const strengthScore = computeStrengthScore({
    daysOld,
    weightedInteractions,
    recentWeightedInteractions,
    uniqueParticipants,
    commentCount,
    contextAdditions,
    locationVerifications,
  });
  const clarityScore = strengthScore;
  const freshnessScore = computeFreshnessScore(daysOld);
  const feedScore = computeFeedScore({
    strengthScore,
    freshnessScore,
    engagementVelocity: Math.min(100, recentWeightedInteractions * 8),
    localRelevance: memory.locationName ? 80 : 50,
  });

  const cache = await prisma.memoryStrengthCache.upsert({
    where: { memoryId },
    update: {
      strengthScore,
      clarityScore,
      feedScore,
      lastComputedAt: new Date(),
    },
    create: {
      memoryId,
      strengthScore,
      clarityScore,
      feedScore,
      lastComputedAt: new Date(),
    },
  });

  return {
    cache,
    clarity: computeClarity(strengthScore),
  };
}
