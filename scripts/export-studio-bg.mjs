/**
 * High-quality export for assets/bg-source/image.png → public/bg/studio-*.webp
 * Upscales to 2560px width (Lanczos3) then derives responsive sizes.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const INPUT = path.join(ROOT, "assets", "bg-source", "image.png");
const OUT = path.join(ROOT, "public", "bg");

const TARGET_WIDTH = 2560;
const WEBP = { quality: 95, effort: 6, smartSubsample: true, alphaQuality: 100 };

const WIDTHS = [768, 1200, 1920, 2560];

async function buildMaster() {
  const meta = await sharp(INPUT).metadata();
  const srcW = meta.width ?? TARGET_WIDTH;
  const scale = TARGET_WIDTH / srcW;
  const targetH = Math.round((meta.height ?? 698) * scale);

  return sharp(INPUT)
    .rotate()
    .ensureAlpha()
    .resize(TARGET_WIDTH, targetH, {
      fit: "inside",
      withoutEnlargement: false,
      kernel: sharp.kernel.lanczos3,
    })
    .sharpen({ sigma: 0.65, m1: 0.5, m2: 0.25 });
}

await mkdir(OUT, { recursive: true });

const masterBuffer = await (await buildMaster()).toBuffer();
const { width: masterW, height: masterH } = await sharp(masterBuffer).metadata();

await sharp(masterBuffer).webp(WEBP).toFile(path.join(OUT, "studio-native.webp"));
console.log("✓ studio-native.webp", `${masterW}×${masterH}`);

for (const w of WIDTHS) {
  const h = Math.max(1, Math.round((masterH * w) / masterW));
  await sharp(masterBuffer)
    .resize(w, h, { fit: "cover", position: "centre", kernel: sharp.kernel.lanczos3 })
    .webp(WEBP)
    .toFile(path.join(OUT, `studio-${w}.webp`));
  console.log(`✓ studio-${w}.webp (${w}×${h})`);
}

console.log("Done:", OUT);
