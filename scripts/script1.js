document.addEventListener('DOMContentLoaded', () => {
    const mainSlides = [
        { title: "God of War", image: "", video: "videos/god-of-war.mp4" },
        { title: "Fox Run", image: "images/slides/fox-run.jpg", video: "" },
        { title: "D-Bus City", image: "images/slides/d-bus-city.jpg", video: "" },
        { title: "Initium", image: "images/slides/initium.jpg", video: "" }
    ];
  
    const careerSlides = [
        { title: "ПРИСОЕДИНЯЙСЯ К КОМАНДЕ", image: "" },
        { title: "LEVEL DESIGN TEAM", image: "" },
        { title: "FRONTEND TEAM", image: "" },
        { title: "BACKEND TEAM", image: "" }
    ];

    const isCareersPage = document.body.contains(document.querySelector('.careers-hero'));
    const currentList = isCareersPage ? careerSlides : mainSlides;

    let currentIndex = 0;
    
    const heroSection = document.getElementById('hero-section');
    const heroTitle = document.getElementById('hero-title');
    const currentSlideEl = document.getElementById('current-slide');
    const totalSlidesEl = document.getElementById('total-slides');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const heroVideo = document.getElementById('hero-video');

    if (totalSlidesEl) {
        totalSlidesEl.innerText = `${currentList.length.toString().padStart(2, '0')}`;
    }

    function updateSlide() {
        if (!heroSection || !heroTitle) return;
        const slide = currentList[currentIndex];

        if (slide.video && heroVideo) {
            heroVideo.style.display = 'block';
            heroVideo.src = slide.video;
            heroVideo.load();
            heroVideo.play();
            heroSection.style.backgroundImage = 'none';
        } else {
            if (heroVideo) heroVideo.style.display = 'none';
            heroSection.style.backgroundImage = `url('${slide.image}')`;
        }
        
        heroTitle.innerText = slide.title;
        if (currentSlideEl) {
            currentSlideEl.innerText = `${(currentIndex + 1).toString().padStart(2, '0')}`;
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % currentList.length;
            updateSlide();
        });
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + currentList.length) % currentList.length;
            updateSlide();
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-on-scroll').forEach(el => observer.observe(el));
    
    updateSlide();
});

let currentImages = [];
let currentGalleryIndex = 0;
const galleryImages = [
    ["images/moscow-office.jpg", "images/moscow-interior1.jpg", "images/moscow-interior2.jpg"],
    ["images/spb-office.jpg", "images/spb-interior1.jpg", "images/spb-interior2.jpg"]
];
function openGallery(officeIndex) {
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

function openGameGallery(images) {
    currentImages = images;
    currentGalleryIndex = 0;
    updateGallery();
    const modal = document.getElementById('galleryModal');
    if (modal) modal.classList.add('active');
}