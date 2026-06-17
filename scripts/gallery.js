// gallery.js
let currentImages = [];
let currentGalleryIndex = 0;

function openGameGallery(images) {
    currentImages = images;
    currentGalleryIndex = 0;
    updateGallery();
    const modal = document.getElementById('galleryModal');
    if (modal) modal.classList.add('active');
}

function openGallery(officeIndex) {
    const galleryImages = [
        ["images/moscow-office.jpg", "images/moscow-interior1.jpg", "images/moscow-interior2.jpg"],
        ["images/spb-office.jpg", "images/spb-interior1.jpg", "images/spb-interior2.jpg"]
    ];
    currentImages = galleryImages[officeIndex] || galleryImages[0];
    currentGalleryIndex = 0;
    updateGallery();
    const modal = document.getElementById('galleryModal');
    if (modal) modal.classList.add('active');
}

function closeGallery() {
    const modal = document.getElementById('galleryModal');
    if (modal) modal.classList.remove('active');
}

function updateGallery() {
    const galleryImage = document.getElementById('galleryImage');
    const galleryCounter = document.getElementById('galleryCounter');
    if (galleryImage) galleryImage.src = currentImages[currentGalleryIndex];
    if (galleryCounter) galleryCounter.textContent = `${currentGalleryIndex + 1} / ${currentImages.length}`;
}

function nextImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % currentImages.length;
    updateGallery();
}

function prevImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + currentImages.length) % currentImages.length;
    updateGallery();
}

document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") closeGallery();
});