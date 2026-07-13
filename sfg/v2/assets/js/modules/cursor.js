/**
 * Cursor glow
 * A small ring that trails the pointer and expands over interactive
 * elements. Skipped entirely on touch devices and reduced-motion.
 */

export function initCursor({ gsap } = {}) {
  const isFinePointer = window.matchMedia("(pointer: fine)").matches;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!isFinePointer || prefersReduced) return;

  const cursor = document.createElement("div");
  cursor.className = "cursor-glow";
  cursor.setAttribute("aria-hidden", "true");
  document.body.appendChild(cursor);

  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const target = { ...pos };

  window.addEventListener("mousemove", (event) => {
    target.x = event.clientX;
    target.y = event.clientY;
    cursor.classList.add("is-active");
  });

  const hoverables = "a, button, [data-magnetic], input, textarea, .accordion-trigger";
  document.addEventListener("mouseover", (event) => {
    if (event.target.closest(hoverables)) cursor.classList.add("is-hovering");
  });
  document.addEventListener("mouseout", (event) => {
    if (event.target.closest(hoverables)) cursor.classList.remove("is-hovering");
  });

  const render = () => {
    pos.x += (target.x - pos.x) * 0.18;
    pos.y += (target.y - pos.y) * 0.18;
    cursor.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
}
