"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Images,
  Inbox,
  Sliders,
  Settings,
  PlusCircle,
  Film,
  Sparkles,
} from "lucide-react";

interface AdminSidebarProps {
  newInquiriesCount?: number;
}

export default function AdminSidebar({
  newInquiriesCount = 0,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const links = [
    {
      label: "Overview",
      href: "/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: "Albums & Gallery",
      href: "/admin/albums",
      icon: Images,
    },
    {
      label: "Client Inquiries",
      href: "/admin/inquiries",
      icon: Inbox,
      badge: newInquiriesCount > 0 ? newInquiriesCount : undefined,
    },
    {
      label: "Services & Packages",
      href: "/admin/services",
      icon: Sliders,
    },
    {
      label: "Website Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-64 bg-[#0a0a0c] border-r border-white/[0.08] flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        {/* Brand */}
        <div className="p-6 border-b border-white/[0.08]">
          <Link href="/admin" className="block group">
            <span className="font-editorial-title text-xl tracking-[0.2em] font-light text-[#faf8f5] group-hover:text-[#c5a059] transition-colors">
              AMARA
            </span>
            <p className="text-[9px] uppercase tracking-[0.35em] text-[#a09c95]">
              Studio Operations
            </p>
          </Link>
        </div>

        {/* Quick New Album Action */}
        <div className="p-4 border-b border-white/[0.08]">
          <Link
            href="/admin/albums/new"
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-3 bg-[#c5a059] text-[#09090b] text-xs uppercase tracking-wider font-medium hover:bg-[#e0c58e] transition-colors rounded-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Album</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1" aria-label="Admin Navigation">
          {links.map((link) => {
            const isActive = link.exact
              ? pathname === link.href
              : pathname?.startsWith(link.href);

            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-sm text-xs font-light tracking-wide transition-colors ${
                  isActive
                    ? "bg-[#c5a059]/10 text-[#c5a059] font-medium border border-[#c5a059]/30"
                    : "text-[#a09c95] hover:text-[#faf8f5] hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </div>

                {link.badge !== undefined && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#c5a059] text-[#09090b]">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-white/[0.08] text-[11px] text-[#6e6b65] space-y-1">
        <p className="font-light">AMARA CMS v2.4</p>
        <p className="text-[10px]">Secure RLS Protected</p>
      </div>
    </aside>
  );
}
