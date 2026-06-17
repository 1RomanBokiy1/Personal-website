document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.game-hero');
    if (!heroSection) return;

    const videoSrc = heroSection.dataset.video;
    if (!videoSrc) return;

    // Создаём контейнер для видео, если его нет
    let videoContainer = heroSection.querySelector('.game-bg-videos');
    if (!videoContainer) {
        videoContainer = document.createElement('div');
        videoContainer.className = 'game-bg-videos';
        heroSection.prepend(videoContainer);
    }

    // Создаём элемент video
    const video = document.createElement('video');
    video.src = videoSrc;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.style.display = 'block';
    video.style.opacity = '0';
    videoContainer.appendChild(video);

    // При успешной загрузке показываем видео
    video.addEventListener('loadeddata', function() {
        video.style.opacity = '1';
        video.play().catch(() => {
            video.muted = true;
            video.play();
        });
    });

    // Если видео не загрузилось – скрываем
    video.addEventListener('error', function() {
        video.style.display = 'none';
    });

    // Убедимся, что видео запустится, даже если браузер блокирует autoplay
    document.addEventListener('click', function() {
        if (video.paused) {
            video.play();
        }
    }, { once: true });
});