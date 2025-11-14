const phrases = [
    "New YouTube Video...",
    "TikTok Trend Idea...",
    "Instagram Caption...",
    "X Thread Start..."
];

function startTypewriter(element) {
    if (!element) return;
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const current = phrases[phraseIndex];
        if (isDeleting) {
            element.value = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.value = current.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === current.length) {
            setTimeout(() => {
                isDeleting = true;
                type();
            }, 2000);
            return;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }

        setTimeout(type, isDeleting ? 50 : 100);
    }

    setTimeout(type, 1000);
}

function initSpotlight(element) {
    if (!element) return;

    document.body.addEventListener('mousemove', (event) => {
        element.style.left = `${event.clientX}px`;
        element.style.top = `${event.clientY}px`;

        const target = event.target;
        if (target.closest('nav')) {
            element.style.opacity = 0;
        } else {
            element.style.opacity = 1;
        }

        element.style.background = 'radial-gradient(circle closest-side, rgba(255, 255, 255, 0.04), transparent 60%)';
    });

}

function initMobileMenu(button, menu) {
    if (!button || !menu) return;

    button.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        const isOpen = !menu.classList.contains('hidden');
        button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    startTypewriter(document.getElementById('heroInput'));
    initSpotlight(document.getElementById('global-spotlight'));
    initMobileMenu(
        document.getElementById('mobileMenuButton'),
        document.getElementById('mobileMenu')
    );
});
