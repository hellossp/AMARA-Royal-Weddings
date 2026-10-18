import React from "react";
import type { Metadata } from "next";
import { getAlbums } from "@/lib/data-store";
import PortfolioExplorer from "@/components/PortfolioExplorer";

export const metadata: Metadata = {
  title: "Royal Wedding Stories & Collections",
  description:
    "Explore our documented royal weddings, pre-wedding films, palace celebrations, and intimate temple vivahs captured across India and worldwide destinations.",
};

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const albums = await getAlbums();

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1917] pt-32 pb-24 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C2222] font-semibold">
            ॥ धरोहर एवं यादें ॥ &bull; The Wedding Archives
          </span>
          <h1 className="font-editorial-title text-4xl sm:text-6xl font-light text-[#1C1917]">
            Curated Wedding Chronicles
          </h1>
          <p className="text-sm sm:text-base text-[#5C524A] font-light leading-relaxed">
            Every Indian vivah has its own cadence, sacred traditions, and vibrant family bonds. 
            Browse our documented stories across royal Rajasthan palaces, coastal Goan shores, and heirloom family gatherings.
          </p>
        </div>

        {/* Interactive Explorer */}
        <PortfolioExplorer initialAlbums={albums} />
      </div>
    </div>
  );
}
