# Swasthya Fit Club — Marketing Website

A pixel-faithful, production-ready rebuild of the approved Swasthya Fit Club
layout: a single-page HTML5 site with modern CSS architecture and dependency-light
vanilla JavaScript, enhanced with premium motion (GSAP, Lenis, SplitType, CountUp).

No build step is required — open `index.html` in a browser, or serve the folder
with any static file server.

---

## 1. Project structure

```
project/
├── index.html                 Single-page markup (all sections)
├── favicon/
│   └── favicon.svg            Brand mark used as the site favicon
├── assets/
│   ├── css/
│   │   ├── main.css           Entry point — @layer order + @imports (link this file)
│   │   ├── variables.css      Design tokens: color, type, spacing, radius, motion
│   │   ├── base.css           Reset + layout primitives (.container, .section)
│   │   ├── layout.css         Header / navigation / footer
│   │   ├── components.css     Buttons, cards, badges, accordion, icon tiles…
│   │   ├── sections.css       Section-specific styles (hero, programs, FAQ…)
│   │   ├── animations.css     Preloader, cursor glow, scroll progress, mobile drawer
│   │   └── responsive.css     Breakpoints: 1440 / 1200 / 992 / 900 / 720 / 560 / 420
│   ├── js/
│   │   ├── main.js            Entry point — loads CDN libraries, wires up modules
│   │   └── modules/
│   │       ├── navigation.js      Header scroll state, mobile drawer, active link
│   │       ├── smoothScroll.js    Lenis setup, synced to GSAP's ticker
│   │       ├── reveal.js          Scroll-triggered reveals + hero split-text intro
│   │       ├── counters.js        CountUp-driven animated statistics
│   │       ├── faq.js             Accessible accordion behaviour
│   │       ├── cursor.js          Cursor glow (fine-pointer devices only)
│   │       ├── magnetic.js        Magnetic hover effect for buttons/icons
│   │       └── gallery.js         Dependency-free lightbox for the gallery grid
│   └── images/
│       ├── logo-mark.svg      Compact brand mark (header, footer, favicon)
│       └── hero-seal.svg      Circular seal illustration used in the hero
└── README.md
```

CSS is organised as **CUBE CSS** (Composition, Utility, Block, Exception) and
loaded through native **CSS Cascade Layers** (`@layer tokens, base, layout,
components, sections, animations, responsive;` in `main.css`), so import order
can never be undone by specificity fights — utilities and exceptions always
win over base rules, regardless of source order.

## 2. Dependencies (all via CDN, no npm install required)

| Library      | Purpose                                   | Loaded as |
|--------------|--------------------------------------------|-----------|
| GSAP + ScrollTrigger | Scroll-linked reveals, timelines   | native ESM, `jsdelivr` `+esm` |
| Lenis        | Buttery smooth scrolling                   | native ESM |
| SplitType    | Word-level hero text reveal                | native ESM |
| CountUp.js   | Animated statistics                        | native ESM |
| Lucide       | Icon set (`data-lucide` is not used — icons are inlined as SVG for zero render-blocking swap) | native ESM |
| Google Fonts | Fraunces (display) + Manrope (body/UI)     | `<link>` with `preconnect` |

Every dynamic import is wrapped in `Promise.allSettled`, so if any CDN request
is blocked (ad-blockers, offline, restrictive CSP) the rest of the site still
loads — animations degrade to instant/opacity-1 states instead of breaking.

Images are served directly from `images.unsplash.com` / `plus.unsplash.com`
using their on-the-fly resizing query params (`w`, `q`, `auto=format`,
`fit=crop`) — no local binaries to manage, and every `<img>` uses
`loading="lazy"` (except the hero, which is `eager` + `fetchpriority="high"`)
and `decoding="async"`.

## 3. Customization points

- **Brand colors / type scale** — everything lives in
  `assets/css/variables.css`. Change `--color-primary`, `--font-display`,
  `--font-body`, or any `--fs-*` token and it cascades through the whole site.
- **Copy** — all section copy lives directly in `index.html`; there is no
  templating layer, so search-and-replace is safe.
- **Programs / stories / gallery images** — swap the `src`/`srcset` URLs in the
  relevant `<article>`/`<div class="media-frame">` blocks. Keep the
  `w=`/`q=`/`auto=format&fit=crop` query params for consistent cropping.
- **Map** — the embed in `#contact` uses a keyless OpenStreetMap iframe. Swap
  the `bbox`/`marker` query params for your exact coordinates, or replace the
  `<iframe>` with a Google Maps embed if you have an API key.
- **WhatsApp number** — update the `https://wa.me/91XXXXXXXXXX` links (header,
  hero, contact panel) in one pass.
- **Motion intensity** — every animated module accepts the loaded libraries as
  a parameter and no-ops gracefully if a library failed to load or the visitor
  has `prefers-reduced-motion: reduce` set; tune easing/durations directly in
  `assets/js/modules/*.js`.

## 4. Accessibility & performance notes

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), a
  skip-link, and visible `:focus-visible` styling throughout.
- All decorative SVGs carry `aria-hidden="true"`; informative icons/images
  carry descriptive `alt` text.
- `prefers-reduced-motion` disables CSS transitions/animations globally and is
  also checked before Lenis, the cursor glow, and magnetic buttons initialize.
- Scroll-linked work is GPU-friendly: only `transform` and `opacity` are
  animated by GSAP/CSS; nothing animates `top`/`left`/`width` on scroll.
- `<link rel="preconnect">` is set for Google Fonts, Unsplash, and jsDelivr;
  the hero image is preloaded implicitly via `fetchpriority="high"`.

## 5. Deployment

This is a fully static site — deploy the `project/` folder as-is to any static
host:

```bash
# Local preview
cd project
python3 -m http.server 8080
# then open http://localhost:8080

# Netlify / Vercel / GitHub Pages / Cloudflare Pages
# → just point the host at this folder; no build command required.
```

If you later add a bundler, the only required change is updating the single
`<script type="module" src="assets/js/main.js">` tag and the `main.css` link —
everything else (imports, CDN URLs) already uses standard ES module syntax.
