# SEO.md — Target: #1 Google untuk "SMPS YPPAB"

## 1. Kata kunci
- Utama: `SMPS YPPAB`
- Variasi: `SMP YPPAB`, `SMP Swasta YPPAB`, `SMP YPPAB Jambi`, `[ISI: kepanjangan YPPAB]`
- Turunan: `pendaftaran SMP YPPAB`, `SPMB SMPS YPPAB`, `alamat SMP YPPAB`, `guru SMP YPPAB`

Kata kunci merek biasanya persaingannya rendah, tetapi Google juga menilai sinyal di luar website (§6).
Tanpa §6, peringkat #1 tidak dijamin.

## 2. On-page per halaman
| Halaman | `<title>` (≤ 60 karakter) | h1 |
|---|---|---|
| Beranda | `SMPS YPPAB – SMP Swasta di {kota}, Jambi`; selama kota placeholder: `SMPS YPPAB – SMP Swasta di Jambi` | `SMPS YPPAB` + subjudul |
| Profil | `Profil Sekolah – SMPS YPPAB` | `Profil SMPS YPPAB` |
| Guru | `Guru dan Staf – SMPS YPPAB` | `Guru dan Staf SMPS YPPAB` |
| Ekskul | `Ekstrakurikuler – SMPS YPPAB` | `Ekstrakurikuler di SMPS YPPAB` |
| Fasilitas | `Fasilitas Sekolah – SMPS YPPAB` | `Fasilitas SMPS YPPAB` |
| Galeri | `Galeri Foto – SMPS YPPAB` | `Galeri SMPS YPPAB` |
| Pendaftaran | `Pendaftaran Murid Baru (SPMB) – SMPS YPPAB` | `Pendaftaran Murid Baru SMPS YPPAB` |
| Kontak | `Kontak & Alamat – SMPS YPPAB` | `Hubungi SMPS YPPAB` |
| Daftar berita | `Berita – SMPS YPPAB`; halaman ≥ 2: `Berita (Halaman {n}) – SMPS YPPAB` | `Berita SMPS YPPAB` |
| Detail berita | `{judul} – SMPS YPPAB` | judul artikel |
| 404 (noindex) | `Halaman Tidak Ditemukan – SMPS YPPAB` | `Halaman tidak ditemukan` |
| Kredit foto (noindex) | `Kredit Foto – SMPS YPPAB` | `Kredit Foto` |

- Meta description 140–160 karakter, unik per halaman, menyebut "SMPS YPPAB" satu kali secara alami.
- "SMPS YPPAB" muncul di: title, h1, paragraf pertama, alt logo, footer, dan anchor text internal. Jangan keyword stuffing (≤ ~1,5% kepadatan).
- URL pendek, huruf kecil, pakai tanda hubung.
- Breadcrumb terlihat + JSON-LD `BreadcrumbList`.
- Tautan internal: setiap halaman menaut ke Pendaftaran & Kontak.

## 3. Teknis
- `<html lang="id">`, `<meta name="viewport">`, `<link rel="canonical">` absolut (pakai `site` di `astro.config`)
- `site` diisi dari env `PUBLIC_SITE_URL`. Selama kosong, fallback ke `https://example.com` (URL placeholder tidak valid untuk Astro) dan build mencetak peringatan jelas di console. `npm run cek-konten --ketat` gagal bila `PUBLIC_SITE_URL` belum diisi.
- `/404`, `/kredit-foto`, dan `/dev/*` diberi `<meta name="robots" content="noindex">` dan dikeluarkan dari sitemap
- Open Graph + Twitter card; gambar OG 1200×630 dibuat statis di `public/og/` (biru–putih, teks "SMPS YPPAB")
- Favicon lengkap (svg, ico, apple-touch-icon 180px) + `site.webmanifest` dengan `theme_color #1552B8`
- `@astrojs/sitemap`, `public/robots.txt` menaut ke sitemap
- Halaman 404 berstatus 404
- Tidak ada konten penting yang hanya muncul setelah animasi/JS

## 4. Structured data (JSON-LD)
Dibangun dari `sekolah.ts` lewat satu util `buatSchema()`. Field bernilai placeholder/null DIHAPUS.
- Semua halaman: `School` (subtype dari `EducationalOrganization`) — `name`, `alternateName` (variasi §1), `url`, `logo` (dihilangkan sampai ada logo resmi; wordmark teks tidak dipakai), `address` (`PostalAddress`), `telephone`, `email`, `geo`, `sameAs` (akun sosmed resmi)
- `/berita/[slug]`: `NewsArticle` (kecuali artikel `dummy: true` → jangan beri schema)
- `/pendaftaran`: `FAQPage`
- Validasi dengan Rich Results Test sebelum rilis.

## 5. Performa = SEO
Ikuti target Lighthouse di PRD. Gambar hero `loading="eager"` + `fetchpriority="high"`, gambar lain lazy.
Preload font variabel (satu file, subset latin).

## 6. Di luar kode (dikerjakan manusia — ini penentu utama peringkat #1)
1. **Domain**: idealnya `.sch.id` (butuh dokumen sekolah, menambah kepercayaan) atau `.my.id`/`.com` sebagai alternatif.
2. **Google Search Console**: verifikasi domain, kirim sitemap, pantau kueri "smps yppab".
3. **Google Business Profile**: buat/klaim profil sekolah dengan nama, alamat, telepon SAMA PERSIS dengan website; tautkan ke website; unggah foto asli.
4. **Konsistensi NAP**: nama-alamat-telepon identik di website, Google Maps, Instagram/Facebook sekolah, dan data sekolah di portal Kemendikdasmen (Data Referensi / Dapodik).
5. **Tautan masuk**: pasang link website di bio Instagram/Facebook/YouTube sekolah, grup alumni, dan profil yayasan.
6. **Konten rutin**: 1–2 berita asli per bulan (kegiatan nyata + foto asli).
