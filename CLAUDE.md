# CLAUDE.md — Website SMPS YPPAB

Kamu sedang membangun website profil statis untuk **SMPS YPPAB** (SMP Swasta YPPAB, Jambi).
Baca file ini dan semua file di `docs/` SEBELUM menulis kode. Jangan mulai dari asumsi.

## Sumber kebenaran (urutan prioritas)
1. `docs/PRD.md` — apa yang dibangun, halaman, kriteria selesai
2. `docs/DESIGN.md` — warna, tipografi, spacing, spesifikasi animasi
3. `docs/SEO.md` — aturan SEO teknis dan on-page
4. `docs/CONTENT.md` — aturan data sekolah, placeholder, konten dummy
5. `docs/ASSETS.md` — aturan mencari, mengunduh, dan mencatat foto

Jika dokumen saling bertentangan, ikuti urutan di atas lalu **tanyakan**, jangan menebak.
Jika sesuatu tidak diatur di dokumen, pilih opsi paling sederhana dan catat di `docs/KEPUTUSAN.md`.

## Stack (terkunci — jangan tambah library lain tanpa izin)
- Astro (versi stabil terbaru) + TypeScript strict
- Tailwind CSS v4
- GSAP + ScrollTrigger (animasi), Astro View Transitions (transisi halaman)
- `@astrojs/sitemap`, `astro:assets` untuk gambar
- Font: `@fontsource-variable/plus-jakarta-sans` (self-host, bukan Google Fonts CDN)
- Ikon: `lucide` (SVG). DILARANG emoji sebagai ikon.
- Tidak ada React/Vue/Svelte. Interaksi cukup `<script>` Astro.

Sebelum memasang paket, cek versi terbaru di npm dan dokumentasi resminya. Jangan menulis API dari ingatan jika ragu — buka dokumentasinya.

## Aturan anti-mengarang (WAJIB)
- Semua fakta sekolah HANYA boleh berada di `src/data/sekolah.ts`. Komponen tidak boleh menulis nama kepala sekolah, alamat, telepon, NPSN, akreditasi, tahun berdiri, dsb. secara langsung.
- Fakta yang bisa dicek orang lain (NPSN, akreditasi, alamat, telepon, email, nama orang sungguhan, tahun berdiri, koordinat) JANGAN dikarang. Tulis placeholder: `"[ISI: nomor telepon sekolah]"`.
- Konten deskriptif (sambutan, visi-misi, deskripsi ekskul, berita contoh) boleh dummy, tapi WAJIB diberi flag `dummy: true` di data. Lihat `docs/CONTENT.md`.
- Jangan membuat testimoni atas nama orang sungguhan. Testimoni dummy memakai inisial + peran ("Orang tua siswa kelas 8") dan `dummy: true`.
- Jangan menulis klaim prestasi ("Juara 1 Olimpiade ...", "Sekolah terbaik di Jambi") kecuali ada di data dengan status bukan dummy.
- Structured data (JSON-LD) hanya boleh berisi field yang BUKAN placeholder. Field placeholder dihilangkan, bukan diisi karangan.
- Script `npm run cek-konten` harus ada dan mencetak daftar semua `[ISI:` dan `dummy: true`. Ini daftar pekerjaan sebelum rilis.

## Aturan anti-AI-slop (WAJIB)
Dilarang:
- Gradient ungu/pink, neon, glassmorphism di mana-mana, blob acak tanpa fungsi
- Emoji di UI, ikon generik dalam lingkaran berwarna berjajar 3 tanpa alasan
- Kalimat klise: "Selamat datang di website kami", "Mewujudkan generasi emas", "Unggul dalam prestasi, santun dalam pekerti", "di era digital ini", "tidak hanya ... tetapi juga ...", "Lebih dari sekadar sekolah"
- Lorem ipsum. Teks dummy harus Bahasa Indonesia wajar dan spesifik ke konteks SMP di Jambi.
- Tombol/kartu dengan gaya berbeda-beda. Semua komponen memakai token dari `DESIGN.md`.
- Angka statistik tanpa sumber di data (jumlah siswa, guru, alumni) — ambil dari `sekolah.ts`, jika placeholder maka section statistik menampilkan placeholder di dev dan disembunyikan di produksi (PRD F9), bukan angka karangan.
- Animasi yang sama diulang di setiap elemen. Ikuti katalog animasi di `DESIGN.md`.

Wajib:
- Semantik HTML benar (`header`, `nav`, `main`, `section` + heading, `footer`), satu `h1` per halaman
- Setiap gambar punya `alt` yang jujur (foto stok tidak boleh diklaim sebagai foto sekolah)
- Mobile-first, dites di lebar 360px, 768px, 1280px

## Alur kerja
1. Kerjakan per fase sesuai `PROMPT-AWAL.md`. Jangan lompat fase.
2. Di awal fase: tulis rencana singkat (file yang akan dibuat/diubah). Di akhir fase: jalankan `npm run build` dan pastikan tanpa error/warning.
3. Setelah fase UI: jalankan Lighthouse (mobile) di `npm run preview`, laporkan skor Performance, Accessibility, Best Practices, SEO. Target di `PRD.md`.
4. Jangan bilang "selesai" tanpa bukti (output build, skor Lighthouse, atau screenshot).
5. Jika gagal mengunduh sesuatu dari internet, JANGAN mengarang URL. Pakai placeholder dan catat di `docs/ASSETS-TODO.md`.

## Git
- Pesan commit Bahasa Indonesia, format Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`
  - contoh: `feat: tambah section ekstrakurikuler dengan animasi marquee`
- Pesan commit dan deskripsi PR hanya menjelaskan perubahan teknis. JANGAN menyebut AI/Claude dan JANGAN menambahkan trailer `Co-Authored-By` atau atribusi apa pun.
- Satu commit per unit kerja yang masuk akal, bukan satu commit raksasa.
