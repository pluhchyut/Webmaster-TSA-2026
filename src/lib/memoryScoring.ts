import {
  MEMORY_INTERACTION_TYPES,
  MEMORY_INTERACTION_WEIGHTS,
  type MemoryInteractionType,
} from "@/lib/constants";

export type MemoryMetrics = {
  daysOld: number;
  weightedInteractions: number;
  recentWeightedInteractions: number;
  uniqueParticipants: number;
  commentCount?: number;
  contextAdditions?: number;
  locationVerifications?: number;
};

export function getInteractionWeight(type: MemoryInteractionType): number {
  return MEMORY_INTERACTION_WEIGHTS[type];
}

export function isMemoryInteractionType(value: string): value is MemoryInteractionType {
  return MEMORY_INTERACTION_TYPES.includes(value as MemoryInteractionType);
}

export function computeStrengthScore(metrics: MemoryMetrics): number {
  const base = 100;
  const agePenalty = 25 * Math.log1p(metrics.daysOld / 7);
  const interactionBoost = Math.min(30, metrics.weightedInteractions * 0.8);
  const recentBoost = Math.min(20, metrics.recentWeightedInteractions * 1.2);
  const uniqueBoost = Math.min(15, metrics.uniqueParticipants * 0.9);
  const commentBoost = Math.min(8, (metrics.commentCount ?? 0) * 0.9);
  const contextBoost = Math.min(10, (metrics.contextAdditions ?? 0) * 2);
  const locationBoost = Math.min(6, (metrics.locationVerifications ?? 0) * 1.5);

  const score =
    base -
    agePenalty +
    interactionBoost +
    recentBoost +
    uniqueBoost +
    commentBoost +
    contextBoost +
    locationBoost;

  return clamp(score, 0, 100);
}

export function computeClarity(score: number) {
  return {
    blurPx: roundTo(map(score, 0, 100, 8, 0), 2),
    grayscale: roundTo(map(score, 0, 100, 0.85, 0), 2),
    opacity: roundTo(map(score, 0, 100, 0.45, 1), 2),
    noiseOpacity: roundTo(map(score, 0, 100, 0.18, 0), 2),
  };
}

export function computeFreshnessScore(daysOld: number): number {
  return clamp(100 - daysOld * 4, 0, 100);
}

export function computeFeedScore(input: {
  strengthScore: number;
  freshnessScore: number;
  engagementVelocity: number;
  localRelevance: number;
}) {
  const score =
    input.strengthScore * 0.55 +
    input.freshnessScore * 0.2 +
    input.engagementVelocity * 0.15 +
    input.localRelevance * 0.1;
  return roundTo(clamp(score, 0, 100), 2);
}

export function map(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) {
  if (inMax === inMin) return outMin;
  const ratio = clamp((value - inMin) / (inMax - inMin), 0, 1);
  return outMin + ratio * (outMax - outMin);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function roundTo(value: number, digits: number) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}
