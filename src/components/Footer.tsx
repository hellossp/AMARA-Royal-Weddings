"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F4EFEA] border-t border-[#B68A35]/20 text-[#5C524A] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Auspicious Heritage Heading */}
        <div className="text-center pb-14 border-b border-[#B68A35]/15">
          <p className="font-editorial-serif text-sm tracking-[0.25em] text-[#8C2222] uppercase mb-2">
            ॥ सात फेरे &bull; अटूट बंधन &bull; शाश्वत प्रेम ॥
          </p>
          <p className="font-editorial-title text-2xl sm:text-3xl text-[#1C1917] font-light">
            Preserving the sacred poetry of Indian celebrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 py-16 border-b border-[#B68A35]/15">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block group">
              <div className="flex items-center space-x-1.5">
                <span className="font-editorial-title text-3xl sm:text-4xl tracking-[0.2em] font-light text-[#1C1917] group-hover:text-[#B68A35] transition-colors">
                  AMARA
                </span>
                <span className="w-2 h-2 rounded-full bg-[#8C2222]" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#8C6518] mt-1 font-medium">
                Royal Indian Weddings &bull; Heritage Cinema
              </p>
            </Link>

            <p className="text-sm font-light text-[#5C524A] max-w-md leading-relaxed">
              An editorial atelier dedicated to documenting the regal splendour, sacred Vedic rituals, heartfelt Vidaai tears, and vibrant joy of Indian weddings across Rajasthan royal palaces, coastal Goa, South Indian temple venues, and global destinations.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com/amarastudios.films"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#B68A35]/30 bg-white/60 flex items-center justify-center text-[#1C1917] hover:text-[#B68A35] hover:border-[#B68A35] hover:shadow-sm transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://youtube.com/@amarastudiosfilms"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#B68A35]/30 bg-white/60 flex items-center justify-center text-[#1C1917] hover:text-[#B68A35] hover:border-[#B68A35] hover:shadow-sm transition-all"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
                </svg>
              </a>
              <a
                href="https://wa.me/919820194820"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#B68A35]/30 bg-white/60 flex items-center justify-center text-[#1C1917] hover:text-[#B68A35] hover:border-[#B68A35] hover:shadow-sm transition-all"
                aria-label="WhatsApp"
              >
                <span className="text-[11px] font-bold font-sans">WA</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#1C1917] font-semibold">
              The Collections
            </h4>
            <ul className="space-y-2.5 text-sm font-light">
              <li>
                <Link
                  href="/portfolio"
                  className="hover:text-[#B68A35] transition-colors"
                >
                  Royal Wedding Albums
                </Link>
              </li>
              <li>
                <Link
                  href="/films"
                  className="hover:text-[#B68A35] transition-colors"
                >
                  4K Cinema Wedding Films
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-[#B68A35] transition-colors"
                >
                  Vivah Packages & Deliverables
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#B68A35] transition-colors"
                >
                  Atelier Philosophy & Team
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#B68A35] transition-colors"
                >
                  Check Date Availability
                </Link>
              </li>
            </ul>
          </div>

          {/* Destinations & Presence */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#1C1917] font-semibold">
              Heritage Destinations
            </h4>
            <ul className="space-y-2 text-xs font-light text-[#6B6257]">
              <li>Udaipur &bull; Jaipur &bull; Jodhpur &bull; Jaisalmer</li>
              <li>Goa &bull; Alibaug &bull; Mumbai</li>
              <li>Delhi NCR &bull; Agra Palaces</li>
              <li>Kumarakom &bull; Kovalam, Kerala</li>
              <li>Hyderabad &bull; Bengaluru</li>
              <li>Tuscany &bull; Dubai &bull; Worldwide</li>
            </ul>
            <div className="pt-2 text-[11px] text-[#8C6518] flex items-center space-x-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#8C2222]" />
              <span>Pan-India Crew Availability</span>
            </div>
          </div>

          {/* Studio Concierge */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#1C1917] font-semibold">
              Studio Concierge
            </h4>
            <div className="space-y-3 text-xs font-light">
              <a
                href="mailto:concierge@amarastudios.in"
                className="flex items-center space-x-2 text-[#4A433A] hover:text-[#B68A35] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#B68A35]" />
                <span>concierge@amarastudios.in</span>
              </a>
              <a
                href="tel:+919820194820"
                className="flex items-center space-x-2 text-[#4A433A] hover:text-[#B68A35] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#B68A35]" />
                <span>+91 98201 94820</span>
              </a>
              <p className="text-[11px] text-[#7A6F64] pt-1">
                Ateliers in Mumbai (Bandra West), Delhi (Hauz Khas) & Udaipur. Consultations by appointment.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-1 text-xs text-[#8C2222] hover:underline uppercase tracking-wider font-medium"
                >
                  <span>Inquire For Your Dates</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-light text-[#7A6F64] space-y-4 sm:space-y-0">
          <p>
            &copy; {currentYear} AMARA STUDIOS. Fine Art Photography & Cinematography.
          </p>

          <div className="flex items-center space-x-6">
            <Link
              href="/admin"
              className="flex items-center space-x-1 hover:text-[#B68A35] transition-colors text-[11px]"
            >
              <ShieldCheck className="w-3 h-3 text-[#B68A35]" />
              <span>Studio Staff Portal</span>
            </Link>
            <span>&bull;</span>
            <span className="text-[11px]">Crafted with reverence in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
