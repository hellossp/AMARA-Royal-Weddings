import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Camera,
  Film,
  Sparkles,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { getServices } from "@/lib/data-store";

export const metadata: Metadata = {
  title: "Vivah Offerings & Bespoke Packages",
  description:
    "Comprehensive luxury photography, 4K cinema films, and heirloom album coverage for Indian royal weddings, pre-weddings, engagements, receptions, and celebrations.",
};

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1917] pt-32 pb-24 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C2222] font-semibold">
            ॥ शुभ विवाह संस्कार ॥ &bull; The Offerings
          </span>
          <h1 className="font-editorial-title text-4xl sm:text-6xl font-light text-[#1C1917]">
            Artistic Services & Vivah Suites
          </h1>
          <p className="text-sm sm:text-base text-[#5C524A] font-light leading-relaxed">
            Every Indian wedding in our atelier is documented with unhurried cultural devotion. 
            Below are our signature coverage modules, each fully customizable to your multi-day itinerary, family traditions, and travel requirements.
          </p>
        </div>

        {/* Services List - Editorial Detailed Rows */}
        <div className="space-y-16">
          {services.map((service, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                id={service.slug}
                key={service.id}
                className="scroll-mt-32 p-8 sm:p-12 bg-white border border-[#B68A35]/25 rounded-xs royal-shadow transition-all duration-300"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                    isReversed ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image Column (5 cols) */}
                  <div
                    className={`lg:col-span-5 relative aspect-[4/3] rounded-xs overflow-hidden border border-[#B68A35]/25 bg-[#FAF7F2] ${
                      isReversed ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <Image
                      src={service.imageUrl}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>

                  {/* Content Column (7 cols) */}
                  <div
                    className={`lg:col-span-7 space-y-6 ${
                      isReversed ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-[#8C2222] font-semibold">
                        Module ०{index + 1} &bull; {service.category}
                      </span>
                      <h2 className="font-editorial-title text-3xl sm:text-4xl font-normal text-[#1C1917]">
                        {service.title}
                      </h2>
                    </div>

                    <p className="text-sm text-[#4A433A] font-light leading-relaxed">
                      {service.fullDescription}
                    </p>

                    {/* Deliverables List */}
                    <div className="pt-2">
                      <p className="text-xs uppercase tracking-wider text-[#1C1917] font-semibold mb-3">
                        Included Deliverables:
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#5C524A] font-light">
                        {service.deliverables.map((item, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#B68A35] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Timeline & Equipment */}
                    <div className="pt-4 border-t border-[#B68A35]/15 flex flex-wrap items-center gap-6 text-xs text-[#6B6257]">
                      {service.timeline && (
                        <div className="flex items-center space-x-1.5 font-medium">
                          <Clock className="w-3.5 h-3.5 text-[#B68A35]" />
                          <span>Timeline: {service.timeline}</span>
                        </div>
                      )}
                    </div>

                    {/* CTA Actions */}
                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <Link
                        href={`/contact?service=${service.slug}`}
                        className="px-6 py-3 bg-[#B68A35] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#8C6518] transition-colors inline-flex items-center space-x-2 rounded-xs shadow-sm"
                      >
                        <span>Inquire For This Module</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>

                      <a
                        href={`https://wa.me/919820194820?text=Namaste%20Amara%20Studios,%20we%20are%20interested%20in%20the%20${encodeURIComponent(service.title)}%20package.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 border border-[#B68A35]/40 bg-white text-xs uppercase tracking-[0.2em] text-[#1C1917] font-medium hover:border-[#B68A35] hover:text-[#B68A35] transition-colors rounded-xs shadow-xs"
                      >
                        Quick WhatsApp Quote
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Multi-Day Packages Notice */}
        <section className="bg-[#F5EFEB] border border-[#B68A35]/30 p-8 sm:p-12 rounded-xs text-center max-w-4xl mx-auto space-y-6 royal-shadow">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C2222] font-semibold">
            Bespoke 3 to 4-Day Wedding Itineraries
          </span>

          <h3 className="font-editorial-title text-3xl sm:text-4xl font-light text-[#1C1917]">
            Planning a Multi-Function Celebration?
          </h3>

          <p className="text-sm text-[#5C524A] font-light max-w-xl mx-auto leading-relaxed">
            Most Indian weddings encompass Haldi, Mehendi, Sangeet, Saat Phere, and Reception. 
            We build custom proposals that combine lead photographers, cinema drone pilots, and same-day social snippet editors.
          </p>

          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-[#B68A35] text-[#FAF7F2] text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#8C6518] transition-colors rounded-xs shadow-md"
            >
              <span>Build A Custom Vivah Package</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
