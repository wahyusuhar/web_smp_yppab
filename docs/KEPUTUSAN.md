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

## Fase 2 — Aset foto — 2026-09-28

| # | Topik | Keputusan |
|---|---|---|
| 29 | Sumber & cara unduh | Unsplash, Pexels, Wikimedia Commons. Setiap halaman foto dibuka untuk memastikan lisensi (Unsplash+ ditolak), lalu file diunduh dari URL unduhan yang tertera di halaman itu atau dari API Commons (`imageinfo`) — tidak ada URL yang ditebak. |
| 30 | Ukuran file | Disimpan dengan sisi panjang maks. 2400px (hero) / 2000px (lainnya), JPEG q82, EXIF dibuang. Semua tetap ≥ 1600px (ASSETS §4). `astro:assets` membuat WebP/AVIF saat build. |
| 31 | Aturan teks/logo terbaca | Foto dicek di ukuran final skala 1:1. Ditolak bila nama sekolah lain, nama siswa, merek, atau teks lain terbaca. Lambang tanpa teks (OSIS, Tut Wuri Handayani) dan tulisan yang tidak lagi terbaca setelah diperkecil diterima. |
| 32 | Foto tanpa orang | Untuk slot tanpa foto siswa Indonesia yang layak (futsal, UKS, ruang kelas, lab IPA, perpustakaan, lapangan) dipakai foto suasana/benda tanpa orang, sesuai arahan. Benda/ruang dari luar negeri diterima selama tidak ada teks, salju, atau ciri asing yang mencolok. |
| 33 | Slot gedung | Sengaja placeholder: foto gedung sekolah lain akan dibaca sebagai gedung sekolah ini (halaman Profil & gambar OG). Lihat ASSETS-TODO.md. |
| 34 | Hero | ~~Crop lewat `object-position`.~~ Direvisi di #37. |
| 35 | Penomoran galeri | Foto galeri yang lolos diberi nomor 1–9; slot 10–12 placeholder. |
| 36 | Tipe lisensi | `LisensiFoto` di `kredit.ts` menulis lisensi CC lengkap dengan versi (mis. "CC BY-SA 4.0") karena wajib untuk atribusi. |

## Revisi setelah review Fase 2 — 2026-09-28

