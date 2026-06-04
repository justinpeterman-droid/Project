# AGENTS.md

## Cursor Cloud specific instructions

### Product

Static **Astro 5** marketing site (Hometown Serenity). No backend, database, Redis, or Docker. Two routes: `/` and `/privacy`.

### Commands

See [README.md](./README.md) for the canonical quick start:

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` → http://localhost:4321 |
| Production build | `npm run build` |
| Preview build | `npm run preview` |
| OG image (optional) | `npm run og` |

There is **no** `lint` or `test` script in `package.json`; verification is `npm run build` plus manual/browser checks against the dev server.

### Node version

`.nvmrc` specifies **20**. Node 22 has been used successfully in Cloud Agent VMs; prefer 20 if you hit Astro/tooling issues.

### Environment variables

Optional: `PUBLIC_BOOKING_URL` (see `.env.example`) overrides the booking link in `src/data/site.ts` without code changes.

### Dev server

- Use **tmux** for long-running `npm run dev` (port **4321**).
- Google Fonts load from CDN; offline runs may fall back to system fonts only.
- Booking/resource CTAs point to external URLs (Google Calendar, Jotform, etc.); no local services to start for those.

### Deploy context

`netlify.toml` defines build (`npm run build`) and publish directory `dist/`. Production domain may not be on Netlify yet; local dev does not require Netlify CLI.
