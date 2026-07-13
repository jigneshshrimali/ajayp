/**
 * Scroll reveals
 * Batches [data-reveal] elements into ScrollTrigger-driven fades,
 * and staggers groups sharing a common [data-reveal-group].
 */

export function initReveal({ gsap, ScrollTrigger }) {
  if (!gsap || !ScrollTrigger) {
    // Graceful fallback: reveal everything immediately.
    document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  document.body.classList.add("reveal-ready");

  const groups = new Map();
  document.querySelectorAll("[data-reveal]").forEach((el) => {
    const groupKey = el.getAttribute("data-reveal-group") || `solo-${Math.random()}`;
    if (!groups.has(groupKey)) groups.set(groupKey, []);
    groups.get(groupKey).push(el);
  });

  groups.forEach((elements) => {
    gsap.to(elements, {
      scrollTrigger: {
        trigger: elements[0].closest("section") || elements[0],
        start: "top 82%",
      },
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.12,
      onStart: () => elements.forEach((el) => el.classList.add("is-revealed")),
    });
  });
}

export function initHeroReveal({ gsap, SplitType }) {
  const title = document.querySelector("[data-split-title]");
  if (!gsap) return;

  const tl = gsap.timeline({ delay: 0.15 });

  if (title && SplitType) {
    const split = new SplitType(title, { types: "lines,words" });
    gsap.set(split.words, { yPercent: 120, opacity: 0 });
    tl.to(split.words, {
      yPercent: 0,
      opacity: 1,
      duration: 0.9,
      ease: "power4.out",
      stagger: 0.035,
    });
  } else if (title) {
    tl.from(title, { opacity: 0, y: 30, duration: 0.8, ease: "power3.out" });
  }

  tl.from(
    "[data-hero-fade]",
    { opacity: 0, y: 24, duration: 0.8, ease: "power3.out", stagger: 0.12 },
    "-=0.5"
  ).from(
    "[data-hero-visual]",
    { opacity: 0, scale: 0.94, duration: 1, ease: "power3.out" },
    "-=0.7"
  );
}
