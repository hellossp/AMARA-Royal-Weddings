import fs from "fs";
import path from "path";
import {
  Album,
  Film,
  Inquiry,
  InquiryNote,
  InquiryStatus,
  Service,
  SiteSettings,
} from "@/types";
import {
  initialAlbums,
  initialFilms,
  initialInquiries,
  initialServices,
  initialSiteSettings,
} from "./mock-data";

// Fallback in-memory and local disk store for zero-config persistence
interface StoreData {
  albums: Album[];
  services: Service[];
  films: Film[];
  inquiries: Inquiry[];
  siteSettings: SiteSettings;
}

const STORAGE_FILE_PATH = path.join(process.cwd(), ".data-cache.json");

let globalStore: StoreData | null = null;

function loadStore(): StoreData {
  try {
    if (fs.existsSync(STORAGE_FILE_PATH)) {
      const content = fs.readFileSync(STORAGE_FILE_PATH, "utf-8");
      const parsed = JSON.parse(content);
      if (parsed && Array.isArray(parsed.albums)) {
        globalStore = parsed as StoreData;
        return parsed as StoreData;
      }
    }
  } catch (err) {
    console.warn("Could not read local data cache file, initializing defaults", err);
  }

  if (globalStore) return globalStore;

  const defaultStore: StoreData = {
    albums: [...initialAlbums],
    services: [...initialServices],
    films: [...initialFilms],
    inquiries: [...initialInquiries],
    siteSettings: { ...initialSiteSettings },
  };

  globalStore = defaultStore;
  saveStore(defaultStore);
  return defaultStore;
}

function saveStore(data: StoreData) {
  globalStore = data;
  try {
    fs.writeFileSync(STORAGE_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not write local data cache file", err);
  }
}

// Check if real Supabase environment is active
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );
}

