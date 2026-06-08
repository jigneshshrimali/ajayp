/* ═══════════════════════════════════════════
   NANDANVAN CRAFTED — script.js
   The Never Ending Thali
═══════════════════════════════════════════ */

/* ── GSAP PLUGINS ── */
gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════
   1. NAVBAR
══════════════════════════════════════════ */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('navMobile');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMobile.classList.toggle('open');
  });

  document.querySelectorAll('.nav-mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMobile.classList.remove('open');
    });
  });
})();

/* ══════════════════════════════════════════
   2. HERO DOTS
══════════════════════════════════════════ */
(function initHeroDots() {
  const wrap   = document.getElementById('heroDots');
  const colors = ['#d4a017','#c8884a','#88b04b','#e8793a'];
  for (let i = 0; i < 28; i++) {
    const d = document.createElement('div');
    d.className = 'hero-dot';
    const size = 4 + (i % 5) * 2;
    d.style.cssText = `
      width:${size}px;height:${size}px;
      top:${8 + (i * 37) % 84}%;
      left:${4 + (i * 29) % 92}%;
      background:${colors[i % colors.length]};
      --dur:${3 + (i % 4)}s;
      --delay:${(i * 0.18).toFixed(2)}s;
    `;
    wrap.appendChild(d);
  }
})();

