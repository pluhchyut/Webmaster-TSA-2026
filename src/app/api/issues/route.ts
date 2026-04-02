import { Prisma } from "@/generated/prisma/client";

import prisma from "@/lib/prisma";
import { canCreateIssue } from "@/lib/permissions";
import { requireUser } from "@/lib/auth";
import { issueSchema } from "@/lib/validation";
import { demoIssues } from "@/lib/demoContent";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return Response.json({ ok: true, data: { items: demoIssues, nextCursor: null } });
  }

  const issues = await prisma.issue.findMany({
    where: { status: "approved" },
    orderBy: { updatedAt: "desc" },
    include: { perspectives: { orderBy: { sortOrder: "asc" } } },
  });

  return Response.json({ ok: true, data: { items: issues, nextCursor: null } });
}

export async function POST(request: Request) {
  const user = await requireUser();
  if (!canCreateIssue(user)) {
    return Response.json({ ok: false, error: "Forbidden." }, { status: 403 });
  }

  const parsed = issueSchema.parse(await request.json());

  if (!process.env.DATABASE_URL) {
    return Response.json(
      { ok: false, error: "Database not configured. Add DATABASE_URL before creating issues." },
      { status: 503 },
    );
  }

  const issue = await prisma.issue.create({
    data: {
      title: parsed.title,
      slug: parsed.slug,
      summary: parsed.summary,
      body: parsed.body,
      category: parsed.category,
      status: "approved",
      createdBy: user.id,
    },
  });

  await prisma.auditEvent.create({
    data: {
      actorUserId: user.id,
      eventType: "issue_created",
      entityType: "issue",
      entityId: issue.id,
      payloadJson: parsed as Prisma.InputJsonValue,
    },
  });

  return Response.json({ ok: true, data: { id: issue.id } }, { status: 201 });
}
