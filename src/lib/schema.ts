/**
 * JSON-LD dari src/data/sekolah.ts (docs/SEO.md §4).
 * Field bernilai placeholder / null DIHAPUS, tidak pernah diisi karangan. `logo` sengaja tidak ada sampai ada logo resmi.
 */
import { sekolah } from "../data/sekolah";
import { isIsi } from "./isian";

type Json = Record<string, unknown>;

/** Hapus properti bernilai placeholder, null, undefined, string kosong, array/objek kosong (rekursif). */
export function bersihkan<T>(nilai: T): T | undefined {
  if (Array.isArray(nilai)) {
    const isi = nilai.map(bersihkan).filter((v) => v !== undefined);
    return (isi.length > 0 ? isi : undefined) as T | undefined;
  }
  if (nilai !== null && typeof nilai === "object") {
    const hasil: Json = {};
    for (const [k, v] of Object.entries(nilai)) {
      const b = bersihkan(v);
      if (b !== undefined) hasil[k] = b;
    }
    const kunciData = Object.keys(hasil).filter((k) => !k.startsWith("@"));
    return (kunciData.length > 0 ? hasil : undefined) as T | undefined;
  }
  if (typeof nilai === "string" && (nilai.trim() === "" || isIsi(nilai))) return undefined;
  if (nilai === null || nilai === undefined) return undefined;
  return nilai;
}

/** Variasi nama untuk alternateName (SEO.md §1). */
const NAMA_ALTERNATIF = ["SMP YPPAB", "SMP Swasta YPPAB", "SMP YPPAB Jambi", sekolah.namaLengkap];

/** Schema `School` untuk semua halaman. */
export function buatSchema(site: URL): Json {
  const { alamat, kontak, koordinat, sosialMedia } = sekolah;
  const schema = {
    "@context": "https://schema.org",
    "@type": "School",
    "@id": new URL("/#sekolah", site).href,
    name: sekolah.nama,
    alternateName: NAMA_ALTERNATIF,
    url: new URL("/", site).href,
    address: {
      "@type": "PostalAddress",
      streetAddress: alamat.jalan,
      addressLocality: alamat.kabupatenKota,
      addressRegion: alamat.provinsi,
      postalCode: alamat.kodePos,
      addressCountry: "ID",
    },
    telephone: kontak.telepon,
    email: kontak.email,
    geo: koordinat && { "@type": "GeoCoordinates", latitude: koordinat.lat, longitude: koordinat.lng },
    sameAs: Object.values(sosialMedia),
  };
  return bersihkan(schema) ?? {};
}

export interface ItemBreadcrumb {
  label: string;
  href: string;
}

/** Schema `BreadcrumbList`; item pertama selalu Beranda. */
export function buatSchemaBreadcrumb(item: ItemBreadcrumb[], site: URL): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: item.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.label,
      item: new URL(b.href, site).href,
    })),
  };
}
