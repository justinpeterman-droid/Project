# AGENTS.md

## Cursor Cloud specific instructions

### Product overview

Single Astro 5 static marketing site for **Hometown Serenity** (Ashley Romero, CMH, CAHA). No backend, database, Docker, or monorepo. All booking/forms are external links configured in `src/data/site.ts`.

### Required service

| Service | Command | URL |
|---------|---------|-----|
| Astro dev server | `npm run dev` | http://localhost:4321 |

Only one local process is required for end-to-end UI work. Use a tmux session for long-running dev servers.

### Standard commands

See `README.md` for the canonical quick start:

- **Install:** `npm install`
- **Dev:** `npm run dev` (or `npm start`)
- **Build:** `npm run build` → outputs to `dist/`
- **Preview production build:** `npm run preview` (run after `npm run build`)
- **Regenerate OG image:** `npm run og`

### Node version

`.nvmrc` specifies **Node 20** (matches `netlify.toml`). The VM may have Node 22 installed; builds have been verified on Node 22, but prefer Node 20 when available for parity with Netlify.

### Lint / tests

This repo has **no ESLint, Prettier, or automated test runner** configured. Verification is:

1. `npm run build` (must succeed)
2. Manual or browser check of http://localhost:4321/ and `/privacy/`

### Optional scripts (not part of normal dev loop)

- `node scripts/optimize-images.mjs` — regenerate WebP/JPG from `public/images/canva-raw/`
- `npm run og` — regenerate `public/og-image.jpg`

### External dependencies (not started locally)

Google Fonts CDN, Google Calendar (booking), Jotform, Google Drive, and social links are live third-party URLs. E2E flows that click those links depend on external availability, not local services.

### Environment variables

`.env.example` documents optional `PUBLIC_BOOKING_URL` for a future Calendly swap. No env vars are required for local dev today.
