import { NextRequest, NextResponse } from "next/server";
import { setAdminSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const expectedEmail = process.env.ADMIN_DEFAULT_EMAIL || "admin@amarastudios.in";
    const expectedPassword = process.env.ADMIN_DEFAULT_PASSWORD || "amara-luxury-2026";

    // Validate email and password against env config or demo defaults
    if (
      email?.toLowerCase().trim() === expectedEmail.toLowerCase().trim() &&
      password === expectedPassword
    ) {
      await setAdminSession(email);
      return NextResponse.json({ success: true, message: "Authentication successful" });
    }

    return NextResponse.json(
      { success: false, error: "Invalid email or master security password." },
      { status: 401 }
    );
  } catch (err) {
    console.error("Login route error:", err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Authentication service error." },
      { status: 500 }
    );
  }
}
