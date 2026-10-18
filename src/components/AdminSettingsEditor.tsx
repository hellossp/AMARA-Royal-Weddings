"use client";

import React, { useState } from "react";
import {
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building,
  Mail,
  Phone,
  MessageCircle,
  Globe,
  Bell,
} from "lucide-react";
import { SiteSettings } from "@/types";

interface AdminSettingsEditorProps {
  initialSettings: SiteSettings;
}

export default function AdminSettingsEditor({
  initialSettings,
}: AdminSettingsEditorProps) {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMessage(false);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage(true);
        setTimeout(() => setSuccessMessage(false), 3000);
      } else {
        setErrorMessage(data.error || "Failed to update settings.");
      }
    } catch (err) {
      setErrorMessage("Network error updating settings.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
      {successMessage && (
        <div className="p-4 bg-emerald-950/40 border border-emerald-800/60 rounded-sm flex items-center space-x-3 text-emerald-300 text-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Website settings successfully saved and revalidated.</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-red-950/40 border border-red-800/60 rounded-sm flex items-center space-x-3 text-red-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 1. BRAND IDENTITY */}
      <div className="p-6 sm:p-8 bg-[#121215] border border-white/[0.08] rounded-sm space-y-6">
        <div className="flex items-center space-x-2 border-b border-white/[0.08] pb-3 text-xs uppercase tracking-wider text-[#faf8f5] font-medium">
          <Building className="w-4 h-4 text-[#c5a059]" />
          <span>1. Brand Identity & Bio</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div>
            <label className="block uppercase text-[#d1ccc4] mb-2 font-medium">
              Studio / Business Name
            </label>
            <input
              type="text"
              value={settings.businessName}
              onChange={(e) =>
                setSettings({ ...settings, businessName: e.target.value })
              }
              className="w-full bg-[#09090b] border border-white/10 px-3.5 py-2.5 text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm"
            />
          </div>

          <div>
            <label className="block uppercase text-[#d1ccc4] mb-2 font-medium">
              Editorial Tagline
            </label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) =>
                setSettings({ ...settings, tagline: e.target.value })
              }
              className="w-full bg-[#09090b] border border-white/10 px-3.5 py-2.5 text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block uppercase text-[#d1ccc4] mb-2 font-medium">
              Brand Mission / Philosophy Statement
            </label>
            <textarea
              rows={3}
              value={settings.description}
              onChange={(e) =>
                setSettings({ ...settings, description: e.target.value })
              }
              className="w-full bg-[#09090b] border border-white/10 px-3.5 py-2.5 text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm resize-none"
            />
          </div>
        </div>
      </div>

      {/* 2. CONTACT COORDINATES & WHATSAPP */}
      <div className="p-6 sm:p-8 bg-[#121215] border border-white/[0.08] rounded-sm space-y-6">
        <div className="flex items-center space-x-2 border-b border-white/[0.08] pb-3 text-xs uppercase tracking-wider text-[#faf8f5] font-medium">
          <Phone className="w-4 h-4 text-[#c5a059]" />
          <span>2. Contact Coordinates & WhatsApp</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          <div>
            <label className="block uppercase text-[#d1ccc4] mb-2 font-medium">
              Concierge Email
            </label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) =>
                setSettings({ ...settings, contactEmail: e.target.value })
              }
              className="w-full bg-[#09090b] border border-white/10 px-3.5 py-2.5 text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm"
            />
          </div>

          <div>
            <label className="block uppercase text-[#d1ccc4] mb-2 font-medium">
              Studio Phone Number
            </label>
            <input
              type="text"
              value={settings.contactPhone}
              onChange={(e) =>
                setSettings({ ...settings, contactPhone: e.target.value })
              }
              className="w-full bg-[#09090b] border border-white/10 px-3.5 py-2.5 text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm"
            />
          </div>

          <div>
            <label className="block uppercase text-[#d1ccc4] mb-2 font-medium">
              WhatsApp Connect Number
            </label>
            <input
              type="text"
              value={settings.whatsappNumber}
              onChange={(e) =>
                setSettings({ ...settings, whatsappNumber: e.target.value })
              }
              placeholder="+919820194820"
              className="w-full bg-[#09090b] border border-white/10 px-3.5 py-2.5 text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm font-mono"
            />
          </div>
        </div>
      </div>

      {/* 3. SOCIAL MEDIA CHANNELS */}
      <div className="p-6 sm:p-8 bg-[#121215] border border-white/[0.08] rounded-sm space-y-6">
        <div className="flex items-center space-x-2 border-b border-white/[0.08] pb-3 text-xs uppercase tracking-wider text-[#faf8f5] font-medium">
          <Globe className="w-4 h-4 text-[#c5a059]" />
          <span>3. Social Channels & Cinema Portals</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          <div>
            <label className="block uppercase text-[#d1ccc4] mb-2 font-medium">
              Instagram Profile URL
            </label>
            <input
              type="url"
              value={settings.instagramUrl}
              onChange={(e) =>
                setSettings({ ...settings, instagramUrl: e.target.value })
              }
              className="w-full bg-[#09090b] border border-white/10 px-3.5 py-2.5 text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm font-mono"
            />
          </div>

          <div>
            <label className="block uppercase text-[#d1ccc4] mb-2 font-medium">
              YouTube Channel URL
            </label>
            <input
              type="url"
              value={settings.youtubeUrl}
              onChange={(e) =>
                setSettings({ ...settings, youtubeUrl: e.target.value })
              }
              className="w-full bg-[#09090b] border border-white/10 px-3.5 py-2.5 text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm font-mono"
            />
          </div>

          <div>
            <label className="block uppercase text-[#d1ccc4] mb-2 font-medium">
              Vimeo Showcase URL
            </label>
            <input
              type="url"
              value={settings.vimeoUrl}
              onChange={(e) =>
                setSettings({ ...settings, vimeoUrl: e.target.value })
              }
              className="w-full bg-[#09090b] border border-white/10 px-3.5 py-2.5 text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm font-mono"
            />
          </div>
        </div>
      </div>

      {/* 4. NOTIFICATIONS & INQUIRY ALERTS */}
      <div className="p-6 sm:p-8 bg-[#121215] border border-white/[0.08] rounded-sm space-y-6">
        <div className="flex items-center space-x-2 border-b border-white/[0.08] pb-3 text-xs uppercase tracking-wider text-[#faf8f5] font-medium">
          <Bell className="w-4 h-4 text-[#c5a059]" />
          <span>4. Inquiry Alerts & Email Routing</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs items-center">
          <div>
            <label className="block uppercase text-[#d1ccc4] mb-2 font-medium">
              Notification Recipient Email
            </label>
            <input
              type="email"
              value={settings.notificationEmail}
              onChange={(e) =>
                setSettings({ ...settings, notificationEmail: e.target.value })
              }
              className="w-full bg-[#09090b] border border-white/10 px-3.5 py-2.5 text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a059] rounded-sm"
            />
          </div>

          <div className="pt-5">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableEmailAlerts}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    enableEmailAlerts: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-[#c5a059]"
              />
              <span className="text-[#faf8f5]">
                Enable instant email alerts on new inquiries
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-end pt-4">
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center space-x-2 px-8 py-3 bg-[#c5a059] text-[#09090b] text-xs uppercase tracking-wider font-medium hover:bg-[#e0c58e] disabled:opacity-50 transition-colors rounded-sm shadow-xl"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Saving Settings...</span>
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" />
              <span>Save Website Settings</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
