/* ============================================
   ASHIRWAD — THE GOLDEN GRIDDLE
   script.js
   ============================================ */

'use strict';

/* ============================================
   GSAP SETUP
   ============================================ */
gsap.registerPlugin(ScrollTrigger);

/* ============================================
   CUSTOM CURSOR
   ============================================ */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const dot = document.getElementById('cursorDot');
  if (!cursor || !dot) return;

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let cx = mx, cy = my;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  function animateCursor() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cursor.style.left = cx + 'px';
    cursor.style.top = cy + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const hoverEls = document.querySelectorAll('a, button, .gs-card, .cs-swatch, .tl-item, .cc-node');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });
})();

/* ============================================
   SECTION 01 — BATTER CANVAS
   Organic blob simulation using canvas 2D
   ============================================ */
(function initBatterCanvas() {
  const canvas = document.getElementById('batter-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles, blobs;
  const PARTICLE_COUNT = 120;
  const BLOB_COUNT = 6;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); init(); });

  function rnd(a, b) { return a + Math.random() * (b - a); }
  function lerp(a, b, t) { return a + (b - a) * t; }

  // Tiny floating particles (fermentation bubbles)
  function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: rnd(0, W),
        y: rnd(0, H),
        r: rnd(1, 4),
        vx: rnd(-0.3, 0.3),
        vy: rnd(-0.6, -0.1),
        alpha: rnd(0.1, 0.5),
        life: rnd(0, 1)
      });
    }
  }

  // Large organic blobs
  function initBlobs() {
    blobs = [];
    for (let i = 0; i < BLOB_COUNT; i++) {
      blobs.push({
        x: rnd(W * 0.1, W * 0.9),
        y: rnd(H * 0.1, H * 0.9),
        r: rnd(80, 220),
        vx: rnd(-0.15, 0.15),
        vy: rnd(-0.15, 0.15),
        phase: rnd(0, Math.PI * 2),
        speed: rnd(0.003, 0.008),
        color: i % 3 === 0
          ? `rgba(200,146,42,`
          : i % 3 === 1
          ? `rgba(122,58,30,`
          : `rgba(74,124,47,`
      });
    }
  }

  function init() {
    initParticles();
    initBlobs();
  }
  init();

  let time = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    time += 0.008;

    // Draw blobs
    blobs.forEach(b => {
      b.x += b.vx;
      b.y += b.vy;
      b.phase += b.speed;
      if (b.x < -b.r) b.x = W + b.r;
      if (b.x > W + b.r) b.x = -b.r;
      if (b.y < -b.r) b.y = H + b.r;
      if (b.y > H + b.r) b.y = -b.r;

      // Pulsing radius
      const pulse = b.r + Math.sin(b.phase) * b.r * 0.18;

      const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, pulse);
      grad.addColorStop(0, b.color + '0.06)');
      grad.addColorStop(0.5, b.color + '0.03)');
      grad.addColorStop(1, b.color + '0)');
      ctx.beginPath();
      ctx.arc(b.x, b.y, pulse, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    });

    // Draw connection lines between nearby blobs
    for (let i = 0; i < blobs.length; i++) {
      for (let j = i + 1; j < blobs.length; j++) {
        const dx = blobs[i].x - blobs[j].x;
        const dy = blobs[i].y - blobs[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 350) {
          const alpha = (1 - dist / 350) * 0.05;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(200,146,42,${alpha})`;
          ctx.lineWidth = 1;
          ctx.moveTo(blobs[i].x, blobs[i].y);
          ctx.lineTo(blobs[j].x, blobs[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      p.x += p.vx + Math.sin(time + p.life * 10) * 0.2;
      p.y += p.vy;
      p.life += 0.005;

      if (p.y < -10 || p.life > 1) {
        p.x = rnd(0, W);
        p.y = H + 10;
        p.life = 0;
        p.alpha = rnd(0.1, 0.5);
      }

      const a = p.alpha * (1 - p.life);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,146,42,${a})`;
      ctx.fill();
    });

    // Circular golden rings
    const cx2 = W * 0.5, cy2 = H * 0.5;
    for (let ring = 1; ring <= 4; ring++) {
      const ringR = (ring * H * 0.18) + Math.sin(time * 0.5 + ring) * 10;
      const ringAlpha = 0.03 - ring * 0.005;
      ctx.beginPath();
      ctx.arc(cx2, cy2, ringR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(200,146,42,${ringAlpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    requestAnimationFrame(draw);
  }
  draw();
})();

/* ============================================
   SMOOTH SCROLL (lightweight Lenis-style)
   ============================================ */
(function initSmoothScroll() {
  let scrollY = window.scrollY;
  let targetY = scrollY;
  const ease = 0.08;
  let ticking = false;

  // Only enable on desktop where it feels smooth
  if (window.innerWidth < 768) return;

  // We use GSAP ScrollTrigger with native scroll for best compatibility
  // Just set scroll-behavior and let ScrollTrigger handle the rest
  document.documentElement.style.scrollBehavior = 'auto';
})();

/* ============================================
   GSAP SCROLL ANIMATIONS
   ============================================ */
(function initScrollAnimations() {

  // Section 02 — ingredients appear
  gsap.utils.toArray('.ing-item').forEach((el, i) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        setTimeout(() => el.classList.add('visible'), i * 100);
      }
    });
  });

  // Section 02 — text reveal
  gsap.from('.fp-label', {
    scrollTrigger: { trigger: '.first-pour', start: 'top 70%' },
    y: 50, opacity: 0, duration: 1, ease: 'power3.out'
  });
  gsap.from('.fp-body', {
    scrollTrigger: { trigger: '.first-pour', start: 'top 70%' },
    y: 30, opacity: 0, duration: 1, delay: 0.2, ease: 'power3.out'
  });

  // Section 03 — circular craft spin-in
  gsap.from('.cc-center', {
    scrollTrigger: { trigger: '.circular-craft', start: 'top 70%' },
    scale: 0.7, opacity: 0, duration: 1.4, ease: 'power3.out'
  });

  // Section 04 — staggered cards
  gsap.utils.toArray('.gs-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 85%' },
      y: 60, opacity: 0, duration: 0.9, delay: i * 0.12, ease: 'power3.out'
    });
  });

  // Section 05 — texture items
  gsap.utils.toArray('.tl-item').forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: { trigger: item, start: 'top 85%' },
      y: 40, opacity: 0, duration: 0.8, delay: i * 0.1, ease: 'power3.out'
    });
  });

  // Section 06 — chutneys slide in from right
  gsap.utils.toArray('.cs-swatch').forEach((swatch, i) => {
    gsap.from(swatch, {
      scrollTrigger: { trigger: swatch, start: 'top 85%' },
      x: 60, opacity: 0, duration: 0.9, delay: i * 0.12, ease: 'power3.out'
    });
  });
  gsap.from('.cs-title', {
    scrollTrigger: { trigger: '.chutney-spectrum', start: 'top 70%' },
    y: 50, opacity: 0, duration: 1, ease: 'power3.out'
  });

  // Section 07 — parallax bg image
  gsap.to('.sit-bg-image img', {
    scrollTrigger: {
      trigger: '.south-indian-table',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5
    },
    y: '-15%',
    ease: 'none'
  });
  gsap.from('.sit-title', {
    scrollTrigger: { trigger: '.south-indian-table', start: 'top 70%' },
    y: 60, opacity: 0, duration: 1.2, ease: 'power3.out'
  });
  gsap.from('.sit-body', {
    scrollTrigger: { trigger: '.south-indian-table', start: 'top 70%' },
    y: 30, opacity: 0, duration: 1, delay: 0.3, ease: 'power3.out'
  });
  gsap.utils.toArray('.sit-pillar').forEach((p, i) => {
    gsap.from(p, {
      scrollTrigger: { trigger: '.sit-pillars', start: 'top 80%' },
      y: 30, opacity: 0, duration: 0.8, delay: i * 0.15, ease: 'power3.out'
    });
  });

  // Section 08 — green room images
  gsap.from('.main-img', {
    scrollTrigger: { trigger: '.green-room', start: 'top 70%' },
    x: 60, opacity: 0, duration: 1.1, ease: 'power3.out'
  });
  gsap.from('.secondary-img', {
    scrollTrigger: { trigger: '.green-room', start: 'top 70%' },
    x: 40, opacity: 0, duration: 1, delay: 0.2, ease: 'power3.out'
  });
  gsap.from('.gr-accent-box', {
    scrollTrigger: { trigger: '.green-room', start: 'top 60%' },
    scale: 0.8, opacity: 0, duration: 0.8, delay: 0.4, ease: 'back.out(1.5)'
  });
  gsap.from('.gr-title', {
    scrollTrigger: { trigger: '.green-room', start: 'top 70%' },
    y: 50, opacity: 0, duration: 1, ease: 'power3.out'
  });

  // Section 09 — timeline steps
  gsap.utils.toArray('.dr-step').forEach((step, i) => {
    ScrollTrigger.create({
      trigger: step,
      start: 'top 80%',
      onEnter: () => {
        setTimeout(() => step.classList.add('visible'), i * 150);
      }
    });
  });

  // Timeline line draw
  gsap.from('.dr-line', {
    scrollTrigger: {
      trigger: '.dr-timeline',
      start: 'top 70%',
      end: 'bottom 20%',
      scrub: 1
    },
    scaleY: 0,
    transformOrigin: 'top center'
  });

  // Section 10 — visit
  gsap.from('.va-title', {
    scrollTrigger: { trigger: '.visit-ashirwad', start: 'top 70%' },
    y: 50, opacity: 0, duration: 1, ease: 'power3.out'
  });
  gsap.from('.va-details', {
    scrollTrigger: { trigger: '.visit-ashirwad', start: 'top 65%' },
    y: 30, opacity: 0, duration: 0.9, delay: 0.3, ease: 'power3.out'
  });
  gsap.from('.va-map-placeholder', {
    scrollTrigger: { trigger: '.va-split', start: 'top 70%' },
    x: 60, opacity: 0, duration: 1.1, delay: 0.2, ease: 'power3.out'
  });

  // Footer logo
  gsap.from('.va-footer-logo', {
    scrollTrigger: { trigger: '.va-footer', start: 'top 85%' },
    y: 30, opacity: 0, duration: 1, ease: 'power3.out'
  });
  gsap.from('.va-footer-tagline', {
    scrollTrigger: { trigger: '.va-footer', start: 'top 85%' },
    y: 20, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power3.out'
  });

  // Horizontal scroll hint on gs-cards for mobile
  if (window.innerWidth < 600) {
    const cards = document.querySelector('.gs-cards');
    if (cards) {
      cards.style.overflowX = 'auto';
      cards.style.display = 'flex';
      cards.style.flexWrap = 'nowrap';
      cards.querySelectorAll('.gs-card').forEach(c => {
        c.style.minWidth = '260px';
        c.style.flex = '0 0 260px';
      });
    }
  }

})();

