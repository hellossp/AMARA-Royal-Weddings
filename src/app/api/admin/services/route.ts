import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/auth";
import { getServices, saveService } from "@/lib/data-store";

export async function GET() {
  const isAuthorized = await verifyAdminAuth();
  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const services = await getServices(true); // include inactive
  return NextResponse.json({ success: true, services });
}

export async function POST(req: NextRequest) {
  const isAuthorized = await verifyAdminAuth();
  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const service = await saveService(data);
    return NextResponse.json({ success: true, service }, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create service" },
      { status: 400 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const isAuthorized = await verifyAdminAuth();
  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const service = await saveService(data);
    return NextResponse.json({ success: true, service });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update service" },
      { status: 400 }
    );
  }
}
