/**
 * Ravi Restaurant — Premium Architectural Frontend Experience File
 * Features Custom Ambient Interaction Fluid Layer & Highly Responsive Extracted Menu Filter Engines
 */

// Precise Curated Structural Menu Dataset Extracted Verbatim from Supplied Menu Images
const RAVI_MENU_DATA = [
    // Kathiyavadi Menu Grouping (Source: unnamed (8).jpg)
    { id: "k1", name: "Sev Tameta", category: "kathiyavadi", price: "70/-", sub: "Traditional Spiced Tomato & Sev Curry" },
    { id: "k2", name: "Lasaniya Bateta", category: "kathiyavadi", price: "70/-", sub: "Garlic Infused Roasted Potatoes" },
    { id: "k3", name: "Bharela Ringana", category: "kathiyavadi", price: "70/-", sub: "Stuffed Baby Eggplants Regional Spec" },
    { id: "k4", name: "Bharela Bateta", category: "kathiyavadi", price: "70/-", sub: "Stuffed Potato Core Local Recipe" },
    { id: "k5", name: "Rajwadi Dhokali", category: "kathiyavadi", price: "70/-", sub: "Royal Spiced Flour Dumplings in Gravy" },
    { id: "k6", name: "Suki Bhaji", category: "kathiyavadi", price: "70/-", sub: "Dry Potato Tempering with Sesame" },
    { id: "k7", name: "Undhiyu", category: "kathiyavadi", price: "70/-", sub: "Seasonal Mixed Vegetable Pot Classic" },
    { id: "k8", name: "Ringna No Olo", category: "kathiyavadi", price: "70/-", sub: "Smoked Roasted Eggplant Mash" },
    { id: "k9", name: "Dal Bhat", category: "kathiyavadi", price: "70/-", sub: "Comfort Lentil Stew served with Rice" },
    { id: "k10", name: "Kadhi Khichadi", category: "kathiyavadi", price: "70/-", sub: "Spiced Yogurt Soup with Rice Stew" },
    { id: "k11", name: "Bajarano Rotalo", category: "kathiyavadi", price: "25/-", sub: "Thick Hand-Rolled Pearl Millet Flatbread" },
    { id: "k12", name: "Fulka Rotali", category: "kathiyavadi", price: "10/-", sub: "Light Whole Wheat Puffed Bread" },

    // South Indian Menu Grouping (Source: unnamed (6).jpg / unnamed (3).jpg)
    { id: "s1", name: "Sada Dhosa", category: "south-indian", price: "60/-", sub: "Crisp Fermented Lentil Crepe" },
    { id: "s2", name: "Masala Dhosa", category: "south-indian", price: "80/-", sub: "Crepe Stuffed with Temper Potatoes" },
    { id: "s3", name: "Maisur Sada Dhosa", category: "south-indian", price: "90/-", sub: "With Inward Spicy Red Mysore Chutney" },
    { id: "s4", name: "Maisur Masala Dhosa", category: "south-indian", price: "100/-", sub: "Mysore Spice Crepe with Potato Mash" },
    { id: "s5", name: "Paneer Masala Dhosa", category: "south-indian", price: "100/-", sub: "Stuffed with Premium Grated Indian Cottage Cheese" },
    { id: "s6", name: "Rava Sada Dhosa", category: "south-indian", price: "90/-", sub: "Crisp Cream-of-Wheat Semolina Crepe" },
    { id: "s7", name: "Plain Uttapam", category: "south-indian", price: "80/-", sub: "Thick Rice Pancake Format Base" },
    { id: "s8", name: "Onion Uttapam", category: "south-indian", price: "100/-", sub: "Topped with Charred Red Onions & Chillies" },

    // Soup & Starters Grouping (Source: unnamed (7).jpg)
    { id: "st1", name: "Tomato Soup", category: "starter-soup", price: "80/-", sub: "Velvety Classic Butter Tomato Puree" },
    { id: "st2", name: "Manchurian Soup", category: "starter-soup", price: "80/-", sub: "Indo-Chinese Dark Soy Broth with Cabbage Crisp" },
    { id: "st3", name: "Paneer Chilly Dry", category: "starter-soup", price: "170/-", sub: "Cottage Cheese wok-tossed with peppers", featured: true },
    { id: "st4", name: "Hara Bhara Kabab", category: "starter-soup", price: "150/-", sub: "Pan-fried Minced Spinach & Green Pea Patties" },
    { id: "st5", name: "Paneer Tikka Dry", category: "starter-soup", price: "180/-", sub: "Clay Oven Roasted Marinated Paneer Cubes" },
    { id: "st6", name: "Veg. Cryspy", category: "starter-soup", price: "150/-", sub: "Crunchy Batter-fried Tossed Vegetables" },

    // Chinese & Rice Grouping (Source: unnamed (1).webp / unnamed (4).jpg)
    { id: "c1", name: "Veg. Hakka Noodles", category: "chinese-rice", price: "100/-", sub: "Classic wok-tossed savory street noodles" },
    { id: "c2", name: "Schezwan Noodles", category: "chinese-rice", price: "110/-", sub: "Fiery red hot chili pepper noodle formulation" },
    { id: "c3", name: "Veg. Fried Rice", category: "chinese-rice", price: "100/-", sub: "Fragrant wok-fried long grain basmati rice" },
    { id: "c4", name: "Manchurian Fried Rice", category: "chinese-rice", price: "120/-", sub: "Rice paired elegantly with dynamic fried vegetable balls" },

    // Thalis & Sizzlers Grouping (Source: unnamed.webp / unnamed (3).jpg)
    { id: "th1", name: "Gujasati Thali (Lunch)", category: "thali-sizzler", price: "Unlimited", sub: "Authentic Multi-Curry Unlimited Lunch Cycle Experience" },
    { id: "th2", name: "Punjabi Thali (Cycles)", category: "thali-sizzler", price: "Unlimited", sub: "Paneer Special Curry, Flatbreads, Rice & Accoutrements" },
    { id: "th3", name: "Veg. Sizzler Platter", category: "thali-sizzler", price: "230/-", sub: "Smoking hot plate arrayed with vegetables and house sauce", featured: true },
    { id: "th4", name: "Ravi Special Sizzler", category: "thali-sizzler", price: "300/-", sub: "Premium house composition reserved for absolute celebratory dining" }
];

