document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');

    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
            burger.classList.toggle('toggle');
        });
    }    
    const mainSlides = [
        { title: "God of War", image: "" },
        { title: "Last Of Us", image: "" },
        { title: "Dragon Warrior", image: "" },
        { title: "Dark Souls V", image: "" },
        { title: "Super Mario", image: "" }
    ];
    const careerSlides = [
        { title: "Level Design Team", image: "" },
        { title: "Frontend Team", image: "" },
        { title: "Backend Team", image: "" },
        { title: "Sound Team", image: "" }
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

    if (totalSlidesEl) {
        totalSlidesEl.innerText = `0${currentList.length}`;
    }

    function updateSlide() {
        if (!heroSection || !heroTitle) return;
        const slide = currentList[currentIndex];
        heroSection.style.backgroundImage = `url('${slide.image}')`;
        heroTitle.innerText = slide.title;
        if (currentSlideEl) {
            currentSlideEl.innerText = `0${currentIndex + 1}`;
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

    document.querySelectorAll('.fade-on-scroll').forEach(el => {
        observer.observe(el);
    });
});

// ГАЛЕРЕЯ ОФИСОВ 
let currentImages = [];
let currentIndex = 0;

const galleryImages = [
    // Офис 0 - Москва
    [
        "images/moscow-office.jpg",
        "images/moscow-interior1.jpg",
        "images/moscow-interior2.jpg"
    ],
    // Офис 1 - Санкт-Петербург
    [
        "images/spb-office.jpg",
        "images/spb-interior1.jpg",
        "images/spb-interior2.jpg"
    ]
];

function openGallery(officeIndex) {
    currentImages = galleryImages[officeIndex] || galleryImages[0];
    currentIndex = 0;
    updateGallery();
    document.getElementById('galleryModal').classList.add('active');
}

function closeGallery() {
    document.getElementById('galleryModal').classList.remove('active');
}

function updateGallery() {
    document.getElementById('galleryImage').src = currentImages[currentIndex];
    document.getElementById('galleryCounter').textContent = `${currentIndex + 1} / ${currentImages.length}`;
}

function nextImage() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateGallery();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateGallery();
}

// Закрытие по ESC
document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") closeGallery();
});