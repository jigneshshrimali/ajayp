/**
 * Gatrad Jeweller - Luxury Core Web Interactive Matrix
 * Custom Vanta.js integration + GSAP Complex Timeline Orchestration
 */

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================================================
    // VANTA.JS 3D AMBIENT BACKGROUND MATRIX INTIALIZATION
    // ==========================================================================
    let ambientBackgroundInstance = null;

    function initVantaMesh() {
        // Enforce fallback safety if libraries are missing
        if (typeof VANTA === 'undefined' || !document.getElementById('vanta-ambient-canvas')) return;

        ambientBackgroundInstance = VANTA.NET({
            el: "#vanta-ambient-canvas",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0xD4AF37,        /* Royal Gold Node Strings */
            backgroundColor: 0x030407, /* Deep Sapphire Black Base */
            points: 10.00,
            maxDistance: 22.00,
            spacing: 16.00
        });
    }

    initVantaMesh();

    // ==========================================================================
    // GSAP HIGH-PERFORMANCE COMPLEX SCROLL TIMELINES
    // ==========================================================================
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Core Load Phase Timeline
        const loadingSequence = gsap.timeline();
        
        loadingSequence.from(".animate-on-load", {
            y: -20,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out"
        });

        loadingSequence.from(".gsap-reveal-left", {
            x: -60,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out"
        }, "-=0.3");

        loadingSequence.from(".gsap-reveal-right", {
            x: 60,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out"
        }, "-=0.8");

        // Inventory Header Zoom Interceptor
        gsap.from(".gsap-scroll-zoom", {
            scrollTrigger: {
                trigger: ".gsap-scroll-zoom",
                start: "top 85%",
                toggleActions: "play none none none"
            },
            scale: 0.96,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out"
        });

        // Left Component Scrollers
        document.querySelectorAll(".gsap-scroll-left").forEach(element => {
            gsap.from(element, {
                scrollTrigger: { trigger: element, start: "top 85%" },
                x: -50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        });

        // Right Component Scrollers
        document.querySelectorAll(".gsap-scroll-right").forEach(element => {
            gsap.from(element, {
                scrollTrigger: { trigger: element, start: "top 85%" },
                x: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        });

        // Staggered Portfolio Inventory Deployments
        gsap.from(".gsap-card-stagger", {
            scrollTrigger: {
                trigger: ".collections-grid",
                start: "top 80%"
            },
            y: 40,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out"
        });

        // Dynamic Parallax Core Scrubber Matrix
        document.querySelectorAll(".target-parallax-y").forEach(node => {
            const parallaxStrength = parseInt(node.getAttribute("data-parallax-strength")) || 10;
            gsap.to(node, {
                scrollTrigger: {
                    trigger: node,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                },
                y: parallaxStrength,
                ease: "none"
            });
        });
    }

    // ==========================================================================
    // MOBILE DRAWER HANDLER EVENT INTERFACES
    // ==========================================================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('mobile-active');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('mobile-active');
            });
        });
    }

    // ==========================================================================
    // SHOWROOM GALLERY FILTER LOGIC
    // ==========================================================================
    const filterSelectors = document.querySelectorAll('.g-filter-btn');
    const galleryBricks = document.querySelectorAll('.masonry-brick');

    filterSelectors.forEach(button => {
        button.addEventListener('click', function() {
            filterSelectors.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterQuery = this.getAttribute('data-gfilter');

            galleryBricks.forEach(brick => {
                const structuralCategory = brick.getAttribute('data-gcat');
                if (filterQuery === 'all' || structuralCategory === filterQuery) {
                    brick.style.display = 'block';
                    gsap.to(brick, { opacity: 1, scale: 1, duration: 0.3 });
                } else {
                    gsap.to(brick, { 
                        opacity: 0, 
                        scale: 0.95, 
                        duration: 0.2, 
                        onComplete: () => { brick.style.display = 'none'; } 
                    });
                }
            });
        });
    });

    // ==========================================================================
    // LIGHTGALLERY VAULT ATTACHMENT
    // ==========================================================================
    const targetElement = document.querySelector('.id-lightgallery-trigger');
    if (targetElement && typeof lightGallery !== 'undefined') {
        lightGallery(targetElement, {
            selector: '.masonry-brick',
            speed: 300,
            download: false,
            backdropDuration: 200
        });
    }

    // Window Resize Guard for Vanta Canvas Optimization
    window.addEventListener('resize', () => {
        if (ambientBackgroundInstance) {
            ambientBackgroundInstance.resize();
        }
    });
});