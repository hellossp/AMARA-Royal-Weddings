import React from "react";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getSiteSettings } from "@/lib/data-store";
import AdminSettingsEditor from "@/components/AdminSettingsEditor";

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const settings = await getSiteSettings();

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="border-b border-white/[0.08] pb-6">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059]">
          Configuration & Channels
        </span>
        <h1 className="font-editorial-title text-3xl sm:text-4xl font-light text-[#faf8f5]">
          Website & Atelier Settings
        </h1>
        <p className="text-xs text-[#a09c95] mt-1 font-light">
          Configure branding, concierge contact channels, social profiles, and email routing.
        </p>
      </div>

      <AdminSettingsEditor initialSettings={settings} />
    </div>
  );
}
