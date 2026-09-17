import { cookies } from "next/headers";

/**
 * Verifies the admin session cookie set by `loginAdmin`.
 * Returns the secret on success, null on failure.
 *
 * Safe to call from both Server Components and Server Actions — `cookies()`
 * reads the request-scoped cookie jar.
 */
export function requireAdmin(): string | null {
  const token = cookies().get("admin_token")?.value;
  const secret = process.env.ADMIN_SECRET || "tie-admin-123";
  if (token && token === secret) {
    return secret;
  }
  return null;
}