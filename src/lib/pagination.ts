export type CursorPayload = {
  id: string;
  createdAt: string;
};

export function encodeCursor(payload: CursorPayload): string {
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

export function decodeCursor(cursor?: string | null): CursorPayload | null {
  if (!cursor) return null;

  try {
    return JSON.parse(Buffer.from(cursor, "base64url").toString("utf8")) as CursorPayload;
  } catch {
    return null;
  }
}
