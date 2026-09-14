export const USER_ROLES = ["listener", "artist", "admin"] as const;

export type UserRole = (typeof USER_ROLES)[number];
export const DEFAULT_USER_ROLE: UserRole = "listener";
export const ACCOUNT_STATUSES = [
  "pending",
  "active",
  "suspended",
  "deleted",
] as const;

export type AccountStatus = (typeof ACCOUNT_STATUSES)[number];
export const DEFAULT_ACCOUNT_STATUS: AccountStatus = "pending";
