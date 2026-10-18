import React from "react";
import { redirect, notFound } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getAlbumById } from "@/lib/data-store";
import AdminAlbumEditor from "@/components/AdminAlbumEditor";

interface EditAlbumPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAlbumPage({ params }: EditAlbumPageProps) {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const album = await getAlbumById(id);

  if (!album) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <AdminAlbumEditor initialAlbum={album} isNew={false} />
    </div>
  );
}
