/**
 * SATU-SATUNYA sumber fakta sekolah. Aturan: docs/CONTENT.md.
 *
 * - Fakta terverifikasi (NPSN, alamat, telepon, nama orang, biaya, tanggal, dst.) → "[ISI: ...]" sampai ada data asli.
 * - Konten deskriptif boleh dummy, WAJIB `dummy: true` sampai diganti/disetujui sekolah.
 * - Angka statistik → `null` sampai ada data asli.
 *
 * Cek sisa pekerjaan: `npm run cek-konten`.
 */

/** Nilai asli ATAU placeholder "[ISI: keterangan]". Cek dengan `isIsi()` dari `src/lib/isian.ts`. */
export type Isian = string;

export interface Alamat {
  jalan: Isian;
  kelurahan: Isian;
  kecamatan: Isian;
  kabupatenKota: Isian;
  provinsi: Isian;
  kodePos: Isian;
}

export interface Koordinat {
  lat: number;
  lng: number;
}

export interface Orang {
  nama: Isian;
  /** Path gambar di src/assets; `null` → avatar inisial. Jangan pakai foto stok orang. */
  foto: string | null;
}

export interface Guru extends Orang {
  jabatan: Isian;
  dummy: boolean;
}

export interface TeksDummy {
  teks: string;
  dummy: boolean;
}

export interface DaftarDummy {
  daftar: string[];
  dummy: boolean;
}

export interface Keunggulan {
  judul: string;
  deskripsi: string;
  /** Nama ikon Lucide (PascalCase), mis. "BookOpen" */
  ikon: string;
  dummy: boolean;
}

export interface PeristiwaSejarah {
  tahun: Isian;
  judul: string;
  isi: string;
  dummy: boolean;
}

export interface Ekstrakurikuler {
  nama: string;
  jadwal: Isian;
  deskripsi: string;
  /** Slot foto dari docs/ASSETS.md §5, mis. "ekskul-1" */
  gambar: string;
  dummy: boolean;
}

export interface Fasilitas {
  nama: string;
  deskripsi: string;
  /** Slot foto dari docs/ASSETS.md §5, mis. "fasilitas-1" */
  gambar: string;
  dummy: boolean;
}

export interface Gelombang {
  nama: string;
  periode: Isian;
}

export interface LangkahAlur {
  judul: string;
  deskripsi: string;
}

export interface Faq {
  tanya: string;
  jawab: string;
}

export interface Pendaftaran {
  /** true → badge kuning "Pendaftaran Dibuka" tampil */
  dibuka: boolean;
  tahunAjaran: Isian;
  gelombang: Gelombang[];
  syarat: DaftarDummy;
  alur: { langkah: LangkahAlur[]; dummy: boolean };
  biaya: Isian;
  faq: { daftar: Faq[]; dummy: boolean };
}

export interface Statistik {
  siswa: number | null;
  guru: number | null;
  rombel: number | null;
  ekstrakurikuler: number | null;
}

export interface SosialMedia {
  instagram: string | null;
  facebook: string | null;
  youtube: string | null;
  tiktok: string | null;
}

export interface DataSekolah {
  nama: string;
  namaLengkap: Isian;
  status: string;
  jenjang: string;
  npsn: Isian;
  akreditasi: Isian;
  yayasan: Isian;
  tahunBerdiri: Isian;
  kepalaSekolah: Orang;
  alamat: Alamat;
  koordinat: Koordinat | null;
  kontak: {
    telepon: Isian;
    /** Format internasional tanpa "+", mis. 6281234567890 */
    whatsapp: Isian;
    email: Isian;
  };
  jamLayanan: Isian;
  sosialMedia: SosialMedia;
  statistik: Statistik;
  ringkasan: TeksDummy;
  keunggulan: Keunggulan[];
  visi: TeksDummy;
  misi: DaftarDummy;
  sambutan: TeksDummy;
  sejarah: PeristiwaSejarah[];
  ekstrakurikuler: Ekstrakurikuler[];
  fasilitas: Fasilitas[];
  guru: Guru[];
  pendaftaran: Pendaftaran;
}

