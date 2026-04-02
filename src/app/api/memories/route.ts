import { Prisma } from "@/generated/prisma/client";

import prisma from "@/lib/prisma";
import { encodeCursor } from "@/lib/pagination";
import { demoMemories } from "@/lib/demoContent";
import { memorySchema } from "@/lib/validation";
import { requireUser } from "@/lib/auth";
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "@/lib/constants";

type MemoryFeedRow = Prisma.MemoryGetPayload<{
  include: {
    cache: true;
    _count: {
      select: {
        comments: true;
        interactions: true;
      };
    };
  };
}>;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(Number(searchParams.get("limit") ?? DEFAULT_PAGE_SIZE), MAX_PAGE_SIZE);

  if (!process.env.DATABASE_URL) {
    const items = demoMemories.slice(0, limit).map((memory) => ({
      id: memory.id,
      title: memory.title,
      bodyPreview: memory.excerpt,
      locationName: memory.locationName,
      createdAt: memory.createdAt,
      strengthScore: memory.strengthScore,
      clarityScore: memory.strengthScore,
      feedScore: memory.feedScore,
      commentCount: memory.comments.length,
      reactionCount: Math.round(memory.metrics.weightedInteractions),
    }));

    return Response.json({
      ok: true,
      data: {
        items,
        nextCursor: null,
      },
    });
  }

  const memories = (await prisma.memory.findMany({
    take: limit + 1,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    include: {
      cache: true,
      _count: {
        select: {
          comments: true,
          interactions: true,
        },
      },
    },
  })) as MemoryFeedRow[];

  const hasMore = memories.length > limit;
  const slice = hasMore ? memories.slice(0, limit) : memories;

  return Response.json({
    ok: true,
    data: {
      items: slice.map((memory: MemoryFeedRow) => ({
        id: memory.id,
        title: memory.title,
        bodyPreview: memory.body.slice(0, 180),
        locationName: memory.locationName,
        createdAt: memory.createdAt.toISOString(),
        strengthScore: Number(memory.cache?.strengthScore ?? 50),
        clarityScore: Number(memory.cache?.clarityScore ?? 50),
        feedScore: Number(memory.cache?.feedScore ?? 50),
        commentCount: memory._count.comments,
        reactionCount: memory._count.interactions,
      })),
      nextCursor: hasMore
        ? encodeCursor({
            id: slice[slice.length - 1].id,
            createdAt: slice[slice.length - 1].createdAt.toISOString(),
          })
        : null,
    },
  });
}

export async function POST(request: Request) {
  const user = await requireUser();
  const parsed = memorySchema.parse(await request.json());

  if (!process.env.DATABASE_URL) {
    return Response.json(
      { ok: false, error: "Database not configured. Add DATABASE_URL before creating memories." },
      { status: 503 },
    );
  }

  const memory = await prisma.memory.create({
    data: {
      authorId: user.id,
      title: parsed.title,
      body: parsed.body,
      mediaUrl: parsed.mediaUrl ?? null,
      mediaType: parsed.mediaType ?? null,
      locationName: parsed.locationName ?? null,
      eventDate: parsed.eventDate ? new Date(parsed.eventDate) : null,
      visibility: parsed.visibility,
      status: "active",
    },
  });

  await prisma.auditEvent.create({
    data: {
      actorUserId: user.id,
      eventType: "memory_created",
      entityType: "memory",
      entityId: memory.id,
      payloadJson: {
        title: memory.title,
      },
    },
  });

  return Response.json({ ok: true, data: { id: memory.id } }, { status: 201 });
}
