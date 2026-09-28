/**
 * Foto latar hero halaman dalam (PageHero). Dicari BaseLayout berdasarkan path halaman.
 * Dipilih foto yang TIDAK tampil lagi di halaman yang sama. Status "Foto ilustrasi" otomatis dari kredit.ts.
 * `posisi` = object-position (desktop landscape / mobile portrait).
 */
export interface LatarHero {
  /** Path relatif terhadap src/assets/images/ */
  src: string;
  alt: string;
  posisi?: { lebar: string; sempit: string };
}

export const latarHalaman: Record<string, LatarHero> = {
  "/profil/": {
    src: "stok/kegiatan-kelas-3",
    alt: "Ilustrasi: siswa SMP berseragam batik menulis di buku catatan",
    posisi: { lebar: "50% 40%", sempit: "60% 50%" },
  },
  "/guru-dan-staf/": {
    src: "stok/galeri-9",
    alt: "Ilustrasi: guru mengajar di depan kelas",
    posisi: { lebar: "60% 45%", sempit: "85% 50%" },
  },
  "/ekstrakurikuler/": {
    src: "stok/galeri-2",
    alt: "Ilustrasi: anak berseragam Pramuka berlari di selasar sekolah",
    posisi: { lebar: "50% 45%", sempit: "45% 50%" },
  },
  "/fasilitas/": {
    src: "stok/kegiatan-kelas-1",
    alt: "Ilustrasi: ruang kelas dengan siswa belajar di meja kayu",
    posisi: { lebar: "50% 55%", sempit: "60% 50%" },
  },
  "/galeri/": {
    src: "stok/berita-2",
    alt: "Ilustrasi: upacara bendera di lapangan terbuka",
    posisi: { lebar: "50% 55%", sempit: "70% 50%" },
  },
  "/pendaftaran/": {
    src: "stok/berita-6",
    alt: "Ilustrasi: siswa berseragam sekolah membaca bersama di lapangan rumput",
    posisi: { lebar: "50% 40%", sempit: "35% 50%" },
  },
  "/kontak/": {
    src: "stok/galeri-7",
    alt: "Ilustrasi: siswa SMP berseragam biru duduk bersama di selasar sekolah",
    posisi: { lebar: "50% 50%", sempit: "40% 50%" },
  },
};

/** Latar untuk halaman lain yang memakai PageHero (404, kredit foto). */
export const latarBawaan: LatarHero = {
  src: "stok/berita-1",
  alt: "Ilustrasi: guru mendampingi siswa di halaman sekolah",
  posisi: { lebar: "50% 40%", sempit: "45% 50%" },
};
