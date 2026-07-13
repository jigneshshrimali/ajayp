/**
 * Gallery lightbox
 * A minimal, dependency-free lightbox for the "Moments of
 * Transformation" gallery: click to open, arrow keys / swipe-free
 * buttons to move between images, Escape or backdrop click to close.
 */

export function initGallery() {
  const items = Array.from(document.querySelectorAll("[data-gallery] .media-frame img"));
  if (!items.length) return;

  const overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.innerHTML = `
    <button class="lightbox__close" type="button" aria-label="Close gallery">&times;</button>
    <button class="lightbox__nav lightbox__nav--prev" type="button" aria-label="Previous image">&#8249;</button>
    <img class="lightbox__image" alt="" />
    <button class="lightbox__nav lightbox__nav--next" type="button" aria-label="Next image">&#8250;</button>
  `;
  document.body.appendChild(overlay);

  const style = document.createElement("style");
  style.textContent = `
    .lightbox { position: fixed; inset: 0; z-index: 500; display: none; align-items: center; justify-content: center;
      background: rgba(15, 25, 20, 0.92); backdrop-filter: blur(6px); }
    .lightbox.is-open { display: flex; }
    .lightbox__image { max-width: min(86vw, 1100px); max-height: 82vh; border-radius: 12px; box-shadow: 0 30px 80px rgba(0,0,0,0.5); }
    .lightbox__close, .lightbox__nav { position: absolute; color: #fff; font-size: 2rem; line-height: 1;
      background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.25); border-radius: 50%;
      width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
    .lightbox__close { top: 24px; right: 24px; }
    .lightbox__nav--prev { left: 24px; top: 50%; transform: translateY(-50%); }
    .lightbox__nav--next { right: 24px; top: 50%; transform: translateY(-50%); }
    @media (max-width: 640px) { .lightbox__nav, .lightbox__close { width: 40px; height: 40px; font-size: 1.5rem; } }
  `;
  document.head.appendChild(style);

  const imgEl = overlay.querySelector(".lightbox__image");
  let currentIndex = 0;

  const show = (index) => {
    currentIndex = (index + items.length) % items.length;
    const source = items[currentIndex];
    imgEl.src = source.currentSrc || source.src;
    imgEl.alt = source.alt || "";
  };

  const open = (index) => {
    show(index);
    overlay.classList.add("is-open");
    document.documentElement.style.overflow = "hidden";
  };

  const close = () => {
    overlay.classList.remove("is-open");
    document.documentElement.style.overflow = "";
  };

  items.forEach((img, index) => {
    img.closest(".media-frame").addEventListener("click", () => open(index));
  });

  overlay.querySelector(".lightbox__close").addEventListener("click", close);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) close();
  });
  overlay.querySelector(".lightbox__nav--prev").addEventListener("click", () => show(currentIndex - 1));
  overlay.querySelector(".lightbox__nav--next").addEventListener("click", () => show(currentIndex + 1));

  document.addEventListener("keydown", (event) => {
    if (!overlay.classList.contains("is-open")) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") show(currentIndex - 1);
    if (event.key === "ArrowRight") show(currentIndex + 1);
  });
}
