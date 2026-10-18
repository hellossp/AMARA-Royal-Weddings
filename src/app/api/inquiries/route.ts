import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createInquiry } from "@/lib/data-store";

const inquirySchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  phone: z
    .string()
    .min(8, "Phone or WhatsApp number must be at least 8 digits")
    .max(20, "Phone number is too long"),
  eventType: z.string().min(2, "Please select an event type"),
  eventDate: z.string().optional(),
  location: z.string().min(2, "Please specify the event city or location"),
  venue: z.string().optional(),
  budgetRange: z.string().optional(),
  servicesRequired: z.enum(["photography", "cinematography", "both"]),
  message: z.string().max(3000).optional(),
  preferredContactMethod: z.enum(["whatsapp", "email", "phone"]).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Spam honeypot protection: if a hidden honeypot field is filled, reject silently
    if (body.website_trap || body._hp) {
      return NextResponse.json({ success: true, referenceId: "INQ-VERIFIED" });
    }

    const validated = inquirySchema.parse(body);

    const saved = await createInquiry({
      fullName: validated.fullName,
      email: validated.email,
      phone: validated.phone,
      eventType: validated.eventType,
      eventDate: validated.eventDate || undefined,
      location: validated.location,
      venue: validated.venue || undefined,
      budgetRange: validated.budgetRange || undefined,
      servicesRequired: validated.servicesRequired,
      message: validated.message || undefined,
      preferredContactMethod: validated.preferredContactMethod || "whatsapp",
    });

    return NextResponse.json(
      {
        success: true,
        referenceId: saved.id,
        message: "Your inquiry has been received. Our concierge will contact you within 24 hours.",
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation error",
          details: err.issues.map((issue) => issue.message),
        },
        { status: 400 }
      );
    }

    console.error("Inquiry submission error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your inquiry.",
      },
      { status: 500 }
    );
  }
}
