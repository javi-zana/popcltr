document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Scroll Reveal
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered reveal for grid items
                if (entry.target.classList.contains('mockup-grid')) {
                    const cards = entry.target.querySelectorAll('.mockup-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('revealed');
                        }, index * 80); // Scaled for high-tension 'flash'
                    });
                } else if (entry.target.id === 'formula') {
                    initBubbles();
                    entry.target.classList.add('revealed');
                } else {
                    entry.target.classList.add('revealed');
                }
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Observe sections and grids
    document.querySelectorAll('.section, .section-intro, .mockup-grid, .formula-section, .mockup-card, .unboxing-card').forEach(el => {
        revealObserver.observe(el);
    });

    // FAIL-SAFE: Near-instant fallback to ensure photos are NEVER invisible
    setTimeout(() => {
        document.querySelectorAll('.mockup-card, .section, .unboxing-card, .mockup-item').forEach((el) => {
            el.classList.add('revealed');
        });
    }, 100); 

    // 2. Smooth Scrolling for Navigation (hash links only)
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 3. Header Scroll Effect (Clean State Management)
    const mainHeader = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    });

    // 6. Entrance Sticker Dynamic Tilt
    document.querySelectorAll('.entrance-sticker, .nav-strategy').forEach(sticker => {
        sticker.addEventListener('mousemove', (e) => {
            const rect = sticker.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const tiltX = (y - centerY) / 10;
            const tiltY = (centerX - x) / 10;
            sticker.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05) rotate(-3deg)`;
        });
        
        sticker.addEventListener('mouseleave', () => {
            sticker.style.transform = `rotate(-3deg) scale(1)`;
        });
    });

    // 4. Bubble Generator for Formula Section
    function initBubbles() {
        const bubbleContainer = document.getElementById('bubbles-main');
        if (!bubbleContainer) return;
        
        for (let i = 0; i < 30; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            bubble.style.setProperty('--size', Math.random() * 40 + 10 + 'px');
            bubble.style.setProperty('--left', Math.random() * 100 + '%');
            bubble.style.setProperty('--duration', Math.random() * 5 + 5 + 's');
            bubble.style.animationDelay = Math.random() * 5 + 's';
            bubbleContainer.appendChild(bubble);
        }
    }

    // 5. Strategic Gauge Animations
    const gaugeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const gauge = entry.target;
                const targetValue = gauge.getAttribute('data-value');
                const color = gauge.getAttribute('data-color');
                gauge.style.background = `conic-gradient(${color} 0% ${targetValue}%, #f4f4f4 ${targetValue}% 100%)`;
                gauge.style.transition = 'background 1.5s ease-out';
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.gauge-viz').forEach(g => gaugeObserver.observe(g));

    console.log('POP CLTR Giga Brand Book v12.0 Full Suite Initialized');
});
