/**
 * Vercel Node functions deploy _libs/*.mjs with bare `import from "tslib"`.
 * Traced node_modules/tslib is not always present at runtime (/var/task).
 * Vendor tslib next to _libs and rewrite imports to a relative .mjs path.
 */
import { access, cp, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const NITRO_JSON = path.join(ROOT, ".vercel", "output", "nitro.json");
const FUNC = path.join(ROOT, ".vercel", "output", "functions", "__server.func");
const VENDORED_TSLIB = path.join(FUNC, "_libs", "tslib.mjs");
const TSLIB_IMPORT_RE = /from\s+(["'])tslib\1/g;

async function main() {
  if (!existsSync(NITRO_JSON)) {
    console.log("patch-vercel-server-bundle: skip (no .vercel/output)");
    return;
  }

  const meta = JSON.parse(await readFile(NITRO_JSON, "utf8"));
  if (meta.preset !== "vercel") {
    console.log(`patch-vercel-server-bundle: skip (preset=${meta.preset})`);
    return;
  }

  if (!existsSync(FUNC)) {
    console.error("patch-vercel-server-bundle: missing __server.func");
    process.exit(1);
  }

  const tslibSrcCandidates = [
    path.join(ROOT, "node_modules", "tslib", "tslib.es6.mjs"),
    path.join(ROOT, "node_modules", "tslib", "modules", "index.js"),
  ];
  let tslibSrc = "";
  for (const candidate of tslibSrcCandidates) {
    try {
      await access(candidate);
      tslibSrc = candidate;
      break;
    } catch {
      /* try next */
    }
  }
  if (!tslibSrc) {
    console.error("patch-vercel-server-bundle: tslib not found — run npm install");
    process.exit(1);
  }

  await mkdir(path.dirname(VENDORED_TSLIB), { recursive: true });
  await cp(tslibSrc, VENDORED_TSLIB);
  console.log(`patch-vercel-server-bundle: vendored ${path.basename(tslibSrc)} → _libs/tslib.mjs`);

  let patched = 0;
  await walkMjs(FUNC, async (file) => {
    if (path.resolve(file) === path.resolve(VENDORED_TSLIB)) return;
    const source = await readFile(file, "utf8");
    if (!/from\s+(["'])tslib\1/.test(source)) return;

    const rel = path.relative(path.dirname(file), VENDORED_TSLIB).replace(/\\/g, "/");
    const relImport = rel.startsWith(".") ? rel : `./${rel}`;
    const updated = source.replace(TSLIB_IMPORT_RE, `from "${relImport}"`);
    await writeFile(file, updated);
    patched += 1;
    console.log(`patch-vercel-server-bundle: ${path.relative(FUNC, file)} → ${relImport}`);
  });

  if (patched === 0) {
    console.warn("patch-vercel-server-bundle: no tslib imports found (already patched?)");
  } else {
    console.log(`patch-vercel-server-bundle: patched ${patched} module(s)`);
  }
}

async function walkMjs(dir, fn) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) await walkMjs(full, fn);
    else if (ent.name.endsWith(".mjs")) await fn(full);
  }
}

await main();
