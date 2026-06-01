import sharp from "sharp";
import { mkdir, copyFile } from "node:fs/promises";
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
  "f7dfb4b95c2a2a07829bfa89124c4101.jpg": {
    name: "service-somatic-alt",
    width: 1200,
    quality: 82,
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
  "521ced48ce8397a30b746b929e090b77.png": {
    name: "service-sound",
    width: 1000,
    quality: 85,
    png: true,
  },
  "36bb3c3190f4708d9345b36a01cbe596.jpg": {
    name: "service-somatic",
    width: 1200,
    quality: 82,
  },
  "367e2e0b7a53966a8228937248d588f1.jpg": {
    name: "service-nutrition",
    width: 1200,
    quality: 82,
  },
};

await mkdir(out, { recursive: true });

for (const [srcName, opts] of Object.entries(map)) {
  const input = path.join(raw, srcName);
  const ext = opts.png ? "webp" : "webp";
  const outputWebp = path.join(out, `${opts.name}.webp`);
  const outputJpg = path.join(out, `${opts.name}.jpg`);

  const pipeline = sharp(input).resize({
    width: opts.width,
    withoutEnlargement: true,
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
