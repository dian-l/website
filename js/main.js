// Global data
const galleries = {
    maritime: { folder: "maritime", photos: typeof maritimePhotos !== 'undefined' ? maritimePhotos : [] },
    onshore: { folder: "onshore", photos: typeof onshorePhotos !== 'undefined' ? onshorePhotos : [] }
};

document.addEventListener("DOMContentLoaded", () => {
    // --- 1. MOBILE NAV ---
    const hamburger = document.querySelector(".hamburger");
    const mobilePanel = document.querySelector(".mobile-nav-panel");
    const mobileLinks = document.querySelectorAll(".mobile-links a");

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
            hamburger.setAttribute("aria-expanded", !isExpanded);
            hamburger.classList.toggle("active");
            if (mobilePanel) mobilePanel.classList.toggle("open");
            document.body.classList.toggle("no-scroll");
        });
        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                hamburger.setAttribute("aria-expanded", "false");
                hamburger.classList.remove("active");
                if (mobilePanel) mobilePanel.classList.remove("open");
                document.body.classList.remove("no-scroll");
            });
        });
    }

    // --- 2. PORTFOLIO ---
    const gallery = document.getElementById("portfolioGallery");
    const lightbox = document.getElementById("lightbox");
    const lbImg = document.getElementById("lightbox-image");
    const closeBtn = document.querySelector(".lightbox-close") || document.querySelector(".close-lightbox");

    if (gallery && typeof loadGallery === "function") {
        loadGallery(galleries.maritime.folder, galleries.maritime.photos);
        gallery.addEventListener("click", (e) => {
            const targetImg = e.target.closest(".photo-thumb img");
            if (targetImg && lightbox && lbImg) {
                lightbox.classList.add("show");
                lbImg.src = targetImg.src;
            }
        });
    }

    // --- 3. UNIVERSAL LIGHTBOX CLOSING ---
    if (lightbox) {
        const close = () => lightbox.classList.remove("show");
        if (closeBtn) closeBtn.addEventListener("click", close);
        lightbox.addEventListener("click", (e) => { if (e.target === lightbox) close(); });
        document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
    }
});

// Helper for Portfolio Tabs
function switchGallery(name, button) {
    document.querySelectorAll(".ptab").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    if (typeof loadGallery === "function") {
        loadGallery(galleries[name].folder, galleries[name].photos);
    }
}
// ==========================================
// CV TAB & LIGHTBOX (Global)
// ==========================================

// Switch CV tabs
function switchCV(type, el) {
    const isAlreadyActive = el.classList.contains("active");
    if (isAlreadyActive) return;

    document.querySelectorAll(".cvtab").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".cv-panel").forEach((p) => p.classList.remove("active"));

    el.classList.add("active");
    const targetPanel = document.getElementById("cv-" + type);
    if (targetPanel) targetPanel.classList.add("active");
}

// Global Lightbox Trigger
function openLightbox(src) {
    const lb = document.getElementById("lightbox");
    const lbImg = document.getElementById("lightbox-image");
    if (!lb || !lbImg) return;
    
    lbImg.src = src;
    lb.classList.add("show");
}