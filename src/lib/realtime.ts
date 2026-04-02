import { createBrowserClient, createServerClient } from "@supabase/ssr";

export function memoryChannel(memoryId: string) {
  return `memory:${memoryId}`;
}

export function unsentChannel(messageId: string) {
  return `unsent:${messageId}`;
}

export function moderationQueueChannel() {
  return "moderation:queue";
}

export function createRealtimeBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createBrowserClient(url, key);
}

export function createRealtimeServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return [];
      },
      setAll() {},
    },
  });
}
