// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// Production site URL. DNS is NOT cut over yet — see docs/landing-page.md.
export default defineConfig({
  site: "https://hometownserenity.com",
  integrations: [sitemap()],
  // Prefetch in-viewport links on hover/tap for instant navigation
  // (ClientRouter is already enabled for View Transitions).
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  vite: {
    // Cast: @tailwindcss/vite and Astro bundle different Vite type versions,
    // producing a harmless Plugin type mismatch. Runtime is unaffected.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
