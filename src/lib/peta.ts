import { sekolah } from "../data/sekolah";
import { isIsi } from "./isian";
import { alamatLengkap } from "./alamat";

/** Kueri peta: koordinat bila ada, selain itu alamat lengkap; `null` selama keduanya belum diisi. */
export function kueriPeta(): string | null {
  const k = sekolah.koordinat;
  if (k) return `${k.lat},${k.lng}`;
  const alamat = alamatLengkap();
  return isIsi(alamat) ? null : `${sekolah.nama}, ${alamat}`;
}

/** "tampil" bila kueri ada; selain itu "placeholder" (dev) / "sembunyi" (produksi). */
export function modePeta(): "tampil" | "placeholder" | "sembunyi" {
  if (kueriPeta()) return "tampil";
  return import.meta.env.DEV ? "placeholder" : "sembunyi";
}
