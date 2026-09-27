/** Menu utama (docs/PRD.md §5). Tombol "Daftar" dirender terpisah sebagai Button primary. */
export interface TautanMenu {
  label: string;
  href: string;
}

export const menuUtama: TautanMenu[] = [
  { label: "Beranda", href: "/" },
  { label: "Profil", href: "/profil/" },
  { label: "Guru & Staf", href: "/guru-dan-staf/" },
  { label: "Ekstrakurikuler", href: "/ekstrakurikuler/" },
  { label: "Fasilitas", href: "/fasilitas/" },
  { label: "Galeri", href: "/galeri/" },
  { label: "Berita", href: "/berita/" },
  { label: "Kontak", href: "/kontak/" },
];

export const tautanDaftar: TautanMenu = { label: "Daftar", href: "/pendaftaran/" };

/** true jika `href` adalah halaman saat ini atau induknya (mis. /berita/ untuk /berita/judul/). */
export function aktif(href: string, pathname: string): boolean {
  const rapikan = (p: string) => (p.endsWith("/") ? p : `${p}/`);
  if (href === "/") return rapikan(pathname) === "/";
  return rapikan(pathname).startsWith(rapikan(href));
}
