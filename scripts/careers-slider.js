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

    const videoElement = document.getElementById('careers-hero-video');
    let videoReady = false;

    // --- Обработчики видео ---
    if (videoElement) {
        // Когда видео достаточно загружено для воспроизведения
        videoElement.addEventListener('canplaythrough', function() {
            videoReady = true;
            console.log('Видео загружено и готово к воспроизведению');
            if (currentIndex === 0) {
                videoElement.play().catch(err => {
                    console.warn('Автовоспроизведение заблокировано:', err);
                    // Можно добавить кнопку для ручного запуска, но пока просто игнорируем
                });
            }
        });

        // Если видео уже загружено (например, из кэша)
        if (videoElement.readyState >= 4) { // HAVE_ENOUGH_DATA
            videoReady = true;
            if (currentIndex === 0) {
                videoElement.play().catch(() => {});
            }
        }

        // Ошибка загрузки – выводим в консоль, но НЕ скрываем видео
        videoElement.addEventListener('error', function(e) {
            console.error('Ошибка загрузки видео:', videoElement.error);
            // Можно показать запасной фон, но не скрываем видео, чтобы пользователь видел хотя бы poster
            // Устанавливаем чёрный фон, если видео не загрузилось
            if (currentIndex === 0) {
                heroSection.style.backgroundColor = '#0b0b0b';
            }
        });

        // Логируем события для отладки
        videoElement.addEventListener('loadedmetadata', function() {
            console.log('Метаданные видео загружены');
        });
        videoElement.addEventListener('loadstart', function() {
            console.log('Начата загрузка видео');
        });
    } else {
        console.warn('Элемент video с id="careers-hero-video" не найден');
    }

    // --- Общее количество слайдов ---
    if (totalSlidesEl) {
        totalSlidesEl.innerText = `${careerSlides.length.toString().padStart(2, '0')}`;
    }

    // --- Обновление слайда ---
    function updateSlide() {
        if (!heroSection || !heroTitle) return;
        const slide = careerSlides[currentIndex];

        heroTitle.innerText = slide.title;
        if (heroDesc) heroDesc.innerText = slide.desc || '';
        if (currentSlideEl) {
            currentSlideEl.innerText = `${(currentIndex + 1).toString().padStart(2, '0')}`;
        }

        // Управление видео и фоном
        if (currentIndex === 0 && videoElement) {
            // Первый слайд – показываем видео
            videoElement.style.display = 'block';
            heroSection.style.backgroundImage = 'none';
            heroSection.style.backgroundColor = 'transparent';

            // Если видео готово – запускаем
            if (videoReady) {
                videoElement.play().catch(() => {});
            } else {
                // Если ещё не готово – пытаемся загрузить
                if (videoElement.paused && videoElement.networkState !== 2) {
                    videoElement.load();
                }
            }
        } else {
            // Другие слайды – скрываем видео и показываем фоновое изображение
            if (videoElement) {
                videoElement.pause();
                videoElement.style.display = 'none';
            }
            if (slide.bgImage) {
                heroSection.style.backgroundImage = `url('${slide.bgImage}')`;
                heroSection.style.backgroundSize = 'cover';
                heroSection.style.backgroundPosition = 'center';
                heroSection.style.backgroundColor = 'transparent';
            } else {
                heroSection.style.backgroundImage = 'none';
                heroSection.style.backgroundColor = '#0b0b0b';
            }
        }
    }

    // --- Обработчик кнопки "вперёд" ---
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % careerSlides.length;
            updateSlide();
        });
    }

    // --- Инициализация ---
    updateSlide();
});