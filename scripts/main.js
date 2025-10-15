document.addEventListener('DOMContentLoaded', () => {

    // --- PWA Service Worker Registration ---
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js').then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, err => {
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }

    // --- Dynamic Year in Footer ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Mobile Navigation Toggle ---
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const body = document.body;
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            body.classList.toggle('nav-open');
            const isExpanded = body.classList.contains('nav-open');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
        // Close nav when a link is clicked
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', () => {
                body.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // --- Accordion Logic ---
    const accordions = document.querySelectorAll('.accordion');
    accordions.forEach(accordion => {
        accordion.addEventListener('click', (e) => {
            const header = e.target.closest('.accordion-header');
            if (!header) return;

            const item = header.parentElement;
            const content = header.nextElementSibling;
            const isExpanded = header.getAttribute('aria-expanded') === 'true';

            // Close other accordion items within the same group when one is toggled.
            const parentAccordion = header.closest('.accordion');
            parentAccordion.querySelectorAll('.accordion-item').forEach(otherItem => {
                const otherHeader = otherItem.querySelector('.accordion-header');
                if (otherItem !== item) {
                    otherHeader.setAttribute('aria-expanded', 'false');
                }
            });
            // Toggle the clicked item
            header.setAttribute('aria-expanded', !isExpanded);
        });
    });

    // --- Intersection Observer for animations ---
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    if (!prefersReducedMotion) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        revealElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // If reduced motion is preferred, just make them visible
        revealElements.forEach(el => {
            el.classList.add('is-visible');
        });
    }

    // --- Animated Logo Injection ---
    const logoWrapper = document.querySelector('.logo-animated-wrapper');
    if (logoWrapper && !prefersReducedMotion) {
        fetch('assets/logo.svg')
            .then(response => response.text())
            .then(svgData => {
                logoWrapper.innerHTML = svgData;
            });
    } else if (logoWrapper) {
        // Fallback to static logo if reduced motion is on
        logoWrapper.innerHTML = `<img src="assets/logo-static.svg" alt="Wertwerk Logo" style="width:100px; height:100px;">`;
    }

    // --- Dynamic Scroll Effects ---
    // Subtle page background gradient and hero parallax
    // Only run when motion is allowed
    if (!prefersReducedMotion) {
        const root = document.documentElement;
        const heroSection = document.getElementById('hero');
        // Base and target colours for the scroll gradient in RGB
        // Update gradient colours to align with the warmer palette.  #F7F4EF is
        // the new base (rgb(247,244,239)) and #EDE8E2 (rgb(237,232,226)) is the
        // slightly darker target as the user scrolls.
        const baseColour = { r: 247, g: 244, b: 239 }; // #F7F4EF
        const targetColour = { r: 237, g: 232, b: 226 }; // #EDE8E2

        function updateScrollEffects() {
            const scrollY = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const ratio = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;
            // Interpolate each channel
            const r = Math.round(baseColour.r + (targetColour.r - baseColour.r) * ratio);
            const g = Math.round(baseColour.g + (targetColour.g - baseColour.g) * ratio);
            const b = Math.round(baseColour.b + (targetColour.b - baseColour.b) * ratio);
            root.style.setProperty('--gradient-scroll', `rgb(${r}, ${g}, ${b})`);
            // Parallax effect for hero background
            if (heroSection) {
                // Move background image slightly slower than scroll to create depth
                const offset = scrollY * 0.1;
                heroSection.style.backgroundPosition = `center calc(50% + ${offset}px)`;
            }
        }
        // Throttle updates using requestAnimationFrame
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateScrollEffects();
                    ticking = false;
                });
                ticking = true;
            }
        });
        // Initial call
        updateScrollEffects();
    }

});
