import type { UserRole } from "@/lib/constants";

export type PermissionUser = {
  id: string;
  role: UserRole;
};

export function isAdmin(user: PermissionUser | null | undefined): boolean {
  return user?.role === "admin";
}

export function isModerator(user: PermissionUser | null | undefined): boolean {
  return user?.role === "moderator" || user?.role === "admin";
}

export function isTrustedUser(user: PermissionUser | null | undefined): boolean {
  return user?.role === "trusted_user" || isModerator(user);
}

export function canCreateIssue(user: PermissionUser | null | undefined): boolean {
  return isAdmin(user);
}

export function canModerate(user: PermissionUser | null | undefined): boolean {
  return isModerator(user);
}

export function canFeature(user: PermissionUser | null | undefined): boolean {
  return isModerator(user);
}

export function canReplyToUnsent(user: PermissionUser | null | undefined): boolean {
  return Boolean(user);
}
