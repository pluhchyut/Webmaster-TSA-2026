import { Prisma } from "@/generated/prisma/client";

import prisma from "@/lib/prisma";
import { canCreateIssue } from "@/lib/permissions";
import { requireUser } from "@/lib/auth";
import { replacePerspectivesSchema } from "@/lib/validation";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ issueId: string }> },
) {
  const { issueId } = await params;
  const user = await requireUser();

  if (!canCreateIssue(user)) {
    return Response.json({ ok: false, error: "Forbidden." }, { status: 403 });
  }

  const parsed = replacePerspectivesSchema.parse(await request.json());

  if (!process.env.DATABASE_URL) {
    return Response.json(
      { ok: false, error: "Database not configured. Add DATABASE_URL before editing perspectives." },
      { status: 503 },
    );
  }

  await prisma.$transaction([
    prisma.issuePerspective.deleteMany({ where: { issueId } }),
    prisma.issuePerspective.createMany({
      data: parsed.perspectives.map((perspective) => ({
        issueId,
        perspectiveKey: perspective.perspectiveKey,
        displayName: perspective.displayName,
        summary: perspective.summary,
        topConcernsJson: perspective.topConcerns as Prisma.InputJsonValue,
        topValuesJson: perspective.topValues as Prisma.InputJsonValue,
        suggestedActionsJson: perspective.suggestedActions as Prisma.InputJsonValue,
        compromiseJson: (perspective.compromise ?? null) as Prisma.InputJsonValue,
        sortOrder: perspective.sortOrder,
      })),
    }),
  ]);

  await prisma.auditEvent.create({
    data: {
      actorUserId: user.id,
      eventType: "issue_perspectives_replaced",
      entityType: "issue",
      entityId: issueId,
      payloadJson: parsed as Prisma.InputJsonValue,
    },
  });

  return Response.json({ ok: true, data: { issueId } });
}
