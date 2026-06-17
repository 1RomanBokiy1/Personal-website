// video-modal.js

// Функция для получения embed-ссылки YouTube из обычной ссылки
function getYouTubeEmbedUrl(url) {
    // Если это уже embed-ссылка, возвращаем как есть
    if (url.includes('youtube.com/embed/')) return url;
    
    // Если это ссылка вида https://www.youtube.com/watch?v=xxx
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`;
    }
    // Если не удалось распарсить, возвращаем исходную ссылку
    return url;
}

function openVideoModal(videoSrc) {
    const modal = document.getElementById('videoModal');
    const content = document.querySelector('.video-modal-content');
    
    if (modal && content) {
        // Удаляем старый iframe, если он есть
        const oldIframe = content.querySelector('iframe');
        if (oldIframe) {
            oldIframe.remove();
        }

        // Создаём новый iframe
        const iframe = document.createElement('iframe');
        iframe.id = 'videoIframe';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('frameborder', '0');

        // Определяем, что за ссылка – YouTube или локальное видео
        if (videoSrc.endsWith('.mp4') || videoSrc.endsWith('.webm')) {
            // Локальное видео
            iframe.srcdoc = `<video controls autoplay style="width:100%;height:100%;"><source src="${videoSrc}" type="video/mp4"></video>`;
        } else {
            // YouTube или другой iframe-контент
            const embedUrl = getYouTubeEmbedUrl(videoSrc);
            // Добавляем параметр autoplay=1 для автовоспроизведения
            if (embedUrl.includes('youtube.com/embed/')) {
                iframe.src = embedUrl + (embedUrl.includes('?') ? '&' : '?') + 'autoplay=1&rel=0';
            } else {
                iframe.src = embedUrl;
            }
        }

        content.appendChild(iframe);
        modal.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const videoModal = document.getElementById('videoModal');
    const videoClose = document.getElementById('videoModalClose');

    if (videoClose) {
        videoClose.addEventListener('click', function() {
            videoModal.classList.remove('active');
            // Удаляем iframe при закрытии
            const content = document.querySelector('.video-modal-content');
            if (content) {
                const iframe = content.querySelector('iframe');
                if (iframe) {
                    iframe.remove();
                }
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
            videoModal.classList.remove('active');
            const content = document.querySelector('.video-modal-content');
            if (content) {
                const iframe = content.querySelector('iframe');
                if (iframe) {
                    iframe.remove();
                }
            }
        }
    });
});