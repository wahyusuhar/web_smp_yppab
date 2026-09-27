# DESIGN.md — Sistem Desain SMPS YPPAB

Arah visual: **"Seragam putih-biru"** — bersih, terang, tegas, ramah anak SMP dan meyakinkan orang tua.
Bukan startup SaaS, bukan template universitas. Banyak ruang putih, biru dipakai dengan sengaja.

## 1. Warna (token Tailwind v4 via `@theme`)
| Token | Hex | Pakai untuk |
|---|---|---|
| `biru-950` | `#071A33` | Footer, section gelap, teks judul besar |
| `biru-800` | `#0B3470` | Heading, teks penting di atas putih |
| `biru-600` | `#1552B8` | Tombol utama, link, aksen |
| `biru-400` | `#4A8BEA` | Hover, ilustrasi, garis dekoratif |
| `biru-100` | `#DDEAFB` | Latar kartu/section selang-seling |
| `biru-50`  | `#F2F7FE` | Latar halaman alternatif |
| `putih`    | `#FFFFFF` | Latar utama |
| `abu-700`  | `#334155` | Teks paragraf |
| `abu-300`  | `#CBD5E1` | Border |

Aturan:
- Maksimal 1 warna di luar palet: `kuning-400 #FACC15` HANYA untuk badge kecil ("Pendaftaran Dibuka"). Tidak untuk tombol/latar.
- Gradient hanya biru→biru (mis. `biru-800 → biru-600`), maksimal 1 per halaman. Di beranda satu-satunya gradien adalah
  overlay hero `biru-950` pekat (kiri) → transparan (kanan) di atas slideshow foto (A18); CTA pendaftaran memakai latar
  solid `biru-800` + garis "dasi".
- Teks di atas foto hero = putih, selalu di atas overlay. Kontras AA wajib dicek pada KETIGA foto slideshow, di area teks.
- Teks di atas `biru-600`/lebih gelap = putih. Verifikasi kontras AA untuk setiap pasangan.

## 2. Tipografi
- Font: Plus Jakarta Sans Variable (self-host).
- Skala (mobile → desktop, pakai `clamp()`):
  - Display (h1 hero): 2.5rem → 4.5rem, weight 800, letter-spacing -0.02em
  - h2: 1.875rem → 2.75rem, weight 700
  - h3: 1.25rem → 1.5rem, weight 700
  - Body: 1rem → 1.125rem, weight 400, line-height 1.7
  - Label/eyebrow: 0.8125rem, weight 600, uppercase, letter-spacing 0.08em, warna `biru-600`
- Lebar teks paragraf maksimal `65ch`.

## 3. Layout & spacing
- Container: max-width 1200px, padding x 1.25rem (mobile) / 2rem (desktop)
- Jarak antar section: 5rem (mobile) / 8rem (desktop)
- Skala spacing hanya kelipatan 4px dari Tailwind. Tidak ada nilai arbitrer (`mt-[37px]`).
- Radius: kartu 1rem, tombol 9999px (pill), gambar 1.25rem
- Bayangan: satu saja, `0 10px 30px -12px rgb(11 52 112 / 0.25)`

## 4. Komponen inti (buat sekali, pakai ulang)
`Button` (primary, secondary-outline, ghost), `SectionHeading` (eyebrow + h2 + deskripsi), `Card`, `StatCounter`, `Badge`,
`Breadcrumb`, `Timeline`, `StepList`, `Lightbox`, `WhatsAppFab`, `Header`, `MobileDrawer`, `Footer`,
`Foto` (semua gambar konten; memasang label "Foto ilustrasi" otomatis, lihat §5).
Tidak boleh ada tombol/kartu yang di-styling di luar komponen ini.

## 5. Elemen visual khas (pembeda dari template)
- **Garis "dasi"**: garis diagonal tipis biru-400 sebagai dekorasi section (terinspirasi dasi seragam SMP). Dipakai konsisten, bukan acak.
- **Gelombang SVG** pemisah section hero → konten, beranimasi pelan: pola gelombang berulang (tileable) digeser `translateX`, 8–12 dtk loop. Bukan path morph; plugin MorphSVG tidak dipakai.
- Foto dengan bingkai radius + offset blok biru-100 di belakangnya.
- Angka besar (statistik, nomor langkah) memakai weight 800 dengan outline/transparansi biru.
- **Label "Foto ilustrasi"**: setiap foto stok yang tampil (hero, galeri, kegiatan, ekskul, fasilitas, berita) diberi label
  kecil di pojok kiri bawah — pill, `text-xs` weight 600, teks `putih` di atas `biru-950` 75% opacity, jarak 12px dari tepi.
  Tampil di dev DAN produksi. Sumber datanya `stok: true` di `src/data/kredit.ts`; dipasang otomatis oleh komponen `Foto`,
  tidak pernah ditulis manual. Label `aria-hidden` karena alt foto stok sudah diawali "Ilustrasi:".
  Label hilang otomatis saat foto diganti foto asli sekolah (`stok: false` atau entri kredit dihapus).

## 6. Katalog animasi (HANYA ini yang dipakai)
Library: GSAP + ScrollTrigger. Transisi halaman: Astro View Transitions.

