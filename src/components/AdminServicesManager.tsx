"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  PlusCircle,
  Edit,
  CheckCircle2,
  Eye,
  EyeOff,
  Trash2,
  Save,
  Clock,
  Loader2,
  Sliders,
} from "lucide-react";
import { Service } from "@/types";

interface AdminServicesManagerProps {
  initialServices: Service[];
}

export default function AdminServicesManager({
  initialServices,
}: AdminServicesManagerProps) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Toggle active/hidden
  const handleToggleActive = async (srv: Service) => {
    const updated = { ...srv, isActive: !srv.isActive };
    try {
      const res = await fetch("/api/admin/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        setServices((prev) =>
          prev.map((s) => (s.id === srv.id ? updated : s))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Save changes to service
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    setIsSaving(true);
    setSaveMessage(null);

    try {
      const res = await fetch("/api/admin/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingService),
      });
      const data = await res.json();
      if (res.ok && data.service) {
        setServices((prev) =>
          prev.map((s) => (s.id === data.service.id ? data.service : s))
        );
        setSaveMessage("Service saved successfully!");
        setTimeout(() => {
          setEditingService(null);
          setSaveMessage(null);
        }, 600);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Services List Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="p-6 bg-[#121215] border border-white/[0.08] rounded-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-[#c5a059]">
                  {srv.category} &bull; Order #{srv.sortOrder}
                </span>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleToggleActive(srv)}
                    className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                      srv.isActive
                        ? "bg-emerald-950/40 text-emerald-400 border border-emerald-800/40"
                        : "bg-stone-900 text-stone-500 border border-stone-800"
                    }`}
                  >
                    {srv.isActive ? (
                      <>
                        <Eye className="w-3 h-3" />
                        <span>Active</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3" />
                        <span>Hidden</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setEditingService(srv)}
                    className="p-1.5 border border-white/10 hover:border-[#c5a059] text-[#faf8f5] rounded-sm"
                    title="Edit Service"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h3 className="font-editorial-title text-xl text-[#faf8f5]">
                {srv.title}
              </h3>

              <p className="text-xs text-[#a09c95] font-light leading-relaxed line-clamp-2">
                {srv.shortDescription}
              </p>

              <div className="pt-2">
                <p className="text-[10px] uppercase tracking-wider text-[#d1ccc4] mb-1 font-medium">
                  Deliverables ({srv.deliverables?.length || 0}):
                </p>
                <ul className="text-[11px] text-[#8e8a83] space-y-1">
                  {srv.deliverables?.slice(0, 3).map((d, i) => (
                    <li key={i} className="truncate">
                      &bull; {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#a09c95]">
              <span>Timeline: {srv.timeline || "Bespoke"}</span>
              <button
                onClick={() => setEditingService(srv)}
                className="text-[#c5a059] hover:underline"
              >
                Configure & Deliverables &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#121215] border border-white/10 p-6 sm:p-8 rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#c5a059]">
                  Service Configuration
                </span>
                <h3 className="font-editorial-title text-2xl font-light text-[#faf8f5]">
                  {editingService.title}
                </h3>
              </div>
              <button
                onClick={() => setEditingService(null)}
                className="text-[#a09c95] hover:text-[#faf8f5]"
              >
                &times;
              </button>
            </div>

            {saveMessage && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-xs rounded-sm">
                {saveMessage}
              </div>
            )}

            <form onSubmit={handleSaveService} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase tracking-wider text-[#d1ccc4] mb-1">
                  Service Title
                </label>
                <input
                  type="text"
                  value={editingService.title}
                  onChange={(e) =>
                    setEditingService({ ...editingService, title: e.target.value })
                  }
                  className="w-full bg-[#09090b] border border-white/10 p-2.5 text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#d1ccc4] mb-1">
                  Short Tagline
                </label>
                <input
                  type="text"
                  value={editingService.shortDescription}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      shortDescription: e.target.value,
                    })
                  }
                  className="w-full bg-[#09090b] border border-white/10 p-2.5 text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#d1ccc4] mb-1">
                  Full Description & Story
                </label>
                <textarea
                  rows={3}
                  value={editingService.fullDescription}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      fullDescription: e.target.value,
                    })
                  }
                  className="w-full bg-[#09090b] border border-white/10 p-2.5 text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm resize-none"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#d1ccc4] mb-1">
                  Deliverables (One per line)
                </label>
                <textarea
                  rows={4}
                  value={editingService.deliverables?.join("\n") || ""}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      deliverables: e.target.value
                        .split("\n")
                        .filter((line) => line.trim().length > 0),
                    })
                  }
                  className="w-full bg-[#09090b] border border-white/10 p-2.5 text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm font-sans"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#d1ccc4] mb-1">
                  Turnaround Timeline
                </label>
                <input
                  type="text"
                  value={editingService.timeline || ""}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      timeline: e.target.value,
                    })
                  }
                  placeholder="e.g. Full delivery within 5 to 7 weeks"
                  className="w-full bg-[#09090b] border border-white/10 p-2.5 text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm"
                />
              </div>

              <div className="pt-2 flex items-center space-x-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingService.isActive}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        isActive: e.target.checked,
                      })
                    }
                    className="accent-[#c5a059]"
                  />
                  <span className="text-[#faf8f5]">
                    Active & Visible on Public Website
                  </span>
                </label>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 border border-white/10 text-[#a09c95] rounded-sm uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 bg-[#c5a059] text-[#09090b] rounded-sm font-medium uppercase tracking-wider hover:bg-[#e0c58e] disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
