/**
 * SHREE MANGAL JEWELLERS (SMJ) - PRODUCTION JAVASCRIPT CORNERSTONE
 * Design Blueprint: Luminous Rose, Platinum & Micro-Focal Diamond Fog Layers
 */

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================================================
    // 1. DYNAMIC INDEPENDENT 3D VANTA FOG BACKGROUND MATRIX
    // ==========================================================================
    let vantaFogEngine = null;

    function deployVantaFog() {
        if (typeof VANTA === 'undefined' || !document.getElementById('vanta-canvas')) return;

        vantaFogEngine = VANTA.FOG({
            el: "#vanta-canvas",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            highlightColor: 0xFFF9F2,  /* Warm Pearl Champagne Accent */
            midtoneColor: 0xE5BA9E,     /* Signature Soft Rose Gold Layer */
            lowlightColor: 0xEAECEF,    /* Frosted Structural Platinum Tone */
            baseColor: 0xFFFCF7,        /* Core Ambient Illumination Fluid */
            blurFactor: 0.90,
            speed: 1.30,
            zoom: 0.65
        });
    }

    deployVantaFog();

    // ==========================================================================
    // 2. RESPONSIVE NAVIGATION MOBILE DRAWER LOGIC
    // ==========================================================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            this.classList.toggle('active');
            navMenu.classList.toggle('mobile-active');
        });

        // Safe closure handling when clicking link items inside the layout array
        navMenu.querySelectorAll('a').forEach(anchorLink => {
            anchorLink.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('mobile-active');
            });
        });

        // Close menu automatically if user clicks on the background canvas
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('mobile-active');
            }
        });
    }

    // ==========================================================================
    // 3. GSAP SCROLLMAX TIMELINE SEQUENCING (DIAMOND FOCUS EFFECTS)
    // ==========================================================================
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Initial Interactive Presentation Load
        const introTimeline = gsap.timeline();
        
        introTimeline.from(".animate-load", { 
            opacity: 0, 
            y: -15, 
            duration: 0.8, 
            ease: "power3.out" 
        });
        
        introTimeline.from(".gsap-up", { 
            opacity: 0, 
            y: 45, 
            filter: "blur(8px)", 
            duration: 1.2, 
            ease: "power2.out" 
        }, "-=0.3");
        
        introTimeline.from(".gsap-scale", { 
            scale: 0.92, 
            opacity: 0, 
            duration: 1.0, 
            ease: "expo.out" 
        }, "-=0.8");

        // Directional Left Translation Reveals
        document.querySelectorAll(".gsap-left").forEach(node => {
            gsap.from(node, {
                scrollTrigger: { trigger: node, start: "top 82%" },
                x: -70,
                opacity: 0,
                filter: "blur(6px)",
                duration: 1.0,
                ease: "power2.out"
            });
        });

        // Directional Right Translation Reveals
        document.querySelectorAll(".gsap-right").forEach(node => {
            gsap.from(node, {
                scrollTrigger: { trigger: node, start: "top 82%" },
                x: 70,
                opacity: 0,
                filter: "blur(6px)",
                duration: 1.0,
                ease: "power2.out"
            });
        });

        // Structural Heritage Card Transitions
        gsap.from(".gsap-card", {
            scrollTrigger: { 
                trigger: ".heritage-strip", 
                start: "top 75%" 
            },
            y: 50,
            opacity: 0,
            stagger: 0.25,
            duration: 0.9,
            ease: "power3.out"
        });

        // Soft Masonry Grid Sequence Staggers
        gsap.from(".gsap-gallery-stagger", {
            scrollTrigger: { 
                trigger: ".masonry-gallery", 
                start: "top 80%" 
            },
            scale: 0.95,
            opacity: 0,
            stagger: 0.08,
            duration: 0.7,
            ease: "power2.out"
        });
    }

    // ==========================================================================
    // 4. LIGHTGALLERY RUNTIME INTEGRATION
    // ==========================================================================
    const lightGalleryTarget = document.querySelector('.id-lightgallery-trigger');
    if (lightGalleryTarget && typeof lightGallery !== 'undefined') {
        lightGallery(lightGalleryTarget, {
            selector: '.masonry-item',
            speed: 400,
            download: false,
            backdropDuration: 250,
            mode: 'lg-zoom-in-out'
        });
    }

    // High performance resize guard handler for 3D engine canvas recomputations
    window.addEventListener('resize', () => {
        if (vantaFogEngine) {
            vantaFogEngine.resize();
        }
    });
});