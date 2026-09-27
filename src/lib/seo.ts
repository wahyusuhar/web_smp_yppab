/** Aturan on-page SEO (docs/SEO.md §2). */
import { sekolah } from "../data/sekolah";
import { isIsi } from "./isian";

/** Title beranda: kota disebut hanya bila sudah diisi (SEO §2, CONTENT §6). */
export function judulBeranda(): string {
  const kota = sekolah.alamat.kabupatenKota;
  return isIsi(kota) ? "SMPS YPPAB – SMP Swasta di Jambi" : `SMPS YPPAB – SMP Swasta di ${kota}, Jambi`;
}

/** Peringatan saat build bila title/description di luar aturan SEO §2. Tidak menggagalkan build. */
export function periksaMeta(pathname: string, judul: string, deskripsi: string): void {
  const masalah: string[] = [];
  if (judul.length > 60) masalah.push(`title ${judul.length} karakter (maks 60)`);
  if (deskripsi.length < 140 || deskripsi.length > 160) {
    masalah.push(`description ${deskripsi.length} karakter (harus 140–160)`);
  }
  if (!deskripsi.includes("SMPS YPPAB")) masalah.push('description tidak menyebut "SMPS YPPAB"');
  if (masalah.length > 0) console.warn(`[seo] ${pathname}: ${masalah.join("; ")}`);
}
