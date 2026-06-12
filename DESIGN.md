# ============================================================
# DESIGN.md — Hometown Serenity Design System
# ============================================================
# This file documents what the site actually LOOKS and FEELS like.
# It mirrors the design tokens and patterns that ship in the code —
# the source of truth remains `src/styles/global.css`.
#
# Stack: Astro 5 + Tailwind CSS v4 (`@theme`), deployed on Netlify.
# Motion: vanilla-JS scroll reveals + native CSS View Transitions.
# NOT used: React, Three.js, GSAP, WebGL. Please don't add them.
# ============================================================

# ──────────────────────────────────────────────
# 1. THE VIBE
# ──────────────────────────────────────────────

## One-Line Description

> Calm, high-end, editorial holistic wellness — warm natural light, botanical
> tones, and unhurried space, like a serene boutique studio in print form.

## Brand

- **Site:** Hometown Serenity
- **Practitioner:** Ashley Romero, CMH, CAHA
- **Tagline:** “Allow self-discovery to flow through you and illuminate your soul's purpose”

## Mood Board References

- Aesop — apothecary warmth, restraint, generous negative space
- Apple.com — premium spacing and typographic confidence
- Editorial print / fine stationery — serif display over clean sans body

## Feeling Words

- Serene / Warm / Grounded / Premium / Botanical / Unhurried

# ──────────────────────────────────────────────
# 2. COLOR PALETTE
# ──────────────────────────────────────────────
# Defined as Tailwind v4 `@theme` variables in `src/styles/global.css`.
# Each becomes a utility automatically (e.g. `--color-clay` → `bg-clay`,
# `text-clay`, `border-clay`). All values are concrete — no placeholders.

```css
@theme {
  /* ── Surfaces ── */
  --color-canvas: #fbf8f3;   /* Page background — warm ivory */
  --color-linen:  #f2ebdf;   /* Alternate section background */
  --color-sand:   #e6dac8;   /* Soft borders / fills */
  --color-cream:  #fdfbf7;   /* Cards / elevated surfaces */

  /* ── Botanical greens ── */
  --color-sage:      #8c9a86; /* Soft accent green */
  --color-sage-deep: #5b6a56; /* Labels / small text accents */
  --color-forest:    #28342a; /* Dark sections, forest CTA */
  --color-forest-2:  #1f2a21; /* Forest hover / deepest green */

  /* ── Warm accents ── */
  --color-clay:      #bd7b53; /* Primary CTA terracotta */
  --color-clay-deep: #a3623c; /* CTA hover, eyebrow text, focus ring */
  --color-gold:      #c2a24c; /* Luxe hairlines / small accents */

  /* ── Ink (type) ── */
  --color-ink:   #20190f;     /* Headings */
  --color-loam:  #382c1f;     /* Body text */
  --color-muted: #6f6354;     /* Secondary text */
  --color-faint: #a99a86;     /* Tertiary / captions */
}
```

- **`theme-color` meta:** `#fbf8f3` (matches `--color-canvas`).
- **Color scheme:** light only (`color-scheme: light`).

# ──────────────────────────────────────────────
# 3. TYPOGRAPHY
# ──────────────────────────────────────────────

## Font Families

```css
@theme {
  /* Display — H1–H5, hero, pull quotes */
  --font-display: "Fraunces", ui-serif, Georgia, "Times New Roman", serif;
  /* Body — paragraphs, UI text, buttons, labels */
  --font-body: "DM Sans", ui-sans-serif, system-ui, -apple-system, sans-serif;
}
```

Two families only — a serif display and a sans body. No mono font is used.

## Font Loading

Loaded from Google Fonts in `src/layouts/Layout.astro` (with `preconnect`):

