/* ═══════════════════════════════════════════
   NANDANVAN CRAFTED — script.js
═══════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════
   1. NAVBAR
══════════════════════════════════════════ */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('navMobile');

  window.addEventListener('scroll', function() {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('open');
    navMobile.classList.toggle('open');
  });

  document.querySelectorAll('.nav-mobile-link').forEach(function(link) {
    link.addEventListener('click', function() {
      hamburger.classList.remove('open');
      navMobile.classList.remove('open');
    });
  });
})();

/* ══════════════════════════════════════════
   2. HERO ENTRANCE
══════════════════════════════════════════ */
(function initHeroEntrance() {
  gsap.from('.hero-badge',    { opacity: 0, y: 20, duration: 0.7, delay: 0.3, ease: 'power2.out' });
  gsap.from('.hero-title',    { opacity: 0, y: 30, duration: 0.9, delay: 0.5, ease: 'power3.out' });
  gsap.from('.hero-tagline',  { opacity: 0, y: 20, duration: 0.7, delay: 0.75, ease: 'power2.out' });
  gsap.from('.hero-sub',      { opacity: 0, y: 20, duration: 0.7, delay: 0.9,  ease: 'power2.out' });
  gsap.from('.hero-btns',     { opacity: 0, y: 20, duration: 0.7, delay: 1.05, ease: 'power2.out' });
  gsap.from('.hero-chips',    { opacity: 0, y: 10, duration: 0.6, delay: 1.2,  ease: 'power2.out' });
  gsap.from('.hero-photo-1',  { opacity: 0, x: 60, rotation: 5, duration: 1.1, delay: 0.7, ease: 'back.out(1.4)' });
  gsap.from('.hero-photo-2',  { opacity: 0, x: 40, rotation: -4, duration: 1.0, delay: 0.9, ease: 'back.out(1.4)' });

  /* Hero parallax */
  gsap.to('.hero-bg-img', {
    y: '20%',
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });
})();

/* ══════════════════════════════════════════
   3. SCROLL REVEALS
══════════════════════════════════════════ */
(function initReveal() {
  /* Generic .reveal class */
  function observeReveal(selector) {
    var elements = document.querySelectorAll(selector);
    if (!elements.length) return;
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach(function(el) { io.observe(el); });
  }
  observeReveal('.reveal');

  /* GSAP section animations */
  gsap.from('.story-text', {
    opacity: 0, x: -40, duration: 0.9, ease: 'power2.out',
    scrollTrigger: { trigger: '.story-grid', start: 'top 78%' }
  });
  gsap.from('.story-photos', {
    opacity: 0, x: 40, duration: 0.9, ease: 'power2.out',
    scrollTrigger: { trigger: '.story-grid', start: 'top 78%' }
  });
  gsap.from('.thali-hero-text', {
    opacity: 0, x: -40, duration: 0.9, ease: 'power2.out',
    scrollTrigger: { trigger: '.thali-hero-overlay', start: 'top 80%' }
  });
  gsap.utils.toArray('.thali-item').forEach(function(el, i) {
    gsap.from(el, {
      opacity: 0, y: 20, duration: 0.5, delay: i * 0.06, ease: 'power2.out',
      scrollTrigger: { trigger: '.thali-items-grid', start: 'top 85%' }
    });
  });
  gsap.from('.strip-left img', {
    opacity: 0, x: -30, duration: 0.8, ease: 'power2.out',
    scrollTrigger: { trigger: '.strip-left', start: 'top 80%' }
  });
  gsap.from('.strip-right img', {
    opacity: 0, x: 30, duration: 0.8, ease: 'power2.out',
    scrollTrigger: { trigger: '.strip-right', start: 'top 80%' }
  });
  gsap.utils.toArray('.why-card').forEach(function(el, i) {
    gsap.from(el, {
      opacity: 0, y: 24, duration: 0.55, delay: i * 0.07, ease: 'power2.out',
      scrollTrigger: { trigger: '.why-grid', start: 'top 82%' }
    });
  });
})();

/* ══════════════════════════════════════════
   4. MENU
══════════════════════════════════════════ */
(function initMenu() {
  var menuData = {
    sabzi:   { label: 'Sabzi',         emoji: '🥗', color: '#5a8a3a', items: ['Ringan Nu Shaak','Bhinda Nu Shaak','Bateta Nu Shaak','Methi Muthiya'] },
    farsan:  { label: 'Farsan',        emoji: '🧆', color: '#e8793a', items: ['Dhokla','Khandvi','Fafda','Sev Mamra','Gathiya'] },
    dal:     { label: 'Dal & Chhas',   emoji: '🍲', color: '#b8860b', items: ['Dal Tadka','Dal Dhokli','Chaas'] },
    rice:    { label: 'Rice',          emoji: '🍚', color: '#c4850a', items: ['Steamed Rice','Khichdi','Jeera Rice'] },
    rotli:   { label: 'Rotli & Bread', emoji: '🫓', color: '#9a4a28', items: ['Fresh Rotli','Puri','Thepla','Bajra Rotla'] },
    sweets:  { label: 'Sweets',        emoji: '🍮', color: '#c0607a', items: ['Gulab Jamun','Basundi','Sukhdi','Mohanthal'] },
    kathol:  { label: 'Kathol',        emoji: '🫘', color: '#7a5a3a', items: ['Moong Dal','Chana Masala','Rajma'] },
    extras:  { label: 'Extras',        emoji: '🥒', color: '#4a7a9a', items: ['Papad','Kachumber Salad','Mango Pickle','Green Chutney','Unlimited Chhas'] },
  };

  var today = new Date();
  document.getElementById('menuDate').textContent =
    today.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  var grid = document.getElementById('menuGrid');
  Object.entries(menuData).forEach(function(entry, i) {
    var cat = entry[1];
    var card = document.createElement('div');
    card.className = 'menu-cat';
    card.style.setProperty('--cat-color', cat.color);
    card.style.transitionDelay = (i * 0.07) + 's';
    card.innerHTML =
      '<div class="menu-cat-header">' +
        '<span class="menu-cat-emoji">' + cat.emoji + '</span>' +
        '<span class="menu-cat-title">' + cat.label + '</span>' +
      '</div>' +
      '<ul>' + cat.items.map(function(item) { return '<li>' + item + '</li>'; }).join('') + '</ul>';
    grid.appendChild(card);
  });

  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.menu-cat').forEach(function(c) { io.observe(c); });
})();

