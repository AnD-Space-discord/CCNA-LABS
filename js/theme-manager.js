/**
 * CCNA-LABS Theme Manager + Mobile Navigation
 * Handles Dark/Light mode AND injects offcanvas mobile nav.
 */

// ─────────────────────────────────────────────────────────────
// 1. MOBILE NAV STYLES
// ─────────────────────────────────────────────────────────────
(function injectMobileNavStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .nav-hamburger {
            display: none;
            position: absolute;
            right: 90px;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.12);
            color: var(--text-main, #f8fafc);
            width: 42px;
            height: 42px;
            border-radius: 10px;
            cursor: pointer;
            align-items: center;
            justify-content: center;
            font-size: 1.1rem;
            z-index: 10002;
            transition: all 0.2s ease;
            flex-shrink: 0;
        }
        .nav-hamburger:hover {
            background: var(--accent-color, #3b82f6);
            border-color: var(--accent-color, #3b82f6);
        }
        .offcanvas-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.65);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            z-index: 19999;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }
        .offcanvas-overlay.open { opacity: 1; pointer-events: all; }

        .offcanvas-panel {
            position: fixed;
            top: 0; right: 0;
            height: 100%;
            width: min(310px, 85vw);
            background: var(--secondary-bg, #0f172a);
            border-left: 1px solid rgba(255,255,255,0.08);
            z-index: 20000;
            display: flex;
            flex-direction: column;
            transform: translateX(100%);
            transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
            box-shadow: -20px 0 60px rgba(0,0,0,0.5);
        }
        .offcanvas-panel.open { transform: translateX(0); }

        .offcanvas-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px 22px;
            border-bottom: 1px solid rgba(255,255,255,0.07);
            flex-shrink: 0;
        }
        .offcanvas-logo {
            font-size: 1rem; font-weight: 800;
            color: var(--accent-color, #3b82f6); letter-spacing: -0.3px;
        }
        .offcanvas-logo span { color: var(--text-muted, #94a3b8); font-weight: 400; }

        .offcanvas-close {
            background: rgba(239,68,68,0.1);
            border: 1px solid rgba(239,68,68,0.2);
            color: #f87171;
            width: 34px; height: 34px;
            border-radius: 50%;
            cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            font-size: 0.9rem;
            transition: all 0.2s ease;
        }
        .offcanvas-close:hover {
            background: rgba(239,68,68,0.28);
            border-color: rgba(239,68,68,0.5);
        }

        .offcanvas-nav { flex: 1; overflow-y: auto; padding: 12px 0; }
        .offcanvas-nav a {
            display: flex; align-items: center; gap: 12px;
            padding: 13px 22px;
            color: var(--text-muted, #94a3b8);
            text-decoration: none;
            font-size: 0.9rem; font-weight: 500;
            transition: all 0.2s ease;
            border-left: 3px solid transparent;
        }
        .offcanvas-nav a:hover {
            color: var(--text-main, #f8fafc);
            background: rgba(59,130,246,0.08);
            border-left-color: var(--accent-color, #3b82f6);
            padding-left: 28px;
        }
        .offcanvas-nav a i { width: 18px; text-align: center; color: var(--accent-color, #3b82f6); font-size: 0.88rem; flex-shrink: 0; }
        .offcanvas-section-label {
            padding: 14px 22px 5px;
            font-size: 0.68rem; font-weight: 700;
            letter-spacing: 1.5px; text-transform: uppercase;
            color: var(--accent-color, #3b82f6); opacity: 0.6;
        }
        .offcanvas-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 8px 22px; }

        .offcanvas-footer {
            padding: 18px 22px;
            border-top: 1px solid rgba(255,255,255,0.07);
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .offcanvas-footer-label {
            font-size: 0.82rem;
            color: var(--text-muted, #94a3b8);
            display: flex; align-items: center; gap: 8px;
        }
        .offcanvas-footer-label i { color: var(--accent-color, #3b82f6); }

        /* Light mode */
        body.light-mode .offcanvas-panel { background: #f1f5f9; border-left-color: rgba(0,0,0,0.08); }
        body.light-mode .offcanvas-header, body.light-mode .offcanvas-footer { border-color: rgba(0,0,0,0.07); }
        body.light-mode .offcanvas-nav a { color: #475569; }
        body.light-mode .offcanvas-nav a:hover { color: #0f172a; background: rgba(59,130,246,0.06); }
        body.light-mode .nav-hamburger { color: #0f172a; background: rgba(0,0,0,0.05); border-color: rgba(0,0,0,0.12); }

        /* Mobile: hide desktop nav links, show hamburger */
        @media (max-width: 768px) {
            nav > a,
            nav > .nav-item { display: none !important; }
            .nav-hamburger { display: flex !important; }
            .theme-toggle-btn { right: 56px !important; }
        }
    `;
    document.head.appendChild(style);
})();


// ─────────────────────────────────────────────────────────────
// 2. THEME MANAGER
// ─────────────────────────────────────────────────────────────
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        this.applyTheme();
        this.addToggleToNav();
    }

    applyTheme() {
        if (this.theme === 'light') {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
        localStorage.setItem('theme', this.theme);
        this.updateToggleButtons();
    }

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        this.applyTheme();
    }

    addToggleToNav() {
        const nav = document.querySelector('nav');
        if (!nav) return;
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'theme-toggle';
        toggleBtn.className = 'theme-toggle-btn';
        toggleBtn.setAttribute('aria-label', 'Toggle Theme');
        toggleBtn.innerHTML = this.getIcon();
        toggleBtn.onclick = () => this.toggleTheme();
        nav.appendChild(toggleBtn);
    }

    updateToggleButtons() {
        document.querySelectorAll('#theme-toggle, #offcanvas-theme-btn').forEach(btn => {
            if (btn) btn.innerHTML = this.getIcon();
        });
    }

    getIcon() {
        return this.theme === 'dark'
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
    }
}


// ─────────────────────────────────────────────────────────────
// 3. MOBILE OFFCANVAS NAV
// ─────────────────────────────────────────────────────────────
function initMobileNav() {
    const nav = document.querySelector('nav');
    if (!nav || document.getElementById('nav-hamburger')) return;

    // Calculate path prefix based on URL depth
    const path = window.location.pathname;
    const parts = path.replace(/^\//, '').split('/').filter(Boolean);
    const depth = parts.length;
    const p = depth <= 1 ? '' : depth === 2 ? '../' : '../../';

    // Inject hamburger into existing nav
    const hamburger = document.createElement('button');
    hamburger.id = 'nav-hamburger';
    hamburger.className = 'nav-hamburger';
    hamburger.setAttribute('aria-label', 'Open menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    nav.appendChild(hamburger);

    // Build overlay
    const overlay = document.createElement('div');
    overlay.className = 'offcanvas-overlay';
    overlay.id = 'offcanvas-overlay';
    document.body.appendChild(overlay);

    // Build panel
    const panel = document.createElement('div');
    panel.className = 'offcanvas-panel';
    panel.id = 'offcanvas-panel';
    panel.innerHTML = `
        <div class="offcanvas-header">
            <div class="offcanvas-logo">AND<span>-Space</span></div>
            <button class="offcanvas-close" id="offcanvas-close" aria-label="Close menu">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <nav class="offcanvas-nav" aria-label="Mobile Navigation">
            <div class="offcanvas-section-label">Main</div>
            <a href="${p}index.html"><i class="fas fa-home"></i> Home</a>

            <div class="offcanvas-divider"></div>
            <div class="offcanvas-section-label">Labs</div>
            <a href="${p}labs.html"><i class="fas fa-flask"></i> All Labs</a>
            <a href="${p}labs/switching.html"><i class="fas fa-network-wired"></i> Switching</a>
            <a href="${p}labs/routing.html"><i class="fas fa-route"></i> Routing</a>
            <a href="${p}labs/security.html"><i class="fas fa-shield-alt"></i> Security</a>
            <a href="${p}labs/ip-services.html"><i class="fas fa-server"></i> IP Services</a>

            <div class="offcanvas-divider"></div>
            <div class="offcanvas-section-label">Blog</div>
            <a href="${p}blog.html"><i class="fas fa-rss"></i> All Posts</a>
            <a href="${p}blog/switching.html"><i class="fas fa-network-wired"></i> Switching</a>
            <a href="${p}blog/routing.html"><i class="fas fa-route"></i> Routing</a>
            <a href="${p}blog/security.html"><i class="fas fa-shield-alt"></i> Security</a>
            <a href="${p}blog/ip-services.html"><i class="fas fa-server"></i> IP Services</a>

            <div class="offcanvas-divider"></div>
            <a href="https://discord.gg/ZezHyjKP4S" target="_blank">
                <i class="fab fa-discord"></i> Join Discord
            </a>
        </nav>
        <div class="offcanvas-footer">
            <span class="offcanvas-footer-label">
                <i class="fas fa-circle-half-stroke"></i> Appearance
            </span>
            <button class="theme-toggle-btn" id="offcanvas-theme-btn"
                style="position:static;transform:none;"
                aria-label="Toggle Theme">
                <i class="fas fa-sun"></i>
            </button>
        </div>
    `;
    document.body.appendChild(panel);

    // ── Event Handlers ──
    function openMenu() {
        panel.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        hamburger.setAttribute('aria-expanded', 'true');
        hamburger.innerHTML = '<i class="fas fa-times"></i>';
    }
    function closeMenu() {
        panel.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    }

    hamburger.addEventListener('click', () =>
        panel.classList.contains('open') ? closeMenu() : openMenu()
    );
    overlay.addEventListener('click', closeMenu);
    document.getElementById('offcanvas-close').addEventListener('click', closeMenu);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    panel.querySelectorAll('.offcanvas-nav a').forEach(a => a.addEventListener('click', closeMenu));

    // Offcanvas theme button
    document.getElementById('offcanvas-theme-btn').addEventListener('click', () => {
        if (window.themeManager) window.themeManager.toggleTheme();
    });
}


// ─────────────────────────────────────────────────────────────
// 4. INIT ON DOM READY
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
    initMobileNav();
});
