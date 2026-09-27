/**
 * Resolver gambar di src/assets/images/ untuk komponen <Foto>.
 * Status "foto ilustrasi" dibaca dari src/data/kredit.ts (field `stok`), bukan ditulis per komponen.
 */
import type { ImageMetadata } from "astro";
import { kreditFoto, type KreditFoto } from "../data/kredit";

const AKAR = "/src/assets/images/";

const gambar = import.meta.glob<{ default: ImageMetadata }>("/src/assets/images/**/*.{jpg,jpeg,png,webp}", {
  eager: true,
});
// SVG diimpor Astro sebagai komponen; placeholder cukup dirender sebagai <img> lewat URL-nya
const placeholder = import.meta.glob<string>("/src/assets/images/**/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
});

export type HasilFoto =
  | { jenis: "gambar"; gambar: ImageMetadata; stok: boolean; kredit: KreditFoto | undefined }
  | { jenis: "placeholder"; url: string };

const tanpaEkstensi = (path: string) => path.replace(/\.[a-z]+$/i, "");

/**
 * Cari gambar berdasarkan path relatif terhadap src/assets/images/, dengan atau tanpa ekstensi.
 * Contoh: "stok/hero-1", "stok/gedung-1" (placeholder SVG), "sekolah/gedung-depan.jpg".
 * Gagal saat build bila tidak ditemukan, supaya salah ketik tidak lolos diam-diam.
 */
export function cariFoto(path: string): HasilFoto {
  const kunci = tanpaEkstensi(path);

  for (const [lokasi, modul] of Object.entries(gambar)) {
    const relatif = lokasi.slice(AKAR.length);
    if (tanpaEkstensi(relatif) !== kunci) continue;
    const kredit = kreditFoto.find((k) => tanpaEkstensi(k.file) === kunci);
    return { jenis: "gambar", gambar: modul.default, stok: kredit?.stok ?? false, kredit };
  }

  for (const [lokasi, url] of Object.entries(placeholder)) {
    if (tanpaEkstensi(lokasi.slice(AKAR.length)) === kunci) return { jenis: "placeholder", url };
  }

  throw new Error(`[foto] Gambar "${path}" tidak ditemukan di src/assets/images/.`);
}

/**
 * Mode tampil foto opsional (CONTENT.md §6, mis. foto gedung):
 * gambar ada → "tampil"; masih placeholder SVG → "placeholder" di dev, "sembunyi" di produksi.
 * Halaman memakai hasil ini untuk menyesuaikan layout (tanpa ruang kosong).
 */
export function modeFoto(path: string): "tampil" | "placeholder" | "sembunyi" {
  if (cariFoto(path).jenis === "gambar") return "tampil";
  return import.meta.env.DEV ? "placeholder" : "sembunyi";
}

/** true jika masih ada foto stok di slot tertentu (mis. "galeri") — untuk kalimat pemberitahuan di halaman. */
export function adaFotoStok(slot: string): boolean {
  return kreditFoto.some((k) => k.slot === slot && k.stok);
}
