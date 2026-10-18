import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#faf8f5] flex flex-col items-center justify-center px-6 py-24 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/40 flex items-center justify-center mx-auto text-[#c5a059]">
          <Sparkles className="w-8 h-8" />
        </div>

        <span className="text-xs uppercase tracking-[0.3em] text-[#c5a059]">
          404 &bull; Page Not Found
        </span>

        <h1 className="font-editorial-title text-4xl sm:text-5xl font-light text-[#faf8f5]">
          A Moment Lost to Time
        </h1>

        <p className="text-xs sm:text-sm text-[#a09c95] font-light leading-relaxed">
          The page or album collection you are seeking might have been renamed or retired. 
          Return to our curated archives to continue exploring our documented stories.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-[#c5a059] text-[#09090b] text-xs uppercase tracking-widest font-medium hover:bg-[#e0c58e] transition-colors"
          >
            Return to Homepage
          </Link>
          <Link
            href="/portfolio"
            className="w-full sm:w-auto px-6 py-3 border border-white/20 text-xs uppercase tracking-widest text-[#faf8f5] hover:border-[#c5a059] hover:text-[#c5a059] transition-colors"
          >
            Browse Collections
          </Link>
        </div>
      </div>
    </div>
  );
}
