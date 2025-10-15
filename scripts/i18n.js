document.addEventListener('DOMContentLoaded', () => {
    const supportedLangs = ['de', 'en'];
    let currentLang = 'de';
    let translations = {};

    const langSwitcher = document.querySelector('.lang-switcher');

    const getInitialLang = () => {
        const storedLang = localStorage.getItem('lang');
        if (storedLang && supportedLangs.includes(storedLang)) {
            return storedLang;
        }
        const browserLang = navigator.language.split('-')[0];
        if (supportedLangs.includes(browserLang)) {
            return browserLang;
        }
        return 'de'; // Default language
    };

    const fetchTranslations = async (lang) => {
        try {
            const response = await fetch(`content/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Could not load ${lang}.json`);
            }
            translations = await response.json();
            translatePage();
        } catch (error) {
            console.error('Error fetching translation file:', error);
        }
    };

    const translatePage = () => {
        document.querySelectorAll('[data-i18n-key]').forEach(element => {
            const key = element.getAttribute('data-i18n-key');
            const type = element.getAttribute('data-i18n-type');
            const translation = getTranslation(key);

            if (translation) {
                if (type === 'tags') {
                    element.innerHTML = translation.map(tag => `<span>${tag}</span>`).join('');
                } else {
                   element.innerHTML = translation;
                }
            }
        });
        
        // Populate dynamic lists
        populateList('.services .accordion', 'services', createAccordionItem);
        populateList('.process-steps', 'process_steps', createProcessStep);
        populateList('.testimonials-wrapper', 'testimonials', createTestimonialCard);
        populateList('.faq-accordion', 'faq', createAccordionItem);
        
        const pagePath = window.location.pathname;
        // Support both original and renamed profile pages
        if (pagePath.includes('person-a.html') || pagePath.includes('dominik-planzer.html')) {
            populateList('.timeline-list', 'person_a.timeline', createTimelineItem);
        }
        if (pagePath.includes('person-b.html') || pagePath.includes('francoise-ellenberger.html')) {
            populateList('.timeline-list', 'person_b.timeline', createTimelineItem);
        }
    };

    const getTranslation = (key) => {
        return key.split('.').reduce((obj, k) => obj && obj[k], translations);
    };
    
    const populateList = (selector, key, itemFactory) => {
        const container = document.querySelector(selector);
        if (!container) return;
        const items = getTranslation(key);
        if (Array.isArray(items)) {
            container.innerHTML = items.map(itemFactory).join('');
        }
    };

    const createAccordionItem = (item) => `
        <div class="accordion-item">
            <button class="accordion-header" aria-expanded="false" aria-controls="accordion-content-${item.id}" id="accordion-header-${item.id}">
                ${item.title}
            </button>
            <div class="accordion-content" role="region" aria-labelledby="accordion-header-${item.id}" id="accordion-content-${item.id}">
                <div class="accordion-content-inner">
                    <p>${item.description}</p>
                </div>
            </div>
        </div>
    `;

    const createProcessStep = (item) => `
        <li class="process-step">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        </li>
    `;
    
    const createTestimonialCard = (item) => `
        <div class="testimonial-card">
            <blockquote>“${item.quote}”</blockquote>
            <footer>— ${item.author}</footer>
        </div>
    `;

    const createTimelineItem = (item) => `
        <li class="timeline-item">
            <div class="timeline-date">${item.date}</div>
            <div class="timeline-title">${item.title}</div>
            <div class="timeline-desc">${item.description}</div>
        </li>
    `;

    const setLanguage = (lang) => {
        if (!supportedLangs.includes(lang)) return;
        currentLang = lang;
        document.documentElement.lang = lang;
        localStorage.setItem('lang', lang);

        langSwitcher.querySelectorAll('button').forEach(button => {
            button.classList.toggle('active', button.dataset.lang === lang);
        });

        fetchTranslations(lang);
    };

    langSwitcher.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const lang = e.target.dataset.lang;
            if (lang !== currentLang) {
                setLanguage(lang);
            }
        }
    });

    // Initial load
    setLanguage(getInitialLang());
});
