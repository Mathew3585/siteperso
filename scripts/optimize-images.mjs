/**
 * Optimise des photos pour le web (redimensionne + compresse).
 *
 * Usage :
 *   node scripts/optimize-images.mjs "public/images/projects/Mon Dossier" mon-prefixe
 *
 * Sans arguments, traite les dossiers listés dans DEFAULT_GROUPS ci-dessous.
 * Les fichiers sont écrits dans public/images/projects/<prefixe>-1.jpg, -2.jpg, ...
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const OUT_DIR = "public/images/projects";
const MAX_WIDTH = 3000;
const QUALITY = 92;

const DEFAULT_GROUPS = [
  { dir: "_source-photos/Clavier export", prefix: "clavier" },
  { dir: "_source-photos/Stream Deck", prefix: "streamdeck" },
];

const [, , argDir, argPrefix] = process.argv;
const groups =
  argDir && argPrefix ? [{ dir: argDir, prefix: argPrefix }] : DEFAULT_GROUPS;

let totalIn = 0;
let totalOut = 0;

for (const { dir, prefix } of groups) {
  if (!fs.existsSync(dir)) {
    console.log(`(dossier absent, ignoré : ${dir})`);
    continue;
  }
  const files = fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort();

  let i = 0;
  for (const file of files) {
    i++;
    const src = path.join(dir, file);
    const out = path.join(OUT_DIR, `${prefix}-${i}.jpg`);
    const inSize = fs.statSync(src).size;
    const meta = await sharp(src).metadata();
    await sharp(src)
      .rotate() // respecte l'orientation EXIF
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toFile(out);
    const outSize = fs.statSync(out).size;
    totalIn += inSize;
    totalOut += outSize;
    console.log(
      `${prefix}-${i}.jpg  ${meta.width}x${meta.height} : ${(inSize / 1024 / 1024).toFixed(1)} Mo -> ${(outSize / 1024).toFixed(0)} Ko`
    );
  }
}

console.log(
  `\nTOTAL : ${(totalIn / 1024 / 1024).toFixed(1)} Mo -> ${(totalOut / 1024 / 1024).toFixed(1)} Mo`
);
