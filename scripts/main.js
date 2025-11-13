// MODIFIED: Added 6 new paths to the pattern for a much denser, more random line effect.
const SCROLL_PATTERN_MARKUP = `
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="pattern-lines" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <!-- Original 6 Paths -->
         <!-- Group 1: (10, 30) -> (30, 10) [-45 deg] -->
      <path d="M10 30 L30 10 M110 30 L130 10 M-90 30 L-70 10 M10 130 L30 110 M10 -70 L30 -90 M110 130 L130 110 M110 -70 L130 -90 M-90 130 L-70 110 M-90 -70 L-70 -90" />
      <!-- Group 2: (10, 80) -> (40, 50) [-45 deg] -->
      <path d="M10 80 L40 50 M110 80 L140 50 M-90 80 L-60 50 M10 180 L40 150 M10 -20 L40 -50 M110 180 L140 150 M110 -20 L140 -50 M-90 180 L-60 150 M-90 -20 L-60 -50" />
      <!-- Group 3: (50, 90) -> (90, 50) [-45 deg] -->
      <path d="M50 90 L90 50 M150 90 L190 50 M-50 90 L-10 50 M50 190 L90 150 M50 -10 L90 -50 M150 190 L190 150 M150 -10 L190 -50 M-50 190 L-10 150 M-50 -10 L-10 -50" />
      <!-- Group 4: (5, 5) -> (15, -5) [-45 deg] -->
      <path d="M5 5 L15 -5 M105 5 L115 -5 M-95 5 L-85 -5 M5 105 L15 95 M5 -95 L15 -105 M105 105 L115 95 M105 -95 L115 -105 M-95 105 L-85 95 M-95 -95 L-85 -105" />
      <!-- Group 5: (80, 25) -> (100, 5) [-45 deg] -->
      <path d="M80 25 L100 5 M180 25 L200 5 M-20 25 L0 5 M80 125 L100 105 M80 -75 L100 -95 M180 125 L200 105 M180 -75 L200 -95 M-20 125 L0 105 M-20 -75 L0 -95" />
      <!-- Group 6: (90, 90) -> (120, 60) [-45 deg] -->
      <path d="M90 90 L120 60 M190 90 L220 60 M-10 90 L20 60 M90 190 L120 160 M90 -10 L120 -40 M190 190 L220 160 M190 -10 L220 -40 M-10 190 L20 160 M-10 -10 L20 -40" />
      
      <!-- Group 7: (10, 10) -> (30, 30) [+45 deg] -->
      <path d="M10 10 L30 30 M110 10 L130 30 M-90 10 L-70 30 M10 110 L30 130 M10 -90 L30 -70 M110 110 L130 130 M110 -90 L130 -70 M-90 110 L-70 130 M-90 -90 L-70 -70" />
      <!-- Group 8: (60, 10) -> (90, 40) [+45 deg] -->
      <path d="M60 10 L90 40 M160 10 L190 40 M-40 10 L-10 40 M60 110 L90 140 M60 -90 L90 -60 M160 110 L190 140 M160 -90 L190 -60 M-40 110 L-10 140 M-40 -90 L-10 -60" />
      <!-- Group 9: (10, 50) -> (50, 90) [+45 deg] -->
      <path d="M10 50 L50 90 M110 50 L150 90 M-90 50 L-50 90 M10 150 L50 190 M10 -50 L50 -10 M110 150 L150 190 M110 -50 L150 -10 M-90 150 L-50 190 M-90 -50 L-50 -10" />
      <!-- Group 10: (5, 95) -> (15, 105) [+45 deg] -->
      <path d="M5 95 L15 105 M105 95 L115 105 M-95 95 L-85 105 M5 195 L15 205 M5 -5 L15 5 M105 195 L115 205 M105 -5 L115 5 M-95 195 L-85 205 M-95 -5 L-85 5" />
      <!-- Group 11: (80, 70) -> (100, 90) [+45 deg] -->
      <path d="M80 70 L100 90 M180 70 L200 90 M-20 70 L0 90 M80 170 L100 190 M80 -30 L100 -10 M180 170 L200 190 M180 -30 L200 -10 M-20 170 L0 190 M-20 -30 L0 -10" />
      <!-- Group 12: (80, 80) -> (110, 110) [+45 deg] -->
      <path d="M80 80 L110 110 M180 80 L210 110 M-20 80 L10 110 M80 180 L110 210 M80 -20 L110 10 M180 180 L210 210 M180 -20 L210 10 M-20 180 L10 210 M-20 -20 L10 10" />
      
      <!-- Adding a few more for good measure -->
      <!-- Group 13: (30, 60) -> (40, 50) [-45 deg] -->
      <path d="M30 60 L40 50 M130 60 L140 50 M-70 60 L-60 50 M30 160 L40 150 M30 -40 L40 -50 M130 160 L140 150 M130 -40 L140 -50 M-70 160 L-60 150 M-70 -40 L-60 -50" />
      <!-- Group 14: (60, 60) -> (80, 80) [+45 deg] -->
      <path d="M60 60 L80 80 M160 60 L180 80 M-40 60 L-20 80 M60 160 L80 180 M60 -40 L80 -20 M160 160 L180 180 M160 -40 L180 -20 M-40 160 L-20 180 M-40 -40 L-20 -20" />
      <!-- Group 15: (5, 50) -> (25, 30) [-45 deg] -->
      <path d="M5 50 L25 30 M105 50 L125 30 M-95 50 L-75 30 M5 150 L25 130 M5 -50 L25 -70 M105 150 L125 130 M105 -50 L125 -70 M-95 150 L-75 130 M-95 -50 L-75 -70" />

            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-lines)" />
        </svg>
`.trim();

