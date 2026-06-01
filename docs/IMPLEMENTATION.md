# Implementation guide — Hometown Serenity site

**Spec version:** 1.1.0 · **Last updated:** 2026-06-01

This guide maps the [landing page spec](./landing-page.md) to the Astro codebase and explains how to run, extend, and deploy the site.

---

## Stack

| Piece | Choice |
|-------|--------|
| Framework | [Astro 5](https://docs.astro.build/) (static output) |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` |
| Content | `src/data/site.ts` (single source of truth; mirrors `docs/links.json`) |
| Hosting | Netlify (`netlify.toml` at repo root) |
| DNS | **Not cut over yet** — deploy to Netlify preview URL first |

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output → dist/
npm run preview  # serve production build locally
```

---

## Repository layout

```
src/
  data/site.ts          # All copy, links, services, FAQs
  layouts/Layout.astro  # HTML shell, SEO, OG, JSON-LD, fonts
  components/           # One component per landing section (see table below)
  pages/
    index.astro         # Full landing page
    privacy.astro       # Privacy stub (expand before launch)
public/                 # favicon, og-image.svg, robots.txt
docs/
  landing-page.md       # Product spec
  links.json            # Link inventory for QA / tooling
  IMPLEMENTATION.md     # This file
netlify.toml            # Build + headers (no DNS instructions)
```

---

## Section → component map

| Spec section / anchor | Component file | Notes |
|----------------------|----------------|-------|
| Header / nav | `Header.astro` | Sticky; mobile menu; discovery CTA |
| Hero | `Hero.astro` | Primary + secondary CTA |
| Philosophy `#philosophy` | `Philosophy.astro` | 3-card grid |
| Services bento `#services` | `Services.astro` | Featured hypnotherapy card spans 2 rows on lg |
| Mirror moment | `Mirror.astro` | Dark forest band |
| About `#about` | `About.astro` | Headshot placeholder (swap image later) |
| Resources `#resources` | `Resources.astro` | Jotform + Drive links |
| Booking `#book` | `Booking.astro` | Discovery + 1:1; compliance block |
| FAQ | `FAQ.astro` | Native `<details>` (no JS) |
| Connect `#connect` | `Connect.astro` | Social + Inked Integration |
| Footer | `Footer.astro` | Nav, contact, compact compliance |
| Mobile sticky CTA | `MobileCTA.astro` | Discovery call + Services |
| Compliance (reusable) | `Compliance.astro` | Wellness disclaimer |
| Buttons | `Button.astro` | primary / secondary / ghost / light |

Wire order is defined in `src/pages/index.astro`.

---

## Changing content or links

1. Edit **`src/data/site.ts`** for anything visible on the site.
2. Keep **`docs/links.json`** in sync for documentation and QA scripts.
3. Run `npm run build` to verify.

### Booking URL (Calendly)

Preferred platform: **Calendly**. Until a Calendly URL is provided, all booking buttons use the Google Calendar link in `booking.url`.

To switch:

```ts
// src/data/site.ts
export const booking = {
  url: "https://calendly.com/your-handle/discovery", // replace
  platform: "Calendly",
  // ...
};
```

Optional: set `PUBLIC_BOOKING_URL` in Netlify env and read it in `site.ts` if you want to change links without redeploying code.

---

## Adding a headshot

Replace the placeholder in `About.astro`:

1. Add image to `public/images/ashley-romero.jpg` (WebP recommended).
2. Replace the inner placeholder `div` with `<img src="/images/ashley-romero.jpg" alt="Ashley Romero, CMH, CAHA" class="h-full w-full object-cover" loading="lazy" />`.

---

## Testimonials (future)

When quotes are approved:

1. Add `testimonials: [{ quote, name, role? }]` to `site.ts`.
2. Create `Testimonials.astro` and insert between `About` and `Resources` in `index.astro`.

---

## Netlify deploy (without DNS cutover)

1. Connect this repo to Netlify.
2. Build command: `npm run build` · Publish: `dist`
3. Verify on `https://<site-name>.netlify.app`
4. **Do not** point `hometownserenity.com` DNS until stakeholders sign off.
5. When ready: add custom domain in Netlify → update DNS at registrar.

---

## Acceptance criteria (implementation PR)

Use this checklist before merging the site implementation and before DNS cutover.

### Content & links

- [ ] Phone `870-750-1275` and email `ashleyromero@hometownserenity.com` work (`tel:` / `mailto:`)
- [ ] Discovery call and 1:1 session open correct booking URL
- [ ] All resource links (Dream Journal, Serenity Sanctuary, Handwriting form) open in new tab
- [ ] Social links (Instagram, Facebook, YouTube, Substack, Indeed) correct
- [ ] Copy matches approved spec in `docs/landing-page.md`

### UX & design

- [ ] Single-page anchors scroll correctly with sticky header offset
- [ ] Mobile menu opens/closes; sticky bottom CTA visible on small screens
- [ ] Services bento readable on mobile and desktop
- [ ] Headshot placeholder present (or real image if provided)
- [ ] No testimonial section until content exists

### Compliance & legal

- [ ] Wellness disclaimer visible on booking section and footer
- [ ] `/privacy` loads; expand full policy before public launch

### Technical

- [ ] `npm run build` succeeds with zero errors
- [ ] Lighthouse mobile Performance ≥ 90 (target)
- [ ] Sitemap generated at `/sitemap-index.xml`
- [ ] OG image and favicon present
- [ ] **DNS for hometownserenity.com not changed** until explicit go-live

### Post-launch (when ready)

- [ ] Swap `booking.url` to Calendly
- [ ] Attach custom domain on Netlify
- [ ] Update Instagram/Facebook bios to new URL
- [ ] Retire or redirect Canva site

---

## Related docs

- [Landing page spec](./landing-page.md) — product requirements
- [links.json](./links.json) — URL inventory
