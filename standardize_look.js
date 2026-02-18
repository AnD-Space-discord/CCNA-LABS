const fs = require('fs');
const path = require('path');

function processDirectory(dir, isSubdir = true) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            // Don't recurse into non-content folders
            if (['labs', 'BLOGS'].includes(file)) {
                processDirectory(filePath, true);
            }
        } else if (file.endsWith('.html')) {
            updateFile(filePath, isSubdir);
        }
    });
}

function updateFile(filePath, isSubdir) {
    let content = fs.readFileSync(filePath, 'utf8');
    const prefix = isSubdir ? '../' : '';

    // 1. Update Head (Add FontAwesome if missing)
    if (!content.includes('font-awesome')) {
        content = content.replace('</head>', '  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">\n</head>');
    }

    // 2. Update Nav
    const navRegex = /<nav>[\s\S]*?<\/nav>/;
    const newNav = `  <nav>
    <a href="${prefix}index.html">Home</a>
    <a href="${prefix}labs.html">Labs</a>
    <a href="${prefix}blog.html">Blog</a>
    <a href="${prefix}contact.html">Contact</a>
  </nav>`;
    content = content.replace(navRegex, newNav);

    // 3. Update Header
    const headerRegex = /<header class="hero" style="[^"]*">([\s\S]*?)<\/header>|<header>([\s\S]*?)<\/header>/;
    content = content.replace(headerRegex, (match, p1, p2) => {
        const inner = p1 || p2 || '';
        if (filePath.includes('.lab.html')) {
            return `  <header class="lab-header">
    ${inner.trim()}
  </header>`;
        }
        return `  <header class="hero" style="height: 40vh; min-height: 300px;">
    ${inner.trim()}
  </header>`;
    });

    // 4. Wrap main content with lab-main for labs
    if (filePath.includes('.lab.html')) {
        content = content.replace(/<main>/, '<main class="lab-main">');
    }

    // 5. Standard footer
    const footerRegex = /<footer>[\s\S]*?<\/footer>/;
    const newFooter = `  <footer>
    <p>© 2026 Architecture & Developer Space | CCNA Mastery</p>
  </footer>`;
    content = content.replace(footerRegex, newFooter);

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${path.relative(__dirname, filePath)}`);
}

// Run for labs and BLOGS
processDirectory(path.join(__dirname, 'labs'), true);
processDirectory(path.join(__dirname, 'BLOGS'), true);
