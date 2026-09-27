/**
 * Animasi berbasis scroll (DESIGN.md §6) dengan GSAP + ScrollTrigger. Diimpor hanya oleh halaman yang membutuhkan.
 * Hanya berjalan bila `html.js-anim` (JS aktif & bukan reduced motion); tanpa itu konten tampil apa adanya.
 *
 * - A2 `[data-reveal]`   : heading section naik 24px + opacity, sekali
 * - A3 `[data-stagger]`  : anak langsung (maks 12) muncul bergiliran, stagger 0.08s
 * - A4 `[data-counter]`  : angka 0 → nilai, 1.6s
 * - A6 `[data-timeline]` : garis `[data-garis]` scaleY terikat scroll, titik `[data-titik]` muncul bergiliran
 * - A7 `[data-steplist]` : konektor `[data-konektor]` tergambar berurutan
 * - A8 `[data-parallax]` : gambar di dalamnya yPercent -8 → 8 terikat scroll, hanya ≥ 768px
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MAKS_STAGGER = 12;

export function pasangAnimasiGulir(): void {
  if (!document.documentElement.classList.contains("js-anim")) return;
  gsap.registerPlugin(ScrollTrigger);

  // A2
  for (const el of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
    gsap.from(el, {
      y: 24,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
  }

  // A3
  for (const grid of document.querySelectorAll<HTMLElement>("[data-stagger]")) {
    const anak = [...grid.children].slice(0, MAKS_STAGGER);
    if (anak.length === 0) continue;
    gsap.from(anak, {
      y: 24,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.08,
      scrollTrigger: { trigger: grid, start: "top 85%", once: true },
    });
  }

  // A4
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

  // A6
  for (const tl of document.querySelectorAll<HTMLElement>("[data-timeline]")) {
    const garis = tl.querySelector<HTMLElement>("[data-garis]");
    if (garis) {
      gsap.fromTo(
        garis,
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: tl, start: "top 75%", end: "bottom 60%", scrub: true } },
      );
    }
    for (const titik of tl.querySelectorAll<HTMLElement>("[data-titik]")) {
      gsap.from(titik, {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        ease: "back.out(2)",
        scrollTrigger: { trigger: titik, start: "top 75%", once: true },
      });
    }
  }

  // A7
  for (const daftar of document.querySelectorAll<HTMLElement>("[data-steplist]")) {
    const konektor = daftar.querySelectorAll<HTMLElement>("[data-konektor]");
    if (konektor.length === 0) continue;
    gsap.fromTo(
      konektor,
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 0.4,
        ease: "power1.inOut",
        stagger: 0.35,
        scrollTrigger: { trigger: daftar, start: "top 75%", once: true },
      },
    );
  }

  // A8 — nonaktif di < 768px (DESIGN §6)
  const mm = gsap.matchMedia();
  mm.add("(min-width: 768px)", () => {
    for (const bingkai of document.querySelectorAll<HTMLElement>("[data-parallax]")) {
      const img = bingkai.querySelector("img");
      if (!img) continue;
      gsap.fromTo(
        img,
        { yPercent: -8, scale: 1.2 },
        { yPercent: 8, scale: 1.2, ease: "none", scrollTrigger: { trigger: bingkai, start: "top bottom", end: "bottom top", scrub: true } },
      );
    }
  });
}