| ID | Nama | Di mana | Spesifikasi |
|---|---|---|---|
| A1 | Hero reveal (teks) | Hero beranda | h1 dipecah per kata, naik 40px + opacity, stagger 0.06s, durasi 0.8s, `power3.out`. Hanya TEKS hero; gambar hero diatur A18. Teks tetap di atas slideshow, tidak ikut berganti |
| A2 | Scroll reveal | Heading section & paragraf | y 24px + opacity, 0.6s, trigger `top 85%`, sekali saja |
| A3 | Stagger grid | Kartu guru, berita, fasilitas, grid masonry galeri | seperti A2, stagger 0.08s, maksimal 12 elemen dianimasikan per grid |
| A4 | Counter | Statistik | 0 → nilai, 1.6s, mulai saat terlihat. Jika nilai placeholder → tidak dianimasikan. Selama semua statistik `null`, section disembunyikan di produksi (PRD F9) |
| A5 | Marquee | Ekskul di beranda | CSS animation loop horizontal, pause saat hover, dua baris berlawanan arah |
| A6 | Timeline draw | Sejarah di profil | garis vertikal `scaleY` terikat scroll (`scrub: true`), titik muncul bergiliran |
| A7 | Step draw | Alur pendaftaran | konektor antar langkah tergambar berurutan saat scroll |
| A8 | Parallax ringan | Gambar fasilitas | yPercent -8 → 8, `scrub`, nonaktif di < 768px |
| A9 | Header shrink | Global | setelah scroll 80px header mengecil lewat transform (scale/translateY, bukan `height`); bayangan dari pseudo-element yang di-fade (opacity) |
| A10 | Micro-interaction | Tombol, kartu, link | hover: translateY -2px + bayangan; tombol primary: ikon panah geser 4px. CSS saja |
| A11 | Page transition | Antar halaman | View Transitions fade + slide 12px, 250ms |
| A12 | Lightbox | Galeri | zoom dari posisi thumbnail (FLIP), 350ms |
| A13 | Gelombang | Pemisah hero | gelombang SVG berulang digeser `translateX` pelan, loop 8–12 dtk (lihat §5) |
| A14 | Hover/focus reveal | Kartu ekskul | detail kartu terungkap saat hover/`:focus-within` lewat transform + opacity, CSS saja. Di perangkat tanpa hover (`@media (hover: none)`) semua isi kartu langsung terlihat, tidak disembunyikan |
| A15 | Progress bar baca | Detail berita | bar tipis di atas halaman, `scaleX` 0 → 1 terikat scroll artikel (`transform-origin: left`) |
| A16 | Drawer mobile | Menu mobile | transisi CSS: drawer `translateX` + overlay opacity, 250–300ms |
| A17 | Tombol melayang | Tombol WhatsApp & kembali ke atas | muncul/hilang dengan transisi CSS opacity + translateY, 250ms |
| A18 | Slideshow hero | Latar hero beranda | 3 foto (`hero-1`–`hero-3`) memenuhi hero sebagai latar, berganti tiap 6 dtk: crossfade opacity 1,2 dtk + zoom pelan (Ken Burns) scale 1.08→1 selama foto tampil. Detail di bawah tabel |

**A18 — detail wajib:**
- Foto 1 (`hero-1`) tampil langsung tanpa animasi opacity: `loading="eager"` + `fetchpriority="high"` (elemen LCP). Foto 2 dan 3 baru dimuat setelah event `load`.
- Overlay gradien `biru-950` pekat (kiri) → transparan (kanan) di atas foto; teks hero putih di atasnya.
- Indikator 3 titik + tombol jeda/putar (WCAG 2.2.2): elemen `<button>` dengan `aria-label`, bisa dipakai keyboard, titik aktif memakai `aria-current`.
- Berhenti saat tab tidak aktif (`visibilitychange`) atau hero tidak terlihat (IntersectionObserver); lanjut otomatis saat kembali, kecuali pengguna menekan jeda.
- `prefers-reduced-motion: reduce` → hanya foto 1, tanpa pergantian, tanpa zoom, tanpa kontrol slideshow.
- Label "Foto ilustrasi" ikut berganti sesuai foto yang sedang tampil (dari `kredit.ts`).
- `object-position` per foto diatur di data untuk 16:9 (desktop) dan 4:5 (mobile).
- Tinggi hero: `100svh` di mobile, maksimal 760px di desktop.
- Tanpa JS: hanya foto 1 yang terlihat.

Halaman `/404` memakai A2. Halaman `/kontak` sengaja tenang: hanya A2 untuk heading.

Aturan wajib animasi:
- Hanya animasikan `transform` dan `opacity`. Tidak ada animasi `width/height/top/left`.
- Durasi 0.25–0.9s (kecuali counter, marquee, gelombang, animasi yang terikat scroll, dan slideshow hero A18:
  crossfade 1,2 dtk, zoom Ken Burns sepanjang 6 dtk foto tampil).
- Semua dimatikan saat `prefers-reduced-motion: reduce` → elemen langsung tampil di posisi akhir.
- Konten harus terlihat tanpa JS: set state awal animasi lewat JS (class `js-anim` di `<html>`, hanya dipasang bila
  JavaScript aktif DAN reduced motion tidak aktif), bukan di CSS default.
- Tidak ada scroll-jacking, tidak ada custom cursor, tidak ada smooth-scroll library.
- Maksimal satu momen animasi "besar" per section.
- Bersihkan ScrollTrigger saat navigasi View Transitions (`astro:before-swap`) agar tidak bocor.

## 7. Ikon & ilustrasi
- Lucide SVG, stroke 1.75, ukuran 20/24px, warna mengikuti teks.
- Logo: jika logo resmi sekolah belum ada, pakai wordmark teks "SMPS YPPAB" di `src/components/Logo.astro` + TODO. JANGAN menggambar logo/lambang karangan yang bisa dikira resmi. Wordmark tidak dipakai sebagai `logo` di JSON-LD.
- Paket ikon: paket Astro resmi Lucide bila tersedia di npm, jika tidak `lucide-static`. Pilihan akhir dicatat di `docs/KEPUTUSAN.md`.