document.addEventListener("DOMContentLoaded", () => {
    initAmbientCanvas();
    initCustomCursor();
    renderDynamicMenu("all");
    setupMenuInteractions();
});

/**
 * High-Performance Native Canvas Fluid Interaction Particle System
 * Replaces heavy external dependencies like WebGL or random particles with local brand-colored vectors
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
    });

    // Elegant slow-drifting tracking nodes using brand character colors
    const particles = Array.from({ length: 25 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 80 + 40,
        color: Math.random() > 0.5 ? 'rgba(166, 43, 43, 0.04)' : 'rgba(242, 183, 5, 0.03)',
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4
    }));

    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            // Fluid border bounce checks
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
 * Editorial Interactive Custom Cursor Experience Tracker
 */
function initCustomCursor() {
    const cursor = document.getElementById("custom-cursor");
    if (!cursor) return;

    window.addEventListener("mousemove", (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // Attach tracking class modifiers across interactive nodes
    const attachHoverSelectors = "a, button, input, .menu-item-card, .mosaic-item";
    document.addEventListener("mouseover", (e) => {
        if (e.target.closest(attachHoverSelectors)) {
            document.body.classList.add("clickable-hover");
        }
    });

    document.addEventListener("mouseout", (e) => {
        if (e.target.closest(attachHoverSelectors)) {
            document.body.classList.remove("clickable-hover");
        }
    });
}

/**
 * Programmatic Implementation & Filtering Configuration of Menu Grid
 */
const itemsGrid = document.getElementById("menu-items-grid");
const searchInput = document.getElementById("menu-search");
const tabButtons = document.querySelectorAll(".tab-btn");

function renderDynamicMenu(categoryFilter = "all", searchQuery = "") {
    if (!itemsGrid) return;
    itemsGrid.innerHTML = "";

    const targetedRows = RAVI_MENU_DATA.filter(item => {
        const matchesCategory = (categoryFilter === "all" || item.category === categoryFilter);
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              item.sub.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (targetedRows.length === 0) {
        itemsGrid.innerHTML = `<div class="no-results-state" style="grid-column: 1/-1; text-align: center; padding: 4rem color: var(--color-text-muted);">No custom dishes match your current filter parameters.</div>`;
        return;
    }

    targetedRows.forEach(item => {
        const card = document.createElement("div");
        card.className = "menu-item-card";
        card.setAttribute("data-id", item.id);
        
        card.innerHTML = `
            <div class="card-top-row">
                <div class="item-title-block">
                    <span class="category-tag">${item.category.replace('-', ' ')}</span>
                    <h4>${item.name}</h4>
                </div>
                <div class="item-price-tag">${item.price}</div>
            </div>
            <div class="card-bottom-row">
                <p class="flag-badge ${item.featured ? 'featured' : ''}">${item.featured ? '★ House Signature' : item.sub}</p>
            </div>
        `;
        itemsGrid.appendChild(card);
    });
}

function setupMenuInteractions() {
    let currentCategory = "all";
    let currentSearch = "";

    // Category Buttons Binding Realtime Layout updates
    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(t => t.classList.remove("active"));
            btn.classList.add("active");
            currentCategory = btn.getAttribute("data-category");
            renderDynamicMenu(currentCategory, currentSearch);
        });
    });

    // Keypress Search Input Filtering Debounce Tracker
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            currentSearch = e.target.value;
            renderDynamicMenu(currentCategory, currentSearch);
        });
    }
}