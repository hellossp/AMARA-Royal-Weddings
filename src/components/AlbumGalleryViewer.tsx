"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { AlbumImage } from "@/types";
import Lightbox from "./Lightbox";

interface AlbumGalleryViewerProps {
  images: AlbumImage[];
  albumTitle: string;
}

const FALLBACK_GALLERY_PHOTO =
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=85&w=1400";

const RITUAL_LABELS = [
  "॥ वरमाला एवं संकल्प ॥",
  "॥ सात फेरे एवं पवित्र अग्नि ॥",
  "॥ राजसी दुल्हन शृंगार ॥",
  "॥ हल्दी एवं फूलों की होली ॥",
  "॥ मेहंदी एवं आशीर्वाद ॥",
  "॥ भव्य राजसी रिसेप्शन ॥",
];

function GalleryPhotoCard({
  img,
  index,
  albumTitle,
  isJharokhaMode,
  onClick,
}: {
  img: AlbumImage;
  index: number;
  albumTitle: string;
  isJharokhaMode: boolean;
  onClick: () => void;
}) {
  const [src, setSrc] = useState(img.imageUrl || FALLBACK_GALLERY_PHOTO);
  const isLarge = index % 5 === 0;
  const ritualTag = RITUAL_LABELS[index % RITUAL_LABELS.length];

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden bg-white border border-[#B68A35]/30 hover:border-[#B68A35] cursor-pointer transition-all duration-500 royal-shadow royal-shadow-hover ${
        isJharokhaMode
          ? "rounded-t-[3rem] rounded-b-xs p-2 border-2 border-[#B68A35]/50 bg-gradient-to-b from-[#FAF7F2] to-white"
          : "rounded-xs"
      } ${isLarge ? "sm:col-span-2 lg:col-span-2 aspect-[16/10]" : "aspect-[3/4]"}`}
    >
      <div className={`relative w-full h-full overflow-hidden ${isJharokhaMode ? "rounded-t-[2.7rem] rounded-b-xs" : ""}`}>
        <Image
          src={src}
          alt={img.altText || `${albumTitle} photo ${index + 1}`}
          fill
          sizes={isLarge ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          onError={() => setSrc(FALLBACK_GALLERY_PHOTO)}
        />

        {/* Auspicious Hindi Ritual Badge on Top Left */}
        <div className="absolute top-4 left-4 z-20">
          <span className="font-editorial-serif text-[11px] tracking-wider px-3 py-1 bg-[#FAF7F2]/95 backdrop-blur-md border border-[#B68A35]/40 text-[#8C2222] font-bold rounded-xs shadow-sm">
            {ritualTag}
          </span>
        </div>

        {/* Hover overlay with zoom icon and caption */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 z-20">
          <div className="flex justify-end">
            <span className="p-2.5 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md text-[#1C1917] border border-[#B68A35]/30 group-hover:bg-[#B68A35] group-hover:text-[#FAF7F2] transition-colors shadow-sm">
              <Maximize2 className="w-4 h-4" />
            </span>
          </div>

          {img.caption && (
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-[#DFC285] font-semibold">
                Ceremonial Chapter {index + 1}
              </p>
              <p className="font-editorial-serif italic text-xs sm:text-sm text-[#faf8f5] tracking-wide max-w-md">
                {img.caption}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AlbumGalleryViewer({
  images,
  albumTitle,
}: AlbumGalleryViewerProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isJharokhaMode, setIsJharokhaMode] = useState(false);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  if (!images || images.length === 0) {
    return (
      <div className="py-16 text-center text-xs text-[#a09c95] border border-white/10 p-8">
        No gallery photographs published for this collection yet.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Gallery Creative Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white/80 backdrop-blur-md border border-[#B68A35]/25 rounded-xs royal-shadow">
        <div className="flex items-center space-x-2 text-xs text-[#5C524A]">
          <span className="w-2 h-2 rounded-full bg-[#8C2222]" />
          <span className="font-editorial-serif font-medium text-sm text-[#1C1917]">
            {images.length} Curated Ceremonial Frames
          </span>
        </div>

        {/* View Mode Selector: Classical vs Royal Jharokha Arch */}
        <div className="flex items-center space-x-2">
          <span className="text-[10px] uppercase tracking-wider text-[#8C6518] font-semibold hidden md:inline">
            Gallery Framing:
          </span>
          <button
            onClick={() => setIsJharokhaMode(false)}
            className={`px-3 py-1.5 text-xs rounded-xs border transition-all ${
              !isJharokhaMode
                ? "bg-[#B68A35] text-[#FAF7F2] border-[#B68A35] font-semibold shadow-xs"
                : "bg-white text-[#5C524A] border-[#e8dfd1] hover:border-[#B68A35]"
            }`}
          >
            Editorial Grid
          </button>
          <button
            onClick={() => setIsJharokhaMode(true)}
            className={`px-3 py-1.5 text-xs rounded-xs border transition-all flex items-center space-x-1.5 ${
              isJharokhaMode
                ? "bg-[#8C2222] text-[#FAF7F2] border-[#8C2222] font-semibold shadow-xs"
                : "bg-white text-[#5C524A] border-[#e8dfd1] hover:border-[#8C2222]"
            }`}
          >
            <span>॥ Royal Jharokha Arches ॥</span>
          </button>
        </div>
      </div>

      {/* Grid of Photographs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <GalleryPhotoCard
            key={img.id || index}
            img={img}
            index={index}
            albumTitle={albumTitle}
            isJharokhaMode={isJharokhaMode}
            onClick={() => openLightbox(index)}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        images={images}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setCurrentIndex(newIdx)}
      />
    </div>
  );
}
