import { copyFileSync, cpSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, 'dist');

// Ensure dist directory exists
if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true });
}

// Copy manifest.json
console.log('Copying manifest.json...');
copyFileSync(
  join(__dirname, 'manifest.json'),
  join(distDir, 'manifest.json')
);

// Copy icons directory
console.log('Copying icons...');
if (existsSync(join(__dirname, 'icons'))) {
  cpSync(
    join(__dirname, 'icons'),
    join(distDir, 'icons'),
    { recursive: true }
  );
}

// Copy assets directory
console.log('Copying assets...');
if (existsSync(join(__dirname, 'assets'))) {
  cpSync(
    join(__dirname, 'assets'),
    join(distDir, 'assets'),
    { recursive: true }
  );
}

console.log('Build assets copied successfully!');
