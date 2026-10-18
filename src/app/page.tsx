import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Sparkles,
  MapPin,
  Heart,
  Film as FilmIcon,
  Flame,
  Sun,
  Camera,
  ShieldCheck,
} from "lucide-react";
import { getFeaturedAlbums, getServices, getFilms } from "@/lib/data-store";
import AlbumCard from "@/components/AlbumCard";
import HomeFilmPlayer from "@/components/HomeFilmPlayer";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featuredAlbums, services, films] = await Promise.all([
    getFeaturedAlbums(),
    getServices(),
    getFilms(),
  ]);

  const showcaseFilms = films.slice(0, 3);
  const featuredServices = services.slice(0, 6);

  // Indian Wedding Ceremony Steps
  const ceremonies = [
    {
      step: "०१",
      title: "Haldi & Phoolon Ki Holi",
      subtitle: "The Turmeric & Marigold Blessing",
      desc: "Joyous laughter, turmeric showers, vibrant marigold petals, and uninhibited emotional energy among closest family.",
      image: "/images/weddings/haldi-phoolon-holi.jpg",
    },
    {
      step: "०२",
      title: "Mehendi & Sangeet",
      subtitle: "Henna Narratives & The Dhol Beat",
      desc: "Intricate bridal henna artwork, acoustic folk melodies, twirling lehengas, and high-energy stage performances.",
      image: "/images/weddings/mehendi-henna.jpg",
    },
    {
      step: "०३",
      title: "Saat Phere & Mandap",
      subtitle: "The Seven Sacred Vedic Vows",
      desc: "Under canopies of jasmine and tuberoses, the holy Agni, Kanyadaan blessings, and the emotional tenderness of Vidaai.",
      image: "/images/weddings/saat-phere-mandap.jpg",
    },
    {
      step: "०४",
      title: "The Royal Reception",
      subtitle: "Legacy, Chandeliers & Celebration",
      desc: "A timeless black-tie and royal couture gala celebrating the joining of two families under majestic palace chandeliers.",
      image: "/images/weddings/shahi-reception.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1917] overflow-hidden">
      {/* 1. HERO SECTION - ROYAL INDIAN WEDDINGS */}
      <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-28 pb-10 sm:pb-16 px-4 sm:px-6">
        {/* Warm Indian Wedding Background with Balanced Ivory Contrast Shield */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/weddings/pichola-jaimala.jpg"
            alt="Royal Indian Wedding by Amara Studios"
            fill
            sizes="100vw"
            className="object-cover object-[center_28%] sm:object-center transition-transform duration-1000 ease-out"
            priority
          />
          {/* Base Warm Tint - Preserves rich red lehenga, gold sherwani, and lake colors */}
          <div className="absolute inset-0 bg-[#FAF7F2]/30 sm:bg-[#FAF7F2]/25" />
          {/* Balanced Radial Warm Ivory Shield - Clear contrast behind text, vibrant at edges */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(250,247,242,0.92)_0%,rgba(250,247,242,0.72)_55%,rgba(250,247,242,0.2)_100%)]" />
          {/* Subtle Top & Bottom Seamless Blends */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#FAF7F2]/90 via-[#FAF7F2]/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-2 sm:px-6 text-center flex flex-col items-center">
          {/* Auspicious Eyebrow Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#B68A35]/40 bg-white/85 backdrop-blur-md mb-4 sm:mb-6 shadow-xs">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#8C6518] font-semibold">
              ॥ शुभ विवाह ॥ &bull; ROYAL INDIAN WEDDINGS &bull; HERITAGE CINEMA
            </span>
          </div>

          <h1 className="font-serif font-light text-[clamp(2.125rem,4.5vw+0.75rem,5.25rem)] leading-[1.08] tracking-tight text-[#1C1917] max-w-4xl">
            We preserve the <span className="italic text-[#B68A35]">sacred vows</span>
            <br className="hidden sm:inline" />
            {" "}&amp; the royal legacy of{" "}
            <br className="hidden sm:inline" />
            your Indian wedding.
          </h1>

          <p className="mt-4 sm:mt-6 text-[14px] sm:text-base md:text-lg text-[#4A433A] max-w-2xl font-light leading-[1.6] sm:leading-relaxed tracking-wide px-2 sm:px-0">
            From sacred pheras in Udaipur’s royal palaces to joyful haldi ceremonies and sunset vows along Goa’s coastline, we turn your most precious moments into timeless cinematic stories.
          </p>

          {/* Dual Call to Actions */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto max-w-sm sm:max-w-none">
            <Link
              href="/portfolio"
              className="w-full sm:w-auto h-12 px-7 bg-[#B68A35] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#8C6518] hover:shadow-md transition-all duration-300 inline-flex items-center justify-center space-x-2 rounded-xs focus-visible:ring-2 focus-visible:ring-[#B68A35] active:scale-[0.99]"
            >
              <span>Explore Wedding Stories</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto h-12 px-7 border border-[#B68A35]/60 bg-white/80 hover:bg-white text-[#1C1917] text-xs uppercase tracking-[0.2em] font-medium hover:border-[#B68A35] hover:text-[#8C6518] transition-all duration-300 backdrop-blur-xs rounded-xs shadow-xs inline-flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#B68A35] active:scale-[0.99]"
            >
              <span>Plan Your Celebration</span>
            </Link>
          </div>

          {/* Indian Wedding Feature Highlights */}
          <div className="mt-8 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6 pt-6 sm:pt-8 border-t border-[#B68A35]/25 w-full max-w-4xl text-center">
            <div className="p-3 sm:p-4 bg-white/75 backdrop-blur-xs border border-[#B68A35]/25 hover:border-[#B68A35]/60 rounded-xs transition-colors shadow-xs">
              <p className="font-editorial-title text-xl sm:text-2xl md:text-3xl text-[#1C1917]">Saat Phere</p>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#8C6518] font-medium mt-1">Sacred Vows</p>
            </div>
            <div className="p-3 sm:p-4 bg-white/75 backdrop-blur-xs border border-[#B68A35]/25 hover:border-[#B68A35]/60 rounded-xs transition-colors shadow-xs">
              <p className="font-editorial-title text-xl sm:text-2xl md:text-3xl text-[#1C1917]">4K Cinema</p>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#8C6518] font-medium mt-1">Live Vows Audio</p>
            </div>
            <div className="p-3 sm:p-4 bg-white/75 backdrop-blur-xs border border-[#B68A35]/25 hover:border-[#B68A35]/60 rounded-xs transition-colors shadow-xs">
              <p className="font-editorial-title text-xl sm:text-2xl md:text-3xl text-[#1C1917]">Pan-India</p>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#8C6518] font-medium mt-1">Palaces &amp; Resorts</p>
            </div>
            <div className="p-3 sm:p-4 bg-white/75 backdrop-blur-xs border border-[#B68A35]/25 hover:border-[#B68A35]/60 rounded-xs transition-colors shadow-xs">
              <p className="font-editorial-title text-xl sm:text-2xl md:text-3xl text-[#1C1917]">Virasat</p>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#8C6518] font-medium mt-1">Linen Heirlooms</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE SACRED CEREMONIES / RITUALS BREAKDOWN */}
      <section className="py-24 sm:py-32 px-6 sm:px-8 border-y border-[#B68A35]/20 bg-[#F5EFEB]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#8C2222] font-semibold">
              ॥ रीती-रिवाज़ एवं परंपरा ॥
            </span>
            <h2 className="font-editorial-title text-3xl sm:text-5xl font-light text-[#1C1917]">
              The Chapters of an Indian Vivah
            </h2>
            <p className="text-sm text-[#5C524A] font-light leading-relaxed">
              Every Indian wedding is an unhurried multi-day odyssey. We document every ritual with cultural reverence, discreet observation, and artistic warmth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ceremonies.map((c, idx) => (
              <div
                key={idx}
                className="group bg-white border border-[#B68A35]/25 hover:border-[#B68A35] rounded-xs overflow-hidden transition-all duration-300 royal-shadow royal-shadow-hover flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#FAF7F2]">
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#FAF7F2]/95 border border-[#B68A35]/30 text-[#8C2222] font-editorial-serif text-sm font-bold">
                      {c.step}
                    </div>
                  </div>

                  <div className="p-6 space-y-2">
                    <p className="text-[10px] uppercase tracking-wider text-[#8C6518] font-semibold">
                      {c.subtitle}
                    </p>
                    <h3 className="font-editorial-title text-xl text-[#1C1917] group-hover:text-[#B68A35] transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-xs text-[#5C524A] font-light leading-relaxed pt-1">
                      {c.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="w-full pt-3 border-t border-[#B68A35]/15 flex items-center justify-between text-[11px] text-[#8C6518] font-medium">
                    <span>Documentary Coverage</span>
                    <span className="text-[#8C2222]">&bull;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED CURATED ALBUMS */}
      <section className="py-24 sm:py-32 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#8C2222] font-semibold">
              Curated Stories
            </span>
            <h2 className="font-editorial-title text-3xl sm:text-5xl font-light text-[#1C1917]">
              Royal Wedding Collections
            </h2>
            <p className="text-sm text-[#5C524A] max-w-lg font-light">
              Explore recent celebrations across Rajasthan royal palace courtyards, coastal Goan havens, and heirloom family gatherings.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#8C6518] hover:text-[#1C1917] font-semibold group"
          >
            <span>View All Collections ({featuredAlbums.length}+)</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#8C2222]" />
          </Link>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredAlbums.slice(0, 6).map((album, index) => (
            <AlbumCard
              key={album.id}
              album={album}
              priority={index < 2}
              aspect="portrait"
            />
          ))}
        </div>
      </section>

      {/* 4. CINEMATOGRAPHY / FILMS SHOWCASE */}
      <section className="py-24 sm:py-32 px-6 sm:px-8 bg-[#F5EFEB] border-y border-[#B68A35]/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.3em] text-[#8C2222] flex items-center space-x-2 font-semibold">
                <FilmIcon className="w-3.5 h-3.5 text-[#8C2222]" />
                <span>Motion & Acoustic Vows</span>
              </span>
              <h2 className="font-editorial-title text-3xl sm:text-5xl font-light text-[#1C1917]">
                Cinematic Wedding Feature Films
              </h2>
              <p className="text-sm text-[#5C524A] max-w-lg font-light">
                Documentary storytelling captured with anamorphic cinema glass, recorded personal vows, and bespoke color grading honoring Indian skin tones and royal couture.
              </p>
            </div>

            <Link
              href="/films"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#8C6518] hover:text-[#1C1917] font-semibold group"
            >
              <span>Explore All Films</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#8C2222]" />
            </Link>
          </div>

          {/* Interactive Film Player */}
          <HomeFilmPlayer films={showcaseFilms} />
        </div>
      </section>

      {/* 5. SERVICES / BESPOKE VIVAH MODULES */}
      <section className="py-24 sm:py-32 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C2222] font-semibold">
            The Vivah Modules
          </span>
          <h2 className="font-editorial-title text-3xl sm:text-5xl font-light text-[#1C1917]">
            Tailored Photography & Cinema Suites
          </h2>
          <p className="text-sm text-[#5C524A] font-light">
            Designed to cover the intricacies of traditional ceremonies, multi-city logistics, and multi-generational family heirlooms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white border border-[#B68A35]/25 hover:border-[#B68A35] p-8 rounded-xs flex flex-col justify-between transition-all duration-300 royal-shadow royal-shadow-hover"
            >
              <div className="space-y-4">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xs mb-6 bg-[#FAF7F2]">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors" />
                </div>

                <h3 className="font-editorial-title text-2xl font-normal text-[#1C1917] group-hover:text-[#B68A35] transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-[#5C524A] leading-relaxed font-light">
                  {service.shortDescription}
                </p>

                <div className="pt-2 border-t border-[#B68A35]/15">
                  <p className="text-[10px] uppercase tracking-wider text-[#8C6518] mb-2 font-semibold">
                    Signature Inclusions:
                  </p>
                  <ul className="text-[11px] text-[#6B6257] space-y-1">
                    {service.deliverables.slice(0, 3).map((d, i) => (
                      <li key={i} className="truncate">
                        &bull; {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#B68A35]/15 flex items-center justify-between">
                <Link
                  href={`/services#${service.slug}`}
                  className="text-xs uppercase tracking-wider text-[#8C6518] font-medium hover:underline"
                >
                  Learn Details
                </Link>
                <Link
                  href={`/contact?service=${service.slug}`}
                  className="p-2 rounded-full border border-[#B68A35]/30 hover:border-[#B68A35] text-[#1C1917] hover:text-[#B68A35] transition-colors bg-[#FAF7F2]"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/services"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] px-8 py-4 bg-[#B68A35] text-[#FAF7F2] hover:bg-[#8C6518] transition-all duration-300 rounded-xs shadow-md font-medium"
          >
            <span>View All Services & Package Deliverables</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 6. ALL-INDIA AVAILABILITY & DESTINATIONS */}
      <section className="py-24 sm:py-32 px-6 sm:px-8 border-t border-[#B68A35]/20 bg-[#F5EFEB]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.3em] text-[#8C2222] flex items-center space-x-2 font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Pan-India Presence & Travel</span>
              </span>

              <h2 className="font-editorial-title text-3xl sm:text-5xl font-light text-[#1C1917] leading-tight">
                Wherever your mandap is set, our team travels with you.
              </h2>

              <p className="text-sm text-[#5C524A] font-light leading-relaxed">
                Operating between Mumbai, Delhi NCR, and Udaipur, our full photography and cinematography teams travel extensively across India. 
                We manage complete crew travel and redundant equipment logistics, guaranteeing seamless presence from morning haldi to late-night pheras.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 text-xs font-light text-[#1C1917]">
                <div className="p-4 bg-white border border-[#B68A35]/25 rounded-xs royal-shadow">
                  <p className="text-[#8C6518] font-semibold uppercase tracking-wider text-[11px] mb-1">
                    Royal Rajasthan
                  </p>
                  <p className="text-[#6B6257]">Udaipur, Jaipur, Jodhpur, Jaisalmer</p>
                </div>
                <div className="p-4 bg-white border border-[#B68A35]/25 rounded-xs royal-shadow">
                  <p className="text-[#8C6518] font-semibold uppercase tracking-wider text-[11px] mb-1">
                    Coastal & Tropical
                  </p>
                  <p className="text-[#6B6257]">Goa, Alibaug, Kerala Backwaters</p>
                </div>
                <div className="p-4 bg-white border border-[#B68A35]/25 rounded-xs royal-shadow">
                  <p className="text-[#8C6518] font-semibold uppercase tracking-wider text-[11px] mb-1">
                    Metros & Palaces
                  </p>
                  <p className="text-[#6B6257]">Delhi NCR, Mumbai, Hyderabad, Bengaluru</p>
                </div>
                <div className="p-4 bg-white border border-[#B68A35]/25 rounded-xs royal-shadow">
                  <p className="text-[#8C6518] font-semibold uppercase tracking-wider text-[11px] mb-1">
                    International
                  </p>
                  <p className="text-[#6B6257]">Tuscany, Dubai, Bali, Thailand</p>
                </div>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-xs overflow-hidden border border-[#B68A35]/30 shadow-xl">
              <Image
                src="/images/weddings/pink-city-jaipur.jpg"
                alt="Destination Palace Wedding in Udaipur"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#DFC285] font-medium">
                    Featured Destination
                  </p>
                  <p className="font-editorial-title text-2xl text-[#FAF7F2]">
                    The Royal Courtyards of Udaipur & Lake Pichola
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CLIENT LOVE STORIES */}
      <section className="py-24 sm:py-32 px-6 sm:px-8 max-w-5xl mx-auto text-center space-y-12">
        <span className="text-xs uppercase tracking-[0.3em] text-[#8C2222] flex items-center justify-center space-x-2 font-semibold">
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>Words From Our Couples</span>
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="p-8 bg-white border border-[#B68A35]/25 rounded-xs space-y-4 royal-shadow">
            <p className="text-sm font-light text-[#4A433A] leading-relaxed italic">
              &ldquo;AMARA Studios gave us the greatest gift of our lives. Watching our Udaipur wedding film reduced our entire family to happy tears. They captured every Vedic mantra and the quiet glance my dad gave me during Kanyadaan. Pure poetry.&rdquo;
            </p>
            <div className="pt-4 border-t border-[#B68A35]/20">
              <p className="text-xs uppercase tracking-wider text-[#1C1917] font-semibold">
                Devika & Shaurya
              </p>
              <p className="text-[11px] text-[#8C6518]">The Leela Palace, Udaipur</p>
            </div>
          </div>

          <div className="p-8 bg-white border border-[#B68A35]/25 rounded-xs space-y-4 royal-shadow">
            <p className="text-sm font-light text-[#4A433A] leading-relaxed italic">
              &ldquo;We wanted our Goa wedding to feel authentic and warm without any cheesy posed shots. The team was like family to all our guests, and the handmade linen album is the most treasured piece in our living room.&rdquo;
            </p>
            <div className="pt-4 border-t border-[#B68A35]/20">
              <p className="text-xs uppercase tracking-wider text-[#1C1917] font-semibold">
                Ananya & Kabir
              </p>
              <p className="text-[11px] text-[#8C6518]">Alila Diwa, South Goa</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL INQUIRY CTA BANNER */}
      <section className="py-24 sm:py-32 px-6 sm:px-8 bg-[#F5EFEB] border-t border-[#B68A35]/20 text-center relative">
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C2222] font-semibold">
            Limited Wedding Dates Each Season
          </span>

          <h2 className="font-editorial-title text-4xl sm:text-6xl font-light text-[#1C1917] leading-tight">
            Let us chronicle your family&apos;s heirloom story.
          </h2>

          <p className="text-sm sm:text-base text-[#5C524A] font-light max-w-xl mx-auto leading-relaxed">
            We accept a curated number of weddings every year to ensure undivided creative dedication and master color grading for every couple.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-10 py-4 bg-[#B68A35] text-[#FAF7F2] text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#8C6518] transition-all duration-300 shadow-md inline-flex items-center justify-center space-x-2 rounded-xs"
            >
              <span>Check Wedding Date Availability</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <a
              href="https://wa.me/919820194820"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-4 border border-[#B68A35]/50 bg-white text-[#1C1917] text-xs uppercase tracking-[0.25em] font-medium hover:border-[#B68A35] hover:text-[#B68A35] transition-all rounded-xs shadow-xs"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
