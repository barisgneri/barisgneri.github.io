/**
 * Internationalization (i18n) Module
 * Handles multilingual support (EN default, TR toggle).
 */
const I18n = (function () {
    const STORAGE_KEY = 'portfolio_language';
    const DEFAULT_LANG = 'en';

    const translations = {
        en: {
            htmlLang: 'en',
            pageTitle: 'Barış Güneri — Android Developer Portfolio',
            profileTitle: 'Android Developer',
            profileBio: 'Mobile application developer passionate about Kotlin, Jetpack Compose, and modern Android architecture. Crafting scalable and intuitive apps with Clean Architecture, MVI, and Compose Multiplatform.',
            projectsTitle: 'Featured Projects',
            projectsBadge: 'Curated Works',
            viewAllGitHub: 'View all repositories on GitHub',
            viewOnPlayStore: 'View on Google Play',
            viewOnGitHub: 'View on GitHub',
            educationTitle: 'Education',
            education1Degree: 'Computer Programming',
            education1School: 'Selçuk University',
            education1Detail: 'Associate Degree in Computer Programming',
            education2Degree: 'Management Information Systems',
            education2School: 'Anadolu University',
            education2Detail: "Bachelor's Degree in Management Information Systems",
            education3Degree: 'Mobile Application Development with Flutter',
            education3School: 'Google Game & Application Academy',
            education3Detail: 'Entrepreneurship, Project Management, and Flutter Mobile Development Program',
            footerText: '© 2024 Barış Güneri · Deployed with GitHub Pages',
            langToggleLabel: 'TR',
            themeToggleAria: 'Toggle dark mode',
        },
        tr: {
            htmlLang: 'tr',
            pageTitle: 'Barış Güneri — Portfolyo',
            profileTitle: 'Android Developer',
            profileBio: 'Kotlin, Jetpack Compose ve modern Android mimarileri üzerine çalışan bir mobil uygulama geliştiricisi. Clean Architecture, MVI ve Compose Multiplatform ile ölçeklenebilir ve kullanıcı odaklı uygulamalar geliştiriyorum.',
            projectsTitle: 'Öne Çıkan Projeler',
            projectsBadge: 'Seçilmiş Projeler',
            viewAllGitHub: "Tüm repoları GitHub'da görüntüle",
            viewOnPlayStore: "Google Play Store'da İncele",
            viewOnGitHub: "GitHub'da Görüntüle",
            educationTitle: 'Eğitim',
            education1Degree: 'Bilgisayar Programcılığı',
            education1School: 'Selçuk Üniversitesi',
            education1Detail: 'Ön Lisans Derecesi',
            education2Degree: 'Yönetim Bilişim Sistemleri',
            education2School: 'Anadolu Üniversitesi',
            education2Detail: 'Lisans Derecesi',
            education3Degree: 'Flutter ile Mobil Uygulama Geliştirme',
            education3School: 'Google Oyun ve Uygulama Akademisi',
            education3Detail: 'Girişimcilik, Proje Yönetimi ve Flutter Mobil Geliştirme Programı',
            footerText: '© 2024 Barış Güneri · GitHub Pages ile yayınlandı',
            langToggleLabel: 'EN',
            themeToggleAria: 'Karanlık modu değiştir',
        }
    };

    let _currentLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;

    function getLang() {
        return _currentLang;
    }

    function t(key) {
        const dict = translations[_currentLang] || translations.en;
        return dict[key] || translations.en[key] || key;
    }

    function setLang(lang) {
        if (!translations[lang]) return;
        _currentLang = lang;
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch (e) {
            // Silently skip if storage not accessible
        }
        document.documentElement.lang = translations[lang].htmlLang;
        document.title = t('pageTitle');
        _applyDOMTranslations();
    }

    function toggleLang() {
        const next = _currentLang === 'en' ? 'tr' : 'en';
        setLang(next);
        return next;
    }

    function _applyDOMTranslations() {
        document.querySelectorAll('[data-i18n]').forEach((el) => {
            const key = el.getAttribute('data-i18n');
            const translation = t(key);
            if (translation) {
                el.textContent = translation;
            }
        });

        // Update elements that need innerHTML or specific attributes
        const langBtn = document.getElementById('langToggleBtn');
        if (langBtn) {
            const label = langBtn.querySelector('.lang-btn-label');
            if (label) {
                label.textContent = t('langToggleLabel');
            }
        }
    }

    function init() {
        setLang(_currentLang);
    }

    return Object.freeze({
        init,
        t,
        getLang,
        setLang,
        toggleLang,
    });
})();
