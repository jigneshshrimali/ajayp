/**
 * FAQ accordion
 * Each trigger toggles its own panel; opening one closes any other
 * panel within the same [data-faq-group] for a focused reading flow.
 */

export function initFaq() {
  const groups = document.querySelectorAll("[data-faq-group]");

  groups.forEach((group) => {
    const items = group.querySelectorAll(".accordion-item");

    items.forEach((item) => {
      const trigger = item.querySelector(".accordion-trigger");
      const panel = item.querySelector(".accordion-panel");
      if (!trigger || !panel) return;

      trigger.addEventListener("click", () => {
        const isOpen = item.getAttribute("data-open") === "true";

        items.forEach((other) => {
          other.setAttribute("data-open", "false");
          other.querySelector(".accordion-trigger")?.setAttribute("aria-expanded", "false");
        });

        item.setAttribute("data-open", String(!isOpen));
        trigger.setAttribute("aria-expanded", String(!isOpen));
      });
    });
  });
}
