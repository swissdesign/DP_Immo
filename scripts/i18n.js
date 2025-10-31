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

            if (translation !== undefined && translation !== null) {
                if (type === 'tags') {
                    element.innerHTML = translation.map(tag => `<span class="tag">${tag}</span>`).join('');
                } else {
                   element.innerHTML = translation;
                }
            }
        });
        
        // Populate dynamic lists that do NOT have static HTML placeholders
        populateList('.process-steps', 'process_steps', createProcessStep);
        populateList('.testimonials-wrapper', 'testimonials', createTestimonialCard);
        
        const pagePath = window.location.pathname;
        if (pagePath.includes('dominik-planzer.html')) {
            populateList('.timeline-list', 'person_a.timeline', createTimelineItem);
        }
        if (pagePath.includes('francoise-ellenberger.html')) {
            populateList('.timeline-list', 'person_b.timeline', createTimelineItem);
        }
    };

    /**
     * Retrieves a translation string from the translations object.
     * This function correctly handles nested keys with array indices, 
     * e.g., 'services[0].title'.
     */
    const getTranslation = (key) => {
        // Replace array notation [i] with dot notation .i and split
        return key.replace(/\[(\d+)\]/g, '.$1').split('.').reduce((obj, k) => {
            return obj && obj[k];
        }, translations);
    };
    
    const populateList = (selector, key, itemFactory) => {
        const container = document.querySelector(selector);
        if (!container) return;
        const items = getTranslation(key);
        if (Array.isArray(items)) {
            container.innerHTML = items.map(itemFactory).join('');
        }
    };

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
        if (!supportedLangs.includes(lang) || lang === currentLang) {
            return;
        }
        
        currentLang = lang;
        document.documentElement.lang = lang; // FIX: Ensure HTML lang attribute is updated
        localStorage.setItem('lang', lang);

        if(langSwitcher) {
            langSwitcher.querySelectorAll('button').forEach(button => {
                button.classList.remove('active');
                if (button.dataset.lang === lang) {
                    button.classList.add('active');
                }
            });
        }
        
        fetchTranslations(lang);
    };
    
    const initialize = () => {
        currentLang = getInitialLang();
        document.documentElement.lang = currentLang;

        if (langSwitcher) {
            langSwitcher.addEventListener('click', (e) => {
                const button = e.target.closest('button');
                if (button && button.dataset.lang) {
                    setLanguage(button.dataset.lang);
                }
            });
            
            langSwitcher.querySelectorAll('button').forEach(button => {
                button.classList.toggle('active', button.dataset.lang === currentLang);
            });
        }

        fetchTranslations(currentLang);
    };

    initialize();
});
