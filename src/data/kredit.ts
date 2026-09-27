/**
 * Sumber utama kredit foto (docs/ASSETS.md §4, §6). Halaman /kredit-foto dibangkitkan dari sini.
 * Setiap perubahan WAJIB disalin ke docs/ASSETS-CREDITS.md.
 */

/** Lisensi CC ditulis lengkap dengan versinya (wajib untuk atribusi). */
export type LisensiFoto =
  | "Unsplash License"
  | "Pexels License"
  | "CC0"
  | "CC BY 3.0"
  | "CC BY 4.0"
  | "CC BY-SA 3.0"
  | "CC BY-SA 4.0";

export interface KreditFoto {
  /** Slot dari docs/ASSETS.md §5, mis. "hero", "fasilitas" */
  slot: string;
  /** Nama file di src/assets/images/stok/ */
  file: string;
  /** URL halaman foto (bukan URL file gambar) */
  sumber: string;
  fotografer: string;
  lisensi: LisensiFoto;
  /** Format YYYY-MM-DD */
  tanggalUnduh: string;
}

export const kreditFoto: KreditFoto[] = [
  {
    slot: "hero",
    file: "hero-1.jpg",
    sumber: "https://www.pexels.com/photo/boys-and-girls-in-school-uniforms-at-picnic-12719300/",
    fotografer: "Roman Odintsov",
    lisensi: "Pexels License",
    tanggalUnduh: "2026-09-28",
  },
  {
    slot: "kegiatan-kelas",
    file: "kegiatan-kelas-1.jpg",
    sumber: "https://www.pexels.com/photo/students-learning-in-a-classroom-in-indonesia-35548840/",
    fotografer: "el jusuf",
    lisensi: "Pexels License",
    tanggalUnduh: "2026-09-28",
  },
  {
    slot: "kegiatan-kelas",
    file: "kegiatan-kelas-2.jpg",
    sumber: "https://commons.wikimedia.org/wiki/File:Literasi_Siswa_SMP_Negeri_Satap_Oebelo_Kab.TTS.jpg",
    fotografer: "Dianadola",
    lisensi: "CC BY-SA 4.0",
    tanggalUnduh: "2026-09-28",
  },
  {
    slot: "kegiatan-kelas",
    file: "kegiatan-kelas-3.jpg",
    sumber: "https://commons.wikimedia.org/wiki/File:Student_at_SMP_Negeri_2_Kotabaru.jpg",
    fotografer: "RusdianaDablang",
    lisensi: "CC BY-SA 4.0",
    tanggalUnduh: "2026-09-28",
  },
  {
    slot: "ekskul",
    file: "ekskul-1.jpg",
    sumber: "https://unsplash.com/photos/group-of-men-in-white-uniform-standing-on-gray-concrete-floor-during-daytime-7FFRe4xfRrg",
    fotografer: "Mufid Majnun",
    lisensi: "Unsplash License",
    tanggalUnduh: "2026-09-28",
  },
  {
    slot: "ekskul",
    file: "ekskul-2.jpg",
    sumber: "https://unsplash.com/photos/white-and-black-soccer-ball-on-blue-surface-BcXIge33B0c",
    fotografer: "Patrick Rosenberger (Schneider)",
    lisensi: "Unsplash License",
    tanggalUnduh: "2026-09-28",
  },
  {
    slot: "ekskul",
    file: "ekskul-3.jpg",
    sumber: "https://unsplash.com/photos/people-in-white-uniform-holding-flags-during-daytime-yv6ThE76y_M",
    fotografer: "Mufid Majnun",
    lisensi: "Unsplash License",
    tanggalUnduh: "2026-09-28",
  },
  {
    slot: "ekskul",
    file: "ekskul-4.jpg",
    sumber: "https://www.pexels.com/photo/dancers-in-indonesian-costumes-performing-traditional-dance-on-stage-11787164/",
    fotografer: "Candra Adi Pratama",
    lisensi: "Pexels License",
    tanggalUnduh: "2026-09-28",
  },
  {
    slot: "fasilitas",
    file: "fasilitas-1.jpg",
    sumber: "https://www.pexels.com/photo/empty-armchairs-near-windows-9780101/",
    fotografer: "Jeisson Ortiz",
    lisensi: "Pexels License",
    tanggalUnduh: "2026-09-28",
  },
  {
    slot: "fasilitas",
    file: "fasilitas-2.jpg",
    sumber: "https://www.pexels.com/photo/microscopes-on-desk-19393166/",
    fotografer: "Vladimir Srajber",
    lisensi: "Pexels License",
    tanggalUnduh: "2026-09-28",
  },
  {
    slot: "fasilitas",
    file: "fasilitas-3.jpg",
    sumber: "https://www.pexels.com/photo/brown-wooden-bookshelves-with-books-6981010/",
    fotografer: "Mikhail Nilov",
    lisensi: "Pexels License",
    tanggalUnduh: "2026-09-28",
  },
  {
    slot: "fasilitas",
    file: "fasilitas-5.jpg",
    sumber: "https://www.pexels.com/photo/view-of-a-basketball-court-6863847/",
    fotografer: "Alfin Auzikri",
    lisensi: "Pexels License",
    tanggalUnduh: "2026-09-28",
  },
  {
    slot: "fasilitas",
    file: "fasilitas-6.jpg",
    sumber: "https://unsplash.com/photos/black-and-gray-stethoscope-yo01Z-9HQAw",
    fotografer: "Hush Naidoo Jade Photography",
    lisensi: "Unsplash License",
    tanggalUnduh: "2026-09-28",
  },
  {
    slot: "galeri",
    file: "galeri-1.jpg",
    sumber: "https://www.pexels.com/photo/a-group-of-students-sitting-on-the-field-12719273/",
    fotografer: "Roman Odintsov",
    lisensi: "Pexels License",
    tanggalUnduh: "2026-09-28",
  },
  {
    slot: "galeri",
    file: "galeri-2.jpg",
    sumber: "https://unsplash.com/photos/boys-running-on-hallway-xDD1eaFQ600",
    fotografer: "Husniati Salma",
    lisensi: "Unsplash License",
    tanggalUnduh: "2026-09-28",
  },
  {
    slot: "galeri",
    file: "galeri-3.jpg",
    sumber: "https://unsplash.com/photos/boy-reading-a-paper-CdSNG04vclA",
    fotografer: "Husniati Salma",
    lisensi: "Unsplash License",
    tanggalUnduh: "2026-09-28",
  },
  {
    slot: "galeri",
    file: "galeri-4.jpg",
    sumber: "https://unsplash.com/photos/shallow-focus-photo-of-people-holding-indonesia-flag-7tXqXcVcLDM",
    fotografer: "Hobi industri",
    lisensi: "Unsplash License",
    tanggalUnduh: "2026-09-28",
  },
  {
    slot: "galeri",
    file: "galeri-5.jpg",
    sumber: "https://unsplash.com/photos/a-young-boy-sitting-at-a-desk-in-a-classroom-gtOpUWtSzlo",
    fotografer: "ochimax studio",
    lisensi: "Unsplash License",
    tanggalUnduh: "2026-09-28",
  },
  {
    slot: "galeri",
    file: "galeri-6.jpg",
    sumber: "https://unsplash.com/photos/group-of-people-playing-soccer-on-field-during-daytime-LSOTmGcdaKQ",
    fotografer: "Falaq Lazuardi",
    lisensi: "Unsplash License",
    tanggalUnduh: "2026-09-28",
  },
  {
    slot: "galeri",
    file: "galeri-7.jpg",
    sumber: "https://commons.wikimedia.org/wiki/File:Siswa_siswi_yang_sedang_menonton_clasmeet.jpg",
    fotografer: "Dafayz",
    lisensi: "CC0",
    tanggalUnduh: "2026-09-28",
  },
  {
    slot: "galeri",
    file: "galeri-8.jpg",
    sumber: "https://www.pexels.com/photo/indonesian-classroom-with-students-and-teacher-35548842/",
    fotografer: "el jusuf",
    lisensi: "Pexels License",
    tanggalUnduh: "2026-09-28",
  },
  {
    slot: "galeri",
    file: "galeri-9.jpg",
    sumber: "https://www.pexels.com/photo/indonesian-classroom-scene-with-teacher-and-students-35548841/",
    fotografer: "el jusuf",
    lisensi: "Pexels License",
    tanggalUnduh: "2026-09-28",
  },
  {
    slot: "berita",
    file: "berita-1.jpg",
    sumber: "https://unsplash.com/photos/a-group-of-people-in-clothing-meovJ4hqaao",
    fotografer: "Fajar Herlambang STUDIO",
    lisensi: "Unsplash License",
    tanggalUnduh: "2026-09-28",
  },
  {
    slot: "berita",
    file: "berita-2.jpg",
    sumber: "https://unsplash.com/photos/people-gathering-on-green-grass-field-during-daytime-La3MwNrgEDc",
    fotografer: "Mufid Majnun",
    lisensi: "Unsplash License",
    tanggalUnduh: "2026-09-28",
  },
  {
    slot: "berita",
    file: "berita-3.jpg",
    sumber: "https://www.pexels.com/photo/a-group-of-students-having-a-picnic-12719261/",
    fotografer: "Roman Odintsov",
    lisensi: "Pexels License",
    tanggalUnduh: "2026-09-28",
  },
  {
    slot: "berita",
    file: "berita-4.jpg",
    sumber: "https://www.pexels.com/photo/children-posing-together-13584775/",
    fotografer: "Ibad Badrul",
    lisensi: "Pexels License",
    tanggalUnduh: "2026-09-28",
  },
  {
    slot: "berita",
    file: "berita-5.jpg",
    sumber: "https://unsplash.com/photos/students-are-taking-a-test-in-a-classroom-TmdrCRVDOnQ",
    fotografer: "Fajar Herlambang STUDIO",
    lisensi: "Unsplash License",
    tanggalUnduh: "2026-09-28",
  },
  {
    slot: "berita",
    file: "berita-6.jpg",
    sumber: "https://www.pexels.com/photo/a-group-of-students-reading-12719306/",
    fotografer: "Roman Odintsov",
    lisensi: "Pexels License",
    tanggalUnduh: "2026-09-28",
  },
];