/* ============================================
   GOLDEN SURFACE — HEAT SHIMMER ON HOVER
   ============================================ */
(function initCardHover() {
  document.querySelectorAll('.gs-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.querySelectorAll('.heat-wave').forEach((hw, i) => {
        hw.style.opacity = (0.3 + i * 0.1).toString();
        hw.style.animationDuration = (1.5 + i * 0.3) + 's';
      });
    });
    card.addEventListener('mouseleave', () => {
      card.querySelectorAll('.heat-wave').forEach(hw => {
        hw.style.opacity = '0.15';
        hw.style.animationDuration = '';
      });
    });
  });
})();

/* ============================================
   CHUTNEY SPECTRUM — ACTIVE STATE
   ============================================ */
(function initChutneySwatch() {
  const swatches = document.querySelectorAll('.cs-swatch');
  swatches.forEach(s => {
    s.addEventListener('mouseenter', () => {
      swatches.forEach(other => {
        if (other !== s) other.style.opacity = '0.4';
      });
    });
    s.addEventListener('mouseleave', () => {
      swatches.forEach(other => other.style.opacity = '1');
    });
  });
})();

/* ============================================
   SECTION 03 — CIRCULAR ORBIT NODES
   Position nodes precisely on a circle
   ============================================ */
(function positionOrbitNodes() {
  const container = document.querySelector('.cc-ring');
  if (!container) return;

  function placeNodes() {
    const size = container.offsetWidth;
    const r = size * 0.43;
    const cx = size / 2;
    const cy = size / 2;
    const angles = [-90, 0, 90, 180]; // top, right, bottom, left
    const nodes = container.querySelectorAll('.cc-node');

    nodes.forEach((node, i) => {
      const rad = (angles[i] * Math.PI) / 180;
      const x = cx + r * Math.cos(rad);
      const y = cy + r * Math.sin(rad);
      node.style.position = 'absolute';
      node.style.left = x + 'px';
      node.style.top = y + 'px';
      node.style.transform = 'translate(-50%, -50%)';
    });
  }

  placeNodes();
  window.addEventListener('resize', placeNodes);
})();

