import React from "react";
import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle, Clock, ShieldCheck, Sparkles } from "lucide-react";
import InquiryForm from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Inquire & Reserve Your Wedding Dates",
  description:
    "Check availability and request a bespoke photography and cinematography proposal for your upcoming royal wedding or celebration in India or worldwide.",
};

export const revalidate = 0;
export const dynamic = "force-dynamic";

interface ContactPageProps {
  searchParams: Promise<{
    eventType?: string;
    service?: string;
  }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const initialEventType = params.eventType || "";
  const initialService =
    params.service === "cinematic-wedding-films"
      ? "cinematography"
      : params.service === "wedding-photography"
      ? "photography"
      : "both";

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1917] pt-32 pb-24 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Banner */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C2222] font-semibold">
            ॥ शुभ विवाह आरंभ ॥ &bull; Begin The Journey
          </span>
          <h1 className="font-editorial-title text-4xl sm:text-6xl font-light text-[#1C1917]">
            Plan Your Vivah
          </h1>
          <p className="text-sm sm:text-base text-[#5C524A] font-light leading-relaxed">
            Every Indian wedding in our atelier is documented with unhurried cultural reverence. 
            Kindly share your ceremony dates and functions below, and our studio concierge will respond within 24 hours with dates, pricing options, and next steps.
          </p>
        </div>

        {/* Two Columns: Form & Studio Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Form Column (8 cols) */}
          <div className="lg:col-span-8">
            <InquiryForm
              initialEventType={initialEventType}
              initialService={initialService}
            />
          </div>

          {/* Right Sidebar Info (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick WhatsApp Card */}
            <div className="p-8 bg-white border border-[#B68A35]/35 rounded-xs space-y-4 royal-shadow">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#B68A35]/50 flex items-center justify-center text-[#8C2222]">
                <MessageCircle className="w-5 h-5 text-[#8C2222]" />
              </div>
              <h3 className="font-editorial-title text-2xl text-[#1C1917]">
                Direct WhatsApp Concierge
              </h3>
              <p className="text-xs text-[#5C524A] font-light leading-relaxed">
                Connect directly with our creative team on WhatsApp for instant calendar check and wedding brochure access.
              </p>
              <a
                href="https://wa.me/919820194820?text=Namaste%20Amara%20Studios,%20we%20are%20planning%20our%20wedding%20and%20would%20love%20to%20check%20date%20availability."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3 bg-[#B68A35] text-[#FAF7F2] text-xs uppercase tracking-widest font-medium hover:bg-[#8C6518] transition-colors rounded-xs shadow-sm"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Direct Studio Coordinates */}
            <div className="p-8 bg-white border border-[#B68A35]/25 rounded-xs space-y-6 royal-shadow">
              <h4 className="text-xs uppercase tracking-[0.25em] text-[#1C1917] font-semibold border-b border-[#B68A35]/15 pb-3">
                Studio Coordinates
              </h4>

              <div className="space-y-4 text-xs font-light">
                <div className="flex items-start space-x-3 text-[#1C1917]">
                  <Mail className="w-4 h-4 text-[#B68A35] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] uppercase text-[#8C6518] font-medium">Concierge Desk</p>
                    <a
                      href="mailto:concierge@amarastudios.in"
                      className="hover:text-[#B68A35] transition-colors text-sm"
                    >
                      concierge@amarastudios.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-[#1C1917]">
                  <Phone className="w-4 h-4 text-[#B68A35] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] uppercase text-[#8C6518] font-medium">Studio Direct</p>
                    <a
                      href="tel:+919820194820"
                      className="hover:text-[#B68A35] transition-colors text-sm"
                    >
                      +91 98201 94820
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-[#1C1917]">
                  <MapPin className="w-4 h-4 text-[#8C2222] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] uppercase text-[#8C6518] font-medium">Ateliers In</p>
                    <p className="text-[#5C524A] text-xs">
                      Mumbai (Bandra West) &bull; Delhi (Hauz Khas) &bull; Udaipur (Old City)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-[#1C1917]">
                  <Clock className="w-4 h-4 text-[#B68A35] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] uppercase text-[#8C6518] font-medium">Consultation Hours</p>
                    <p className="text-[#5C524A] text-xs">
                      Monday – Saturday &bull; 10:00 AM – 8:00 PM IST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy & Confidentiality Guarantee */}
            <div className="p-6 bg-[#F5EFEB] border border-[#B68A35]/25 rounded-xs text-xs text-[#5C524A] space-y-2 flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 text-[#8C2222] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Strict confidentiality is observed for all prominent families and high-profile destination celebrations. Non-disclosure agreements (NDAs) available upon request.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
