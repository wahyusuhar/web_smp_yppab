# PRD — Website Profil SMPS YPPAB

Versi 1.0 · Status: siap dikerjakan

## 1. Ringkasan
Website profil statis untuk SMPS YPPAB (SMP Swasta, Jambi) yang saat ini belum punya website.
Website harus tampil modern, bertema biru–putih (selaras dengan seragam SMP putih-biru), kaya animasi namun tetap cepat,
dan menjadi hasil pertama Google untuk pencarian **"SMPS YPPAB"** serta variasinya ("SMP YPPAB", "SMP Swasta YPPAB", "SMP YPPAB Jambi").

## 2. Tujuan & metrik keberhasilan
| Tujuan | Metrik |
|---|---|
| Peringkat #1 untuk kata kunci merek | Posisi 1 di Google Search Console untuk "smps yppab" & "smp yppab" dalam 4–8 minggu setelah terindeks |
| Cepat di HP kelas menengah | Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100 |
| Core Web Vitals | LCP < 2,5 dtk, CLS < 0,1, INP < 200 ms |
| Menarik & berkesan | Setiap halaman kecuali Kontak punya minimal satu momen animasi utama (lihat DESIGN.md), tanpa mengorbankan metrik di atas |
| Mudah dirawat | Seluruh data sekolah di satu file; berita ditambah cukup dengan file Markdown baru |

## 3. Pengguna
1. **Orang tua calon murid** — mencari info pendaftaran, biaya, lokasi, kontak. Prioritas utama.
2. **Calon murid (lulusan SD)** — melihat suasana sekolah, ekskul, galeri.
3. **Siswa & alumni** — berita, galeri, kebanggaan.
4. **Masyarakat/dinas** — profil resmi, akreditasi, identitas sekolah.

## 4. Ruang lingkup
### Termasuk
- Website statis multi-halaman (Astro), Bahasa Indonesia
- Konten dari `src/data/sekolah.ts` dan content collection Markdown (berita)
- Kontak & pendaftaran lewat tautan WhatsApp (`https://wa.me/...`), telepon, email, dan Google Maps embed
- SEO teknis lengkap (lihat SEO.md)

### Tidak termasuk
- Backend, database, login, panel admin, formulir yang menyimpan data
- Pendaftaran online dengan upload berkas
- Multi-bahasa

## 5. Peta situs & kebutuhan per halaman
| URL | Halaman | Isi wajib | Momen animasi utama |
|---|---|---|---|
| `/` | Beranda | Hero (h1 berisi "SMPS YPPAB"), ringkasan profil, keunggulan (maks 4), statistik, ekskul, berita terbaru (3), galeri cuplikan, CTA pendaftaran, peta | Hero reveal (A1) + marquee ekskul (A5) + scroll reveal (A2). Counter (A4) aktif otomatis saat statistik diisi (lihat F9) |
| `/profil` | Profil Sekolah | Sejarah (timeline), visi, misi, identitas sekolah (tabel: NPSN, akreditasi, status, alamat), sambutan kepala sekolah | Timeline sejarah tergambar saat scroll (A6) |
| `/guru-dan-staf` | Guru & Staf | Grid kartu (foto/avatar inisial, nama, jabatan/mapel) | Stagger reveal grid (A3) |
| `/ekstrakurikuler` | Ekstrakurikuler | Daftar ekskul + jadwal + deskripsi singkat | Hover/focus reveal kartu (A14) |
| `/fasilitas` | Fasilitas | Daftar fasilitas dengan foto | Parallax gambar ringan (A8) |
| `/galeri` | Galeri | Grid foto dengan lightbox (tanpa library berat) | Stagger reveal masonry (A3) + lightbox zoom (A12) |
| `/berita` | Berita | Daftar artikel, pagination 6 per halaman | Stagger kartu (A3) |
| `/berita/[slug]` | Detail berita | Judul, tanggal, gambar, isi, berita terkait | Progress bar baca (A15) |
| `/pendaftaran` | Penerimaan Murid Baru (SPMB) | Jadwal, syarat, alur (step), biaya (placeholder bila belum ada), FAQ, tombol WhatsApp | Alur step tergambar berurutan (A7) |
| `/kontak` | Kontak | Alamat, telepon, email, WA, jam layanan, Maps embed, media sosial | — (tenang, cukup A2 untuk heading) |
| `/404` | Tidak ditemukan | Pesan + tautan kembali | Scroll reveal (A2) |
| `/kredit-foto` | Kredit Foto | Tabel kredit dari `src/data/kredit.ts` (lihat ASSETS.md §6). Tidak di menu utama, ditaut dari footer | — |

