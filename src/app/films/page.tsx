import React from "react";
import type { Metadata } from "next";
import { getFilms } from "@/lib/data-store";
import FilmGallery from "@/components/FilmGallery";

export const metadata: Metadata = {
  title: "Cinematic Wedding Films & Teasers",
  description:
    "Watch our 4K cinematic wedding trailers, documentary feature films, and pre-wedding motion stories captured across royal palaces and destinations in India.",
};

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function FilmsPage() {
  const films = await getFilms();

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1917] pt-32 pb-24 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C2222] font-semibold">
            ॥ चलचित्र एवं सुरभित स्वर ॥ &bull; The Motion Atelier
          </span>
          <h1 className="font-editorial-title text-4xl sm:text-6xl font-light text-[#1C1917]">
            Cinematography Feature Films
          </h1>
          <p className="text-sm sm:text-base text-[#5C524A] font-light leading-relaxed">
            We believe wedding cinema should feel like timeless cinematic art. Handcrafted sound design, 
            acoustic vows recorded live at the mandap, anamorphic prime lenses, and bespoke color grading honoring Indian royal heritage.
          </p>
        </div>

        {/* Gallery */}
        <FilmGallery initialFilms={films} />
      </div>
    </div>
  );
}
