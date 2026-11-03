/**
 * shop-studio.jpg → public/bg/gear-*.webp (shop section backgrounds)
 * Upscales master with Lanczos3, then exports fixed aspect crops for responsive CSS.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const INPUT = path.join(ROOT, "assets", "bg-source", "shop-studio.jpg");
const OUT = path.join(ROOT, "public", "bg");

/** Match existing gear-* filenames and dimensions used by the site */
const VARIANTS = [
  { file: "gear-640", w: 640, h: 900, pos: "centre" },
  { file: "gear-682", w: 682, h: 1024, pos: "centre" },
  { file: "gear-768", w: 768, h: 1024, pos: "centre" },
  { file: "gear-1200", w: 1200, h: 800, pos: "attention" },
  { file: "gear-1920", w: 1920, h: 1080, pos: "attention" },
  { file: "gear-2560", w: 2560, h: 1440, pos: "attention" },
];

const MASTER_WIDTH = 2560;
const WEBP = { quality: 93, effort: 6, smartSubsample: true };

async function buildMaster() {
  const meta = await sharp(INPUT).metadata();
  const srcW = meta.width ?? MASTER_WIDTH;
  const scale = MASTER_WIDTH / srcW;
  const targetH = Math.round((meta.height ?? 1024) * scale);

  return sharp(INPUT)
    .rotate()
    .resize(MASTER_WIDTH, targetH, {
      fit: "inside",
      withoutEnlargement: false,
      kernel: sharp.kernel.lanczos3,
    })
    .sharpen({ sigma: 0.55, m1: 0.45, m2: 0.25 });
}

await mkdir(OUT, { recursive: true });

const masterBuffer = await (await buildMaster()).toBuffer();
const { width: masterW, height: masterH } = await sharp(masterBuffer).metadata();

await sharp(masterBuffer).webp(WEBP).toFile(path.join(OUT, "gear-native.webp"));
console.log("✓ gear-native.webp", `${masterW}×${masterH}`);

for (const { file, w, h, pos } of VARIANTS) {
  await sharp(masterBuffer)
    .resize(w, h, {
      fit: "cover",
      position: pos,
      kernel: sharp.kernel.lanczos3,
    })
    .webp(WEBP)
    .toFile(path.join(OUT, `${file}.webp`));
  console.log(`✓ ${file}.webp (${w}×${h}, ${pos})`);
}

await sharp(masterBuffer)
  .resize(1920, 1080, { fit: "cover", position: "attention", kernel: sharp.kernel.lanczos3 })
  .webp(WEBP)
  .toFile(path.join(OUT, "gear.webp"));
console.log("✓ gear.webp (1920×1080)");

console.log("Done:", OUT);
