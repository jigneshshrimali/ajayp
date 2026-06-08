// Register GSAP ScrollTrigger Plugin Safely
gsap.registerPlugin(ScrollTrigger);

// Initialize Smooth Scrolling via Lenis Framework Engine
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Connect Lenis scroll monitoring directly to GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

/* --- Custom Futuristic Technical Cursor Movement Handling --- */
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.custom-cursor-dot');

window.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.3 });
    gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.05 });
});

/* --- Header Transformation on Scroll Movement --- */
const mainHeader = document.querySelector('.main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        mainHeader.classList.add('scrolled');
    } else {
        mainHeader.classList.remove('scrolled');
    }
});

/* --- Mobile Menu Navigation Logic Handling --- */
const mobileToggle = document.querySelector('.mobile-toggle');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const mobLinks = document.querySelectorAll('.mob-link');

mobileToggle.addEventListener('click', () => {
    mobileMenuOverlay.classList.toggle('active');
    mobileToggle.classList.toggle('open');
});

mobLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('active');
        mobileToggle.classList.remove('open');
    });
});

/* --- Cinematic GSAP Parallax & Revealing Animations --- */

// Hero Image Parallax Depth Adjustment
gsap.to(".hero-bg-parallax", {
    scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
    },
    yPercent: 15,
    ease: "none"
});

// Text Line Masks Reveal inside Hero Structure - Fixed Translation Height Boundaries
gsap.from(".mask-text", {
    duration: 1.2,
    y: "130%",
    opacity: 0,
    stagger: 0.2,
    ease: "power4.out",
    delay: 0.2
});

// Infrastructure Background Interactive Parallax Shift
gsap.to(".infra-bg", {
    scrollTrigger: {
        trigger: ".infrastructure-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    },
    yPercent: -10,
    ease: "none"
});

/* --- Timeline Manufacturing Steps Track Fill Automation --- */
const timelineSteps = document.querySelectorAll('.timeline-step');
timelineSteps.forEach((step, idx) => {
    ScrollTrigger.create({
        trigger: step,
        start: "top center+=100",
        onEnter: () => {
            step.classList.add('active-step');
            let progressPercentage = ((idx + 1) / timelineSteps.length) * 100;
            gsap.to(".timeline-progress-fill", { height: `${progressPercentage}%`, duration: 0.3 });
        },
        onLeaveBack: () => {
            step.classList.remove('active-step');
            let progressPercentage = (idx / timelineSteps.length) * 100;
            gsap.to(".timeline-progress-fill", { height: `${progressPercentage}%`, duration: 0.3 });
        }
    });
});

/* --- Interactive 3D Card Tilt Physics --- */
const cards = document.querySelectorAll('[data-tilt]');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        
        const angleX = (yc - y) / 15;
        const angleY = (x - xc) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    });
});

/* --- Industries We Serve Connected Nodes Sector Dataset --- */
const sectorData = [
    { title: "Automotive Components", desc: "Providing accurate dimensional tolerances for wheel hubs, rotor axles, bushes, and high-tensile engine adapters." },
    { title: "Heavy Engineering Sector", desc: "Enabling roughing profiles on high-weight forgings and massive cast rolls with deep structural rigidity support." },
    { title: "Mass Production Fabrication", desc: "Optimizing cycle runtimes for recurring jobs like internal thread tapping, face grooving, and stepped shoulder turndowns." },
    { title: "Commercial Machine Shops", desc: "Flexible tooling setups providing general maintenance jobs, component recovery, and bespoke localized repair tasks." }
];

const sectorItems = document.querySelectorAll('.sector-item');
const sectorTitle = document.getElementById('sector-title');
const sectorDesc = document.getElementById('sector-desc');

sectorItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        sectorItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        
        const index = parseInt(this.getAttribute('data-index'));
        
        // Dynamic Text Mask Swap Transition
        gsap.to(".visualization-display", { opacity: 0, y: 10, duration: 0.15, onComplete: () => {
            sectorTitle.textContent = sectorData[index].title;
            sectorDesc.textContent = sectorData[index].desc;
            gsap.to(".visualization-display", { opacity: 1, y: 0, duration: 0.25 });
        }});

        // Highlight Corresponding Network Graph SVG Elements
        document.querySelectorAll('.sector-node').forEach(node => node.classList.remove('highlight-node'));
        document.querySelectorAll('.conn-line').forEach(line => line.classList.remove('highlight-line'));
        
        document.querySelector(`.node-${index}`).classList.add('highlight-node');
        document.querySelector(`.line-${index}`).classList.add('highlight-line');
    });
});

/* --- Futuristic Auto Incremental Counters Logic --- */
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    ScrollTrigger.create({
        trigger: counter,
        start: "top bottom-=50",
        onEnter: () => {
            const target = +counter.getAttribute('data-target');
            gsap.to(counter, {
                innerText: target,
                duration: 2,
                snap: { innerText: 1 },
                ease: "power2.out"
            });
        }
    });
});

/* --- Interactive Technical Specs Modal Controller --- */
const modal = document.getElementById('spec-modal');

function openSpecModal(model, bed, spindle, ways, sectors) {
    document.getElementById('modal-model-label').textContent = `SERIES SYSTEM PROFILE: ${model}`;
    document.getElementById('td-bed').textContent = bed;
    document.getElementById('td-spindle').textContent = spindle;
    document.getElementById('td-ways').textContent = ways;
    document.getElementById('td-sectors').textContent = sectors;
    
    modal.style.display = 'flex';
    lenis.stop();
}

function closeSpecModal() {
    modal.style.display = 'none';
    lenis.start();
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeSpecModal();
    }
});

/* --- Premium Lead Generation Inquiry Form Interceptor --- */
function handleFormSubmit(e) {
    e.preventDefault();
    
    const successBox = document.getElementById('form-success-msg');
    successBox.style.display = 'block';
    gsap.fromTo(successBox, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 });
    
    e.target.reset();
}