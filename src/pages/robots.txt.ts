import type { APIRoute } from "astro";

// robots.txt dibangkitkan agar URL sitemap mengikuti PUBLIC_SITE_URL (SEO.md §3).
// /dev/, /404, /kredit-foto TIDAK di-Disallow: halaman itu memakai meta noindex, dan Google harus bisa merayapinya
// untuk membaca noindex tersebut.
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL("/sitemap-index.xml", site).href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
