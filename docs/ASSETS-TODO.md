# ASSETS-TODO.md — Foto yang Belum Ada

Slot di bawah ini memakai placeholder SVG (`src/assets/images/stok/{slot}.svg`: latar biru-100, ikon kamera, label slot).
Ganti dengan foto asli sekolah, lalu catat di `src/data/kredit.ts` dan `docs/ASSETS-CREDITS.md` bila fotonya bukan milik sekolah.

| Slot | File placeholder | Alasan belum ada foto | Saran pengganti |
|---|---|---|---|
| gedung | `gedung-1.svg` | Sengaja tidak memakai foto stok: foto gedung sekolah lain di halaman Profil (dan gambar OG) akan dibaca pengunjung sebagai gedung SMPS YPPAB, walau diberi alt "Ilustrasi". Kandidat dari Commons (gedung SMP lain) juga memuat papan nama sekolah. | Foto asli tampak depan gedung, landscape, siang hari, tanpa kendaraan menutupi. WAJIB sebelum rilis. |
| ekskul (PMR) | `ekskul-5.svg` | Foto P3K yang tersedia memuat teks "FIRST AID KIT" yang jelas terbaca; foto pelatihan PMR yang ada memperlihatkan siswa luar negeri. | Foto kegiatan PMR sekolah (latihan membalut, petugas UKS saat upacara). |
| ekskul (English Club) | `ekskul-6.svg` | Tidak ada foto siswa Indonesia yang cocok; alternatif tanpa orang (kamus/buku) penuh teks yang terbaca. | Foto kegiatan English Club (presentasi, drama pendek). |
| fasilitas (Lab Komputer) | `fasilitas-4.svg` | Foto lab kosong memperlihatkan logo merek (HP, Apple); foto lab dengan siswa berasal dari luar negeri (India, Vietnam). | Foto asli lab komputer sekolah. WAJIB sebelum rilis. |
| galeri | `galeri-10.svg`, `galeri-11.svg`, `galeri-12.svg` | Tiga kandidat ditolak saat cek ukuran final: label nama siswa dan nama sekolah lain terbaca, atau teks layar terbaca. | Foto kegiatan asli sekolah. Seluruh slot galeri WAJIB diganti foto asli sebelum rilis. |

Semua slot yang ASSETS.md §5 tandai "YA" (hero, gedung, fasilitas, galeri) tetap wajib diganti foto asli sebelum rilis,
termasuk yang saat ini sudah berisi foto stok.
