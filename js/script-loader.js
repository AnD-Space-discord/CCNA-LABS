/**
 * Lab Scripts Loader
 * Automatically generates download links for lab configuration scripts.
 */

const labScriptsData = {
    'acl.lab.html': { folder: 'ACL', files: ['R1.txt', 'SW1.txt'], pkt: 'acl.pkt' },
    'acl-lab.html': { folder: 'ACL', files: ['R1.txt', 'SW1.txt'], pkt: 'acl.pkt' },
    'dhcp.lab.html': { folder: 'DHCP', files: ['R1.txt'], pkt: 'dhcp.pkt' },
    'eigrp.lab.html': { folder: 'EIGRP', files: ['R1.txt', 'R2.txt', 'R3.txt'], pkt: 'eigrp.pkt' },
    'intervlan.lab.html': { folder: 'InterVLAN', files: ['R1.txt', 'SW1.txt'], pkt: 'intervlan.pkt' },
    'ipv6.lab.html': { folder: 'IPv6', files: ['R1.txt', 'R2.txt'], pkt: 'ipv6.pkt' },
    'nat.lab.html': { folder: 'NAT', files: ['R1.txt'], pkt: 'nat.pkt' },
    'ospf.lab.html': { folder: 'OSPF', files: ['R1.txt', 'R2.txt', 'R3.txt'], pkt: 'ospf.pkt' },
    'ospf-multi-area.lab.html': { folder: 'OSPFMultiArea', files: ['R1.txt', 'R2.txt', 'R3.txt', 'R4.txt'], pkt: 'ospf-multi-area.pkt' },
    'port-security.lab.html': { folder: 'PortSecurity', files: ['SW1.txt'], pkt: 'port-security.pkt' },
    'rip.lab.html': { folder: 'RIP', files: ['R1.txt', 'R2.txt'], pkt: 'rip.pkt' },
    'static-routing.lab.html': { folder: 'StaticRouting', files: ['R1.txt', 'R2.txt'], pkt: 'static-routing.pkt' },
    'trunk.lab.html': { folder: 'Trunk', files: ['SW1.txt', 'SW2.txt'], pkt: 'trunk.pkt' },
    'LAB01.lab.html': { folder: 'Vlan', files: ['SW1.txt'], pkt: 'LAB01.pkt' },
    'basic.cli.lab.html': { folder: 'BasicCLI', files: ['R1.txt'], pkt: 'basic-cli.pkt' },
    'rsa.ssh.lab.html': { folder: 'RSA', files: ['R1.txt'], pkt: 'rsa-ssh.pkt' }
};

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const fileName = path.split('/').pop();

    const labData = labScriptsData[fileName];
    if (!labData) return;

    const container = document.getElementById('script-downloads-container');
    if (!container) return;

    let html = `
        <section class="resources mt-5">
            <h2>Lab Resources</h2>
            <p>Access the full configuration scripts for each networking device in this lab.</p>
            
            <div class="row g-4">
                <div class="col-md-6">
                    <h5 class="text-muted mb-3">🔍 Quick View</h5>
                    <div class="d-flex flex-wrap gap-2">
    `;

    labData.files.forEach(file => {
        const deviceName = file.replace('.txt', '');
        const scriptPath = `../Scripts/${labData.folder}/${file}`;

        html += `
            <a href="${scriptPath}" target="_blank" class="btn btn-outline-light btn-sm px-3">
                View ${deviceName}.txt
            </a>
        `;
    });

    html += `
                    </div>
                </div>
                
                <div class="col-md-6">
                    <h5 class="text-muted mb-3">📥 Script Downloads</h5>
                    <div class="d-grid gap-2">
    `;

    labData.files.forEach(file => {
        const deviceName = file.replace('.txt', '');
        const scriptPath = `../Scripts/${labData.folder}/${file}`;

        html += `
            <a href="${scriptPath}" download="${deviceName}-config.txt" class="btn btn-success d-flex align-items-center justify-content-center gap-2 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-file-earmark-code" viewBox="0 0 16 16">
                  <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                  <path d="M8.646 6.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 9 8.646 7.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 9l1.647-1.646a.5.5 0 0 0 0-.708z"/>
                </svg>
                Download ${deviceName} Configuration
            </a>
        `;
    });

    html += `
                    </div>
                </div>
            </div>
        </section>
    `;

    container.innerHTML = html;
});
