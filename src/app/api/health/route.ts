export async function GET() {
  return Response.json({
    ok: true,
    data: {
      status: "healthy",
      ai: "disabled",
    },
  });
}
