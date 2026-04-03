const fs = require('fs');
const path = require('path');

const DIRECTORIES = [
  'c:/Users/HP/Documents/UI-Master/artifacts/ai-beauty-analyzer/src',
  'c:/Users/HP/Documents/UI-Master/artifacts/ai-beauty-analyzer/index.html'
];

const REPLACEMENTS = [
  { match: /Tarsier AI/g, replace: 'GlowUp AI' },
  { match: /TarsierLogo/g, replace: 'GlowUpLogo' },
  { match: /Tarsier/g, replace: 'GlowUp' },
  { match: /tarsier/g, replace: 'glowup' }
];

function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  const stat = fs.statSync(dir);
  if (stat.isFile()) {
    if (!dir.match(/\.(tsx|ts|html|css|json)$/)) return;
    let content = fs.readFileSync(dir, 'utf-8');
    let newContent = content;
    for (const r of REPLACEMENTS) {
      newContent = newContent.replace(r.match, r.replace);
    }
    if (content !== newContent) {
      fs.writeFileSync(dir, newContent, 'utf-8');
      console.log('Updated', dir);
    }
  } else if (stat.isDirectory()) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      processDir(path.join(dir, file));
    }
  }
}

for (const d of DIRECTORIES) {
  processDir(d);
}

// Rename component file specifically
const oldLogo = 'c:/Users/HP/Documents/UI-Master/artifacts/ai-beauty-analyzer/src/components/TarsierLogo.tsx';
const newLogo = 'c:/Users/HP/Documents/UI-Master/artifacts/ai-beauty-analyzer/src/components/GlowUpLogo.tsx';
if (fs.existsSync(oldLogo)) {
  fs.renameSync(oldLogo, newLogo);
  console.log('Renamed Logo component file');
}
