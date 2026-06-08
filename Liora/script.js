document.addEventListener("DOMContentLoaded", function () {
    
    // Initialize Core System Variables
    const panels = document.querySelectorAll(".page-panel");
    const navLinks = document.querySelectorAll(".nav-link");
    const drawerLinks = document.querySelectorAll(".drawer-link");
    const footerNavLinks = document.querySelectorAll(".f-nav-trigger");
    const mobileMenuDrawer = document.querySelector(".mobile-menu-drawer");
    const mobileToggleBtn = document.querySelector(".mobile-toggle");
    
    // Register GSAP Plugins safely
    gsap.registerPlugin(ScrollTrigger);

    /* ================= 1. THE SPA COMPONENT ROUTER SYSTEM ================= */
    function switchActivePanel(targetPanelId) {
        // Prevent mismatch naming loops
        let standardizedId = targetPanelId;
        if (targetPanelId === "gallery") standardizedId = "gallery-panel-view";
        if (targetPanelId === "rooms") standardizedId = "panel-rooms";
        if (targetPanelId === "dining") standardizedId = "panel-dining";
        if (targetPanelId === "home") standardizedId = "panel-home";

        // Deactivate layout elements smoothly
        panels.forEach(panel => {
            panel.classList.remove("active");
            panel.style.display = "none";
        });

        const targetPanel = document.getElementById(standardizedId);
        if (targetPanel) {
            targetPanel.style.display = "block";
            // Fire short delayed transition to ensure visibility lifecycle
            setTimeout(() => {
                targetPanel.classList.add("active");
                // Reset scroll view immediately upon tab selection change
                window.scrollTo({ top: 0, behavior: 'instant' });
                
                // Re-trigger scroll state calculations for GSAP ScrollTriggers
                ScrollTrigger.refresh();
                
                // Re-initialize Swiper instances inside the selected view if present
                initializeSwiperModules();
                
                // Fire view entry animation sequence
                animatePanelEntry(targetPanel);
            }, 20);
        }

        // Keep global header menu links highlighted correctly
        updateNavigationUIStates(targetPanelId);
    }

    function updateNavigationUIStates(activeKey) {
        const cleanKey = activeKey.replace("panel-", "").replace("-panel-view", "");
        
        const allNavButtons = [...navLinks, ...drawerLinks, ...footerNavLinks];
        allNavButtons.forEach(btn => {
            if (btn.getAttribute("data-target") === cleanKey) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });
    }

    // Attach Click Handlers across standard UI Navigation triggers
    document.body.addEventListener("click", function (e) {
        const trigger = e.target.closest("[data-target]");
        if (trigger) {
            e.preventDefault();
            const destination = trigger.getAttribute("data-target");
            
            // Close mobile menu layout cleanly if open during routing clicks
            if (mobileMenuDrawer.classList.contains("open")) {
                toggleMobileMenuState();
            }
            
            switchActivePanel(destination);
        }
    });

    /* ================= 2. MOBILE MENU LIFE DRAWER ACTIONS ================= */
    function toggleMobileMenuState() {
        const isOpen = mobileMenuDrawer.classList.contains("open");
        if (!isOpen) {
            mobileMenuDrawer.classList.add("open");
            mobileToggleBtn.querySelectorAll(".line")[0].style.transform = "rotate(45deg) translate(6px, 5px)";
            mobileToggleBtn.querySelectorAll(".line")[1].style.transform = "rotate(-45deg) translate(6px, -5px)";
        } else {
            mobileMenuDrawer.classList.remove("open");
            mobileToggleBtn.querySelectorAll(".line")[0].style.transform = "none";
            mobileToggleBtn.querySelectorAll(".line")[1].style.transform = "none";
        }
    }
    
    if (mobileToggleBtn) {
        mobileToggleBtn.addEventListener("click", toggleMobileMenuState);
    }

    /* ================= 3. SWIPER GALLERY INTERACTION MODULES ================= */
    let activeSwiperInstances = [];

    function initializeSwiperModules() {
        // Clear previous event instances cleanly to avoid duplicate performance drag
        activeSwiperInstances.forEach(instance => {
            if (typeof instance.destroy === "function") instance.destroy(true, true);
        });
        activeSwiperInstances = [];

        // Check for Room Swiper presence
        if (document.querySelector(".roomSwiper")) {
            const rSwipers = document.querySelectorAll(".roomSwiper");
            rSwipers.forEach(swiperEl => {
                const newInstance = new Swiper(swiperEl, {
                    loop: true,
                    speed: 700,
                    autoplay: { delay: 4000, disableOnInteraction: false },
                    pagination: { el: ".swiper-pagination", clickable: true },
                    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
                });
                activeSwiperInstances.push(newInstance);
            });
        }

        // Check for Master Gallery Swiper presence
        if (document.querySelector(".mainGallerySwiper")) {
            const mainGalleryInstance = new Swiper(".mainGallerySwiper", {
                loop: true,
                speed: 800,
                effect: "slide",
                autoplay: { delay: 5000, disableOnInteraction: false },
                pagination: { el: ".swiper-pagination", type: "progressbar" },
                navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
            });
            activeSwiperInstances.push(mainGalleryInstance);
        }
    }

    /* ================= 4. PREMIUM GSAP ANIMATION ENGINE SCENARIOS ================= */
    
    // Master Reveal Core Mechanics
    function animatePanelEntry(activatedPanelElement) {
        const id = activatedPanelElement.id;
        
        // Custom animation choreography relative to the active target panel context
        if (id === "panel-home") {
            gsap.fromTo("#panel-home .hero-title", 
                { y: 60, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
            );
            gsap.fromTo("#panel-home .hero-desc", 
                { y: 30, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" }
            );
            gsap.fromTo("#panel-home .hero-bg-img", 
                { scale: 1.15 }, 
                { scale: 1, duration: 2.5, ease: "power2.out" }
            );
        } else {
            // General clean structural internal landing element movement logic
            const titleElement = activatedPanelElement.querySelector(".inner-title");
            const descElement = activatedPanelElement.querySelector(".inner-desc");
            
            if (titleElement) gsap.fromTo(titleElement, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
            if (descElement) gsap.fromTo(descElement, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.15, ease: "power3.out" });
        }

        // Execute architectural section scroll transformations inside active panels safely
        setupScrollDrivenTriggers(activatedPanelElement);
    }

    function setupScrollDrivenTriggers(scope) {
        // Clear old triggers safely before remap execution loops
        ScrollTrigger.getAll().forEach(t => t.kill());

        // Reveal effect on structural images containing masking classes
        const maskedImages = scope.querySelectorAll(".reveal-scroll-img, .preview-img-container img");
        maskedImages.forEach(img => {
            gsap.fromTo(img, 
                { scale: 1.12, clipPath: "inset(10% 10% 10% 10%)" },
                { 
                    scale: 1, 
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 1.4,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: img,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        // Stagger reveal performance for matrix style display cards
        const animationMatrices = scope.querySelectorAll(".value-matrix, .reviews-grid");
        animationMatrices.forEach(matrix => {
            const cards = matrix.children;
            gsap.fromTo(cards, 
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: matrix,
                        start: "top 80%"
                    }
                }
            );
        });

        // Smooth subtle parallax logic for building presentation elevations
        const parallaxTarget = scope.querySelector(".parallax-img");
        if (parallaxTarget) {
            gsap.fromTo(parallaxTarget,
                { yPercent: -10 },
                {
                    yPercent: 10,
                    ease: "none",
                    scrollTrigger: {
                        trigger: parallaxTarget.parentElement,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );
        }
    }

    /* ================= 5. SYSTEM INITIALIZATION BOOTSTRAP ================= */
    // Boot up framework routing at Home state cleanly
    switchActivePanel("home");
});