import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Camera,
  Film,
  MapPin,
  Heart,
  ArrowUpRight,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Atelier Story & Cultural Philosophy",
  description:
    "Learn about AMARA STUDIOS, our creative directors, artistic philosophy, cinema craftsmanship, and Pan-India wedding travel logistics.",
};

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default function AboutPage() {
  const faqs = [
    {
      q: "Where are you based and how does Pan-India travel work?",
      a: "Our core studio ateliers are based in Mumbai, Delhi, and Udaipur. However, our teams travel all across India (Goa, Jaipur, Jodhpur, Kerala, Hyderabad, Bengaluru, etc.) and internationally. All travel, flight, and accommodation arrangements can either be booked by our studio and invoiced, or handled directly by your wedding planning team.",
    },
    {
      q: "What is your photography and cinematography philosophy?",
      a: "We practice an editorial documentary approach with deep cultural reverence. That means we don't disrupt your sacred rituals with artificial staging or blinding umbrellas. We capture spontaneous emotions as they happen, paired with guided, effortless couple portraits during golden hour.",
    },
    {
      q: "When should we book our wedding dates?",
      a: "Because we take only a limited number of assignments per season to guarantee undivided artistic attention, dates for peak Indian wedding seasons (October to March) are typically reserved 6 to 12 months in advance.",
    },
    {
      q: "What is the delivery timeline for photos and films?",
      a: "Within 48 hours of your wedding, we deliver a 25-image 'Sneak Peek' collection for your immediate sharing. The complete set of 700+ color-graded photographs is delivered in 5 to 7 weeks. Cinematic trailers and feature films are delivered in 6 to 8 weeks.",
    },
    {
      q: "Do you deliver raw video footage and unedited photographs?",
      a: "We deliver every good photograph taken, individually corrected and hand-graded. For cinematography, we provide full unedited continuous multi-camera recordings of key ceremonies (such as complete Pheras, Sangeet performances, and speeches) in high-definition alongside your edited cinema films.",
    },
    {
      q: "Can we customize our photography and film package?",
      a: "Absolutely. Every wedding has a unique cadence. We offer modular combinations so you can select the exact number of photographers, cinematographers, drone pilots, and fine-art albums tailored to your itinerary.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1917] pt-32 pb-24 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-28">
        {/* 1. HERO SECTION */}
        <div className="max-w-4xl space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C2222] font-semibold">
            ॥ हमारी परंपरा एवं कला ॥ &bull; The Atelier Story
          </span>
          <h1 className="font-editorial-title text-4xl sm:text-6xl md:text-7xl font-light text-[#1C1917] leading-tight">
            We believe wedding memories should feel like <span className="italic font-serif text-[#B68A35]">heirlooms</span>, not content.
          </h1>
          <p className="text-sm sm:text-lg text-[#5C524A] font-light leading-relaxed max-w-2xl">
            AMARA STUDIOS was founded with a singular conviction: that the sacred unions and rich heritage of Indian weddings deserve to be documented with the restraint, grace, and timelessness of classic cinema.
          </p>
        </div>

        {/* 2. SPLIT STORY & EDITORIAL IMAGES */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative aspect-[3/4] rounded-xs overflow-hidden border border-[#B68A35]/30 shadow-xl bg-white">
            <Image
              src="https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&q=85&w=1200"
              alt="Bridal portraiture craft"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
              <p className="font-editorial-serif italic text-sm text-[#FAF7F2]">
                &ldquo;A photograph is a pause button on fleeting human grace.&rdquo;
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8 font-light text-sm sm:text-base text-[#5C524A] leading-relaxed">
            <h2 className="font-editorial-title text-3xl sm:text-4xl text-[#1C1917]">
              Documentary Truth Meets Royal Poetry
            </h2>

            <p>
              In an era dominated by rapid social media trends, fleeting filters, and loud gimmicks, we choose depth. We listen to the subtle pauses between wedding vows, the tear wiped discreetly by a father during the Kanyadaan, and the unrestrained laughter shared over morning tea with childhood friends.
            </p>

            <p>
              Our team consists of seasoned documentary photographers, licensed drone aerial pilots, sound engineers, and colorists who treat each wedding not as an &apos;assignment&apos;, but as an enduring visual chronicle for future generations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#B68A35]/15 text-xs">
              <div className="p-4 bg-white border border-[#B68A35]/25 rounded-xs royal-shadow">
                <p className="text-[#1C1917] font-semibold uppercase tracking-wider mb-1">
                  Gentle Discretion
                </p>
                <p className="text-[#6B6257]">
                  We never interrupt sacred rituals or blind your guests with invasive flash umbrellas.
                </p>
              </div>

              <div className="p-4 bg-white border border-[#B68A35]/25 rounded-xs royal-shadow">
                <p className="text-[#1C1917] font-semibold uppercase tracking-wider mb-1">
                  Archival Color Palette
                </p>
                <p className="text-[#6B6257]">
                  Hand-graded tones designed to look just as breathtaking thirty years from today.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CRAFTSMANSHIP & EQUIPMENT STANDARDS */}
        <section className="bg-white border border-[#B68A35]/25 p-8 sm:p-14 rounded-xs space-y-12 royal-shadow">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#8C2222] font-semibold">
              The Precision
            </span>
            <h2 className="font-editorial-title text-3xl sm:text-4xl font-light text-[#1C1917]">
              Cinema Gear & Archival Standards
            </h2>
            <p className="text-sm text-[#5C524A] font-light">
              We employ cinema-grade optics and museum-standard preservation techniques to protect your irreplaceable memories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#B68A35]/15 border border-[#B68A35]/40 flex items-center justify-center text-[#B68A35]">
                <Camera className="w-5 h-5" />
              </div>
              <h3 className="font-editorial-title text-xl text-[#1C1917]">
                Medium-Format & Prime Optics
              </h3>
              <p className="text-xs text-[#5C524A] leading-relaxed font-light">
                Utilizing high-resolution Sony Alpha and FX series sensor bodies paired with bespoke G-Master 35mm, 50mm, and 85mm prime glass for ethereal depth of field.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#B68A35]/15 border border-[#B68A35]/40 flex items-center justify-center text-[#B68A35]">
                <Film className="w-5 h-5" />
              </div>
              <h3 className="font-editorial-title text-xl text-[#1C1917]">
                Live Mandap Audio Recording
              </h3>
              <p className="text-xs text-[#5C524A] leading-relaxed font-light">
                Wireless Sennheiser and Rode acoustic lavaliers discreetly worn by the couple and officiants ensure every whisper, vow, and speech is recorded with pristine acoustic clarity.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#B68A35]/15 border border-[#B68A35]/40 flex items-center justify-center text-[#B68A35]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-editorial-title text-xl text-[#1C1917]">
                Redundant Triple Backups
              </h3>
              <p className="text-xs text-[#5C524A] leading-relaxed font-light">
                Dual card recording on every camera, paired with on-site rugged SSD RAID backups at the end of every shooting day, followed by encrypted cloud storage.
              </p>
            </div>
          </div>
        </section>

        {/* 4. FREQUENTLY ASKED QUESTIONS */}
        <section className="space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#8C2222] font-semibold flex items-center space-x-2">
              <HelpCircle className="w-4 h-4 text-[#8C2222]" />
              <span>Clarity & Transparency</span>
            </span>
            <h2 className="font-editorial-title text-3xl sm:text-5xl font-light text-[#1C1917]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-8 bg-white border border-[#B68A35]/20 space-y-3 rounded-xs royal-shadow"
              >
                <h3 className="text-sm font-semibold text-[#1C1917] tracking-wide">
                  {faq.q}
                </h3>
                <p className="text-xs text-[#5C524A] font-light leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. INVITATION CTA */}
        <section className="text-center max-w-3xl mx-auto space-y-6 pt-12 border-t border-[#B68A35]/20">
          <h2 className="font-editorial-title text-3xl sm:text-5xl font-light text-[#1C1917]">
            Let&apos;s start with a warm cup of chai.
          </h2>
          <p className="text-sm text-[#5C524A] font-light">
            We love meeting our couples over coffee in Mumbai or Delhi, or via an unhurried video call.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-[#B68A35] text-[#FAF7F2] text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#8C6518] transition-colors inline-flex items-center space-x-2 rounded-xs shadow-md"
            >
              <span>Schedule A Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-3.5 border border-[#B68A35]/40 bg-white text-xs uppercase tracking-[0.25em] font-medium text-[#1C1917] hover:border-[#B68A35] hover:text-[#B68A35] transition-colors rounded-xs shadow-xs"
            >
              Explore Our Work
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
