"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CheckCircle2,
  Send,
  Loader2,
  Calendar,
  MapPin,
  MessageCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";

const inquiryFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(8, "Phone or WhatsApp number must be at least 8 digits")
    .max(20, "Number is too long"),
  eventType: z.string().min(1, "Please select an event type"),
  eventDate: z.string().optional(),
  location: z.string().min(2, "Please provide the wedding city or destination"),
  venue: z.string().optional(),
  budgetRange: z.string().optional(),
  servicesRequired: z.enum(["photography", "cinematography", "both"]),
  message: z.string().optional(),
  preferredContactMethod: z.enum(["whatsapp", "email", "phone"]).optional(),
  website_trap: z.string().max(0).optional(),
});

type InquiryFormValues = z.infer<typeof inquiryFormSchema>;

interface InquiryFormProps {
  initialEventType?: string;
  initialService?: "photography" | "cinematography" | "both";
}

export default function InquiryForm({
  initialEventType = "",
  initialService = "both",
}: InquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      eventType: initialEventType || "",
      eventDate: "",
      location: "",
      venue: "",
      budgetRange: "₹5 - 8 Lakhs",
      servicesRequired: initialService,
      message: "",
      preferredContactMethod: "whatsapp",
      website_trap: "",
    },
  });

  const selectedService = watch("servicesRequired");

  const onSubmit = async (data: InquiryFormValues) => {
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setSubmissionSuccess(result.referenceId || "SUBMITTED");
        reset();
      } else {
        setSubmissionError(
          result.error || "Unable to submit your inquiry. Please try again."
        );
      }
    } catch (err) {
      console.error(err);
      setSubmissionError(
        "A network error occurred. Please reach us on WhatsApp directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionSuccess) {
    return (
      <div className="bg-white border-2 border-[#B68A35] p-8 sm:p-12 text-center rounded-xs royal-shadow animate-in fade-in duration-500">
        <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#B68A35] flex items-center justify-center mx-auto mb-6 text-[#8C2222]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <p className="text-xs uppercase tracking-[0.3em] text-[#8C2222] font-semibold mb-2">
          ॥ शुभ मंगलम् ॥
        </p>

        <h3 className="font-editorial-title text-2xl sm:text-3xl text-[#1C1917] mb-3">
          Your Wedding Story Begins
        </h3>

        <p className="text-sm text-[#5C524A] max-w-md mx-auto leading-relaxed mb-6 font-light">
          Thank you for reaching out to AMARA STUDIOS. We have reserved your inquiry
          under reference ID:{" "}
          <span className="font-mono text-[#8C2222] font-bold">
            {submissionSuccess}
          </span>
          . Our creative director will review your wedding dates and connect with you
          within 24 hours.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`https://wa.me/919820194820?text=Namaste%20Amara%20Studios,%20I%20just%20submitted%20an%20inquiry%20(Ref:%20${submissionSuccess}).%20Looking%20forward%20to%20connecting!`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-[#B68A35] text-[#FAF7F2] text-xs uppercase tracking-widest font-medium hover:bg-[#8C6518] rounded-xs shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Connect on WhatsApp Now</span>
          </a>

          <button
            onClick={() => setSubmissionSuccess(null)}
            className="w-full sm:w-auto px-6 py-3.5 border border-[#B68A35]/40 text-xs uppercase tracking-widest text-[#6B6257] hover:text-[#1C1917] hover:border-[#B68A35] rounded-xs"
          >
            Submit Another Date
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border border-[#B68A35]/30 p-6 sm:p-10 space-y-8 rounded-xs royal-shadow"
      noValidate
    >
      {/* Honeypot field */}
      <input
        type="text"
        {...register("website_trap")}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {submissionError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xs flex items-start space-x-3 text-red-800 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
          <span>{submissionError}</span>
        </div>
      )}

      {/* Services Selection Pills */}
      <div>
        <label className="block text-xs uppercase tracking-[0.2em] text-[#1C1917] font-semibold mb-3">
          Services Required <span className="text-[#8C2222]">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: "both", label: "Photo & Film (Complete Story)" },
            { id: "photography", label: "Fine Art Photography Only" },
            { id: "cinematography", label: "Cinematography Films Only" },
          ].map((srv) => (
            <button
              type="button"
              key={srv.id}
              onClick={() =>
                setValue(
                  "servicesRequired",
                  srv.id as "photography" | "cinematography" | "both"
                )
              }
              className={`py-3 px-4 text-xs tracking-wide text-left border rounded-xs transition-all duration-300 ${
                selectedService === srv.id
                  ? "border-[#B68A35] bg-[#B68A35] text-[#FAF7F2] font-medium shadow-xs"
                  : "border-[#B68A35]/25 bg-[#FAF7F2] text-[#4A433A] hover:border-[#B68A35] hover:text-[#1C1917]"
              }`}
            >
              {srv.label}
            </button>
          ))}
        </div>
      </div>

      {/* Row: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="fullName"
            className="block text-xs uppercase tracking-[0.2em] text-[#1C1917] font-semibold mb-2"
          >
            Your Full Name <span className="text-[#8C2222]">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="e.g. Priyanshu Sharma & Meera Rao"
            {...register("fullName")}
            className="w-full bg-[#FAF7F2] border border-[#B68A35]/30 px-4 py-3 text-sm text-[#1C1917] placeholder-[#8C8276] focus:outline-none focus:border-[#B68A35] focus:bg-white rounded-xs transition-colors"
          />
          {errors.fullName && (
            <p className="mt-1.5 text-xs text-red-600 font-medium">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-xs uppercase tracking-[0.2em] text-[#1C1917] font-semibold mb-2"
          >
            Email Address <span className="text-[#8C2222]">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="e.g. priyanshu@example.com"
            {...register("email")}
            className="w-full bg-[#FAF7F2] border border-[#B68A35]/30 px-4 py-3 text-sm text-[#1C1917] placeholder-[#8C8276] focus:outline-none focus:border-[#B68A35] focus:bg-white rounded-xs transition-colors"
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-600 font-medium">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Row: Phone & Event Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="phone"
            className="block text-xs uppercase tracking-[0.2em] text-[#1C1917] font-semibold mb-2"
          >
            Phone / WhatsApp Number <span className="text-[#8C2222]">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+91 98765 43210"
            {...register("phone")}
            className="w-full bg-[#FAF7F2] border border-[#B68A35]/30 px-4 py-3 text-sm text-[#1C1917] placeholder-[#8C8276] focus:outline-none focus:border-[#B68A35] focus:bg-white rounded-xs transition-colors"
          />
          {errors.phone && (
            <p className="mt-1.5 text-xs text-red-600 font-medium">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="eventType"
            className="block text-xs uppercase tracking-[0.2em] text-[#1C1917] font-semibold mb-2"
          >
            Type of Celebration <span className="text-[#8C2222]">*</span>
          </label>
          <select
            id="eventType"
            {...register("eventType")}
            className="w-full bg-[#FAF7F2] border border-[#B68A35]/30 px-4 py-3 text-sm text-[#1C1917] focus:outline-none focus:border-[#B68A35] focus:bg-white rounded-xs transition-colors"
          >
            <option value="">Select Occasion Type</option>
            <option value="Royal Destination Wedding">Royal Destination Wedding (शाही विवाह)</option>
            <option value="Traditional Mandap & Vedic Vivah">Traditional Mandap & Vedic Vivah</option>
            <option value="Pre-Wedding Cinematic Kahani">Pre-Wedding Cinematic Kahani</option>
            <option value="Roka & Sagai Ceremony">Roka & Sagai Ceremony</option>
            <option value="Grand Sangeet & Reception Gala">Grand Sangeet & Reception Gala</option>
            <option value="Maternity & Heirloom Portraiture">Maternity & Heirloom Portraiture</option>
            <option value="Milestone Jubilee Celebration">Milestone Birthday / Anniversary</option>
            <option value="Corporate Heritage Summit">Corporate Gala & Summit</option>
            <option value="Other Bespoke Celebration">Other Bespoke Celebration</option>
          </select>
          {errors.eventType && (
            <p className="mt-1.5 text-xs text-red-600 font-medium">
              {errors.eventType.message}
            </p>
          )}
        </div>
      </div>

      {/* Row: Date & Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="eventDate"
            className="block text-xs uppercase tracking-[0.2em] text-[#1C1917] font-semibold mb-2"
          >
            Wedding Date (or Auspicious Month)
          </label>
          <div className="relative">
            <input
              id="eventDate"
              type="date"
              {...register("eventDate")}
              className="w-full bg-[#FAF7F2] border border-[#B68A35]/30 px-4 py-3 text-sm text-[#1C1917] focus:outline-none focus:border-[#B68A35] focus:bg-white rounded-xs transition-colors"
            />
            <Calendar className="w-4 h-4 text-[#8C6518] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-xs uppercase tracking-[0.2em] text-[#1C1917] font-semibold mb-2"
          >
            City / Wedding Destination <span className="text-[#8C2222]">*</span>
          </label>
          <div className="relative">
            <input
              id="location"
              type="text"
              placeholder="e.g. Udaipur, Goa, Jaipur, Mumbai, Delhi, Alibaug"
              {...register("location")}
              className="w-full bg-[#FAF7F2] border border-[#B68A35]/30 px-4 py-3 text-sm text-[#1C1917] placeholder-[#8C8276] focus:outline-none focus:border-[#B68A35] focus:bg-white rounded-xs transition-colors"
            />
            <MapPin className="w-4 h-4 text-[#8C6518] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          {errors.location && (
            <p className="mt-1.5 text-xs text-red-600 font-medium">
              {errors.location.message}
            </p>
          )}
        </div>
      </div>

      {/* Row: Venue & Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="venue"
            className="block text-xs uppercase tracking-[0.2em] text-[#1C1917] font-semibold mb-2"
          >
            Venue (if finalized)
          </label>
          <input
            id="venue"
            type="text"
            placeholder="e.g. The Leela Palace, Taj Exotica, Private Estate"
            {...register("venue")}
            className="w-full bg-[#FAF7F2] border border-[#B68A35]/30 px-4 py-3 text-sm text-[#1C1917] placeholder-[#8C8276] focus:outline-none focus:border-[#B68A35] focus:bg-white rounded-xs transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="budgetRange"
            className="block text-xs uppercase tracking-[0.2em] text-[#1C1917] font-semibold mb-2"
          >
            Estimated Photo & Cinema Budget
          </label>
          <select
            id="budgetRange"
            {...register("budgetRange")}
            className="w-full bg-[#FAF7F2] border border-[#B68A35]/30 px-4 py-3 text-sm text-[#1C1917] focus:outline-none focus:border-[#B68A35] focus:bg-white rounded-xs transition-colors"
          >
            <option value="Under ₹3 Lakhs">Under ₹3 Lakhs (Single Day / Intimate)</option>
            <option value="₹3 - 5 Lakhs">₹3 - 5 Lakhs</option>
            <option value="₹5 - 8 Lakhs">₹5 - 8 Lakhs (Signature Multi-Day)</option>
            <option value="₹8 - 12 Lakhs">₹8 - 12 Lakhs (Grand Palace Destination)</option>
            <option value="₹12 - 20 Lakhs+">₹12 - 20 Lakhs+ (Royal Heirloom)</option>
            <option value="To Be Decided">To Be Discussed</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-xs uppercase tracking-[0.2em] text-[#1C1917] font-semibold mb-2"
        >
          Tell Us About Your Vision & Traditions
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Share your wedding functions (Haldi, Mehendi, Sangeet, Pheras), traditions, number of guests, or any special aesthetic you envision..."
          {...register("message")}
          className="w-full bg-[#FAF7F2] border border-[#B68A35]/30 px-4 py-3 text-sm text-[#1C1917] placeholder-[#8C8276] focus:outline-none focus:border-[#B68A35] focus:bg-white rounded-xs transition-colors resize-none"
        />
      </div>

      {/* Preferred Contact Method */}
      <div>
        <label className="block text-xs uppercase tracking-[0.2em] text-[#1C1917] font-semibold mb-2">
          Preferred Way to Connect
        </label>
        <div className="flex flex-wrap gap-5 text-xs text-[#5C524A]">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value="whatsapp"
              {...register("preferredContactMethod")}
              className="accent-[#B68A35]"
            />
            <span>WhatsApp Message</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value="email"
              {...register("preferredContactMethod")}
              className="accent-[#B68A35]"
            />
            <span>Email Proposal</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value="phone"
              {...register("preferredContactMethod")}
              className="accent-[#B68A35]"
            />
            <span>Phone Consultation</span>
          </label>
        </div>
      </div>

      {/* Submit Action */}
      <div className="pt-4 border-t border-[#B68A35]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[11px] text-[#7A6F64] font-light">
          We honor your family&apos;s privacy. Details are strictly confidential.
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 bg-[#B68A35] text-[#FAF7F2] text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#8C6518] disabled:opacity-50 transition-all duration-300 shadow-md rounded-xs"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting Inquiry...</span>
            </>
          ) : (
            <>
              <span>Send Wedding Inquiry</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
