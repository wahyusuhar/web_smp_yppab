/**
 * Foto galeri (docs/ASSETS.md §5, slot galeri). Alt foto stok diawali "Ilustrasi:" (ASSETS §4).
 * Status "Foto ilustrasi" dibaca otomatis dari src/data/kredit.ts. Slot 10–12 masih placeholder (ASSETS-TODO.md).
 */
export interface FotoGaleri {
  /** Path relatif terhadap src/assets/images/ */
  src: string;
  alt: string;
}

export const fotoGaleri: FotoGaleri[] = [
  { src: "stok/galeri-1", alt: "Ilustrasi: empat siswa berseragam sekolah belajar bersama di lapangan rumput" },
  { src: "stok/galeri-2", alt: "Ilustrasi: anak berseragam Pramuka berlari di selasar sekolah" },
  { src: "stok/galeri-3", alt: "Ilustrasi: siswa berikat kepala merah-putih membaca lembar teks" },
  { src: "stok/galeri-4", alt: "Ilustrasi: pelajar mengibarkan bendera merah-putih pada upacara 17 Agustus" },
  { src: "stok/galeri-5", alt: "Ilustrasi: siswa duduk di bangku kayu di dalam kelas" },
  { src: "stok/galeri-6", alt: "Ilustrasi: remaja bermain futsal di lapangan berpagar" },
  { src: "stok/galeri-7", alt: "Ilustrasi: siswa SMP berseragam biru duduk menonton class meeting" },
  { src: "stok/galeri-8", alt: "Ilustrasi: suasana kelas dengan siswa berseragam batik" },
  { src: "stok/galeri-9", alt: "Ilustrasi: guru mengajar di depan kelas" },
  { src: "stok/galeri-10", alt: "Placeholder foto galeri" },
  { src: "stok/galeri-11", alt: "Placeholder foto galeri" },
  { src: "stok/galeri-12", alt: "Placeholder foto galeri" },
];
