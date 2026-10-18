import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth, getAdminSession } from "@/lib/auth";
import { addInquiryNote } from "@/lib/data-store";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, { params }: RouteParams) {
  const isAuthorized = await verifyAdminAuth();
  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const session = await getAdminSession();
    const { note } = await req.json();

    if (!note || typeof note !== "string" || !note.trim()) {
      return NextResponse.json({ error: "Note text is required" }, { status: 400 });
    }

    const createdNote = await addInquiryNote(
      id,
      note.trim(),
      session?.email || "Admin"
    );

    return NextResponse.json({ success: true, note: createdNote }, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to add internal note" },
      { status: 400 }
    );
  }
}
