"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, ExternalLink, Menu, X, ShieldCheck } from "lucide-react";

interface AdminHeaderProps {
  userEmail: string;
}

export default function AdminHeader({ userEmail }: AdminHeaderProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="h-16 border-b border-white/[0.08] bg-[#0c0c0e] px-6 sm:px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center space-x-3">
        <span className="text-[11px] uppercase tracking-widest text-[#c5a059] flex items-center space-x-1.5">
          <ShieldCheck className="w-4 h-4" />
          <span>Staff Portal</span>
        </span>
      </div>

      <div className="flex items-center space-x-5 text-xs">
        <Link
          href="/"
          target="_blank"
          className="text-[#a09c95] hover:text-[#faf8f5] flex items-center space-x-1.5 transition-colors"
          title="Open public website in new tab"
        >
          <span>View Live Website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <span className="text-white/20">|</span>

        <span className="text-[#a09c95] font-light hidden sm:inline truncate max-w-[180px]">
          {userEmail}
        </span>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center space-x-1.5 px-3 py-1.5 border border-white/10 hover:border-red-800 hover:text-red-400 rounded-sm text-[#a09c95] transition-colors"
          title="Sign out of admin session"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </header>
  );
}
