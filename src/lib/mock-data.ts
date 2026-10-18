import { Album, Film, Inquiry, Service, SiteSettings } from "@/types";

export const initialSiteSettings: SiteSettings = {
  businessName: "AMARA STUDIOS",
  tagline: "Fine Art Photography & Cinematic Wedding Films",
  description:
    "We are a boutique visual storytelling studio preserving love, heritage, and genuine human emotion across India and destination celebrations worldwide.",
  contactEmail: "concierge@amarastudios.in",
  contactPhone: "+91 98201 94820",
  whatsappNumber: "+919820194820",
  instagramUrl: "https://instagram.com/amarastudios.films",
  youtubeUrl: "https://youtube.com/@amarastudiosfilms",
  vimeoUrl: "https://vimeo.com/amarastudios",
  serviceAreas: [
    "Udaipur & Jaipur",
    "Goa & Alibaug",
    "Mumbai & Pune",
    "Delhi NCR & Agra",
    "Hyderabad & Bengaluru",
    "Kerala Backwaters",
    "Italy, UAE & Worldwide",
  ],
  travelNotice: "Available Pan-India and internationally for bespoke assignments.",
  metaTitle: "AMARA STUDIOS | Luxury Wedding Photography & Films India",
  metaDescription:
    "Capturing timeless luxury weddings, pre-weddings, and heirloom stories across India and beyond. Editorial imagery meets cinematic storytelling.",
  notificationEmail: "bookings@amarastudios.in",
  enableEmailAlerts: true,
};

