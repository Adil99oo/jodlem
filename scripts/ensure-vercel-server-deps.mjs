/**
 * Vercel server chunks import `tslib` as an external. Nitro traces it, but ensure
 * the package exists under the function output before deploy (Linux/CI safety net).
 */
import { access, cp, mkdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const NITRO_JSON = path.join(ROOT, ".vercel", "output", "nitro.json");
const FUNC = path.join(ROOT, ".vercel", "output", "functions", "__server.func");
const DEST = path.join(FUNC, "node_modules", "tslib");
const PKG = path.join(DEST, "package.json");

if (!existsSync(NITRO_JSON)) {
  console.log("ensure-vercel-server-deps: skip (no Vercel build output)");
  process.exit(0);
}

const meta = JSON.parse(await readFile(NITRO_JSON, "utf8"));
if (meta.preset !== "vercel") {
  console.log(`ensure-vercel-server-deps: skip (preset=${meta.preset})`);
  process.exit(0);
}

if (!existsSync(FUNC)) {
  console.log("ensure-vercel-server-deps: skip (missing __server.func)");
  process.exit(0);
}

try {
  await access(PKG);
  console.log("ensure-vercel-server-deps: tslib already in server bundle");
  process.exit(0);
} catch {
  /* copy below */
}

const src = path.join(ROOT, "node_modules", "tslib");
try {
  await access(path.join(src, "package.json"));
} catch {
  console.error("ensure-vercel-server-deps: tslib missing from node_modules — run npm install");
  process.exit(1);
}

await mkdir(path.dirname(DEST), { recursive: true });
await cp(src, DEST, { recursive: true });
console.log("ensure-vercel-server-deps: copied tslib into __server.func");
