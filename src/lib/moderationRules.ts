import { BANNED_PHRASES } from "@/lib/constants";

export type ModerationDecision = {
  decision: "approve" | "pending" | "reject";
  flags: string[];
  score: number;
};

export type ModerationOptions = {
  isTrustedUser?: boolean;
  allowLinks?: boolean;
  recentBodies?: string[];
  cooldownActive?: boolean;
  duplicateWindowDays?: number;
};

export function containsContactInfo(text: string): boolean {
  const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
  const phoneRegex = /(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}/;
  return emailRegex.test(text) || phoneRegex.test(text);
}

export function containsLink(text: string): boolean {
  return /\b(?:https?:\/\/|www\.)\S+/i.test(text);
}

export function looksLikeStreetAddress(text: string): boolean {
  return /\b\d{1,5}\s+[A-Za-z0-9.'-]+\s+(Street|St|Avenue|Ave|Road|Rd|Lane|Ln|Drive|Dr|Boulevard|Blvd)\b/i.test(
    text,
  );
}

export function capsRatioTooHigh(text: string): boolean {
  const letters = text.replace(/[^a-zA-Z]/g, "");
  if (letters.length < 8) return false;
  const uppercaseLetters = letters.replace(/[^A-Z]/g, "").length;
  return uppercaseLetters / letters.length > 0.75;
}

export function repeatedCharsTooHigh(text: string): boolean {
  return /(.)\1{7,}/.test(text);
}

export function containsBannedPhrase(text: string): boolean {
  const normalized = normalizeText(text);
  return BANNED_PHRASES.some((phrase) => normalized.includes(phrase));
}

export function isDuplicateRecentContent(text: string, recentBodies: string[] = []): boolean {
  const normalized = normalizeText(text);
  return recentBodies.some((entry) => normalizeText(entry) === normalized);
}

export function evaluateUnsentText(
  text: string,
  {
    isTrustedUser = false,
    allowLinks = false,
    recentBodies = [],
    cooldownActive = false,
  }: ModerationOptions = {},
): ModerationDecision {
  const flags: string[] = [];
  let score = 0;

  if (containsBannedPhrase(text)) {
    flags.push("banned_phrase");
    score += 3;
  }

  if (containsContactInfo(text)) {
    flags.push("contact_info");
    score += 2;
  }

  if (looksLikeStreetAddress(text)) {
    flags.push("street_address_pattern");
    score += 2;
  }

  if (!allowLinks && containsLink(text)) {
    flags.push("external_link");
    score += 1;
  }

  if (capsRatioTooHigh(text)) {
    flags.push("caps_ratio_high");
    score += 1;
  }

  if (repeatedCharsTooHigh(text)) {
    flags.push("repeated_characters");
    score += 1;
  }

  if (isDuplicateRecentContent(text, recentBodies)) {
    flags.push("duplicate_recent_content");
    score += 1;
  }

  if (cooldownActive) {
    flags.push("cooldown_active");
    score += 1;
  }

  if (score >= 3) {
    return { decision: "reject", flags, score };
  }

  if (score >= 1) {
    return { decision: "pending", flags, score };
  }

  return {
    decision: isTrustedUser ? "approve" : "approve",
    flags,
    score,
  };
}

function normalizeText(text: string): string {
  return text.trim().replace(/\s+/g, " ").toLowerCase();
}
