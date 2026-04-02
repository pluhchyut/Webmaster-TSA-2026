import { z } from "zod";

import {
  CONTENT_VISIBILITY,
  MEMORY_INTERACTION_TYPES,
  MODERATION_ACTIONS,
  REPORT_TARGET_TYPES,
  TONE_TAGS,
  UNSENT_DISPLAY_MODES,
  UNSENT_REACTION_TYPES,
} from "@/lib/constants";

export const memorySchema = z.object({
  title: z.string().trim().min(3).max(120),
  body: z.string().trim().min(20).max(2000),
  mediaUrl: z.string().url().nullable().optional(),
  mediaType: z.enum(["image"]).nullable().optional(),
  locationName: z.string().trim().max(120).nullable().optional(),
  eventDate: z.string().datetime().nullable().optional(),
  visibility: z.enum(CONTENT_VISIBILITY).default("public"),
});

export const interactionSchema = z.object({
  interactionType: z.enum(MEMORY_INTERACTION_TYPES),
});

export const commentSchema = z.object({
  body: z.string().trim().min(2).max(800),
});

export const unsentSchema = z.object({
  title: z.string().trim().max(120).nullable().optional(),
  body: z.string().trim().min(20).max(2000),
  displayMode: z.enum(UNSENT_DISPLAY_MODES).default("anonymous"),
  replyEnabled: z.boolean().default(true),
  visibility: z.enum(CONTENT_VISIBILITY).default("public"),
  toneTag: z.enum(TONE_TAGS).nullable().optional(),
});

export const unsentReactionSchema = z.object({
  reactionType: z.enum(UNSENT_REACTION_TYPES),
});

export const unsentReplySchema = z.object({
  body: z.string().trim().min(2).max(600),
  parentReplyId: z.string().uuid().nullable().optional(),
});

export const reportSchema = z.object({
  reason: z.string().trim().min(5).max(400),
});

export const issueSchema = z.object({
  title: z.string().trim().min(5).max(160),
  slug: z.string().trim().min(3).max(160).regex(/^[a-z0-9-]+$/),
  summary: z.string().trim().min(20).max(400),
  body: z.string().trim().min(40).max(4000),
  category: z.string().trim().min(2).max(100),
});

const compromiseSchema = z
  .object({
    title: z.string().trim().min(2).max(120),
    body: z.string().trim().min(5).max(500),
  })
  .nullable()
  .optional();

export const perspectiveSchema = z.object({
  perspectiveKey: z.string().trim().min(2).max(80),
  displayName: z.string().trim().min(2).max(80),
  summary: z.string().trim().min(10).max(500),
  topConcerns: z.array(z.string().trim().min(1).max(80)).min(1).max(8),
  topValues: z.array(z.string().trim().min(1).max(80)).min(1).max(8),
  suggestedActions: z.array(z.string().trim().min(1).max(180)).min(1).max(8),
  compromise: compromiseSchema,
  sortOrder: z.number().int().min(0).default(0),
});

export const replacePerspectivesSchema = z.object({
  perspectives: z.array(perspectiveSchema).min(1).max(12),
});

export const moderationActionSchema = z.object({
  action: z.enum(MODERATION_ACTIONS),
  notes: z.string().trim().max(500).nullable().optional(),
});

export const moderationFilterSchema = z.object({
  targetType: z.enum(REPORT_TARGET_TYPES).optional(),
  status: z.string().trim().optional(),
  cursor: z.string().optional(),
});
