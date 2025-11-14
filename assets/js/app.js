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
    initContactModal(
        document.getElementById('contactTrigger'),
        document.getElementById('contactModal')
    );
    initContactForm(document.getElementById('contactForm'));
});
const CONTACT_ENDPOINT = null;
function closeContactModal() {
    const modal = document.getElementById('contactModal');
    const trigger = document.getElementById('contactTrigger');
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    if (trigger) trigger.focus();
}
function showContactToast() {
    const toast = document.getElementById('contactToast');
    if (!toast) return;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 4000);
}

function initContactModal(trigger, modal) {
    if (!trigger || !modal) return;
    const overlay = modal.querySelector('.absolute');
    const closeBtn = document.getElementById('contactClose');
    const cancelBtn = document.getElementById('contactCancel');
    let lastFocused = null;

    function getFocusable() {
        return Array.from(modal.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])')).filter(el => !el.disabled && el.offsetParent !== null);
    }

    function open() {
        lastFocused = document.activeElement;
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
        trigger.setAttribute('aria-expanded', 'true');
        const first = document.getElementById('contactName');
        if (first) first.focus();
        document.addEventListener('keydown', onKeyDown);
    }

    function close() {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
        trigger.setAttribute('aria-expanded', 'false');
        document.removeEventListener('keydown', onKeyDown);
        if (lastFocused) lastFocused.focus();
    }

    function onKeyDown(e) {
        if (e.key === 'Escape') {
            e.preventDefault();
            close();
            return;
        }
        if (e.key === 'Tab') {
            const focusable = getFocusable();
            if (!focusable.length) return;
            const index = focusable.indexOf(document.activeElement);
            if (e.shiftKey) {
                if (index <= 0) {
                    e.preventDefault();
                    focusable[focusable.length - 1].focus();
                }
            } else {
                if (index === focusable.length - 1) {
                    e.preventDefault();
                    focusable[0].focus();
                }
            }
        }
    }

    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        open();
    });
    if (overlay) overlay.addEventListener('click', close);
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (cancelBtn) cancelBtn.addEventListener('click', close);
}

function initContactForm(form) {
    if (!form) return;
    const nameEl = document.getElementById('contactName');
    const emailEl = document.getElementById('contactEmail');
    const messageEl = document.getElementById('contactMessage');
    const honeypotEl = document.getElementById('contactWebsite');
    const submitBtn = document.getElementById('contactSubmit');
    const errorsEl = document.getElementById('contactErrors');
    const statusEl = document.getElementById('contactStatus');

    function setErrors(msg) {
        if (!errorsEl) return;
        if (msg) {
            errorsEl.textContent = msg;
            errorsEl.classList.remove('hidden');
        } else {
            errorsEl.textContent = '';
            errorsEl.classList.add('hidden');
        }
    }

    function setStatus(msg) {
        if (!statusEl) return;
        statusEl.textContent = msg || '';
        if (msg) statusEl.classList.remove('hidden'); else statusEl.classList.add('hidden');
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = (nameEl?.value || '').trim();
        const email = (emailEl?.value || '').trim();
        const message = (messageEl?.value || '').trim();
        const honeypot = (honeypotEl?.value || '').trim();

        if (honeypot) return;

        if (name.length < 2) {
            setErrors('Please enter your name.');
            return;
        }
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
            setErrors('Please enter a valid email.');
            return;
        }
        if (message.length < 10) {
            setErrors('Please enter a longer message.');
            return;
        }

        setErrors('');
        submitBtn?.setAttribute('disabled', 'true');
        const originalText = submitBtn?.textContent || '';
        if (submitBtn) submitBtn.textContent = 'Sending…';

        try {
            if (CONTACT_ENDPOINT) {
                const controller = new AbortController();
                const t = setTimeout(() => controller.abort(), 10000);
                const res = await fetch(CONTACT_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, message }),
                    signal: controller.signal
                });
                clearTimeout(t);
                if (!res.ok) throw new Error('Request failed');
            } else {
                await new Promise(r => setTimeout(r, 800));
            }
            setStatus('Sent successfully.');
            form.reset();
            closeContactModal();
            showContactToast();
        } catch {
            setErrors('Something went wrong. Please try again.');
        } finally {
            if (submitBtn) submitBtn.textContent = originalText;
            submitBtn?.removeAttribute('disabled');
        }
    });
}