let scrollPatternPaths = [];
let lastScrollRatio = 0;

function initScrollPattern(prefersReducedMotion) {
    if (prefersReducedMotion) return;

    const DASH_RATIO = 0.4;
    const GAP_RATIO = 0.9;
    const PHASE_OFFSET_MULTIPLIER = 0.15;

    let svg = document.querySelector('.scroll-pattern-wrapper svg');

    if (!svg) {
        const wrapper = document.createElement('div');
        wrapper.className = 'scroll-pattern-wrapper';
        wrapper.innerHTML = SCROLL_PATTERN_MARKUP;

        document.body.insertBefore(wrapper, document.body.firstChild);
        svg = wrapper.querySelector('svg');
    }

    if (!svg) return;

    const paths = svg.querySelectorAll('path');
    scrollPatternPaths = Array.from(paths).map((path, index) => {
        const length = path.getTotalLength();
        const dash = length * DASH_RATIO;
        const gap = length * GAP_RATIO;

        path.style.fill = 'none';
        path.style.strokeDasharray = `${dash} ${gap}`;
        path.style.strokeDashoffset = length;

        const phaseOffset = (index * PHASE_OFFSET_MULTIPLIER) % 1;
        const direction = Math.random() < 0.5 ? 1 : -1;

        return { path, length, phaseOffset, direction };
    });

    updateScrollPattern(lastScrollRatio);
}

function updateScrollPattern(ratio) {
    if (!scrollPatternPaths.length) return;

    const eased = ratio < 0.5
        ? 2 * ratio * ratio
        : 1 - Math.pow(-2 * ratio + 2, 2) / 2;

    scrollPatternPaths.forEach(({ path, length, phaseOffset, direction }) => {
        let phase = phaseOffset + direction * eased;
        phase %= 1;
        if (phase < 0) phase += 1;

        const offset = length * (1 - phase);
        path.style.strokeDashoffset = offset;
    });
}

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

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- Intersection Observer for animations ---
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    // --- Scroll Pattern Background ---
    initScrollPattern(prefersReducedMotion);

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
        // MODIFIED: Changed path to fetch your new logo
        fetch('assets/ISB_Logoanimated_PHD.svg')
            .then(response => response.text())
            .then(svgData => {
                logoWrapper.innerHTML = svgData;
                const svgElement = logoWrapper.querySelector('svg');
                if (svgElement) {
                    // This code finds the groups by ID and applies the animation timings
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
                // Fallback if the new logo fails to load
                logoWrapper.innerHTML = `<img src="assets/logo-static.svg" alt="Immobilien Schätzung + Beratung Logo">`;
            });
    }

    // --- Dynamic Scroll Effects ---
    if (!prefersReducedMotion) {
        const root = document.documentElement;
        const heroSection = document.getElementById('hero');
        const baseColour = { r: 247, g: 244, b: 239 }; // #F7F4EF
        const targetColour = { r: 237, g: 232, b: 226 }; // #EDE8E2

        initScrollPattern(false);

        function updateScrollEffects() {
            const scrollY = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const ratio = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;

            lastScrollRatio = ratio;

            const r = Math.round(baseColour.r + (targetColour.r - baseColour.r) * ratio);
            const g = Math.round(baseColour.g + (targetColour.g - baseColour.g) * ratio);
            const b = Math.round(baseColour.b + (targetColour.b - baseColour.b) * ratio);
            root.style.setProperty('--gradient-scroll', `rgb(${r}, ${g}, ${b})`);

            if (heroSection) {
                const offset = scrollY * 0.1;
                heroSection.style.backgroundPosition = `center calc(50% + ${offset}px)`;
            }

            // Animate the SVG line pattern in sync with the scroll ratio
            updateScrollPattern(ratio);
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
