"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, MessageCircle, Lock, Sparkles, Camera } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  // Hide main navigation on admin routes
  const isAdminRoute = pathname?.startsWith("/admin");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileOpen]);

  // Close on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  if (isAdminRoute) {
    return null;
  }

  const navLinks = [
    { label: "Wedding Stories", href: "/portfolio" },
    { label: "Cinema Films", href: "/films" },
    { label: "Offerings & Vivah", href: "/services" },
    { label: "Our Story", href: "/about" },
    { label: "Inquire & Dates", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full overflow-x-clip ${
        isScrolled
          ? "bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#B68A35]/25 py-3 shadow-xs"
          : "bg-gradient-to-b from-[#FAF7F2]/95 via-[#FAF7F2]/80 to-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Brand Logo with Indian Cultural Identity */}
        <Link
          href="/"
          className="group flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B68A35] rounded-xs"
        >
          <div className="flex items-center space-x-1.5">
            <span className="font-editorial-title text-2xl sm:text-3xl tracking-[0.2em] font-light text-[#1C1917] group-hover:text-[#B68A35] transition-colors duration-300">
              AMARA
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C2222]" />
          </div>
          <span className="text-[9px] uppercase tracking-[0.35em] text-[#6B6257] -mt-0.5 group-hover:text-[#B68A35] transition-colors">
            Royal Weddings &bull; Cinema
          </span>
        </Link>

        {/* Desktop Navigation Links (Large screens) */}
        <nav
          className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-xs uppercase tracking-[0.16em] font-medium whitespace-nowrap"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-300 hover:text-[#B68A35] relative py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B68A35] ${
                  isActive ? "text-[#B68A35] font-semibold" : "text-[#4A433A]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B68A35]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions (Desktop) */}
        <div className="hidden lg:flex items-center space-x-3">
          <a
            href="https://wa.me/919820194820?text=Namaste%20Amara%20Studios,%20we%20are%20planning%20our%20wedding%20and%20would%20love%20to%20discuss%20photography%20and%20films."
            target="_blank"
            rel="noopener noreferrer"
            title="Chat directly on WhatsApp"
            className="p-2.5 rounded-full border border-[#B68A35]/35 bg-white/80 text-[#4A433A] hover:text-[#B68A35] hover:border-[#B68A35] hover:shadow-xs transition-all focus-visible:ring-2 focus-visible:ring-[#B68A35]"
            aria-label="Connect on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 text-[#1C1917]" />
          </a>

          <Link
            href="/contact"
            className="group flex items-center space-x-2 text-xs uppercase tracking-[0.2em] px-5 py-2.5 bg-[#B68A35] text-[#FAF7F2] hover:bg-[#8C6518] rounded-xs transition-all duration-300 shadow-xs focus-visible:ring-2 focus-visible:ring-[#B68A35] focus-visible:ring-offset-2"
          >
            <span>Plan Your Vivah</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Mobile & Tablet Actions: Compact Inquire + Hamburger Button */}
        <div className="flex lg:hidden items-center space-x-2">
          <Link
            href="/contact"
            className="text-[11px] sm:text-xs uppercase tracking-wider px-3.5 py-1.5 bg-[#B68A35] text-[#FAF7F2] font-medium rounded-xs shadow-xs hover:bg-[#8C6518] transition-colors focus-visible:ring-2 focus-visible:ring-[#B68A35]"
          >
            Inquire
          </Link>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 text-[#1C1917] hover:text-[#B68A35] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B68A35] rounded-xs"
            aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile & Tablet Drawer Menu */}
      {isMobileOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation"
          className="lg:hidden fixed inset-0 top-[57px] sm:top-[65px] bg-[#FAF7F2]/98 backdrop-blur-2xl z-40 px-6 sm:px-8 py-7 flex flex-col justify-between border-t border-[#B68A35]/25 animate-in fade-in slide-in-from-top-2 duration-200 overflow-y-auto"
        >
          <div className="space-y-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#8C2222] font-semibold">
              ॥ AMARA ATELIER NAVIGATION ॥
            </span>
            <nav className="flex flex-col space-y-3.5" aria-label="Mobile Navigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`font-editorial-title text-2xl font-light transition-colors py-1 ${
                      isActive ? "text-[#B68A35] font-normal" : "text-[#1C1917] hover:text-[#B68A35]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-[#B68A35]/20 space-y-4">
            <div className="text-xs text-[#6B6257] space-y-1">
              <p className="tracking-wider uppercase text-[10px] font-semibold text-[#8C2222]">
                Studio Concierge &bull; Mumbai &bull; Delhi &bull; Udaipur
              </p>
              <p className="text-[#1C1917] font-medium">+91 98201 94820</p>
              <p className="text-[#1C1917]">concierge@amarastudios.in</p>
            </div>

            <div className="flex flex-col gap-2.5 pt-2">
              <Link
                href="/contact"
                onClick={() => setIsMobileOpen(false)}
                className="w-full py-3 bg-[#B68A35] hover:bg-[#8C6518] text-[#FAF7F2] text-center uppercase tracking-[0.2em] text-xs font-medium rounded-xs shadow-xs transition-colors flex items-center justify-center space-x-1.5"
              >
                <span>Plan Your Vivah</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <div className="flex items-center space-x-2">
                <a
                  href="https://wa.me/919820194820"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 bg-white/80 hover:bg-white border border-[#B68A35]/35 text-[#1C1917] text-center uppercase tracking-widest text-xs font-medium rounded-xs transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#8C2222]" />
                  <span>WhatsApp Concierge</span>
                </a>
                <Link
                  href="/admin"
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2.5 bg-white/80 border border-[#B68A35]/35 text-[#6B6257] hover:text-[#1C1917] rounded-xs"
                  title="Staff Portal"
                  aria-label="Staff Portal"
                >
                  <Lock className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
