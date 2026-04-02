import { cookies } from "next/headers";

import prisma from "@/lib/prisma";
import type { UserRole } from "@/lib/constants";

export type SessionUser = {
  id: string;
  username: string;
  displayName: string;
  role: UserRole;
};

const demoUsers: SessionUser[] = [
  { id: "demo-user", username: "maya", displayName: "Maya Patel", role: "user" },
  { id: "demo-trusted", username: "trusted", displayName: "Trusted Member", role: "trusted_user" },
  { id: "demo-moderator", username: "moderator", displayName: "Moderator User", role: "moderator" },
  { id: "demo-admin", username: "admin", displayName: "Admin User", role: "admin" },
];

export async function optionalUser(): Promise<SessionUser | null> {
  if (!process.env.DATABASE_URL) {
    const store = await cookies();
    const roleCookie = store.get("community_hub_demo_role")?.value as UserRole | undefined;
    return demoUsers.find((user) => user.role === roleCookie) ?? demoUsers[1] ?? null;
  }

  const store = await cookies();
  const userId = store.get("community_hub_user_id")?.value;
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, username: true, displayName: true, role: true },
  });

  if (!user) return null;
  return user;
}

export async function requireUser(): Promise<SessionUser> {
  const user = await optionalUser();
  if (!user) {
    throw new Error("UNAUTHENTICATED");
  }
  return user;
}
