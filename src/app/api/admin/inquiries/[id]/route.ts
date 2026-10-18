import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/auth";
import { getInquiryById, updateInquiryStatus, toggleArchiveInquiry } from "@/lib/data-store";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const isAuthorized = await verifyAdminAuth();
  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const inquiry = await getInquiryById(id);

  if (!inquiry) {
    return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, inquiry });
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const isAuthorized = await verifyAdminAuth();
  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const body = await req.json();

    if (body.toggleArchive) {
      const isArchived = await toggleArchiveInquiry(id);
      return NextResponse.json({ success: true, isArchived });
    }

    if (body.status) {
      const updated = await updateInquiryStatus(id, body.status, body.followUpDate);
      return NextResponse.json({ success: true, inquiry: updated });
    }

    return NextResponse.json({ error: "No valid action provided" }, { status: 400 });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update inquiry" },
      { status: 400 }
    );
  }
}