Komponen global: header sticky (mengecil saat scroll, A9), menu mobile (drawer, A16), footer (identitas, kontak, tautan cepat, sosial media, tautan kredit foto), tombol WhatsApp melayang dan tombol kembali ke atas (A17).

Menu utama: Beranda, Profil, Guru & Staf, Ekstrakurikuler, Fasilitas, Galeri, Berita, Kontak, ditambah tombol "Daftar" (Button primary → `/pendaftaran`).
Di desktop, bila menu terlalu penuh, Fasilitas & Galeri digabung dalam dropdown "Sekolah".

## 6. Kebutuhan fungsional
- F1. Semua data sekolah dibaca dari `src/data/sekolah.ts` (tipe TypeScript ketat).
- F2. Berita memakai Astro Content Collections (`src/content/berita/*.md`) dengan schema: `judul`, `tanggal`, `ringkasan`, `gambar`, `altGambar`, `dummy`.
- F3. Setiap halaman memiliki title, meta description, canonical, Open Graph, dan breadcrumb (kecuali beranda).
- F4. JSON-LD `School` di semua halaman (dari data, tanpa field placeholder, tanpa `logo` sampai ada logo resmi); `NewsArticle` di detail berita (kecuali `dummy: true`); `BreadcrumbList`; `FAQPage` di pendaftaran.
- F5. Sitemap otomatis dan `robots.txt`.
- F6. Tautan WhatsApp berisi pesan awal otomatis (mis. "Halo, saya ingin bertanya tentang pendaftaran di SMPS YPPAB").
- F7. `npm run cek-konten` menampilkan semua placeholder dan konten dummy.
- F8. Semua animasi mati otomatis saat `prefers-reduced-motion: reduce`.
- F9. Section statistik: selama semua nilai statistik `null`, mode dev menampilkan placeholder dan build produksi menyembunyikan section seluruhnya. Counter A4 otomatis jalan saat data diisi.
- F10. Tombol WhatsApp (termasuk yang melayang) dan Maps embed: selama datanya placeholder, dev menampilkan kotak placeholder dan produksi menyembunyikannya. Otomatis muncul saat data diisi. Maps memakai koordinat, atau alamat lengkap bila koordinat belum ada.

## 7. Kebutuhan non-fungsional
- Total JS per halaman ≤ 80 KB gzip (GSAP dimuat hanya di halaman yang butuh).
- Semua gambar lewat `astro:assets` → WebP/AVIF, `width`/`height` eksplisit, lazy-load kecuali gambar hero.
- Kontras teks memenuhi WCAG AA.
- Navigasi penuh dengan keyboard, fokus terlihat.
- Berfungsi tanpa JavaScript (konten tetap terlihat; animasi hanya peningkatan).
- Siap deploy ke Cloudflare Pages / Netlify / Vercel (output `dist/`).

## 8. Kriteria selesai (Definition of Done)
- [ ] Semua halaman di tabel §5 ada dan lolos `npm run build` tanpa warning
- [ ] Target Lighthouse §2 tercapai di halaman `/`, `/profil`, `/berita/[slug]`
- [ ] Validator Rich Results Google tidak menemukan error pada JSON-LD
- [ ] Tidak ada fakta terverifikasi yang dikarang (dicek via `npm run cek-konten`)
- [ ] Semua foto tercatat di `docs/ASSETS-CREDITS.md`
- [ ] Dites di 360px, 768px, 1280px dan dengan reduced-motion aktif

## 9. Pekerjaan sebelum rilis (di luar Claude Code)
- Ganti semua `[ISI: ...]` dengan data asli dari sekolah
- Ganti foto stok dengan foto asli sekolah (minimal hero, gedung, kegiatan)
- Ganti konten `dummy: true` atau minta persetujuan sekolah
- Daftarkan domain, Google Search Console, Google Business Profile (lihat SEO.md §6)
