import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/auth";
import { getAlbumById, saveAlbum, deleteAlbum } from "@/lib/data-store";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const isAuthorized = await verifyAdminAuth();
  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const album = await getAlbumById(id);

  if (!album) {
    return NextResponse.json({ error: "Album not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, album });
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const isAuthorized = await verifyAdminAuth();
  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const data = await req.json();
    const updated = await saveAlbum({ ...data, id });
    return NextResponse.json({ success: true, album: updated });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update album" },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const isAuthorized = await verifyAdminAuth();
  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const deleted = await deleteAlbum(id);

  if (!deleted) {
    return NextResponse.json({ error: "Album not found or already deleted" }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: "Album deleted successfully" });
}
