import sharp from 'sharp';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const svgBuffer = readFileSync(path.join(__dirname, '../public/favicon.svg'));
const bg = '#FAF6EF';
const outDir = path.join(__dirname, '../public/icons');
const transparent = { r: 0, g: 0, b: 0, alpha: 0 };

async function renderAny(size, filename) {
  const logo = await sharp(svgBuffer, { density: 384 })
    .resize(Math.round(size * 0.86), Math.round(size * 0.86), { fit: 'contain', background: transparent })
    .toBuffer();
  await sharp({
    create: { width: size, height: size, channels: 4, background: transparent },
  })
    .composite([{ input: logo, gravity: 'center' }])
    .png()
    .toFile(path.join(outDir, filename));
}

async function renderMaskable(size, filename) {
  const logo = await sharp(svgBuffer, { density: 384 })
    .resize(Math.round(size * 0.6), Math.round(size * 0.6), { fit: 'contain', background: transparent })
    .toBuffer();
  await sharp({
    create: { width: size, height: size, channels: 4, background: bg },
  })
    .composite([{ input: logo, gravity: 'center' }])
    .png()
    .toFile(path.join(outDir, filename));
}

async function main() {
  await renderAny(192, 'icon-192-any.png');
  await renderAny(512, 'icon-512-any.png');
  await renderMaskable(192, 'icon-192-maskable.png');
  await renderMaskable(512, 'icon-512-maskable.png');
  await renderMaskable(180, 'apple-touch-icon.png');
  console.log('icons generated');
}

main().catch((e) => { console.error(e); process.exit(1); });