export const initialServices: Service[] = [
  {
    id: "srv-1",
    title: "Luxury Wedding Photography",
    slug: "wedding-photography",
    category: "weddings",
    shortDescription:
      "A seamless blend of high-fashion editorial portraiture and discreet candid photojournalism.",
    fullDescription:
      "Our signature wedding photography service is designed for couples who value art, emotion, and unhurried luxury. We capture the grand spectacle as well as the quiet, intimate glances that often go unnoticed. Every photograph is hand-graded to achieve our signature warm filmic aesthetic.",
    deliverables: [
      "Full coverage by 2 Lead Photographers & 2 Associate Artists",
      "700+ Hand-Curated and Individually Color-Graded High-Res Photographs",
      "Handmade Linen Fine-Art Heirloom Album (40 Spreads / 80 Pages)",
      "Private Online Proofing & Download Gallery for Guests",
      "Next-Day 25 Sneak-Peek Images for Social Media",
    ],
    equipment: [
      "Sony FX3 & A7R V Medium-Format Hybrid Bodies",
      "Prime G-Master Lenses (35mm f/1.4, 50mm f/1.2, 85mm f/1.4)",
      "Profoto A10 & B10 Studio Lighting",
    ],
    timeline: "Full delivery within 5 to 7 weeks; Sneak peeks within 48 hours",
    imageUrl:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=85&w=1200",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "srv-2",
    title: "Cinematic Wedding Feature Films",
    slug: "cinematic-wedding-films",
    category: "cinema",
    shortDescription:
      "Narrative-driven 4K cinema films with bespoke audio recording, vows integration, and custom scoring.",
    fullDescription:
      "We don't create generic music videos; we craft emotional heirlooms. We mic the couple and family during key moments to weave genuine spoken vows, parents' blessings, and ambient laughter into an unforgettable cinematic documentary.",
    deliverables: [
      "3-5 Minute Cinematic Trailer / Teaser Film (4K UHD)",
      "18-25 Minute Documentary Feature Wedding Film",
      "Full Multi-Cam Video Coverage of Key Rituals (Pheras, Sangeet Performances, Speeches)",
      "Custom Licensed Soundtracks & Master Audio Design",
      "Delivered in a Bespoke Engraved Wooden USB Box & Cloud Stream",
    ],
    equipment: [
      "Arri & Sony FX6 Cinema Cameras with anamorphic lenses",
      "DJI Ronin RS3 Pro Gimbals & Wireless Follow Focus",
      "Sennheiser Lavalier & Sound Devices Audio Recording",
      "Licensed DJI Cinema Drone Aerial Cinematography",
    ],
    timeline: "Trailer within 3 weeks; Full feature film within 8 weeks",
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=85&w=1200",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "srv-3",
    title: "Pre-Wedding Concepts & Films",
    slug: "pre-wedding-shoots",
    category: "pre-weddings",
    shortDescription:
      "Editorial storytelling sessions in breathtaking heritage forts, coastal sunsets, or intimate architectural spaces.",
    fullDescription:
      "A creative space to celebrate your chemistry away from the wedding commotion. We style, scout, and storyboard romantic narratives that reflect who you both are.",
    deliverables: [
      "1 or 2 Days of Tailored On-Location Shoot",
      "Styling & Moodboard Consultation with Creative Director",
      "120+ Retouched Fine-Art Digital Images",
      "2-3 Minute Cinematic Concept Film / Music Video",
      "Display Frame Print for Reception Entry",
    ],
    equipment: ["35mm and 85mm Prime Cinema lenses", "Vintage Lens Filters", "Drone coverage where permitted"],
    timeline: "Delivered within 3 weeks of shoot date",
    imageUrl:
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=85&w=1200",
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "srv-4",
    title: "Engagements & Roka Ceremonies",
    slug: "engagements-roka",
    category: "engagements",
    shortDescription:
      "Intimate coverage capturing the first auspicious chapter of two families uniting.",
    fullDescription:
      "From traditional Sagan and ring exchanges to the lively cocktail after-party, we capture the joy, family heirlooms, and elegance of your engagement ceremony.",
    deliverables: [
      "Dedicated 2-Artist Team (Photo + Video)",
      "250+ Color-Graded High-Resolution Photographs",
      "3-Minute Highlight Film",
      "Online Private Gallery with 1-Year Cloud Storage",
    ],
    equipment: ["Sony A7 IV & FX3", "Low-light Prime Glass"],
    timeline: "Delivered within 3 to 4 weeks",
    imageUrl:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=85&w=1200",
    isActive: true,
    sortOrder: 4,
  },
  {
    id: "srv-5",
    title: "Receptions & Sangeet Nights",
    slug: "receptions-sangeet",
    category: "receptions",
    shortDescription:
      "High-energy celebration coverage with dynamic stage lighting mastery and candid party captures.",
    fullDescription:
      "Sangeet and reception celebrations demand mastery of theatrical stage lighting, fast-paced choreography, and uninhibited emotional energy. We document the electrifying atmosphere without killing the vibe.",
    deliverables: [
      "Complete Stage Performance Multi-Cam Recording",
      "High-Energy Highlight Teaser Video",
      "300+ Candid & Stage Retouched Images",
      "Audio Feeds Direct from Sound Console",
    ],
    equipment: ["Multi-Camera Stage Setup", "High-Sync Flash Units", "Wireless Stage Mics"],
    timeline: "Delivered within 4 weeks",
    imageUrl:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=85&w=1200",
    isActive: true,
    sortOrder: 5,
  },
  {
    id: "srv-6",
    title: "Maternity & Family Heirloom Portraits",
    slug: "maternity-family",
    category: "maternity",
    shortDescription:
      "Gentle, natural-light studio and home portraiture celebrating life's most tender transitions.",
    fullDescription:
      "Subtle, soulful, and organic portraiture capturing motherhood and family legacy. Shot with soft daylight, neutral styling, and deep sensitivity.",
    deliverables: [
      "2-Hour Intimate Session (In-Studio or Private Residence)",
      "Wardrobe & Color Harmony Guidance",
      "60 Hand-Mastered High-Resolution Digital Photographs",
      "Handmade Linen Mini Folio Print Box",
    ],
    equipment: ["Medium-Format Sensor Bodies", "Natural Diffused Light Modifiers"],
    timeline: "Delivered within 2 weeks",
    imageUrl:
      "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&q=85&w=1200",
    isActive: true,
    sortOrder: 6,
  },
  {
    id: "srv-7",
    title: "Milestone Birthdays & Anniversaries",
    slug: "birthdays-anniversaries",
    category: "birthdays",
    shortDescription:
      "Celebrations of life, decade milestones, and silver/golden anniversaries preserved with timeless grace.",
    fullDescription:
      "Whether it's an intimate 50th birthday dinner or a grand 25th wedding anniversary with multi-generational families, we create an album of togetherness you will treasure for decades.",
    deliverables: [
      "Comprehensive Event Documentation",
      "Family Legacy Group Portraits",
      "150+ Retouched Digital Photos",
      "Short Keepsake Video Reel (60-90 Seconds)",
    ],
    equipment: ["Prime portrait lenses", "Speedlights & Ambient modifiers"],
    timeline: "Delivered within 2 to 3 weeks",
    imageUrl:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=85&w=1200",
    isActive: true,
    sortOrder: 7,
  },
  {
    id: "srv-8",
    title: "Destination Weddings & Bespoke Packages",
    slug: "destination-weddings",
    category: "destination",
    shortDescription:
      "All-inclusive multi-day global coverage with seamless travel logistics and dedicated crew.",
    fullDescription:
      "From royal palaces in Rajasthan and cliffside resorts in Goa to Tuscany villas and Dubai desert ballrooms, our team manages end-to-end multi-day travel, sunrise-to-late-night coverage, and multi-cultural ceremonies.",
    deliverables: [
      "Comprehensive 3 to 4 Days Coverage of All Ceremonies",
      "Complete Photography & Cinematography Crew (6-8 Artists)",
      "Daily Same-Day Social Snippets for Guests",
      "Full Feature Cinema Film + Teaser + Instagram Reels",
      "2 Luxury Royal Silk Heirloom Albums + 2 Parents' Miniature Books",
    ],
    equipment: ["Full Cinema & Drone Fleet", "Redundant On-Site RAID Backup Stations"],
    timeline: "Daily edits during event; Final suite within 8 weeks",
    imageUrl:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=85&w=1200",
    isActive: true,
    sortOrder: 8,
  },
];

