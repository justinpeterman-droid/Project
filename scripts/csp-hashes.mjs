// Print sha256 CSP hashes for every inline <script> in the built site.
// Run AFTER `npm run build`:  npm run csp:hashes
// Paste the printed hashes into the script-src of netlify.toml's CSP.
import { readFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";

const dist = "dist";
const pages = [];
(function walk(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".html")) pages.push(p);
  }
})(dist);

const re = /<script([^>]*)>([\s\S]*?)<\/script>/g;
const hashes = new Map();
for (const f of pages) {
  const html = readFileSync(f, "utf8");
  let m;
  while ((m = re.exec(html))) {
    const attrs = m[1];
    const body = m[2];
    if (/\bsrc=/.test(attrs)) continue; // external scripts are covered by 'self'
    if (/application\/ld\+json/.test(attrs)) continue; // data, not script-src governed
    if (body.trim() === "") continue;
    const h = "sha256-" + createHash("sha256").update(body, "utf8").digest("base64");
    if (!hashes.has(h)) hashes.set(h, path.relative(dist, f));
  }
}

console.log(`Found ${hashes.size} unique inline script hash(es):\n`);
for (const [h, f] of hashes) console.log(`  '${h}'   (first seen in ${f})`);
console.log(`\nscript-src 'self' ${[...hashes.keys()].map((h) => `'${h}'`).join(" ")}`);
