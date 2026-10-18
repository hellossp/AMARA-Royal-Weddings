"use client";

import React, { useState, useMemo } from "react";
import { Album } from "@/types";
import AlbumCard from "./AlbumCard";
import { Search, SlidersHorizontal, X } from "lucide-react";

interface PortfolioExplorerProps {
  initialAlbums: Album[];
}

export default function PortfolioExplorer({ initialAlbums }: PortfolioExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(9);

  const categories = [
    { key: "all", label: "All Collections" },
    { key: "weddings", label: "Royal Weddings" },
    { key: "destination", label: "Destination Vivah" },
    { key: "pre-weddings", label: "Pre-Wedding Romance" },
    { key: "engagements", label: "Roka & Sagai" },
    { key: "receptions", label: "Receptions & Sangeet" },
    { key: "maternity", label: "Maternity Heirlooms" },
    { key: "portraits", label: "Bridal Portraits" },
    { key: "birthdays", label: "Milestone Jubilees" },
    { key: "corporate", label: "Royal Galas" },
  ];

  // Extract distinct locations
  const locations = useMemo(() => {
    const locSet = new Set<string>();
    initialAlbums.forEach((a) => {
      const parts = a.location.split(",");
      const city = parts[parts.length - 1].trim();
      if (city) locSet.add(city);
    });
    return Array.from(locSet);
  }, [initialAlbums]);

  // Filter logic
  const filteredAlbums = useMemo(() => {
    return initialAlbums.filter((album) => {
      const matchesCategory =
        selectedCategory === "all" || album.category === selectedCategory;

      const matchesLocation =
        selectedLocation === "all" ||
        album.location.toLowerCase().includes(selectedLocation.toLowerCase());

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        album.title.toLowerCase().includes(query) ||
        album.clientNames.toLowerCase().includes(query) ||
        album.location.toLowerCase().includes(query) ||
        album.description.toLowerCase().includes(query);

      return matchesCategory && matchesLocation && matchesSearch;
    });
  }, [initialAlbums, selectedCategory, selectedLocation, searchQuery]);

  const displayedAlbums = filteredAlbums.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAlbums.length;

  return (
    <div className="space-y-10">
      {/* Filters Bar */}
      <div className="space-y-6">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none text-xs uppercase tracking-wider">
          {categories.map((cat) => {
            const count =
              cat.key === "all"
                ? initialAlbums.length
                : initialAlbums.filter((a) => a.category === cat.key).length;

            const isSelected = selectedCategory === cat.key;

            return (
              <button
                key={cat.key}
                onClick={() => {
                  setSelectedCategory(cat.key);
                  setVisibleCount(9);
                }}
                className={`px-4 py-2.5 rounded-xs border transition-all duration-300 shrink-0 flex items-center space-x-2 shadow-xs ${
                  isSelected
                    ? "border-[#B68A35] bg-[#B68A35] text-[#FAF7F2] font-semibold"
                    : "border-[#B68A35]/25 bg-white text-[#4A433A] hover:border-[#B68A35] hover:text-[#1C1917]"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
                    isSelected
                      ? "bg-white/20 text-[#FAF7F2]"
                      : "bg-[#FAF7F2] text-[#8C6518]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Location Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#B68A35]/15">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by couple, city, or venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#B68A35]/25 pl-10 pr-10 py-2.5 text-xs text-[#1C1917] placeholder-[#8C8276] focus:outline-none focus:border-[#B68A35] rounded-xs shadow-xs"
            />
            <Search className="w-3.5 h-3.5 text-[#8C6518] absolute left-3.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C8276] hover:text-[#1C1917]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <label className="text-[11px] uppercase tracking-wider text-[#6B6257] flex items-center space-x-1.5 font-medium">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#B68A35]" />
              <span>Location:</span>
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="bg-white border border-[#B68A35]/25 px-3 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#B68A35] rounded-xs shadow-xs"
            >
              <option value="all">All Heritage Cities</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-[#6B6257]">
        <p>
          Showing <span className="text-[#1C1917] font-semibold">{displayedAlbums.length}</span> of{" "}
          <span className="text-[#1C1917] font-semibold">{filteredAlbums.length}</span> documented wedding stories
        </p>

        {(selectedCategory !== "all" || selectedLocation !== "all" || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSelectedLocation("all");
              setSearchQuery("");
            }}
            className="text-[#8C2222] font-medium hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Albums Grid */}
      {displayedAlbums.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedAlbums.map((album, idx) => (
            <AlbumCard
              key={album.id}
              album={album}
              aspect={idx % 3 === 0 ? "portrait" : idx % 3 === 1 ? "landscape" : "square"}
            />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center border border-[#B68A35]/20 bg-white rounded-xs p-8 space-y-4 royal-shadow">
          <p className="font-editorial-title text-2xl text-[#1C1917]">
            No collections match your search
          </p>
          <p className="text-xs text-[#6B6257] max-w-sm mx-auto">
            Try choosing a different category or clearing your location filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSelectedLocation("all");
              setSearchQuery("");
            }}
            className="px-6 py-2.5 bg-[#B68A35] text-[#FAF7F2] text-xs uppercase tracking-widest font-medium rounded-xs"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center pt-8">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="px-8 py-3.5 bg-white border border-[#B68A35] text-[#1C1917] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#B68A35] hover:text-[#FAF7F2] transition-all duration-300 rounded-xs royal-shadow"
          >
            Load More Stories ({filteredAlbums.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
