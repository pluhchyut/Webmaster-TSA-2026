import prisma from "@/lib/prisma";
import { demoIssues } from "@/lib/demoContent";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ issueId: string }> },
) {
  const { issueId } = await params;

  if (!process.env.DATABASE_URL) {
    const issue = demoIssues.find((entry) => entry.id === issueId);
    if (!issue) {
      return Response.json({ ok: false, error: "Issue not found." }, { status: 404 });
    }
    return Response.json({ ok: true, data: { issue, perspectives: issue.perspectives } });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
    include: {
      perspectives: { orderBy: { sortOrder: "asc" } },
    },
  });

  if (!issue) {
    return Response.json({ ok: false, error: "Issue not found." }, { status: 404 });
  }

  return Response.json({ ok: true, data: { issue, perspectives: issue.perspectives } });
}
