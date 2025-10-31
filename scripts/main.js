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

            const currentItem = header.parentElement;
            const isExpanded = header.getAttribute('aria-expanded') === 'true';

            // Close all items in this accordion
            accordion.querySelectorAll('.accordion-item').forEach(item => {
                item.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
            });

            // If the clicked item was not already open, open it.
            if (!isExpanded) {
                header.setAttribute('aria-expanded', 'true');
            }
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
            threshold: 0.15 // Trigger animation slightly earlier
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

    // --- Project Gallery Lightbox ---
    const projectGalleryImages = document.querySelectorAll('.project-page .gallery img');
    if (projectGalleryImages.length) {
        projectGalleryImages.forEach(img => {
            img.addEventListener('click', () => {
                const overlay = document.createElement('div');
                overlay.className = 'lightbox-overlay';

                const figure = document.createElement('figure');
                const largeImage = document.createElement('img');
                largeImage.src = img.currentSrc || img.src;
                largeImage.alt = img.alt;
                figure.appendChild(largeImage);
                overlay.appendChild(figure);

                const handleKey = (event) => {
                    if (event.key === 'Escape') {
                        closeOverlay();
                    }
                };

                const closeOverlay = () => {
                    overlay.remove();
                    document.removeEventListener('keydown', handleKey);
                };

                overlay.addEventListener('click', closeOverlay);
                document.addEventListener('keydown', handleKey);

                document.body.appendChild(overlay);
            });
        });
    }

    // --- Animated Logo Injection ---
    const logoWrapper = document.querySelector('.logo-animated-wrapper');
    if (logoWrapper) {
        fetch('assets/logo.svg')
            .then(response => response.text())
            .then(svgData => {
                logoWrapper.innerHTML = svgData;
                const svgElement = logoWrapper.querySelector('svg');
                if (svgElement) {
                    const logoGroup = svgElement.querySelector('#logo');
                    const textGroup = svgElement.querySelector('#text');
                    if (logoGroup) {
                        logoGroup.style.animationDuration = '1.4s';
                        logoGroup.style.animationDelay = '0.2s';
                    }
                    if (textGroup) {
                        textGroup.style.animationDuration = '1.4s';
                        textGroup.style.animationDelay = '0.6s';
                    }
                }
            })
            .catch(() => {
                logoWrapper.innerHTML = `<img src="assets/logo-static.svg" alt="Immobilien Schätzung + Beratung Logo">`;
            });
    }

    // --- Dynamic Scroll Effects ---
    if (!prefersReducedMotion) {
        const root = document.documentElement;
        const heroSection = document.getElementById('hero');
        const baseColour = { r: 247, g: 244, b: 239 }; // #F7F4EF
        const targetColour = { r: 237, g: 232, b: 226 }; // #EDE8E2

        function updateScrollEffects() {
            const scrollY = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const ratio = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;
            
            const r = Math.round(baseColour.r + (targetColour.r - baseColour.r) * ratio);
            const g = Math.round(baseColour.g + (targetColour.g - baseColour.g) * ratio);
            const b = Math.round(baseColour.b + (targetColour.b - baseColour.b) * ratio);
            root.style.setProperty('--gradient-scroll', `rgb(${r}, ${g}, ${b})`);

            if (heroSection) {
                const offset = scrollY * 0.1;
                heroSection.style.backgroundPosition = `center calc(50% + ${offset}px)`;
            }
        }

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
        updateScrollEffects();
    }

    // --- Contact detail reveal (email & phone) ---
    const insertZeroWidthJoiner = (value) => value.split('').join('\u200B');

    const initContactReveal = () => {
        const emailButton = document.getElementById('reveal-mail');
        const emailOutput = document.getElementById('mail-out');
        if (emailButton && emailOutput) {
            const emailAddress = `${['immobilien', 'schaetzung', 'beratung'].join('.')}@${['g', 'mail'].join('')}.com`;
            emailButton.addEventListener('click', () => {
                emailButton.setAttribute('aria-expanded', 'true');
                emailOutput.className = '';
                emailOutput.removeAttribute('aria-hidden');
                emailOutput.innerHTML = `<a rel="nofollow" href="mailto:${emailAddress}">${insertZeroWidthJoiner(emailAddress)}</a>`;
                emailButton.remove();
            });
        }

        const phoneButton = document.getElementById('reveal-phone');
        const phoneOutput = document.getElementById('phone-out');
        if (phoneButton && phoneOutput) {
            const primary = '+41 41 878 13 13';
            const secondary = '+41 79 727 30 94';
            phoneButton.addEventListener('click', () => {
                phoneButton.setAttribute('aria-expanded', 'true');
                phoneOutput.className = '';
                phoneOutput.removeAttribute('aria-hidden');
                phoneOutput.innerHTML = '';

                const first = document.createElement('a');
                first.href = 'tel:+41418781313';
                first.textContent = primary;

                const second = document.createElement('a');
                second.href = 'tel:+41797273094';
                second.textContent = secondary;

                phoneOutput.append(first, document.createTextNode(' / '), second);
                phoneButton.remove();
            });
        }
    };

    // --- Contact form safeguards (honeypot, timing, math check) ---
    const contactMessages = {
        de: {
            honeypot: 'Hinweis: Bitte Formular korrekt ausfüllen.',
            speed: 'Bitte prüfe deine Eingaben und sende erneut.',
            service: 'Bitte wähle ein Anliegen aus.',
            human: 'Bitte gib die korrekte Summe ein.'
        },
        en: {
            honeypot: 'Please complete the form correctly before sending.',
            speed: 'Please review your details and submit again.',
            service: 'Please choose a request from the list.',
            human: 'Please enter the correct sum.'
        }
    };

    const initContactForms = () => {
        const locale = document.documentElement.lang || 'de';
        const copy = contactMessages[locale] || contactMessages.de;

        document.querySelectorAll('.contact-form').forEach(form => {
            const start = Date.now();
            const note = form.querySelector('#form-note');
            if (note) {
                note.textContent = '';
            }

            const startField = form.querySelector('input[name="startedAt"]');
            if (startField) {
                startField.value = String(start);
            }

            form.addEventListener('submit', (event) => {
                const setNote = (message) => {
                    if (note) {
                        note.textContent = message;
                    }
                };

                const honeypot = form.querySelector('input[name="company"]');
                if (honeypot && honeypot.value.trim() !== '') {
                    event.preventDefault();
                    setNote(copy.honeypot);
                    return;
                }

                if (Date.now() - start < 5000) {
                    event.preventDefault();
                    setNote(copy.speed);
                    return;
                }

                const service = form.querySelector('[name="service"]');
                if (service && !service.value) {
                    event.preventDefault();
                    setNote(copy.service);
                    return;
                }

                const human = form.querySelector('[name="human"]');
                if (human && String(human.value).trim() !== '7') {
                    event.preventDefault();
                    setNote(copy.human);
                }
            });
        });
    };

    initContactReveal();
    initContactForms();
});
