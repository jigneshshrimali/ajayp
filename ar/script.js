/**
 * ASHIRWAD — SYSTEM LAYER
 * script.js · Production v3.0
 */
(function () {
  'use strict';

  // Inform CSS engine that JavaScript is active to safely handle reveals
  document.body.classList.add('js-enabled');

  function qs(selector, context) { return (context || document).querySelector(selector); }
  function qsa(selector, context) { return Array.from((context || document).querySelectorAll(selector)); }
  function lerp(start, end, factor) { return start + (end - start) * factor; }

  /* ── PROGRESS BAR ── */
  var scrollProgress = qs('#scrollProgress');
  if (scrollProgress) {
    window.addEventListener('scroll', function () {
      var docEl = document.documentElement;
      var scrollTotal = docEl.scrollHeight - window.innerHeight;
      var currentPercentage = scrollTotal > 0 ? (window.scrollY / scrollTotal) * 100 : 0;
      scrollProgress.style.width = currentPercentage + '%';
    }, { passive: true });
  }

  /* ── NAVIGATION AND INTERACTIVE OVERLAYS ── */
  (function initNavigationSystem() {
    var siteNav = qs('#siteNav');
    var navToggle = qs('#navToggle');
    var mobileMenu = qs('#mobileMenu');
    var mmClose = qs('#mmClose');
    var mmBackdrop = qs('#mmBackdrop');

    if (siteNav) {
      window.addEventListener('scroll', function () {
        siteNav.classList.toggle('scrolled', window.scrollY > 40);
      }, { passive: true });
    }

    if (!navToggle || !mobileMenu) return;

    function openPortal() {
      mobileMenu.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    }

    function closePortal() {
      mobileMenu.classList.remove('is-active');
      document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', openPortal);
    if (mmClose) mmClose.addEventListener('click', closePortal);
    if (mmBackdrop) mmBackdrop.addEventListener('click', closePortal);
    qsa('.mm-link', mobileMenu).forEach(function (anchor) {
      anchor.addEventListener('click', closePortal);
    });
  }());

  /* ── SMOOTH POINTER MOTIONS ── */
  (function initPointerDynamics() {
    if (('ontouchstart' in window) || navigator.maxTouchPoints > 0) return;

    var cursorCore = qs('#cursor');
    var cursorTrail = qs('#cursorTrail');
    if (!cursorCore || !cursorTrail) return;

    var targetX = window.innerWidth / 2, targetY = window.innerHeight / 2;
    var currentX = targetX, currentY = targetY;

    document.addEventListener('mousemove', function (event) {
      targetX = event.clientX;
      targetY = event.clientY;
      cursorTrail.style.left = targetX + 'px';
      cursorTrail.style.top = targetY + 'px';
    });

    function renderLoop() {
      currentX = lerp(currentX, targetX, 0.14);
      currentY = lerp(currentY, targetY, 0.14);
      cursorCore.style.left = currentX + 'px';
      cursorCore.style.top = currentY + 'px';
      requestAnimationFrame(renderLoop);
    }
    requestAnimationFrame(renderLoop);

    qsa('a, button, .menu-card, .chutney-swatch, .ing-card').forEach(function (element) {
      element.addEventListener('mouseenter', function () { cursorCore.classList.add('is-hovering'); });
      element.addEventListener('mouseleave', function () { cursorCore.classList.remove('is-hovering'); });
    });
  }());

  /* ── KINETIC HERO CANVAS BACKGROUND ── */
  (function initCanvasEnvironment() {
    var canvas = qs('#batterCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var canvasWidth, canvasHeight, fluidBlobs;

    function adjustCanvasBounds() {
      canvasWidth = canvas.width = canvas.offsetWidth;
      canvasHeight = canvas.height = canvas.offsetHeight;
    }
    adjustCanvasBounds();

    window.addEventListener('resize', function () {
      adjustCanvasBounds();
      instantiateBlobs();
    });

    function BioBlob() {
      this.x = Math.random() * canvasWidth;
      this.y = Math.random() * canvasHeight;
      this.radius = 60 + Math.random() * 80;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
    }

    BioBlob.prototype.update = function () {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x - this.radius < 0 || this.x + this.radius > canvasWidth) this.vx *= -1;
      if (this.y - this.radius < 0 || this.y + this.radius > canvasHeight) this.vy *= -1;
    };

    BioBlob.prototype.draw = function () {
      ctx.beginPath();
      var gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
      gradient.addColorStop(0, 'rgba(212, 163, 67, 0.08)');
      gradient.addColorStop(1, 'rgba(11, 11, 10, 0)');
      ctx.fillStyle = gradient;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    };

    function instantiateBlobs() {
      fluidBlobs = [];
      var count = Math.min(5, Math.floor(canvasWidth / 250));
      for (var i = 0; i < count; i++) { fluidBlobs.push(new BioBlob()); }
    }

    function animationLoop() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      fluidBlobs.forEach(function (blob) {
        blob.update();
        blob.draw();
      });
      requestAnimationFrame(animationLoop);
    }

    instantiateBlobs();
    requestAnimationFrame(animationLoop);
  }());

  /* ── INTERSECTION REVEAL CONTROLLER FIX ── */
  (function initScrollRevealPipeline() {
    var animatedElements = qsa('.anim-trigger');
    
    var options = {
      root: null,
      threshold: 0.05,
      rootMargin: '0px 0px -40px 0px'
    };

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, options);

    animatedElements.forEach(function (element) {
      revealObserver.observe(element);
    });
  }());

}());