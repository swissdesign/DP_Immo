document.addEventListener('DOMContentLoaded', () => {

    // --- PWA Service Worker Registration ---
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(registration => {
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

            // Optional: Close other accordions
            // const parentAccordion = header.closest('.accordion');
            // parentAccordion.querySelectorAll('.accordion-item').forEach(otherItem => {
            //     if (otherItem !== item) {
            //         otherItem.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
            //     }
            // });

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
        fetch('/assets/logo.svg')
            .then(response => response.text())
            .then(svgData => {
                logoWrapper.innerHTML = svgData;
            });
    } else if (logoWrapper) {
        // Fallback to static logo if reduced motion is on
        logoWrapper.innerHTML = `<img src="/assets/logo-static.svg" alt="Wertwerk Logo" style="width:100px; height:100px;">`;
    }

});
