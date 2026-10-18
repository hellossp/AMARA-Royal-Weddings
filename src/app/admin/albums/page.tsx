import React from "react";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getAlbums } from "@/lib/data-store";
import AdminAlbumList from "@/components/AdminAlbumList";

export const revalidate = 0;

export default async function AdminAlbumsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const albums = await getAlbums(true); // include drafts

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="border-b border-white/[0.08] pb-6">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059]">
          Portfolio Management
        </span>
        <h1 className="font-editorial-title text-3xl sm:text-4xl font-light text-[#faf8f5]">
          Albums & Photo Collections
        </h1>
        <p className="text-xs text-[#a09c95] mt-1 font-light">
          Publish, organize, feature, and edit luxury wedding and celebration albums.
        </p>
      </div>

      <AdminAlbumList initialAlbums={albums} />
    </div>
  );
}