/* ============================================
   TAWA RIPPLE — TRIGGERED ON SCROLL
   ============================================ */
(function initTawaRipple() {
  ScrollTrigger.create({
    trigger: '.first-pour',
    start: 'top 60%',
    onEnter: () => {
      document.querySelectorAll('.tawa-ripple').forEach((r, i) => {
        r.style.animationPlayState = 'running';
        r.style.animationDelay = (i * 1) + 's';
      });
    }
  });
})();

/* ============================================
   GAUGE ANIMATION
   ============================================ */
(function initGauge() {
  const fill = document.querySelector('.gauge-fill');
  if (!fill) return;
  let growing = true;
  setInterval(() => {
    const current = parseFloat(fill.style.width) || 65;
    const target = growing ? current + (Math.random() * 3) : current - (Math.random() * 2);
    const clamped = Math.max(55, Math.min(80, target));
    fill.style.width = clamped + '%';
    if (clamped >= 80) growing = false;
    if (clamped <= 55) growing = true;
  }, 1500);
})();

/* ============================================
   SECTION 05 — TEXTURE INTERACTION
   ============================================ */
(function initTextureHover() {
  const items = document.querySelectorAll('.tl-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(other => other.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // CSS for active state
  const style = document.createElement('style');
  style.textContent = `
    .tl-item.active {
      background: rgba(200,146,42,0.08) !important;
      outline: 1px solid rgba(200,146,42,0.3);
    }
    .tl-item.active .int-bar::after {
      animation: expandBar 0.6s cubic-bezier(0.16,1,0.3,1) forwards;
    }
    @keyframes expandBar {
      from { width: 0; }
      to { width: var(--w); }
    }
  `;
  document.head.appendChild(style);
})();

/* ============================================
   GOLDEN TEXT SHIMMER — HEADLINE
   ============================================ */
(function initGoldenShimmer() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes textShimmer {
      0%   { background-position: 200% center; }
      100% { background-position: -200% center; }
    }
    .gs-title {
      background: linear-gradient(
        90deg,
        #f5f0e8 0%,
        #c8922a 30%,
        #e8b84b 50%,
        #c8922a 70%,
        #f5f0e8 100%
      );
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: textShimmer 4s linear infinite;
    }
    .dr-title {
      background: linear-gradient(
        90deg,
        #f5f0e8 0%,
        #c8922a 40%,
        #f5f0e8 100%
      );
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: textShimmer 5s linear infinite;
    }
  `;
  document.head.appendChild(style);
})();

/* ============================================
   PARALLAX — MULTIPLE LAYERS
   ============================================ */
(function initParallax() {
  // Section BG text parallax
  gsap.to('.cc-bg-text', {
    scrollTrigger: {
      trigger: '.circular-craft',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 2
    },
    y: '-20%',
    ease: 'none'
  });

  // Golden surface header parallax
  gsap.to('.gs-header', {
    scrollTrigger: {
      trigger: '.golden-surface',
      start: 'top bottom',
      end: 'center top',
      scrub: 1
    },
    y: '-5%',
    ease: 'none'
  });
})();

/* ============================================
   VISIT SECTION — PULSING PIN
   ============================================ */
(function initMapPin() {
  ScrollTrigger.create({
    trigger: '.visit-ashirwad',
    start: 'top 70%',
    onEnter: () => {
      gsap.from('.va-pin-dot', {
        scale: 0,
        duration: 0.6,
        ease: 'back.out(2)'
      });
    }
  });
})();

/* ============================================
   DAILY RITUAL — PROGRESSIVE REVEAL
   ============================================ */
(function initTimelineReveal() {
  const steps = document.querySelectorAll('.dr-step');
  let currentStep = -1;

  ScrollTrigger.create({
    trigger: '.dr-timeline',
    start: 'top 60%',
    end: 'bottom 40%',
    scrub: false,
    onUpdate: self => {
      const progress = self.progress;
      const activeStep = Math.floor(progress * steps.length);
      if (activeStep !== currentStep) {
        currentStep = activeStep;
        steps.forEach((step, i) => {
          if (i <= activeStep) {
            step.classList.add('visible');
          }
        });
      }
    }
  });
})();

/* ============================================
   MAGNETIC BUTTON EFFECT — CTA
   ============================================ */
(function initMagneticCTA() {
  const cta = document.querySelector('.va-cta');
  if (!cta) return;

  cta.addEventListener('mousemove', e => {
    const rect = cta.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.3;
    const dy = (e.clientY - cy) * 0.3;
    cta.style.transform = `translate(${dx}px, ${dy}px)`;
  });

  cta.addEventListener('mouseleave', () => {
    cta.style.transform = '';
  });
})();

/* ============================================
   INGREDIENT CIRCLES — ROTATE ON HOVER
   ============================================ */
(function initIngredientHover() {
  document.querySelectorAll('.ing-circle').forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.transform = 'scale(1.15) rotate(15deg)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
})();

/* ============================================
   SCROLL PROGRESS INDICATOR
   ============================================ */
(function initScrollProgress() {
  const indicator = document.createElement('div');
  indicator.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    background: linear-gradient(to right, #c8922a, #e8b84b);
    z-index: 9999;
    width: 0%;
    transition: width 0.1s;
    pointer-events: none;
  `;
  document.body.appendChild(indicator);

  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / total) * 100;
    indicator.style.width = progress + '%';
  });
})();