/* ══════════════════════════════════════════
   3. THREE.JS INFINITE THALI
══════════════════════════════════════════ */
(function initThali() {
  const canvas = document.getElementById('thaliCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const W = canvas.parentElement.clientWidth  || 480;
  const H = canvas.parentElement.clientHeight || 480;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
  camera.position.set(0, 3.5, 5);
  camera.lookAt(0, 0, 0);

  /* Lights */
  scene.add(new THREE.AmbientLight(0xfff8e8, 1.0));
  const dirLight = new THREE.DirectionalLight(0xfffbe0, 1.6);
  dirLight.position.set(4, 8, 4);
  scene.add(dirLight);
  const fillLight = new THREE.DirectionalLight(0xf0d090, 0.5);
  fillLight.position.set(-3, 3, -3);
  scene.add(fillLight);
  const pointLight = new THREE.PointLight(0xffd060, 0.8, 20);
  pointLight.position.set(0, 5, 0);
  scene.add(pointLight);

  /* Group for float */
  const thaliGroup = new THREE.Group();
  scene.add(thaliGroup);

  /* Thali plate */
  const plateGeo = new THREE.CylinderGeometry(2.2, 2.0, 0.06, 64);
  const plateMat = new THREE.MeshStandardMaterial({ color: 0xc8a96e, metalness: 0.7, roughness: 0.2 });
  thaliGroup.add(new THREE.Mesh(plateGeo, plateMat));

  /* Rim */
  const rimGeo = new THREE.TorusGeometry(2.1, 0.12, 16, 80);
  const rimMat = new THREE.MeshStandardMaterial({ color: 0xb8942a, metalness: 0.8, roughness: 0.15 });
  const rim    = new THREE.Mesh(rimGeo, rimMat);
  rim.rotation.x = -Math.PI / 2;
  thaliGroup.add(rim);

  /* Bowl helper — lathe geometry */
  function makeBowl(r, color, px, pz) {
    const pts = [];
    for (let i = 0; i <= 12; i++) {
      const t = i / 12;
      pts.push(new THREE.Vector2(r * Math.sin(t * Math.PI * 0.55), -r * 0.35 + t * r * 0.5));
    }
    const geo = new THREE.LatheGeometry(pts, 32);
    const mat = new THREE.MeshStandardMaterial({ color, metalness: 0.3, roughness: 0.4, side: THREE.DoubleSide });
    const m   = new THREE.Mesh(geo, mat);
    m.position.set(px, 0.15, pz);
    thaliGroup.add(m);
    return m;
  }

  const bowls = [
    makeBowl(0.42, 0xd4a017,  0,    0),
    makeBowl(0.26, 0xc8884a,  1.1,  0.3),
    makeBowl(0.26, 0x88b04b, -1.05, 0.4),
    makeBowl(0.26, 0xe8c97a,  0.6, -0.95),
    makeBowl(0.26, 0xe8793a, -0.6, -0.9),
    makeBowl(0.20, 0xc8a96e,  1.35,-0.65),
    makeBowl(0.20, 0xa05a2c, -1.35,-0.6),
  ];

  /* Rotli discs */
  const rotlis = [];
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2 + Math.PI / 8;
    const geo   = new THREE.CylinderGeometry(0.28, 0.28, 0.035, 32);
    const mat   = new THREE.MeshStandardMaterial({ color: 0xe8c97a, metalness: 0.1, roughness: 0.7 });
    const m     = new THREE.Mesh(geo, mat);
    m.position.set(Math.cos(angle) * 1.65, 0.14, Math.sin(angle) * 1.65);
    thaliGroup.add(m);
    rotlis.push({ mesh: m, angle, baseY: 0.14 });
  }

  /* Orbiting particles */
  const particles = [];
  const pColors   = [0xd4a017, 0xc8884a, 0x88b04b, 0xe8793a, 0xc8a96e];
  for (let i = 0; i < 18; i++) {
    const geo = new THREE.DodecahedronGeometry(0.055 + (i % 3) * 0.02);
    const mat = new THREE.MeshStandardMaterial({ color: pColors[i % pColors.length], metalness: 0.4, roughness: 0.3 });
    const m   = new THREE.Mesh(geo, mat);
    scene.add(m);
    particles.push({ mesh: m, index: i });
  }

  /* Animate */
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    /* Float group */
    thaliGroup.rotation.y = t * 0.08;
    thaliGroup.position.y = Math.sin(t * 0.5) * 0.04;

    /* Bowls */
    bowls.forEach((b, i) => {
      b.rotation.y = t * (0.6 + i * 0.05) + i;
      b.position.y = 0.15 + Math.sin(t * 0.8 + i) * 0.06;
    });

    /* Rotlis */
    rotlis.forEach((r, i) => {
      r.mesh.rotation.z = t * 0.4 + r.angle;
      r.mesh.position.y = r.baseY + Math.sin(t * 0.6 + r.angle) * 0.05;
    });

    /* Particles */
    particles.forEach(({ mesh, index: i }) => {
      const a = (i / 18) * Math.PI * 2 + t * 0.15;
      const rad = 2.8 + Math.sin(t * 0.3 + i) * 0.15;
      mesh.position.set(Math.cos(a) * rad, Math.sin(t * 0.8 + i * 0.7) * 0.2 + 0.3, Math.sin(a) * rad);
      mesh.rotation.y = t * 0.5 + i;
    });

    renderer.render(scene, camera);
  }
  animate();

  /* Resize */
  window.addEventListener('resize', () => {
    const nw = canvas.parentElement.clientWidth;
    const nh = canvas.parentElement.clientHeight;
    renderer.setSize(nw, nh);
    camera.aspect = nw / nh;
    camera.updateProjectionMatrix();
  });
})();

