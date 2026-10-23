/**
 * UI Renderer
 * Renders Featured Projects and manages DOM interactions.
 */
const UI = (function () {

    // ── DOM references ──
    const dom = {
        projectsContainer: () => document.getElementById('projectsContainer'),
    };

    // ── SVG Icons ──
    const ICONS = {
        playStore: `<svg viewBox="0 0 24 24"><path d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 01-.61-1.637V3.451c0-.624.23-1.198.61-1.637zm11.24 11.24l2.128 2.128-11.83 6.822 9.702-8.95zm0-2.108L5.147 2.004l11.83 6.822-2.128 2.12zM18.17 10.6l3.327 1.92a.965.965 0 010 1.674l-3.327 1.92-2.31-2.31 2.31-2.198z"/></svg>`,
        gitHub: `<svg viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>`,
        arrowExternal: `<svg viewBox="0 0 16 16"><path d="M3.75 2h3.5a.75.75 0 010 1.5H4.56l7.72 7.72a.75.75 0 11-1.06 1.06L3.5 4.56v2.69a.75.75 0 01-1.5 0v-3.5A1.75 1.75 0 013.75 2z"/></svg>`,
    };

    // ── Helpers ──

    function _escapeHtml(text) {
        const el = document.createElement('div');
        el.textContent = text;
        return el.innerHTML;
    }

    function _getLanguageColor(language) {
        if (!language) return '#86868b';
        return CONFIG.languageColors[language] || '#86868b';
    }

    // ── Project Card Component ──

    function _createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.animationDelay = `${index * 0.08}s`;
        card.style.cursor = 'pointer';

        // Clicking card navigates to primary link (Play Store if available, else GitHub)
        const primaryUrl = project.playStoreUrl || project.githubUrl;
        card.addEventListener('click', (e) => {
            if (e.target.closest('a')) return;
            window.open(primaryUrl, '_blank', 'noopener,noreferrer');
        });

        const currentLang = I18n.getLang();
        const description = (project.description && project.description[currentLang])
            ? project.description[currentLang]
            : (project.description.en || '');

        const tagsHtml = (project.tags || [])
            .map(t => `<span class="project-pill">${_escapeHtml(t)}</span>`)
            .join('');

        card.innerHTML = `
            <div class="project-header">
                <div class="project-title-wrapper">
                    <span class="project-name">${_escapeHtml(project.name)}</span>
                    ${project.badge ? `<span class="project-badge ${project.playStoreUrl ? 'project-badge--play' : ''}">${_escapeHtml(project.badge)}</span>` : ''}
                </div>
                <div class="project-actions">
                    ${project.playStoreUrl ? `
                        <a href="${project.playStoreUrl}"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="project-action-link project-action-link--play"
                           title="${I18n.t('viewOnPlayStore')}"
                           onclick="event.stopPropagation()">
                            ${ICONS.playStore}
                        </a>
                    ` : ''}
                    <a href="${project.githubUrl}"
                       target="_blank"
                       rel="noopener noreferrer"
                       class="project-action-link"
                       title="${I18n.t('viewOnGitHub')}"
                       onclick="event.stopPropagation()">
                        ${ICONS.gitHub}
                    </a>
                </div>
            </div>

            <p class="project-description">${_escapeHtml(description)}</p>

            <div class="project-footer">
                <div class="project-tags">
                    ${tagsHtml}
                </div>
                <div class="project-meta">
                    <span class="meta-item">
                        <span class="lang-dot" style="background:${_getLanguageColor(project.language)}"></span>
                        ${_escapeHtml(project.language)}
                    </span>
                </div>
            </div>
        `;

        return card;
    }

    // ── Render ──

    function renderFeaturedProjects() {
        const container = dom.projectsContainer();
        if (!container) return;

        const projects = CONFIG.featuredProjects || [];

        const grid = document.createElement('div');
        grid.className = 'projects-grid';

        projects.forEach((proj, index) => {
            grid.appendChild(_createProjectCard(proj, index));
        });

        container.innerHTML = '';
        container.appendChild(grid);
    }

    function updateLanguage() {
        renderFeaturedProjects();
    }

    return Object.freeze({
        renderFeaturedProjects,
        updateLanguage,
    });
})();
