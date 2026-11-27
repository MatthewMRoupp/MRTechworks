/** Static site route and accessibility audit. Node built-ins only. */
"use strict";
const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict");
const root=path.resolve(__dirname,"..");
const skipped=new Set([".git","node_modules",".next","dist","build"]);
function walk(dir){
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{
    const full=path.join(dir,e.name);
    if(e.isDirectory())return skipped.has(e.name)?[]:walk(full);
    return e.isFile()?[full]:[];
  });
}
const html=walk(root).filter(f=>f.endsWith(".html"));
let count=0;const broken=[],warnings=[];
for(const file of html){
  const doc=fs.readFileSync(file,"utf8");
  const short=path.relative(root,file).replaceAll(path.sep,"/");
  for(const hit of doc.matchAll(/\b(?:href|src|poster)\s*=\s*["'](\/[^"']*)["']/gi)){
    const raw=hit[1];
    if(raw.startsWith("//"))continue;
    const local=raw.split(/[?#]/)[0];
    if(!local)continue;
    let decoded;
    try{decoded=decodeURIComponent(local);}catch{broken.push(short+" -> invalid URL escape "+raw);continue;}
    const rel=decoded==="/"?"index.html":decoded.slice(1);
    const resolved=rel.endsWith("/")?rel+"index.html":rel;
    if(resolved.includes("\0")||resolved.split("/").includes("..")){broken.push(short+" -> unsafe "+raw);continue;}
    let full=path.resolve(root,resolved);
    if(fs.existsSync(full)&&fs.statSync(full).isDirectory())full=path.join(full,"index.html");
    if(!full.startsWith(root+path.sep)||!fs.existsSync(full)){broken.push(short+" -> "+raw);continue;}
    count++;
  }
  for(const img of doc.matchAll(/<img\b[^>]*>/gi)){
    if(!/\balt\s*=/.test(img[0]))warnings.push(short+" -> image without alt attribute");
  }
  if(!/\bname=["']viewport["']/.test(doc))warnings.push(short+" -> viewport meta missing");
  if(!/\bhref=["']#main-content["']/.test(doc)&&short!=="PHOTO_REVIEW.html"&&short!=="home.html")warnings.push(short+" -> skip link missing");
}
console.log("Audited "+html.length+" HTML pages and "+count+" local file links.");
if(warnings.length){console.log("Accessibility warnings ("+warnings.length+"):");for(const w of warnings.slice(0,40))console.log(" - "+w);}
if(broken.length){console.error("Broken local links ("+broken.length+"):");for(const x of broken)console.error(" - "+x);}
assert.equal(broken.length,0,"Repair broken local links before merging");
console.log("PASS: all audited root-relative links point to repository files.");
