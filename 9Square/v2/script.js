/**
 * HOTEL 9 SQUARE — THE URBAN REST STUDIO
 * script.js · Production v2 (Complete)
 * Preloader · Custom Cursor · Three.js Atrium ·
 * Lenis-style Smooth Scroll · GSAP ScrollTrigger ·
 * Image Reveals · Room Progress · Chapter Labels
 */
(function () {
  'use strict';

  /* ══════════════════════════════════════
     UTILITIES
  ══════════════════════════════════════ */
  var pRM   = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

  function qs(s, c)  { return (c || document).querySelector(s); }
  function qsa(s, c) { return Array.from((c || document).querySelectorAll(s)); }
  function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }
  function lerp(a, b, t)    { return a + (b - a) * t; }
  function rnd(a, b)        { return a + Math.random() * (b - a); }

  /* ══════════════════════════════════════
     FOOTER YEAR
  ══════════════════════════════════════ */
  var yr = qs('#footerYear');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ══════════════════════════════════════
     PRELOADER
  ══════════════════════════════════════ */
  (function initPreloader() {
    var loader = qs('#preloader');
    var bar    = qs('#plBar');
    if (!loader) return;

    var progress = 0;
    var target   = 0;
    var raf;

    // Simulate load progress
    function setProgress(val) {
      target = clamp(val, 0, 100);
    }

    function tick() {
      progress = lerp(progress, target, 0.08);
      if (bar) bar.style.width = progress.toFixed(1) + '%';

      if (progress >= 99.5) {
        if (bar) bar.style.width = '100%';
        setTimeout(function () {
          loader.classList.add('hidden');
          document.body.style.overflow = '';
          // Trigger hero entrance
          var hero = qs('.s-hero');
          if (hero) hero.classList.add('loaded');
        }, 400);
        return;
      }
      raf = requestAnimationFrame(tick);
    }

    document.body.style.overflow = 'hidden';
    tick();

    // Increment progress as page resources load
    setProgress(30);
    setTimeout(function () { setProgress(60); }, 300);
    setTimeout(function () { setProgress(85); }, 600);

    window.addEventListener('load', function () {
      setProgress(100);
    });

    // Safety timeout — always dismiss after 3s
    setTimeout(function () {
      setProgress(100);
    }, 3000);
  }());

  /* ══════════════════════════════════════
     SCROLL PROGRESS LINE
  ══════════════════════════════════════ */
  var progLine = qs('#progressLine');
  if (progLine) {
    window.addEventListener('scroll', function () {
      var total = document.documentElement.scrollHeight - window.innerHeight;
      var pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
      progLine.style.width = clamp(pct, 0, 100) + '%';
    }, { passive: true });
  }

  /* ══════════════════════════════════════
     HEADER SCROLL STATE
  ══════════════════════════════════════ */
  var header = qs('#siteHeader');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* ══════════════════════════════════════
     MOBILE NAV
  ══════════════════════════════════════ */
  (function initMobileNav() {
    var btn = qs('#hamBtn');
    var nav = qs('#mobileNav');
    if (!btn || !nav) return;

    function openNav() {
      btn.classList.add('open');
      nav.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      nav.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function closeNav() {
      btn.classList.remove('open');
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      nav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    btn.addEventListener('click', function () {
      nav.classList.contains('open') ? closeNav() : openNav();
    });
    qsa('.mn-link', nav).forEach(function (l) { l.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) closeNav();
    });
  }());

  /* ══════════════════════════════════════
     CUSTOM CURSOR
  ══════════════════════════════════════ */
  (function initCursor() {
    if (isTouch) return;
    var cursor    = qs('#siteCursor');
    var cursorDot = qs('#siteCursorDot');
    if (!cursor || !cursorDot) return;

    var mx = -200, my = -200;  // off screen initially
    var cx = -200, cy = -200;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      cursorDot.style.left = mx + 'px';
      cursorDot.style.top  = my + 'px';
      cursorDot.classList.add('visible');
      cursor.classList.add('visible');
    });

    function animateCursor() {
      cx = lerp(cx, mx, 0.11);
      cy = lerp(cy, my, 0.11);
      cursor.style.left = cx + 'px';
      cursor.style.top  = cy + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover states
    var hoverEls = qsa('a, button, .am-card, .ml-item, .ll-item, .room-row, .gc-dot, .ir-card, .ai-frame');
    hoverEls.forEach(function (el) {
      el.addEventListener('mouseenter', function () { cursor.classList.add('hovered'); });
      el.addEventListener('mouseleave', function () { cursor.classList.remove('hovered'); });
    });

    // Click feedback
    document.addEventListener('mousedown', function () { cursor.classList.add('clicked'); });
    document.addEventListener('mouseup',   function () { cursor.classList.remove('clicked'); });
  }());

  /* ══════════════════════════════════════
     SMOOTH ANCHOR SCROLL
  ══════════════════════════════════════ */
  (function initAnchorScroll() {
    var navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 68;
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var tgt = document.querySelector(a.getAttribute('href'));
      if (!tgt) return;
      e.preventDefault();
      var top = tgt.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  }());

  /* ══════════════════════════════════════
     GSAP — REGISTER PLUGINS
  ══════════════════════════════════════ */
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  /* ══════════════════════════════════════
     BUILDING PARALLAX
  ══════════════════════════════════════ */
  if (!pRM) {
    gsap.to('.building-img', {
      scrollTrigger: {
        trigger: '.s-building',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.6
      },
      y: '13%',
      ease: 'none'
    });
  }

  /* ══════════════════════════════════════
     IMAGE CLIP-PATH REVEALS
     Each image slides open from left on enter
  ══════════════════════════════════════ */
  (function initImageReveals() {
    if (pRM) return;

    var imageEls = qsa('.ai-frame, .rim-wrap, .ir-main, .ir-sub, .si-main, .si-secondary');

    imageEls.forEach(function (el) {
      gsap.fromTo(el,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true
          }
        }
      );
    });
  }());

  /* ══════════════════════════════════════
     GENERIC SECTION REVEALS
  ══════════════════════════════════════ */
  (function initRevealAnimations() {
    if (pRM) return;

    // Chapter tags + titles + body
    qsa('.section-chapter, .section-title, .section-body, .rooms-intro, .amenities-intro').forEach(function (el) {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        y: 28, opacity: 0, duration: 0.9, ease: 'power3.out'
      });
    });

    // Arrival facts stagger
    gsap.utils.toArray('.af-item').forEach(function (item, i) {
      gsap.from(item, {
        scrollTrigger: { trigger: '.arrival-facts', start: 'top 85%', once: true },
        y: 20, opacity: 0, duration: 0.75,
        delay: i * 0.12, ease: 'power3.out'
      });
    });

    // Arrival arc SVG draw
    gsap.from('.arrival-arc path', {
      scrollTrigger: { trigger: '.arrival-image', start: 'top 80%', once: true },
      strokeDasharray: 400,
      strokeDashoffset: 400,
      duration: 1.8,
      ease: 'power2.out'
    });

    // Room rows — text side slides in from opposite of image
    qsa('.room-row').forEach(function (row) {
      var isEven = row.classList.contains('rr-even');
      gsap.from(row.querySelector('.room-text-col'), {
        scrollTrigger: { trigger: row, start: 'top 82%', once: true },
        x: isEven ? -36 : 36,
        opacity: 0, duration: 1.0, ease: 'power3.out'
      });
      gsap.from(row.querySelector('.room-num'), {
        scrollTrigger: { trigger: row, start: 'top 80%', once: true },
        scale: 0.6, opacity: 0, duration: 0.8, delay: 0.2, ease: 'back.out(1.5)'
      });
      gsap.from(row.querySelector('.room-name'), {
        scrollTrigger: { trigger: row, start: 'top 80%', once: true },
        y: 20, opacity: 0, duration: 0.8, delay: 0.3, ease: 'power3.out'
      });
      gsap.from(row.querySelector('.room-desc'), {
        scrollTrigger: { trigger: row, start: 'top 80%', once: true },
        y: 16, opacity: 0, duration: 0.8, delay: 0.4, ease: 'power3.out'
      });
    });

    // Material list
    gsap.utils.toArray('.ml-item').forEach(function (item, i) {
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: 'top 90%', once: true },
        x: -24, opacity: 0, duration: 0.7,
        delay: i * 0.09, ease: 'power3.out'
      });
    });

    // Amenity cards stagger
    gsap.utils.toArray('.am-card').forEach(function (card, i) {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 90%', once: true },
        y: 24, opacity: 0, duration: 0.75,
        delay: i * 0.06, ease: 'power3.out'
      });
    });

    // Design strip
    gsap.utils.toArray('.ds-item').forEach(function (item, i) {
      gsap.from(item, {
        scrollTrigger: { trigger: '.design-strip', start: 'top 86%', once: true },
        y: 18, opacity: 0, duration: 0.65,
        delay: i * 0.08, ease: 'power3.out'
      });
    });

    // Location list
    gsap.utils.toArray('.ll-item').forEach(function (item, i) {
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: 'top 90%', once: true },
        x: -20, opacity: 0, duration: 0.65,
        delay: i * 0.07, ease: 'power3.out'
      });
    });
    gsap.from('.loc-map-art', {
      scrollTrigger: { trigger: '.location-right', start: 'top 82%', once: true },
      x: 40, opacity: 0, duration: 1.0, ease: 'power3.out'
    });
    gsap.from('.location-map-btn', {
      scrollTrigger: { trigger: '.location-map-btn', start: 'top 90%', once: true },
      y: 16, opacity: 0, duration: 0.7, ease: 'power3.out'
    });

    // Building chapter content
    gsap.from('.bc-ch', {
      scrollTrigger: { trigger: '.s-building', start: 'top 68%', once: true },
      y: 16, opacity: 0, duration: 0.8, ease: 'power3.out'
    });
    gsap.from('.building-title', {
      scrollTrigger: { trigger: '.s-building', start: 'top 62%', once: true },
      y: 55, opacity: 0, duration: 1.3, delay: 0.1, ease: 'power3.out'
    });
    gsap.utils.toArray('.building-body p').forEach(function (p, i) {
      gsap.from(p, {
        scrollTrigger: { trigger: '.s-building', start: 'top 58%', once: true },
        y: 20, opacity: 0, duration: 0.8,
        delay: 0.4 + i * 0.14, ease: 'power3.out'
      });
    });

    // Reserve section
    gsap.from('.reserve-title', {
      scrollTrigger: { trigger: '.s-reserve', start: 'top 72%', once: true },
      y: 40, opacity: 0, duration: 1.1, ease: 'power3.out'
    });
    gsap.from('.reserve-body', {
      scrollTrigger: { trigger: '.s-reserve', start: 'top 72%', once: true },
      y: 20, opacity: 0, duration: 0.9, delay: 0.2, ease: 'power3.out'
    });
    gsap.from('.reserve-contact', {
      scrollTrigger: { trigger: '.s-reserve', start: 'top 68%', once: true },
      y: 18, opacity: 0, duration: 0.8, delay: 0.35, ease: 'power3.out'
    });
    gsap.from('.reserve-form', {
      scrollTrigger: { trigger: '.reserve-right', start: 'top 80%', once: true },
      y: 36, opacity: 0, duration: 1.0, ease: 'power3.out'
    });

    // Footer
    gsap.from('.ft-brand', {
      scrollTrigger: { trigger: '.site-footer', start: 'top 90%', once: true },
      y: 24, opacity: 0, duration: 0.9, ease: 'power3.out'
    });
    gsap.utils.toArray('.ft-nav, .ft-block').forEach(function (col, i) {
      gsap.from(col, {
        scrollTrigger: { trigger: '.footer-top', start: 'top 90%', once: true },
        y: 20, opacity: 0, duration: 0.8,
        delay: (i + 1) * 0.1, ease: 'power3.out'
      });
    });
  }());

  /* ══════════════════════════════════════
     ROOM PROGRESS INDICATOR
  ══════════════════════════════════════ */
  (function initRoomProgress() {
    var rooms = qsa('.room-row');
    if (!rooms.length) return;

    // Build indicator
    var prog = document.createElement('div');
    prog.className = 'room-progress';
    prog.setAttribute('aria-hidden', 'true');

    rooms.forEach(function (_, i) {
      if (i > 0) {
        var line = document.createElement('div');
        line.className = 'rp-line';
        prog.appendChild(line);
      }
      var dot = document.createElement('div');
      dot.className = 'rp-dot' + (i === 0 ? ' rp-active' : '');
      dot.dataset.idx = i;
      prog.appendChild(dot);
    });
    document.body.appendChild(prog);

    var dots = qsa('.rp-dot', prog);

    // Show/hide when rooms section is in view
    ScrollTrigger.create({
      trigger: '.s-rooms',
      start: 'top center',
      end: 'bottom center',
      onToggle: function (self) {
        prog.classList.toggle('visible', self.isActive);
      }
    });

    // Update active dot per room
    rooms.forEach(function (room, i) {
      ScrollTrigger.create({
        trigger: room,
        start: 'top 55%',
        end: 'bottom 55%',
        onEnter:     function () { activate(i); },
        onEnterBack: function () { activate(i); }
      });
    });

    function activate(idx) {
      dots.forEach(function (d, i) { d.classList.toggle('rp-active', i === idx); });
    }
  }());

  /* ══════════════════════════════════════
     CHAPTER LABEL (fixed left side)
  ══════════════════════════════════════ */
  (function initChapterPin() {
    var pin = document.createElement('div');
    pin.className = 'chapter-pin';
    pin.id = 'chapterPin';
    pin.setAttribute('aria-hidden', 'true');
    document.body.appendChild(pin);

    var chapters = [
      { el: '#hero',       label: 'Above the City' },
      { el: '#arrival',    label: 'The Arrival' },
      { el: '#rooms',      label: 'The Quiet Floor' },
      { el: '#interiors',  label: 'Warm Interiors' },
      { el: '#amenities',  label: 'The Stay' },
      { el: '#atrium',     label: 'Light Atrium' },
      { el: '#building',   label: 'Rajkot Connection' },
      { el: '#location',   label: 'Find Us' },
      { el: '#guests',     label: 'Guest Moments' },
      { el: '#reserve',    label: 'Reserve' }
    ];

    chapters.forEach(function (ch) {
      var el = qs(ch.el);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: 'top 50%',
        onEnter:     function () { pin.textContent = ch.label; pin.classList.add('visible'); },
        onEnterBack: function () { pin.textContent = ch.label; pin.classList.add('visible'); }
      });
    });

    // Hide at very top
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      onLeaveBack: function () { pin.classList.remove('visible'); }
    });
  }());

  /* ══════════════════════════════════════
     TESTIMONIAL CAROUSEL
  ══════════════════════════════════════ */
  (function initCarousel() {
    var cards   = qsa('.guest-card');
    var dots    = qsa('.gc-dot');
    if (!cards.length) return;

    var current = 0;
    var timer;

    function show(idx) {
      cards[current].classList.remove('gc-active');
      cards[current].setAttribute('aria-hidden', 'true');
      dots[current].classList.remove('gcd-active');
      current = idx;
      cards[current].classList.add('gc-active');
      cards[current].removeAttribute('aria-hidden');
      dots[current].classList.add('gcd-active');
    }

    function advance() { show((current + 1) % cards.length); }

    function startAuto() { timer = setInterval(advance, 5200); }
    function stopAuto()  { clearInterval(timer); }

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        stopAuto();
        show(parseInt(dot.dataset.idx, 10));
        startAuto();
      });
    });

    // Touch swipe support
    var track = qs('.guests-track');
    if (track) {
      var touchStartX = 0;
      track.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      track.addEventListener('touchend', function (e) {
        var dx = e.changedTouches[0].screenX - touchStartX;
        if (Math.abs(dx) < 40) return;
        stopAuto();
        if (dx < 0) show((current + 1) % cards.length);
        else        show((current - 1 + cards.length) % cards.length);
        startAuto();
      }, { passive: true });
      track.addEventListener('mouseenter', stopAuto);
      track.addEventListener('mouseleave', startAuto);
    }

    startAuto();
  }());

  /* ══════════════════════════════════════
     RESERVE FORM
  ══════════════════════════════════════ */
  (function initReserveForm() {
    var form    = qs('#reserveForm');
    if (!form) return;

    // Min dates
    var today   = new Date().toISOString().split('T')[0];
    var ciInput = qs('#rf-checkin', form);
    var coInput = qs('#rf-checkout', form);
    if (ciInput) ciInput.min = today;
    if (coInput) coInput.min = today;

    if (ciInput && coInput) {
      ciInput.addEventListener('change', function () {
        if (!ciInput.value) return;
        var d = new Date(ciInput.value);
        d.setDate(d.getDate() + 1);
        coInput.min = d.toISOString().split('T')[0];
        if (coInput.value && coInput.value <= ciInput.value) coInput.value = '';
      });
    }

    // Inline validation feedback
    var inputs = qsa('input[required], select[required]', form);
    inputs.forEach(function (inp) {
      inp.addEventListener('blur', function () {
        inp.style.borderColor = inp.value ? 'var(--sand-mid)' : 'rgba(180,80,60,0.5)';
      });
      inp.addEventListener('input', function () {
        if (inp.value) inp.style.borderColor = 'var(--oak-dark)';
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = qs('.rf-submit', form);
      var txt = qs('.rfs-text', btn);
      var ico = qs('.rfs-icon', btn);
      if (btn.disabled) return;
      if (txt) txt.textContent = 'Sent! We\'ll reply shortly.';
      if (ico) ico.textContent = '✓';
      btn.disabled = true;
      btn.style.background = 'var(--taupe)';
      setTimeout(function () {
        if (txt) txt.textContent = 'Send Enquiry';
        if (ico) ico.textContent = '→';
        btn.disabled = false;
        btn.style.background = '';
        form.reset();
        inputs.forEach(function (inp) { inp.style.borderColor = ''; });
      }, 4500);
    });
  }());

  /* ══════════════════════════════════════
     THREE.JS — THE LIGHT ATRIUM
     Architectural light installation:
     - Floating rectangular "light planes"
       inspired by the hotel's ceiling panels
     - Warm amber point lights drifting slowly
     - Subtle building geometry in the background
  ══════════════════════════════════════ */
  (function initThreeAtrium() {
    if (typeof THREE === 'undefined') return;
    if (pRM) return;

    var canvas   = qs('#atriumCanvas');
    var container = qs('.s-atrium');
    if (!canvas || !container) return;

    /* Renderer */
    var renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x1a140e, 1);

    /* Scene + Camera */
    var scene  = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(60, container.offsetWidth / container.offsetHeight, 0.1, 100);
    camera.position.set(0, 0, 6);

    /* Fog for depth */
    scene.fog = new THREE.Fog(0x1a140e, 8, 24);

    /* ── Ambient + point lights ── */
    var ambient = new THREE.AmbientLight(0xf5e8cc, 0.3);
    scene.add(ambient);

    var lightColors = [0xe8c07a, 0xd4956a, 0xf0d898, 0xc8a060];
    var pointLights = [];
    lightColors.forEach(function (col, i) {
      var pl = new THREE.PointLight(col, 1.2, 12);
      var angle = (i / lightColors.length) * Math.PI * 2;
      pl.position.set(Math.cos(angle) * 3, Math.sin(angle * 0.7) * 1.5, rnd(-2, 2));
      scene.add(pl);
      pointLights.push({ light: pl, speed: rnd(0.003, 0.007), offset: i * 1.6 });
    });

    /* ── Architectural planes (ceiling slat panels) ── */
    var planeMat = new THREE.MeshStandardMaterial({
      color: 0xc9a87c,
      metalness: 0.1,
      roughness: 0.85,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide
    });

    var planes = [];
    for (var i = 0; i < 14; i++) {
      var w = rnd(0.04, 0.1);
      var h = rnd(2.5, 5.5);
      var geo = new THREE.PlaneGeometry(w, h);
      var mesh = new THREE.Mesh(geo, planeMat.clone());
      mesh.position.set(rnd(-6, 6), rnd(-3, 3), rnd(-4, 0));
      mesh.rotation.z = rnd(-0.15, 0.15);
      mesh.material.opacity = rnd(0.06, 0.22);
      scene.add(mesh);
      planes.push({ mesh: mesh, vy: rnd(-0.0008, 0.0008), vx: rnd(-0.0004, 0.0004) });
    }

    /* ── Building outline geometry ── */
    var buildingOutline = (function () {
      // Simplified 9 Square building silhouette (curved top)
      var shape = new THREE.Shape();
      shape.moveTo(-1.8, -2.5);
      shape.lineTo(-1.8, 0.5);
      shape.bezierCurveTo(-1.8, 2.8, 1.8, 2.8, 1.8, 0.5);
      shape.lineTo(1.8, -2.5);
      shape.lineTo(-1.8, -2.5);

      var points = shape.getPoints(60);
      var positions = [];
      points.forEach(function (p) {
        positions.push(p.x, p.y, 0);
      });

      var lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      var lineMat = new THREE.LineBasicMaterial({ color: 0x9a7650, transparent: true, opacity: 0.07 });
      var line = new THREE.Line(lineGeo, lineMat);
      line.position.set(0, 0, -3);
      line.scale.set(1.2, 1.2, 1);
      scene.add(line);
      return line;
    }());

    /* ── Grid of small amber glows ── */
    var glowGeo = new THREE.CircleGeometry(0.03, 8);
    var glowMat = new THREE.MeshBasicMaterial({ color: 0xe8b85a, transparent: true, opacity: 0.5 });
    var glows   = [];
    for (var g = 0; g < 30; g++) {
      var gm = new THREE.Mesh(glowGeo, glowMat.clone());
      gm.position.set(rnd(-7, 7), rnd(-3.5, 3.5), rnd(-3, 1));
      gm.material.opacity = rnd(0.1, 0.55);
      scene.add(gm);
      glows.push({ mesh: gm, speed: rnd(0.004, 0.012), offset: rnd(0, Math.PI * 2) });
    }

    /* ── Animation loop ── */
    var clock  = new THREE.Clock();
    var active = false;

    // Only run when section is visible
    var observer = new IntersectionObserver(function (entries) {
      active = entries[0].isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(container);

    function animate() {
      requestAnimationFrame(animate);
      if (!active) return;

      var t = clock.getElapsedTime();

      // Drift point lights in slow ellipses
      pointLights.forEach(function (pl) {
        var angle = t * pl.speed + pl.offset;
        pl.light.position.x = Math.cos(angle) * 3.5;
        pl.light.position.y = Math.sin(angle * 1.3) * 1.8;
        pl.light.position.z = Math.sin(angle * 0.7) * 2;
      });

      // Float planes gently
      planes.forEach(function (p) {
        p.mesh.position.y += p.vy;
        p.mesh.position.x += p.vx;
        if (p.mesh.position.y > 4)  p.vy *= -1;
        if (p.mesh.position.y < -4) p.vy *= -1;
        if (p.mesh.position.x > 7)  p.vx *= -1;
        if (p.mesh.position.x < -7) p.vx *= -1;
      });

      // Pulse glows
      glows.forEach(function (gl) {
        gl.mesh.material.opacity = 0.1 + Math.sin(t * gl.speed + gl.offset) * 0.25;
        gl.mesh.material.opacity = clamp(gl.mesh.material.opacity, 0.05, 0.6);
      });

      // Slow building outline rotation
      if (buildingOutline) {
        buildingOutline.rotation.z = Math.sin(t * 0.06) * 0.018;
      }

      // Very subtle camera sway
      camera.position.x = Math.sin(t * 0.08) * 0.15;
      camera.position.y = Math.cos(t * 0.06) * 0.08;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
    animate();

    /* Resize */
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        var w = container.offsetWidth;
        var h = container.offsetHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }, 200);
    });
  }());

  /* ══════════════════════════════════════
     HERO IMAGE SCALE-IN
  ══════════════════════════════════════ */
  (function () {
    var hero = qs('.s-hero');
    var img  = qs('.hero-img', hero);
    if (!hero || !img) return;
    function mark() { hero.classList.add('loaded'); }
    if (img.complete && img.naturalWidth) mark();
    else img.addEventListener('load', mark);
  }());

  /* ══════════════════════════════════════
     SCROLL TRIGGER REFRESH ON RESIZE
  ══════════════════════════════════════ */
  var rTimer;
  window.addEventListener('resize', function () {
    clearTimeout(rTimer);
    rTimer = setTimeout(function () { ScrollTrigger.refresh(); }, 250);
  });

  /* ══════════════════════════════════════
     CONSOLE STAMP
  ══════════════════════════════════════ */
  if (window.console && console.log) {
    console.log(
      '%c Hotel 9 Square ',
      'background:#9a7650;color:#f5efe4;font-family:serif;font-size:18px;font-weight:bold;padding:5px 14px;border-radius:4px;'
    );
    console.log('%c Above the City · Ayodhya Chowk, Rajkot, Gujarat ', 'color:#9a7650;font-size:11px;');
  }

}());
