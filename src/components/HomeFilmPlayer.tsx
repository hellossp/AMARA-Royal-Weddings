"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, Clock, MapPin } from "lucide-react";
import { Film } from "@/types";
import VideoModal from "./VideoModal";

interface HomeFilmPlayerProps {
  films: Film[];
}

export default function HomeFilmPlayer({ films }: HomeFilmPlayerProps) {
  const [activeFilm, setActiveFilm] = useState<Film | null>(null);

  if (!films || films.length === 0) return null;

  const featuredFilm = films[0];
  const sideFilms = films.slice(1, 3);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Large Featured Film Card */}
        {featuredFilm && (
          <div
            onClick={() => setActiveFilm(featuredFilm)}
            className="lg:col-span-2 group relative aspect-video bg-white border border-[#B68A35]/30 hover:border-[#B68A35] overflow-hidden cursor-pointer transition-all duration-500 rounded-sm royal-shadow royal-shadow-hover"
          >
            <Image
              src={featuredFilm.thumbnailUrl}
              alt={featuredFilm.title}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

            {/* Big Center Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/40 bg-[#FAF7F2]/90 backdrop-blur-md flex items-center justify-center text-[#B68A35] group-hover:bg-[#B68A35] group-hover:text-[#FAF7F2] group-hover:scale-110 transition-all duration-300 shadow-xl">
                <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current translate-x-0.5" />
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
              <div className="flex items-center space-x-3 text-xs uppercase tracking-widest text-[#DFC285] mb-2 font-medium">
                <span>Featured Wedding Film</span>
                <span>&bull;</span>
                <span className="flex items-center space-x-1 text-[#FAF7F2]">
                  <Clock className="w-3.5 h-3.5 text-[#DFC285]" />
                  <span>{featuredFilm.duration}</span>
                </span>
              </div>

              <h3 className="font-editorial-title text-2xl sm:text-3xl font-light text-[#FAF7F2] mb-2 group-hover:text-[#DFC285] transition-colors">
                {featuredFilm.title}
              </h3>

              <div className="flex items-center space-x-2 text-xs text-[#E5DFD5] font-light">
                <MapPin className="w-3.5 h-3.5 text-[#DFC285]" />
                <span>{featuredFilm.location}</span>
                <span className="text-white/40">&bull;</span>
                <span>Featuring {featuredFilm.coupleNames}</span>
              </div>
            </div>
          </div>
        )}

        {/* Side Stack of Secondary Films */}
        <div className="flex flex-col gap-6 justify-between">
          {sideFilms.map((film) => (
            <div
              key={film.id}
              onClick={() => setActiveFilm(film)}
              className="group relative aspect-video bg-white border border-[#B68A35]/30 hover:border-[#B68A35] overflow-hidden cursor-pointer transition-all duration-500 rounded-sm royal-shadow royal-shadow-hover"
            >
              <Image
                src={film.thumbnailUrl}
                alt={film.title}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Smaller Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border border-white/30 bg-[#FAF7F2]/90 backdrop-blur-md flex items-center justify-center text-[#B68A35] group-hover:bg-[#B68A35] group-hover:text-[#FAF7F2] group-hover:scale-110 transition-all duration-300 shadow-md">
                  <Play className="w-5 h-5 fill-current translate-x-0.5" />
                </div>
              </div>

              {/* Bottom Meta */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider text-[#DFC285] mb-1 font-medium">
                  <span>{film.coupleNames}</span>
                  <span>&bull;</span>
                  <span>{film.duration}</span>
                </div>

                <h4 className="font-editorial-title text-lg font-light text-[#FAF7F2] group-hover:text-[#DFC285] transition-colors truncate">
                  {film.title}
                </h4>

                <p className="text-[11px] text-[#E5DFD5] font-light truncate mt-0.5">
                  {film.location}
                </p>
              </div>
            </div>
          ))}
        </div>
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
    </>
  );
}
