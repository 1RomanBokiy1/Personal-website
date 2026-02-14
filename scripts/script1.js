document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');

    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('toggle');
    });

    // --- 2. Логика Слайдера (Hero Section) ---
    // Массив данных для слайдера. Я поставил картинки-заглушки.
    // Замени url(...) на свои реальные фото игр.
    const slides = [
        {
            title: "God of War",
            image: "https://images.unsplash.com/photo-1511512578047-dfb367046420"
        },
        {
            title: "last Of Us",
            image: "https://images.unsplash.com/photo-1542751371-adc38448a05e"
        },
        {
            title: "Dragon Warrior",
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f"
        },
        {
            title: "Dark Souls V",
            image: "https://images.unsplash.com/photo-1511882150382-421056ac8ba7"
        },
        {
            title: "Super Mario",
            image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc"
        }
    ];

    let currentIndex = 0;
    
    const heroSection = document.getElementById('hero-section');
    const heroTitle = document.getElementById('hero-title');
    const currentSlideEl = document.getElementById('current-slide');
    const totalSlidesEl = document.getElementById('total-slides');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    totalSlidesEl.innerText = `0${slides.length}`;

    function updateSlide() {
        const slide = slides[currentIndex];
        heroSection.style.backgroundImage = `url('${slide.image}')`;
        heroTitle.innerText = slide.title;
        currentSlideEl.innerText = `0${currentIndex + 1}`;
    }

    nextBtn.addEventListener('click', () => {
        currentIndex++;
        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }
        updateSlide();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        }
        updateSlide();
    });

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