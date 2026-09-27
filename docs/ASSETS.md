# ASSETS.md — Aturan Foto & Aset

## 1. Sumber yang DIIZINKAN
| Sumber | Lisensi | Catatan |
|---|---|---|
| Unsplash (unsplash.com) | Unsplash License — bebas pakai, tanpa wajib atribusi | Tetap catat kredit |
| Pexels (pexels.com) | Pexels License — bebas pakai | Tetap catat kredit |
| Wikimedia Commons | Hanya CC0, CC BY, CC BY-SA | Atribusi WAJIB tampil di halaman kredit |

## 2. Sumber yang DILARANG
Google Images, Pinterest, website/Instagram sekolah lain, berita online, Freepik/Shutterstock/stok berbayar,
foto dengan watermark, gambar buatan AI yang tampak seperti foto sekolah ini.

## 3. Cara mencari
Prioritaskan foto yang terasa Indonesia: siswa berseragam **putih-biru**, kelas, upacara bendera, Pramuka, laboratorium, perpustakaan, olahraga.
Kata kunci contoh: `indonesian students`, `indonesia school uniform`, `indonesian classroom`, `pramuka`, `school library asia`, `students laboratory`.
Tolak foto yang jelas luar negeri (seragam asing, salju, tulisan bahasa lain) untuk section utama.

## 4. Prosedur (wajib diikuti per foto)
1. Buka halaman foto (bukan hanya hasil pencarian), pastikan lisensi sesuai §1.
2. Unduh versi ≥ 1600px ke `src/assets/images/stok/{slot}-{nomor}.jpg`.
3. Tambah entri di `src/data/kredit.ts` (sumber utama) dan baris yang sama di `docs/ASSETS-CREDITS.md`: slot, nama file, URL halaman, fotografer, lisensi, tanggal unduh.
4. Pakai lewat `<Image>`/`<Picture>` dari `astro:assets` (WebP/AVIF otomatis).
5. `alt` harus jujur dan deskriptif, contoh: `"Ilustrasi: siswa SMP berseragam putih-biru belajar di kelas"`.
   JANGAN tulis `"Siswa SMPS YPPAB ..."` untuk foto stok.
6. Jika unduhan gagal atau lisensi tidak jelas: JANGAN tebak URL. Pakai placeholder SVG (latar `biru-100`, ikon kamera, label slot) dan catat di `docs/ASSETS-TODO.md`.

## 5. Daftar slot foto
| Slot | Jumlah | Halaman | Wajib diganti foto asli sebelum rilis? |
|---|---|---|---|
| hero | 1 | Beranda | YA |
| gedung | 1 | Profil, OG image | YA |
| kegiatan-kelas | 3 | Beranda, Profil | disarankan |
| ekskul | 6 | Ekstrakurikuler | disarankan |
| fasilitas | 6 | Fasilitas | YA |
| galeri | 12 | Galeri | YA |
| berita | 6 | Berita dummy | ikut artikelnya |
| kepala-sekolah & guru | — | — | TIDAK pakai foto stok orang; pakai avatar inisial sampai ada foto asli |

## 6. Halaman kredit
Buat `/kredit-foto` (tidak masuk menu utama, ditaut dari footer, `noindex`, tidak masuk sitemap) yang dibangkitkan dari `src/data/kredit.ts`.
`docs/ASSETS-CREDITS.md` adalah salinan yang harus ikut diperbarui setiap kali `kredit.ts` berubah.
