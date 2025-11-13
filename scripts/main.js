const SCROLL_PATTERN_MARKUP = `
       <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="pattern-lines" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
               <line class="st0" x1="68.19" y1="16.12" x2="18.54" y2="65.77"/>
  <line class="st0" x1="75.64" y1="49.89" x2="61.42" y2="64.11"/>
  <line class="st0" x1="40.4" y1="13.77" x2="27.61" y2="26.57"/>
  <line class="st0" x1="61.5" y1="6.12" x2="-3.01" y2="70.63"/>
  <line class="st0" x1="49.96" y1="55.4" x2="45.14" y2="60.22"/>
  <line class="st0" x1="82.89" y1="34.46" x2="77.18" y2="40.17"/>
  <line class="st0" x1="107.23" y1="48.27" x2="71.55" y2="83.95"/>
  <line class="st0" x1="64.26" y1="81.44" x2="47.69" y2="98.01"/>
  <line class="st0" x1="38.5" y1="63.79" x2="23.07" y2="79.22"/>
  <line class="st0" x1="16.27" y1="26.16" x2="-3.29" y2="45.72"/>
  <line class="st0" x1="44.05" y1="-.97" x2="41.94" y2="1.13"/>
  <line class="st0" x1="61.5" y1="34.87" x2="39.59" y2="56.78"/>
  <line class="st0" x1="91.43" y1="18.55" x2="20.56" y2="89.42"/>
  <line class="st0" x1="58.14" y1="71.2" x2="50.89" y2="78.45"/>
  <line class="st0" x1="79.36" y1="54.92" x2="63.73" y2="70.55"/>
  <line class="st0" x1="102.37" y1="63.5" x2="50.73" y2="115.14"/>
  <line class="st0" x1="67.94" y1="3.81" x2="60.49" y2="11.26"/>
  <line class="st0" x1="56.08" y1=".69" x2="50.89" y2="5.87"/>
  <line class="st0" x1="35.14" y1="6.24" x2="18.17" y2="23.21"/>
  <line class="st0" x1="51.87" y1="-16.4" x2="-9.37" y2="44.83"/>
  <line class="st0" x1="16.71" y1="36.94" x2="66.36" y2="86.59"/>
  <line class="st0" x1="50.49" y1="29.49" x2="64.7" y2="43.71"/>
  <line class="st0" x1="14.36" y1="64.72" x2="27.16" y2="77.52"/>
  <line class="st0" x1="6.71" y1="43.63" x2="71.22" y2="108.14"/>
  <line class="st0" x1="56" y1="55.17" x2="60.82" y2="59.99"/>
  <line class="st0" x1="35.06" y1="22.24" x2="40.77" y2="27.95"/>
  <line class="st0" x1="48.87" y1="-2.1" x2="84.55" y2="33.58"/>
  <line class="st0" x1="82.04" y1="40.87" x2="98.6" y2="57.44"/>
  <line class="st0" x1="64.38" y1="66.63" x2="79.81" y2="82.06"/>
  <line class="st0" x1="26.76" y1="88.86" x2="46.32" y2="108.42"/>
  <line class="st0" x1="35.46" y1="43.63" x2="57.37" y2="65.53"/>
  <line class="st0" x1="19.14" y1="13.7" x2="90.02" y2="84.57"/>
  <line class="st0" x1="71.79" y1="46.99" x2="79.04" y2="54.24"/>
  <line class="st0" x1="55.51" y1="25.77" x2="71.14" y2="41.4"/>
  <line class="st0" x1="64.1" y1="2.76" x2="115.73" y2="54.4"/>
  <line class="st0" x1="4.4" y1="37.19" x2="11.85" y2="44.64"/>
  <line class="st0" x1="6.83" y1="69.99" x2="23.8" y2="86.96"/>
  <line class="st0" x1="-15.81" y1="53.26" x2="45.43" y2="114.5"/>
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