/* ══════════════════════════════════════════
   4. HERO ENTRANCE ANIMATIONS (GSAP)
══════════════════════════════════════════ */
(function heroEntrance() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to('#heroTitle .hero-title-main', { opacity: 1, y: 0, duration: 0.9, delay: 0.3 })
    .to('#heroTitle .hero-title-sub',  { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
    .to('#heroTagline',  { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
    .to('#heroSub',      { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
    .to('#heroBtns',     { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
    .to('#heroChips',    { opacity: 1, duration: 0.8 }, '-=0.3')
    .to('#heroThali',    { opacity: 1, scale: 1, duration: 1.0, ease: 'back.out(1.4)' }, 0.5)
    .to('#scrollHint',   { opacity: 1, duration: 0.8 }, '-=0.2');
})();

/* ══════════════════════════════════════════
   5. SCROLL ANIMATIONS — GSAP ScrollTrigger
══════════════════════════════════════════ */
(function initScrollAnimations() {

  /* Generic reveal: opacity + y */
  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  /* Reveal cards: with tilt */
  gsap.utils.toArray('.reveal-card').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1, y: 0, rotation: 0, duration: 0.65,
      ease: 'back.out(1.5)',
      delay: i * 0.08,
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  /* Bowl pop-in */
  gsap.utils.toArray('.reveal-bowl').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1, scale: 1, rotation: 0, duration: 0.6,
      ease: 'back.out(1.8)',
      delay: i * 0.08,
      scrollTrigger: { trigger: '#bowlsGrid', start: 'top 85%', toggleActions: 'play none none none' }
    });
  });

  /* Hero parallax */
  gsap.to('#heroTitle', {
    y: -80, ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  /* Rotli visual spin-in */
  gsap.from('#rotliVisual', {
    scale: 0.5, opacity: 0, duration: 1.0, ease: 'back.out(1.4)',
    scrollTrigger: { trigger: '#rotliVisual', start: 'top 80%' }
  });

})();

/* ══════════════════════════════════════════
   6. MENU DATA + RENDER
══════════════════════════════════════════ */
(function initMenu() {
  const menuData = {
    sabzi:   { label: 'Sabzi',            emoji: '🥗', color: '#88b04b', items: ['Ringan Nu Shaak','Bhinda Nu Shaak','Bateta Nu Shaak','Methi Muthiya'] },
    farsan:  { label: 'Farsan',           emoji: '🧆', color: '#e8793a', items: ['Dhokla','Khandvi','Fafda','Sev Mamra','Gathiya'] },
    dal:     { label: 'Dal & Chhas',      emoji: '🍲', color: '#d4a017', items: ['Dal Tadka','Dal Dhokli','Chaas'] },
    rice:    { label: 'Rice',             emoji: '🍚', color: '#e8c97a', items: ['Steamed Rice','Khichdi','Jeera Rice'] },
    rotli:   { label: 'Rotli & Bread',    emoji: '🫓', color: '#c8884a', items: ['Fresh Rotli','Puri','Thepla','Bajra Rotla'] },
    sweets:  { label: 'Sweets',           emoji: '🍮', color: '#f0a0b8', items: ['Gulab Jamun','Basundi','Sukhdi','Mohanthal'] },
    kathol:  { label: 'Kathol',           emoji: '🫘', color: '#a05a2c', items: ['Moong Dal','Chana Masala','Rajma'] },
    extras:  { label: 'Extras',           emoji: '🥒', color: '#88b04b', items: ['Papad','Kachumber Salad','Mango Pickle','Green Chutney','Unlimited Chhas'] },
  };

  /* Date badge */
  const today = new Date();
  document.getElementById('menuDate').textContent =
    '📅 ' + today.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

  /* Build grid */
  const grid = document.getElementById('menuGrid');
  Object.entries(menuData).forEach(([, cat], i) => {
    const card = document.createElement('div');
    card.className = 'menu-cat';
    card.style.setProperty('--cat-color', cat.color);
    card.style.transitionDelay = `${i * 0.08}s`;
    card.innerHTML = `
      <div class="menu-cat-header">
        <span class="menu-cat-emoji">${cat.emoji}</span>
        <span class="menu-cat-title">${cat.label}</span>
      </div>
      <ul>${cat.items.map(item => `<li>${item}</li>`).join('')}</ul>
    `;
    grid.appendChild(card);
  });

  /* Observe and reveal */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.menu-cat').forEach(c => io.observe(c));
})();

/* ══════════════════════════════════════════
   7. GALLERY
══════════════════════════════════════════ */
(function initGallery() {
  const galleryData = [
    { id:1,  category:'thali',  emoji:'🍽️', title:'Full Gujarati Thali',    desc:'Unlimited, as always',      bg:'#fdf0d0', span:'wide'   },
    { id:2,  category:'food',   emoji:'🟡',  title:'Dal Dhokli',             desc:'Soul food of Gujarat',      bg:'#fdf5d8'                 },
    { id:3,  category:'dining', emoji:'🏛️', title:'Dining Hall',            desc:'Spacious family seating',   bg:'#eef5e8'                 },
    { id:4,  category:'food',   emoji:'🧆',  title:'Fresh Farsan',           desc:'Made every morning',        bg:'#fdf0e0', span:'tall'   },
    { id:5,  category:'thali',  emoji:'🫓',  title:'Rotli Station',          desc:'Hot off the tawa',          bg:'#fef5e0'                 },
    { id:6,  category:'family', emoji:'👨‍👩‍👧',  title:'Family Moments',         desc:'Weekend lunches',           bg:'#fde8f0'                 },
    { id:7,  category:'food',   emoji:'🍮',  title:'Basundi',                desc:'Thick, creamy sweet',       bg:'#fdf5d8'                 },
    { id:8,  category:'dining', emoji:'✨',   title:'Clean Interiors',        desc:'Welcoming atmosphere',      bg:'#f8f0e0', span:'wide'   },
    { id:9,  category:'thali',  emoji:'🥗',  title:'Sabzi Spread',           desc:'Seasonal vegetables',       bg:'#eef5e8'                 },
    { id:10, category:'family', emoji:'🎉',  title:'Celebrations',           desc:'Birthdays & gatherings',    bg:'#fde8f0'                 },
    { id:11, category:'food',   emoji:'🍲',  title:'Dal Tadka',              desc:'Tempered to perfection',    bg:'#fdf0e0'                 },
    { id:12, category:'dining', emoji:'🌅',  title:'Warm Ambience',          desc:'Perfect for every meal',    bg:'#f8ecd8', span:'tall'   },
  ];

  const grid     = document.getElementById('galleryGrid');
  const lightbox = document.getElementById('lightbox');
  const lbBg     = document.getElementById('lightboxBg');
  const lbClose  = document.getElementById('lightboxClose');
  const lbEmoji  = document.getElementById('lightboxEmoji');
  const lbTitle  = document.getElementById('lightboxTitle');
  const lbDesc   = document.getElementById('lightboxDesc');

  /* Build items */
  galleryData.forEach(item => {
    const el = document.createElement('div');
    el.className = 'gallery-item';
    el.dataset.category = item.category;
    el.innerHTML = `
      <div class="gallery-item-inner" style="background:${item.bg}">
        <span class="gi-emoji">${item.emoji}</span>
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </div>
      <span class="gallery-cat-pill">${item.category}</span>
    `;
    el.addEventListener('click', () => openLightbox(item));
    grid.appendChild(el);
  });

  /* Observe for reveal */
  const io = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 60);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.gallery-item').forEach(el => io.observe(el));

  /* Filters */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.gallery-item').forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('hidden', !show);
      });
    });
  });

  /* Lightbox */
  function openLightbox(item) {
    lbEmoji.textContent = item.emoji;
    lbTitle.textContent = item.title;
    lbDesc.textContent  = item.desc;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  lbBg.addEventListener('click', closeLightbox);
  lbClose.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
})();

/* ══════════════════════════════════════════
   8. FOOTER YEAR
══════════════════════════════════════════ */
document.getElementById('footerYear').textContent =
  '© ' + new Date().getFullYear() + ' Nandanvan Crafted. All rights reserved.';

/* ══════════════════════════════════════════
   9. SCROLL TO EAT CLICK
══════════════════════════════════════════ */
document.getElementById('scrollHint').addEventListener('click', () => {
  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
});

/* ══════════════════════════════════════════
   10. SMOOTH ANCHOR SCROLL
══════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
