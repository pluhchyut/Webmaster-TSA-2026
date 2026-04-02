import prisma from "@/lib/prisma";
import { demoMemories } from "@/lib/demoContent";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ memoryId: string }> },
) {
  const { memoryId } = await params;

  if (!process.env.DATABASE_URL) {
    const memory = demoMemories.find((entry) => entry.id === memoryId);
    if (!memory) {
      return Response.json({ ok: false, error: "Memory not found." }, { status: 404 });
    }

    return Response.json({ ok: true, data: memory });
  }

  const memory = await prisma.memory.findUnique({
    where: { id: memoryId },
    include: {
      cache: true,
      comments: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!memory) {
    return Response.json({ ok: false, error: "Memory not found." }, { status: 404 });
  }

  return Response.json({ ok: true, data: memory });
}
