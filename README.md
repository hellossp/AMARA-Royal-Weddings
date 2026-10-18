# AMARA STUDIOS — Luxury Photography & Cinematography Website

A production-grade, editorial website and protected content management system built for a premier photography and cinematography atelier serving luxury weddings, engagements, pre-weddings, and heirloom celebrations across India and destination locations worldwide.

---

## 1. Architectural Highlights

- **Framework**: Next.js 16 (App Router) with React 19 and strict TypeScript.
- **Styling**: Tailwind CSS with customized editorial design tokens, warm ivory & charcoal palette, champagne gold accents, and zero cheap SaaS aesthetic.
- **Typography**: Google Fonts pairing of **Cormorant Garamond** (editorial serif headlines) and **Plus Jakarta Sans** (refined sans-serif body).
- **Galleries & Lightbox**: Custom full-screen keyboard-accessible Lightbox with previous/next navigation (Arrow keys, swipe, Escape to close), image counters, and captions.
- **Cinema Video Embeds**: Optimized click-to-play video modals preventing unwanted mobile bandwidth consumption.
- **Inquiry Engine**: React Hook Form + Zod schema validation, honeypot anti-spam protection, WhatsApp instant chat integration, and database storage.
- **Admin Control Center**: Protected administrative dashboard (`/admin`) for full lifecycle management of albums, multi-photo galleries, client inquiries, services, and site settings.
- **Data Layer**: Dual-mode data persistence architecture.
  - When Supabase credentials (`NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`) are present, it connects to PostgreSQL with full Row Level Security (RLS).
  - Out of the box, it seamlessly functions with a persistent local JSON repository pre-seeded with 12 authentic luxury Indian wedding albums, 8 services, 6 films, and sample inquiries.

---

## 2. Public Experience

| Route | Purpose | Key Features |
|---|---|---|
| `/` | **Home Page** | Full-screen hero, brand philosophy, featured collections, interactive cinema showcase, 4-step process, all-India destinations, testimonials, and booking CTAs. |
| `/portfolio` | **Collections & Albums** | Asymmetric editorial grid, category filters (Weddings, Destination, Pre-Weddings, Receptions, Maternity, Portraits, Birthdays, Corporate), city filter, and live search. |
| `/portfolio/[slug]` | **Album Detail View** | Shareable dynamic URL, story narrative, venue & tradition details, responsive asymmetric gallery with full-screen lightbox, video trailer embed, and related collections. |
| `/films` | **Cinematography** | Master cinema banner, click-to-play video modal, runtime badges, category filters (Wedding, Pre-Wedding, Teaser, Event). |
| `/services` | **Services Catalog** | Comprehensive modules covering all major event types, detailed deliverables checklists, camera equipment, delivery timelines, and direct booking triggers. |
| `/about` | **Atelier Story** | Documentary philosophy, creative directors, medium-format & prime cinema glass, sound engineering, backup protocols, and client FAQ. |
| `/contact` | **Reserve Your Date** | Conversion-optimized inquiry form with service selection pills, budget ranges, date picker, honeypot protection, and direct WhatsApp concierge chat. |

---

## 3. Admin Control Center (`/admin`)

Access the secure staff portal at `/admin` (or `/admin/login`).

### Master Default Credentials
- **Email**: `admin@amarastudios.in`
- **Password**: `amara-luxury-2026`
*(Configurable via `ADMIN_DEFAULT_EMAIL` and `ADMIN_DEFAULT_PASSWORD` in `.env.local`)*

### Admin Capabilities
1. **Overview Dashboard**: Live metrics for published albums, total leads, pending new inquiries, upcoming event calendar, and recent inquiry submissions.
2. **Album Management (`/admin/albums`)**:
   - Create and edit albums.
   - Clean auto-generated URL slugs.
   - File upload or URL input for cover images with live preview.
   - Multi-photo gallery manager: upload multiple images, edit captions, and reorder photographs.
   - Publish / Draft toggles and Homepage Featured toggles.
   - Delete confirmation dialog.
   - One-click "Preview Live" button.
3. **Inquiry Pipeline (`/admin/inquiries`)**:
   - Searchable table by client name, email, phone, city, or venue.
   - Filter by status: *New, Contacted, Qualified, Booked, Closed, Archived*.
   - Detail drawer with complete submission data.
   - Direct WhatsApp, email, and phone contact triggers.
   - Internal staff notes thread with timestamps (strictly confidential; never exposed via public APIs).
   - Set client follow-up dates and toggle archive status.
   - **One-click Export to CSV** for spreadsheets and CRM importing.
4. **Services Configuration (`/admin/services`)**:
   - Update titles, taglines, full descriptions, and deliverables checklists.
   - Toggle visibility (Active / Hidden) on the public website.
5. **Website Settings (`/admin/settings`)**:
   - Update business name, tagline, and philosophy bio.
   - Manage studio contact email, phone, and WhatsApp numbers.
   - Configure Instagram, YouTube, and Vimeo links.
   - Toggle instant email alerts on new inquiries.

---

## 4. Setup & Local Development

### Prerequisites
- Node.js 18.17+ or Node.js 20+
- npm, pnpm, or yarn

### Installation
```bash
# 1. Clone or open the repository directory
cd photography

# 2. Install dependencies (if not already installed)
npm install

# 3. Create your local environment file
cp .env.example .env.local

# 4. Run the development server with Turbopack
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the live website.
Visit [http://localhost:3000/admin](http://localhost:3000/admin) to log in to the admin dashboard.

---

## 5. Third-Party Services Configuration

### A. Supabase (Database & RLS)
1. Create a project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** in your Supabase dashboard and run the contents of [`schema.sql`](./schema.sql).
3. Copy your project credentials into `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
   ```

### B. Cloudinary (Cloud Media Storage)
1. Sign up for a free account at [cloudinary.com](https://cloudinary.com).
2. Retrieve your credentials from your Cloudinary console dashboard:
   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   CLOUDINARY_UPLOAD_PRESET=amara_portfolio
   ```
*(Note: If Cloudinary keys are omitted, the application automatically falls back to saving uploaded files to `public/uploads/` on the server).*

### C. Resend (Email Notifications)
1. Sign up at [resend.com](https://resend.com) and generate an API key.
2. Add your key and recipient address to `.env.local`:
   ```env
   RESEND_API_KEY=re_1234567890abcdef
   NOTIFICATION_RECIPIENT_EMAIL=concierge@amarastudios.in
   ```

---

## 6. Build & Production Verification

```bash
# Verify TypeScript types and compile optimized production build
npm run build

# Start production server
npm run start
```