| # | Topik | Keputusan |
|---|---|---|
| 37 | Hero dipotong permanen (merevisi #34) | File sumber Pexels 12719300 (7655×5106) dipotong ke area x 0–3650, y 1276–4850 (3650×3574) sehingga dua siswi berseragam SD tidak ada di file sama sekali, lalu diperkecil ke 2400×2350. Posisi yang disarankan untuk `object-fit: cover`: 16:9 → `object-position: 50% 15%`, 4:5 → `75% 50%` (kedua siswa utuh). |
| 38 | Label "Foto ilustrasi" | Semua foto stok yang tampil diberi label kecil "Foto ilustrasi" (pojok kiri bawah, latar `biru-950` transparan, teks putih), di dev dan produksi. Data dari `stok: true` di `kredit.ts`; dipasang oleh komponen `Foto` lewat `cariFoto()` di `src/lib/foto.ts`. `kredit.file` kini path relatif terhadap `src/assets/images/` (mis. `stok/hero-1.jpg`) agar foto asli di `images/sekolah/` bisa dikenali. Halaman galeri menampilkan kalimat pemberitahuan selama `adaFotoStok("galeri")`. Diterapkan di DESIGN §4–5 dan PRD §5. |
| 39 | Atribusi /kredit-foto | `kredit.ts` mendapat field `judul` (wajib untuk CC) dan `perubahan` (`"diubah ukurannya"` / `"dipotong dan diubah ukurannya"` / `null`), serta `URL_LISENSI` dan `wajibAtribusi()`. Foto CC BY / CC BY-SA tampil sebagai daftar atribusi lengkap (judul bertaut ke sumber, pembuat, lisensi bertaut, perubahan); foto lain dalam tabel. Semua foto diperkecil; hanya hero yang juga dipotong. |

## Fase 3 — Layout & komponen — 2026-09-28

| # | Topik | Keputusan |
|---|---|---|
| 40 | Menu desktop | Menu lengkap (8 tautan + tombol Daftar) tampil mulai `xl` (≥1280px) dan muat tanpa dropdown (diuji: tanpa luapan di 1280px). Di bawah `xl` memakai drawer. Dropdown "Sekolah" tidak diperlukan. Tombol "Daftar" di header tampil mulai `sm` (≥640px); di bawahnya ada di dalam drawer. |
| 41 | Drawer (A16) | Memakai `<dialog>` + `showModal()` (sisa halaman inert, Esc bawaan), ditambah kunci Tab manual dan fokus kembali ke tombol Menu. Animasi lewat `@starting-style` (transform + opacity). Tanpa JS, tombol Menu diganti tautan ke `#tautan-cepat` di footer (varian Tailwind `js:`, class `js` dipasang di `<html>`). |
| 42 | Bayangan hover (A10, A9) | `box-shadow` tidak dianimasikan; bayangan ada di pseudo-element dan hanya opacity-nya yang berubah (utility `efek-angkat`). |
| 43 | robots.txt | Dibangkitkan lewat endpoint `src/pages/robots.txt.ts` agar URL sitemap mengikuti `PUBLIC_SITE_URL`. Halaman noindex TIDAK di-Disallow supaya Google bisa membaca noindex-nya. |
| 44 | Favicon & gambar OG | `scripts/buat-ikon.mjs` (sharp dari Astro) membuat favicon (monogram teks "SY"), ikon manifest, `site.webmanifest`, dan `public/og/og-default.png` (gradien biru→biru, garis "dasi", teks "SMPS YPPAB"). Hanya teks, bukan lambang; ganti saat ada logo resmi. |
| 45 | Media sosial | Lucide tidak menyediakan ikon merek, jadi tautan sosial berupa teks ("Instagram SMPS YPPAB"). Section kontak/sosial di footer disembunyikan utuh di produksi bila semua datanya placeholder (tidak ada judul tanpa isi). |
| 46 | Lightbox (A12) | `<dialog>` + animasi FLIP (Web Animations API, transform saja, 350ms), navigasi panah kiri/kanan, fokus kembali ke thumbnail. Label "Foto ilustrasi" ikut tampil di gambar besar bila thumbnail-nya foto stok. Tanpa JS tautan membuka gambar besar langsung. |
| 47 | Komponen `Foto` | Rasio (`aspect-ratio`) dipasang di `<figure>` dengan `self-start`, gambar `object-cover`; label menempel di pojok gambar pada grid apa pun. |
| 48 | Uji keyboard | Diuji otomatis dengan Chrome headless (puppeteer-core di luar proyek, tidak menambah dependensi): 26/26 lulus — urutan Tab, fokus terlihat di header/drawer/footer, drawer dibuka Enter, fokus terkunci (Tab & Shift+Tab), Esc menutup & fokus kembali, tanpa luapan di 360/768/1280px, A9 aktif setelah gulir. |

## Revisi sebelum Fase 4 — 2026-09-28

| # | Topik | Keputusan |
|---|---|---|
| 49 | Hero slideshow (A18, merevisi A1 untuk gambar) | Hero beranda = slideshow latar 3 foto: ganti tiap 6 dtk, crossfade 1,2 dtk + Ken Burns scale 1.08→1. Foto 1 langsung tampil (eager + fetchpriority high, tanpa animasi opacity); foto 2–3 dimuat setelah `load`. Overlay gradien `biru-950` → transparan (satu-satunya gradien beranda), teks hero putih. Kontrol: 3 titik + tombol jeda/putar (WCAG 2.2.2). Berhenti saat tab tidak aktif/hero tak terlihat. Reduced motion: hanya foto 1. Label "Foto ilustrasi" mengikuti foto aktif. `object-position` per foto (16:9 & 4:5) di data. Tinggi: `100svh` mobile, maks 760px desktop. A1 kini hanya untuk teks. Pengecualian durasi dicatat di DESIGN §6. |
| 50 | Foto hero-2 & hero-3 | Setelah ±40 kandidat baru ditinjau (kebanyakan seragam SD/SMA, busana khas pesantren, atau label nama siswa terbaca), dipilih dua foto Pramuka penggalang karya Fajar Herlambang STUDIO (Unsplash License). Teks yang terbaca — label nama siswa, nomor peserta, tulisan badge, nama regu pada panji — **diburamkan** dengan masker bertepi lembut (hero-2: 2 area, hero-3: 7 area), lalu diperkecil ke 2400×1600. Perubahan dicatat di kredit: "diburamkan sebagian dan diubah ukurannya". Mengaburkan nama anak juga melindungi privasinya. |
| 51 | Slot gedung di produksi | Selama placeholder, bingkai foto gedung tidak dirender di produksi dan layout menyesuaikan; di dev placeholder tetap tampil. Lewat prop `opsional` di `Foto` + helper `modeFoto()`. Gambar OG tetap versi teks sampai foto gedung asli ada. |
| 52 | Class `js-anim` | `js` dipasang di `<html>` bila JavaScript aktif; `js-anim` tambahan hanya bila reduced motion TIDAK aktif. State awal animasi (mis. teks tersembunyi sebelum reveal) hanya berlaku di bawah `.js-anim`, sehingga konten selalu terlihat tanpa JS atau dengan reduced motion. |

## Fase 4 — Beranda — 2026-09-28

| # | Topik | Keputusan |
|---|---|---|
| 53 | A1 lewat CSS | Reveal teks hero per kata memakai animasi CSS (kata dipecah saat build, `animation-delay` per indeks, kurva setara `power3.out`), bukan GSAP: teks tidak menunggu JS dimuat. Hanya berlaku di bawah `html.js-anim`. GSAP dipakai untuk A2 (heading section) dan A4 (counter) di `src/scripts/animasi.ts`, hanya diimpor oleh halaman yang butuh. |
| 54 | Tinggi hero | "100svh" ditafsirkan sebagai layar penuh DI BAWAH header sticky: `calc(100svh - 5rem)`, min 34rem, maks 760px mulai `lg`. Dengan begitu kontrol slideshow & gelombang tetap terlihat tanpa menggulir. |
| 55 | Marquee (A5) & WCAG 2.2.2 | Marquee bergerak > 5 dtk, jadi selain berhenti saat hover/fokus juga diberi tombol "Jeda animasi daftar ekstrakurikuler". Tanpa JS / reduced motion: daftar statis terbungkus, tanpa duplikat. |
| 56 | Pemuatan foto hero 2–3 | Dimuat lewat `requestIdleCallback` setelah event `load` (fallback `setTimeout`), terverifikasi dengan Performance API: foto 2–3 diminta setelah `loadEventEnd`. |
| 57 | CSS inline | `build.inlineStylesheets: "always"`: CSS (±9 KB gzip) disisipkan di HTML sehingga tidak ada request CSS yang memblokir render. Diukur 5× (CPU 4× lambat): FCP/LCP median 480 ms (inline) vs 516 ms (eksternal). |
| 58 | Kontras hero | Diukur dari piksel foto di bawah area teks (persentil 99 piksel paling terang) pada ketiga foto di 1280px dan 360px: rasio 7,3:1–10,3:1 (AA ≥ 4,5:1). Overlay mobile minimal 0,72 di seluruh lebar. |
| 59 | Berita terbaru di beranda | Section "Berita terbaru" (PRD §5) ditambahkan di Fase 6 bersama content collection berita; saat ini belum ada sumber data berita. |
| 60 | Lingkungan uji | Preview produksi dijalankan di port 4400 karena port 4321 dipakai server dev pengguna. Uji Fase 3 diulang terhadap build produksi (26/26 lulus). |

## Revisi setelah review Fase 4 — 2026-09-28

| # | Topik | Keputusan |
|---|---|---|
| 61 | Placeholder foto di produksi (memperluas #51) | Satu aturan di `Foto`: placeholder SVG tidak dirender di produksi (prop `opsional` dihapus). `Card` dengan prop `foto` beralih otomatis ke varian tanpa foto (ikon Lucide dari field `ikon` di `sekolah.ts` + latar biru-50) — dipakai kartu ekskul & fasilitas. Item galeri placeholder dilewati sehingga grid rapat. Dev tetap menampilkan placeholder. Terverifikasi: 0 placeholder SVG di seluruh HTML produksi. |
| 62 | Tombol hero di mobile | Button `ringkasDiMobile`: di bawah `sm` `px-3`, `text-sm`, tanpa panah, `whitespace-nowrap`. Kedua tombol hero sejajar & satu baris mulai 360px (diuji 360/375/393/412/768px); di bawah 360px tombol turun utuh ke baris baru, teks tidak terlipat. |
| 63 | Berita terbaru di beranda (menegaskan #59) | WAJIB ditambahkan di Fase 6 bersama content collection berita (dicatat juga di PROMPT-AWAL.md Fase 6). |
