"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime error captured:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#faf8f5] flex flex-col items-center justify-center px-6 py-24 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-full bg-red-950/40 border border-red-800/60 flex items-center justify-center mx-auto text-red-400">
          <AlertCircle className="w-8 h-8" />
        </div>

        <span className="text-xs uppercase tracking-[0.3em] text-red-400">
          Unexpected Error
        </span>

        <h1 className="font-editorial-title text-3xl sm:text-4xl font-light text-[#faf8f5]">
          Something Interrupted This Story
        </h1>

        <p className="text-xs sm:text-sm text-[#a09c95] font-light leading-relaxed">
          An error occurred while loading this page. Our technical team has been notified.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-3 bg-[#c5a059] text-[#09090b] text-xs uppercase tracking-widest font-medium hover:bg-[#e0c58e] transition-colors flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 border border-white/20 text-xs uppercase tracking-widest text-[#faf8f5] hover:border-[#c5a059] hover:text-[#c5a059] transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
