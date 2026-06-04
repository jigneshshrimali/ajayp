/* ==========================================================================
   THE GREAT PUNJABI DHABA - IMMERSIVE ARCHITECTURE APPLICATION SCRIPT
   ========================================================================== */

// 1. DATA REPOSITORY: STATIC INJECTION INSTEAD OF PLACEHOLDERS
const MENU_DATASET = [
    { id: 1, name: "Cheese Butter Masala", category: "cheese-specials", price: "₹340", desc: "Premium cubes of fresh cottage cheese submerged completely in our legendary velvety direct milk-butter reduction gravy matrix.", featured: true, tag: "BEST SELLER" },
    { id: 2, name: "Cheese Angara", category: "cheese-specials", price: "₹360", desc: "Spiced artisan cheese blocks slow-baked over live charcoal logs, drenched in spicy highway masala sauce.", featured: true, tag: "MUST TRY" },
    { id: 3, name: "Cheese Angara Smokey", category: "cheese-specials", price: "₹380", desc: "The deep-smoked rendition of our fire-baked cheese curry, fused with intensive oakwood carbon vapors inside sealed clay pots.", featured: true, tag: "FIRE CHEF" },
    { id: 4, name: "Cheese Corn Masala", category: "cheese-specials", price: "₹330", desc: "Sweet American golden kernels mixed with processed cheese blocks inside a traditional thick Punjabi karahi preparation.", featured: false, tag: "FAMILY" },
    { id: 5, name: "Paneer Angara Smokey", category: "paneer-specials", price: "₹350", desc: "Fresh house-crafted paneer chunks subjected to high-concentration real charcoal smoke chambers prior to tableside unveiling.", featured: true, tag: "POPULAR" },
    { id: 6, name: "Paneer PeriPeri", category: "paneer-specials", price: "₹340", desc: "Fusion crossover: Traditional clay tandoor paneer blocks infused overnight with fiery ground African Peri-Peri chili pods.", featured: true, tag: "NEW" },
    { id: 7, name: "Paneer Pasanda", category: "paneer-specials", price: "₹360", desc: "Rich sandwiches of paneer stuffed with premium ground cashew-almond paste, simmered gently in smooth aromatic golden gravy.", featured: false, tag: "ROYAL" },
    { id: 8, name: "Paneer Remix", category: "paneer-specials", price: "₹350", desc: "A creative configuration of shredded, chunked, and grilled paneer elements acting together in harmony inside an ultimate spicy sauce base.", featured: false, tag: "CHEF SPECIAL" },
    { id: 9, name: "Paneer Shorma Masala", category: "paneer-specials", price: "₹340", desc: "Vertical-spit grilled style paneer elements stripped down and tossed directly over flat-top iron griddles with pure ghee.", featured: false, tag: "HIGHWAYS" },
    { id: 10, name: "Paneer Cheesy Dezzy", category: "paneer-specials", price: "₹380", desc: "Double layer extravaganza featuring a core paneer curry baseline completely blanketed beneath a heavy lava stretch sheet of melted cheese.", featured: false, tag: "ULTIMATE" },
    { id: 11, name: "Kaju Butter Masala", category: "kaju-specials", price: "₹370", desc: "Whole golden par-roasted cashew nuts swimming in an opulently sweet, slightly spicy tomato-butter emulsion paste.", featured: true, tag: "DELUXE" },
    { id: 12, name: "Kaju Cheese Masala", category: "kaju-specials", price: "₹390", desc: "A robust structural pairing of roasted premium cashew nuts and molten cubes of processed table cheese cooked under slow fire conditions.", featured: false, tag: "RICH FEAST" },
    { id: 13, name: "The Dhaba Special", category: "punjabi-specials", price: "₹395", desc: "Our multi-generational strictly confidential signature heirloom recipe curry, heavily loaded with organic dry fruits and clarified butter chunks.", featured: true, tag: "HERITAGE GOLD" },
    { id: 14, name: "Veg Hyderabadi Biryani", category: "rice-biryani", price: "₹310", desc: "Long-grain aged Basmati rice layered meticulously with mint leaves, saffron threads, and garden vegetables inside a dough-sealed clay handi.", featured: false, tag: "DUM COOKED" },
    { id: 15, name: "Veg Angara Smokey", category: "punjabi-specials", price: "₹320", desc: "Medley of hand-picked seasonal field vegetables exposed to intense charcoal smoke vectors inside a classic heavy iron wok setup.", featured: false, tag: "SMOKEY" },
    { id: 16, name: "Veg PeriPeri", category: "punjabi-specials", price: "₹310", desc: "Assorted vegetables flash-seared over high open flames and dressed uniformly with our signature sharp pepper spice formulation.", featured: false, tag: "SPICY" },
    { id: 17, name: "Dhaba Wali Dal Makhani", category: "punjabi-specials", price: "₹280", desc: "Black lentils slow-cooked overnight for exactly 14 hours over dying tandoor embers, finished with massive sheets of fresh white butter.", featured: true, tag: "LEGENDARY" },
    { id: 18, name: "Schezwan Noodles", category: "chinese-noodles", price: "₹260", desc: "Wok-tossed artisan wheat noodles thrown over extreme flame loops with home-brewed fiery red pepper garlic paste.", featured: false, tag: "SHARP" },
    { id: 19, name: "Amritsari Kulcha Session", category: "punjabi-specials", price: "₹120", desc: "Extremely flaky potato-onion stuffed flatbread layered repeatedly with ghee, baked inside real clay pit pits until super crisp.", featured: true, tag: "TANDOOR FIRST" },
    { id: 20, name: "Royal Patiala Lassi", category: "beverages-soups", price: "₹140", desc: "Massive brass-tumbler presentation of ultra-thick hand-churned sweet yogurt topped with an intense thick layer of fresh milk cream.", featured: true, tag: "PURE PUNJAB" }
];

