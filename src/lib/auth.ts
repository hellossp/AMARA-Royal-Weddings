import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "amara_admin_token";
const DEMO_SECRET_TOKEN = "amara_authenticated_admin_session_token_2026";

export async function setAdminSession(email: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, `${DEMO_SECRET_TOKEN}:${email}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getAdminSession(): Promise<{ email: string } | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!token) return null;

    if (token.startsWith(DEMO_SECRET_TOKEN)) {
      const email = token.split(":")[1] || "admin@amarastudios.in";
      return { email };
    }

    return null;
  } catch (err) {
    return null;
  }
}

export async function verifyAdminAuth(): Promise<boolean> {
  const session = await getAdminSession();
  return Boolean(session);
}
