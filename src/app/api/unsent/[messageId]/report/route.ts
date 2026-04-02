import prisma from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { reportSchema } from "@/lib/validation";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ messageId: string }> },
) {
  const { messageId } = await params;
  const user = await requireUser();
  const parsed = reportSchema.parse(await request.json());

  if (!process.env.DATABASE_URL) {
    return Response.json(
      { ok: false, error: "Database not configured. Add DATABASE_URL before reporting content." },
      { status: 503 },
    );
  }

  const report = await prisma.contentReport.create({
    data: {
      reporterId: user.id,
      targetType: "unsent_message",
      targetId: messageId,
      reason: parsed.reason,
    },
  });

  return Response.json({ ok: true, data: { id: report.id } }, { status: 201 });
}
