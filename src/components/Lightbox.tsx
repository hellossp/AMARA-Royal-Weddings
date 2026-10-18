"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { AlbumImage } from "@/types";

interface LightboxProps {
  images: AlbumImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  const currentImage = images[currentIndex];

  const handleNext = useCallback(() => {
    if (images.length <= 1) return;
    const nextIndex = (currentIndex + 1) % images.length;
    onNavigate(nextIndex);
  }, [currentIndex, images.length, onNavigate]);

  const handlePrev = useCallback(() => {
    if (images.length <= 1) return;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    onNavigate(prevIndex);
  }, [currentIndex, images.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Lock body scroll while lightbox is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen || !currentImage) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl transition-all duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Top Header Bar */}
      <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-50 bg-gradient-to-b from-black/80 to-transparent">
        <div className="text-xs font-light tracking-[0.25em] text-[#d1ccc4] uppercase">
          <span>{currentIndex + 1}</span>
          <span className="mx-2 text-white/30">/</span>
          <span>{images.length}</span>
        </div>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full border border-white/10 text-[#faf8f5] hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
          aria-label="Close lightbox (Escape)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Container */}
      <div className="relative w-full h-full max-w-6xl max-h-[85vh] p-4 sm:p-8 flex items-center justify-center">
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <div className="relative w-full h-[75vh] max-h-[800px]">
            <Image
              src={currentImage.imageUrl}
              alt={currentImage.altText || "Wedding photograph"}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-contain select-none transition-opacity duration-300"
              priority
            />
          </div>

          {/* Caption */}
          {currentImage.caption && (
            <p className="mt-4 text-xs sm:text-sm font-light text-[#d1ccc4] text-center max-w-xl font-editorial-serif italic tracking-wide">
              {currentImage.caption}
            </p>
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full border border-white/10 bg-black/40 hover:bg-[#c5a059] hover:text-[#09090b] text-[#faf8f5] transition-all focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
            aria-label="Previous image (Left arrow)"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full border border-white/10 bg-black/40 hover:bg-[#c5a059] hover:text-[#09090b] text-[#faf8f5] transition-all focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
            aria-label="Next image (Right arrow)"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </>
      )}
    </div>
  );
}
