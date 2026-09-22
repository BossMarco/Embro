import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const cookieName = "embro_admin_session";
const sessionLifetime = 60 * 60 * 8;

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value) throw new Error("ADMIN_SESSION_SECRET is not configured.");
  return value;
}

function hash(value: string) {
  return createHash("sha256").update(value).digest();
}

function signature(expiresAt: string) {
  return createHmac("sha256", secret())
    .update(`admin:${expiresAt}`)
    .digest("base64url");
}

export function passwordMatches(candidate: string) {
  return timingSafeEqual(
    hash(candidate),
    hash(process.env.ADMIN_PASSWORD ?? "admin"),
  );
}

export async function createAdminSession() {
  const expiresAt = String(Math.floor(Date.now() / 1000) + sessionLifetime);
  const store = await cookies();
  store.set(cookieName, `${expiresAt}.${signature(expiresAt)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionLifetime,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(cookieName);
}

export async function hasAdminSession() {
  const value = (await cookies()).get(cookieName)?.value;
  if (!value) return false;
  const [expiresAt, receivedSignature] = value.split(".");
  if (
    !expiresAt ||
    !receivedSignature ||
    Number(expiresAt) < Math.floor(Date.now() / 1000)
  )
    return false;
  const expected = signature(expiresAt);
  return (
    receivedSignature.length === expected.length &&
    timingSafeEqual(Buffer.from(receivedSignature), Buffer.from(expected))
  );
}
