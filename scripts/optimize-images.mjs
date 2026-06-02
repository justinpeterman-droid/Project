import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const raw = "public/images/canva-raw";
const out = "public/images";

/** Source hash → optimized output name */
const map = {
  "106fa1806bda9c7102468421cd7413ff.jpg": { name: "hero", width: 2400, quality: 82 },
  "0be0ebe2d3ecbb5bf54c709204828698.jpg": {
    name: "mirror-waterfall",
    width: 2000,
    quality: 82,
  },
  "b28da9831ef319794b2a906abc0ccb5e.jpg": {
    name: "about-ashley",
    width: 1066,
    quality: 88,
  },
  "4acca0f39162aa4f504896d4603935e0.jpg": {
    name: "service-hypnotherapy",
    width: 1200,
    quality: 82,
  },
  "8d0b607fe061fa12c0edb9adf5e34ab4.jpg": {
    name: "service-nlp",
    width: 1200,
    quality: 82,
  },
  /** Rain ripples on a still pond — sound frequency / vibration metaphor */
  "1f2f6fc480514eb806c261ddff593d06.jpg": {
    name: "service-sound",
    width: 1600,
    quality: 82,
  },
  /** Sunlit forest path — somatic movement & breathwork */
  "f0b45c0b9a80f12766d4cc76a15a6519.jpg": {
    name: "service-somatic",
    width: 1600,
    quality: 82,
    allowUpscale: true,
  },
  /** Lone tree on a green hill — holistic nutrition & wellness */
  "a83f376a42e347d4317bc3f3e7060254.jpg": {
    name: "service-nutrition",
    width: 1600,
    quality: 82,
    allowUpscale: true,
  },
  /** ISSA certification seal */
  "5de6130185e050730965c8e7974990f0.png": {
    name: "badge-issa",
    width: 400,
    quality: 90,
    png: true,
  },
  /** CAHA / hypno-anesthesia seal */
  "d68b258f0e7be36d68541c2ca1cd2d74.png": {
    name: "badge-caha",
    width: 400,
    quality: 90,
    png: true,
  },
  /** CMH-style credential badge */
  "6809cd6be95aaa220a161aaa2caa6684.png": {
    name: "badge-cmh",
    width: 400,
    quality: 90,
    png: true,
  },
};

await mkdir(out, { recursive: true });

for (const [srcName, opts] of Object.entries(map)) {
  const input = path.join(raw, srcName);
  const outputWebp = path.join(out, `${opts.name}.webp`);
  const outputJpg = path.join(out, `${opts.name}.jpg`);

  const pipeline = sharp(input).resize({
    width: opts.width,
    withoutEnlargement: !opts.allowUpscale,
  });

  await pipeline.clone().webp({ quality: opts.quality }).toFile(outputWebp);

  if (opts.png && srcName.endsWith(".png")) {
    await pipeline.clone().png({ compressionLevel: 9 }).toFile(
      path.join(out, `${opts.name}.png`)
    );
  } else {
    await pipeline.clone().jpeg({ quality: opts.quality, mozjpeg: true }).toFile(outputJpg);
  }

  console.log(`✓ ${opts.name}`);
}

console.log("Done.");
