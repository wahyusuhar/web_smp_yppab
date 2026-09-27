#!/usr/bin/env node
/**
 * Daftar pekerjaan sebelum rilis (docs/CONTENT.md §5).
 * Memindai src/ dan mencetak semua placeholder "[ISI", konten `dummy: true`, dan statistik `null`.
 *
 *   npm run cek-konten              → laporan saja, selalu keluar dengan kode 0
 *   npm run cek-konten -- --ketat   → kode 1 jika masih ada placeholder [ISI], `dummy: true`,
 *                                      atau PUBLIC_SITE_URL belum diisi. Statistik null dilaporkan, tidak menggagalkan.
 */
import { readdir, readFile } from "node:fs/promises";
import { join, relative, extname, sep } from "node:path";
import { loadEnv } from "vite";

const AKAR = process.cwd();
const FOLDER_PINDAI = join(AKAR, "src");
const EKSTENSI = new Set([".ts", ".astro", ".md", ".mdx", ".js", ".mjs", ".json"]);
// File yang memang berisi pola placeholder sebagai kode, bukan data
const DIABAIKAN = new Set(["src/lib/isian.ts", "src/components/Isian.astro"]);
const SITE_FALLBACK = "https://example.com";

const POLA_ISI = /\[ISI[^\]"'`]*\]?/g;
const POLA_DUMMY = /\bdummy\s*:\s*true\b/;
const POLA_AWAL_STATISTIK = /\bstatistik\s*:\s*\{/;
const POLA_STAT_NULL = /\b(\w+)\s*:\s*null\b/g;

// `npm run cek-konten --ketat` (tanpa `--`) diteruskan npm sebagai env npm_config_ketat
const ketat = process.argv.includes("--ketat") || process.env.npm_config_ketat === "true";

async function* telusuri(folder) {
  for (const entri of await readdir(folder, { withFileTypes: true })) {
    const jalur = join(folder, entri.name);
    if (entri.isDirectory()) yield* telusuri(jalur);
    else if (EKSTENSI.has(extname(entri.name))) yield jalur;
  }
}

function barisKomentar(baris) {
  const t = baris.trim();
  return t.startsWith("//") || t.startsWith("/*") || t.startsWith("*");
}

const POLA_LABEL = /\b(?:nama|judul)\s*:\s*["'`]([^"'`]+)/;
const POLA_INDUK = /^\s*(\w+)\s*:/;
const hitungKarakter = (teks, pola) => (teks.match(pola) ?? []).length;

/**
 * Nama item pemilik baris `dummy: true` (field `nama`/`judul` di objek yang sama, atau nama properti induknya),
 * supaya laporan bisa dibaca tanpa membuka file. Menelusuri ke atas sambil menghitung kedalaman kurung.
 */
function konteksDummy(semuaBaris, indeks) {
  const barisIni = semuaBaris[indeks];
  if (!/^\s*dummy\s*:/.test(barisIni)) return potong(barisIni);
  let kedalaman = 0;
  for (let i = indeks - 1; i >= Math.max(0, indeks - 40); i--) {
    const isi = semuaBaris[i];
    const label = isi.match(POLA_LABEL);
    if (kedalaman === 0 && label && !label[1].startsWith("[ISI")) return potong(label[1]);
    kedalaman += hitungKarakter(isi, /[}\]]/g) - hitungKarakter(isi, /[{[]/g);
    if (kedalaman < 0) return isi.match(POLA_INDUK)?.[1] ?? potong(barisIni);
  }
  return potong(barisIni);
}

function potong(teks, maks = 70) {
  const t = teks.trim().replace(/\s+/g, " ");
  return t.length > maks ? `${t.slice(0, maks - 1)}…` : t;
}

const temuan = [];

for await (const jalur of telusuri(FOLDER_PINDAI)) {
  const file = relative(AKAR, jalur).split(sep).join("/");
  if (DIABAIKAN.has(file)) continue;

  const baris = (await readFile(jalur, "utf8")).split(/\r?\n/);
  let dalamStatistik = false;

  baris.forEach((isi, i) => {
    if (barisKomentar(isi)) return;
    const nomor = i + 1;

    for (const cocok of isi.matchAll(POLA_ISI)) {
      temuan.push({ file, baris: nomor, jenis: "[ISI]", keterangan: cocok[0] });
    }

    if (POLA_DUMMY.test(isi)) {
      temuan.push({ file, baris: nomor, jenis: "dummy", keterangan: konteksDummy(baris, i) });
    }

    if (POLA_AWAL_STATISTIK.test(isi)) dalamStatistik = true;
    if (dalamStatistik) {
      for (const cocok of isi.matchAll(POLA_STAT_NULL)) {
        temuan.push({ file, baris: nomor, jenis: "null statistik", keterangan: `statistik.${cocok[1]}` });
      }
      if (isi.includes("}")) dalamStatistik = false;
    }
  });
}

// PUBLIC_SITE_URL (docs/SEO.md §3)
const { PUBLIC_SITE_URL } = { ...loadEnv("production", AKAR, "PUBLIC_"), ...process.env };
const domainKosong = !PUBLIC_SITE_URL?.trim() || PUBLIC_SITE_URL.trim() === SITE_FALLBACK;

// Laporan
const kolom = ["file", "baris", "jenis", "keterangan"];
const lebar = kolom.map((k) => Math.max(k.length, ...temuan.map((t) => String(t[k]).length)));
const cetakBaris = (sel) => sel.map((s, i) => String(s).padEnd(lebar[i])).join("  ");

console.log(`\nCek konten — ${temuan.length} temuan di src/\n`);
if (temuan.length > 0) {
  console.log(cetakBaris(kolom));
  console.log(lebar.map((l) => "-".repeat(l)).join("  "));
  for (const t of temuan) console.log(cetakBaris(kolom.map((k) => t[k])));
}

const hitung = (jenis) => temuan.filter((t) => t.jenis === jenis).length;
console.log(
  `\nRingkasan: ${hitung("[ISI]")} placeholder [ISI], ${hitung("dummy")} konten dummy, ` +
    `${hitung("null statistik")} statistik null.`,
);
console.log(
  domainKosong
    ? "PUBLIC_SITE_URL: BELUM DIISI (build memakai https://example.com)"
    : `PUBLIC_SITE_URL: ${PUBLIC_SITE_URL}`,
);

if (ketat) {
  const masalah = [];
  if (hitung("[ISI]") > 0) masalah.push(`${hitung("[ISI]")} placeholder [ISI]`);
  if (hitung("dummy") > 0) masalah.push(`${hitung("dummy")} konten dummy`);
  if (domainKosong) masalah.push("PUBLIC_SITE_URL belum diisi");
  if (masalah.length > 0) {
    console.error(`\n--ketat: GAGAL — ${masalah.join(", ")}. Belum siap rilis.\n`);
    process.exit(1);
  }
  const sisaStatistik = hitung("null statistik");
  console.log(
    sisaStatistik > 0
      ? `\n--ketat: LULUS. ${sisaStatistik} statistik masih null — section statistik disembunyikan di produksi.\n`
      : "\n--ketat: LULUS — siap rilis.\n",
  );
}
