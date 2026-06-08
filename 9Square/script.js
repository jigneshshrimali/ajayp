// Initialize Smooth Inertial Motion Driver
const lenis = new Lenis({
    duration: 1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.5
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Integrate Smooth Scroll Tracking with GSAP Engine Engine
gsap.registerPlugin(ScrollTrigger);
lenis.on('scroll', ScrollTrigger.update);

// Global Dynamic Header Transform Matrix
window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if (window.scrollY > 50) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
});

// ========================================================
// RE-ENGINEERED NAVIGATION METHODOLOGY (ANTI-BREAK SWITCH)
// ========================================================
function showView(viewId, scrollAnchor = null) {
    // Hide all existing content modules carefully
    document.querySelectorAll('.view-pane').forEach(pane => {
        pane.classList.remove('active-pane');
        pane.classList.add('hidden');
    });

    // Toggle active menu highlight accents
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

    // Expose target view content module
    const targetPane = document.getElementById(`view-view-${viewId}`) || document.getElementById(`view-${viewId}`);
    if (targetPane) {
        targetPane.classList.remove('hidden');
        // Small cycle frame adjustment to trigger smooth CSS visual reveal transition smoothly
        setTimeout(() => {
            targetPane.classList.add('active-pane');
            ScrollTrigger.refresh();
        }, 30);
    }

    // Terminate mobile panel interface block cleanly if operational
    closeMobileMenu();

    // Execute tracking adjustment if dynamic anchoring call parameter exists
    if (scrollAnchor) {
        setTimeout(() => {
            lenis.scrollTo(scrollAnchor);
        }, 300);
    } else {
        lenis.scrollTo(0, { immediate: true });
    }
}

// Mobile Interface Overlay Trigger Operations
const mobileTrigger = document.getElementById('mobile-trigger');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

if (mobileTrigger && mobileMenu) {
    mobileTrigger.addEventListener('click', () => {
        if (!menuOpen) {
            mobileMenu.classList.remove('pointer-events-none', 'opacity-0');
            mobileMenu.classList.add('opacity-100');
            document.getElementById('line1').style.transform = 'translateY(4px) rotate(45deg)';
            document.getElementById('line2').style.opacity = '0';
            menuOpen = true;
        } else {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('pointer-events-none', 'opacity-0');
    mobileMenu.classList.remove('opacity-100');
    document.getElementById('line1').style.transform = 'none';
    document.getElementById('line2').style.opacity = '1';
    menuOpen = false;
}

// ========================================================
// REFINED ADVANCED GSAP SCROLL TRIGGERS SYSTEM
// ========================================================

// Immersive Parallax Scaling for Architectural Cover Art Image
gsap.to('.hero-image-container', {
    scrollTrigger: {
        trigger: '#view-home',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    scale: 1.0,
    y: 60,
    ease: 'none'
});

// Component Array Fade & Slide Logic
document.querySelectorAll('.component-reveal').forEach((element) => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    });
});

// ========================================================
// SWIPER IMAGE SLIDER ACCELERATION ENGINE
// ========================================================
const swiper = new Swiper('.spatial-swiper', {
    loop: true,
    speed: 800,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// ========================================================
// THREE.JS LIGHT ATRIUM BACKDROP MAPPING
// ========================================================
const canvasBox = document.getElementById('canvas-container');
if (canvasBox) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasBox.appendChild(renderer.domElement);

    // Structural Geometric Form mapping building accents
    const meshGeo = new THREE.BoxGeometry(2, 2, 2);
    const meshMat = new THREE.MeshBasicMaterial({
        color: 0xC5BBA4,
        wireframe: true,
        transparent: true,
        opacity: 0.08
    });
    const structureWireframe = new THREE.Mesh(meshGeo, meshMat);
    scene.add(structureWireframe);

    function loopRender() {
        requestAnimationFrame(loopRender);
        structureWireframe.rotation.x += 0.001;
        structureWireframe.rotation.y += 0.0012;
        renderer.render(scene, camera);
    }
    loopRender();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}