```html
<link
  href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=DM+Sans:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

- **Fraunces:** weights 400 / 500 / 600, plus italic 400; variable optical size (`opsz 9..144`), enabled via `font-optical-sizing: auto`.
- **DM Sans:** weights 400 / 500 / 600 / 700.

## Heading Treatment

```css
h1, h2, h3, h4, h5 {
  font-family: var(--font-display);
  color: var(--color-ink);
  font-weight: 400;          /* headings stay light, not bold */
  line-height: 1.08;
  letter-spacing: -0.015em;
  font-optical-sizing: auto;
}
body {
  font-family: var(--font-body);
  color: var(--color-loam);
  line-height: 1.65;
}
```

## Type Scale

The project uses **Tailwind v4's default type scale** (`text-sm` … `text-6xl`)
rather than a custom token set. The signature responsive ramp is the hero:

```html
<!-- Hero headline scales up across breakpoints -->
<h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] leading-[1.05]">…</h1>
```

Lead paragraphs use `text-lg sm:text-xl`; eyebrow labels are small caps (see §6).

# ──────────────────────────────────────────────
# 4. SPACING & LAYOUT
# ──────────────────────────────────────────────

- **Spacing scale:** Tailwind v4 default (4px grid) — `gap-4`, `mt-8`, `py-3`, etc.
- **Containers:** `max-w-6xl` (wide sections), `max-w-4xl` (hero copy / stats),
  `max-w-2xl` (lead paragraphs). Prose blocks cap at `65ch` via `.prose-width`.
- **Section rhythm:** generous vertical padding, e.g. hero `pt-28 pb-24`
  → `sm:pt-32 sm:pb-32`; min height `min-h-[92vh]`.
- **Gutters:** `px-5 sm:px-8`.
- **Radii:** `rounded-full` (buttons, pills), `rounded-xl` / `rounded-2xl`
  (cards), `rounded-[2rem]` (hero scrim panel).
- **Sticky-header offset:** `scroll-padding-top: 6rem` so in-page anchors clear
  the fixed header.

# ──────────────────────────────────────────────
# 5. ANIMATION
# ──────────────────────────────────────────────
# No GSAP / ScrollTrigger. Motion is CSS transitions + a tiny IntersectionObserver
# + native CSS View Transitions. Everything respects `prefers-reduced-motion`.

## Easing

```css
@theme {
  --ease-out-soft: cubic-bezier(0.22, 1, 0.36, 1); /* gentle, premium settle */
}
```

## Scroll Reveal

Elements tagged `.reveal` start hidden and animate in when scrolled into view.
A small inline IntersectionObserver in `Layout.astro` adds `.is-visible`
(`rootMargin: 0px 0px -10% 0px`, `threshold: 0.12`); it also re-runs on
`astro:page-load` for View Transitions. If IO is unavailable or reduced-motion
is set, everything is shown immediately.

```css
.reveal {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.9s var(--ease-out-soft),
              transform 0.9s var(--ease-out-soft);
}
.reveal.is-visible { opacity: 1; transform: none; }

/* Stagger children with delay utilities (1–5) */
.reveal-delay-1 { transition-delay: 0.08s; }
.reveal-delay-2 { transition-delay: 0.16s; }
.reveal-delay-3 { transition-delay: 0.24s; }
.reveal-delay-4 { transition-delay: 0.32s; }
.reveal-delay-5 { transition-delay: 0.40s; }
```

## Hero Stat Pop

Hero stat cards animate their value/label in once visible:

```css
@keyframes hero-stat-pop {
  from { opacity: 0; transform: translateY(10px) scale(0.94); }
  to   { opacity: 1; transform: none; }
}
```

## Page Transitions (native CSS View Transitions)

Enabled via Astro's `<ClientRouter>`. The page content cross-fades and slides
while header and footer persist (no animation on them):

```css
@view-transition { navigation: auto; }

@keyframes page-enter {
  from { opacity: 0; transform: translateY(1.25rem) scale(0.988); }
  to   { opacity: 1; transform: none; }
}
@keyframes page-exit {
  from { opacity: 1; transform: none; }
  to   { opacity: 0; transform: translateY(-0.65rem) scale(0.994); }
}
```

## Reduced Motion

`@media (prefers-reduced-motion: reduce)` disables scroll behavior, reveal/stat
animations, hover lifts, and view-transition animations, and clamps all
transition/animation durations to ~0. Honor this in any new motion.

# ──────────────────────────────────────────────
# 6. COMPONENT PATTERNS
# ──────────────────────────────────────────────

## Buttons (`src/components/Button.astro`)

Pill-shaped, semibold body font. Props: `variant` and `size`.

```
base:  inline-flex items-center justify-center gap-2 rounded-full
       font-body font-semibold tracking-wide transition

sizes: md → px-6 py-3 text-sm
       lg → px-8 py-4 text-sm sm:text-base

variants:
  primary   → bg-clay text-cream shadow-lift, hover lift + clay glow   (default CTA)
  secondary → border-sand bg-cream/80 text-ink backdrop-blur, hover clay border
  ghost     → text-clay-deep, hover bg-clay/10
  light     → bg-cream text-forest, hover bg-linen      (on dark/forest sections)
  forest    → bg-forest text-cream shadow-lift, hover lift + forest glow