document.addEventListener("DOMContentLoaded", () => {
    
    // Initialize Core Engines
    initLenisSmoothScroll();
    initThreeJSFireEmbers();
    initCinematicPreloader();
    initCustomCursor();
    initSwiperSignatureSystem();
    renderDynamicMenuExplorer();
    initMenuFilterMechanism();
    initLightboxGallery();
    initFoodDetailModal();
    initScrollAnimations();
    initFormInteractions();

    // Lazy Loading Images Strategy
    initLazyLoading();
});

/* 2. LENIS SMOOTH SCROLL INTEGRATION */
let lenisInstance;
function initLenisSmoothScroll() {
    lenisInstance = new Lenis({
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
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync ScrollTrigger with Lenis
    lenisInstance.on('scroll', ScrollTrigger.update);
}

/* 3. THREE.JS SYSTEM: LIVING CHARCOAL FIRE EMBERS BACKGROUND */
function initThreeJSFireEmbers() {
    const canvas = document.getElementById('fire-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particles Assembly
    const particleCount = window.innerWidth < 768 ? 40 : 120;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = [];

    for (let i = 0; i < particleCount; i++) {
        // Spread parameters across screen canvas space
        positions[i * 3] = (Math.random() - 0.5) * 40;     // X Axis
        positions[i * 3 + 1] = (Math.random() - 0.5) * 40; // Y Axis
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // Z Axis

        speeds.push({
            x: (Math.random() - 0.5) * 0.02,
            y: Math.random() * 0.08 + 0.02,
            z: (Math.random() - 0.5) * 0.01
        });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Highly stylized custom shader styling parameters mimicking glowing tandoor sparks
    const material = new THREE.PointsMaterial({
        color: 0xFF5722, 
        size: 0.45,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Animation Render Loop
    function animate() {
        requestAnimationFrame(animate);
        
        const positionsArray = geometry.attributes.position.array;
        
        for (let i = 0; i < particleCount; i++) {
            positionsArray[i * 3] += speeds[i].x;
            positionsArray[i * 3 + 1] += speeds[i].y; // Ascend like true hot smoke embers
            positionsArray[i * 3 + 2] += speeds[i].z;

            // Recycling mechanism when particle exits vertical top border
            if (positionsArray[i * 3 + 1] > 20) {
                positionsArray[i * 3 + 1] = -20;
                positionsArray[i * 3] = (Math.random() - 0.5) * 40;
            }
        }
        
        geometry.attributes.position.needsUpdate = true;
        particleSystem.rotation.y += 0.001;
        renderer.render(scene, camera);
    }

    animate();

    // Responsiveness Window Resize Framework
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

/* 4. PRELOADER INTERACTIVE APPARATUS */
function initCinematicPreloader() {
    const preloader = document.getElementById('dhaba-preloader');
    const fill = document.querySelector('.progress-bar-fill');
    if (!preloader) return;

    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            gsap.to(preloader, {
                opacity: 0,
                duration: 0.8,
                onComplete: () => {
                    preloader.style.display = 'none';
                    triggerHeroSequencingAnimations();
                }
            });
        } else {
            width += Math.floor(Math.random() * 15) + 5;
            if(width > 100) width = 100;
            if (fill) fill.style.width = width + '%';
        }
    }, 80);
}

/* 5. CUSTOM CURSOR PERFORMANCE ENGINE */
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor || window.innerWidth < 1024) return; // Completely deactivate on viewport limitations

    window.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
    });

    // Handle interactive state hovers
    const interactiveSelectors = 'a, button, .menu-item-card, .masonry-item, select, input, .filter-chip';
    document.querySelectorAll(interactiveSelectors).forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
}

