const galleries = {
    maritime: {
        folder: "maritime",
        photos: maritimePhotos
    },

    onshore: {
        folder: "onshore",
        photos: onshorePhotos
    }
};

loadGallery(
    galleries.maritime.folder,
    galleries.maritime.photos
);

const gallery = document.getElementById("portfolioGallery");

gallery.addEventListener("click", (e) => {

    if (!e.target.matches(".photo-thumb img")) return;

    lightbox.classList.add("show");
    lightboxImg.src = e.target.src;
    lightboxImg.alt = e.target.alt;

});

function switchGallery(name, button) {

    document.querySelectorAll(".ptab").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    loadGallery(
        galleries[name].folder,
        galleries[name].photos
    );
}