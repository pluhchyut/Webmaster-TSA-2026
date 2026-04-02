import {
  canCreateIssue,
  canFeature,
  canModerate,
  canReplyToUnsent,
  isModerator,
} from "@/lib/permissions";

describe("permissions", () => {
  const user = { id: "user", role: "user" as const };
  const moderator = { id: "mod", role: "moderator" as const };
  const admin = { id: "admin", role: "admin" as const };

  it("gates moderation roles", () => {
    expect(isModerator(user)).toBe(false);
    expect(isModerator(moderator)).toBe(true);
    expect(isModerator(admin)).toBe(true);
  });

  it("limits issue creation to admins", () => {
    expect(canCreateIssue(user)).toBe(false);
    expect(canCreateIssue(admin)).toBe(true);
  });

  it("allows signed-in discussion participation", () => {
    expect(canReplyToUnsent(user)).toBe(true);
    expect(canReplyToUnsent(null)).toBe(false);
    expect(canModerate(moderator)).toBe(true);
    expect(canFeature(admin)).toBe(true);
  });
});