export const initialAlbums: Album[] = [
  {
    id: "alb-1",
    title: "The Royal Symphony at Lake Pichola",
    slug: "royal-symphony-lake-pichola",
    category: "weddings",
    clientNames: "Devika & Shaurya",
    location: "The Leela Palace, Udaipur",
    eventDate: "2025-12-14",
    year: "2025",
    coverImage:
      "/images/weddings/pichola-jaimala.jpg",
    description:
      "Under the moonlit Aravali hills and surrounded by the shimmering waters of Lake Pichola, Devika and Shaurya exchanged their vows in a timeless royal celebration. From a sun-drenched floral Haldi on the marble courtyards to an ethereal candlelit Phera ceremony with thousand floating diyas, every second was pure poetry.",
    storyDetails: {
      tradition: "Rajput & Punjabi Royal Fusion",
      venue: "The Leela Palace & Jagmandir Island, Udaipur",
      cinematographyStyle: "35mm Anamorphic Luxury Documentary",
      keyMoments: [
        "Bride entering on a traditional royal boat across the lake",
        "Acoustic sitar recital accompanying the vows under the stars",
        "Emotional Vidai illuminated by hand-held oil brass lamps",
      ],
    },
    isPublished: true,
    isFeatured: true,
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    sortOrder: 1,
    createdAt: "2025-12-20T10:00:00Z",
    updatedAt: "2025-12-20T10:00:00Z",
    images: [
      {
        id: "img-101",
        albumId: "alb-1",
        imageUrl:
          "/images/weddings/pichola-jaimala.jpg",
        altText: "Devika and Shaurya exchanging royal varmalas under floral mandap at Lake Pichola",
        caption: "Devika & Shaurya exchanging garlands at dusk along the palace waterfront",
        width: 1600,
        height: 900,
        sortOrder: 1,
      },
      {
        id: "img-102",
        albumId: "alb-1",
        imageUrl:
          "/images/weddings/bride-jharokha.jpg",
        altText: "Bridal portrait showcasing handcrafted polki necklace and crimson velvet veil in marble jharokha",
        caption: "Devika in bespoke Sabyasachi bridal couture by the palace jharokha",
        width: 1600,
        height: 2000,
        sortOrder: 2,
      },
      {
        id: "img-103",
        albumId: "alb-1",
        imageUrl:
          "/images/weddings/mehendi-henna.jpg",
        altText: "Intricate bridal mehndi henna artwork on hands with diamond heirloom ring and antique gold bangles",
        caption: "Sacred peacock motifs hand-drawn in organic dark Rajasthani henna",
        width: 1600,
        height: 1200,
        sortOrder: 3,
      },
      {
        id: "img-104",
        albumId: "alb-1",
        imageUrl:
          "/images/weddings/haldi-phoolon-holi.jpg",
        altText: "Laughter and flower petals flying during the joyful morning Haldi ceremony phoolon ki holi",
        caption: "Marigold showers during the morning Haldi ritual",
        width: 1600,
        height: 900,
        sortOrder: 4,
      },
      {
        id: "img-105",
        albumId: "alb-1",
        imageUrl:
          "/images/weddings/saat-phere-mandap.jpg",
        altText: "The sacred Saat Phere around the Agni Kund in royal palace mandap",
        caption: "The sacred Pheras under a canopy of jasmine and tuberoses",
        width: 1600,
        height: 900,
        sortOrder: 5,
      },
      {
        id: "img-106",
        albumId: "alb-1",
        imageUrl:
          "/images/weddings/shahi-reception.jpg",
        altText: "Grand palace reception in illuminated royal ballroom under Belgian chandeliers",
        caption: "Royal grand reception celebration under the palace chandeliers",
        width: 1600,
        height: 900,
        sortOrder: 6,
      },
    ],
  },
  {
    id: "alb-2",
    title: "Whispers of the Arabian Sea",
    slug: "whispers-of-arabian-sea",
    category: "destination",
    clientNames: "Ananya & Kabir",
    location: "Alila Diwa, South Goa",
    eventDate: "2025-11-18",
    year: "2025",
    coverImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=85&w=1400",
    description:
      "An effortless coastal destination celebration blending tropical Portuguese-Goan architecture with vibrant North-Indian hospitality. Salty ocean breeze, pastel sunsets, barefoot beach cocktail celebrations, and midnight fireworks.",
    storyDetails: {
      tradition: "Contemporary Beach Destination Wedding",
      venue: "Gonsua Beach & Banyan Lawns, South Goa",
      cinematographyStyle: "Earthy Warmth & Handheld Cinema Documentary",
      keyMoments: [
        "Sunset vows against the crashing waves of the Arabian Sea",
        "A midnight pool party with brass musicians and cold pyro",
      ],
    },
    isPublished: true,
    isFeatured: true,
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    sortOrder: 2,
    createdAt: "2025-11-25T12:00:00Z",
    updatedAt: "2025-11-25T12:00:00Z",
    images: [
      {
        id: "img-201",
        albumId: "alb-2",
        imageUrl:
          "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=85&w=1600",
        altText: "Ananya and Kabir during sunset vows on the Goan coastline",
        caption: "Golden hour seaside vows",
        width: 1600,
        height: 1067,
        sortOrder: 1,
      },
      {
        id: "img-202",
        albumId: "alb-2",
        imageUrl:
          "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=85&w=1600",
        altText: "Couple strolling along the palm-fringed sands at dusk",
        caption: "Strolling through the private palm groves of South Goa",
        width: 1600,
        height: 1067,
        sortOrder: 2,
      },
      {
        id: "img-203",
        albumId: "alb-2",
        imageUrl:
          "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=85&w=1600",
        altText: "Cocktail celebration with bistro fairy lights and open-air dancing",
        caption: "Celebrations under a canopy of fairy lights",
        width: 1600,
        height: 1067,
        sortOrder: 3,
      },
    ],
  },
  {
    id: "alb-3",
    title: "Amber Courtyards & Old World Charm",
    slug: "amber-courtyards-old-world-charm",
    category: "pre-weddings",
    clientNames: "Rhea & Aditya",
    location: "Amer & Panna Meena Kund, Jaipur",
    eventDate: "2025-10-08",
    year: "2025",
    coverImage:
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=85&w=1400",
    description:
      "An editorial pre-wedding film and photo series across the geometric stepwells of Panna Meena Kund and the majestic sandstone corridors of Jaipur. Styled with understated silk fabrics and soft morning light.",
    storyDetails: {
      tradition: "Editorial Pre-Wedding Visual Story",
      venue: "Historic Stepwells & Amber Hills, Jaipur",
      cinematographyStyle: "Editorial Fashion Meets Heritage Romance",
    },
    isPublished: true,
    isFeatured: true,
    sortOrder: 3,
    createdAt: "2025-10-15T08:00:00Z",
    updatedAt: "2025-10-15T08:00:00Z",
    images: [
      {
        id: "img-301",
        albumId: "alb-3",
        imageUrl:
          "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=85&w=1600",
        altText: "Rhea and Aditya caught in a tender embrace amid heritage arches",
        caption: "First light at the Pink City stepwells",
        width: 1600,
        height: 1067,
        sortOrder: 1,
      },
      {
        id: "img-302",
        albumId: "alb-3",
        imageUrl:
          "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=85&w=1600",
        altText: "Rhea posing with fluid silk dupatta against the sandstone stone work",
        caption: "Editorial elegance in amber hues",
        width: 1600,
        height: 2000,
        sortOrder: 2,
      },
    ],
  },
  {
    id: "alb-4",
    title: "Auspicious Threads & Temple Bells",
    slug: "auspicious-threads-temple-bells",
    category: "weddings",
    clientNames: "Meenakshi & Karthik",
    location: "Kumarakom Lake Resort, Kerala",
    eventDate: "2025-09-22",
    year: "2025",
    coverImage:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=85&w=1400",
    description:
      "A serene traditional South Indian ceremony set beside Kerala's emerald backwaters. Crisp gold-bordered Kasavu silks, fragrant white jasmine malas, sacred Nadaswaram notes reverberating over the water, and ancient rituals documented with profound reverence.",
    storyDetails: {
      tradition: "Authentic South Indian Kerala Wedding",
      venue: "Kumarakom Lake Resort Backwaters",
      cinematographyStyle: "Slow Cinema & Organic Sound Design",
    },
    isPublished: true,
    isFeatured: true,
    sortOrder: 4,
    createdAt: "2025-09-30T10:00:00Z",
    updatedAt: "2025-09-30T10:00:00Z",
    images: [
      {
        id: "img-401",
        albumId: "alb-4",
        imageUrl:
          "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=85&w=1600",
        altText: "Traditional wedding rituals with gold temple jewelry and jasmine flowers",
        caption: "The sacred Kanyadaanam ceremony",
        width: 1600,
        height: 1067,
        sortOrder: 1,
      },
      {
        id: "img-402",
        albumId: "alb-4",
        imageUrl:
          "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&q=85&w=1600",
        altText: "Bridal portrait in traditional pure Kanjivaram silk saree",
        caption: "Meenakshi adorned in antique temple gold jewelry",
        width: 1600,
        height: 2000,
        sortOrder: 2,
      },
    ],
  },
  {
    id: "alb-5",
    title: "Golden Hour Promises in South Mumbai",
    slug: "golden-hour-promises-mumbai",
    category: "engagements",
    clientNames: "Sanya & Rohan",
    location: "The Taj Mahal Palace & Colaba, Mumbai",
    eventDate: "2025-08-14",
    year: "2025",
    coverImage:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=85&w=1400",
    description:
      "An intimate sea-facing engagement celebration overlooking the Gateway of India. Contemporary high-fashion styling with black-tie cocktails and emotional ring exchanges in the heritage ballroom.",
    storyDetails: {
      tradition: "Modern Black-Tie Engagement & Roka",
      venue: "Crystal Room, The Taj Mahal Palace, Mumbai",
    },
    isPublished: true,
    isFeatured: false,
    sortOrder: 5,
    createdAt: "2025-08-20T10:00:00Z",
    updatedAt: "2025-08-20T10:00:00Z",
    images: [
      {
        id: "img-501",
        albumId: "alb-5",
        imageUrl:
          "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=85&w=1600",
        altText: "Ring ceremony close-up with diamond solitaire and delicate floral wrist corsage",
        caption: "The ring exchange at sunset",
        width: 1600,
        height: 1067,
        sortOrder: 1,
      },
      {
        id: "img-502",
        albumId: "alb-5",
        imageUrl:
          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=85&w=1600",
        altText: "Sanya and Rohan smiling during their couple portrait session",
        caption: "Celebrations overlooking the harbor",
        width: 1600,
        height: 1067,
        sortOrder: 2,
      },
    ],
  },
  {
    id: "alb-6",
    title: "Midnight Velvet & Chandeliers",
    slug: "midnight-velvet-chandeliers",
    category: "receptions",
    clientNames: "Tara & Armaan",
    location: "ITC Grand Bharat, Gurugram / Delhi NCR",
    eventDate: "2025-07-02",
    year: "2025",
    coverImage:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=85&w=1400",
    description:
      "A grand black-tie wedding reception filled with French crystal chandeliers, live jazz quartet, and a bespoke nine-course banquet. Editorial high-contrast photography celebrating understated luxury.",
    isPublished: true,
    isFeatured: true,
    sortOrder: 6,
    createdAt: "2025-07-10T11:00:00Z",
    updatedAt: "2025-07-10T11:00:00Z",
    images: [
      {
        id: "img-601",
        albumId: "alb-6",
        imageUrl:
          "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=85&w=1600",
        altText: "Grand banquet table setting with crystal stemware and white rose runners",
        caption: "Banquet grandeur in candlelight",
        width: 1600,
        height: 1067,
        sortOrder: 1,
      },
      {
        id: "img-602",
        albumId: "alb-6",
        imageUrl:
          "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=85&w=1600",
        altText: "First dance under the grand central chandelier",
        caption: "First dance to classical strings",
        width: 1600,
        height: 1067,
        sortOrder: 2,
      },
    ],
  },
  {
    id: "alb-7",
    title: "A Graceful Beginning",
    slug: "a-graceful-beginning",
    category: "maternity",
    clientNames: "Dr. Shalini & Vikram",
    location: "Studio Minimalist & Private Residence, Bengaluru",
    eventDate: "2025-06-15",
    year: "2025",
    coverImage:
      "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&q=85&w=1400",
    description:
      "Natural-light studio maternity portraiture celebrating the profound transition of motherhood. Organic linen textures, quiet silhouettes, and timeless human warmth.",
    isPublished: true,
    isFeatured: false,
    sortOrder: 7,
    createdAt: "2025-06-20T09:00:00Z",
    updatedAt: "2025-06-20T09:00:00Z",
    images: [
      {
        id: "img-701",
        albumId: "alb-7",
        imageUrl:
          "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&q=85&w=1600",
        altText: "Subtle daylight silhouette portrait celebrating motherhood",
        caption: "Soft daylight and gentle grace",
        width: 1600,
        height: 1067,
        sortOrder: 1,
      },
      {
        id: "img-702",
        albumId: "alb-7",
        imageUrl:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=85&w=1600",
        altText: "Intimate portrait of Shalini with warm natural glow",
        caption: "Anticipation and quiet joy",
        width: 1600,
        height: 2000,
        sortOrder: 2,
      },
    ],
  },
  {
    id: "alb-8",
    title: "Gala of Legacy: 50th Jubilee",
    slug: "gala-of-legacy-50th-jubilee",
    category: "birthdays",
    clientNames: "The Singhania Family",
    location: "Taj Falaknuma Palace, Hyderabad",
    eventDate: "2025-05-20",
    year: "2025",
    coverImage:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=85&w=1400",
    description:
      "A grand 50th golden milestone birthday celebration gathering four generations under the Nizam's historic palace chandeliers. Multi-camera event cinematography and classic family heirloom portraits.",
    isPublished: true,
    isFeatured: false,
    sortOrder: 8,
    createdAt: "2025-05-28T10:00:00Z",
    updatedAt: "2025-05-28T10:00:00Z",
    images: [
      {
        id: "img-801",
        albumId: "alb-8",
        imageUrl:
          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=85&w=1600",
        altText: "Golden jubilee champagne toast with family members celebrating together",
        caption: "A toast to five decades of legacy",
        width: 1600,
        height: 1067,
        sortOrder: 1,
      },
    ],
  },
  {
    id: "alb-9",
    title: "Global Leadership Summit & Gala",
    slug: "global-leadership-summit-gala",
    category: "corporate",
    clientNames: "Apex Ventures India",
    location: "Jio World Convention Centre, BKC Mumbai",
    eventDate: "2025-04-10",
    year: "2025",
    coverImage:
      "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&q=85&w=1400",
    description:
      "Comprehensive multi-day conference and high-end evening gala coverage. High-profile keynote presentations, fireside chats, and black-tie networking awards.",
    isPublished: true,
    isFeatured: false,
    sortOrder: 9,
    createdAt: "2025-04-16T12:00:00Z",
    updatedAt: "2025-04-16T12:00:00Z",
    images: [
      {
        id: "img-901",
        albumId: "alb-9",
        imageUrl:
          "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&q=85&w=1600",
        altText: "Keynote stage lighting and executive audience during evening summit",
        caption: "Keynote presentation at Jio World Centre",
        width: 1600,
        height: 1067,
        sortOrder: 1,
      },
    ],
  },
  {
    id: "alb-10",
    title: "The Soul of Rajasthan: Dunes & Fortresses",
    slug: "soul-of-rajasthan-dunes",
    category: "destination",
    clientNames: "Pooja & Sameer",
    location: "Suryagarh & Sam Sand Dunes, Jaisalmer",
    eventDate: "2025-03-01",
    year: "2025",
    coverImage:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=85&w=1400",
    description:
      "Golden stone fortress walls, desert folk music under desert starlight, and an intimate royal nuptial gathering. Capturing authentic Thar desert heritage with bespoke cinematic lenses.",
    isPublished: true,
    isFeatured: true,
    sortOrder: 10,
    createdAt: "2025-03-08T09:00:00Z",
    updatedAt: "2025-03-08T09:00:00Z",
    images: [
      {
        id: "img-1001",
        albumId: "alb-10",
        imageUrl:
          "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=85&w=1600",
        altText: "Golden hour over the courtyard at Suryagarh Jaisalmer",
        caption: "Golden hour in the golden city",
        width: 1600,
        height: 1067,
        sortOrder: 1,
      },
    ],
  },
  {
    id: "alb-11",
    title: "Fine Art Bridal Legacy Portraits",
    slug: "fine-art-bridal-legacy",
    category: "portraits",
    clientNames: "Avani Patel",
    location: "Umaid Bhawan Palace, Jodhpur",
    eventDate: "2025-02-12",
    year: "2025",
    coverImage:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=85&w=1400",
    description:
      "A dedicated fine-art bridal portrait series exploring museum-grade lighting, royal architecture, and intricate handcrafted zardozi embroidery.",
    isPublished: true,
    isFeatured: false,
    sortOrder: 11,
    createdAt: "2025-02-18T10:00:00Z",
    updatedAt: "2025-02-18T10:00:00Z",
    images: [
      {
        id: "img-1101",
        albumId: "alb-11",
        imageUrl:
          "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=85&w=1600",
        altText: "Classical bridal portrait in natural archway light",
        caption: "Avani at the Jodhpur palace colonnade",
        width: 1600,
        height: 2000,
        sortOrder: 1,
      },
    ],
  },
  {
    id: "alb-12",
    title: "Eternal Radiance in the Hills",
    slug: "eternal-radiance-in-hills",
    category: "weddings",
    clientNames: "Kritika & Arjun",
    location: "Wildflower Hall, Shimla",
    eventDate: "2025-01-20",
    year: "2025",
    coverImage:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=85&w=1400",
    description:
      "A winter fairytale wedding amidst snow-capped cedar forests of the Himalayas. Pine cones, fireside sangeet acoustic melodies, and intimate vows overlooking Himalayan horizons.",
    isPublished: true,
    isFeatured: false,
    sortOrder: 12,
    createdAt: "2025-01-28T14:00:00Z",
    updatedAt: "2025-01-28T14:00:00Z",
    images: [
      {
        id: "img-1201",
        albumId: "alb-12",
        imageUrl:
          "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=85&w=1600",
        altText: "Couple standing before snow-clad Himalayan peaks",
        caption: "Vows in the cedar pine sanctuary",
        width: 1600,
        height: 1067,
        sortOrder: 1,
      },
    ],
  },
];

