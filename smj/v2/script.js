/**
 * Shree Mangal Jewellers (SMJ) - Luxury Web Framework 
 * Vanta Ambient Waves Rendering + Complex Parallel Scrubber Vector Matrices
 */

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================================================
    // VANTA.JS 3D AMBIENT WAVES RENDERING LAYER
    // ==========================================================================
    let ambientWavesInstance = null;

    function initVantaWaves() {
        if (typeof VANTA === 'undefined' || !document.getElementById('vanta-ambient-canvas')) return;

        ambientWavesInstance = VANTA.WAVES({
            el: "#vanta-ambient-canvas",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x07090E,           /* Base Dark Structural Trough */
            shininess: 38.00,
            waveHeight: 14.50,
            waveSpeed: 0.65,
            zoom: 0.85
        });
    }

    initVantaWaves();

    // ==========================================================================
    // GSAP HIGH-PERFORMANCE COMPLEX TIMELINE ORCHESTRATION
    // ==========================================================================
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // First Phase Load Instantiation Sequence
        const loadingTimeline = gsap.timeline();
        
        loadingTimeline.from(".animate-on-load", {
            y: -25,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });

        loadingTimeline.from(".gsap-reveal-left", {
            x: -70,
            opacity: 0,
            duration: 1.0,
            ease: "power4.out"
        }, "-=0.4");

        loadingTimeline.from(".gsap-reveal-right", {
            x: 70,
            opacity: 0,
            duration: 1.0,
            ease: "power4.out"
        }, "-=0.9");

        // Central Layout Zoom Injections
        gsap.from(".gsap-scroll-zoom", {
            scrollTrigger: {
                trigger: ".gsap-scroll-zoom",
                start: "top 85%",
                toggleActions: "play none none none"
            },
            scale: 0.95,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });

        // Directional Left Transitions
        document.querySelectorAll(".gsap-scroll-left").forEach(element => {
            gsap.from(element, {
                scrollTrigger: { trigger: element, start: "top 85%" },
                x: -60,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out"
            });
        });

        // Directional Right Transitions
        document.querySelectorAll(".gsap-scroll-right").forEach(element => {
            gsap.from(element, {
                scrollTrigger: { trigger: element, start: "top 85%" },
                x: 60,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out"
            });
        });

        // Grid Sequential Card Stagger Arrays
        gsap.from(".gsap-card-stagger", {
            scrollTrigger: {
                trigger: ".collections-grid",
                start: "top 82%"
            },
            y: 45,
            opacity: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out"
        });

        // True Dynamic Scroll Parallax Computations
        document.querySelectorAll(".target-parallax-y").forEach(node => {
            const translationMetric = parseInt(node.getAttribute("data-parallax-strength")) || 15;
            gsap.to(node, {
                scrollTrigger: {
                    trigger: node,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                },
                y: translationMetric,
                ease: "none"
            });
        });
    }

    // ==========================================================================
    // ACCESSIBLE MOBILE DRAWER MATRIX MANAGEMENT
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
    // MASONRY GRID INTERACTIVE PORTFOLIO FILTERS
    // ==========================================================================
    const filterSelectors = document.querySelectorAll('.g-filter-btn');
    const galleryBricks = document.querySelectorAll('.masonry-brick');

    filterSelectors.forEach(button => {
        button.addEventListener('click', function() {
            filterSelectors.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const activeQuery = this.getAttribute('data-gfilter');

            galleryBricks.forEach(brick => {
                const brickCategory = brick.getAttribute('data-gcat');
                if (activeQuery === 'all' || brickCategory === activeQuery) {
                    brick.style.display = 'block';
                    gsap.to(brick, { opacity: 1, scale: 1, duration: 0.35 });
                } else {
                    gsap.to(brick, { 
                        opacity: 0, 
                        scale: 0.94, 
                        duration: 0.2, 
                        onComplete: () => { brick.style.display = 'none'; } 
                    });
                }
            });
        });
    });

    // ==========================================================================
    // LIGHTGALLERY INTENT BINDING
    // ==========================================================================
    const targetTrigger = document.querySelector('.id-lightgallery-trigger');
    if (targetTrigger && typeof lightGallery !== 'undefined') {
        lightGallery(targetTrigger, {
            selector: '.masonry-brick',
            speed: 300,
            download: false,
            backdropDuration: 200
        });
    }

    // Resize Event Matrix Optimization Guard
    window.addEventListener('resize', () => {
        if (ambientWavesInstance) {
            ambientWavesInstance.resize();
        }
    });
});