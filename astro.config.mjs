// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// Production site URL. DNS is NOT cut over yet — see docs/landing-page.md.
export default defineConfig({
  site: "https://hometownserenity.com",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
