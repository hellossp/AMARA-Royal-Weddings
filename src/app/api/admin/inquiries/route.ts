import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/auth";
import { getInquiries } from "@/lib/data-store";

export async function GET(req: NextRequest) {
  const isAuthorized = await verifyAdminAuth();
  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const includeArchived = searchParams.get("archived") === "true";

  const inquiries = await getInquiries(includeArchived);
  return NextResponse.json({ success: true, inquiries });
}
