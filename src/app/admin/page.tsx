import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Images,
  Inbox,
  Calendar,
  Sparkles,
  PlusCircle,
  Sliders,
  ArrowUpRight,
  Clock,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { getAdminSession } from "@/lib/auth";
import { getAlbums, getInquiries, getServices } from "@/lib/data-store";

export const revalidate = 0; // Live dynamic data on dashboard

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const [albums, inquiries, services] = await Promise.all([
    getAlbums(true), // include unpublished
    getInquiries(false),
    getServices(true),
  ]);

  const publishedAlbumsCount = albums.filter((a) => a.isPublished).length;
  const draftAlbumsCount = albums.filter((a) => !a.isPublished).length;
  const totalInquiries = inquiries.length;
  const newInquiries = inquiries.filter((i) => i.status === "new");

  // Upcoming event dates (filtered for future dates or sorted)
  const upcomingEvents = inquiries
    .filter((i) => i.eventDate)
    .sort((a, b) => (a.eventDate! > b.eventDate! ? 1 : -1))
    .slice(0, 4);

  const recentInquiries = inquiries.slice(0, 5);

  return (
    <div className="space-y-10 max-w-7xl">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059]">
            Studio Operations Center
          </span>
          <h1 className="font-editorial-title text-3xl sm:text-4xl font-light text-[#faf8f5]">
            Dashboard Overview
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/albums/new"
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#c5a059] text-[#09090b] text-xs uppercase tracking-wider font-medium hover:bg-[#e0c58e] transition-colors rounded-sm shadow-md"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Album</span>
          </Link>
          <Link
            href="/admin/inquiries"
            className="inline-flex items-center space-x-2 px-4 py-2.5 border border-white/10 hover:border-[#c5a059] text-xs uppercase tracking-wider text-[#faf8f5] transition-colors rounded-sm"
          >
            <Inbox className="w-4 h-4 text-[#c5a059]" />
            <span>View Inquiries ({newInquiries.length} New)</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Published Albums */}
        <div className="p-6 bg-[#121215] border border-white/[0.08] rounded-sm space-y-2">
          <div className="flex items-center justify-between text-[#a09c95]">
            <span className="text-xs uppercase tracking-wider">Published Albums</span>
            <Images className="w-4 h-4 text-[#c5a059]" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-editorial-title text-3xl sm:text-4xl text-[#faf8f5]">
              {publishedAlbumsCount}
            </span>
            {draftAlbumsCount > 0 && (
              <span className="text-xs text-[#a09c95]">({draftAlbumsCount} drafts)</span>
            )}
          </div>
          <p className="text-[11px] text-[#6e6b65] pt-1">
            Live on public portfolio gallery
          </p>
        </div>

        {/* Card 2: Total Inquiries */}
        <div className="p-6 bg-[#121215] border border-white/[0.08] rounded-sm space-y-2">
          <div className="flex items-center justify-between text-[#a09c95]">
            <span className="text-xs uppercase tracking-wider">Total Leads</span>
            <Inbox className="w-4 h-4 text-[#c5a059]" />
          </div>
          <p className="font-editorial-title text-3xl sm:text-4xl text-[#faf8f5]">
            {totalInquiries}
          </p>
          <p className="text-[11px] text-[#6e6b65] pt-1">
            Stored securely in database
          </p>
        </div>

        {/* Card 3: Actionable New Leads */}
        <div className="p-6 bg-[#121215] border border-[#c5a059]/40 rounded-sm space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-[#c5a059]">
            <span className="text-xs uppercase tracking-wider font-medium">New Inquiries</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <p className="font-editorial-title text-3xl sm:text-4xl text-[#faf8f5]">
            {newInquiries.length}
          </p>
          <p className="text-[11px] text-[#a09c95] pt-1">
            Awaiting concierge review
          </p>
        </div>

        {/* Card 4: Active Services */}
        <div className="p-6 bg-[#121215] border border-white/[0.08] rounded-sm space-y-2">
          <div className="flex items-center justify-between text-[#a09c95]">
            <span className="text-xs uppercase tracking-wider">Active Services</span>
            <Sliders className="w-4 h-4 text-[#c5a059]" />
          </div>
          <p className="font-editorial-title text-3xl sm:text-4xl text-[#faf8f5]">
            {services.filter((s) => s.isActive).length}
          </p>
          <p className="text-[11px] text-[#6e6b65] pt-1">
            Configured offerings online
          </p>
        </div>
      </div>

      {/* Two Column Section: Upcoming Event Dates & Recent Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Recent Inquiries Table (8 cols) */}
        <div className="lg:col-span-8 bg-[#121215] border border-white/[0.08] rounded-sm p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div>
              <h2 className="font-editorial-title text-xl text-[#faf8f5]">
                Recent Inquiries
              </h2>
              <p className="text-xs text-[#a09c95]">
                Latest event submissions from potential couples and clients
              </p>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs uppercase tracking-wider text-[#c5a059] hover:underline"
            >
              View All &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[#a09c95] uppercase tracking-wider border-b border-white/[0.06]">
                <tr>
                  <th className="pb-3 font-medium">Client</th>
                  <th className="pb-3 font-medium">Event Type</th>
                  <th className="pb-3 font-medium">Location</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {recentInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-white/[0.02]">
                    <td className="py-3 font-medium text-[#faf8f5]">
                      {inq.fullName}
                      <p className="text-[11px] text-[#8e8a83] font-light">{inq.phone}</p>
                    </td>
                    <td className="py-3 text-[#d1ccc4]">{inq.eventType}</td>
                    <td className="py-3 text-[#a09c95]">{inq.location}</td>
                    <td className="py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                          inq.status === "new"
                            ? "bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/40"
                            : inq.status === "contacted"
                            ? "bg-blue-950/40 text-blue-300 border border-blue-800/40"
                            : inq.status === "qualified"
                            ? "bg-purple-950/40 text-purple-300 border border-purple-800/40"
                            : inq.status === "booked"
                            ? "bg-emerald-950/40 text-emerald-300 border border-emerald-800/40"
                            : "bg-stone-800 text-stone-300"
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <Link
                        href={`/admin/inquiries?id=${inq.id}`}
                        className="text-[#c5a059] hover:underline"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Upcoming Celebration Dates (4 cols) */}
        <div className="lg:col-span-4 bg-[#121215] border border-white/[0.08] rounded-sm p-6 space-y-6">
          <div className="border-b border-white/[0.08] pb-4 flex items-center justify-between">
            <div>
              <h2 className="font-editorial-title text-xl text-[#faf8f5]">
                Upcoming Event Dates
              </h2>
              <p className="text-xs text-[#a09c95]">Dates extracted from inquiries</p>
            </div>
            <Calendar className="w-4 h-4 text-[#c5a059]" />
          </div>

          <div className="space-y-4">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="p-3.5 bg-[#09090b] border border-white/[0.06] rounded-sm space-y-1"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#faf8f5]">{ev.fullName}</span>
                    <span className="font-mono text-[#c5a059] text-[11px]">
                      {ev.eventDate}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#a09c95]">
                    {ev.eventType} &bull; {ev.location}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-[#6e6b65] py-4">No event dates logged yet.</p>
            )}
          </div>

          <div className="pt-4 border-t border-white/[0.08] space-y-2">
            <p className="text-xs uppercase tracking-wider text-[#faf8f5] font-medium">
              Quick Management Links
            </p>
            <div className="flex flex-col space-y-1.5 text-xs text-[#a09c95]">
              <Link
                href="/admin/albums"
                className="hover:text-[#c5a059] flex items-center justify-between"
              >
                <span>Manage Published Albums</span>
                <span>&rarr;</span>
              </Link>
              <Link
                href="/admin/services"
                className="hover:text-[#c5a059] flex items-center justify-between"
              >
                <span>Configure Services & Deliverables</span>
                <span>&rarr;</span>
              </Link>
              <Link
                href="/admin/settings"
                className="hover:text-[#c5a059] flex items-center justify-between"
              >
                <span>Update Contact & Studio Settings</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
