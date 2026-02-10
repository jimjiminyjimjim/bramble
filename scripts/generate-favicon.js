const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '..', 'app');

// SVG source for the favicon - purple B with accent dot
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8B5CF6"/>
      <stop offset="100%" stop-color="#7C3AED"/>
    </linearGradient>
  </defs>
  <circle cx="256" cy="256" r="256" fill="url(#purpleGradient)"/>
  <path d="M180 128h80c35 0 65 15 65 55c0 25-15 40-35 48c25 8 50 28 50 62c0 50-40 75-85 75h-75V128z M220 168v60h35c20 0 35-12 35-30s-15-30-35-30h-35z M220 268v60h40c25 0 40-15 40-30s-15-30-40-30h-40z" fill="white"/>
  <circle cx="340" cy="148" r="20" fill="white"/>
</svg>`;

async function generateFavicons() {
  const svgBuffer = Buffer.from(svgContent);

  // Generate favicon.ico (32x32)
  console.log('Generating favicon.ico...');
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(appDir, 'favicon.ico'));

  // Generate icon.png (512x512 for modern browsers)
  console.log('Generating icon.png...');
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(appDir, 'icon.png'));

  // Generate apple-icon.png (180x180 for Apple devices)
  console.log('Generating apple-icon.png...');
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(appDir, 'apple-icon.png'));

  // Generate icon-192.png (for PWA)
  console.log('Generating icon-192.png...');
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(appDir, 'icon-192.png'));

  console.log('All favicons generated successfully!');
}

generateFavicons().catch(console.error);
