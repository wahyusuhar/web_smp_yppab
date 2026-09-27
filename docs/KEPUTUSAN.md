# KEPUTUSAN.md — Catatan Keputusan Proyek

Keputusan yang tidak (atau belum jelas) diatur dokumen lain. Yang sudah dipindahkan ke PRD/DESIGN/SEO/CONTENT/ASSETS
ditandai dengan rujukannya, supaya dokumen utama tetap jadi sumber kebenaran.

## Fase 0 — 2026-09-28

| # | Topik | Keputusan | Diterapkan di |
|---|---|---|---|
| 1 | A9 & A13 vs aturan transform/opacity | A9 memakai transform (scale/translateY) + bayangan dari pseudo-element yang di-fade. A13 memakai gelombang SVG berulang yang digeser `translateX` pelan, bukan path morph. Plugin MorphSVG tidak dipasang. | DESIGN §5, §6 |
| 2 | Animasi di PRD yang tidak ada di katalog | Ekskul → hover/focus reveal (A14; di perangkat tanpa hover semua isi langsung terlihat). Galeri masonry → A3. Progress bar baca → `scaleX` terikat scroll (A15). Drawer mobile → A16. Tombol WA & kembali ke atas → A17. 404 → A2. | DESIGN §6, PRD §5 |
| 3 | Kontak tanpa momen animasi | Kontak tetap tenang, cukup A2 untuk heading. Metrik PRD §2 berlaku untuk setiap halaman kecuali Kontak. | PRD §2, §5 |
| 4 | Counter A4 dengan statistik `null` | Beranda memakai A1 + A5 + A2. Kode A4 tetap dibuat dan otomatis aktif saat data diisi. Selama semua statistik `null`: dev → placeholder, produksi → section statistik disembunyikan seluruhnya. | PRD §5, §6 (F9), CONTENT §1 |
| 5 | Gradien di beranda | Gradien hanya di hero. CTA pendaftaran memakai latar solid `biru-800` + garis "dasi". | DESIGN §1 |
| 6 | `site` placeholder tidak valid | Fallback `https://example.com` bila `PUBLIC_SITE_URL` kosong. Build mencetak peringatan jelas di console. `npm run cek-konten --ketat` gagal bila `PUBLIC_SITE_URL` belum diisi. | SEO §3, CONTENT §5 |
| 7 | Placeholder di title, WA, Maps | Title beranda "SMPS YPPAB – SMP Swasta di Jambi" selama kota placeholder, otomatis "di {kota}, Jambi" saat diisi. Tombol WA (termasuk FAB) dan Maps: dev → kotak placeholder, produksi → disembunyikan; otomatis muncul saat data diisi. Maps memakai koordinat, atau alamat lengkap bila koordinat belum ada. | SEO §2, PRD §6 (F10), CONTENT §6 |
| 8 | `logo` di JSON-LD | Field `logo` dihilangkan sampai ada logo resmi. | SEO §4 |
| 9 | Title/h1 halaman yang belum diatur | Mengikuti pola yang sama. `/404` dan `/kredit-foto` diberi `noindex` dan dikeluarkan dari sitemap. | SEO §2, §3 |
| 10 | Sumber data kredit foto | `src/data/kredit.ts` sumber utama; `docs/ASSETS-CREDITS.md` ikut diperbarui setiap ada perubahan. | ASSETS §4, §6 |
| 11 | Label "Contoh" | Tampil di dev DAN produksi selama `dummy: true`, untuk berita dan konten dummy lain yang tampil sebagai kartu. | CONTENT §4 |
| 12 | Menu, pagination, ikon | Menu: Beranda, Profil, Guru & Staf, Ekstrakurikuler, Fasilitas, Galeri, Berita, Kontak + tombol "Daftar" (Button primary → `/pendaftaran`). Di desktop, bila terlalu penuh, Fasilitas & Galeri digabung dalam dropdown "Sekolah". Berita 6 per halaman. Ikon: paket Astro resmi Lucide bila ada di npm, jika tidak `lucide-static` (hasil pengecekan dicatat di bawah, Fase 1). | PRD §5 |
| 13 | Lokasi `PROMPT-AWAL.md` | Ada di root proyek (sejajar `CLAUDE.md`). | — |
| 14 | Repo git | `git init` dijalankan bila belum ada repo. | — |
| 15 | Atribusi commit | Mengikuti `CLAUDE.md`: tanpa `Co-Authored-By` dan tanpa atribusi apa pun. | — |

