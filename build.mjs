import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const src = path.join(root, 'src');
const publicDir = path.join(root, 'public');
const out = path.join(root, 'dist');

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

function copyDir(from, to) {
  if (!fs.existsSync(from)) return;
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, entry.name);
    const b = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(a, b);
    else fs.copyFileSync(a, b);
  }
}

// Copie les fichiers du site
copyDir(path.join(src, 'site'), out);

// Copie le dossier public (qui contient ton dossier admin)
copyDir(publicDir, out);

const data = {};
for (const name of ['images', 'music', 'texts', 'settings']) {
  const file = path.join(src, 'data', `${name}.json`);
  data[name] = JSON.parse(fs.readFileSync(file, 'utf8'));
}

fs.writeFileSync(path.join(out, 'data.json'), JSON.stringify(data, null, 2));
console.log('NEO ARCHIVE built successfully.');
