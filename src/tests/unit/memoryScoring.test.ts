import {
  computeClarity,
  computeFeedScore,
  computeFreshnessScore,
  computeStrengthScore,
} from "@/lib/memoryScoring";

describe("memory scoring", () => {
  it("keeps scores within 0-100", () => {
    const score = computeStrengthScore({
      daysOld: 800,
      weightedInteractions: 0,
      recentWeightedInteractions: 0,
      uniqueParticipants: 0,
    });

    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  it("rewards recent engagement", () => {
    const oldScore = computeStrengthScore({
      daysOld: 45,
      weightedInteractions: 4,
      recentWeightedInteractions: 0,
      uniqueParticipants: 2,
    });
    const revivedScore = computeStrengthScore({
      daysOld: 45,
      weightedInteractions: 10,
      recentWeightedInteractions: 6,
      uniqueParticipants: 7,
    });

    expect(revivedScore).toBeGreaterThan(oldScore);
  });

  it("maps low scores to blurrier visuals", () => {
    const faded = computeClarity(10);
    const crisp = computeClarity(90);

    expect(faded.blurPx).toBeGreaterThan(crisp.blurPx);
    expect(faded.opacity).toBeLessThan(crisp.opacity);
  });

  it("builds a deterministic feed score", () => {
    const feedScore = computeFeedScore({
      strengthScore: 80,
      freshnessScore: computeFreshnessScore(3),
      engagementVelocity: 70,
      localRelevance: 90,
    });

    expect(feedScore).toBeGreaterThan(0);
    expect(feedScore).toBeLessThanOrEqual(100);
  });
});
