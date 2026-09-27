import { sekolah } from "../data/sekolah";
import { isIsi } from "./isian";

/** Pesan awal otomatis (PRD F6). */
export const PESAN_PENDAFTARAN = "Halo, saya ingin bertanya tentang pendaftaran di SMPS YPPAB";

/** Tautan wa.me dengan pesan awal, atau `null` selama nomor WhatsApp masih placeholder. */
export function tautanWhatsApp(pesan: string = PESAN_PENDAFTARAN): string | null {
  const nomor = sekolah.kontak.whatsapp;
  if (isIsi(nomor)) return null;
  return `https://wa.me/${nomor.replace(/\D/g, "")}?text=${encodeURIComponent(pesan)}`;
}
