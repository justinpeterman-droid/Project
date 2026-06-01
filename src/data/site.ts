/**
 * Hometown Serenity — central content & link source of truth.
 * Mirrors docs/links.json. Update here to update the whole site.
 *
 * BOOKING NOTE: Calendly is the chosen scheduling platform. Until a Calendly
 * link is provided, the working Google Calendar appointment link is used so
 * the site is fully functional at launch. Swap `booking.url` to the Calendly
 * URL when ready — every CTA reads from this single value.
 */

export const site = {
  name: "Hometown Serenity",
  practitioner: "Ashley Romero",
  credentials: "CMH, CAHA",
  tagline: "Allow self-discovery to flow through you and illuminate your soul's purpose",
  description:
    "Holistic hypnotherapy and behavioral coaching with Ashley Romero, CMH, CAHA. Identity reconstruction through hypnotherapy, NLP, sound healing, somatic movement, and holistic nutrition.",
  domain: "https://hometownserenity.com",
  url: "https://hometownserenity.com",
  legacyCanva: "https://hometownserenity.my.canva.site/ashmarie423",
  location: "Arkansas, United States",
} as const;

/** Optimized images exported from the original Canva site (see scripts/optimize-images.mjs). */
export const images = {
  hero: {
    base: "/images/hero",
    alt: "Sunset over rolling hills with silhouetted trees at dusk",
  },
  mirrorWaterfall: {
    base: "/images/mirror-waterfall",
    alt: "Waterfall surrounded by lush green forest",
  },
  aboutAshley: {
    base: "/images/about-ashley",
    alt: "Ashley Romero, Certified Master Hypnotherapist",
  },
} as const;

export const contact = {
  phone: "870-750-1275",
  phoneHref: "tel:+18707501275",
  email: "ashleyromero@hometownserenity.com",
  emailHref: "mailto:ashleyromero@hometownserenity.com",
} as const;

/**
 * Single booking source. Calendly-ready: replace `url` with the Calendly link.
 * Both the discovery call and 1:1 session currently share the same scheduler.
 */
/** Replace `url` with your Calendly link when ready; all CTAs read from here. */
export const booking = {
  url: "https://calendar.app.google/cRjyQ2t3FXPMPLSC7",
  platform: "Google Calendar (switch to Calendly when URL is set)",
  discovery: {
    label: "Book a discovery call",
    short: "Discovery call",
    blurb:
      "A relaxed, no-pressure conversation to explore where you are and how this work could support you.",
  },
  session: {
    label: "Book a 1:1 session",
    short: "1:1 session",
    blurb:
      "A dedicated one-on-one session tailored to your path — hypnotherapy, somatic work, or integrative coaching.",
  },
} as const;

export const nav = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Resources", href: "#resources" },
  { label: "Connect", href: "#connect" },
] as const;

export const philosophy = [
  {
    title: "You are more than the titles you hold",
    body: "Beyond the roles of parent, spouse, or professional lies a vibrant identity waiting to be rediscovered. You aren't broken — you are simply layered.",
  },
  {
    title: "It's not about being fixed. It's about being found.",
    body: "Traditional therapy often starts with what's wrong. Here, we start with what's right. Like a veil of clouds catching the light, your true identity is already there, shimmering beneath the surface.",
  },
  {
    title: "An integrative path to your center",
    body: "We blend modern behavioral science with ancient somatic wisdom to help you navigate your way home to yourself.",
  },
] as const;

export const services = [
  {
    name: "Clinical & Ericksonian Hypnotherapy",
    summary:
      "Gently shifting your focus inward to access the wisdom of your subconscious mind.",
    detail:
      "Using clinical and Ericksonian techniques to work with — not against — your inner world, opening space for lasting, self-directed change.",
    featured: true,
    image: { base: "/images/service-hypnotherapy", alt: "Calm beach at sunset with smooth stones in the water" },
  },
  {
    name: "Neurolinguistic Programming (NLP)",
    summary:
      "Identifying and updating the \"internal software\" of your thoughts to better align with your true identity.",
    detail:
      "Reframe the patterns and language running quietly in the background so your daily life reflects who you actually are.",
    featured: false,
    image: { base: "/images/service-nlp", alt: "Gentle ripples on still water" },
  },
  {
    name: "Sound Frequency Healing",
    summary:
      "Utilizing Solfeggio frequencies, mother nature, and sound therapy to create a harmonious environment for deep restoration.",
    detail:
      "Vibration and tone guide the nervous system toward stillness, making room for restoration that words alone can't reach.",
    featured: false,
    image: {
      base: "/images/service-sound",
      alt: "Lotus flower resting on lily pads",
      png: true,
    },
  },
  {
    name: "Somatic Movement & Breathwork",
    summary:
      "Using yoga, mindfulness, and nervous system regulation to move out of \"survival mode\" and back into your body.",
    detail:
      "Breath and movement help discharge held tension and return you to a felt sense of safety and presence.",
    featured: false,
    image: {
      base: "/images/service-somatic",
      alt: "Sunlit forest path with golden light filtering through the trees",
    },
  },
  {
    name: "Holistic Nutrition & Wellness",
    summary:
      "Supporting your soul's purpose by nourishing the physical vessel that carries it.",
    detail:
      "Practical, compassionate nourishment that honors the body as the foundation for everything else you're building.",
    featured: false,
    image: {
      base: "/images/service-nutrition",
      alt: "A lone tree on a rolling green hill beneath a clear blue sky",
    },
  },
] as const;

