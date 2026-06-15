async function loadComponent(selector, url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const html = await response.text();
        document.querySelector(selector).innerHTML = html;
    } catch (error) {
        console.error(`Ошибка загрузки ${url}:`, error);
        document.querySelector(selector).innerHTML = '<div style="background:#111; padding:20px; text-align:center; color:#888;">[Component not loaded]</div>';
    }
}

function highlightActiveLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === 'index.html' && href === 'index.html')) {
            link.classList.add('active-link');
        } else {
            link.classList.remove('active-link');
        }
    });
}

function initBurger() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    if (burger && nav) {
        const newBurger = burger.cloneNode(true);
        burger.parentNode.replaceChild(newBurger, burger);
        newBurger.addEventListener('click', () => {
            nav.classList.toggle('active');
            newBurger.classList.toggle('toggle');
        });
    }
}

function createScrollTopButton() {
    if (document.getElementById('scrollTopBtn')) return;

    const btn = document.createElement('button');
    btn.id = 'scrollTopBtn';
    btn.innerHTML = '↑';
    btn.style.position = 'fixed';
    btn.style.bottom = '30px';
    btn.style.right = '30px';
    btn.style.width = '50px';
    btn.style.height = '50px';
    btn.style.borderRadius = '50%';
    btn.style.backgroundColor = '#ff3c1f';
    btn.style.color = '#fff';
    btn.style.border = 'none';
    btn.style.fontSize = '28px';
    btn.style.cursor = 'pointer';
    btn.style.zIndex = '1000';
    btn.style.display = 'none';
    btn.style.transition = '0.3s';
    btn.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    btn.onmouseenter = () => btn.style.transform = 'scale(1.1)';
    btn.onmouseleave = () => btn.style.transform = 'scale(1)';
    btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.style.display = 'flex';
            btn.style.alignItems = 'center';
            btn.style.justifyContent = 'center';
        } else {
            btn.style.display = 'none';
        }
    });
}

function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadComponent('#header-placeholder', 'components/header.html');
    await loadComponent('#footer-placeholder', 'components/footer.html');
    
    setTimeout(() => {
        highlightActiveLink();
        initBurger();
        initHeaderScroll();
        createScrollTopButton();
    }, 100);
});