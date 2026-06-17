// index-slider.js – для главной страницы
document.addEventListener('DOMContentLoaded', () => {
    const mainSlides = [
        {
            title: "God of War",
            desc: "Игровой процесс, который меняет взгляд на жанр",
            bgImage: "",
            bgVideo: "videos/god-of-war.mp4",
            trailerVideo: "https://www.youtube.com/embed/K0u_kAWLJOA",
            link: "game-god-of-war.html"
        },
        {
            title: "Fox Run",
            desc: "Динамичный раннер с невероятной скоростью",
            bgImage: "images/slides/fox-run.jpg",
            bgVideo: "videos/fox-run.mp4",
            trailerVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            link: "game-fox-run.html"
        },
        {
            title: "D-Bus City",
            desc: "Симулятор управления городским транспортом",
            bgImage: "images/slides/d-bus-city.jpg",
            bgVideo: "videos/d-bus-city.mp4",
            trailerVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            link: "game-d-bus-city.html"
        },
        {
            title: "Initium",
            desc: "Фэнтезийная RPG с глубокой историей",
            bgImage: "images/slides/initium.jpg",
            bgVideo: "videos/initium.mp4",
            trailerVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            link: "game-initium.html"
        },
        {
            title: "Проект X",
            desc: "Открытый мир с динамичным сюжетом",
            bgImage: "images/slides/project-x.jpg",
            bgVideo: "",
            trailerVideo: "",
            link: "project-x.html"
        },
        {
            title: "Проект W",
            desc: "Быстрая аркадная игра с мультиплеером",
            bgImage: "images/slides/project-w.jpg",
            bgVideo: "",
            trailerVideo: "",
            link: "project-w.html"
        }
    ];

    let currentIndex = 0;
    const heroSection = document.getElementById('hero-section');
    const heroTitle = document.getElementById('hero-title');
    const heroDesc = document.getElementById('hero-desc');
    const currentSlideEl = document.getElementById('current-slide');
    const totalSlidesEl = document.getElementById('total-slides');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const trailerBtn = document.getElementById('hero-trailer');
    const detailsBtn = document.getElementById('hero-details');

    if (totalSlidesEl) {
        totalSlidesEl.innerText = `${mainSlides.length.toString().padStart(2, '0')}`;
    }

    // Создаём контейнер для фоновых видео
    let videoContainer = heroSection.querySelector('.hero-bg-videos');
    if (!videoContainer) {
        videoContainer = document.createElement('div');
        videoContainer.className = 'hero-bg-videos';
        videoContainer.style.position = 'absolute';
        videoContainer.style.inset = '0';
        videoContainer.style.overflow = 'hidden';
        videoContainer.style.zIndex = '0';
        heroSection.appendChild(videoContainer);
    }

    // Создаём видео для каждого слайда
    const videoElements = [];
    mainSlides.forEach((slide, index) => {
        if (slide.bgVideo) {
            const video = document.createElement('video');
            video.src = slide.bgVideo;
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            video.preload = 'auto';
            video.style.position = 'absolute';
            video.style.top = '0';
            video.style.left = '0';
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.objectFit = 'cover';
            video.style.display = 'none';
            video.style.opacity = '0';
            video.style.transition = 'opacity 0.5s ease';
            video.dataset.index = index;
            video.dataset.loaded = 'false';
            video.dataset.active = 'false';
            videoContainer.appendChild(video);
            videoElements.push(video);

            video.addEventListener('loadeddata', function() {
                video.dataset.loaded = 'true';
            });
            video.addEventListener('error', function() {
                video.style.display = 'none';
            });
        } else {
            videoElements.push(null);
        }
    });

    function switchVideo(index) {
        const currentVideo = videoElements[index];
        const previousVideo = videoElements.find((v, i) => v && v.dataset.active === 'true');

        if (previousVideo && previousVideo !== currentVideo) {
            previousVideo.pause();
            previousVideo.currentTime = 0;
            previousVideo.style.opacity = '0';
            previousVideo.dataset.active = 'false';
            setTimeout(() => {
                if (previousVideo.dataset.active === 'false') {
                    previousVideo.style.display = 'none';
                }
            }, 500);
        }

        if (currentVideo) {
            currentVideo.currentTime = 0;
            currentVideo.style.display = 'block';
            currentVideo.dataset.active = 'true';

            if (currentVideo.dataset.loaded === 'true') {
                currentVideo.style.opacity = '1';
            } else {
                currentVideo.addEventListener('loadeddata', function onLoad() {
                    currentVideo.style.opacity = '1';
                    currentVideo.removeEventListener('loadeddata', onLoad);
                });
            }

            currentVideo.play().catch(() => {
                currentVideo.muted = true;
                currentVideo.play();
            });
        } else {
            videoElements.forEach(v => {
                if (v) {
                    v.pause();
                    v.currentTime = 0;
                    v.style.display = 'none';
                    v.style.opacity = '0';
                    v.dataset.active = 'false';
                }
            });
        }
    }

    function updateSlide() {
        if (!heroSection || !heroTitle) return;
        const slide = mainSlides[currentIndex];

        heroTitle.innerText = slide.title;
        if (heroDesc) heroDesc.innerText = slide.desc || '';
        if (currentSlideEl) {
            currentSlideEl.innerText = `${(currentIndex + 1).toString().padStart(2, '0')}`;
        }

        // Фон – если есть bgImage, используем его как fallback
        heroSection.style.backgroundImage = `url('${slide.bgImage || ''}')`;
        heroSection.style.backgroundSize = 'cover';
        heroSection.style.backgroundPosition = 'center';

        switchVideo(currentIndex);

        if (trailerBtn) {
            if (slide.trailerVideo) {
                trailerBtn.href = '#';
                trailerBtn.style.display = 'inline-block';
                trailerBtn.onclick = function(e) {
                    e.preventDefault();
                    if (typeof openVideoModal === 'function') {
                        openVideoModal(slide.trailerVideo);
                    }
                };
            } else {
                trailerBtn.style.display = 'none';
            }
        }

        if (detailsBtn) {
            detailsBtn.href = slide.link || '#';
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % mainSlides.length;
            updateSlide();
        });
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + mainSlides.length) % mainSlides.length;
            updateSlide();
        });
    }

    updateSlide();
});