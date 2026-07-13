/**
 * Smooth scroll — Lenis, driven by requestAnimationFrame and
 * synced to GSAP's ticker/ScrollTrigger so scroll-linked
 * animations stay perfectly aligned with the smoothed scroll.
 */

export function initSmoothScroll({ Lenis, gsap, ScrollTrigger } = {}) {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

  if (!Lenis || prefersReduced) return null;

  const lenis = new Lenis({
    duration: 1.15,
    easing: (t) => 1 - Math.pow(1 - t, 3.2),
    smoothWheel: true,
    syncTouch: false,
    touchMultiplier: isCoarsePointer ? 1 : 1.2,
  });

  if (gsap && ScrollTrigger) {
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  return lenis;
}