export const about = {
  image: images.aboutAshley,
  heading: "A fellow traveler on the path to self-discovery",
  quote:
    "I know what it feels like to navigate the world through the lens of your titles — to be the dedicated parent, the supportive spouse, and the reliable professional, while wondering if there is still space for the 'you' beneath it all.",
  body: [
    "I'm Ashley Romero, a practitioner of clinical hypnotherapy and behavioral coaching. My work at Hometown Serenity is rooted in the belief that everyone possesses a vibrant, iridescent soul purpose that simply needs the right environment to illuminate.",
    "I am not here to fix you; I am here to help you peel back the layers and reconstruct an identity that feels authentically yours.",
  ],
  closing: "Allow the veil to lift. The light was always there.",
  credentials: [
    "Certified Master Hypnotherapist (CMH)",
    "Certified Advanced Hypno-Anesthesia (CAHA)",
    "AOS Mind Body Psychology — graduating June 2027",
    "ISSA Yoga 200",
  ],
} as const;

export const mirror = {
  heading: "Who are you when no one is in the room?",
  body: [
    "When the house is quiet and the roles of \"parent\" or \"other half\" are momentarily set aside, who is the person looking back in the mirror?",
    "Many of us have spent so long serving the needs of others that our own soul's purpose has become a quiet hum in the background. My work is dedicated to helping you turn up the volume on that voice.",
  ],
} as const;

export const resources = [
  {
    title: "Dream Journal",
    description:
      "A guided journal to capture and explore the messages surfacing in your sleep.",
    cta: "Open the journal",
    url: "https://drive.google.com/file/d/1ioXAcCwEHSMNmDIrIL15oXs-9syZVdUf/view?usp=drivesdk",
    kind: "download",
  },
  {
    title: "Serenity Sanctuary App",
    description:
      "Your companion space for practices, prompts, and ongoing support between sessions.",
    cta: "Enter the sanctuary",
    url: "https://www.jotform.com/app/261251095682155",
    kind: "app",
  },
  {
    title: "Handwriting Sample Submission",
    description:
      "Share a handwriting sample for graphological insight as part of your journey.",
    cta: "Submit a sample",
    url: "https://form.jotform.com/261354618025050",
    kind: "form",
  },
] as const;

export const social = [
  {
    label: "Instagram",
    handle: "@Hometownserenity",
    url: "https://www.instagram.com/hometownserenity?utm_source=qr",
    group: "primary",
  },
  {
    label: "Facebook",
    handle: "Ashley Romero CMH",
    url: "https://www.facebook.com/profile.php?id=61583873646491",
    group: "primary",
  },
  {
    label: "YouTube",
    handle: "Inked Integration",
    url: "https://youtube.com/@inkedintegration?si=meYxxvDtqhihBYh3",
    group: "media",
  },
  {
    label: "Substack",
    handle: "Inked Integration",
    url: "https://inkedintegration.substack.com/?utm_id=97757_v0_s00_e233_tv2_tp1_a1dennhaw19nio",
    group: "media",
  },
  {
    label: "Indeed",
    handle: "Professional profile",
    url: "https://profile.indeed.com/p/ashleyr-y56g66d",
    group: "professional",
  },
] as const;

export const faqs = [
  {
    q: "What happens on a discovery call?",
    a: "It's a relaxed, no-pressure conversation. We talk about where you are, what's calling for your attention, and whether this work feels like the right fit — no commitment required.",
  },
  {
    q: "Is this therapy?",
    a: "Hometown Serenity offers complementary wellness, hypnotherapy, and behavioral coaching. It is not psychotherapy or medical treatment, and it works best alongside — not in place of — licensed care when that's needed.",
  },
  {
    q: "Do I need to choose a single modality?",
    a: "No. Most journeys blend several approaches — hypnotherapy, NLP, sound, somatic movement, and nutrition — woven together around what you actually need.",
  },
  {
    q: "How do sessions take place?",
    a: "Reach out by phone or email and we'll find a rhythm and format that works for you. Booking a discovery call is the easiest first step.",
  },
] as const;

export const legal = {
  disclaimer:
    "Hometown Serenity offers complementary wellness, coaching, and hypnotherapy-related services. These services are not a substitute for medical care, psychiatric treatment, or emergency mental health services. Individual experiences and outcomes vary. If you are in crisis, please contact a licensed healthcare provider or emergency services.",
  copyright: `© ${new Date().getFullYear()} Hometown Serenity · Ashley Romero, CMH, CAHA`,
} as const;
