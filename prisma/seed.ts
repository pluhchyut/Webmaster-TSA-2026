import { PrismaPg } from "@prisma/adapter-pg";

import { Prisma, PrismaClient } from "../src/generated/prisma/client";

import { demoIssues, demoMemories, demoUnsentMessages } from "../src/lib/demoContent";
import { computeClarity } from "../src/lib/memoryScoring";

const databaseUrl =
  process.env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/community_hub";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

async function main() {
  const [admin, moderator, trusted, maya, jordan, sofie] = await Promise.all([
    prisma.user.upsert({
      where: { username: "admin" },
      update: { displayName: "Admin User", role: "admin" },
      create: { username: "admin", displayName: "Admin User", role: "admin" },
    }),
    prisma.user.upsert({
      where: { username: "moderator" },
      update: { displayName: "Moderator User", role: "moderator" },
      create: { username: "moderator", displayName: "Moderator User", role: "moderator" },
    }),
    prisma.user.upsert({
      where: { username: "trusted" },
      update: { displayName: "Trusted Member", role: "trusted_user" },
      create: { username: "trusted", displayName: "Trusted Member", role: "trusted_user" },
    }),
    prisma.user.upsert({
      where: { username: "maya" },
      update: { displayName: "Maya Patel", role: "user" },
      create: { username: "maya", displayName: "Maya Patel", role: "user" },
    }),
    prisma.user.upsert({
      where: { username: "jordan" },
      update: { displayName: "Jordan Lee", role: "user" },
      create: { username: "jordan", displayName: "Jordan Lee", role: "user" },
    }),
    prisma.user.upsert({
      where: { username: "sofie" },
      update: { displayName: "Sofie Chen", role: "user" },
      create: { username: "sofie", displayName: "Sofie Chen", role: "user" },
    }),
  ]);

  const memoryAuthorMap = {
    "memory-concert": maya.id,
    "memory-bakery": jordan.id,
  };

  for (const memory of demoMemories) {
    const createdMemory = await prisma.memory.upsert({
      where: { id: memory.id },
      update: {
        title: memory.title,
        body: memory.body,
        locationName: memory.locationName,
        eventDate: memory.eventDate ? new Date(memory.eventDate) : null,
      },
      create: {
        id: memory.id,
        authorId: memoryAuthorMap[memory.id as keyof typeof memoryAuthorMap] ?? maya.id,
        title: memory.title,
        body: memory.body,
        locationName: memory.locationName,
        eventDate: memory.eventDate ? new Date(memory.eventDate) : null,
        visibility: "public",
        status: "active",
        createdAt: new Date(memory.createdAt),
      },
    });

    await prisma.memoryStrengthCache.upsert({
      where: { memoryId: createdMemory.id },
      update: {
        strengthScore: new Prisma.Decimal(memory.strengthScore),
        clarityScore: new Prisma.Decimal(memory.strengthScore),
        feedScore: new Prisma.Decimal(memory.feedScore),
        lastComputedAt: new Date(),
      },
      create: {
        memoryId: createdMemory.id,
        strengthScore: new Prisma.Decimal(memory.strengthScore),
        clarityScore: new Prisma.Decimal(computeClarity(memory.strengthScore).opacity * 100),
        feedScore: new Prisma.Decimal(memory.feedScore),
        lastComputedAt: new Date(),
      },
    });
  }

  for (const message of demoUnsentMessages) {
    await prisma.unsentMessage.upsert({
      where: { id: message.id },
      update: {
        title: message.title,
        body: message.body,
        toneTag: message.toneTag,
        featured: message.featured,
        status: "approved",
      },
      create: {
        id: message.id,
        authorId: maya.id,
        title: message.title,
        body: message.body,
        toneTag: message.toneTag,
        featured: message.featured,
        status: "approved",
        displayMode: "anonymous",
        replyEnabled: message.replyEnabled,
        visibility: "public",
        createdAt: new Date(message.createdAt),
      },
    });
  }

  const issue = demoIssues[0];

  await prisma.issue.upsert({
    where: { slug: issue.slug },
    update: {
      title: issue.title,
      summary: issue.summary,
      body: issue.body,
      category: issue.category,
    },
    create: {
      id: issue.id,
      title: issue.title,
      slug: issue.slug,
      summary: issue.summary,
      body: issue.body,
      category: issue.category,
      status: "approved",
      createdBy: admin.id,
      createdAt: new Date(issue.updatedAt),
    },
  });

  await prisma.issuePerspective.deleteMany({ where: { issueId: issue.id } });
  await prisma.issuePerspective.createMany({
    data: issue.perspectives.map((perspective, index) => ({
      issueId: issue.id,
      perspectiveKey: perspective.perspectiveKey,
      displayName: perspective.displayName,
      summary: perspective.summary,
      topConcernsJson: perspective.topConcerns as Prisma.InputJsonValue,
      topValuesJson: perspective.topValues as Prisma.InputJsonValue,
      suggestedActionsJson: perspective.suggestedActions as Prisma.InputJsonValue,
      compromiseJson: (perspective.compromise ?? null) as Prisma.InputJsonValue,
      sortOrder: index + 1,
    })),
  });

  await prisma.contentReport.createMany({
    data: [
      {
        reporterId: sofie.id,
        targetType: "unsent_message",
        targetId: demoUnsentMessages[0].id,
        reason: "Example seeded report for moderation workflow.",
      },
    ],
    skipDuplicates: true,
  });

  await prisma.moderationLog.createMany({
    data: [
      {
        targetType: "unsent_message",
        targetId: demoUnsentMessages[0].id,
        action: "auto_approve",
        moderatorId: moderator.id,
        notes: "Seeded deterministic moderation example.",
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
