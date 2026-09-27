/**
 * Sumber utama kredit foto (docs/ASSETS.md §4, §6). Halaman /kredit-foto dibangkitkan dari sini.
 * Setiap perubahan WAJIB disalin ke docs/ASSETS-CREDITS.md.
 */

export type LisensiFoto = "Unsplash License" | "Pexels License" | "CC0" | "CC BY" | "CC BY-SA";

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

export const kreditFoto: KreditFoto[] = [];
