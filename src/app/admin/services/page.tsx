import React from "react";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getServices } from "@/lib/data-store";
import AdminServicesManager from "@/components/AdminServicesManager";

export const revalidate = 0;

export default async function AdminServicesPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const services = await getServices(true); // include inactive

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="border-b border-white/[0.08] pb-6">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059]">
          Catalog Management
        </span>
        <h1 className="font-editorial-title text-3xl sm:text-4xl font-light text-[#faf8f5]">
          Services & Deliverables
        </h1>
        <p className="text-xs text-[#a09c95] mt-1 font-light">
          Manage wedding and event coverage packages, client deliverables, and visibility.
        </p>
      </div>

      <AdminServicesManager initialServices={services} />
    </div>
  );
}
