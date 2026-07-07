function loadGallery(folder, photos) {

    const gallery = document.getElementById("portfolioGallery");

    if (!gallery) return;

    gallery.innerHTML = photos
        .filter(photo => !photo.hidden)
        .map(photo => `
            <div class="photo-item">
                <div class="photo-thumb">
                    <img
                        src="images/${folder}/${photo.file}"
                        alt="${photo.description}"
                        loading="lazy"
                        decoding="async"
                    >

                    <div class="photo-overlay">
                        <h3>${photo.title}</h3>
                        <p>${photo.description}</p>
                    </div>

                </div>
            </div>
        `).join("");

}