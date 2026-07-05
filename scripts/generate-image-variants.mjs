// Generate responsive image variants (AVIF + WebP + JPG) from the optimized
// base images already in public/images, and write a manifest that Picture.astro
// uses to build srcset/sizes and intrinsic width/height (for zero CLS).
//
// The original canva-raw sources are gone, so the current public/images/*.jpg
// files ARE the sources. We downscale from them; we never upscale.
//
// Run: npm run images
import sharp from "sharp";
import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const dir = "public/images";
const manifestPath = "src/data/image-manifest.json";

// Photographic images that get a full responsive set.
const PHOTOS = [
  "hero",
  "mirror-waterfall",
  "about-ashley",
  "service-hypnotherapy",
  "service-nlp",
  "service-sound",
  "service-somatic",
  "service-nutrition",
];

// Small credential seals: recompress + a single retina-friendly width.
const BADGES = ["badge-issa", "badge-caha", "badge-cmh"];

const TARGET_WIDTHS = [400, 640, 768, 1024, 1280, 1600, 2000];
const BADGE_WIDTH = 240; // displayed ~96px; 240 covers 2x + a little

const Q = { avif: 52, webp: 80, jpg: 80 };

const manifest = {};

for (const name of PHOTOS) {
  const src = path.join(dir, `${name}.jpg`);
  const meta = await sharp(src).metadata();
  const srcW = meta.width;
  const srcH = meta.height;

  // Widths we can serve without upscaling, always including the native width.
  const widths = [...new Set(TARGET_WIDTHS.filter((w) => w < srcW).concat(srcW))].sort(
    (a, b) => a - b
  );

  for (const w of widths) {
    const base = sharp(src).resize({ width: w, withoutEnlargement: true });
    await base.clone().avif({ quality: Q.avif }).toFile(path.join(dir, `${name}-${w}.avif`));
    await base.clone().webp({ quality: Q.webp }).toFile(path.join(dir, `${name}-${w}.webp`));
    await base
      .clone()
      .jpeg({ quality: Q.jpg, mozjpeg: true })
      .toFile(path.join(dir, `${name}-${w}.jpg`));
  }

  // Regenerate the unsuffixed fallback WebP/AVIF at native width (fixes the
  // broken service-sound.webp that was larger than its JPG) and keep the JPG.
  await sharp(src).webp({ quality: Q.webp }).toFile(path.join(dir, `${name}.webp`));
  await sharp(src).avif({ quality: Q.avif }).toFile(path.join(dir, `${name}.avif`));

  manifest[name] = { widths, w: srcW, h: srcH };
  console.log(`✓ ${name} (${srcW}×${srcH}) → ${widths.join(",")}`);
}

for (const name of BADGES) {
  const src = path.join(dir, `${name}.png`);
  // Read to a buffer first — we write back to the same .png path.
  const buf = await sharp(src).toBuffer();
  const meta = await sharp(buf).metadata();
  const w = Math.min(BADGE_WIDTH, meta.width);
  const h = Math.round((meta.height / meta.width) * w);
  const pipe = sharp(buf).resize({ width: w, withoutEnlargement: true });
  await pipe.clone().webp({ quality: 88 }).toFile(path.join(dir, `${name}.webp`));
  // Palette-quantize the PNG fallback — the old badge-caha.png was 141 KB.
  await pipe
    .clone()
    .png({ compressionLevel: 9, palette: true, quality: 80 })
    .toFile(path.join(dir, `${name}.png`));
  manifest[name] = { widths: [w], w, h, png: true };
  console.log(`✓ ${name} (badge → ${w}×${h})`);
}

await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`\nManifest written: ${manifestPath}`);

// Report any WebP still larger than its JPG (should be none).
const files = await readdir(dir);
const jpgs = files.filter((f) => f.endsWith(".jpg"));
const { statSync } = await import("node:fs");
for (const j of jpgs) {
  const wp = j.replace(/\.jpg$/, ".webp");
  if (files.includes(wp)) {
    const js = statSync(path.join(dir, j)).size;
    const ws = statSync(path.join(dir, wp)).size;
    if (ws > js) console.warn(`⚠ ${wp} (${ws}) > ${j} (${js})`);
  }
}
console.log("Done.");