/* 6. SWIPER PLATFORM: SIGNATURE CHIEF RECOMMENDATIONS */
function initSwiperSignatureSystem() {
    new Swiper('.angara-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        grabCursor: true,
        loop: true,
        autoplay: {
            delay: 4500,
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
        breakpoints: {
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 }
        }
    });
}

/* 7. PUNJABI FEAST EXPLORER: INJECTION & LIVE SEARCH APPLICATION LAYER */
function renderDynamicMenuExplorer(itemsToRender = MENU_DATASET) {
    const targetGrid = document.getElementById('menu-grid-target');
    if (!targetGrid) return;

    if (itemsToRender.length === 0) {
        targetGrid.innerHTML = `
            <div class="menu-empty-state" style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--clr-mustard);">
                <i class="fa-solid fa-fire-burner" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <p>No fire dishes match your search entry criteria. Try searching for 'Cheese', 'Kaju', or 'Paneer'!</p>
            </div>`;
        return;
    }

    targetGrid.innerHTML = itemsToRender.map(dish => `
        <div class="menu-item-card" data-category="${dish.category}" data-id="${dish.id}">
            <div class="menu-card-top">
                <h3>${dish.name}</h3>
                <span class="item-price-tag">${dish.price}</span>
            </div>
            <p class="menu-card-desc">${dish.desc}</p>
            <div class="menu-card-bottom-meta">
                <span class="menu-cat-indicator">${dish.category.replace('-', ' ')}</span>
                <span class="recommend-badge">${dish.tag}</span>
            </div>
        </div>
    `).join('');
}

function initMenuFilterMechanism() {
    const searchInput = document.getElementById('menu-search-input');
    const filterChips = document.querySelectorAll('.filter-chip');
    
    let currentCategory = 'all';
    let currentSearchTerm = '';

    function executeCombinedPipelineFilter() {
        const filtered = MENU_DATASET.filter(dish => {
            const matchesCategory = (currentCategory === 'all' || dish.category === currentCategory);
            const matchesSearch = dish.name.toLowerCase().includes(currentSearchTerm) || 
                                  dish.desc.toLowerCase().includes(currentSearchTerm);
            return matchesCategory && matchesSearch;
        });
        renderDynamicMenuExplorer(filtered);
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value.toLowerCase();
            executeCombinedPipelineFilter();
        });
    }

    filterChips.forEach(chip => {
        chip.addEventListener('click', function() {
            filterChips.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.getAttribute('data-filter');
            executeCombinedPipelineFilter();
        });
    });
}

/* 8. MASONRY VISUAL LIGHTBOX EXPERIENCES */
function initLightboxGallery() {
    const lightbox = document.getElementById('gallery-lightbox');
    const mainImg = document.querySelector('.lightbox-main-img');
    const caption = document.querySelector('.lightbox-caption-text');
    const closeBtn = document.querySelector('.lightbox-close-btn');
    const triggers = document.querySelectorAll('.gallery-trigger-img');

    if (!lightbox || !mainImg) return;

    triggers.forEach(img => {
        img.addEventListener('click', function() {
            mainImg.src = this.getAttribute('data-src') || this.src;
            if(caption) {
                const parentItem = this.closest('.masonry-item');
                const captionText = parentItem ? parentItem.querySelector('h4').innerText : 'The Great Punjabi Dhaba Feast';
                caption.innerText = captionText;
            }
            lightbox.classList.add('active');
            if(lenisInstance) lenisInstance.stop(); // Temporarily halt global scroll mechanics
        });
    });

    const closeAction = () => {
        lightbox.classList.remove('active');
        if(lenisInstance) lenisInstance.start();
    };

    if(closeBtn) closeBtn.addEventListener('click', closeAction);
    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox || e.target === closeBtn) closeAction();
    });
}

