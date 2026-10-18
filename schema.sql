-- ==============================================================================
-- AMARA STUDIOS - LUXURY PHOTOGRAPHY & CINEMATOGRAPHY DATABASE SCHEMA
-- PostgreSQL / Supabase Schema with Row Level Security (RLS) Policies
-- ==============================================================================

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ALBUMS TABLE
CREATE TABLE IF NOT EXISTS public.albums (
    id TEXT PRIMARY KEY DEFAULT ('alb-' || extract(epoch from now())::bigint),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL CHECK (category IN (
        'weddings', 'engagements', 'pre-weddings', 'receptions', 
        'maternity', 'portraits', 'birthdays', 'corporate', 'destination'
    )),
    client_names TEXT NOT NULL,
    location TEXT NOT NULL,
    event_date DATE NOT NULL,
    year TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    description TEXT,
    story_details JSONB DEFAULT '{}'::jsonb,
    is_published BOOLEAN NOT NULL DEFAULT true,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    video_url TEXT,
    sort_order INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast public portfolio queries
CREATE INDEX IF NOT EXISTS idx_albums_published_featured ON public.albums (is_published, is_featured, sort_order);
CREATE INDEX IF NOT EXISTS idx_albums_category ON public.albums (category);
CREATE INDEX IF NOT EXISTS idx_albums_slug ON public.albums (slug);

-- 2. ALBUM IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.album_images (
    id TEXT PRIMARY KEY DEFAULT ('img-' || extract(epoch from now())::bigint || '-' || substr(md5(random()::text), 1, 6)),
    album_id TEXT NOT NULL REFERENCES public.albums(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT NOT NULL,
    caption TEXT,
    width INT NOT NULL DEFAULT 1600,
    height INT NOT NULL DEFAULT 1067,
    sort_order INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_album_images_album_id ON public.album_images (album_id, sort_order);

-- 3. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY DEFAULT ('srv-' || extract(epoch from now())::bigint),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
    equipment JSONB NOT NULL DEFAULT '[]'::jsonb,
    timeline TEXT,
    image_url TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. FILMS / CINEMATOGRAPHY REELS TABLE
CREATE TABLE IF NOT EXISTS public.films (
    id TEXT PRIMARY KEY DEFAULT ('film-' || extract(epoch from now())::bigint),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL CHECK (category IN ('wedding', 'pre-wedding', 'teaser', 'event')),
    couple_names TEXT NOT NULL,
    location TEXT NOT NULL,
    duration TEXT NOT NULL,
    thumbnail_url TEXT NOT NULL,
    video_embed_url TEXT NOT NULL,
    description TEXT,
    featured BOOLEAN NOT NULL DEFAULT false,
    event_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.inquiries (
    id TEXT PRIMARY KEY DEFAULT ('inq-' || extract(epoch from now())::bigint),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    event_type TEXT NOT NULL,
    event_date DATE,
    location TEXT NOT NULL,
    venue TEXT,
    budget_range TEXT,
    services_required TEXT NOT NULL CHECK (services_required IN ('photography', 'cinematography', 'both')),
    message TEXT,
    preferred_contact_method TEXT CHECK (preferred_contact_method IN ('whatsapp', 'email', 'phone')),
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'booked', 'closed')),
    is_archived BOOLEAN NOT NULL DEFAULT false,
    follow_up_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries (status, is_archived, created_at DESC);

-- 6. INQUIRY PRIVATE NOTES TABLE (STRICTLY PRIVATE FOR ADMINS)
CREATE TABLE IF NOT EXISTS public.inquiry_notes (
    id TEXT PRIMARY KEY DEFAULT ('note-' || extract(epoch from now())::bigint),
    inquiry_id TEXT NOT NULL REFERENCES public.inquiries(id) ON DELETE CASCADE,
    note TEXT NOT NULL,
    author TEXT NOT NULL DEFAULT 'Admin',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_inquiry_notes_inquiry_id ON public.inquiry_notes (inquiry_id, created_at DESC);

-- 7. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.album_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.films ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiry_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES
-- Anyone can view published albums
CREATE POLICY "Public visitors can view published albums"
    ON public.albums FOR SELECT
    USING (is_published = true);

-- Anyone can view images belonging to published albums
CREATE POLICY "Public visitors can view images of published albums"
    ON public.album_images FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.albums WHERE albums.id = album_images.album_id AND albums.is_published = true
    ));

-- Anyone can view active services
CREATE POLICY "Public visitors can view active services"
    ON public.services FOR SELECT
    USING (is_active = true);

-- Anyone can view published films
CREATE POLICY "Public visitors can view films"
    ON public.films FOR SELECT
    USING (true);

-- Anyone can view public site settings
CREATE POLICY "Public visitors can view site settings"
    ON public.site_settings FOR SELECT
    USING (true);

-- PUBLIC WRITE POLICIES
-- Anyone can submit an event inquiry
CREATE POLICY "Public visitors can submit inquiries"
    ON public.inquiries FOR INSERT
    WITH CHECK (true);

-- ADMIN AUTH POLICIES (Full control for authenticated staff / admin users)
CREATE POLICY "Admins have full access to albums"
    ON public.albums FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admins have full access to album images"
    ON public.album_images FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admins have full access to services"
    ON public.services FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admins have full access to films"
    ON public.films FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admins have full access to inquiries"
    ON public.inquiries FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admins have full access to inquiry notes"
    ON public.inquiry_notes FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admins have full access to site settings"
    ON public.site_settings FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
