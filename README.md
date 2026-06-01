# Hometown Serenity

High-end marketing site for [Hometown Serenity](https://hometownserenity.com) — Ashley Romero, CMH, CAHA. Built with **Astro 5** + **Tailwind CSS v4**, deployed on **Netlify**.

> **DNS:** `hometownserenity.com` is **not** pointed at Netlify yet. Deploy and review on the Netlify preview URL first.

## Quick start

```bash
npm install
npm run dev      # http://localhost:4321
npm run build
npm run preview
```

## Documentation

| Document | Description |
|----------|-------------|
| [Landing page spec](./docs/landing-page.md) v1.1.0 | Product requirements, copy, widgets, Netlify checklist |
| [Implementation guide](./docs/IMPLEMENTATION.md) | Section → component map, Calendly swap, acceptance criteria |
| [Links inventory](./docs/links.json) | Machine-readable URLs for QA |

## Quick links

| Resource | URL |
|----------|-----|
| Production domain (target) | https://hometownserenity.com |
| Current Canva site | https://hometownserenity.my.canva.site/ashmarie423 |
| Phone | [870-750-1275](tel:+18707501275) |
| Email | [ashleyromero@hometownserenity.com](mailto:ashleyromero@hometownserenity.com) |
| Discovery call / 1:1 (interim) | https://calendar.app.google/cRjyQ2t3FXPMPLSC7 |
| Instagram | https://www.instagram.com/hometownserenity |
| Facebook | https://www.facebook.com/profile.php?id=61583873646491 |
| Dream Journal | https://drive.google.com/file/d/1ioXAcCwEHSMNmDIrIL15oXs-9syZVdUf/view?usp=drivesdk |
| Serenity Sanctuary app | https://www.jotform.com/app/261251095682155 |
| Handwriting sample form | https://form.jotform.com/261354618025050 |

Booking will move to **Calendly** when the link is provided — update `src/data/site.ts` only.

## Site sections

Hero → Philosophy → Services (bento) → Mirror → About → Resources → Booking → FAQ → Connect

See [IMPLEMENTATION.md](./docs/IMPLEMENTATION.md) for the full component map.
