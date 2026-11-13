/**
 * Regression test: article cards must keep their intended image URLs.
 * Run from the repository root: node tests/verify-article-covers.cjs
 * Uses only Node built-ins, no npm install needed.
 */
"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const load = name => fs.readFileSync(path.join(root, name), "utf8");
const context = {window: {}};
vm.runInNewContext(load("assets/js/article-data.js"), context);
vm.runInNewContext(load("assets/js/library-data.js"), context);

// Exercise the ACTUAL card validator, not a separately maintained copy.
const validatorMatch = load("assets/js/articles.js")
  .match(/const validImage = url =>[\s\S]*?\.test\(url\);/);
assert.ok(validatorMatch, "Article Library image validator must exist");
const validImage = vm.runInNewContext(
  "(() => { " + validatorMatch[0] + " return validImage; })()", {}
);

const helpGuides = context.window.MRTECHWORKS_ARTICLES;
const newArticles = context.window.MRTECHWORKS_LIBRARY_EXTRA;
assert.ok(Array.isArray(helpGuides) && helpGuides.length >= 13, "Help guide data missing");
assert.ok(Array.isArray(newArticles) && newArticles.length >= 14, "New article data missing");

const all = [
  ...helpGuides.map(x => ({title:x.title,href:"/articles/"+x.id+"/",image:x.image,alt:x.imageAlt})),
  ...newArticles.map(x => ({title:x.title,href:x.href,image:x.image,alt:x.imageAlt}))
];
for (const article of all) {
  assert.ok(article.image, article.title + ": image missing");
  assert.ok(validImage(article.image), article.title + ": image rejected by card renderer: " + article.image);
  assert.ok(fs.existsSync(path.join(root, article.image.replace(/^\//,""))),
    article.title + ": image file doesn't exist: " + article.image);
  assert.ok(fs.existsSync(path.join(root, article.href.replace(/^\//,""), "index.html")),
    article.title + ": linked page doesn't exist: " + article.href);
  assert.ok(typeof article.alt === "string" && article.alt.trim(),
    article.title + ": descriptive alt text missing");
}

// Every published news/standalone entry should have its own cover.
assert.equal(new Set(newArticles.map(x => x.image)).size, newArticles.length,
  "News and standalone guide covers must not repeat");
assert.ok(!validImage("/assets/images/../secret.webp"), "Path traversal must be rejected");
assert.ok(!validImage("https://example.com/photo.webp"), "Remote URLs must be rejected");

console.log("PASS: " + all.length + " article covers, page paths and alt text verified.");