## Fase 1 — 2026-09-28

| # | Topik | Keputusan |
|---|---|---|
| 16 | Versi paket (dicek di npm 2026-09-28) | astro 7.3.5, @astrojs/sitemap 3.7.4, tailwindcss & @tailwindcss/vite 4.3.3, gsap 3.15.0, @fontsource-variable/plus-jakarta-sans 5.3.0, @lucide/astro 1.48.0, @astrojs/check 0.9.10. |
| 17 | TypeScript | Memakai TypeScript 6.x (6.0.3), bukan 7.x terbaru: peer dependency `@astrojs/check` hanya `^5 \|\| ^6`. |
| 18 | Paket ikon | `@lucide/astro` — paket Astro resmi (repo `lucide-icons/lucide`). `lucide-astro` adalah paket komunitas, tidak dipakai. |
| 19 | Setup proyek | Disusun manual (bukan `create-astro` yang interaktif). Tailwind v4 lewat `@tailwindcss/vite` di `astro.config.mjs`, sesuai dokumentasi Astro. |
| 20 | Palet warna | `--color-*: initial` dan `--shadow-*: initial` di `@theme` mematikan palet & bayangan bawaan Tailwind, sehingga hanya token DESIGN.md yang tersedia. |
| 21 | Utility layout | `container-situs` (1200px, padding 1.25rem/2rem), `section-y` (5rem/8rem), `teks-lebar` (65ch) sebagai `@utility`, bukan nilai arbitrer. |
| 22 | Helper placeholder | `isIsi()` juga menganggap `null`/`undefined` sebagai placeholder. `tampil()` mengembalikan string (untuk title/atribut); komponen `<Isian>` untuk markup bergaris putus-putus di dev. Tambahan `modeElemen()` → `"tampil" \| "placeholder" \| "sembunyi"` untuk aturan CONTENT §6. |
| 23 | Data tambahan di `sekolah.ts` | `ringkasan` dan `keunggulan` (maks 4) ditambahkan karena dipakai beranda (PRD §5) dan semua data harus di satu file. `pendaftaran` diperluas: `tahunAjaran`, `gelombang` (periode = `[ISI]`), `syarat`/`alur`/`faq` sebagai dummy. Ekskul & fasilitas memakai nama slot foto (`ekskul-1`, `fasilitas-1`) yang diisi di Fase 2. |
| 24 | Kriteria `cek-konten --ketat` | ~~Gagal hanya jika ada `[ISI]` atau `PUBLIC_SITE_URL` kosong.~~ Direvisi di #27. `npm run cek-konten --ketat` (tanpa `--`) juga didukung lewat `npm_config_ketat`. |
| 25 | Preload font | CSS memakai `wght.css` fontsource (subset lewat `unicode-range`, halaman berbahasa Indonesia hanya mengunduh subset latin). `<link rel="preload">` untuk file latin dipasang di BaseLayout pada Fase 3. |
| 26 | Line ending | `.gitattributes` memaksa LF agar diff konsisten di Windows. |

## Revisi setelah review Fase 1 — 2026-09-28

| # | Topik | Keputusan | Diterapkan di |
|---|---|---|---|
| 27 | `cek-konten --ketat` (merevisi #24) | Gagal jika masih ada `[ISI]`, `dummy: true`, atau `PUBLIC_SITE_URL` kosong. Statistik `null` tetap tidak menggagalkan. Dummy yang disetujui sekolah dilepas flag-nya. | CONTENT §5, `scripts/cek-konten.mjs` |
| 28 | Baris berlabel dengan nilai placeholder | Di produksi disembunyikan seluruh barisnya (bukan "–"); di dev tetap tampil bergaris putus-putus. Diterapkan lewat helper `saringBaris()` di `src/lib/isian.ts`, bukan per komponen. | CONTENT §2 |
