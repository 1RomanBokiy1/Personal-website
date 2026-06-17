// careers-slider.js – для страницы карьеры
document.addEventListener('DOMContentLoaded', () => {
    const careerSlides = [
        {
            title: "ПРИСОЕДИНЯЙСЯ К КОМАНДЕ",
            desc: "Создавайте будущее гейминга вместе с нами",
            bgVideo: "videos/team/careers.mp4",
            bgImage: ""
        },
        {
            title: "LEVEL DESIGN TEAM",
            desc: "Проектирование игровых уровней",
            bgImage: "images/others_photo/level_design_team.jpg",
            bgVideo: ""
        },
        {
            title: "FRONTEND TEAM",
            desc: "Разработка пользовательских интерфейсов",
            bgImage: "images/others_photo/frontend_team.jpg",
            bgVideo: ""
        },
        {
            title: "BACKEND TEAM",
            desc: "Серверная логика и базы данных",
            bgImage: "images/others_photo/backend_team.jpg",
            bgVideo: ""
        },
        {
            title: "ARTIST TEAM",
            desc: "Визуальное оформление и концепт-арт",
            bgImage: "images/others_photo/artist_team.jpg",
            bgVideo: ""
        },
        {
            title: "ENGINEER TEAM",
            desc: "Разработка движка и оптимизация",
            bgImage: "images/others_photo/engineer_team.jpg",
            bgVideo: ""
        },
        {
            title: "DEVELOPERS TEAM",
            desc: "Программирование игровой логики",
            bgImage: "images/others_photo/developers_team.jpg",
            bgVideo: ""
        },
        {
            title: "GAME DESIGN TEAM",
            desc: "Проектирование геймплея и механик",
            bgImage: "images/others_photo/game_design_team.jpg",
            bgVideo: ""
        }
    ];

    let currentIndex = 0;
    const heroSection = document.getElementById('hero-section');
    const heroTitle = document.getElementById('hero-title');
    const heroDesc = document.getElementById('hero-desc');
    const currentSlideEl = document.getElementById('current-slide');
    const totalSlidesEl = document.getElementById('total-slides');
    const nextBtn = document.getElementById('next-btn');

    if (totalSlidesEl) {
        totalSlidesEl.innerText = `${careerSlides.length.toString().padStart(2, '0')}`;
    }

    // Видео уже вставлено в HTML, получаем его
    const videoElement = document.getElementById('careers-hero-video');

    function updateSlide() {
        if (!heroSection || !heroTitle) return;
        const slide = careerSlides[currentIndex];

        heroTitle.innerText = slide.title;
        if (heroDesc) heroDesc.innerText = slide.desc || '';
        if (currentSlideEl) {
            currentSlideEl.innerText = `${(currentIndex + 1).toString().padStart(2, '0')}`;
        }

        // Если первый слайд – показываем видео, иначе – фоновое изображение на весь экран
        if (currentIndex === 0 && videoElement) {
            videoElement.style.display = 'block';
            videoElement.play().catch(() => {});
            heroSection.style.backgroundImage = 'none';
            heroSection.style.backgroundSize = 'auto';
        } else {
            if (videoElement) {
                videoElement.style.display = 'none';
                videoElement.pause();
            }
            // Устанавливаем фоновое изображение на весь экран
            if (slide.bgImage) {
                heroSection.style.backgroundImage = `url('${slide.bgImage}')`;
                heroSection.style.backgroundSize = 'cover';
                heroSection.style.backgroundPosition = 'center';
            } else {
                // Если изображения нет – чёрный фон
                heroSection.style.backgroundImage = 'none';
                heroSection.style.backgroundColor = '#0b0b0b';
            }
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % careerSlides.length;
            updateSlide();
        });
    }

    updateSlide();
});