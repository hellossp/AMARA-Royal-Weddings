"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Download,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Clock,
  Archive,
  MessageSquare,
  Send,
  X,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { Inquiry, InquiryNote, InquiryStatus } from "@/types";

interface AdminInquiryManagerProps {
  initialInquiries: Inquiry[];
}

export default function AdminInquiryManager({
  initialInquiries,
}: AdminInquiryManagerProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showArchived, setShowArchived] = useState(false);

  // New note state
  const [noteText, setNoteText] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);

  // Status update
  const handleUpdateStatus = async (
    inquiryId: string,
    newStatus: InquiryStatus,
    newFollowUpDate?: string
  ) => {
    try {
      const res = await fetch(`/api/admin/inquiries/${inquiryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          followUpDate: newFollowUpDate,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setInquiries((prev) =>
          prev.map((i) => (i.id === inquiryId ? data.inquiry : i))
        );
        if (selectedInquiry?.id === inquiryId) {
          setSelectedInquiry(data.inquiry);
        }
      }
    } catch (err) {
      console.error("Status update error", err);
    }
  };

  // Archive toggle
  const handleToggleArchive = async (inquiryId: string) => {
    try {
      const res = await fetch(`/api/admin/inquiries/${inquiryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toggleArchive: true }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setInquiries((prev) =>
          prev.map((i) =>
            i.id === inquiryId ? { ...i, isArchived: data.isArchived } : i
          )
        );
        if (selectedInquiry?.id === inquiryId) {
          setSelectedInquiry((prev) =>
            prev ? { ...prev, isArchived: data.isArchived } : null
          );
        }
      }
    } catch (err) {
      console.error("Archive error", err);
    }
  };

  // Add Internal Note
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiry || !noteText.trim() || isAddingNote) return;

    setIsAddingNote(true);
    try {
      const res = await fetch(
        `/api/admin/inquiries/${selectedInquiry.id}/notes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ note: noteText.trim() }),
        }
      );
      const data = await res.json();
      if (res.ok && data.success && data.note) {
        const updatedNotes = [data.note, ...selectedInquiry.notes];
        const updatedInquiry = { ...selectedInquiry, notes: updatedNotes };
        setSelectedInquiry(updatedInquiry);
        setInquiries((prev) =>
          prev.map((i) => (i.id === selectedInquiry.id ? updatedInquiry : i))
        );
        setNoteText("");
      }
    } catch (err) {
      console.error("Add note error", err);
    } finally {
      setIsAddingNote(false);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Full Name",
      "Email",
      "Phone",
      "Event Type",
      "Event Date",
      "City/Location",
      "Venue",
      "Budget Range",
      "Services Required",
      "Status",
      "Created At",
    ];

    const rows = filteredInquiries.map((inq) => [
      inq.id,
      `"${inq.fullName.replace(/"/g, '""')}"`,
      `"${inq.email}"`,
      `"${inq.phone}"`,
      `"${inq.eventType}"`,
      `"${inq.eventDate || ""}"`,
      `"${inq.location.replace(/"/g, '""')}"`,
      `"${(inq.venue || "").replace(/"/g, '""')}"`,
      `"${inq.budgetRange || ""}"`,
      `"${inq.servicesRequired}"`,
      `"${inq.status}"`,
      `"${inq.createdAt}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `amara-inquiries-${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered list
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      if (!showArchived && inq.isArchived) return false;
      if (showArchived && !inq.isArchived) return false;

      if (statusFilter !== "all" && inq.status !== statusFilter) return false;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;

      return (
        inq.fullName.toLowerCase().includes(q) ||
        inq.email.toLowerCase().includes(q) ||
        inq.phone.toLowerCase().includes(q) ||
        inq.location.toLowerCase().includes(q) ||
        inq.eventType.toLowerCase().includes(q) ||
        (inq.venue && inq.venue.toLowerCase().includes(q))
      );
    });
  }, [inquiries, showArchived, statusFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Control Bar: Search, Status tabs, and CSV Export */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-[#121215] border border-white/[0.08] p-4 rounded-sm">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search by name, phone, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#09090b] border border-white/10 pl-9 pr-4 py-2 text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm"
            />
            <Search className="w-3.5 h-3.5 text-[#a09c95] absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
            {[
              { id: "all", label: "All" },
              { id: "new", label: "New" },
              { id: "contacted", label: "Contacted" },
              { id: "qualified", label: "Qualified" },
              { id: "booked", label: "Booked" },
              { id: "closed", label: "Closed" },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setStatusFilter(st.id)}
                className={`px-3 py-1.5 rounded-sm capitalize transition-colors ${
                  statusFilter === st.id
                    ? "bg-[#c5a059] text-[#09090b] font-medium"
                    : "text-[#a09c95] hover:text-[#faf8f5] hover:bg-white/[0.04]"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center space-x-3 w-full lg:w-auto justify-end">
          <label className="flex items-center space-x-2 text-xs text-[#a09c95] cursor-pointer mr-2">
            <input
              type="checkbox"
              checked={showArchived}
              onChange={(e) => setShowArchived(e.target.checked)}
              className="accent-[#c5a059]"
            />
            <span>View Archived</span>
          </label>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center space-x-2 px-3.5 py-2 border border-white/10 hover:border-[#c5a059] rounded-sm text-xs text-[#faf8f5] hover:text-[#c5a059] transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Main Table & Detail View Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table (8 cols or 12 cols if no drawer) */}
        <div
          className={`${
            selectedInquiry ? "lg:col-span-7" : "lg:col-span-12"
          } bg-[#121215] border border-white/[0.08] rounded-sm overflow-hidden transition-all duration-300`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#09090b] text-[#a09c95] uppercase tracking-wider border-b border-white/[0.08]">
                <tr>
                  <th className="py-3 px-4 font-medium">Client Info</th>
                  <th className="py-3 px-4 font-medium">Occasion</th>
                  <th className="py-3 px-4 font-medium">Event Date</th>
                  <th className="py-3 px-4 font-medium">City</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                  <th className="py-3 px-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filteredInquiries.length > 0 ? (
                  filteredInquiries.map((inq) => {
                    const isSelected = selectedInquiry?.id === inq.id;
                    return (
                      <tr
                        key={inq.id}
                        onClick={() => setSelectedInquiry(inq)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-[#c5a059]/10 border-l-2 border-[#c5a059]"
                            : "hover:bg-white/[0.02]"
                        }`}
                      >
                        <td className="py-3.5 px-4">
                          <p className="font-medium text-[#faf8f5]">
                            {inq.fullName}
                          </p>
                          <p className="text-[11px] text-[#a09c95] font-light">
                            {inq.email}
                          </p>
                          <p className="text-[10px] text-[#c5a059] font-mono">
                            {inq.phone}
                          </p>
                        </td>

                        <td className="py-3.5 px-4 text-[#d1ccc4]">
                          <p>{inq.eventType}</p>
                          <span className="text-[10px] text-[#8e8a83] uppercase">
                            {inq.servicesRequired}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-[#a09c95]">
                          {inq.eventDate ? (
                            <span className="font-mono text-[11px] text-[#faf8f5]">
                              {inq.eventDate}
                            </span>
                          ) : (
                            <span className="text-[#6e6b65] italic">Not set</span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-[#a09c95]">
                          {inq.location}
                        </td>

                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                              inq.status === "new"
                                ? "bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/40"
                                : inq.status === "contacted"
                                ? "bg-blue-950/40 text-blue-300 border border-blue-800/40"
                                : inq.status === "qualified"
                                ? "bg-purple-950/40 text-purple-300 border border-purple-800/40"
                                : inq.status === "booked"
                                ? "bg-emerald-950/40 text-emerald-300 border border-emerald-800/40"
                                : "bg-stone-800 text-stone-300"
                            }`}
                          >
                            {inq.status}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedInquiry(inq);
                            }}
                            className="text-[#c5a059] hover:underline"
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-12 text-center text-[#a09c95] text-xs"
                    >
                      No inquiries match your filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inquiry Detail Drawer (5 cols) */}
        {selectedInquiry && (
          <div className="lg:col-span-5 bg-[#121215] border border-[#c5a059]/40 rounded-sm p-6 space-y-6 shadow-2xl sticky top-24 animate-in fade-in duration-300">
            {/* Header & Close */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#c5a059]">
                  Inquiry Detail #{selectedInquiry.id}
                </span>
                <h3 className="font-editorial-title text-2xl font-light text-[#faf8f5]">
                  {selectedInquiry.fullName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1 rounded-full text-[#a09c95] hover:text-[#faf8f5] hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Contact Buttons */}
            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(selectedInquiry.fullName)},%20this%20is%20AMARA%20STUDIOS%20regarding%20your%20inquiry%20for%20${encodeURIComponent(selectedInquiry.eventType)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 bg-[#c5a059] text-[#09090b] text-center text-xs uppercase tracking-wider font-medium hover:bg-[#e0c58e] rounded-sm flex items-center justify-center space-x-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`mailto:${selectedInquiry.email}?subject=AMARA%20STUDIOS%20-%20Celebration%20Inquiry`}
                className="py-2 px-3 border border-white/20 text-xs text-[#faf8f5] hover:border-[#c5a059] rounded-sm flex items-center space-x-1"
                title="Send Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>

              <a
                href={`tel:${selectedInquiry.phone}`}
                className="py-2 px-3 border border-white/20 text-xs text-[#faf8f5] hover:border-[#c5a059] rounded-sm flex items-center space-x-1"
                title="Call Phone"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Status & Follow-up Controls */}
            <div className="p-4 bg-[#09090b] border border-white/[0.06] rounded-sm space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#a09c95] mb-1">
                    Pipeline Status
                  </label>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) =>
                      handleUpdateStatus(
                        selectedInquiry.id,
                        e.target.value as InquiryStatus,
                        selectedInquiry.followUpDate
                      )
                    }
                    className="w-full bg-[#121215] border border-white/10 px-2.5 py-1.5 text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm capitalize"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="booked">Booked</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#a09c95] mb-1">
                    Follow-up Date
                  </label>
                  <input
                    type="date"
                    value={selectedInquiry.followUpDate || ""}
                    onChange={(e) =>
                      handleUpdateStatus(
                        selectedInquiry.id,
                        selectedInquiry.status,
                        e.target.value
                      )
                    }
                    className="w-full bg-[#121215] border border-white/10 px-2 py-1.5 text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-[#8e8a83]">
                  Archive status: {selectedInquiry.isArchived ? "Archived" : "Active"}
                </span>
                <button
                  type="button"
                  onClick={() => handleToggleArchive(selectedInquiry.id)}
                  className="text-xs text-[#c5a059] hover:underline"
                >
                  {selectedInquiry.isArchived ? "Unarchive Lead" : "Archive Lead"}
                </button>
              </div>
            </div>

            {/* Submission Details */}
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 border-b border-white/[0.06] pb-3">
                <div>
                  <p className="text-[10px] uppercase text-[#a09c95]">Event Type</p>
                  <p className="text-[#faf8f5] font-medium">{selectedInquiry.eventType}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-[#a09c95]">Event Date</p>
                  <p className="text-[#faf8f5] font-medium">
                    {selectedInquiry.eventDate || "Unspecified"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 border-b border-white/[0.06] pb-3">
                <div>
                  <p className="text-[10px] uppercase text-[#a09c95]">Location</p>
                  <p className="text-[#faf8f5]">{selectedInquiry.location}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-[#a09c95]">Venue</p>
                  <p className="text-[#faf8f5]">{selectedInquiry.venue || "TBD"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 border-b border-white/[0.06] pb-3">
                <div>
                  <p className="text-[10px] uppercase text-[#a09c95]">Services</p>
                  <p className="text-[#c5a059] uppercase">{selectedInquiry.servicesRequired}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-[#a09c95]">Budget Range</p>
                  <p className="text-[#faf8f5]">{selectedInquiry.budgetRange || "Flexible"}</p>
                </div>
              </div>

              {selectedInquiry.message && (
                <div className="pt-2">
                  <p className="text-[10px] uppercase text-[#a09c95] mb-1">Client Message / Vision</p>
                  <p className="text-[#d1ccc4] font-light bg-[#09090b] p-3 rounded-sm leading-relaxed whitespace-pre-wrap">
                    {selectedInquiry.message}
                  </p>
                </div>
              )}
            </div>

            {/* Internal Staff Notes (STRICTLY PRIVATE) */}
            <div className="space-y-4 pt-4 border-t border-white/[0.08]">
              <div className="flex items-center space-x-1.5 text-xs uppercase tracking-wider text-[#faf8f5] font-medium">
                <MessageSquare className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Private Staff Notes</span>
              </div>

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="space-y-2">
                <textarea
                  rows={2}
                  placeholder="Add private note (dates discussed, budget details, coordinator info)..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="w-full bg-[#09090b] border border-white/10 p-2.5 text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm resize-none"
                />
                <button
                  type="submit"
                  disabled={isAddingNote || !noteText.trim()}
                  className="px-3.5 py-1.5 bg-[#c5a059] text-[#09090b] text-[11px] uppercase tracking-wider font-medium hover:bg-[#e0c58e] disabled:opacity-40 rounded-sm"
                >
                  {isAddingNote ? "Posting..." : "Post Note"}
                </button>
              </form>

              {/* Notes Timeline */}
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedInquiry.notes && selectedInquiry.notes.length > 0 ? (
                  selectedInquiry.notes.map((note) => (
                    <div
                      key={note.id}
                      className="p-2.5 bg-[#09090b] border border-white/[0.06] rounded-sm text-xs space-y-1"
                    >
                      <p className="text-[#d1ccc4] font-light">{note.note}</p>
                      <div className="flex items-center justify-between text-[10px] text-[#6e6b65]">
                        <span>{note.author}</span>
                        <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-[11px] text-[#6e6b65] italic py-2">
                    No private staff notes logged for this inquiry yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