/* 9. ADVANCED INTERACTIVE FULLSCREEN APP-QUALITY DETAIL MODAL */
function initFoodDetailModal() {
    const modal = document.getElementById('food-detail-modal');
    const closeBtn = document.querySelector('.food-modal-close');
    const menuGridTarget = document.getElementById('menu-grid-target');

    if (!modal) return;

    // Use event delegation strategy to target dynamically generated item cards cleanly
    if(menuGridTarget) {
        menuGridTarget.addEventListener('click', (e) => {
            const card = e.target.closest('.menu-item-card');
            if(!card) return;

            const id = parseInt(card.getAttribute('data-id'), 10);
            const dish = MENU_DATASET.find(d => d.id === id);
            if(!dish) return;

            // High aesthetic mapping strategy maps specific placeholder items to rich corresponding unsplash arrays
            let computedImage = "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80";
            if(dish.category.includes('cheese')) computedImage = "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80";
            if(dish.category.includes('paneer')) computedImage = "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=800&q=80";
            if(dish.category.includes('kaju')) computedImage = "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80";
            if(dish.id === 20) computedImage = "https://images.unsplash.com/photo-1527406619566-0159590b8540?auto=format&fit=crop&w=800&q=80";

            document.getElementById('modal-dish-img').src = computedImage;
            document.getElementById('modal-dish-title').innerText = dish.name;
            document.getElementById('modal-dish-desc').innerText = dish.desc;
            document.getElementById('modal-dish-tag').innerText = dish.tag;

            modal.classList.add('active');
            if(lenisInstance) lenisInstance.stop();
        });
    }

    const closeAction = () => {
        modal.classList.remove('active');
        if(lenisInstance) lenisInstance.start();
    };

    if(closeBtn) closeBtn.addEventListener('click', closeAction);
    modal.addEventListener('click', (e) => {
        if(e.target === modal) closeAction();
    });

    // Close automatically when booking from internal modal action component
    const bookTrigger = document.getElementById('modal-reserve-trigger');
    if(bookTrigger) {
        bookTrigger.addEventListener('click', () => {
            closeAction();
        });
    }
}

/* 10. ADVANCED MOTION SYSTEM: GSAP AND SCROLLTRIGGER LAYERING */
function triggerHeroSequencingAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Sequence main title arrivals elegantly without flashing layouts
    const tl = gsap.timeline();
    tl.from('.welcome-badge', { opacity: 0, y: 20, duration: 0.6 })
      .from('.hero-main-content h1', { opacity: 0, y: 40, duration: 0.8, ease: "power4.out" }, "-=0.3")
      .from('.hero-lead-text', { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
      .from('.hero-action-row .btn-magnetic', { opacity: 0, scale: 0.9, stagger: 0.15, duration: 0.5 }, "-=0.3");
}

function initScrollAnimations() {
    // Structural layout components fade-in architecture mapping elegantly via ScrollTrigger loops
    const targetedSections = document.querySelectorAll('.angara-collection-sec, .feast-explorer-sec, .moments-gallery-sec, .reserve-feast-sec');
    
    targetedSections.forEach(section => {
        gsap.from(section.querySelector('.section-header'), {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // Integrated numerical counters transaction mechanics execution inside reservation node viewport arrival
    gsap.from('.counter-val', {
        scrollTrigger: {
            trigger: '.reserve-feast-sec',
            start: "top 75%",
        },
        innerText: 0,
        duration: 2,
        snap: { innerText: 1 },
        stagger: 0.2,
        ease: "power1.out"
    });

    // Setup interactive App Hamburger Layer Navigation Drawers
    const toggleBtn = document.querySelector('.mobile-toggle');
    const overlayNav = document.querySelector('.mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if(toggleBtn && overlayNav) {
        toggleBtn.addEventListener('click', () => {
            overlayNav.classList.toggle('active');
            toggleBtn.classList.toggle('open');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                overlayNav.classList.remove('active');
                toggleBtn.classList.remove('open');
            });
        });
    }
}

/* 11. PREMIUM TRANSITION RESERVATION TRANSACTION EXECUTION METHODOLOGY */
function initFormInteractions() {
    const form = document.getElementById('dhaba-booking-form');
    if(!form) return;

    form.addEventListener('submit', () => {
        const nameInput = document.getElementById('book-name');
        const customerName = nameInput ? nameInput.value : 'Guest';
        
        // Form response rendering execution mechanics mockup without breaking execution loops
        alert(`Balle Balle, ${customerName}! Your traditional high-fire family table booking request has been locked into our system ledger. Welcome to Punjab!`);
        form.reset();
    });

    // Magnetic Button Performance Algorithms tracking structural hover variables
    const magnets = document.querySelectorAll('.btn-magnetic');
    if(window.innerWidth >= 1024) {
        magnets.forEach(btn => {
            btn.addEventListener('mousemove', function(e) {
                const position = this.getBoundingClientRect();
                const x = e.clientX - position.left - position.width / 2;
                const y = e.clientY - position.top - position.height / 2;
                
                gsap.to(this, { x: x * 0.35, y: y * 0.35, duration: 0.3 });
            });

            btn.addEventListener('mouseleave', function() {
                gsap.to(this, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
            });
        });
    }
}

/* 12. HIGH-PERFORMANCE INTUITIVE ULTRA-FAST LAZY LOADING ENGINE */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img.lazy-load');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.getAttribute('data-src') || image.src;
                    image.classList.remove('lazy-load');
                    imageObserver.unobserve(image);
                }
            });
        });

        lazyImages.forEach(image => imageObserver.observe(image));
    } else {
        // Fallback strategy protocols loop execution for older web configurations immediately
        lazyImages.forEach(image => {
            image.src = image.getAttribute('data-src') || image.src;
        });
    }
}