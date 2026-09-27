# Prompt untuk Claude Code (kirim satu per satu, cek hasil tiap fase)

Taruh `CLAUDE.md` di root proyek dan folder `docs/` di sebelahnya, lalu jalankan `claude` di folder itu.

---

## Fase 0 — Pahami dulu
```
Baca CLAUDE.md dan semua file di docs/. Jangan tulis kode dulu.
Ringkas dalam poin: halaman yang akan dibuat, stack, aturan konten, dan katalog animasi.
Sebutkan hal yang ambigu atau saling bertentangan di dokumen. Tunggu jawaban saya.
```

## Fase 1 — Fondasi
```
Kerjakan fase 1: inisialisasi proyek Astro + TypeScript strict + Tailwind v4 sesuai CLAUDE.md.
Cek versi terbaru tiap paket sebelum install. Buat token warna & tipografi dari docs/DESIGN.md,
src/data/sekolah.ts sesuai docs/CONTENT.md (placeholder, jangan dikarang), helper isIsi/tampil,
dan scripts/cek-konten.mjs. Jalankan npm run build dan npm run cek-konten, tunjukkan outputnya. Commit.
```

## Fase 2 — Aset foto
```
Kerjakan fase aset sesuai docs/ASSETS.md. Cari dan unduh foto untuk setiap slot di §5
(kecuali guru/kepala sekolah). Catat semua di docs/ASSETS-CREDITS.md. Yang gagal → placeholder + ASSETS-TODO.md.
Tunjukkan tabel hasil (slot, file, sumber, lisensi). Commit.
```

## Fase 3 — Layout & komponen
```
Buat BaseLayout (meta SEO, canonical, OG, JSON-LD dari buatSchema()), Header (A9), MobileDrawer, Footer,
WhatsAppFab, dan semua komponen inti di DESIGN.md §4. Buat halaman /dev/komponen yang memperlihatkan
semua komponen (dikecualikan dari sitemap & noindex). Build, commit.
```

## Fase 4 — Beranda
```
Bangun halaman beranda sesuai PRD §5 dengan animasi A1, A2, A4, A5, A10, A13.
Terapkan aturan animasi DESIGN.md §6 (reduced-motion, tanpa-JS tetap tampil, hanya transform/opacity).
Jalankan Lighthouse mobile di npm run preview dan laporkan 4 skornya. Perbaiki sampai target PRD §2. Commit.
```

## Fase 5 — Halaman lain
```
Bangun /profil (A6), /guru-dan-staf (A3), /ekstrakurikuler, /fasilitas (A8), /galeri (A12),
/pendaftaran (A7 + FAQPage), /kontak, /404, /kredit-foto. Satu commit per halaman.
```

## Fase 6 — Berita
```
Buat content collection berita + 6 artikel dummy sesuai CONTENT.md §4, halaman /berita (pagination)
dan /berita/[slug] (progress bar baca, berita terkait). Transisi halaman A11 + cleanup ScrollTrigger.
WAJIB: tambahkan section "Berita terbaru" (3 artikel) di beranda (PRD §5; KEPUTUSAN #59, #63). Commit.
```

## Fase 7 — Audit
```
Audit akhir terhadap PRD §8 (Definition of Done). Untuk tiap poin: lulus/gagal + bukti.
Jalankan Lighthouse di /, /profil, dan satu artikel. Cari pelanggaran daftar "Dilarang" di CLAUDE.md
(termasuk kalimat klise) di seluruh src/ dan perbaiki. Tampilkan output npm run cek-konten.
```

---

### Tips
- Jika hasil terasa generik: "Bagian ini melanggar aturan anti-slop di CLAUDE.md poin ___. Perbaiki mengikuti DESIGN.md §5."
- Jika Claude Code mengarang fakta: "Itu fakta terverifikasi, kembalikan ke placeholder sesuai CONTENT.md §1."
- Berikan screenshot hasil di browser kepada Claude Code saat meminta revisi visual — jauh lebih akurat dari deskripsi.
