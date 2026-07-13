/**
 * Magnetic buttons
 * Elements marked [data-magnetic] gently follow the pointer within
 * their bounds, then spring back on leave. Desktop / fine pointer only.
 */

export function initMagnetic({ gsap } = {}) {
  const isFinePointer = window.matchMedia("(pointer: fine)").matches;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = document.querySelectorAll("[data-magnetic]");
  if (!targets.length || !isFinePointer || prefersReduced) return;

  targets.forEach((el) => {
    const strength = Number(el.getAttribute("data-magnetic-strength")) || 0.35;

    const reset = () => {
      if (gsap) {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
      } else {
        el.style.transform = "translate(0, 0)";
      }
    };

    el.addEventListener("mousemove", (event) => {
      const rect = el.getBoundingClientRect();
      const relX = event.clientX - (rect.left + rect.width / 2);
      const relY = event.clientY - (rect.top + rect.height / 2);

      if (gsap) {
        gsap.to(el, { x: relX * strength, y: relY * strength, duration: 0.5, ease: "power3.out" });
      } else {
        el.style.transform = `translate(${relX * strength}px, ${relY * strength}px)`;
      }
    });

    el.addEventListener("mouseleave", reset);
  });
}
