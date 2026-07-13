/**
 * Main entry point (ES module).
 * Loads third-party libraries from the CDN as native ESM, then wires
 * up every feature module. Each library import is isolated in its
 * own try/catch so a single blocked CDN request degrades gracefully
 * instead of breaking the whole page.
 */

import { initNavigation } from "./modules/navigation.js";
import { initSmoothScroll } from "./modules/smoothScroll.js";
import { initReveal, initHeroReveal } from "./modules/reveal.js";
import { initCounters } from "./modules/counters.js";
import { initFaq } from "./modules/faq.js";
import { initCursor } from "./modules/cursor.js";
import { initMagnetic } from "./modules/magnetic.js";
import { initGallery } from "./modules/gallery.js";

async function loadLibraries() {
  const libs = {};

  await Promise.allSettled([
    import("https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm").then((m) => (libs.gsap = m.gsap || m.default)),
    import("https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm").then(
      (m) => (libs.ScrollTrigger = m.ScrollTrigger || m.default)
    ),
    import("https://cdn.jsdelivr.net/npm/lenis@1.1.14/+esm").then((m) => (libs.Lenis = m.default || m.Lenis)),
    import("https://cdn.jsdelivr.net/npm/split-type@0.3.4/+esm").then((m) => (libs.SplitType = m.default || m)),
    import("https://cdn.jsdelivr.net/npm/countup.js@2.8.0/+esm").then((m) => (libs.CountUp = m.CountUp || m.default)),
    import("https://cdn.jsdelivr.net/npm/lucide@0.469.0/+esm").then((m) => (libs.lucide = m)),
  ]);

  return libs;
}

function initLucideIcons(lucide) {
  if (!lucide?.createIcons) return;
  lucide.createIcons({ icons: lucide.icons });
}

function initPreloader() {
  const preloader = document.querySelector("[data-preloader]");
  if (!preloader) return;

  const hide = () => preloader.classList.add("is-hidden");
  if (document.readyState === "complete") {
    setTimeout(hide, 250);
  } else {
    window.addEventListener("load", () => setTimeout(hide, 250));
  }
}

function initScrollProgress() {
  const bar = document.querySelector("[data-scroll-progress]");
  if (!bar) return;

  const update = () => {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const pct = height > 0 ? (scrollTop / height) * 100 : 0;
    bar.style.width = `${pct}%`;
  };

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

function initBackToTop() {
  const button = document.querySelector("[data-back-to-top]");
  if (!button) return;

  window.addEventListener(
    "scroll",
    () => button.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.6),
    { passive: true }
  );

  button.addEventListener("click", () => {
    window.__lenis
      ? window.__lenis.scrollTo(0, { duration: 1.2 })
      : window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initYear() {
  const el = document.querySelector("[data-current-year]");
  if (el) el.textContent = String(new Date().getFullYear());
}

async function bootstrap() {
  const libs = await loadLibraries();

  initLucideIcons(libs.lucide);
  initPreloader();
  initScrollProgress();
  initYear();
  initFaq();
  initGallery();

  const lenis = initSmoothScroll(libs);
  window.__lenis = lenis;

  initNavigation({ lenis });
  initBackToTop();
  initCursor(libs);
  initMagnetic(libs);
  initHeroReveal(libs);
  initReveal(libs);
  initCounters(libs);
}

bootstrap();
