/**
 * Animated counters
 * Reads target values from data-count-to / data-count-suffix and
 * animates them into view once, using CountUp when available.
 */

export function initCounters({ CountUp } = {}) {
  const counters = document.querySelectorAll("[data-count-to]");
  if (!counters.length) return;

  const animate = (el) => {
    const to = Number(el.getAttribute("data-count-to"));
    const suffix = el.getAttribute("data-count-suffix") || "";
    const decimals = el.hasAttribute("data-count-decimals") ? Number(el.getAttribute("data-count-decimals")) : 0;

    if (CountUp) {
      const counter = new CountUp(el, to, {
        duration: 2.1,
        suffix,
        decimalPlaces: decimals,
      });
      if (!counter.error) counter.start();
      else el.textContent = `${to}${suffix}`;
    } else {
      el.textContent = `${to}${suffix}`;
    }
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((el) => observer.observe(el));
}
