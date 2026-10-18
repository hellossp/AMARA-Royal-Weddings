"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  PlusCircle,
  Edit,
  Trash2,
  ExternalLink,
  Eye,
  CheckCircle,
  XCircle,
  Star,
  Camera,
  AlertTriangle,
} from "lucide-react";
import { Album } from "@/types";

interface AdminAlbumListProps {
  initialAlbums: Album[];
}

export default function AdminAlbumList({ initialAlbums }: AdminAlbumListProps) {
  const [albums, setAlbums] = useState<Album[]>(initialAlbums);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toggle publish status
  const handleTogglePublish = async (album: Album) => {
    const updatedStatus = !album.isPublished;
    try {
      const res = await fetch(`/api/admin/albums/${album.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: updatedStatus }),
      });
      if (res.ok) {
        setAlbums((prev) =>
          prev.map((a) =>
            a.id === album.id ? { ...a, isPublished: updatedStatus } : a
          )
        );
      }
    } catch (err) {
      console.error("Failed toggling publish status", err);
    }
  };

  // Toggle featured status
  const handleToggleFeatured = async (album: Album) => {
    const updatedFeatured = !album.isFeatured;
    try {
      const res = await fetch(`/api/admin/albums/${album.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: updatedFeatured }),
      });
      if (res.ok) {
        setAlbums((prev) =>
          prev.map((a) =>
            a.id === album.id ? { ...a, isFeatured: updatedFeatured } : a
          )
        );
      }
    } catch (err) {
      console.error("Failed toggling featured status", err);
    }
  };

  // Delete album
  const confirmDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/albums/${deletingId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAlbums((prev) => prev.filter((a) => a.id !== deletingId));
        setDeletingId(null);
      }
    } catch (err) {
      console.error("Failed deleting album", err);
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter albums
  const filteredAlbums = albums.filter((album) => {
    const matchesCategory =
      selectedCategory === "all" || album.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      album.title.toLowerCase().includes(q) ||
      album.clientNames.toLowerCase().includes(q) ||
      album.location.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#121215] border border-white/[0.08] p-4 rounded-sm">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search albums by title, client, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#09090b] border border-white/10 pl-9 pr-4 py-2 text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm"
          />
          <Search className="w-3.5 h-3.5 text-[#a09c95] absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#09090b] border border-white/10 px-3 py-2 text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm"
          >
            <option value="all">All Categories</option>
            <option value="weddings">Weddings</option>
            <option value="destination">Destination</option>
            <option value="pre-weddings">Pre-Weddings</option>
            <option value="engagements">Engagements</option>
            <option value="receptions">Receptions</option>
            <option value="maternity">Maternity</option>
            <option value="portraits">Portraits</option>
            <option value="birthdays">Birthdays</option>
            <option value="corporate">Corporate</option>
          </select>

          <Link
            href="/admin/albums/new"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-[#c5a059] text-[#09090b] text-xs uppercase tracking-wider font-medium hover:bg-[#e0c58e] transition-colors rounded-sm shrink-0"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Album</span>
          </Link>
        </div>
      </div>

      {/* Album Table */}
      <div className="bg-[#121215] border border-white/[0.08] rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#09090b] text-[#a09c95] uppercase tracking-wider border-b border-white/[0.08]">
              <tr>
                <th className="py-3 px-4 font-medium">Cover</th>
                <th className="py-3 px-4 font-medium">Title & Couple</th>
                <th className="py-3 px-4 font-medium">Category</th>
                <th className="py-3 px-4 font-medium">Location & Year</th>
                <th className="py-3 px-4 font-medium text-center">Photos</th>
                <th className="py-3 px-4 font-medium text-center">Featured</th>
                <th className="py-3 px-4 font-medium text-center">Status</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredAlbums.map((album) => (
                <tr key={album.id} className="hover:bg-white/[0.02] transition-colors">
                  {/* Cover Thumbnail */}
                  <td className="py-3 px-4">
                    <div className="relative w-12 h-12 rounded-sm overflow-hidden border border-white/10 shrink-0">
                      <Image
                        src={album.coverImage}
                        alt={album.title}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  </td>

                  {/* Title & Couple */}
                  <td className="py-3 px-4">
                    <p className="font-medium text-[#faf8f5] hover:text-[#c5a059] transition-colors">
                      <Link href={`/admin/albums/${album.id}`}>{album.title}</Link>
                    </p>
                    <p className="text-[11px] text-[#c5a059] font-light">
                      {album.clientNames}
                    </p>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4">
                    <span className="capitalize text-[#d1ccc4]">
                      {album.category.replace("-", " ")}
                    </span>
                  </td>

                  {/* Location & Year */}
                  <td className="py-3 px-4 text-[#a09c95]">
                    <p>{album.location}</p>
                    <p className="text-[10px] text-[#6e6b65]">{album.year}</p>
                  </td>

                  {/* Photos count */}
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center space-x-1 text-[#faf8f5]">
                      <Camera className="w-3 h-3 text-[#a09c95]" />
                      <span>{album.images ? album.images.length : 0}</span>
                    </span>
                  </td>

                  {/* Featured Toggle */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleToggleFeatured(album)}
                      title={album.isFeatured ? "Featured on Home" : "Not Featured"}
                      className={`p-1.5 rounded-full transition-colors ${
                        album.isFeatured
                          ? "text-[#c5a059] bg-[#c5a059]/10"
                          : "text-[#6e6b65] hover:text-[#faf8f5]"
                      }`}
                    >
                      <Star
                        className={`w-4 h-4 ${album.isFeatured ? "fill-current" : ""}`}
                      />
                    </button>
                  </td>

                  {/* Published Toggle */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleTogglePublish(album)}
                      className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider transition-colors ${
                        album.isPublished
                          ? "bg-emerald-950/40 text-emerald-400 border border-emerald-800/40"
                          : "bg-amber-950/40 text-amber-400 border border-amber-800/40"
                      }`}
                    >
                      {album.isPublished ? (
                        <>
                          <CheckCircle className="w-3 h-3" />
                          <span>Published</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3" />
                          <span>Draft</span>
                        </>
                      )}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/portfolio/${album.slug}`}
                        target="_blank"
                        className="p-1.5 text-[#a09c95] hover:text-[#faf8f5] hover:bg-white/10 rounded-sm transition-colors"
                        title="Preview Public Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href={`/admin/albums/${album.id}`}
                        className="p-1.5 text-[#a09c95] hover:text-[#c5a059] hover:bg-white/10 rounded-sm transition-colors"
                        title="Edit Album Details & Gallery"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() => setDeletingId(album.id)}
                        className="p-1.5 text-[#a09c95] hover:text-red-400 hover:bg-red-950/20 rounded-sm transition-colors"
                        title="Delete Album"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#121215] border border-red-800/60 p-6 sm:p-8 rounded-sm max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center space-x-3 text-red-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-editorial-title text-xl text-[#faf8f5]">
                Confirm Album Deletion
              </h3>
            </div>

            <p className="text-xs text-[#a09c95] leading-relaxed">
              Are you sure you want to delete this album? This will remove all associated gallery photographs and cannot be undone.
            </p>

            <div className="pt-4 flex items-center justify-end space-x-3">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 border border-white/10 text-xs uppercase tracking-wider text-[#faf8f5] hover:bg-white/10 rounded-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs uppercase tracking-wider font-medium rounded-sm disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Permanently Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
