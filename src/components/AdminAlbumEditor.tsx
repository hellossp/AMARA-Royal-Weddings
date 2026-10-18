"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Save,
  ArrowLeft,
  Upload,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Eye,
  Camera,
  Film,
} from "lucide-react";
import { Album, AlbumCategory, AlbumImage } from "@/types";

interface AdminAlbumEditorProps {
  initialAlbum?: Album | null;
  isNew?: boolean;
}

export default function AdminAlbumEditor({
  initialAlbum,
  isNew = false,
}: AdminAlbumEditorProps) {
  const router = useRouter();

  // Form State
  const [title, setTitle] = useState(initialAlbum?.title || "");
  const [slug, setSlug] = useState(initialAlbum?.slug || "");
  const [category, setCategory] = useState<AlbumCategory>(
    initialAlbum?.category || "weddings"
  );
  const [clientNames, setClientNames] = useState(
    initialAlbum?.clientNames || ""
  );
  const [location, setLocation] = useState(initialAlbum?.location || "");
  const [eventDate, setEventDate] = useState(initialAlbum?.eventDate || "");
  const [year, setYear] = useState(
    initialAlbum?.year || new Date().getFullYear().toString()
  );
  const [description, setDescription] = useState(
    initialAlbum?.description || ""
  );
  const [venue, setVenue] = useState(
    initialAlbum?.storyDetails?.venue || ""
  );
  const [tradition, setTradition] = useState(
    initialAlbum?.storyDetails?.tradition || ""
  );
  const [cinematographyStyle, setCinematographyStyle] = useState(
    initialAlbum?.storyDetails?.cinematographyStyle || ""
  );
  const [videoUrl, setVideoUrl] = useState(initialAlbum?.videoUrl || "");
  const [coverImage, setCoverImage] = useState(
    initialAlbum?.coverImage ||
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=85&w=1200"
  );
  const [isPublished, setIsPublished] = useState(
    initialAlbum ? initialAlbum.isPublished : true
  );
  const [isFeatured, setIsFeatured] = useState(
    initialAlbum ? initialAlbum.isFeatured : false
  );

  // Gallery Photos
  const [images, setImages] = useState<AlbumImage[]>(
    initialAlbum?.images ? [...initialAlbum.images] : []
  );

  // Media upload state
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [newPhotoCaption, setNewPhotoCaption] = useState("");

  // Saving state
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (isNew || !slug) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(generated);
    }
  };

  // Upload Cover Image
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingCover(true);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setCoverImage(data.url);
      } else {
        setErrorMessage(data.error || "Failed to upload cover image.");
      }
    } catch (err) {
      setErrorMessage("Network error uploading image.");
    } finally {
      setIsUploadingCover(false);
    }
  };

  // Upload Gallery Photos (multiple supported)
  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingGallery(true);
    setErrorMessage(null);

    const uploadedList: AlbumImage[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/admin/media/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (res.ok && data.url) {
          uploadedList.push({
            id: "img-" + Date.now() + "-" + i,
            albumId: initialAlbum?.id || "temp",
            imageUrl: data.url,
            altText: file.name.replace(/\.[^/.]+$/, ""),
            caption: "",
            width: data.width || 1600,
            height: data.height || 1067,
            sortOrder: images.length + uploadedList.length + 1,
          });
        }
      } catch (err) {
        console.error("Gallery file upload failed", err);
      }
    }

    if (uploadedList.length > 0) {
      setImages((prev) => [...prev, ...uploadedList]);
    }
    setIsUploadingGallery(false);
  };

  // Add photo via direct URL
  const handleAddPhotoByUrl = () => {
    if (!newPhotoUrl.trim()) return;

    const newImg: AlbumImage = {
      id: "img-" + Date.now(),
      albumId: initialAlbum?.id || "temp",
      imageUrl: newPhotoUrl.trim(),
      altText: newPhotoCaption.trim() || title || "Wedding photo",
      caption: newPhotoCaption.trim() || undefined,
      width: 1600,
      height: 1067,
      sortOrder: images.length + 1,
    };

    setImages((prev) => [...prev, newImg]);
    setNewPhotoUrl("");
    setNewPhotoCaption("");
  };

  // Gallery image reordering
  const moveImage = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const updated = [...images];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    // re-assign sortOrder
    updated.forEach((img, idx) => {
      img.sortOrder = idx + 1;
    });

    setImages(updated);
  };

  // Remove gallery image
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Update caption
  const updateImageCaption = (index: number, caption: string) => {
    setImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, caption } : img))
    );
  };

  // Submit Album Save
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    setErrorMessage(null);

    const payload = {
      title,
      slug,
      category,
      clientNames,
      location,
      eventDate,
      year: year || (eventDate ? eventDate.substring(0, 4) : "2026"),
      description,
      storyDetails: {
        venue,
        tradition,
        cinematographyStyle,
      },
      videoUrl: videoUrl || undefined,
      coverImage,
      isPublished,
      isFeatured,
      images,
    };

    try {
      const url = isNew
        ? "/api/admin/albums"
        : `/api/admin/albums/${initialAlbum?.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSaveSuccess(true);
        setTimeout(() => {
          router.push("/admin/albums");
          router.refresh();
        }, 800);
      } else {
        setErrorMessage(data.error || "Failed saving album.");
      }
    } catch (err) {
      setErrorMessage("Network error saving album.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-10 max-w-5xl">
      {/* Top Header & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div className="flex items-center space-x-3">
          <Link
            href="/admin/albums"
            className="p-2 border border-white/10 hover:border-[#c5a059] rounded-sm text-[#a09c95] hover:text-[#faf8f5] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059]">
              {isNew ? "Create Album" : "Edit Album"}
            </span>
            <h1 className="font-editorial-title text-2xl sm:text-3xl font-light text-[#faf8f5]">
              {title || "Untitled Celebration"}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {!isNew && initialAlbum && (
            <Link
              href={`/portfolio/${initialAlbum.slug}`}
              target="_blank"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 border border-white/10 text-xs text-[#faf8f5] hover:border-[#c5a059] hover:text-[#c5a059] rounded-sm"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Live</span>
            </Link>
          )}

          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center space-x-2 px-6 py-2.5 bg-[#c5a059] text-[#09090b] text-xs uppercase tracking-wider font-medium hover:bg-[#e0c58e] disabled:opacity-50 transition-colors rounded-sm shadow-md"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : saveSuccess ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-800" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save & Publish</span>
              </>
            )}
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-950/40 border border-red-800/60 rounded-sm flex items-start space-x-3 text-red-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* SECTION 1: CORE DETAILS */}
      <div className="bg-[#121215] border border-white/[0.08] p-6 sm:p-8 rounded-sm space-y-6">
        <h3 className="text-xs uppercase tracking-[0.25em] text-[#faf8f5] font-medium border-b border-white/[0.08] pb-3">
          1. Core Album Metadata
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2">
            <label className="block text-xs uppercase tracking-wider text-[#d1ccc4] mb-2">
              Album Title <span className="text-[#c5a059]">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. The Royal Symphony at Lake Pichola"
              className="w-full bg-[#09090b] border border-white/10 px-4 py-3 text-sm text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d1ccc4] mb-2">
              URL Slug <span className="text-[#c5a059]">*</span>
            </label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. royal-symphony-lake-pichola"
              className="w-full bg-[#09090b] border border-white/10 px-4 py-3 text-sm text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm font-mono text-xs"
            />
            <p className="text-[10px] text-[#6e6b65] mt-1">
              Public link: /portfolio/{slug || "slug"}
            </p>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d1ccc4] mb-2">
              Event Category <span className="text-[#c5a059]">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as AlbumCategory)}
              className="w-full bg-[#09090b] border border-white/10 px-4 py-3 text-sm text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm"
            >
              <option value="weddings">Royal Wedding</option>
              <option value="destination">Destination Wedding</option>
              <option value="pre-weddings">Pre-Wedding Story</option>
              <option value="engagements">Engagement & Roka</option>
              <option value="receptions">Grand Reception</option>
              <option value="maternity">Maternity & Heirloom</option>
              <option value="portraits">Fine Art Portrait</option>
              <option value="birthdays">Milestone Jubilee</option>
              <option value="corporate">Corporate Gala</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d1ccc4] mb-2">
              Couple / Client Names <span className="text-[#c5a059]">*</span>
            </label>
            <input
              type="text"
              required
              value={clientNames}
              onChange={(e) => setClientNames(e.target.value)}
              placeholder="e.g. Devika & Shaurya"
              className="w-full bg-[#09090b] border border-white/10 px-4 py-3 text-sm text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d1ccc4] mb-2">
              Location / City <span className="text-[#c5a059]">*</span>
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. The Leela Palace, Udaipur"
              className="w-full bg-[#09090b] border border-white/10 px-4 py-3 text-sm text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d1ccc4] mb-2">
              Event Date
            </label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full bg-[#09090b] border border-white/10 px-4 py-3 text-sm text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d1ccc4] mb-2">
              Year
            </label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="e.g. 2025"
              className="w-full bg-[#09090b] border border-white/10 px-4 py-3 text-sm text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#d1ccc4] mb-2">
            Editorial Story & Narrative
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the atmosphere, rituals, and emotional cadence of this celebration..."
            className="w-full bg-[#09090b] border border-white/10 px-4 py-3 text-sm text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm resize-none"
          />
        </div>

        {/* Story details row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/[0.06]">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#a09c95] mb-1">
              Venue Name
            </label>
            <input
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              placeholder="e.g. Jagmandir Island"
              className="w-full bg-[#09090b] border border-white/10 px-3 py-2 text-xs text-[#faf8f5] rounded-sm"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#a09c95] mb-1">
              Tradition / Ritual
            </label>
            <input
              type="text"
              value={tradition}
              onChange={(e) => setTradition(e.target.value)}
              placeholder="e.g. Rajput Royal Wedding"
              className="w-full bg-[#09090b] border border-white/10 px-3 py-2 text-xs text-[#faf8f5] rounded-sm"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#a09c95] mb-1">
              Cinema Style
            </label>
            <input
              type="text"
              value={cinematographyStyle}
              onChange={(e) => setCinematographyStyle(e.target.value)}
              placeholder="e.g. 35mm Anamorphic"
              className="w-full bg-[#09090b] border border-white/10 px-3 py-2 text-xs text-[#faf8f5] rounded-sm"
            />
          </div>
        </div>

        {/* Video link */}
        <div className="pt-2">
          <label className="block text-xs uppercase tracking-wider text-[#d1ccc4] mb-2 flex items-center space-x-1.5">
            <Film className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Cinematic Film Embed Link (Optional)</span>
          </label>
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/embed/ScMzIvxBSi4 or Vimeo link"
            className="w-full bg-[#09090b] border border-white/10 px-4 py-3 text-sm text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm font-mono text-xs"
          />
        </div>

        {/* Status Toggles */}
        <div className="pt-4 border-t border-white/[0.08] flex flex-wrap gap-8">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="w-4 h-4 accent-[#c5a059]"
            />
            <span className="text-xs text-[#faf8f5]">
              Publish Immediately (Visible to Public)
            </span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4 accent-[#c5a059]"
            />
            <span className="text-xs text-[#c5a059]">
              Feature on Homepage Showcase
            </span>
          </label>
        </div>
      </div>

      {/* SECTION 2: COVER IMAGE */}
      <div className="bg-[#121215] border border-white/[0.08] p-6 sm:p-8 rounded-sm space-y-6">
        <h3 className="text-xs uppercase tracking-[0.25em] text-[#faf8f5] font-medium border-b border-white/[0.08] pb-3">
          2. Album Cover Photograph
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 relative aspect-[4/3] rounded-sm overflow-hidden border border-white/10 bg-black">
            <Image
              src={coverImage}
              alt="Cover Preview"
              fill
              sizes="(max-width: 768px) 100vw, 30vw"
              className="object-cover"
            />
            {isUploadingCover && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-xs text-[#c5a059]">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                <span>Uploading...</span>
              </div>
            )}
          </div>

          <div className="md:col-span-8 space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#d1ccc4] mb-2">
                Upload New Cover File
              </label>
              <label className="inline-flex items-center space-x-2 px-4 py-2.5 border border-white/20 hover:border-[#c5a059] rounded-sm text-xs uppercase tracking-wider cursor-pointer transition-colors">
                <Upload className="w-4 h-4 text-[#c5a059]" />
                <span>Choose Image (JPEG, PNG, WEBP)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#d1ccc4] mb-2">
                Or Paste Image Direct URL
              </label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-[#09090b] border border-white/10 px-4 py-2.5 text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: MULTI-PHOTO GALLERY MANAGER */}
      <div className="bg-[#121215] border border-white/[0.08] p-6 sm:p-8 rounded-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div>
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#faf8f5] font-medium">
              3. Gallery Photographs ({images.length})
            </h3>
            <p className="text-[11px] text-[#a09c95]">
              Upload photos, add captions for the lightbox, and reorder.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <label className="inline-flex items-center space-x-2 px-4 py-2 bg-[#c5a059] text-[#09090b] text-xs uppercase tracking-wider font-medium hover:bg-[#e0c58e] rounded-sm cursor-pointer shadow-sm">
              {isUploadingGallery ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Photos</span>
                </>
              )}
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleGalleryUpload}
                disabled={isUploadingGallery}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Quick URL adder */}
        <div className="p-4 bg-[#09090b] border border-white/[0.06] rounded-sm flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Paste image URL..."
            value={newPhotoUrl}
            onChange={(e) => setNewPhotoUrl(e.target.value)}
            className="flex-1 bg-[#121215] border border-white/10 px-3 py-2 text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm font-mono"
          />
          <input
            type="text"
            placeholder="Optional caption..."
            value={newPhotoCaption}
            onChange={(e) => setNewPhotoCaption(e.target.value)}
            className="w-full sm:w-64 bg-[#121215] border border-white/10 px-3 py-2 text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm"
          />
          <button
            type="button"
            onClick={handleAddPhotoByUrl}
            className="px-4 py-2 border border-white/20 hover:border-[#c5a059] text-xs text-[#faf8f5] rounded-sm shrink-0"
          >
            Add Image
          </button>
        </div>

        {/* Photo List */}
        {images.length > 0 ? (
          <div className="space-y-3">
            {images.map((img, idx) => (
              <div
                key={img.id || idx}
                className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-[#09090b] border border-white/[0.06] rounded-sm"
              >
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <div className="relative w-16 h-12 rounded-sm overflow-hidden bg-black shrink-0 border border-white/10">
                    <Image
                      src={img.imageUrl}
                      alt={img.altText || "Photo"}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-1 flex-1 sm:w-80">
                    <input
                      type="text"
                      placeholder="Add image caption..."
                      value={img.caption || ""}
                      onChange={(e) => updateImageCaption(idx, e.target.value)}
                      className="w-full bg-[#121215] border border-white/10 px-2.5 py-1 text-xs text-[#faf8f5] rounded-sm focus:outline-none focus:border-[#c5a059]"
                    />
                    <p className="text-[10px] text-[#6e6b65] truncate font-mono">
                      #{idx + 1} &bull; {img.imageUrl}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => moveImage(idx, "up")}
                    disabled={idx === 0}
                    className="p-1.5 border border-white/10 rounded-sm hover:bg-white/10 disabled:opacity-30 text-[#a09c95]"
                    title="Move Image Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveImage(idx, "down")}
                    disabled={idx === images.length - 1}
                    className="p-1.5 border border-white/10 rounded-sm hover:bg-white/10 disabled:opacity-30 text-[#a09c95]"
                    title="Move Image Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="p-1.5 border border-red-900/40 text-red-400 hover:bg-red-950/20 rounded-sm"
                    title="Delete Image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-xs text-[#a09c95] border border-dashed border-white/10 rounded-sm">
            <Camera className="w-6 h-6 text-[#c5a059] mx-auto mb-2 opacity-50" />
            <p>No gallery photographs added yet.</p>
            <p className="text-[11px] text-[#6e6b65] mt-1">
              Upload files or paste direct image URLs above.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Save Action */}
      <div className="pt-6 border-t border-white/[0.08] flex items-center justify-end space-x-4">
        <Link
          href="/admin/albums"
          className="px-6 py-3 border border-white/10 text-xs uppercase tracking-wider text-[#a09c95] hover:text-[#faf8f5] rounded-sm"
        >
          Cancel
        </Link>

        <button
          type="submit"
          disabled={isSaving}
          className="px-8 py-3 bg-[#c5a059] text-[#09090b] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#e0c58e] disabled:opacity-50 transition-colors rounded-sm shadow-xl"
        >
          {isSaving ? "Saving Album..." : "Save Album"}
        </button>
      </div>
    </form>
  );
}
