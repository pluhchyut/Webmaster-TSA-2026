import {
  capsRatioTooHigh,
  containsContactInfo,
  evaluateUnsentText,
  repeatedCharsTooHigh,
} from "@/lib/moderationRules";

describe("moderation rules", () => {
  it("detects contact info", () => {
    expect(containsContactInfo("email me at test@example.com")).toBe(true);
    expect(containsContactInfo("hello there")).toBe(false);
  });

  it("detects excessive caps", () => {
    expect(capsRatioTooHigh("THIS IS WAY TOO MUCH SHOUTING")).toBe(true);
    expect(capsRatioTooHigh("This is normal sentence case")).toBe(false);
  });

  it("detects repeated characters", () => {
    expect(repeatedCharsTooHigh("noooooooo")).toBe(true);
    expect(repeatedCharsTooHigh("noooo")).toBe(false);
  });

  it("queues or rejects flagged text deterministically", () => {
    const pending = evaluateUnsentText("Visit www.example.com for more", {
      allowLinks: false,
    });
    const rejected = evaluateUnsentText("Call me at 555-111-2222 and go die", {
      allowLinks: false,
    });

    expect(pending.decision).toBe("pending");
    expect(rejected.decision).toBe("reject");
  });
});
