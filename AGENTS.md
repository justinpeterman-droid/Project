# AGENTS.md

## Cursor Cloud specific instructions

Single **Astro 5** static marketing site (`hometown-serenity`). No database, Docker, or backend services.

### Services

| Service | Command | URL |
|---------|---------|-----|
| Dev | `npm run dev` | http://localhost:4321 |
| Production-like | `npm run build` then `npm run preview` | http://localhost:4321 (default preview port) |

Bind dev to all interfaces when testing from a remote desktop: `npm run dev -- --host 0.0.0.0 --port 4321`.

### Standard commands

See [README.md](./README.md): `npm install` (or `npm ci`), `npm run dev`, `npm run build`, `npm run preview`.

Optional asset script: `npm run og` (generates OG image via `scripts/generate-og.mjs`).

### Lint / tests

This repo has **no** ESLint, Prettier, or automated test scripts in `package.json`. Verification is **`npm run build`** (and manual/browser checks on `npm run dev`).

### Node version

`.nvmrc` specifies **Node 20**. Cloud VMs may ship Node 22; builds have succeeded on 22. Prefer `nvm use` when nvm is available.

### Environment variables

Copy `.env.example` only if overriding `PUBLIC_BOOKING_URL` (future Calendly). Defaults work without a `.env` file.

### External dependencies (not local)

Booking (Google Calendar), Jotform, Google Drive links, and Google Fonts CDN are outbound only—no local mocks required for site smoke tests.

### Deployment

Static output in `dist/`; [netlify.toml](./netlify.toml) configures Netlify. Production domain may still point elsewhere; use Netlify preview for deploy checks.
