"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, KeyRound, Loader2, AlertCircle, ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setErrorMessage(data.error || "Invalid administrator credentials.");
      }
    } catch (err) {
      setErrorMessage("Network error communicating with authentication service.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemoCredentials = () => {
    setEmail("admin@amarastudios.in");
    setPassword("amara-luxury-2026");
  };

  return (
    <div className="min-h-screen bg-[#070709] flex flex-col justify-center items-center px-6 py-12 text-[#faf8f5]">
      {/* Back to public website */}
      <div className="w-full max-w-md mb-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#a09c95] hover:text-[#c5a059] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Public Portfolio</span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-[#121215] border border-white/10 rounded-sm p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Subtle Gold Accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#c5a059]" />

        {/* Brand Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="w-12 h-12 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/40 flex items-center justify-center mx-auto mb-3 text-[#c5a059]">
            <Lock className="w-5 h-5" />
          </div>
          <span className="font-editorial-title text-2xl tracking-[0.2em] font-light text-[#faf8f5]">
            AMARA STUDIOS
          </span>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#a09c95]">
            Studio Operations & Content Portal
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-950/40 border border-red-800/60 rounded-sm flex items-start space-x-3 text-red-300 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d1ccc4] mb-2">
              Staff Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@amarastudios.in"
                className="w-full bg-[#09090b] border border-white/10 px-4 py-3 pl-10 text-sm text-[#faf8f5] placeholder-[#55524c] focus:outline-none focus:border-[#c5a059] rounded-sm transition-colors"
              />
              <Mail className="w-4 h-4 text-[#a09c95] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d1ccc4] mb-2">
              Security Key / Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#09090b] border border-white/10 px-4 py-3 pl-10 text-sm text-[#faf8f5] placeholder-[#55524c] focus:outline-none focus:border-[#c5a059] rounded-sm transition-colors"
              />
              <KeyRound className="w-4 h-4 text-[#a09c95] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-[#c5a059] text-[#09090b] text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#e0c58e] disabled:opacity-50 transition-colors shadow-lg flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying Access...</span>
              </>
            ) : (
              <span>Enter Staff Dashboard</span>
            )}
          </button>
        </form>

        {/* Demo Fast-Login Helper */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] text-center space-y-3">
          <p className="text-[11px] text-[#a09c95] font-light">
            Testing environment or first-time setup?
          </p>
          <button
            type="button"
            onClick={handleFillDemoCredentials}
            className="text-xs text-[#c5a059] hover:underline uppercase tracking-wider"
          >
            Fill Master Credentials
          </button>
        </div>
      </div>
    </div>
  );
}
