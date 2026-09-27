/**
 * Animasi berbasis scroll (DESIGN.md §6) dengan GSAP + ScrollTrigger:
 * - A2 scroll reveal untuk elemen `[data-reveal]` (heading section)
 * - A4 counter untuk `[data-counter]` (hanya nilai statistik yang sudah diisi)
 * Hanya berjalan bila `html.js-anim` (JS aktif & bukan reduced motion); tanpa itu konten tampil apa adanya.
 * Diimpor hanya oleh halaman yang membutuhkan, supaya GSAP tidak dimuat di semua halaman.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function pasangAnimasiGulir(): void {
  if (!document.documentElement.classList.contains("js-anim")) return;
  gsap.registerPlugin(ScrollTrigger);

  for (const el of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
    gsap.from(el, {
      y: 24,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
  }

  const format = new Intl.NumberFormat("id-ID");
  for (const el of document.querySelectorAll<HTMLElement>("[data-counter]")) {
    const target = Number(el.dataset.counter);
    if (!Number.isFinite(target)) continue;
    const nilai = { n: 0 };
    el.textContent = "0";
    gsap.to(nilai, {
      n: target,
      duration: 1.6,
      ease: "power1.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      onUpdate: () => {
        el.textContent = format.format(Math.round(nilai.n));
      },
    });
  }
}