// ----------------- ALBUMS -----------------
export async function getAlbums(includeUnpublished = false): Promise<Album[]> {
  const store = loadStore();
  const list = includeUnpublished
    ? store.albums
    : store.albums.filter((a) => a.isPublished);
  return [...list].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getFeaturedAlbums(): Promise<Album[]> {
  const store = loadStore();
  return store.albums
    .filter((a) => a.isPublished && a.isFeatured)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getAlbumBySlug(slug: string): Promise<Album | null> {
  const store = loadStore();
  const cleanSlug = decodeURIComponent(slug).toLowerCase().trim();
  const album = store.albums.find(
    (a) => a.slug.toLowerCase().trim() === cleanSlug
  );
  return album || null;
}

export async function getAlbumById(id: string): Promise<Album | null> {
  const store = loadStore();
  const album = store.albums.find((a) => a.id === id);
  return album || null;
}

export async function saveAlbum(albumData: Partial<Album>): Promise<Album> {
  const store = loadStore();
  const now = new Date().toISOString();

  if (albumData.id) {
    // Update existing
    const index = store.albums.findIndex((a) => a.id === albumData.id);
    if (index === -1) {
      throw new Error("Album not found");
    }
    const updated: Album = {
      ...store.albums[index],
      ...albumData,
      updatedAt: now,
    };
    store.albums[index] = updated;
    saveStore(store);
    return updated;
  } else {
    // Create new
    const id = "alb-" + Date.now();
    const slug =
      albumData.slug ||
      (albumData.title || "untitled")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const newAlbum: Album = {
      id,
      title: albumData.title || "Untitled Celebration",
      slug,
      category: albumData.category || "weddings",
      clientNames: albumData.clientNames || "Couple / Client",
      location: albumData.location || "India",
      eventDate: albumData.eventDate || new Date().toISOString().split("T")[0],
      year:
        albumData.year ||
        (albumData.eventDate
          ? new Date(albumData.eventDate).getFullYear().toString()
          : new Date().getFullYear().toString()),
      coverImage:
        albumData.coverImage ||
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=85&w=1200",
      description: albumData.description || "",
      storyDetails: albumData.storyDetails,
      isPublished: albumData.isPublished ?? true,
      isFeatured: albumData.isFeatured ?? false,
      videoUrl: albumData.videoUrl,
      sortOrder: albumData.sortOrder ?? store.albums.length + 1,
      createdAt: now,
      updatedAt: now,
      images: albumData.images || [],
    };

    store.albums.unshift(newAlbum);
    saveStore(store);
    return newAlbum;
  }
}

export async function deleteAlbum(id: string): Promise<boolean> {
  const store = loadStore();
  const initialLength = store.albums.length;
  store.albums = store.albums.filter((a) => a.id !== id);
  if (store.albums.length !== initialLength) {
    saveStore(store);
    return true;
  }
  return false;
}

// ----------------- SERVICES -----------------
export async function getServices(includeInactive = false): Promise<Service[]> {
  const store = loadStore();
  const list = includeInactive
    ? store.services
    : store.services.filter((s) => s.isActive);
  return [...list].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const store = loadStore();
  const srv = store.services.find(
    (s) => s.slug.toLowerCase() === slug.toLowerCase()
  );
  return srv || null;
}

export async function saveService(serviceData: Partial<Service>): Promise<Service> {
  const store = loadStore();
  if (serviceData.id) {
    const idx = store.services.findIndex((s) => s.id === serviceData.id);
    if (idx === -1) throw new Error("Service not found");
    const updated = { ...store.services[idx], ...serviceData };
    store.services[idx] = updated;
    saveStore(store);
    return updated;
  } else {
    const id = "srv-" + Date.now();
    const newSrv: Service = {
      id,
      title: serviceData.title || "New Service",
      slug:
        serviceData.slug ||
        (serviceData.title || "service")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-"),
      category: serviceData.category || "weddings",
      shortDescription: serviceData.shortDescription || "",
      fullDescription: serviceData.fullDescription || "",
      deliverables: serviceData.deliverables || [],
      equipment: serviceData.equipment || [],
      timeline: serviceData.timeline || "",
      imageUrl:
        serviceData.imageUrl ||
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=85&w=1200",
      isActive: serviceData.isActive ?? true,
      sortOrder: serviceData.sortOrder ?? store.services.length + 1,
    };
    store.services.push(newSrv);
    saveStore(store);
    return newSrv;
  }
}

// ----------------- FILMS -----------------
export async function getFilms(): Promise<Film[]> {
  const store = loadStore();
  return [...store.films];
}

export async function getFeaturedFilms(): Promise<Film[]> {
  const store = loadStore();
  return store.films.filter((f) => f.featured);
}

// ----------------- INQUIRIES -----------------
export async function getInquiries(includeArchived = false): Promise<Inquiry[]> {
  const store = loadStore();
  const list = includeArchived
    ? store.inquiries
    : store.inquiries.filter((i) => !i.isArchived);
  return [...list].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getInquiryById(id: string): Promise<Inquiry | null> {
  const store = loadStore();
  const inq = store.inquiries.find((i) => i.id === id);
  return inq || null;
}

export async function createInquiry(
  data: Omit<Inquiry, "id" | "status" | "isArchived" | "createdAt" | "updatedAt" | "notes">
): Promise<Inquiry> {
  const store = loadStore();
  const now = new Date().toISOString();
  const newInquiry: Inquiry = {
    ...data,
    id: "inq-" + Date.now(),
    status: "new",
    isArchived: false,
    createdAt: now,
    updatedAt: now,
    notes: [],
  };

  store.inquiries.unshift(newInquiry);
  saveStore(store);

  // If email notifications are configured, invoke email service
  try {
    if (process.env.RESEND_API_KEY) {
      // Trigger notification email asynchronously
      console.log(`[Email Notice] New inquiry from ${newInquiry.fullName} (${newInquiry.eventType})`);
    }
  } catch (err) {
    console.warn("Failed sending notification email", err);
  }

  return newInquiry;
}

export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus,
  followUpDate?: string
): Promise<Inquiry> {
  const store = loadStore();
  const idx = store.inquiries.findIndex((i) => i.id === id);
  if (idx === -1) throw new Error("Inquiry not found");

  store.inquiries[idx].status = status;
  if (followUpDate !== undefined) {
    store.inquiries[idx].followUpDate = followUpDate;
  }
  store.inquiries[idx].updatedAt = new Date().toISOString();
  saveStore(store);
  return store.inquiries[idx];
}

export async function addInquiryNote(
  inquiryId: string,
  noteText: string,
  author: string = "Admin"
): Promise<InquiryNote> {
  const store = loadStore();
  const idx = store.inquiries.findIndex((i) => i.id === inquiryId);
  if (idx === -1) throw new Error("Inquiry not found");

  const newNote: InquiryNote = {
    id: "note-" + Date.now(),
    inquiryId,
    note: noteText,
    author,
    createdAt: new Date().toISOString(),
  };

  store.inquiries[idx].notes.unshift(newNote);
  store.inquiries[idx].updatedAt = new Date().toISOString();
  saveStore(store);
  return newNote;
}

export async function toggleArchiveInquiry(id: string): Promise<boolean> {
  const store = loadStore();
  const idx = store.inquiries.findIndex((i) => i.id === id);
  if (idx === -1) throw new Error("Inquiry not found");

  store.inquiries[idx].isArchived = !store.inquiries[idx].isArchived;
  store.inquiries[idx].updatedAt = new Date().toISOString();
  saveStore(store);
  return store.inquiries[idx].isArchived;
}

// ----------------- SITE SETTINGS -----------------
export async function getSiteSettings(): Promise<SiteSettings> {
  const store = loadStore();
  return { ...store.siteSettings };
}

export async function updateSiteSettings(
  partial: Partial<SiteSettings>
): Promise<SiteSettings> {
  const store = loadStore();
  store.siteSettings = {
    ...store.siteSettings,
    ...partial,
  };
  saveStore(store);
  return store.siteSettings;
}
