import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/auth";
import { getAlbums, saveAlbum } from "@/lib/data-store";

export async function GET() {
  const isAuthorized = await verifyAdminAuth();
  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const albums = await getAlbums(true); // include unpublished
  return NextResponse.json({ success: true, albums });
}

export async function POST(req: NextRequest) {
  const isAuthorized = await verifyAdminAuth();
  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const created = await saveAlbum(data);
    return NextResponse.json({ success: true, album: created }, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create album" },
      { status: 400 }
    );
  }
}
