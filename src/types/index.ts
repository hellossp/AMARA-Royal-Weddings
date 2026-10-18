export type AlbumCategory =
  | "weddings"
  | "engagements"
  | "pre-weddings"
  | "receptions"
  | "maternity"
  | "portraits"
  | "birthdays"
  | "corporate"
  | "destination";

export interface AlbumImage {
  id: string;
  albumId: string;
  imageUrl: string;
  altText: string;
  caption?: string;
  width: number;
  height: number;
  sortOrder: number;
}

export interface Album {
  id: string;
  title: string;
  slug: string;
  category: AlbumCategory;
  clientNames: string;
  location: string;
  eventDate: string;
  year: string;
  coverImage: string;
  description: string;
  storyDetails?: {
    tradition?: string;
    venue?: string;
    cinematographyStyle?: string;
    keyMoments?: string[];
  };
  isPublished: boolean;
  isFeatured: boolean;
  videoUrl?: string; // YouTube, Vimeo embed or direct mp4
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  images: AlbumImage[];
  photos?: AlbumImage[];
}

export interface Film {
  id: string;
  title: string;
  slug: string;
  category: "wedding" | "pre-wedding" | "teaser" | "event";
  coupleNames: string;
  location: string;
  duration: string;
  thumbnailUrl: string;
  videoEmbedUrl: string;
  description: string;
  featured: boolean;
  eventDate: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  category: AlbumCategory | "cinema" | "custom";
  shortDescription: string;
  fullDescription: string;
  deliverables: string[];
  equipment: string[];
  timeline: string;
  imageUrl: string;
  isActive: boolean;
  sortOrder: number;
}

export type InquiryStatus = "new" | "contacted" | "qualified" | "booked" | "closed";

export interface InquiryNote {
  id: string;
  inquiryId: string;
  note: string;
  author: string;
  createdAt: string;
}

export interface Inquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate?: string;
  location: string;
  venue?: string;
  budgetRange?: string;
  servicesRequired: "photography" | "cinematography" | "both";
  message?: string;
  preferredContactMethod?: "whatsapp" | "email" | "phone";
  status: InquiryStatus;
  isArchived: boolean;
  followUpDate?: string;
  createdAt: string;
  updatedAt: string;
  notes: InquiryNote[];
}

export interface SiteSettings {
  businessName: string;
  tagline: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  instagramUrl: string;
  youtubeUrl: string;
  vimeoUrl: string;
  serviceAreas: string[];
  travelNotice: string;
  metaTitle: string;
  metaDescription: string;
  notificationEmail: string;
  enableEmailAlerts: boolean;
}
