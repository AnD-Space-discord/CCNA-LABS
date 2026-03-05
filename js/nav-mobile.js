/**
 * CCNA-LABS Mobile Navigation
 * Injects a hamburger button + offcanvas sidebar for mobile screens.
 * Works alongside the existing desktop nav — no HTML changes needed.
 */

(function () {
    // ─── Inject Offcanvas CSS ──────────────────────────────────────────
    const style = document.createElement('style');
    style.textContent = `
        /* ── Hamburger Button (mobile only) ── */
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

        /* ── Offcanvas Overlay ── */
        .offcanvas-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.6);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            z-index: 19999;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }
        .offcanvas-overlay.open {
            opacity: 1;
            pointer-events: all;
        }

        /* ── Offcanvas Panel ── */
        .offcanvas-panel {
            position: fixed;
            top: 0;
            right: 0;
            height: 100%;
            width: min(320px, 85vw);
            background: var(--secondary-bg, #0f172a);
            border-left: 1px solid rgba(255,255,255,0.08);
            z-index: 20000;
            display: flex;
            flex-direction: column;
            transform: translateX(100%);
            transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: -20px 0 60px rgba(0,0,0,0.5);
        }
        .offcanvas-panel.open {
            transform: translateX(0);
        }

        /* ── Panel Header ── */
        .offcanvas-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px 24px;
            border-bottom: 1px solid rgba(255,255,255,0.07);
            flex-shrink: 0;
        }
        .offcanvas-logo {
            font-size: 1rem;
            font-weight: 800;
            color: var(--accent-color, #3b82f6);
            letter-spacing: -0.3px;
        }
        .offcanvas-logo span {
            color: var(--text-muted, #94a3b8);
            font-weight: 400;
        }
        .offcanvas-close {
            background: rgba(239,68,68,0.1);
            border: 1px solid rgba(239,68,68,0.2);
            color: #f87171;
            width: 34px;
            height: 34px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.9rem;
            transition: all 0.2s ease;
        }
        .offcanvas-close:hover {
            background: rgba(239,68,68,0.25);
            border-color: rgba(239,68,68,0.5);
        }

        /* ── Panel Nav Links ── */
        .offcanvas-nav {
            flex: 1;
            overflow-y: auto;
            padding: 16px 0;
        }
        .offcanvas-nav a {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 14px 24px;
            color: var(--text-muted, #94a3b8);
            text-decoration: none;
            font-size: 0.92rem;
            font-weight: 500;
            transition: all 0.2s ease;
            border-left: 3px solid transparent;
        }
        .offcanvas-nav a:hover {
            color: var(--text-main, #f8fafc);
            background: rgba(59,130,246,0.08);
            border-left-color: var(--accent-color, #3b82f6);
            padding-left: 28px;
        }
        .offcanvas-nav a i {
            width: 18px;
            text-align: center;
            color: var(--accent-color, #3b82f6);
            font-size: 0.9rem;
            flex-shrink: 0;
        }
        .offcanvas-section-label {
            padding: 14px 24px 6px;
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: var(--accent-color, #3b82f6);
            opacity: 0.7;
        }
        .offcanvas-divider {
            height: 1px;
            background: rgba(255,255,255,0.06);
            margin: 10px 24px;
        }

        /* ── Panel Footer ── */
        .offcanvas-footer {
            padding: 20px 24px;
            border-top: 1px solid rgba(255,255,255,0.07);
            flex-shrink: 0;
        }
        .offcanvas-theme-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .offcanvas-theme-label {
            font-size: 0.85rem;
            color: var(--text-muted, #94a3b8);
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .offcanvas-theme-label i {
            color: var(--accent-color, #3b82f6);
        }

        /* Light mode */
        body.light-mode .offcanvas-panel {
            background: #f1f5f9;
            border-left-color: rgba(0,0,0,0.08);
        }
        body.light-mode .offcanvas-header {
            border-bottom-color: rgba(0,0,0,0.07);
        }
        body.light-mode .offcanvas-nav a {
            color: #475569;
        }
        body.light-mode .offcanvas-nav a:hover {
            color: #0f172a;
            background: rgba(59,130,246,0.06);
        }
        body.light-mode .offcanvas-footer {
            border-top-color: rgba(0,0,0,0.07);
        }
        body.light-mode .nav-hamburger {
            color: #0f172a;
            background: rgba(0,0,0,0.05);
            border-color: rgba(0,0,0,0.12);
        }

        /* ── Mobile Breakpoint ── */
        @media (max-width: 768px) {
            /* Hide desktop nav links, keep only logo area visible */
            nav > a:not(.nav-logo),
            nav > .nav-item {
                display: none !important;
            }
            /* Show hamburger */
            .nav-hamburger {
                display: flex !important;
            }
            /* Ensure theme toggle stays visible on mobile */
            .theme-toggle-btn {
                right: 56px !important;
            }
        }
    `;
    document.head.appendChild(style);

    // ─── Build Offcanvas HTML ──────────────────────────────────────────
    function buildOffcanvas() {
        // Determine relative path prefix based on current URL depth
        const depth = window.location.pathname.split('/').filter(Boolean).length;
        const prefix = depth > 1 ? '../' : '';

        const overlay = document.createElement('div');
        overlay.className = 'offcanvas-overlay';
        overlay.id = 'offcanvas-overlay';

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
                <a href="${prefix}index.html">
                    <i class="fas fa-home"></i> Home
                </a>

                <div class="offcanvas-divider"></div>
                <div class="offcanvas-section-label">Labs</div>
                <a href="${prefix}labs.html">
                    <i class="fas fa-flask"></i> All Labs
                </a>
                <a href="${prefix}labs/switching.html">
                    <i class="fas fa-network-wired"></i> Switching
                </a>
                <a href="${prefix}labs/routing.html">
                    <i class="fas fa-route"></i> Routing
                </a>
                <a href="${prefix}labs/security.html">
                    <i class="fas fa-shield-alt"></i> Security
                </a>
                <a href="${prefix}labs/ip-services.html">
                    <i class="fas fa-server"></i> IP Services
                </a>

                <div class="offcanvas-divider"></div>
                <div class="offcanvas-section-label">Blog</div>
                <a href="${prefix}blog.html">
                    <i class="fas fa-rss"></i> All Posts
                </a>
                <a href="${prefix}blog/switching.html">
                    <i class="fas fa-network-wired"></i> Switching
                </a>
                <a href="${prefix}blog/routing.html">
                    <i class="fas fa-route"></i> Routing
                </a>
                <a href="${prefix}blog/security.html">
                    <i class="fas fa-shield-alt"></i> Security
                </a>
                <a href="${prefix}blog/ip-services.html">
                    <i class="fas fa-server"></i> IP Services
                </a>

                <div class="offcanvas-divider"></div>
                <a href="https://discord.gg/ZezHyjKP4S" target="_blank">
                    <i class="fab fa-discord"></i> Join Discord
                </a>
            </nav>

            <div class="offcanvas-footer">
                <div class="offcanvas-theme-row">
                    <span class="offcanvas-theme-label">
                        <i class="fas fa-circle-half-stroke"></i> Appearance
                    </span>
                    <button class="theme-toggle-btn" id="offcanvas-theme-toggle"
                        style="position:static;transform:none;"
                        onclick="window.themeManager && window.themeManager.toggleTheme()"
                        aria-label="Toggle Theme">
                        <i class="fas fa-sun"></i>
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        document.body.appendChild(panel);

        return { overlay, panel };
    }

    // ─── Wire Everything Up ────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', () => {
        const nav = document.querySelector('nav');
        if (!nav) return;

        // Inject hamburger button into existing nav
        const hamburger = document.createElement('button');
        hamburger.className = 'nav-hamburger';
        hamburger.id = 'nav-hamburger';
        hamburger.setAttribute('aria-label', 'Open menu');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        nav.appendChild(hamburger);

        const { overlay, panel } = buildOffcanvas();

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

        hamburger.addEventListener('click', () => {
            panel.classList.contains('open') ? closeMenu() : openMenu();
        });

        overlay.addEventListener('click', closeMenu);
        document.getElementById('offcanvas-close').addEventListener('click', closeMenu);

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMenu();
        });

        // Close when a nav link is clicked (navigation)
        panel.querySelectorAll('.offcanvas-nav a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Sync offcanvas theme button icon with ThemeManager
        const observer = new MutationObserver(() => {
            const offBtn = document.getElementById('offcanvas-theme-toggle');
            const mainBtn = document.getElementById('theme-toggle');
            if (offBtn && mainBtn) {
                offBtn.innerHTML = mainBtn.innerHTML;
            }
        });
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    });
})();
