/**
 * Ravi Restaurant — Complete Creative Systems JavaScript Blueprint
 * Features Responsive Event Handling, Cross-Browser Vector Animations, and Interactive Popup Interfaces
 */

// Production-Grade Dataset Curated Verbatim with Unsplash High-Definition Culinary Context Layouts
const CRITICAL_MENU_DATA = [
    // Thalis & Sizzlers Grouping
    { id: "th1", name: "Gujarati Thali (Lunch)", category: "thali", price: "Unlimited", sub: "Authentic Multi-Curry Unlimited Lunch Cycle Experience", img: "https://images.unsplash.com/photo-1589778655375-3e622a9fc91c?auto=format&fit=crop&w=1000&q=85", featured: true },
    { id: "th2", name: "Punjabi Thali (Cycles)", category: "thali", price: "Unlimited", sub: "Paneer Special Curry, Flatbreads, Rice & Accoutrements", img: "https://images.unsplash.com/photo-1680359873864-43e89bf248ac?auto=format&fit=crop&w=1000&q=85", featured: true },
    { id: "th3", name: "Veg. Sizzler Platter", category: "thali", price: "230/-", sub: "Smoking hot plate arrayed with vegetables and house sauce", img: "https://images.unsplash.com/photo-1542263287-f0bd3078f3fb?auto=format&fit=crop&w=1000&q=85", featured: true },
    { id: "th4", name: "Ravi Special Sizzler", category: "thali", price: "300/-", sub: "Premium house composition reserved for absolute celebratory dining", img: "https://images.unsplash.com/photo-1711153419402-336ee48f2138?auto=format&fit=crop&w=1000&q=85", featured: true },

    // Kathiyavadi Menu Grouping
    { id: "k1", name: "Sev Tameta", category: "kathiyavadi", price: "70/-", sub: "Traditional Spiced Tomato & Sev Curry", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=85" },
    { id: "k2", name: "Lasaniya Bateta", category: "kathiyavadi", price: "70/-", sub: "Garlic Infused Roasted Potatoes", img: "https://images.unsplash.com/photo-1596560981701-bfadc91c47ce?auto=format&fit=crop&w=1000&q=85" },
    { id: "k3", name: "Bharela Ringana", category: "kathiyavadi", price: "70/-", sub: "Stuffed Baby Eggplants Regional Spec", img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1000&q=85" },
    { id: "k4", name: "Bharela Bateta", category: "kathiyavadi", price: "70/-", sub: "Stuffed Potato Core Local Recipe", img: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1000&q=85" },
    { id: "k5", name: "Rajwadi Dhokali", category: "kathiyavadi", price: "70/-", sub: "Royal Spiced Flour Dumplings in Gravy", img: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=1000&q=85" },
    { id: "k6", name: "Suki Bhaji", category: "kathiyavadi", price: "70/-", sub: "Dry Potato Tempering with Sesame", img: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=1000&q=85" },
    { id: "k7", name: "Undhiyu", category: "kathiyavadi", price: "70/-", sub: "Seasonal Mixed Vegetable Pot Classic", img: "https://images.unsplash.com/photo-1645432524571-0e469b22e43f?auto=format&fit=crop&w=1000&q=85" },
    { id: "k8", name: "Ringna No Olo", category: "kathiyavadi", price: "70/-", sub: "Smoked Roasted Eggplant Mash", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1000&q=85" },
    { id: "k9", name: "Dal Bhat", category: "kathiyavadi", price: "70/-", sub: "Comfort Lentil Stew served with Rice", img: "https://images.unsplash.com/photo-1767114915989-c6ab3c8fc42e?auto=format&fit=crop&w=1000&q=85" },
    { id: "k10", name: "Kadhi Khichadi", category: "kathiyavadi", price: "70/-", sub: "Spiced Yogurt Soup with Rice Stew", img: "https://images.unsplash.com/photo-1707425197254-266fec098cae?auto=format&fit=crop&w=1000&q=85" },
    { id: "k11", name: "Bajarano Rotalo", category: "kathiyavadi", price: "25/-", sub: "Thick Hand-Rolled Pearl Millet Flatbread", img: "https://images.unsplash.com/photo-1591022132290-26a8144bd9c4?auto=format&fit=crop&w=1000&q=85" },
    { id: "k12", name: "Fulka Rotali", category: "kathiyavadi", price: "10/-", sub: "Light Whole Wheat Puffed Bread", img: "https://images.unsplash.com/photo-1521791697570-e1f13d0b81d0?auto=format&fit=crop&w=1000&q=85" },

    // South Indian Menu Grouping
    { id: "s1", name: "Sada Dhosa", category: "south-indian", price: "60/-", sub: "Crisp Fermented Lentil Crepe", img: "https://images.unsplash.com/photo-1743615467204-8fdaa85ff2db?auto=format&fit=crop&w=1000&q=85" },
    { id: "s2", name: "Masala Dhosa", category: "south-indian", price: "80/-", sub: "Crepe Stuffed with Tempered Potatoes", img: "https://images.unsplash.com/photo-1694849789325-914b71ab4075?auto=format&fit=crop&w=1000&q=85" },
    { id: "s3", name: "Maisur Sada Dhosa", category: "south-indian", price: "90/-", sub: "With Inward Spicy Red Mysore Chutney", img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1000&q=85" },
    { id: "s4", name: "Maisur Masala Dhosa", category: "south-indian", price: "100/-", sub: "Mysore Spice Crepe with Potato Mash", img: "https://images.unsplash.com/photo-1680359871322-aabe6b33eff5?auto=format&fit=crop&w=1000&q=85" },
    { id: "s5", name: "Paneer Masala Dhosa", category: "south-indian", price: "100/-", sub: "Stuffed with Premium Grated Indian Cottage Cheese", img: "https://images.unsplash.com/photo-1708146464361-5c5ce4f9abb6?auto=format&fit=crop&w=1000&q=85" },
    { id: "s6", name: "Rava Sada Dhosa", category: "south-indian", price: "90/-", sub: "Crisp Cream-of-Wheat Semolina Crepe", img: "https://images.unsplash.com/photo-1743615467363-250466982515?auto=format&fit=crop&w=1000&q=85" },
    { id: "s7", name: "Plain Uttapam", category: "south-indian", price: "80/-", sub: "Thick Rice Pancake Format Base", img: "https://images.unsplash.com/photo-1736239092023-ba677fd6751c?auto=format&fit=crop&w=1000&q=85" },
    { id: "s8", name: "Onion Uttapam", category: "south-indian", price: "100/-", sub: "Topped with Charred Red Onions & Chillies", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1000&q=85" },

    // Soup & Starters Grouping
    { id: "st1", name: "Tomato Soup", category: "starter-soup", price: "80/-", sub: "Velvety Classic Butter Tomato Puree", img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1000&q=85" },
    { id: "st2", name: "Manchurian Soup", category: "starter-soup", price: "80/-", sub: "Indo-Chinese Dark Soy Broth with Cabbage Crisp", img: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=1000&q=85" },
    { id: "st3", name: "Paneer Chilly Dry", category: "starter-soup", price: "170/-", sub: "Cottage Cheese wok-tossed with peppers", img: "https://images.unsplash.com/photo-1690401767645-595de0e0e5f8?auto=format&fit=crop&w=1000&q=85" },
    { id: "st4", name: "Hara Bhara Kabab", category: "starter-soup", price: "150/-", sub: "Pan-fried Minced Spinach & Green Pea Patties", img: "https://images.unsplash.com/photo-1767114915965-7abe87d7c7d8?auto=format&fit=crop&w=1000&q=85" },
    { id: "st5", name: "Paneer Tikka Dry", category: "starter-soup", price: "180/-", sub: "Clay Oven Roasted Marinated Paneer Cubes", img: "https://images.unsplash.com/photo-1657271518639-ce701811dcb4?auto=format&fit=crop&w=1000&q=85" },
    { id: "st6", name: "Veg. Crispy", category: "starter-soup", price: "150/-", sub: "Crunchy Batter-fried Tossed Vegetables", img: "https://images.unsplash.com/photo-1606791422814-b32c705e3e2f?auto=format&fit=crop&w=1000&q=85" },

    // Chinese & Rice Grouping
    { id: "c1", name: "Veg. Hakka Noodles", category: "chinese-rice", price: "100/-", sub: "Classic wok-tossed savory street noodles", img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=1000&q=85" },
    { id: "c2", name: "Schezwan Noodles", category: "chinese-rice", price: "110/-", sub: "Fiery red hot chili pepper noodle formulation", img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=1000&q=85" },
    { id: "c3", name: "Veg. Fried Rice", category: "chinese-rice", price: "100/-", sub: "Fragrant wok-fried long grain basmati rice", img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1000&q=85" },
    { id: "c4", name: "Manchurian Fried Rice", category: "chinese-rice", price: "120/-", sub: "Rice paired elegantly with dynamic fried vegetable balls", img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1000&q=85" }
];

document.addEventListener("DOMContentLoaded", () => {
    initAmbientCanvas();
    initCustomCursor();
    initScrollAnimations();
    renderDynamicMenu("all");
    setupMenuInteractions();
    setupLightboxLogic();
});

/**
 * Cross-Browser Safe Drift Particle Canvas Animation
 */
function initAmbientCanvas() {
    const canvas = document.getElementById("ambient-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }, { passive: true });

    const particles = Array.from({ length: 20 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 60 + 40,
        color: Math.random() > 0.5 ? 'rgba(166, 43, 43, 0.03)' : 'rgba(242, 183, 5, 0.02)',
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2
    }));

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < -p.radius) p.x = width + p.radius;
            if (p.x > width + p.radius) p.x = -p.radius;
            if (p.y < -p.radius) p.y = height + p.radius;
            if (p.y > height + p.radius) p.y = -p.radius;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

/**
 * Micro-Interaction Mouse Engine
 */
function initCustomCursor() {
    const cursor = document.getElementById("custom-cursor");
    if (!cursor) return;

    window.addEventListener("mousemove", (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    }, { passive: true });

    const hoverSelectors = "a, button, input, .menu-item-card, .mosaic-item";
    document.addEventListener("mouseover", (e) => {
        if (e.target.closest(hoverSelectors)) {
            document.body.classList.add("clickable-hover");
        }
    });
    document.addEventListener("mouseout", (e) => {
        if (e.target.closest(hoverSelectors)) {
            document.body.classList.remove("clickable-hover");
        }
    });
}

/**
 * Native Cross-Browser Intersection Observer Interface for Scroll Reveals
 */
function initScrollAnimations() {
    const elementsToReveal = document.querySelectorAll(".reveal-element");
    if (!elementsToReveal.length) return;
    
    const observerOptions = {
        root: null,
        threshold: 0.05,
        rootMargin: "0px 0px -30px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animated-active");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elementsToReveal.forEach(el => observer.observe(el));
}

/**
 * Programmatic Rendering Engine for Dynamic Menu Items Grid
 */
const itemsGrid = document.getElementById("menu-items-grid");
const searchInput = document.getElementById("menu-search");
const tabButtons = document.querySelectorAll(".tab-btn");

function renderDynamicMenu(categoryFilter = "all", searchQuery = "") {
    if (!itemsGrid) return;
    itemsGrid.innerHTML = "";

    const targetedRows = CRITICAL_MENU_DATA.filter(item => {
        const matchesCategory = (categoryFilter === "all" || item.category === categoryFilter);
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              item.sub.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (targetedRows.length === 0) {
        itemsGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 4rem 0; color: var(--color-text-muted);">No custom dishes match your current parameters.</div>`;
        return;
    }

    targetedRows.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "menu-item-card";
        card.setAttribute("data-id", item.id);
        card.style.opacity = "0";
        card.style.transform = "translateY(15px)";
        card.style.transition = `opacity 0.4s ease ${index * 0.02}s, transform 0.4s ease ${index * 0.02}s`;
        
        card.innerHTML = `
            <div class="card-media-header">
                <img src="${item.img}" alt="${item.name}" class="card-dish-img" loading="lazy">
            </div>
            <div class="card-body-content">
                <div class="card-top-row">
                    <div class="item-title-block">
                        <span class="category-tag">${item.category.replace('-', ' ')}</span>
                        <h4>${item.name}</h4>
                    </div>
                    <div class="item-price-tag">${item.price}</div>
                </div>
                <div class="card-bottom-row">
                    <p class="flag-badge ${item.featured ? 'featured' : ''}">${item.featured ? '★ House Special Presentation' : item.sub}</p>
                </div>
            </div>
        `;

        itemsGrid.appendChild(card);
        
        // Trigger smooth staggered entry reveal
        setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, 30);
    });
}

function setupMenuInteractions() {
    let currentCategory = "all";
    let currentSearch = "";

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(t => t.classList.remove("active"));
            btn.classList.add("active");
            currentCategory = btn.getAttribute("data-category");
            renderDynamicMenu(currentCategory, currentSearch);
        });
    });

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            currentSearch = e.target.value;
            renderDynamicMenu(currentCategory, currentSearch);
        });
    }
}

/**
 * Popup Window Overlay Interaction Mechanics
 */
function setupLightboxLogic() {
    const modal = document.getElementById("lightbox-modal");
    const modalImg = document.getElementById("modal-target-img");
    const modalTitle = document.getElementById("modal-target-title");
    const modalSub = document.getElementById("modal-target-sub");
    const modalPrice = document.getElementById("modal-target-price");
    const modalClose = document.getElementById("modal-close");

    if (!modal || !itemsGrid) return;

    // Direct delegation mapping from dynamic element arrays
    itemsGrid.addEventListener("click", (e) => {
        const card = e.target.closest(".menu-item-card");
        if (!card) return;

        const id = card.getAttribute("data-id");
        const itemInfo = CRITICAL_MENU_DATA.find(item => item.id === id);
        
        if (itemInfo) {
            // Populate dialog components dynamically
            modalImg.src = itemInfo.img;
            modalImg.alt = itemInfo.name;
            modalTitle.innerText = itemInfo.name;
            modalSub.innerText = itemInfo.sub;
            modalPrice.innerText = itemInfo.price;
            
            modal.classList.add("active-window");
            modal.setAttribute("aria-hidden", "false");
            
            // Cross-browser lock window background scrolling safely
            document.body.style.overflow = "hidden";
        }
    });

    const exitModalHandler = () => {
        modal.classList.remove("active-window");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    };

    modalClose.addEventListener("click", exitModalHandler);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) exitModalHandler();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active-window")) exitModalHandler();
    });
}