// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { loadEnv } from "vite";

const SITE_FALLBACK = "https://example.com";
const { PUBLIC_SITE_URL } = loadEnv(process.env.NODE_ENV ?? "production", process.cwd(), "");
const siteUrl = PUBLIC_SITE_URL?.trim() || SITE_FALLBACK;

if (siteUrl === SITE_FALLBACK) {
  console.warn(
    "\n\x1b[33m[PERINGATAN] PUBLIC_SITE_URL belum diisi. Canonical, Open Graph, dan sitemap memakai " +
      `${SITE_FALLBACK}. Isi PUBLIC_SITE_URL di .env sebelum rilis (lihat docs/SEO.md §3).\x1b[0m\n`,
  );
}

// Halaman noindex yang tidak boleh masuk sitemap (docs/SEO.md §3)
const TIDAK_DI_SITEMAP = [/^\/404\/?$/, /^\/kredit-foto\/?$/, /^\/dev(\/|$)/];

export default defineConfig({
  site: siteUrl,
  integrations: [
    sitemap({
      filter: (page) => !TIDAK_DI_SITEMAP.some((pola) => pola.test(new URL(page).pathname)),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