```

Primary/forest hover glows: `0 4px 20px rgba(189,123,83,0.35)` and
`0 4px 20px rgba(40,52,42,0.25)` respectively.

## Eyebrow / Kicker

```css
.eyebrow {
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-clay-deep);
}
```

## Gold Hairline Divider

```css
.hairline {
  height: 1px;
  background: linear-gradient(to right, transparent,
    color-mix(in srgb, var(--color-gold) 60%, transparent), transparent);
}
```

## Warm Radial Glow (hero ambiance)

```css
.glow-warm {
  background-image:
    radial-gradient(60% 50% at 50% 0%,
      color-mix(in srgb, var(--color-gold) 18%, transparent), transparent 70%),
    radial-gradient(50% 60% at 85% 30%,
      color-mix(in srgb, var(--color-sage) 22%, transparent), transparent 70%);
}
```

## Frosted Hero Copy Panel

Keeps the background photo visible while keeping text readable:

```css
.hero-copy-scrim {
  background: color-mix(in srgb, var(--color-canvas) 52%, transparent);
  backdrop-filter: blur(6px);
  box-shadow: 0 1px 0 color-mix(in srgb, var(--color-cream) 70%, transparent);
}
```

## Hero Stat Card

```css
.hero-stat {
  border-radius: 1rem;
  border: 1px solid color-mix(in srgb, var(--color-sand) 85%, transparent);
  background: color-mix(in srgb, var(--color-cream) 92%, transparent);
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(10px);
  /* gold top accent bar + lift on hover via --ease-out-soft */
}
```

## Pull Quote

```css
.pull-quote {
  font-family: var(--font-display);
  font-style: italic;
  color: var(--color-loam);
  border-left: 2px solid color-mix(in srgb, var(--color-gold) 70%, transparent);
  padding-left: 1.25rem;
}
```

## Nav Link Underline

```css
.nav-link::after {
  /* full-width hairline that scales in from the left on hover */
  content: ""; position: absolute; left: 0; bottom: -0.2rem;
  width: 100%; height: 1px; background: currentColor;
  transform: scaleX(0); transform-origin: left; opacity: 0.45;
  transition: transform 0.35s var(--ease-out-soft);
}
.nav-link:hover::after { transform: scaleX(1); }
```

## Shadows

```css
@theme {
  --shadow-soft: 0 1px 2px rgba(32,25,15,0.04), 0 8px 24px rgba(32,25,15,0.06);
  --shadow-lift: 0 2px 4px rgba(32,25,15,0.05), 0 18px 48px rgba(32,25,15,0.10);
}
```

Soft, diffuse, warm-tinted (ink at low opacity). Never hard/black drop shadows.

# ──────────────────────────────────────────────
# 7. PAGE SECTIONS STRUCTURE
# ──────────────────────────────────────────────
# Actual home-page flow (`src/pages/index.astro`):

# 1. HERO         — Photo background, layered canvas scrims, frosted copy panel, stat cards
# 2. TRUST STRIP  — Credentials / quick reassurance band
# 3. PHILOSOPHY   — Core belief / approach
# 4. HOW IT WORKS — Step-by-step path
# 5. SERVICES     — Bento grid of modalities
# 6. MIRROR       — Reflective interlude
# 7. ABOUT        — Practitioner intro + credentials
# 8. RESOURCES    — Downloads / tools (warm accent cards)
# 9. TESTIMONIALS — Social proof
# 10. BOOKING     — Discovery call / 1:1 (Calendly-ready)
# 11. FAQ         — Common questions
# 12. CONNECT     — Contact + social links
# 13. FOOTER      — Logo, nav, compliance (persists across View Transitions)

# ──────────────────────────────────────────────
# 8. DO / DON'T RULES FOR THIS PROJECT
# ──────────────────────────────────────────────

## DO

- Use warm, light surfaces (canvas/linen/cream) with botanical + clay accents
- Keep generous whitespace and unhurried vertical rhythm between sections
- Use soft, diffuse, warm-tinted shadows (`--shadow-soft` / `--shadow-lift`)
- Use serif display (Fraunces) for headings, sans (DM Sans) for everything else
- Add motion through `.reveal` + `--ease-out-soft`; keep it gentle
- Always honor `prefers-reduced-motion`
- Style new tokens as Tailwind `@theme` variables in `global.css`

## DON'T

- Never go dark sci-fi / neon — this is a calm, light wellness brand
- Never add Three.js, WebGL, GSAP, or a JS framework for effects
- Never use hard black drop shadows or harsh contrast
- Never introduce a third font family or a mono font
- Never set headings to bold — display headings stay weight 400
- Never ship motion that ignores reduced-motion preferences
- Never use pure white (`#ffffff`) as a surface — use `--color-cream`/`--color-canvas`
