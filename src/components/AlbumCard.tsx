"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar, ArrowUpRight, Camera } from "lucide-react";
import { Album } from "@/types";

interface AlbumCardProps {
  album: Album;
  priority?: boolean;
  aspect?: "portrait" | "landscape" | "square";
}

const FALLBACK_COVER =
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=85&w=1200";

export default function AlbumCard({
  album,
  priority = false,
  aspect = "portrait",
}: AlbumCardProps) {
  const [imgSrc, setImgSrc] = React.useState(album.coverImage || FALLBACK_COVER);

  const categoryLabels: Record<string, string> = {
    weddings: "Royal Vivah",
    engagements: "Roka & Sagai",
    "pre-weddings": "Pre-Wedding Romance",
    receptions: "Grand Reception",
    maternity: "Maternity Heirloom",
    portraits: "Bridal Portraiture",
    birthdays: "Milestone Jubilee",
    corporate: "Royal Gala",
    destination: "Destination Vivah",
  };

  const photoCount =
    (album.photos && album.photos.length) ||
    (album.images && album.images.length) ||
    6;

  const aspectClass =
    aspect === "portrait"
      ? "aspect-[3/4]"
      : aspect === "landscape"
      ? "aspect-[16/10]"
      : "aspect-square";

  return (
    <Link
      href={`/portfolio/${album.slug}`}
      className="group block relative overflow-hidden bg-white border border-[#B68A35]/25 hover:border-[#B68A35] rounded-sm transition-all duration-500 royal-shadow royal-shadow-hover"
    >
      {/* Cover Image Container */}
      <div className={`relative w-full ${aspectClass} overflow-hidden bg-[#FAF7F2]`}>
        <Image
          src={imgSrc}
          alt={album.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          priority={priority}
          onError={() => setImgSrc(FALLBACK_COVER)}
        />

        {/* Delicate Gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

        {/* Cultural Category Tag */}
        <div className="absolute top-4 left-4 z-10">
          <span className="text-[10px] uppercase tracking-[0.2em] px-3 py-1 bg-[#FAF7F2]/95 backdrop-blur-md border border-[#B68A35]/40 text-[#8C2222] font-semibold rounded-xs shadow-sm">
            {categoryLabels[album.category] || album.category}
          </span>
        </div>

        {/* Photo count indicator */}
        <div className="absolute top-4 right-4 z-10 flex items-center space-x-1.5 text-[10px] uppercase tracking-wider px-2.5 py-1 bg-[#FAF7F2]/90 backdrop-blur-md border border-[#B68A35]/30 text-[#1C1917] rounded-xs font-medium shadow-sm">
          <Camera className="w-3 h-3 text-[#B68A35]" />
          <span>{photoCount} Photos</span>
        </div>

        {/* Card Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end">
          <p className="text-xs font-medium tracking-[0.2em] text-[#DFC285] uppercase mb-1">
            {album.clientNames}
          </p>

          <h3 className="font-editorial-title text-xl sm:text-2xl text-[#FAF7F2] font-normal leading-snug group-hover:text-[#DFC285] transition-colors">
            {album.title}
          </h3>

          <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-[#E5DFD5] font-light">
            <div className="flex items-center space-x-1.5 truncate max-w-[70%]">
              <MapPin className="w-3 h-3 text-[#DFC285] shrink-0" />
              <span className="truncate">{album.location}</span>
            </div>

            <div className="flex items-center space-x-1 text-[11px] text-[#FAF7F2]/90 font-medium">
              <Calendar className="w-3 h-3 text-[#DFC285]" />
              <span>{album.year}</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1 text-[#DFC285] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
