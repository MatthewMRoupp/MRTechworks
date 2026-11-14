/** Validates all catalog images resolve and media do not clutter the root.
 * Run: node tests/verify-asset-library.cjs
 */
"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const catalogFile = path.join(root, "assets/data/image-credits.json");
const catalog = JSON.parse(fs.readFileSync(catalogFile, "utf8"));
assert.ok(Array.isArray(catalog.entries), "Missing image credit entries");
const paths = new Set();
for (const entry of catalog.entries) {
  assert.ok(typeof entry.path === "string" && entry.path.startsWith("/assets/images/"),
    "Image catalog path must be under /assets/images/: " + entry.filename);
  assert.ok(!entry.path.includes(".."), "Unsafe catalog image path: " + entry.path);
  assert.ok(!paths.has(entry.path), "Duplicate image catalog path: " + entry.path);
  paths.add(entry.path);
  const full = path.join(root, entry.path.replace(/^\//, ""));
  assert.ok(fs.existsSync(full) && fs.statSync(full).isFile(),
    "Credited image is missing: " + entry.path);
}
const rootMedia = fs.readdirSync(root, { withFileTypes: true })
  .filter(item => item.isFile() && /\.(?:png|jpe?g|gif|webp|svg|avif)$/i.test(item.name))
  .map(item => item.name);
assert.deepEqual(rootMedia, [], "Move image files from the root into assets/images/: " + rootMedia.join(", "));
assert.ok(fs.existsSync(path.join(root, "index.html")), "Homepage index.html is missing");
assert.ok(fs.existsSync(path.join(root, "CNAME")), "GitHub Pages CNAME is missing");
console.log("PASS: " + catalog.entries.length + " image-credit paths exist; root is clear of image files.");
