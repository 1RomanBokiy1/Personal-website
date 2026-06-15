// Загрузка HTML-компонентов
async function loadComponent(selector, url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const html = await response.text();
        document.querySelector(selector).innerHTML = html;
    } catch (error) {
        console.error(`Ошибка загрузки ${url}:`, error);
    }
}

function highlightActiveLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === 'index.html' && href === 'index.html')) {
            link.style.color = '#ff3c1f';
            link.style.opacity = '1';
        }
    });
}

function initBurger() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    if (burger && nav) {
        // Удаляем старый обработчик, чтобы не дублировать
        const newBurger = burger.cloneNode(true);
        burger.parentNode.replaceChild(newBurger, burger);
        newBurger.addEventListener('click', () => {
            nav.classList.toggle('active');
            newBurger.classList.toggle('toggle');
        });
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadComponent('#header-placeholder', 'components/header.html');
    await loadComponent('#footer-placeholder', 'components/footer.html');
    highlightActiveLink();
    initBurger();
});