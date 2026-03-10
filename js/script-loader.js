/**
 * Lab Scripts Loader
 * Automatically generates download links for lab configuration scripts.
 * View buttons open a premium in-page modal showing file content.
 */

const labScriptsData = {
    'acl.lab.html': { folder: 'ACL', files: ['Router0.txt', 'Router1.txt', 'Router2.txt'], pkt: 'acl.pkt' },
    'acl-lab.html': { folder: 'ACL', files: ['Router0.txt', 'Router1.txt', 'Router2.txt'], pkt: 'acl.pkt' },
    'dhcp.lab.html': { folder: 'DHCP', files: ['R1.txt'], pkt: 'dhcp.pkt' },
    'eigrp.lab.html': { folder: 'EIGRP', files: ['R1.txt', 'R2.txt', 'R3.txt'], pkt: 'eigrp.pkt' },
    'intervlan.lab.html': { folder: 'InterVLAN', files: ['R1.txt', 'SW1.txt'], pkt: 'intervlan.pkt' },
    'ipv6.lab.html': { folder: 'IPv6', files: ['R1.txt', 'R2.txt'], pkt: 'ipv6.pkt' },
    'nat.lab.html': { folder: 'NAT', files: ['R1.txt'], pkt: 'nat.pkt' },
    'pat.lab.html': { folder: 'PAT', files: ['R1.txt'], pkt: 'pat.pkt' },
    'extended-acl.lab.html': { folder: 'ExtendedACL', files: ['R1.txt'], pkt: 'extended-acl.pkt' },
    'extended-numbered-acl.lab.html': { folder: 'ExtendedNumberedACL', files: ['R1.txt', 'R3.txt'], pkt: 'extended-numbered-acl.pkt' },
    'comprehensive-project.lab.html': { folder: 'ComprehensiveProject', files: ['R1.txt', 'SW1.txt'], pkt: 'comprehensive-project.pkt' },
    'ospf.lab.html': { folder: 'OSPF', files: ['R1.txt', 'R2.txt', 'R3.txt'], pkt: 'ospf.pkt' },
    'ospf-multi-area.lab.html': { folder: 'OSPFMultiArea', files: ['R1.txt', 'R2.txt', 'R3.txt', 'R4.txt'], pkt: 'ospf-multi-area.pkt' },
    'port-security.lab.html': { folder: 'PortSecurity', files: ['SW1.txt'], pkt: 'port-security.pkt' },
    'rip.lab.html': { folder: 'RIP', files: ['R1.txt', 'R2.txt'], pkt: 'rip.pkt' },
    'static-routing.lab.html': { folder: 'StaticRouting', files: ['R1.txt', 'R2.txt'], pkt: 'static-routing.pkt' },
    'trunk.lab.html': { folder: 'Trunk', files: ['SW1.txt', 'SW2.txt'], pkt: 'trunk.pkt' },
    'LAB01.lab.html': { folder: 'Vlan', files: ['SW1.txt'], pkt: 'LAB01.pkt' },
    'basic.cli.lab.html': { folder: 'BasicCLI', files: ['R1.txt'], pkt: 'basic-cli.pkt' },
    'rsa.ssh.lab.html': { folder: 'RSA', files: ['R1.txt'], pkt: 'rsa-ssh.pkt' },
    'telnet-ssh.lab.html': { folder: 'TelnetSSH', files: ['R1.txt', 'SW1.txt'], pkt: 'telnet-ssh.pkt' }
};

// ─── Inject Modal HTML (once) ─────────────────────────────────────
function injectScriptModal() {
    if (document.getElementById('script-modal')) return;
    const modal = document.createElement('div');
    modal.id = 'script-modal';
    modal.className = 'script-modal-overlay';
    modal.innerHTML = `
        <div class="script-modal-box">
            <div class="script-modal-header">
                <div class="script-modal-dots">
                    <span class="dot red"></span>
                    <span class="dot yellow"></span>
                    <span class="dot green"></span>
                </div>
                <span class="script-modal-title" id="script-modal-title">Script Viewer</span>
                <div class="script-modal-actions">
                    <button class="script-modal-copy" id="script-modal-copy" title="Copy to clipboard">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                    <button class="script-modal-close" id="script-modal-close" title="Close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            <div class="script-modal-body">
                <pre id="script-modal-content">Loading...</pre>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeScriptModal();
    });

    // Close button
    document.getElementById('script-modal-close').addEventListener('click', closeScriptModal);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeScriptModal();
    });

    // Copy button
    document.getElementById('script-modal-copy').addEventListener('click', () => {
        const content = document.getElementById('script-modal-content').textContent;
        navigator.clipboard.writeText(content).then(() => {
            const btn = document.getElementById('script-modal-copy');
            btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            btn.classList.add('copied');
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-copy"></i> Copy';
                btn.classList.remove('copied');
            }, 2000);
        });
    });
}

function openScriptModal(title, path) {
    const modal = document.getElementById('script-modal');
    const contentEl = document.getElementById('script-modal-content');
    const titleEl = document.getElementById('script-modal-title');

    titleEl.textContent = title;
    contentEl.textContent = 'Loading...';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    fetch(path)
        .then(res => {
            if (!res.ok) throw new Error('File not found');
            return res.text();
        })
        .then(text => {
            contentEl.textContent = text;
        })
        .catch(() => {
            contentEl.textContent = '! Error: Could not load script file.\n! Make sure the file exists at:\n! ' + path;
        });
}

function closeScriptModal() {
    const modal = document.getElementById('script-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ─── Build Lab Resources Section ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const fileName = path.split('/').pop();

    const labData = labScriptsData[fileName];
    if (!labData) return;

    const container = document.getElementById('script-downloads-container');
    if (!container) return;

    injectScriptModal();

    let html = `
        <div class="lab-resources">
            <h2 style="border:none; padding:0; margin-bottom:15px; text-align:left;">Lab Resources</h2>
            <p style="margin-bottom:40px; color:var(--text-muted);">Access the full configuration scripts for each networking device in this lab.</p>
            
            <div class="resource-grid">
                <div class="resource-col">
                    <h3><i class="fas fa-search" style="color:var(--accent-color);"></i> Quick View</h3>
                    <div class="d-flex flex-wrap gap-2">
    `;

    labData.files.forEach(file => {
        const deviceName = file.replace('.txt', '');
        const scriptPath = `../Scripts/${labData.folder}/${file}`;

        html += `
            <button class="view-btn" onclick="openScriptModal('${file}', '${scriptPath}')">
                <i class="fas fa-eye" style="margin-right:6px;"></i> View ${deviceName}
            </button>
        `;
    });

    html += `
                    </div>
                </div>
                
                <div class="resource-col">
                    <h3><i class="fas fa-file-download" style="color:#10b981;"></i> Script Downloads</h3>
                    <div class="d-flex flex-wrap gap-2">
    `;

    labData.files.forEach(file => {
        const deviceName = file.replace('.txt', '');
        const scriptPath = `../Scripts/${labData.folder}/${file}`;

        html += `
            <a href="${scriptPath}" download="${deviceName}-config.txt" class="download-btn">
                <i class="fas fa-file-code"></i>
                Download ${deviceName}
            </a>
        `;
    });

    html += `
                    </div>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = html;
});