export const sekolah: DataSekolah = {
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
    kelurahan: "[ISI: kelurahan]",
    kecamatan: "[ISI: kecamatan]",
    kabupatenKota: "[ISI: kabupaten/kota]",
    provinsi: "Jambi",
    kodePos: "[ISI: kode pos]",
  },
  koordinat: null,
  kontak: {
    telepon: "[ISI: nomor telepon sekolah]",
    whatsapp: "[ISI: nomor WhatsApp, format 628xxx]",
    email: "[ISI: email sekolah]",
  },
  jamLayanan: "[ISI: contoh Senin–Jumat 07.00–14.00 WIB]",
  sosialMedia: { instagram: null, facebook: null, youtube: null, tiktok: null },
  statistik: { siswa: null, guru: null, rombel: null, ekstrakurikuler: null },

  ringkasan: {
    teks:
      "SMPS YPPAB adalah sekolah menengah pertama swasta di Provinsi Jambi untuk siswa kelas 7 sampai 9. " +
      "Kami menjalankan Kurikulum Merdeka dengan kelas yang cukup kecil sehingga wali kelas mengenal setiap siswa, " +
      "dan orang tua bisa berkomunikasi langsung dengan guru.",
    dummy: true,
  },

  keunggulan: [
    {
      judul: "Wali kelas yang dekat",
      deskripsi: "Setiap wali kelas memegang satu rombel dan rutin berkabar dengan orang tua tentang perkembangan anak.",
      ikon: "Users",
      dummy: true,
    },
    {
      judul: "Belajar lewat projek",
      deskripsi: "Projek P5 tiap semester mengajak siswa meneliti hal di sekitar mereka, dari sampah plastik sampai kuliner Jambi.",
      ikon: "Lightbulb",
      dummy: true,
    },
    {
      judul: "Pramuka dan ekskul pilihan",
      deskripsi: "Pramuka wajib untuk kelas 7, lalu siswa memilih ekskul olahraga, seni, atau bahasa sesuai minat.",
      ikon: "Tent",
      dummy: true,
    },
    {
      judul: "Siap ANBK",
      deskripsi: "Siswa berlatih di laboratorium komputer sekolah sebelum Asesmen Nasional supaya tidak canggung dengan formatnya.",
      ikon: "Monitor",
      dummy: true,
    },
  ],

  visi: {
    teks: "Menjadi sekolah tempat siswa tumbuh jujur, mandiri, dan berani bertanya, dengan dasar ilmu yang kuat untuk jenjang berikutnya.",
    dummy: true,
  },

  misi: {
    daftar: [
      "Menjalankan pembelajaran Kurikulum Merdeka yang memberi ruang bagi siswa untuk bertanya dan mencoba.",
      "Membiasakan disiplin sederhana setiap hari: datang tepat waktu, menjaga kebersihan kelas, dan menepati janji.",
      "Mengembangkan minat siswa lewat Pramuka, OSIS, dan ekstrakurikuler pilihan.",
      "Mengenalkan budaya Jambi melalui projek P5 dan kegiatan seni sekolah.",
      "Menjalin komunikasi rutin antara wali kelas dan orang tua.",
    ],
    dummy: true,
  },

  sambutan: {
    teks:
      "Terima kasih sudah meluangkan waktu mengenal SMPS YPPAB. Masa SMP adalah tiga tahun yang singkat tetapi penting: " +
      "anak-anak mulai mencari minat, belajar mengatur waktu, dan membangun pertemanan yang sering bertahan lama. " +
      "Di sekolah ini, kami berusaha menjaga suasana belajar yang tertib dan hangat. Guru mengenal nama siswanya, " +
      "orang tua tahu harus menghubungi siapa, dan siswa tahu bahwa bertanya bukan hal yang memalukan. " +
      "Silakan jelajahi halaman ini, atau datang langsung ke sekolah pada jam layanan. Kami senang menerima kunjungan.",
    dummy: true,
  },

  sejarah: [
    {
      tahun: "[ISI: tahun]",
      judul: "Sekolah didirikan",
      isi: "Yayasan membuka SMP untuk menampung lulusan SD di sekitar lingkungan sekolah. Kegiatan belajar dimulai dengan beberapa rombel kelas 7.",
      dummy: true,
    },
    {
      tahun: "[ISI: tahun]",
      judul: "Gedung dan ruang belajar bertambah",
      isi: "Ruang kelas baru dan perpustakaan dibangun seiring bertambahnya jumlah siswa.",
      dummy: true,
    },
    {
      tahun: "[ISI: tahun]",
      judul: "Menerapkan Kurikulum Merdeka",
      isi: "Sekolah mulai menjalankan Kurikulum Merdeka, termasuk projek P5 untuk setiap jenjang kelas.",
      dummy: true,
    },
  ],

  ekstrakurikuler: [
    {
      nama: "Pramuka",
      jadwal: "[ISI: hari dan jam]",
      deskripsi: "Ekskul wajib kelas 7. Latihan tali-temali, baris-berbaris, dan kemah akhir semester.",
      gambar: "ekskul-1",
      dummy: true,
    },
    {
      nama: "Futsal",
      jadwal: "[ISI: hari dan jam]",
      deskripsi: "Latihan teknik dasar dan kerja sama tim, dilanjutkan pertandingan persahabatan antarkelas.",
      gambar: "ekskul-2",
      dummy: true,
    },
    {
      nama: "Paskibra",
      jadwal: "[ISI: hari dan jam]",
      deskripsi: "Melatih baris-berbaris dan kedisiplinan. Anggota bertugas pada upacara bendera sekolah.",
      gambar: "ekskul-3",
      dummy: true,
    },
    {
      nama: "Tari Tradisional",
      jadwal: "[ISI: hari dan jam]",
      deskripsi: "Mempelajari tari daerah Melayu Jambi untuk tampil di acara sekolah dan peringatan hari besar.",
      gambar: "ekskul-4",
      dummy: true,
    },
    {
      nama: "PMR",
      jadwal: "[ISI: hari dan jam]",
      deskripsi: "Belajar pertolongan pertama dan membantu petugas UKS saat upacara atau kegiatan olahraga.",
      gambar: "ekskul-5",
      dummy: true,
    },
    {
      nama: "English Club",
      jadwal: "[ISI: hari dan jam]",
      deskripsi: "Latihan percakapan bahasa Inggris lewat permainan, drama pendek, dan presentasi kelompok.",
      gambar: "ekskul-6",
      dummy: true,
    },
  ],

  fasilitas: [
    {
      nama: "Ruang Kelas",
      deskripsi: "Ruang belajar dengan meja siswa, papan tulis, dan ventilasi yang cukup untuk kegiatan harian.",
      gambar: "fasilitas-1",
      dummy: true,
    },
    {
      nama: "Laboratorium IPA",
      deskripsi: "Tempat praktikum IPA sederhana seperti pengamatan mikroskop dan percobaan listrik dasar.",
      gambar: "fasilitas-2",
      dummy: true,
    },
    {
      nama: "Perpustakaan",
      deskripsi: "Koleksi buku pelajaran dan bacaan umum. Siswa bisa meminjam buku pada jam istirahat.",
      gambar: "fasilitas-3",
      dummy: true,
    },
    {
      nama: "Laboratorium Komputer",
      deskripsi: "Dipakai untuk pelajaran informatika dan latihan sebelum ANBK.",
      gambar: "fasilitas-4",
      dummy: true,
    },
    {
      nama: "Lapangan Olahraga",
      deskripsi: "Lapangan untuk upacara bendera, pelajaran PJOK, dan latihan ekstrakurikuler.",
      gambar: "fasilitas-5",
      dummy: true,
    },
    {
      nama: "UKS",
      deskripsi: "Ruang kesehatan untuk pertolongan pertama bagi siswa yang sakit saat jam sekolah.",
      gambar: "fasilitas-6",
      dummy: true,
    },
  ],

  guru: Array.from({ length: 8 }, () => ({
    nama: "[ISI: nama guru]",
    jabatan: "[ISI: jabatan/mata pelajaran]",
    foto: null,
    dummy: true,
  })),

  pendaftaran: {
    dibuka: false,
    tahunAjaran: "[ISI: tahun ajaran, mis. 2027/2028]",
    gelombang: [
      { nama: "Gelombang 1", periode: "[ISI: tanggal mulai – tanggal selesai]" },
      { nama: "Gelombang 2", periode: "[ISI: tanggal mulai – tanggal selesai]" },
    ],
    syarat: {
      daftar: [
        "Fotokopi ijazah SD/MI atau surat keterangan lulus",
        "Fotokopi akta kelahiran",
        "Fotokopi Kartu Keluarga",
        "Pas foto berwarna ukuran 3×4",
        "Nomor NISN siswa",
      ],
      dummy: true,
    },
    alur: {
      langkah: [
        { judul: "Hubungi sekolah", deskripsi: "Tanyakan jadwal dan kuota lewat WhatsApp atau datang pada jam layanan." },
        { judul: "Ambil dan isi formulir", deskripsi: "Formulir pendaftaran tersedia di ruang tata usaha." },
        { judul: "Serahkan berkas", deskripsi: "Bawa formulir yang sudah diisi beserta berkas persyaratan." },
        { judul: "Tunggu pengumuman", deskripsi: "Sekolah menghubungi orang tua untuk menyampaikan hasil pendaftaran." },
        { judul: "Daftar ulang", deskripsi: "Selesaikan daftar ulang, lalu siswa mengikuti MPLS di awal tahun ajaran." },
      ],
      dummy: true,
    },
    biaya: "[ISI: rincian biaya pendaftaran dan SPP]",
    faq: {
      daftar: [
        {
          tanya: "Kapan Penerimaan Murid Baru (SPMB) dibuka?",
          jawab: "Jadwal setiap gelombang diumumkan di halaman ini. Untuk kepastian, hubungi sekolah lewat WhatsApp pada jam layanan.",
        },
        {
          tanya: "Apakah bisa mendaftar sebelum ijazah SD keluar?",
          jawab: "Bisa memakai surat keterangan lulus dari SD. Ijazah diserahkan setelah terbit.",
        },
        {
          tanya: "Berapa biaya sekolah per bulan?",
          jawab: "Rincian biaya tercantum di bagian Biaya pada halaman ini. Jika belum tercantum, tanyakan langsung ke tata usaha.",
        },
        {
          tanya: "Apakah orang tua boleh berkunjung sebelum mendaftar?",
          jawab: "Boleh. Datang pada jam layanan dan sampaikan ke bagian tata usaha bahwa Anda ingin bertanya tentang pendaftaran.",
        },
      ],
      dummy: true,
    },
  },
};
