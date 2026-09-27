/**
 * Helper placeholder (docs/CONTENT.md §2 dan §6).
 * Placeholder = string yang mengandung "[ISI" atau nilai null/undefined.
 */

const POLA_ISI = /\[ISI/;

/** Karakter pengganti placeholder di build produksi. */
export const KOSONG = "–";

type NilaiIsian = string | number | null | undefined;

/** true jika nilai masih placeholder ("[ISI: ...]") atau kosong (null/undefined). */
export function isIsi(v: NilaiIsian): v is string | null | undefined {
  if (v === null || v === undefined) return true;
  return typeof v === "string" && POLA_ISI.test(v);
}

/**
 * Teks untuk ditampilkan. Placeholder → teks placeholder di dev, "–" di produksi.
 * Untuk markup bergaya (garis putus-putus di dev) pakai komponen `<Isian>`.
 */
export function tampil(v: NilaiIsian): string {
  if (!isIsi(v)) return String(v);
  if (import.meta.env.DEV) return v ?? "[ISI]";
  return KOSONG;
}

export type ModeElemen = "tampil" | "placeholder" | "sembunyi";

/**
 * Untuk elemen yang tidak berguna bila datanya placeholder (tombol WA, Maps, section statistik):
 * - data terisi → "tampil"
 * - masih placeholder → "placeholder" di dev, "sembunyi" di produksi
 *
 * Jika diberi array, elemen dianggap placeholder hanya bila SEMUA nilainya placeholder.
 */
export function modeElemen(v: NilaiIsian | readonly NilaiIsian[]): ModeElemen {
  const nilai = Array.isArray(v) ? v : [v];
  if (!nilai.every(isIsi)) return "tampil";
  return import.meta.env.DEV ? "placeholder" : "sembunyi";
}
