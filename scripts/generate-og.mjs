/**
 * Build 1200×630 Open Graph image from hero photo + brand scrim.
 * Run: node scripts/generate-og.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const WIDTH = 1200;
const HEIGHT = 630;
const heroPath = "public/images/hero.jpg";
const outDir = "public";

await mkdir(outDir, { recursive: true });

const hero = await sharp(heroPath)
  .resize(WIDTH, HEIGHT, { fit: "cover", position: "centre" })
  .modulate({ brightness: 0.92, saturation: 1.05 })
  .toBuffer();

const scrim = Buffer.from(
  `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#fbf8f3" stop-opacity="0.15"/>
        <stop offset="45%" stop-color="#20190f" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#20190f" stop-opacity="0.72"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <text x="600" y="280" text-anchor="middle" font-family="Georgia, serif" font-size="64" fill="#fdfbf7">Hometown Serenity</text>
    <text x="600" y="340" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" fill="#f2ebdf" letter-spacing="4">ASHLEY ROMERO · CMH, CAHA</text>
    <text x="600" y="400" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="26" fill="#e6dac8">Clinical hypnotherapy · Arkansas</text>
  </svg>`
);

const composite = await sharp(hero)
  .composite([{ input: scrim, top: 0, left: 0 }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toBuffer();

await sharp(composite).toFile(`${outDir}/og-image.jpg`);
await sharp(composite).webp({ quality: 85 }).toFile(`${outDir}/og-image.webp`);

console.log("✓ public/og-image.jpg");
console.log("✓ public/og-image.webp");
