/**
 * CCNA-LABS Theme Manager + Mobile Navigation
 * Uses Bootstrap 5's native Offcanvas component for mobile nav.
 */

// ─────────────────────────────────────────────────────────────
// 1. STYLES
// ─────────────────────────────────────────────────────────────
(function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* ── Hamburger (mobile only) ── */
        #ccna-hamburger {
            display: none;
            position: absolute;
            right: 20px;
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
        }
        #ccna-hamburger:hover {
            background: var(--accent-color, #3b82f6);
            border-color: var(--accent-color, #3b82f6);
        }

        /* ── Side Panel ── */
        #ccnaMobileNav {
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
        #ccnaMobileNav.open { transform: translateX(0); }

        /* ── Backdrop ── */
        #ccna-backdrop {
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
        #ccna-backdrop.open { opacity: 1; pointer-events: all; }

        /* ── Panel Header ── */
        #ccna-panel-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 18px 22px;
            border-bottom: 1px solid rgba(255,255,255,0.07);
            flex-shrink: 0;
        }
        #ccna-panel-logo {
            font-size: 1rem; font-weight: 800;
            color: var(--accent-color, #3b82f6);
            letter-spacing: -0.3px;
            text-decoration: none;
        }
        #ccna-panel-logo span { color: var(--text-muted, #94a3b8); font-weight: 400; }

        #ccna-panel-close {
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
        #ccna-panel-close:hover { background: rgba(239,68,68,0.28); border-color: rgba(239,68,68,0.5); }

        /* ── Panel Links ── */
        #ccna-panel-links {
            flex: 1;
            overflow-y: auto;
            padding: 10px 0;
        }

        /* Section labels */
        .ccna-menu-label {
            display: block;
            padding: 14px 22px 5px;
            font-size: 0.68rem;
            font-weight: 700;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: var(--accent-color, #3b82f6);
            opacity: 0.65;
        }
        .ccna-menu-divider {
            height: 1px;
            background: rgba(255,255,255,0.06);
            margin: 8px 22px;
            border: none;
        }

        /* Nav links */
        .ccna-menu-link {
            display: flex !important;
            align-items: center !important;
            gap: 11px !important;
            padding: 12px 22px !important;
            color: var(--text-muted, #94a3b8) !important;
            text-decoration: none !important;
            font-size: 0.9rem !important;
            font-weight: 500 !important;
            transition: all 0.2s ease !important;
            border-left: 3px solid transparent !important;
        }
        .ccna-menu-link:hover {
            color: var(--text-main, #f8fafc) !important;
            background: rgba(59,130,246,0.08) !important;
            border-left-color: var(--accent-color, #3b82f6) !important;
            padding-left: 28px !important;
        }
        .ccna-menu-link i {
            width: 18px !important;
            text-align: center !important;
            color: var(--accent-color, #3b82f6) !important;
            flex-shrink: 0 !important;
        }

        /* ── Panel Footer ── */
        #ccna-panel-footer {
            padding: 16px 22px;
            border-top: 1px solid rgba(255,255,255,0.07);
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        #ccna-panel-footer-label {
            font-size: 0.82rem;
            color: var(--text-muted, #94a3b8);
            display: flex; align-items: center; gap: 8px;
        }
        #ccna-panel-footer-label i { color: var(--accent-color, #3b82f6); }

        /* Light mode */
        body.light-mode #ccnaMobileNav { background: #f1f5f9; border-left-color: rgba(0,0,0,0.08); }
        body.light-mode #ccna-panel-header { border-bottom-color: rgba(0,0,0,0.07); }
        body.light-mode #ccna-panel-footer { border-top-color: rgba(0,0,0,0.07); }
        body.light-mode #ccna-panel-close { filter: none; }
        body.light-mode .ccna-menu-link { color: #475569 !important; }
        body.light-mode .ccna-menu-link:hover { color: #0f172a !important; background: rgba(59,130,246,0.06) !important; }
        body.light-mode .ccna-menu-divider { background: rgba(0,0,0,0.08); }
        body.light-mode #ccna-hamburger { color: #0f172a; background: rgba(0,0,0,0.05); border-color: rgba(0,0,0,0.12); }

        /* ── Mobile Breakpoint ── */
        @media (max-width: 768px) {
            nav > a, nav > .nav-item { display: none !important; }
            #ccna-hamburger { display: flex !important; }
            .theme-toggle-btn { left: 16px !important; right: auto !important; }
            nav { height: 70px !important; padding: 0 20px !important; flex-wrap: nowrap !important; }
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
        document.body.classList.toggle('light-mode', this.theme === 'light');
        localStorage.setItem('theme', this.theme);
        this.updateIcons();
    }
    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        this.applyTheme();
    }
    addToggleToNav() {
        const nav = document.querySelector('nav');
        if (!nav) return;

        // Reuse existing button if already in the nav (hardcoded in HTML)
        let btn = nav.querySelector('.theme-toggle-btn');
        if (!btn) {
            btn = document.createElement('button');
            btn.className = 'theme-toggle-btn';
            nav.appendChild(btn);
        }
        // Standardise the ID and wire up the click handler
        btn.id = 'theme-toggle';
        btn.setAttribute('aria-label', 'Toggle Theme');
        btn.innerHTML = this.getIcon();
        btn.onclick = () => this.toggleTheme();
    }
    updateIcons() {
        ['theme-toggle', 'ccna-offcanvas-theme-btn'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.innerHTML = this.getIcon();
        });
    }
    getIcon() {
        return this.theme === 'dark'
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
    }
}


// ─────────────────────────────────────────────────────────────
// 3. MOBILE NAV (pure JS — works on ALL pages, no Bootstrap JS required)
// ─────────────────────────────────────────────────────────────
function initMobileNav() {
    const nav = document.querySelector('nav');
    if (!nav || document.getElementById('ccna-hamburger')) return;

    // Path prefix based on URL depth
    const parts = window.location.pathname.replace(/^\//, '').split('/').filter(Boolean);
    const depth = parts.length;
    const p = depth <= 1 ? '' : depth === 2 ? '../' : '../../';

    // Nav links definition
    const menu = [
        { type: 'label', text: 'Main' },
        { type: 'link', href: `${p}index.html`, icon: 'fa-home', text: 'Home' },
        { type: 'divider' },
        { type: 'label', text: 'Labs' },
        { type: 'link', href: `${p}labs.html`, icon: 'fa-flask', text: 'All Labs' },
        { type: 'link', href: `${p}labs/switching.html`, icon: 'fa-network-wired', text: 'Switching' },
        { type: 'link', href: `${p}labs/routing.html`, icon: 'fa-route', text: 'Routing' },
        { type: 'link', href: `${p}labs/security.html`, icon: 'fa-shield-alt', text: 'Security' },
        { type: 'link', href: `${p}labs/ip-services.html`, icon: 'fa-server', text: 'IP Services' },
        { type: 'divider' },
        { type: 'label', text: 'Blog' },
        { type: 'link', href: `${p}blog.html`, icon: 'fa-rss', text: 'All Posts' },
        { type: 'link', href: `${p}blog/switching.html`, icon: 'fa-network-wired', text: 'Switching' },
        { type: 'link', href: `${p}blog/routing.html`, icon: 'fa-route', text: 'Routing' },
        { type: 'link', href: `${p}blog/security.html`, icon: 'fa-shield-alt', text: 'Security' },
        { type: 'link', href: `${p}blog/ip-services.html`, icon: 'fa-server', text: 'IP Services' },
        { type: 'divider' },
        { type: 'link', href: 'https://discord.gg/ZezHyjKP4S', icon: 'fa-brands fa-discord', text: 'Join Discord', external: true },
    ];

    const linksHTML = menu.map(item => {
        if (item.type === 'label') return `<span class="ccna-menu-label">${item.text}</span>`;
        if (item.type === 'divider') return `<hr class="ccna-menu-divider">`;
        return `<a href="${item.href}" class="ccna-menu-link" ${item.external ? 'target="_blank" rel="noopener"' : ''}>
            <i class="fas ${item.icon}"></i> ${item.text}
        </a>`;
    }).join('');

    // ── Backdrop ──
    const backdrop = document.createElement('div');
    backdrop.id = 'ccna-backdrop';
    document.body.appendChild(backdrop);

    // ── Side Panel ──
    const panel = document.createElement('div');
    panel.id = 'ccnaMobileNav';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-label', 'Navigation menu');
    panel.innerHTML = `
        <div id="ccna-panel-header">
            <a href="${p}index.html" id="ccna-panel-logo">AND<span>-Space</span></a>
            <button id="ccna-panel-close" aria-label="Close navigation menu">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div id="ccna-panel-links">${linksHTML}</div>
        <div id="ccna-panel-footer">
            <span id="ccna-panel-footer-label">
                <i class="fas fa-circle-half-stroke"></i> Appearance
            </span>
            <button class="theme-toggle-btn" id="ccna-offcanvas-theme-btn"
                style="position:static; transform:none;"
                aria-label="Toggle Theme">
            </button>
        </div>
    `;
    document.body.appendChild(panel);

    // ── Hamburger ──
    const hamburger = document.createElement('button');
    hamburger.id = 'ccna-hamburger';
    hamburger.setAttribute('aria-label', 'Open navigation menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    nav.appendChild(hamburger);

    // ── Open / Close ──
    const open = () => {
        panel.classList.add('open');
        backdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
        hamburger.setAttribute('aria-expanded', 'true');
        hamburger.innerHTML = '<i class="fas fa-times"></i>';
        // Sync theme icon
        const panelBtn = document.getElementById('ccna-offcanvas-theme-btn');
        const mainBtn = document.getElementById('theme-toggle');
        if (panelBtn && mainBtn) panelBtn.innerHTML = mainBtn.innerHTML;
    };
    const close = () => {
        panel.classList.remove('open');
        backdrop.classList.remove('open');
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    };

    hamburger.addEventListener('click', () => panel.classList.contains('open') ? close() : open());
    backdrop.addEventListener('click', close);
    document.getElementById('ccna-panel-close').addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    panel.querySelectorAll('.ccna-menu-link').forEach(a => a.addEventListener('click', close));

    document.getElementById('ccna-offcanvas-theme-btn').addEventListener('click', () => {
        if (window.themeManager) window.themeManager.toggleTheme();
    });
}


// ─────────────────────────────────────────────────────────────
// 4. INIT
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
    initMobileNav();
});

