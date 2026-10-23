/**
 * Theme Manager Module
 * Handles Light/Dark mode switching with persistent user preference.
 * Default is 'light' (white theme).
 */
const Theme = (function () {
    const STORAGE_KEY = 'portfolio_theme';
    const DEFAULT_THEME = 'light';

    const ICONS = {
        sun: `<svg viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>`,
        moon: `<svg viewBox="0 0 24 24"><path d="M12.3 2a10 10 0 00-1.9 19.8 10 10 0 0011.5-11.5c-3.1.5-6.2-.6-8.2-2.6-2-2-3.1-5.1-2.6-8.2-.4.7-.6 1.6-.6 2.5z"/></svg>`,
    };

    let _currentTheme = localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;

    function getTheme() {
        return _currentTheme;
    }

    function setTheme(theme) {
        _currentTheme = theme === 'dark' ? 'dark' : 'light';
        try {
            localStorage.setItem(STORAGE_KEY, _currentTheme);
        } catch (e) {
            // Silently skip if storage not accessible
        }
        document.documentElement.setAttribute('data-theme', _currentTheme);
        _updateThemeIcon();
    }

    function toggleTheme() {
        const next = _currentTheme === 'light' ? 'dark' : 'light';
        setTheme(next);
        return next;
    }

    function _updateThemeIcon() {
        const iconWrapper = document.getElementById('themeToggleIcon');
        if (iconWrapper) {
            // If theme is dark, show sun to toggle back to light. If light, show moon.
            iconWrapper.innerHTML = _currentTheme === 'dark' ? ICONS.sun : ICONS.moon;
        }
    }

    function init() {
        setTheme(_currentTheme);
    }

    return Object.freeze({
        init,
        getTheme,
        setTheme,
        toggleTheme,
    });
})();
