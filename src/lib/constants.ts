export const USER_ROLES = ["user", "trusted_user", "moderator", "admin"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const MEMORY_INTERACTION_TYPES = [
  "view",
  "react",
  "comment",
  "reply",
  "share",
  "context_add",
  "verify_location",
] as const;
export type MemoryInteractionType = (typeof MEMORY_INTERACTION_TYPES)[number];

export const UNSENT_REACTION_TYPES = [
  "heard_you",
  "relate",
  "support",
  "thank_you",
] as const;
export type UnsentReactionType = (typeof UNSENT_REACTION_TYPES)[number];

export const CONTENT_VISIBILITY = ["public", "school_only", "local_only"] as const;
export const CONTENT_STATUS = [
  "active",
  "pending",
  "approved",
  "flagged",
  "removed",
  "rejected",
  "archived",
] as const;
export const UNSENT_DISPLAY_MODES = ["anonymous", "pseudonymous"] as const;
export const MODERATION_ACTIONS = [
  "auto_approve",
  "queue_for_review",
  "approve",
  "reject",
  "remove",
  "restore",
  "feature",
  "unfeature",
] as const;
export const REPORT_TARGET_TYPES = [
  "memory",
  "memory_comment",
  "unsent_message",
  "unsent_reply",
  "issue",
] as const;

export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 50;
export const UNSENT_MAX_THREAD_DEPTH = 2;

export const TONE_TAGS = [
  "care",
  "gratitude",
  "hope",
  "pressure",
  "reflection",
  "support",
] as const;

export const PERSPECTIVE_KEYS = [
  "student",
  "parent",
  "teacher",
  "business_owner",
  "senior_resident",
  "local_official",
] as const;

export const MEMORY_INTERACTION_WEIGHTS: Record<MemoryInteractionType, number> = {
  view: 0.1,
  react: 1,
  comment: 3,
  reply: 2,
  share: 1.5,
  context_add: 5,
  verify_location: 4,
};

export const RATE_LIMIT_DEFAULTS = {
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60_000),
  maxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS ?? 20),
};

export const BANNED_PHRASES = [
  "kill yourself",
  "go die",
  "hate crime",
  "racial slur",
  "swatting",
];

export const COMMUNITY_COPY = {
  appName: "Community Hub",
  noAiNotice:
    "This project does not use any AI APIs. All moderation, scoring, and perspective behavior is deterministic and authored by people.",
};
