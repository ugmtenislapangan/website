/* =============================================
   UKM Tenis Lapangan UGM — Main JS
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initMobileMenu();
    initScrollReveal();
    initCountUp();
    setActiveNav();
});

/* Navbar scroll effect */
function initNav() {
    const nav = document.querySelector('.site-nav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 40);
    });
}

/* Mobile hamburger */
function initMobileMenu() {
    const btn = document.querySelector('.hamburger');
    const menu = document.querySelector('.nav-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        btn.classList.toggle('open');
        menu.classList.toggle('open');
        document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });

    menu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            btn.classList.remove('open');
            menu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

/* Scroll reveal */
function initScrollReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => io.observe(el));
}

/* Count-up animation */
function initCountUp() {
    const nums = document.querySelectorAll('[data-count]');
    if (!nums.length) return;

    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const el = e.target;
                const target = parseInt(el.dataset.count);
                const suffix = el.dataset.suffix || '';
                countUp(el, target, suffix);
                io.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    nums.forEach(el => io.observe(el));
}

function countUp(el, target, suffix) {
    const duration = 1800;
    const start = performance.now();
    const from = 0;

    function step(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(from + (target - from) * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

/* Highlight active nav link by current page filename */
function setActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(a => {
        const href = a.getAttribute('href');
        if (href === path || (path === 'index.html' && href === 'index.html')) {
            a.classList.add('active');
        }
        /* Handle hash links on index */
        if (path === 'index.html' && href && href.startsWith('#')) {
            // handled by scroll
        }
    });
}
