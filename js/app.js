/**
 * App Entry Point
 * Orchestrates Theme, I18n, and UI interactions.
 */
(function () {
    'use strict';

    function setupEventListeners() {
        // Language Toggle
        const langBtn = document.getElementById('langToggleBtn');
        if (langBtn) {
            langBtn.addEventListener('click', () => {
                I18n.toggleLang();
                UI.updateLanguage();
            });
        }

        // Theme Toggle (Light / Dark)
        const themeBtn = document.getElementById('themeToggleBtn');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => {
                Theme.toggleTheme();
            });
        }
    }

    // ── Bootstrap ──
    document.addEventListener('DOMContentLoaded', () => {
        Theme.init();
        I18n.init();
        setupEventListeners();
        UI.renderFeaturedProjects();
    });
})();
