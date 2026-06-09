/**
 * Gatrad Jeweller - Extended Master Control Interface Script
 * Drives the Three.js Golden Ambient System, Pure CSS Responsive Drawers, 
 * Portfolio Filter Loops, and LightGallery bindings.
 */

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================================================
    // 1. THREE.JS INTERACTIVE GOLD PARTICLES INSTANTIATION
    // ==========================================================================
    const canvasContainer = document.getElementById('three-canvas-container');
    let scene, camera, renderer, particleSystem;
    const particleCount = 120;
    
    function initThree() {
        if (!canvasContainer) return;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 50;

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        canvasContainer.appendChild(renderer.domElement);

        // Core Geometry Definition
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 120;     // X Variant Coordinates
            positions[i + 1] = (Math.random() - 0.5) * 120; // Y Variant Coordinates
            positions[i + 2] = (Math.random() - 0.5) * 60;  // Z Depth Plane
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // Designing Warm Ambient Gold Dust Particles
        const material = new THREE.PointsMaterial({
            color: 0xDFB15B,
            size: 1.8,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending
        });

        particleSystem = new THREE.Points(geometry, material);
        scene.add(particleSystem);

        window.addEventListener('resize', onWindowResize);
        document.addEventListener('mousemove', onMouseMove);
        
        animateThree();
    }

    let mouseX = 0, mouseY = 0;
    function onMouseMove(event) {
        mouseX = (event.clientX - window.innerWidth / 2) * 0.03;
        mouseY = (event.clientY - window.innerHeight / 2) * 0.03;
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animateThree() {
        requestAnimationFrame(animateThree);

        // Subtle automatic rotation mix mimicking suspension
        particleSystem.rotation.y += 0.001;
        particleSystem.rotation.x += 0.0005;

        // Smoothly interpolate camera alignment based on real mouse positions
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    // Trigger Initial execution safely
    initThree();

    // ==========================================================================
    // 2. HARDWARE TOGGLED HAMBURGER OVERLAY DRAWER
    // ==========================================================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('mobile-active');
        });

        // Close when clicking layout anchors links immediately
        navMenu.querySelectorAll('a').forEach(anchor => {
            anchor.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('mobile-active');
            });
        });
    }

    // ==========================================================================
    // 3. SECURE PERFORMANCE PARALLAX VECTOR INTERPOLATOR
    // ==========================================================================
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxTargets = document.querySelectorAll('.parallax-move');

        parallaxTargets.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-speed')) || 1;
            const offsetValue = scrolled * (speed * 0.08);
            el.style.transform = `translateY(${offsetValue}px)`;
        });
    });

    // ==========================================================================
    // 4. MASONRY LAYOUT INVENTORY PACK FILTER WHEEL
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.g-filter-btn');
    const bricks = document.querySelectorAll('.masonry-brick');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const selectedCategory = this.getAttribute('data-gfilter');

            bricks.forEach(brick => {
                const brickCat = brick.getAttribute('data-gcat');
                if (selectedCategory === 'all' || brickCat === selectedCategory) {
                    brick.style.display = 'block';
                    setTimeout(() => { brick.style.opacity = '1'; }, 20);
                } else {
                    brick.style.opacity = '0';
                    setTimeout(() => { brick.style.display = 'none'; }, 250);
                }
            });
        });
    });

    // ==========================================================================
    // 5. LIGHTGALLERY PLUGIN RESOLVER BINDINGS
    // ==========================================================================
    const containerElement = document.getElementById('lightgallery-target');
    if (containerElement && typeof lightGallery !== 'undefined') {
        lightGallery(containerElement, {
            selector: '.masonry-brick',
            speed: 300,
            download: false
        });
    }
});