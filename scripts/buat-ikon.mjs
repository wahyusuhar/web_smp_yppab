#!/usr/bin/env node
/**
 * Bangkitkan favicon, ikon manifest, dan gambar OG statis di public/ (docs/SEO.md §3).
 * Jalankan ulang bila warna/teks berubah: `node scripts/buat-ikon.mjs`.
 *
 * Isinya hanya teks "SMPS YPPAB" / "SY" — BUKAN logo. Ganti dengan logo resmi bila sudah ada (DESIGN.md §7).
 * sharp tersedia sebagai dependensi Astro (dipakai astro:assets).
 */
import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const BIRU_950 = "#071A33";
const BIRU_800 = "#0B3470";
const BIRU_600 = "#1552B8";
const BIRU_400 = "#4A8BEA";
const PUTIH = "#FFFFFF";
const FONT = "Plus Jakarta Sans, Segoe UI, Arial, sans-serif";

await mkdir("public/og", { recursive: true });

// Monogram teks untuk ikon kecil
const ikonSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${BIRU_600}"/>
  <text x="32" y="43" text-anchor="middle" font-family="${FONT}" font-size="30" font-weight="800" fill="${PUTIH}">SY</text>
</svg>
`;
await writeFile("public/favicon.svg", ikonSvg);

const png = (ukuran) => sharp(Buffer.from(ikonSvg), { density: 72 * (ukuran / 64) * 2 }).resize(ukuran, ukuran).png().toBuffer();
await writeFile("public/apple-touch-icon.png", await png(180));
await writeFile("public/icon-192.png", await png(192));
await writeFile("public/icon-512.png", await png(512));

// favicon.ico: kontainer ICO berisi satu PNG 32×32
const png32 = await png(32);
const header = Buffer.alloc(6 + 16);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // tipe: ikon
header.writeUInt16LE(1, 4); // jumlah gambar
header.writeUInt8(32, 6); // lebar
header.writeUInt8(32, 7); // tinggi
header.writeUInt8(0, 8); // palet
header.writeUInt8(0, 9); // reserved
header.writeUInt16LE(1, 10); // color planes
header.writeUInt16LE(32, 12); // bit per piksel
header.writeUInt32LE(png32.length, 14); // ukuran data
header.writeUInt32LE(22, 18); // offset data
await writeFile("public/favicon.ico", Buffer.concat([header, png32]));

await writeFile(
  "public/site.webmanifest",
  JSON.stringify(
    {
      name: "SMPS YPPAB",
      short_name: "SMPS YPPAB",
      lang: "id",
      start_url: "/",
      display: "browser",
      background_color: PUTIH,
      theme_color: BIRU_600,
      icons: [
        { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
    },
    null,
    2,
  ) + "\n",
);

// Gambar OG 1200×630: gradien biru→biru (DESIGN §1), garis "dasi" diagonal (DESIGN §5), teks putih
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${BIRU_800}"/>
      <stop offset="1" stop-color="${BIRU_600}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <g stroke="${BIRU_400}" stroke-width="3" opacity="0.6">
    <line x1="880" y1="0" x2="1200" y2="320"/>
    <line x1="940" y1="0" x2="1200" y2="260"/>
    <line x1="1000" y1="0" x2="1200" y2="200"/>
  </g>
  <rect x="0" y="600" width="1200" height="30" fill="${BIRU_950}"/>
  <text x="80" y="300" font-family="${FONT}" font-size="120" font-weight="800" fill="${PUTIH}" letter-spacing="-2">SMPS YPPAB</text>
  <text x="84" y="380" font-family="${FONT}" font-size="40" font-weight="600" fill="#DDEAFB">Sekolah Menengah Pertama Swasta · Jambi</text>
</svg>
`;
await sharp(Buffer.from(ogSvg)).png({ compressionLevel: 9 }).toFile("public/og/og-default.png");

console.log("Ikon & gambar OG dibuat di public/");