/* ══════════════════════════════════════════
   5. GALLERY
══════════════════════════════════════════ */
(function initGallery() {
  var photos = [
    { img: 'fulldish2.jpg', cat: 'thali',      title: 'Full Gujarati Thali',      desc: 'Unlimited, as always'              },
    { img: '7.jpg', cat: 'thali',      title: 'The Golden Thali',         desc: 'Pure brass — pure tradition'       },
    { img: '12.jpg', cat: 'thali',      title: 'Methi Thepla Spread',      desc: 'Seasonal rotlis & sabzi'           },
    { img: 'pan.png', cat: 'food',       title: 'Sweet Paan Ending',        desc: 'Freshly folded after every meal'   },
    { img: 'unnamed.jpg', cat: 'restaurant',  title: 'The Experience',          desc: 'Fresh made every morning'          },
    { img: '6.jpg', cat: 'restaurant',       title: 'Nandanvan Crafted at Night',            desc: 'Hot off the tawa'                  },
    { img: '5.jpg', cat: 'restaurant',      title: 'Nandanvan Entrance',        desc: 'Your bowl never runs empty'        },
    { img: '4.jpg', cat: 'restaurant', title: 'The Experience',           desc: 'Where every meal is a memory'      },
    { img: 'interior1.jpg', cat: 'restaurant',       title: 'Nandanvan Crafted Interior',       desc: 'Cooked with love daily'            },
    { img: '2.jpg', cat: 'thali',      title: 'Complete Thali View',      desc: '15+ items every sitting'           },
    { img: '1.jpg', cat: 'restaurant', title: 'Nandanvan Entrance',       desc: 'Ayodhya Chowk, Rajkot'            },
    { img: '8.jpg', cat: 'restaurant', title: 'Nandanvan Crafted Interior',        desc: '150 Feet Ring Road'                },
  ];

  var grid       = document.getElementById('galleryGrid');
  var lightbox   = document.getElementById('lightbox');
  var lbBg       = document.getElementById('lightboxBg');
  var lbClose    = document.getElementById('lightboxClose');
  var lbImg      = document.getElementById('lightboxImg');
  var lbTitle    = document.getElementById('lightboxTitle');
  var lbDesc     = document.getElementById('lightboxDesc');

  photos.forEach(function(item) {
    var el = document.createElement('div');
    el.className = 'gallery-item';
    el.dataset.category = item.cat;
    el.innerHTML =
      '<img class="gi-img" src="' + item.img + '" alt="' + item.title + '" loading="lazy" />' +
      '<div class="gi-overlay"><h3>' + item.title + '</h3><p>' + item.desc + '</p></div>' +
      '<span class="gallery-cat-pill">' + item.cat + '</span>';
    el.addEventListener('click', function() { openLightbox(item); });
    grid.appendChild(el);
  });

  /* Staggered reveal */
  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(e, i) {
      if (e.isIntersecting) {
        var idx = Array.from(grid.children).indexOf(e.target);
        setTimeout(function() { e.target.classList.add('visible'); }, idx * 60);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.06 });
  document.querySelectorAll('.gallery-item').forEach(function(el) { io.observe(el); });

  /* Filter buttons */
  document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.dataset.filter;
      document.querySelectorAll('.gallery-item').forEach(function(item) {
        var show = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('hidden', !show);
        if (show && !item.classList.contains('visible')) {
          setTimeout(function() { item.classList.add('visible'); }, 80);
        }
      });
    });
  });

  /* Lightbox */
  function openLightbox(item) {
    lbImg.src       = item.img;
    lbImg.alt       = item.title;
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
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeLightbox(); });
})();

/* ══════════════════════════════════════════
   6. FOOTER YEAR
══════════════════════════════════════════ */
document.getElementById('footerYear').textContent =
  '© ' + new Date().getFullYear() + ' Nandanvan Crafted. All rights reserved.';

/* ══════════════════════════════════════════
   7. SMOOTH SCROLL
══════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(function(a) {
  a.addEventListener('click', function(e) {
    var target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ══════════════════════════════════════════
   8. SCROLL HINT CLICK
══════════════════════════════════════════ */
var scrollHint = document.querySelector('.scroll-hint');
if (scrollHint) {
  scrollHint.addEventListener('click', function() {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  });
}
