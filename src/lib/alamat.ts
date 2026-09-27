import { sekolah } from "../data/sekolah";
import { isIsi } from "./isian";

/**
 * Alamat lengkap satu baris dari bagian yang sudah diisi.
 * Selama `jalan` masih placeholder, hasilnya placeholder (baris alamat disembunyikan di produksi lewat saringBaris).
 */
export function alamatLengkap(): string {
  const a = sekolah.alamat;
  if (isIsi(a.jalan)) return a.jalan;
  const bagian = [a.jalan, a.kelurahan, a.kecamatan, a.kabupatenKota, a.provinsi].filter((b) => !isIsi(b));
  const kodePos = isIsi(a.kodePos) ? "" : ` ${a.kodePos}`;
  return `${bagian.join(", ")}${kodePos}`;
}
