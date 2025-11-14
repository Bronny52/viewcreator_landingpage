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

function initSeamlessMarquee() {
    const marqueeContainer = document.querySelector('.animate-marquee');
    if (!marqueeContainer) return;

    // Remove CSS animation immediately
    marqueeContainer.style.animation = 'none';
    marqueeContainer.style.willChange = 'transform';
    
    // Wait for layout to render
    setTimeout(() => {
        // Clone items to create 4 full sets for smooth infinite scroll
        const originalItems = Array.from(marqueeContainer.children);
        const itemsPerSet = originalItems.length / 2; // Currently have 2 sets
        
        // Add 2 more sets (total of 4 sets)
        for (let i = 0; i < 2; i++) {
            originalItems.forEach(item => {
                const clone = item.cloneNode(true);
                clone.setAttribute('aria-hidden', 'true');
                marqueeContainer.appendChild(clone);
            });
        }
        
        // Get all items after cloning
        const allItems = Array.from(marqueeContainer.children);
        const oneSetItems = allItems.slice(0, itemsPerSet);
        
        // Calculate exact width of ONE set
        const firstRect = oneSetItems[0].getBoundingClientRect();
        const lastRect = oneSetItems[itemsPerSet - 1].getBoundingClientRect();
        const oneSetWidth = lastRect.right - firstRect.left + 96; // +96px for gap after last item
        
        let position = 0;
        const speed = 1.5;
        
        function animate() {
            position -= speed;
            
            // When we've scrolled past one full set, jump forward by one set width
            // We have 4 sets total, so jumping forward keeps 3 sets still visible
            if (position <= -oneSetWidth) {
                position += oneSetWidth;
            }
            
            marqueeContainer.style.transform = `translate3d(${position}px, 0, 0)`;
            requestAnimationFrame(animate);
        }
        
        animate();
    }, 100);
}

document.addEventListener('DOMContentLoaded', () => {
    startTypewriter(document.getElementById('heroInput'));
    initSpotlight(document.getElementById('global-spotlight'));
    initMobileMenu(
        document.getElementById('mobileMenuButton'),
        document.getElementById('mobileMenu')
    );
    initSeamlessMarquee();
});
