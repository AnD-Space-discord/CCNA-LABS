const fs = require('fs');
const path = require('path');

const blogsDir = path.join(__dirname, 'BLOGS');
const files = fs.readdirSync(blogsDir).filter(file => file.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(blogsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Pattern for the "Continue reading about related topics" paragraphs
    const relatedLinksRegex = /<p style="margin-top:18px;">\s*Continue reading about related topics:[\s\S]*?<\/p>/g;

    content = content.replace(relatedLinksRegex, '');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Removed related links in ${file}`);
    }
});
