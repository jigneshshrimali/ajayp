/**
 * JP JEWELLERS - CORE INTERACTIVE MATRIX APPLICATION
 * WebGL Parameter Interpolations and Hardware Inertial Orchestrations
 */

document.addEventListener('DOMContentLoaded', () => {
    initLuxuryCursor();
    const webglEngine = initWebGLMeshEngine();
    initChamberOrchestrator(webglEngine);
    initSmoothScrollSystem();
});

/* ==========================================================================
   1. MOUSE CURSOR POSITION VECTOR MATHEMATICS (LERP)
   ========================================================================== */
function initLuxuryCursor() {
    const cursor = document.getElementById('luxury-cursor');
    const dot = document.getElementById('luxury-cursor-dot');
    
    if (!cursor || window.matchMedia('(max-width: 768px)').matches) return;

    let targetX = 0, targetY = 0;
    let curX = 0, curY = 0;
    let dX = 0, dY = 0;

    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    function interpolationFrame() {
        // Linear Interpolation formulas: Current position += (Target position - Current position) * Interpolation factor
        curX += (targetX - curX) * 0.1;
        curY += (targetY - curY) * 0.1;
        dX += (targetX - dX) * 0.28;
        dY += (targetY - dY) * 0.28;

        cursor.style.left = `${curX}px`;
        cursor.style.top = `${curY}px`;
        dot.style.left = `${dX}px`;
        dot.style.top = `${dY}px`;

        requestAnimationFrame(interpolationFrame);
    }
    requestAnimationFrame(interpolationFrame);

    // Contextual Hover Link Manipulations
    const trackingNodes = document.querySelectorAll('a, .interactive-frame-wrapper, .mosaic-box');
    trackingNodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            cursor.style.width = '56px';
            cursor.style.height = '56px';
            cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
        });
        node.addEventListener('mouseleave', () => {
            cursor.style.width = '32px';
            cursor.style.height = '32px';
            cursor.style.backgroundColor = 'transparent';
        });
    });
}

/* ==========================================================================
   2. THREE.JS FLOATING ARCHITECTURAL CRYSTAL SYSTEM
   ========================================================================== */
function initWebGLMeshEngine() {
    const wrapper = document.getElementById('canvas-container');
    if (!wrapper) return null;

    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    wrapper.appendChild(renderer.domElement);

    // Multi-faceted geometric structure rendering
    const geometry = new THREE.IcosahedronGeometry(1.8, 1);
    
    const material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.15,
        roughness: 0.05,
        transmission: 0.65,
        ior: 2.417, /* Exact diamond refraction index */
        thickness: 1.2,
        transparent: true,
        flatShading: true
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Multi-Axis Light Injection Arrays
    const ambLight = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight1.position.set(4, 4, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight2.position.set(-4, -4, 2);
    scene.add(dirLight2);

    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.0003;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.0003;
    });

    function renderingLoop() {
        requestAnimationFrame(renderingLoop);

        // Continuous default slow rotation vectors
        mesh.rotation.y += 0.0035;
        mesh.rotation.x += 0.0018;

        // Dynamic mouse movement offset physics
        mesh.rotation.y += (mouseX - mesh.rotation.y) * 0.06;
        mesh.rotation.x += (mouseY - mesh.rotation.x) * 0.06;

        renderer.render(scene, camera);
    }
    renderingLoop();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return { mesh, material };
}

/* ==========================================================================
   3. CHAMBER TRANSITION CHROMATIC INTERPOLATOR (CROSS-PLATFORM)
   ========================================================================== */
function initChamberOrchestrator(webglEngine) {
    const chambers = document.querySelectorAll('.vault-chamber');
    const statusText = document.getElementById('active-chamber-hud');
    const navLinks = document.querySelectorAll('.nav-link');

    const configMatrix = {
        security: {
            accent: '#ffffff',
            glow: 'rgba(255, 255, 255, 0.02)',
            colorHex: 0xffffff,
            rough: 0.05,
            label: '// INITIALIZED'
        },
        diamond: {
            accent: '#e2e8f0',
            glow: 'rgba(255, 255, 255, 0.05)',
            colorHex: 0xffffff,
            rough: 0.02,
            label: '// DIAMOND GALLERY'
        },
        ruby: {
            accent: '#ff0b3a',
            glow: 'rgba(255, 11, 58, 0.06)',
            colorHex: 0xff0b3a,
            rough: 0.1,
            label: '// RAJWADI HERITAGE'
        },
        emerald: {
            accent: '#00ff87',
            glow: 'rgba(0, 255, 135, 0.05)',
            colorHex: 0x00ff87,
            rough: 0.04,
            label: '// MANEK GALLERY'
        },
        signature: {
            accent: '#b5179e',
            glow: 'rgba(181, 23, 158, 0.07)',
            colorHex: 0xb5179e,
            rough: 0.06,
            label: '// MEENAKARI ARTISTRY'
        },
        gold: {
            accent: '#e5a93c',
            glow: 'rgba(229, 169, 60, 0.06)',
            colorHex: 0xe5a93c,
            rough: 0.22,
            label: '// THE NAKSHI GOLD ART'
        }
    };

    const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const matrixKey = entry.target.getAttribute('data-chamber');
                const matrixProfile = configMatrix[matrixKey];
                
                if (matrixProfile) {
                    // Mutation of global style custom CSS ecosystem variables
                    document.documentElement.style.setProperty('--chamber-accent', matrixProfile.accent);
                    document.documentElement.style.setProperty('--chamber-glow', matrixProfile.glow);
                    
                    if (statusText) statusText.textContent = matrixProfile.label;

                    // Live active mapping of global tracking HUD tabs
                    const sectionId = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });

                    // Update 3D Crystal Mesh material properties cleanly on scroll transitions
                    if (webglEngine) {
                        const targetColor = new THREE.Color(matrixProfile.colorHex);
                        webglEngine.material.color.copy(targetColor);
                        webglEngine.material.roughness = matrixProfile.rough;
                    }
                }
            }
        });
    }, {
        root: null,
        rootMargin: '-40% 0px -40% 0px', /* High-end intersection tracking viewport bounding strip */
        threshold: 0
    });

    chambers.forEach(section => intersectionObserver.observe(section));
}

/* ==========================================================================
   4. LOCOMOTIVE SMOOTH LINEAR SCROLLER CONFIG
   ========================================================================== */
function initSmoothScrollSystem() {
    const scrollerMount = document.querySelector('[data-scroll-container]');
    if (!scrollerMount) return;

    const scrollEngine = new LocomotiveScroll({
        el: scrollerMount,
        smooth: true,
        smartphone: { smooth: false },
        tablet: { smooth: false },
        lerp: 0.08
    });

    // Handle structural HUD click routing jumps seamlessly
    const navigationCtas = document.querySelectorAll('[data-scroll-to]');
    navigationCtas.forEach(cta => {
        cta.addEventListener('click', (e) => {
            e.preventDefault();
            const targetQuery = cta.getAttribute('href');
            const targetElement = document.querySelector(targetQuery);
            if (targetElement) {
                scrollEngine.scrollTo(targetElement);
            }
        });
    });

    // Handle browser frame structural alignment updates on image load
    window.addEventListener('load', () => {
        scrollEngine.update();
    });
}