/* ============================================
   SECTION TRANSITIONS — BACKGROUND COLOR
   ============================================ */
(function initSectionColors() {
  const sections = [
    { el: '#s01', color: '#0d0d0b' },
    { el: '#s02', color: '#1a1a17' },
    { el: '#s03', color: '#0d0d0b' },
    { el: '#s04', color: '#1a1a17' },
    { el: '#s05', color: '#0d0d0b' },
    { el: '#s06', color: '#1a1a17' },
    { el: '#s07', color: '#0d0d0b' },
    { el: '#s08', color: '#0d0d0b' },
    { el: '#s09', color: '#1a1a17' },
    { el: '#s10', color: '#0d0d0b' }
  ];

  sections.forEach(s => {
    const el = document.querySelector(s.el);
    if (!el) return;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 50%',
      onEnter: () => {
        gsap.to('body', { backgroundColor: s.color, duration: 0.6, ease: 'power2.out' });
      },
      onEnterBack: () => {
        gsap.to('body', { backgroundColor: s.color, duration: 0.6, ease: 'power2.out' });
      }
    });
  });
})();

/* ============================================
   CANVAS RESIZE GUARD
   ============================================ */
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});

/* ============================================
   ACCESSIBILITY — REDUCE MOTION
   ============================================ */
(function respectReducedMotion() {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mq.matches) {
    document.querySelectorAll('[style*="animation"]').forEach(el => {
      el.style.animation = 'none';
    });
    gsap.globalTimeline.timeScale(0);
    const canvas = document.getElementById('batter-canvas');
    if (canvas) canvas.style.display = 'none';
  }
})();

/* ============================================
   INIT COMPLETE LOG
   ============================================ */
console.log('%cAshirwad — The Golden Griddle', 'color:#c8922a;font-family:serif;font-size:18px;font-weight:bold;');
console.log('%cFermented with love. Served with pride.', 'color:#7a5a2a;font-size:12px;');
