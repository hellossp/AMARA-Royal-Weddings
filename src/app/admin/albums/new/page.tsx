import React from "react";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import AdminAlbumEditor from "@/components/AdminAlbumEditor";

export default async function NewAlbumPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="space-y-6">
      <AdminAlbumEditor isNew={true} />
    </div>
  );
}
