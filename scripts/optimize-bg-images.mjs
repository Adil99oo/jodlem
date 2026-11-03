import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public", "bg");

const ASSETS = path.join(ROOT, "assets", "bg-source");

const sources = [
  {
    name: "hero-back",
    file: "c__Users_Adil_AppData_Roaming_Cursor_User_workspaceStorage_2735500e1a6393f9c92d84bbc22780c5_images_5359cc29a70e9e1061b6c4326668df06-dc0bf541-51c9-4aa4-a5ed-6a3042c4dcda.jpg",
    variants: [
      { w: 640, h: 960, pos: "centre" },
      { w: 1024, h: 576, pos: "centre" },
      { w: 1920, h: 1080, pos: "centre" },
      { w: 2560, h: 1440, pos: "centre" },
    ],
  },
  {
    name: "packages-barbell",
    file: "c__Users_Adil_AppData_Roaming_Cursor_User_workspaceStorage_2735500e1a6393f9c92d84bbc22780c5_images_150a371ac7c8332b0cc9ddb197b42ed0-207aa602-f5cb-4592-83ee-7d31f9e9d794.jpg",
    variants: [
      { w: 640, h: 900, pos: "centre" },
      { w: 1024, h: 640, pos: "bottom" },
      { w: 1920, h: 900, pos: "bottom" },
    ],
  },
  {
    name: "shop-gear",
    file: "c__Users_Adil_AppData_Roaming_Cursor_User_workspaceStorage_2735500e1a6393f9c92d84bbc22780c5_images_7903da0166d2c1d39ce9e4300137ac21-a7ea95fc-ee27-411a-9003-d9217be50b84.jpg",
    variants: [
      { w: 640, h: 800, pos: "centre" },
      { w: 1024, h: 768, pos: "centre" },
      { w: 1920, h: 1080, pos: "centre" },
    ],
  },
  {
    name: "why-wraps",
    file: "c__Users_Adil_AppData_Roaming_Cursor_User_workspaceStorage_2735500e1a6393f9c92d84bbc22780c5_images_4966e237ea4c342066d891e4a172b4bb-f89cc6fa-c8ee-4d07-8778-90d69f385d82.jpg",
    variants: [
      { w: 640, h: 900, pos: "centre" },
      { w: 1024, h: 720, pos: "centre" },
      { w: 1920, h: 1080, pos: "centre" },
    ],
  },
  {
    name: "testimonials-gym",
    file: "c__Users_Adil_AppData_Roaming_Cursor_User_workspaceStorage_2735500e1a6393f9c92d84bbc22780c5_images_c86e82ad63a90d798868567c8cb8e12a-74f36e2d-781b-49f6-9657-80911ee15501.jpg",
    variants: [
      { w: 640, h: 900, pos: "top" },
      { w: 1024, h: 720, pos: "top" },
      { w: 1920, h: 1080, pos: "top" },
    ],
  },
];

async function exportVariant(input, outBase, { w, h, pos }) {
  const pipeline = sharp(input)
    .rotate()
    .resize(w, h, { fit: "cover", position: pos })
    .sharpen({ sigma: 0.8, m1: 0.5, m2: 0.35 });

  await pipeline.clone().webp({ quality: 88, effort: 6 }).toFile(`${outBase}-${w}.webp`);
  await pipeline.clone().jpeg({ quality: 88, mozjpeg: true }).toFile(`${outBase}-${w}.jpg`);
}

await mkdir(OUT, { recursive: true });

for (const src of sources) {
  const input = path.join(ASSETS, src.file);
  const outBase = path.join(OUT, src.name);
  for (const v of src.variants) {
    await exportVariant(input, outBase, v);
    console.log(`✓ ${src.name}-${v.w}`);
  }
}

console.log("Done:", OUT);