export const initialFilms: Film[] = [
  {
    id: "film-1",
    title: "The Lake Pichola Symphony | Royal Wedding Feature",
    slug: "lake-pichola-symphony-film",
    category: "wedding",
    coupleNames: "Devika & Shaurya",
    location: "The Leela Palace, Udaipur",
    duration: "5:24",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=85&w=1200",
    videoEmbedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1",
    description:
      "Devika & Shaurya's official wedding cinema trailer. Filmed with prime cinema anamorphic lenses and woven with genuine handwritten vows recorded live on the palace island.",
    featured: true,
    eventDate: "2025-12-14",
  },
  {
    id: "film-2",
    title: "Waves, Whispers & Sunset Vows | Goa Beach Wedding",
    slug: "waves-whispers-goa-film",
    category: "wedding",
    coupleNames: "Ananya & Kabir",
    location: "Alila Diwa & Gonsua Beach, South Goa",
    duration: "4:12",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=85&w=1200",
    videoEmbedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1",
    description:
      "A cinematic celebration of love by the Arabian sea. Featuring heartfelt speeches by their childhood best friends and an electric midnight pool afterparty.",
    featured: true,
    eventDate: "2025-11-18",
  },
  {
    id: "film-3",
    title: "Stepwells & Silk Duels | Jaipur Concept Film",
    slug: "stepwells-silk-jaipur-film",
    category: "pre-wedding",
    coupleNames: "Rhea & Aditya",
    location: "Amer & Panna Meena Kund, Jaipur",
    duration: "3:05",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=85&w=1200",
    videoEmbedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1",
    description:
      "An editorial short film directed like a classic romance. Shot at dawn in the labyrinthine historic geometry of Rajasthan's royal stepwells.",
    featured: true,
    eventDate: "2025-10-08",
  },
  {
    id: "film-4",
    title: "Temple Bells & Kerala Backwaters | Official Teaser",
    slug: "temple-bells-kerala-teaser",
    category: "teaser",
    coupleNames: "Meenakshi & Karthik",
    location: "Kumarakom Lake Resort, Kerala",
    duration: "1:48",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=85&w=1200",
    videoEmbedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1",
    description:
      "A 90-second teaser showcasing the profound simplicity of sacred Vedic rituals, Kerala houseboats, and traditional percussion rhythms.",
    featured: false,
    eventDate: "2025-09-22",
  },
  {
    id: "film-5",
    title: "Midnight Chandeliers & The Jazz Waltz | Grand Reception",
    slug: "midnight-chandeliers-reception-film",
    category: "event",
    coupleNames: "Tara & Armaan",
    location: "ITC Grand Bharat, Delhi NCR",
    duration: "3:40",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=85&w=1200",
    videoEmbedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1",
    description:
      "High-energy celebration film featuring the couple's choreographed waltz, champagne towers, and live orchestral ensemble.",
    featured: false,
    eventDate: "2025-07-02",
  },
  {
    id: "film-6",
    title: "Fortress Sunset & Thar Desert Folk | Jaisalmer Highlights",
    slug: "fortress-sunset-jaisalmer-highlights",
    category: "wedding",
    coupleNames: "Pooja & Sameer",
    location: "Suryagarh, Jaisalmer",
    duration: "4:50",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=85&w=1200",
    videoEmbedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1",
    description:
      "Desert dunes, fiery crimson sunsets, Manganiyar folk singers, and unforgettable royal warmth under millions of desert stars.",
    featured: false,
    eventDate: "2025-03-01",
  },
];

