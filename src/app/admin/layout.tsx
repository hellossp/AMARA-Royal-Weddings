import React from "react";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getInquiries } from "@/lib/data-store";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  // If unauthenticated, children might be the login page
  // The login page is handled inside /admin/login
  // But if accessing any protected admin route without session, render children directly
  // (which will be login page when on /admin/login)
  if (!session) {
    return <div className="min-h-screen bg-[#070709]">{children}</div>;
  }

  // Count new inquiries for sidebar badge
  const inquiries = await getInquiries(false);
  const newCount = inquiries.filter((i) => i.status === "new").length;

  return (
    <div className="min-h-screen bg-[#09090b] flex text-[#faf8f5]">
      {/* Sidebar (Desktop) */}
      <AdminSidebar newInquiriesCount={newCount} />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader userEmail={session.email} />
        <main className="flex-1 p-6 sm:p-10 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
