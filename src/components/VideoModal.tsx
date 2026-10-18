"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  videoUrl,
  title,
}: VideoModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !videoUrl) return null;

  // Format video url if regular youtube watch link
  let embedUrl = videoUrl;
  if (videoUrl.includes("youtube.com/watch?v=")) {
    embedUrl = videoUrl.replace("watch?v=", "embed/");
  } else if (videoUrl.includes("youtu.be/")) {
    embedUrl = videoUrl.replace("youtu.be/", "www.youtube.com/embed/");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Playing video: ${title}`}
    >
      <div className="relative w-full max-w-5xl bg-[#FAF7F2] border border-[#B68A35]/40 rounded-xs overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-[#B68A35]/20 bg-[#FAF7F2]">
          <h3 className="text-sm font-medium uppercase tracking-wider text-[#1C1917] truncate max-w-md">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#6B6257] hover:text-[#1C1917] hover:bg-black/5 transition-colors focus:outline-none focus:ring-1 focus:ring-[#B68A35]"
            aria-label="Close video (Escape)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Embed Aspect Ratio (16:9) */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