export const initialInquiries: Inquiry[] = [
  {
    id: "inq-1",
    fullName: "Priyanka Mehra",
    email: "priyanka.m@example.com",
    phone: "+91 98112 44321",
    eventType: "Destination Wedding",
    eventDate: "2026-11-20",
    location: "Udaipur, Rajasthan",
    venue: "Jagmandir Island Palace",
    budgetRange: "₹8,00,000 - ₹12,00,000",
    servicesRequired: "both",
    message:
      "Hello team Amara, we adore your editorial films! We are planning a 3-day royal destination wedding with around 250 guests. We want full photo and cinema coverage including pre-wedding shoot.",
    preferredContactMethod: "whatsapp",
    status: "new",
    isArchived: false,
    followUpDate: "2026-10-20",
    createdAt: "2026-10-15T14:30:00Z",
    updatedAt: "2026-10-15T14:30:00Z",
    notes: [
      {
        id: "note-1",
        inquiryId: "inq-1",
        note: "High intent client. Sister's wedding was covered in Goa last year. Send luxury portfolio presentation deck.",
        author: "Lead Curator",
        createdAt: "2026-10-15T15:00:00Z",
      },
    ],
  },
  {
    id: "inq-2",
    fullName: "Arnav Deshmukh",
    email: "arnav.desh@example.com",
    phone: "+91 98205 11984",
    eventType: "Engagement & Roka",
    eventDate: "2026-12-05",
    location: "Mumbai",
    venue: "Bespoke Villa, Alibaug",
    budgetRange: "₹3,00,000 - ₹5,00,000",
    servicesRequired: "photography",
    message:
      "Intimate sunset gathering for 60 close family and friends. Looking for candid, emotional photojournalism without stiff posed shots.",
    preferredContactMethod: "phone",
    status: "contacted",
    isArchived: false,
    followUpDate: "2026-10-18",
    createdAt: "2026-10-12T11:15:00Z",
    updatedAt: "2026-10-14T09:00:00Z",
    notes: [
      {
        id: "note-2",
        inquiryId: "inq-2",
        note: "Spoke on phone for 15 mins. Shared date availability for Alibaug. Follow up on Monday regarding contract.",
        author: "Creative Director",
        createdAt: "2026-10-14T09:05:00Z",
      },
    ],
  },
  {
    id: "inq-3",
    fullName: "Tanvi & Raghav Singhal",
    email: "tanvi.singhal@example.com",
    phone: "+91 97170 88219",
    eventType: "Luxury Wedding",
    eventDate: "2027-02-14",
    location: "Delhi NCR",
    venue: "The Oberoi Sukhvilas / ITC Grand Bharat",
    budgetRange: "₹12,00,000+",
    servicesRequired: "both",
    message:
      "Seeking complete 4-day coverage for our wedding ceremonies including Sangeet, Haldi, Cocktail, and Wedding Day. We want 4K cinema feature film.",
    preferredContactMethod: "whatsapp",
    status: "qualified",
    isArchived: false,
    followUpDate: "2026-10-22",
    createdAt: "2026-10-08T18:45:00Z",
    updatedAt: "2026-10-10T16:20:00Z",
    notes: [
      {
        id: "note-3",
        inquiryId: "inq-3",
        note: "Dates confirmed open on our calendar. Proposal draft V2 sent with drone & heirloom albums included.",
        author: "Studio Manager",
        createdAt: "2026-10-10T16:22:00Z",
      },
    ],
  },
];
