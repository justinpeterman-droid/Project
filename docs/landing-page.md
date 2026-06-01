# Hometown Serenity — Landing Page

| | |
|---|---|
| **Version** | 1.1.0 |
| **Last updated** | 2026-06-01 |
| **Status** | Implemented in Astro — DNS not cut over |
| **Implementation** | [IMPLEMENTATION.md](./IMPLEMENTATION.md) |

Product and build specification for the **HometownSerenity.com** marketing site. This document captures brand positioning, contact details, external integrations, page structure, and Netlify deployment requirements.

---

## Project summary

| Field | Value |
|-------|-------|
| **Brand** | Hometown Serenity |
| **Practitioner** | Ashley Romero, CMH, CAHA |
| **Primary domain** | [https://hometownserenity.com](https://hometownserenity.com) |
| **Hosting** | [Netlify](https://www.netlify.com/) |
| **Current site (reference)** | [Canva site](https://hometownserenity.my.canva.site/ashmarie423) |
| **Goal** | Single high-converting landing experience that replaces the Canva export with an owned, fast, SEO-friendly site |

---

## Contact information

| Channel | Value |
|---------|-------|
| **Phone** | [870-750-1275](tel:+18707501275) |
| **Email** | [ashleyromero@hometownserenity.com](mailto:ashleyromero@hometownserenity.com) |

Use `tel:` and `mailto:` links in the header, footer, and mobile sticky CTA bar.

---

## Booking and sessions

**Preferred scheduler:** [Calendly](https://calendly.com) — replace the placeholder URL in `src/data/site.ts` when the Calendly link is ready.

Until Calendly is configured, both CTAs use the working Google Calendar appointment page:

| Action | Label (UI) | URL (interim) |
|--------|------------|---------------|
| Discovery call | Book a discovery call | [Google Calendar](https://calendar.app.google/cRjyQ2t3FXPMPLSC7) |
| 1:1 session | Book a 1:1 session | [Google Calendar](https://calendar.app.google/cRjyQ2t3FXPMPLSC7) |

**Implementation notes**

- Primary hero CTA: **Book a discovery call** → opens scheduler in a new tab.
- Secondary CTA: **Book a 1:1 session** → same URL until separate Calendly event types exist.
- FAQ accordion covers discovery call, therapy vs coaching, modalities, and session format.
- **Do not redirect DNS** to Netlify until stakeholders approve the Netlify preview deploy.

---

## Social and professional profiles

| Platform | Handle / name | URL |
|----------|---------------|-----|
| **Facebook** | Ashley Romero CMH | [facebook.com/profile.php?id=61583873646491](https://www.facebook.com/profile.php?id=61583873646491) |
| **Instagram** | @Hometownserenity | [instagram.com/hometownserenity](https://www.instagram.com/hometownserenity?utm_source=qr) |
| **Indeed** | Ashley R. | [profile.indeed.com/p/ashleyr-y56g66d](https://profile.indeed.com/p/ashleyr-y56g66d) |
| **YouTube** | Inked Integration | [youtube.com/@inkedintegration](https://youtube.com/@inkedintegration?si=meYxxvDtqhihBYh3) |
| **Substack** | Inked Integration | [inkedintegration.substack.com](https://inkedintegration.substack.com/?utm_id=97757_v0_s00_e233_tv2_tp1_a1dennhaw19nio) |

**Footer layout suggestion:** Instagram and Facebook as primary brand icons; YouTube and Substack grouped under “Writing & media” or “Inked Integration.”

---

## Forms, apps, and resources

| Resource | Purpose | URL |
|----------|---------|-----|
| **Handwriting sample submission** | Client intake / assessment | [Jotform](https://form.jotform.com/261354618025050) |
| **Serenity Sanctuary app** | Branded client app (Jotform Apps) | [Jotform App](https://www.jotform.com/app/261251095682155) |
| **Dream journal** | Downloadable resource (Google Drive) | [PDF on Drive](https://drive.google.com/file/d/1ioXAcCwEHSMNmDIrIL15oXs-9syZVdUf/view?usp=drivesdk) |

**Landing page placement**

- **Resources** section on home or a dedicated `/resources` block:
  - Dream Journal → “Download” button (opens Drive in new tab).
  - Handwriting sample → “Submit a sample” for existing or pre-session clients.
  - Serenity Sanctuary app → “Client portal” or “Serenity Sanctuary” for returning clients.
- Do not bury Jotform links only in footer; surface the app and dream journal where they support conversion or retention.

---

## Brand messaging (from current site)

Use this copy hierarchy on the landing page.

### Hero

- **Headline:** Allow self-discovery to flow through you and illuminate your soul’s purpose
- **Supporting line:** Beyond the roles of parent, spouse, or professional lies a vibrant identity waiting to be rediscovered.
- **Primary CTA:** Book a discovery call
- **Secondary CTA:** Explore services (anchor scroll)

### Philosophy (three beats)

1. **You are more than the titles you hold** — You aren’t broken; you’re layered. Your true identity is already there.
2. **It’s not about being fixed. It’s about being found.** — Contrast with “what’s wrong” framing; start from what’s right.
3. **An integrative path to your center** — Bridge into the services grid.

### Services (bento grid)

| Modality | Summary |
|----------|---------|
| **Clinical & Ericksonian hypnotherapy** | Shift focus inward; access subconscious wisdom. |
| **Neurolinguistic programming (NLP)** | Update the “internal software” of thought to align with true identity. |
| **Sound frequency healing** | Solfeggio frequencies, nature, and sound therapy for restoration. |
| **Somatic movement & breathwork** | Yoga, mindfulness, nervous system regulation; move out of survival mode. |
| **Holistic nutrition & wellness** | Nourish the physical vessel that carries your purpose. |

### Mirror moment

- **Headline:** Who are you when no one is in the room?
- **Close:** Turn up the volume on that voice — book a discovery call.

### About Ashley

- **Positioning:** Fellow traveler on the path to self-discovery; not here to fix you, but to help peel back layers.
- **Credentials:** CMH, CAHA; AOS Mind Body Psychology (graduating June 2027); ISSA Yoga 200.
- **Closing line:** Allow the veil to lift. The light was always there.

### Final CTA band

- **Headline:** Your rhythm is waiting
- **Body:** Identity reconstruction doesn’t have to be alone.
- **CTA:** Book a discovery call

---

## Landing page structure

Recommended single-page layout (anchor navigation) for v1:

```
┌─────────────────────────────────────────┐
│  Header: logo · Services · About · Book │
├─────────────────────────────────────────┤
│  Hero + discovery call CTA              │
├─────────────────────────────────────────┤
│  Philosophy (3 columns / stacked)       │
├─────────────────────────────────────────┤
│  Services bento (5 modalities)          │
├─────────────────────────────────────────┤
│  Mirror moment + optional email CTA     │
├─────────────────────────────────────────┤
│  About Ashley + credentials             │
├─────────────────────────────────────────┤
│  Resources (Dream Journal, Jotform, App)│
├─────────────────────────────────────────┤
│  Connect (social + Indeed optional)     │
├─────────────────────────────────────────┤
│  Final CTA + 1:1 session link           │
├─────────────────────────────────────────┤
│  Footer: contact · legal · social       │
└─────────────────────────────────────────┘
```

**Optional v2 pages:** `/resources`, `/legal/privacy`, `/legal/terms` — can remain on-page anchors for launch.

---

## Design direction

| Element | Direction |
|---------|-----------|
| **Mood** | Calm, warm, editorial — not clinical or high-pressure sales |
| **Palette** | Soft mist backgrounds, sage accents, terracotta CTAs, deep loam body text |
| **Typography** | Serif display (e.g. Fraunces) + clean sans body (e.g. DM Sans) |
| **Layout** | Bento grid for services; generous whitespace; mobile-first |
| **Motion** | Subtle scroll reveals; respect `prefers-reduced-motion` |

---

## Widgets and integrations

| Priority | Widget | Tool / link | Placement |
|----------|--------|-------------|-----------|
| P0 | Discovery call booking | [Google Calendar](https://calendar.app.google/cRjyQ2t3FXPMPLSC7) | Hero, sticky mobile bar, final CTA |
| P0 | 1:1 session booking | Same calendar URL (update when split) | Services area, footer |
| P0 | Click-to-call / email | Phone and email above | Header, footer, mobile bar |
| P1 | Handwriting form | [Jotform 261354618025050](https://form.jotform.com/261354618025050) | Resources / client section |
| P1 | Serenity Sanctuary app | [Jotform App](https://www.jotform.com/app/261251095682155) | Resources / returning clients |
| P1 | Dream journal download | [Google Drive PDF](https://drive.google.com/file/d/1ioXAcCwEHSMNmDIrIL15oXs-9syZVdUf/view?usp=drivesdk) | Resources / lead magnet |
| P2 | Instagram feed embed | @Hometownserenity | About or footer |
| P2 | FAQ accordion | Native HTML / Astro component | Above final CTA |
| P2 | YouTube / Substack | Inked Integration links | “Media” subsection |

Avoid aggressive exit popups or countdown timers; they conflict with the brand tone.

---

## Netlify deployment

### Repository setup

1. Connect this Git repository to Netlify (GitHub/GitLab).
2. **Build command:** `npm run build` (once the static site scaffold exists).
3. **Publish directory:** `dist` (Astro default) or `public` for a static HTML v1.
4. **Node version:** Set in `.nvmrc` or Netlify UI (recommend Node 20 LTS).

### Custom domain

| Step | Action |
|------|--------|
| 1 | In Netlify: **Domain management** → add `hometownserenity.com` and `www.hometownserenity.com` |
| 2 | At registrar: point apex to Netlify load balancer or use Netlify DNS |
| 3 | Enable HTTPS (Netlify automatic Let’s Encrypt) |
| 4 | Set primary domain (prefer `https://hometownserenity.com` with www redirect) |

### Redirects

Add to `public/_redirects` or `netlify.toml`:

```toml
# Example netlify.toml fragment
[[redirects]]
  from = "https://hometownserenity.my.canva.site/*"
  to = "https://hometownserenity.com/:splat"
  status = 301
  force = false
```

Note: Canva subdomain redirects may require Canva-side forwarding or a link update on social profiles; Netlify only controls `hometownserenity.com`.

### Environment variables (if needed later)

| Variable | Use |
|----------|-----|
| `PUBLIC_GA_ID` | Analytics (optional) |
| `CONTACT_FORM_ENDPOINT` | If moving off Jotform for a simple contact form |

No secrets required for v1 — all booking and forms use external URLs.

### Pre-launch checklist

- [ ] All links in this doc tested (calendar, Jotform, Drive, social)
- [ ] Phone and email clickable on mobile
- [ ] Open Graph image and meta title/description set
- [ ] Favicon and brand colors applied
- [ ] Privacy policy and wellness disclaimer in footer
- [ ] Lighthouse performance ≥ 90 on mobile
- [ ] DNS propagated; HTTPS valid on apex and www
- [ ] Update Instagram, Facebook, and email signature with new domain
- [ ] Retire or redirect Canva URL when ready

---

## Legal and compliance (footer copy)

Include visible disclaimer near booking and services:

> Hometown Serenity offers complementary wellness, coaching, and hypnotherapy-related services. These services are not a substitute for medical care, psychiatric treatment, or emergency mental health services. Individual experiences and outcomes vary. If you are in crisis, contact a licensed healthcare provider or emergency services.

Link to Privacy Policy and Terms (pages or PDFs as they become available).

---

## Technical stack (recommended)

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Astro + Tailwind CSS | Fast static HTML, strong SEO, easy Netlify deploy |
| Content | Markdown or inline in components | Simple updates without a CMS for v1 |
| Forms | External Jotform links | Already in use; no backend required |
| Booking | Google Calendar appointment links | Already in use |
| Analytics | Plausible or Netlify Analytics | Lightweight, privacy-friendly |

---

## Link inventory (quick reference)

All URLs in one place for implementation and QA.

```
Site (production target):  https://hometownserenity.com
Site (current Canva):      https://hometownserenity.my.canva.site/ashmarie423

Phone:                     tel:+18707501275
Email:                     mailto:ashleyromero@hometownserenity.com

Discovery call:            https://calendar.app.google/cRjyQ2t3FXPMPLSC7
1:1 session:               https://calendar.app.google/cRjyQ2t3FXPMPLSC7

Facebook:                  https://www.facebook.com/profile.php?id=61583873646491
Instagram:                 https://www.instagram.com/hometownserenity?utm_source=qr
Indeed:                    https://profile.indeed.com/p/ashleyr-y56g66d
YouTube:                   https://youtube.com/@inkedintegration?si=meYxxvDtqhihBYh3
Substack:                  https://inkedintegration.substack.com/?utm_id=97757_v0_s00_e233_tv2_tp1_a1dennhaw19nio

Handwriting form:          https://form.jotform.com/261354618025050
Serenity Sanctuary app:    https://www.jotform.com/app/261251095682155
Dream journal (PDF):       https://drive.google.com/file/d/1ioXAcCwEHSMNmDIrIL15oXs-9syZVdUf/view?usp=drivesdk
```

---

## Next implementation steps

1. Scaffold Astro (or static HTML) site in this repository.
2. Implement single-page layout using copy and link inventory above.
3. Add `netlify.toml` with build settings and security headers.
4. Connect repo to Netlify and attach `hometownserenity.com`.
5. QA all external links and mobile CTAs.
6. Launch and update social bios to point to `hometownserenity.com`.

---

*Last updated: June 2026 — maintained in `/docs/landing-page.md`.*
