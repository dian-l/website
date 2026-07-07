const galleries = {
    maritime: {
        folder: "maritime",
        photos: maritimePhotos // Declared in maritime.js
    },
    onshore: {
        folder: "onshore",
        photos: onshorePhotos // Declared in onshore.js
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("portfolioGallery");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-image") || (lightbox ? lightbox.querySelector("img") : null);
    const closeBtn = document.querySelector(".lightbox-close") || document.querySelector(".close-lightbox");

    // ==========================================
    // PORTFOLIO GALLERY GENERATION & OPENING
    // ==========================================
    if (gallery) {
        // Initial gallery render
        if (typeof loadGallery === "function") {
            loadGallery(galleries.maritime.folder, galleries.maritime.photos);
        }

        // Open lightbox on gallery image click
        gallery.addEventListener("click", (e) => {
            const targetImg = e.target.closest(".photo-thumb img");
            if (!targetImg || !lightbox || !lightboxImg) return;

            lightbox.classList.add("show");
            lightboxImg.src = targetImg.src;
            lightboxImg.alt = targetImg.alt;
        });
    }

    // ==========================================
    // UNIFIED LIGHTBOX CLOSING LOGIC (Global)
    // ==========================================
    if (lightbox) {
        // Close via 'X' button
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                lightbox.classList.remove("show");
            });
        }

        // Close via clicking background overlay
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove("show");
            }
        });

        // Close via Escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && lightbox.classList.contains("show")) {
                lightbox.classList.remove("show");
            }
        });
    }
});

// Tab navigation switching
function switchGallery(name, button) {
    document.querySelectorAll(".ptab").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    if (typeof loadGallery === "function") {
        loadGallery(galleries[name].folder, galleries[name].photos);
    }
}
// ==========================================
// MOBILE NAVIGATION (Hamburger & Panel)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const mobilePanel = document.querySelector(".mobile-nav-panel");
    const mobileLinks = document.querySelectorAll(".mobile-links a");

    if (hamburger && mobilePanel) {
        // Toggle menu open/close
        hamburger.addEventListener("click", () => {
            const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
            hamburger.setAttribute("aria-expanded", !isExpanded);
            hamburger.classList.toggle("active");
            mobilePanel.classList.toggle("open");
            document.body.classList.toggle("no-scroll");
        });

        // Close panel when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                hamburger.setAttribute("aria-expanded", "false");
                hamburger.classList.remove("active");
                mobilePanel.classList.remove("open");
                document.body.classList.remove("no-scroll");
            });
        });

        // Close panel when clicking the dark background outside the links
        mobilePanel.addEventListener("click", (e) => {
            if (e.target === mobilePanel) {
                hamburger.setAttribute("aria-expanded", "false");
                hamburger.classList.remove("active");
                mobilePanel.classList.remove("open");
                document.body.classList.remove("no-scroll");
            }
        });
    }
});