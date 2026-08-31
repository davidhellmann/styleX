import assert from "node:assert/strict";
import { mkdtemp, readdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { build } from "vite";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

async function buildProductionCss(testContext) {
  const outDir = await mkdtemp(join(tmpdir(), "stylex-contract-"));
  testContext.after(() => rm(outDir, { force: true, recursive: true }));

  await build({
    root: projectRoot,
    logLevel: "silent",
    build: { emptyOutDir: true, outDir },
  });

  const assetNames = await readdir(join(outDir, "assets"));
  const cssAssetNames = assetNames.filter((assetName) => assetName.endsWith(".css"));
  assert.equal(cssAssetNames.length, 1, "expected exactly one production CSS asset");

  return readFile(join(outDir, "assets", cssAssetNames[0]), "utf8");
}

test("production CSS registers the documented Cascade order", async (testContext) => {
  const css = await buildProductionCss(testContext);
  const registeredLayers = [];

  for (const match of css.matchAll(/@layer\s+([^;{]+)[;{]/g)) {
    for (const layerName of match[1].split(",").map((name) => name.trim())) {
      if (!registeredLayers.includes(layerName)) registeredLayers.push(layerName);
    }
  }

  assert.deepEqual(registeredLayers, [
    "reset",
    "tokens",
    "themes",
    "base",
    "priority1",
    "priority2",
    "priority3",
    "priority4",
    "priority5",
    "utilities",
  ]);
});

test("production CSS consumes Foundation variables without a generated alias namespace", async (testContext) => {
  const css = await buildProductionCss(testContext);

  assert.doesNotMatch(css, /--x[\da-z]+:/);
  assert.match(css, /gap:\s*var\(--space-md\)/);
});

test("production CSS includes the loading-spinner animation", async (testContext) => {
  const css = await buildProductionCss(testContext);

  assert.match(css, /animation-name:\s*foundation-spin/);
  assert.match(css, /animation-duration:\s*(?:\.8s|800ms)/);
  assert.match(css, /animation-iteration-count:\s*infinite/);
  assert.match(css, /animation-timing-function:\s*linear/);
});
