"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, Clock, MapPin, Film as FilmIcon } from "lucide-react";
import { Film } from "@/types";
import VideoModal from "./VideoModal";

interface FilmGalleryProps {
  initialFilms: Film[];
}

export default function FilmGallery({ initialFilms }: FilmGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeFilm, setActiveFilm] = useState<Film | null>(null);

  const categories = [
    { key: "all", label: "All Cinema" },
    { key: "wedding", label: "Royal Vivah Films" },
    { key: "pre-wedding", label: "Pre-Wedding Stories" },
    { key: "teaser", label: "Teasers & Trailers" },
    { key: "event", label: "Receptions & Sangeet" },
  ];

  const filteredFilms =
    selectedCategory === "all"
      ? initialFilms
      : initialFilms.filter((f) => f.category === selectedCategory);

  const featuredFilm = initialFilms.find((f) => f.featured) || initialFilms[0];

  return (
    <div className="space-y-16">
      {/* Featured Master Film Banner */}
      {featuredFilm && (
        <div className="relative">
          <div className="mb-4 flex items-center space-x-2 text-xs uppercase tracking-widest text-[#8C2222] font-semibold">
            <FilmIcon className="w-4 h-4 text-[#B68A35]" />
            <span>Featured Master Cinema</span>
          </div>

          <div
            onClick={() => setActiveFilm(featuredFilm)}
            className="group relative aspect-video md:aspect-[21/9] w-full bg-white border border-[#B68A35]/35 hover:border-[#B68A35] rounded-xs overflow-hidden cursor-pointer transition-all duration-500 shadow-xl royal-shadow royal-shadow-hover"
          >
            <Image
              src={featuredFilm.thumbnailUrl}
              alt={featuredFilm.title}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

            {/* Big Center Play Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border border-white/40 bg-[#FAF7F2]/90 backdrop-blur-md flex items-center justify-center text-[#B68A35] group-hover:bg-[#B68A35] group-hover:text-[#FAF7F2] group-hover:scale-110 transition-all duration-300 shadow-2xl">
                <Play className="w-8 h-8 fill-current translate-x-0.5" />
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 z-10 flex flex-col justify-end">
              <div className="flex items-center space-x-3 text-xs uppercase tracking-widest text-[#DFC285] mb-2 font-medium">
                <span>{featuredFilm.category.toUpperCase()} CINEMA</span>
                <span>&bull;</span>
                <span className="flex items-center space-x-1 text-[#FAF7F2]">
                  <Clock className="w-3.5 h-3.5 text-[#DFC285]" />
                  <span>{featuredFilm.duration}</span>
                </span>
              </div>

              <h2 className="font-editorial-title text-2xl sm:text-4xl md:text-5xl font-light text-[#FAF7F2] mb-2 group-hover:text-[#DFC285] transition-colors max-w-3xl">
                {featuredFilm.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#E5DFD5] font-light max-w-2xl line-clamp-2">
                {featuredFilm.description}
              </p>

              <div className="mt-4 flex items-center space-x-4 text-xs text-[#FAF7F2] font-light">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-[#DFC285]" />
                  <span>{featuredFilm.location}</span>
                </div>
                <span className="text-white/40">&bull;</span>
                <span>Featuring {featuredFilm.coupleNames}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs uppercase tracking-wider border-b border-[#B68A35]/20 pt-4">
        {categories.map((cat) => {
          const count =
            cat.key === "all"
              ? initialFilms.length
              : initialFilms.filter((f) => f.category === cat.key).length;

          const isSelected = selectedCategory === cat.key;

          return (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-5 py-2.5 border-b-2 transition-all shrink-0 flex items-center space-x-2 ${
                isSelected
                  ? "border-[#B68A35] text-[#B68A35] font-semibold"
                  : "border-transparent text-[#6B6257] hover:text-[#1C1917]"
              }`}
            >
              <span>{cat.label}</span>
              <span className="text-[10px] text-[#8C8276]">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Films Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFilms.map((film) => (
          <div
            key={film.id}
            onClick={() => setActiveFilm(film)}
            className="group relative bg-white border border-[#B68A35]/25 hover:border-[#B68A35] rounded-xs overflow-hidden cursor-pointer transition-all duration-300 royal-shadow royal-shadow-hover"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video w-full overflow-hidden bg-[#FAF7F2]">
              <Image
                src={film.thumbnailUrl}
                alt={film.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              {/* Play Button Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border border-white/30 bg-[#FAF7F2]/90 backdrop-blur-md flex items-center justify-center text-[#B68A35] group-hover:bg-[#B68A35] group-hover:text-[#FAF7F2] group-hover:scale-110 transition-all duration-300 shadow-md">
                  <Play className="w-5 h-5 fill-current translate-x-0.5" />
                </div>
              </div>

              {/* Duration Tag */}
              <div className="absolute top-3 right-3 z-10 text-[10px] uppercase tracking-wider px-2 py-0.5 bg-white/90 backdrop-blur-md border border-[#B68A35]/30 text-[#1C1917] font-medium flex items-center space-x-1 rounded-xs">
                <Clock className="w-3 h-3 text-[#B68A35]" />
                <span>{film.duration}</span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 space-y-2">
              <p className="text-[10px] uppercase tracking-widest text-[#8C6518] font-semibold">
                {film.coupleNames}
              </p>

              <h3 className="font-editorial-title text-xl font-normal text-[#1C1917] group-hover:text-[#B68A35] transition-colors leading-snug">
                {film.title}
              </h3>

              <p className="text-xs text-[#5C524A] font-light line-clamp-2 leading-relaxed">
                {film.description}
              </p>

              <div className="pt-3 border-t border-[#B68A35]/15 flex items-center justify-between text-[11px] text-[#6B6257]">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-[#8C2222]" />
                  <span>{film.location}</span>
                </div>
                <span className="text-[#8C6518] font-medium group-hover:underline">
                  Watch Film &rarr;
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {activeFilm && (
        <VideoModal
          isOpen={Boolean(activeFilm)}
          onClose={() => setActiveFilm(null)}
          videoUrl={activeFilm.videoEmbedUrl}
          title={activeFilm.title}
        />
      )}
    </div>
  );
}
