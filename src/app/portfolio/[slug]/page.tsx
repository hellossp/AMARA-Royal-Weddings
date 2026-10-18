import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  Film,
  Camera,
} from "lucide-react";
import { getAlbumBySlug, getAlbums } from "@/lib/data-store";
import AlbumGalleryViewer from "@/components/AlbumGalleryViewer";
import AlbumCard from "@/components/AlbumCard";

export const revalidate = 0;
export const dynamic = "force-dynamic";

interface AlbumDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: AlbumDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const album = await getAlbumBySlug(slug);

  if (!album) {
    return {
      title: "Album Not Found",
    };
  }

  return {
    title: `${album.title} | ${album.clientNames}`,
    description: album.description || `Explore ${album.title} captured by AMARA STUDIOS.`,
    openGraph: {
      title: `${album.title} | AMARA STUDIOS`,
      description: album.description,
      images: [{ url: album.coverImage }],
    },
  };
}

export default async function AlbumDetailPage({ params }: AlbumDetailPageProps) {
  const { slug } = await params;
  const album = await getAlbumBySlug(slug);

  if (!album) {
    notFound();
  }

  // Related albums
  const allAlbums = await getAlbums();
  const relatedAlbums = allAlbums
    .filter((a) => a.id !== album.id && (a.category === album.category || a.isFeatured))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1917] pt-28 pb-24">
      {/* 1. TOP BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-6">
        <Link
          href="/portfolio"
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#6B6257] hover:text-[#B68A35] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Wedding Collections</span>
        </Link>
      </div>

      {/* 2. HERO IMAGE BANNER & METADATA */}
      <section className="relative max-w-7xl mx-auto px-6 sm:px-8 mb-16">
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-xs overflow-hidden border border-[#B68A35]/30 shadow-xl bg-white">
          <Image
            src={album.coverImage}
            alt={album.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          {/* Subtle gradient overlay to ensure text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

          {/* Overlay details */}
          <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 flex flex-col justify-end">
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-[#DFC285] mb-2 font-medium">
              <span className="text-[#DFC285]">॥</span>
              <span>{album.category.replace("-", " ").toUpperCase()}</span>
              <span className="text-[#DFC285]">॥</span>
            </div>

            <h1 className="font-editorial-title text-3xl sm:text-5xl md:text-6xl font-light text-[#FAF7F2] leading-tight max-w-4xl">
              {album.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-6 text-xs text-[#E5DFD5] font-light">
              <div className="flex items-center space-x-2">
                <span className="text-[#DFC285] uppercase tracking-wider text-[10px] font-medium">Couple:</span>
                <span className="text-[#FAF7F2] font-medium text-sm">{album.clientNames}</span>
              </div>

              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#DFC285]" />
                <span>{album.location}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Calendar className="w-3.5 h-3.5 text-[#DFC285]" />
                <span>{album.eventDate || album.year}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EDITORIAL STORY NARRATIVE & DETAILS */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 mb-20 space-y-8">
        <div className="bg-white border-l-4 border-[#8C2222] border-y border-r border-[#B68A35]/25 p-6 sm:p-8 rounded-xs royal-shadow">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C2222] font-semibold mb-2 block">
            The Wedding Story
          </span>
          <p className="font-editorial-title text-xl sm:text-2xl font-light text-[#1C1917] leading-relaxed">
            {album.description}
          </p>
        </div>

        {album.storyDetails && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 text-xs">
            {album.storyDetails.venue && (
              <div className="p-4 bg-white border border-[#B68A35]/20 rounded-xs royal-shadow">
                <p className="uppercase tracking-widest text-[#8C6518] text-[10px] font-semibold mb-1">
                  Sacred Mandap Venue
                </p>
                <p className="text-[#1C1917] font-medium">{album.storyDetails.venue}</p>
              </div>
            )}
            {album.storyDetails.tradition && (
              <div className="p-4 bg-white border border-[#B68A35]/20 rounded-xs royal-shadow">
                <p className="uppercase tracking-widest text-[#8C6518] text-[10px] font-semibold mb-1">
                  Tradition & Ceremony
                </p>
                <p className="text-[#1C1917] font-medium">{album.storyDetails.tradition}</p>
              </div>
            )}
            {album.storyDetails.cinematographyStyle && (
              <div className="p-4 bg-white border border-[#B68A35]/20 rounded-xs royal-shadow">
                <p className="uppercase tracking-widest text-[#8C6518] text-[10px] font-semibold mb-1">
                  Cinema Palette
                </p>
                <p className="text-[#1C1917] font-medium">
                  {album.storyDetails.cinematographyStyle}
                </p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* 4. PHOTO GALLERY SECTION */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-24">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#B68A35]/20">
          <h2 className="text-xs uppercase tracking-[0.3em] text-[#8C2222] font-semibold flex items-center space-x-2">
            <Camera className="w-4 h-4 text-[#B68A35]" />
            <span>Gallery Photographs ({album.images?.length || 0})</span>
          </h2>
          <span className="text-[11px] text-[#6B6257]">
            Click any photograph to view full-screen lightbox
          </span>
        </div>

        <AlbumGalleryViewer
          images={album.images || []}
          albumTitle={album.title}
        />
      </section>

      {/* 5. CINEMATIC FILM EMBED (IF PRESENT) */}
      {album.videoUrl && (
        <section className="max-w-5xl mx-auto px-6 sm:px-8 mb-24">
          <div className="space-y-3 mb-6">
            <span className="text-xs uppercase tracking-[0.3em] text-[#8C2222] flex items-center space-x-1.5 font-semibold">
              <Film className="w-3.5 h-3.5 text-[#8C2222]" />
              <span>Motion Chapter</span>
            </span>
            <h2 className="font-editorial-title text-2xl sm:text-4xl font-light text-[#1C1917]">
              Cinematic Wedding Trailer
            </h2>
          </div>

          <div className="relative aspect-video w-full rounded-xs overflow-hidden border border-[#B68A35]/30 shadow-2xl bg-black">
            <iframe
              src={album.videoUrl}
              title={`${album.title} Wedding Film`}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      )}

      {/* 6. IN-ALBUM INQUIRY CTA */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 mb-24">
        <div className="bg-[#F5EFEB] border border-[#B68A35]/30 p-8 sm:p-12 text-center rounded-xs space-y-6 royal-shadow">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C2222] font-semibold">
            Envisioning Similar Coverage?
          </span>

          <h3 className="font-editorial-title text-3xl sm:text-4xl font-light text-[#1C1917]">
            Let&apos;s create an heirloom chronicle for your wedding.
          </h3>

          <p className="text-sm text-[#5C524A] font-light max-w-lg mx-auto leading-relaxed">
            Every celebration in our atelier begins with an unhurried conversation. Inquire to reserve our artists for your dates.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/contact?eventType=${encodeURIComponent(album.category)}`}
              className="px-8 py-3.5 bg-[#B68A35] text-[#FAF7F2] text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#8C6518] transition-colors rounded-xs shadow-md"
            >
              Inquire For This Occasion
            </Link>

            <a
              href={`https://wa.me/919820194820?text=Namaste%20Amara%20Studios,%20I%20am%20viewing%20the%20${encodeURIComponent(album.title)}%20wedding%20and%20would%20love%20to%20discuss%20our%20celebration.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 border border-[#B68A35]/50 bg-white text-[#1C1917] text-xs uppercase tracking-[0.25em] font-medium hover:border-[#B68A35] hover:text-[#B68A35] transition-colors rounded-xs shadow-xs"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 7. RELATED ALBUMS */}
      {relatedAlbums.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 sm:px-8 border-t border-[#B68A35]/20 pt-16">
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-editorial-title text-2xl sm:text-3xl font-light text-[#1C1917]">
              Related Wedding Stories
            </h3>
            <Link
              href="/portfolio"
              className="text-xs uppercase tracking-widest text-[#8C6518] font-semibold hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedAlbums.map((rel) => (
              <AlbumCard key={rel.id} album={rel} aspect="landscape" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
