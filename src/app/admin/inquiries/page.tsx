import React from "react";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getInquiries } from "@/lib/data-store";
import AdminInquiryManager from "@/components/AdminInquiryManager";

export const revalidate = 0;

export default async function AdminInquiriesPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const inquiries = await getInquiries(true); // include archived

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="border-b border-white/[0.08] pb-6">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059]">
          Client Communications & Leads
        </span>
        <h1 className="font-editorial-title text-3xl sm:text-4xl font-light text-[#faf8f5]">
          Inquiry Pipeline
        </h1>
        <p className="text-xs text-[#a09c95] mt-1 font-light">
          Track leads, manage follow-up dates, update status, and log confidential internal notes.
        </p>
      </div>

      <AdminInquiryManager initialInquiries={inquiries} />
    </div>
  );
}
