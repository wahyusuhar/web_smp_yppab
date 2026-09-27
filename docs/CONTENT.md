# CONTENT.md — Aturan Data & Konten

## 1. Prinsip
Website ini untuk sekolah sungguhan dan akan diindeks Google. Informasi palsu yang terlihat seperti fakta
(alamat, nomor telepon, akreditasi) akan menyesatkan orang tua dan merusak SEO lokal. Karena itu konten dibagi tiga:

| Kategori | Contoh | Boleh dikarang? | Cara menulis |
|---|---|---|---|
| **Fakta terverifikasi** | NPSN, akreditasi, alamat, telepon, email, WA, koordinat, tahun berdiri, nama kepala sekolah & guru, nama yayasan, biaya | TIDAK | `"[ISI: ...]"` |
| **Konten deskriptif** | Sambutan, visi, misi, sejarah naratif, deskripsi ekskul/fasilitas, FAQ, berita contoh | YA (dummy) | tulis wajar + `dummy: true` |
| **Angka** | Jumlah siswa, guru, rombel, ekskul | TIDAK sebagai fakta | `null` → counter tidak jalan. Nilai `null` tunggal tampil "–"; bila SEMUA statistik `null`, section statistik tampil placeholder di dev dan disembunyikan di produksi |

Kategori "boleh dummy" hanya agar desain terlihat penuh. Semuanya wajib diganti/disetujui sekolah sebelum rilis.

## 2. Struktur `src/data/sekolah.ts`
```ts
export type Isian = string; // nilai asli ATAU "[ISI: keterangan]"
export const sekolah = {
  nama: "SMPS YPPAB",
  namaLengkap: "[ISI: kepanjangan YPPAB]",
  status: "Swasta",
  jenjang: "SMP",
  npsn: "[ISI: NPSN]",
  akreditasi: "[ISI: akreditasi & tahun]",
  yayasan: "[ISI: nama yayasan]",
  tahunBerdiri: "[ISI: tahun berdiri]",
  kepalaSekolah: { nama: "[ISI: nama kepala sekolah]", foto: null },
  alamat: {
    jalan: "[ISI: jalan]",
    kelurahan: "[ISI]", kecamatan: "[ISI]", kabupatenKota: "[ISI]",
    provinsi: "Jambi", kodePos: "[ISI]",
  },
  koordinat: null as null | { lat: number; lng: number },
  kontak: { telepon: "[ISI]", whatsapp: "[ISI: format 628xxx]", email: "[ISI]" },
  jamLayanan: "[ISI: contoh Senin–Jumat 07.00–14.00 WIB]",
  sosialMedia: { instagram: null, facebook: null, youtube: null, tiktok: null },
  statistik: { siswa: null, guru: null, rombel: null, ekstrakurikuler: null },
  visi: { teks: "...", dummy: true },
  misi: { daftar: ["..."], dummy: true },
  sambutan: { teks: "...", dummy: true },
  sejarah: [{ tahun: "[ISI]", judul: "...", isi: "...", dummy: true }],
  ekstrakurikuler: [{ nama: "Pramuka", jadwal: "[ISI]", deskripsi: "...", dummy: true }],
  fasilitas: [{ nama: "...", deskripsi: "...", gambar: "...", dummy: true }],
  guru: [{ nama: "[ISI]", jabatan: "[ISI]", foto: null, dummy: true }],
  pendaftaran: { dibuka: false, gelombang: [], syarat: [], alur: [], biaya: "[ISI]", faq: [] },
} as const;
```
Helper wajib (`src/lib/isian.ts`):
- `isIsi(v)` — true jika placeholder (`"[ISI: ...]"`, `null`, `undefined`).
- `tampil(v)` + komponen `<Isian>` — nilai tunggal di dalam kalimat: placeholder bergaris putus-putus di dev, "–" di produksi.
- `saringBaris(baris)` — baris berlabel (tabel identitas, daftar kontak, jadwal): di dev semua baris tampil
  (placeholder bergaris putus-putus), di produksi baris yang nilainya placeholder **disembunyikan seluruhnya**, bukan tampil "–".
- `modeElemen(v)` — elemen utuh yang bergantung pada data (lihat §6).

## 3. Gaya penulisan dummy
- Bahasa Indonesia baku tapi hangat, kalimat pendek, sudut pandang sekolah ("kami").
- Spesifik ke SMP: kelas 7–9, Kurikulum Merdeka, P5 (Projek Penguatan Profil Pelajar Pancasila), MPLS, ANBK, OSIS, Pramuka wajib.
- Boleh menyebut konteks Jambi secara umum (mis. Batik Jambi, Sungai Batanghari) untuk kegiatan budaya dummy — tanpa klaim spesifik.
- Tanpa klise yang dilarang di `CLAUDE.md`. Tanpa superlatif ("terbaik", "nomor satu", "terfavorit").
- Istilah penerimaan murid: "Penerimaan Murid Baru (SPMB)".

## 4. Berita dummy
- Buat 6 artikel di `src/content/berita/`, masing-masing 250–450 kata, `dummy: true`, tanggal 2026.
- Topik wajar untuk SMP: MPLS, upacara HUT RI, kegiatan P5, perkemahan Pramuka, ANBK, pembukaan SPMB.
- Judul tanpa angka prestasi palsu dan tanpa nama orang sungguhan.
- Tampilkan label kecil "Contoh" pada kartu berita `dummy: true` — di dev DAN produksi, selama masih dummy.
  Berlaku juga untuk konten dummy lain yang tampil sebagai kartu (ekskul, fasilitas, guru, dst.).

## 5. Script `npm run cek-konten`
`scripts/cek-konten.mjs` memindai `src/` dan mencetak tabel: file, baris, jenis (`[ISI]` / `dummy` / `null` statistik).
Keluar dengan kode 0 (hanya laporan), kecuali dijalankan dengan `--ketat` → kode 1 jika masih ada placeholder `[ISI]`,
konten `dummy: true`, atau `PUBLIC_SITE_URL` belum diisi (dipakai sebelum rilis).
Statistik `null` tetap dilaporkan tetapi tidak menggagalkan `--ketat` (section statistik disembunyikan di produksi).
Dummy yang sudah disetujui sekolah dilepas flag `dummy`-nya, bukan dibiarkan.

## 6. Elemen yang bergantung pada data placeholder
Elemen yang tidak berguna atau rusak bila datanya placeholder (tautan `wa.me`, tombol WhatsApp melayang, Maps embed,
section statistik) mengikuti pola yang sama: **dev → kotak placeholder, produksi → disembunyikan**, dan otomatis muncul saat data diisi.
Maps memakai `koordinat`, atau alamat lengkap bila koordinat masih `null`.
Title beranda menghilangkan kota selama `alamat.kabupatenKota` placeholder (lihat SEO.md §2).

**Foto gedung** (`stok/gedung-1`): selama masih placeholder SVG, di build produksi bingkai foto gedung TIDAK dirender dan
layout di sekitarnya menyesuaikan (tidak ada ruang kosong); di dev placeholder tetap tampil. Komponen `Foto` dengan prop
`opsional` + helper `modeFoto()` (src/lib/foto.ts) — halaman memakai `modeFoto()` untuk memilih layout.
Gambar OG memakai versi teks (`public/og/og-default.png`) sampai foto gedung asli ada.
