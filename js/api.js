/**
 * GitHub API Service
 * Handles all GitHub API communication with caching and error handling.
 */
const GitHubAPI = (function () {

    // ── Cache helpers ──

    /**
     * Read from sessionStorage cache if still valid.
     * @param {string} key
     * @returns {any|null}
     */
    function _readCache(key) {
        try {
            const raw = sessionStorage.getItem(key);
            if (!raw) return null;

            const { data, timestamp } = JSON.parse(raw);
            const isExpired = Date.now() - timestamp > CONFIG.cache.ttlMs;

            return isExpired ? null : data;
        } catch {
            return null;
        }
    }

    /**
     * Write to sessionStorage cache.
     * @param {string} key
     * @param {any}    data
     */
    function _writeCache(key, data) {
        try {
            sessionStorage.setItem(key, JSON.stringify({
                data,
                timestamp: Date.now(),
            }));
        } catch {
            // Storage full or unavailable — silently skip
        }
    }

    // ── HTTP helper ──

    /**
     * Generic fetch wrapper with error handling.
     * @param {string} endpoint  Relative path (e.g. "/users/barisgneri")
     * @returns {Promise<any>}
     */
    async function _request(endpoint) {
        const url = `${CONFIG.github.apiBase}${endpoint}`;
        const response = await fetch(url);

        if (!response.ok) {
            const isRateLimit = response.status === 403 || response.status === 429;
            const message = isRateLimit
                ? 'GitHub API rate limit aşıldı. Lütfen birkaç dakika sonra tekrar deneyin.'
                : `GitHub API hatası: ${response.status}`;
            throw new Error(message);
        }

        return response.json();
    }

    // ── Public methods ──

    /**
     * Fetch the user profile.
     * @returns {Promise<Object>}
     */
    async function fetchProfile() {
        const cached = _readCache(CONFIG.cache.keys.profile);
        if (cached) return cached;

        const data = await _request(`/users/${CONFIG.github.username}`);
        _writeCache(CONFIG.cache.keys.profile, data);
        return data;
    }

    /**
     * Fetch public repositories, filtered and sorted.
     * @returns {Promise<Object[]>}
     */
    async function fetchRepos() {
        const cached = _readCache(CONFIG.cache.keys.repos);
        if (cached) return cached;

        const { username, perPage, sortBy } = CONFIG.github;
        const endpoint = `/users/${username}/repos?per_page=${perPage}&sort=${sortBy}&type=public`;
        const repos = await _request(endpoint);

        const filtered = repos.filter((repo) => {
            if (CONFIG.excludedRepos.includes(repo.name)) return false;
            if (CONFIG.hideForks && repo.fork) return false;
            return true;
        });

        _writeCache(CONFIG.cache.keys.repos, filtered);
        return filtered;
    }

    return Object.freeze({ fetchProfile, fetchRepos });
})();
