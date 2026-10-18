import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PetalShower from "@/components/PetalShower";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "AMARA STUDIOS | Luxury Wedding Photography & Cinematic Films",
    template: "%s | AMARA STUDIOS",
  },
  description:
    "Bespoke luxury wedding photography, cinematic feature films, and emotional heirloom stories across India and worldwide destination celebrations.",
  keywords: [
    "Indian wedding photography",
    "Luxury destination wedding cinema",
    "Udaipur wedding photographer",
    "Goa wedding films",
    "Editorial bridal portraits",
    "Pre-wedding film India",
    "Fine art photography studio",
  ],
  authors: [{ name: "AMARA STUDIOS" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://amarastudios.in",
    siteName: "AMARA STUDIOS",
    title: "AMARA STUDIOS | Fine Art Photography & Cinema",
    description:
      "Capturing timeless luxury weddings and heirloom celebrations across India and worldwide.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=85&w=1200",
        width: 1200,
        height: 630,
        alt: "AMARA STUDIOS Luxury Wedding Photography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AMARA STUDIOS | Luxury Wedding Photography & Films",
    description: "Capturing timeless love stories and luxury weddings across India.",
    images: [
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=85&w=1200",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${plusJakarta.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1C1917] selection:bg-[#DFC285] selection:text-[#1C1917] antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <PetalShower />
      </body>
    </html>
  );
}
