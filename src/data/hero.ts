/**
 * Slide latar hero beranda (DESIGN.md §6 A18). Urutan = urutan tampil; slide pertama adalah elemen LCP.
 * `posisi` = object-position: `lebar` untuk layar landscape (≈16:9, desktop), `sempit` untuk portrait (≈4:5, mobile).
 * Status "Foto ilustrasi" dibaca otomatis dari src/data/kredit.ts.
 */
export interface SlideHero {
  /** Path relatif terhadap src/assets/images/ */
  src: string;
  alt: string;
  posisi: { lebar: string; sempit: string };
}

export const slideHero: SlideHero[] = [
  {
    src: "stok/hero-1",
    alt: "Ilustrasi: dua siswa SMP berseragam putih-biru membaca bersama di halaman sekolah",
    posisi: { lebar: "50% 15%", sempit: "72% 50%" },
  },
  {
    src: "stok/hero-2",
    alt: "Ilustrasi: siswi anggota Pramuka memegang tongkat dan panji di lapangan perkemahan",
    posisi: { lebar: "60% 35%", sempit: "44% 50%" },
  },
  {
    src: "stok/hero-3",
    alt: "Ilustrasi: tiga siswi anggota Pramuka berbaris membawa tongkat",
    posisi: { lebar: "70% 30%", sempit: "74% 40%" },
  },
];
