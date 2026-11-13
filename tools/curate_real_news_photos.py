#!/usr/bin/env python3
"""Correct two mis-matched Commons search photos; keep 99 real photos with rights."""
import csv
import hashlib
import json
from pathlib import Path
import shutil
import sys
import zipfile

import requests
sys.path.insert(0, str(Path(__file__).parent))
import build_real_news_photos as lib

IMAGE_ROOT = Path("assets/images/article-library/real-photos")
REAL_INDEX = Path("assets/data/real-news-photo-credits.json")
GLOBAL_INDEX = Path("assets/data/image-credits.json")
REPLACEMENTS = [
    # The first run accidentally classified a steam locomotive as a Steam Machine.
    ("news-photo-steam-machine-02.webp",
     "news-photo-steam-machine-historic-01.webp",
     "SteamMachine.jpg", "Gaming / Steam",
     "A historic Steam Machine gaming computer, not the 2026 Valve Steam Machine"),
    # The first run mistakenly downloaded a video screenshot instead of an RTX GPU photograph.
    ("news-photo-nvidia-gpu-03.webp",
     "news-photo-nvidia-rtx-4090-01.webp",
     "Asus Strix RTX 4090.jpg", "NVIDIA / Hardware",
     "Actual NVIDIA GeForce RTX 4090 graphics-card hardware"),
]
RENAMES = [
    ("news-photo-steam-machine-01.webp", "news-photo-steam-machine-gigabyte-historic-01.webp",
     "Gaming / Steam", "Earlier Gigabyte Steam Machine prototype, not the 2026 model"),
    ("news-photo-steam-controller-01.webp", "news-photo-valve-office-01.webp",
     "Gaming / Valve", "Controller exhibit at Valve's office; not a product-only photograph"),
    ("news-photo-steam-controller-02.webp", "news-photo-valve-office-02.webp",
     "Gaming / Valve", "Cropped controller exhibit at Valve's office"),
    ("news-photo-xbox-series-x-02.webp", "news-photo-xbox-series-s-controller-01.webp",
     "Gaming / Xbox", "Xbox Series S controller, not an Xbox Series X console"),
    ("news-photo-ps4-console-02.webp", "news-photo-playstation-classic-01.webp",
     "Gaming / PlayStation", "Original PlayStation Classic mini console, not PS4"),
    ("news-photo-nintendo-switch-02.webp", "news-photo-switch-2-rear-01.webp",
     "Gaming / Nintendo", "Nintendo Switch 2 rear hardware view, not original Switch"),
    ("news-photo-motherboards-01.webp", "news-photo-echo-dot-motherboard-01.webp",
     "Smart Home / Electronics", "Amazon Echo Dot motherboard and internal electronics"),
    ("news-photo-gaming-headset-02.webp", "news-photo-gaming-event-01.webp",
     "Gaming / Events", "Gamers at a public gaming event, not a headset product-only photo"),
    ("news-photo-ps5-console-03.webp", "news-photo-playstation-generations-01.webp",
     "Gaming / PlayStation", "Photograph comparing PlayStation console generations"),
]

def load_json(path):
    return json.loads(path.read_text(encoding="utf-8"))

def save_json(path,obj):
    path.write_text(json.dumps(obj,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")

def find(entries,name):
    for e in entries:
        if e["filename"] == name:
            return e
    raise ValueError(f"Missing expected catalog entry {name}")

def update_entry_name(entry, name, category, summary):
    entry["filename"] = name
    entry["path"] = "/assets/images/article-library/real-photos/" + name
    entry["category"] = category
    entry["subject"] = summary
    entry["alt"] = summary + " — actual photograph"
    entry["editorialReviewRequired"] = True

def curated_zip(real):
    root=Path("curated-photo-output")
    images=root/"assets/images/article-library/real-photos"
    images.mkdir(parents=True,exist_ok=True)
    shutil.copytree(IMAGE_ROOT,images,dirs_exist_ok=True)
    data_dir=root/"assets/data"
    data_dir.mkdir(parents=True,exist_ok=True)
    shutil.copy2(REAL_INDEX,data_dir/REAL_INDEX.name)
    shutil.copy2(GLOBAL_INDEX,data_dir/GLOBAL_INDEX.name)
    for p in ("NEWS_PHOTO_CREDITS.csv","NEWS_PHOTO_RIGHTS.md","PHOTO_REVIEW.html"):
        shutil.copy2(p,root/p)
    file=root/"MRTechworks_99_Curated_Real_News_Photos.zip"
    with zipfile.ZipFile(file,"w",compression=zipfile.ZIP_DEFLATED,compresslevel=5) as z:
        for p in root.rglob("*"):
            if p.is_file() and p!=file:
                z.write(p,arcname=p.relative_to(root))
    with zipfile.ZipFile(file) as z:
        if z.testzip(): raise ValueError("ZIP checksum problem")
        if sum(x.endswith(".webp") for x in z.namelist())!=99:
            raise ValueError("Missing photos in ZIP")
    return file

def main():
    if not IMAGE_ROOT.is_dir():
        raise ValueError("Use staged photo branch containing the 99 real images")
    real=load_json(REAL_INDEX)
    global_credits=load_json(GLOBAL_INDEX)
    entries=real["entries"]
    if len(entries)!=99: raise ValueError("Expected 99 staged photographs")
    global_map={x["path"]:x for x in global_credits["entries"]}
    session=requests.Session()
    session.headers.update({"User-Agent":lib.USER_AGENT})
    # Re-download from precisely named Commons pages, checking the same strict whitelist.
    for old,new,title,category,summary in REPLACEMENTS:
        params={
            "action":"query","prop":"imageinfo","iiprop":"url|size|mime|extmetadata",
            "iiurlwidth":1480,"titles":"File:"+title,
            "format":"json","formatversion":2,
        }
        response=lib.request_json(session,params)
        pages=((response or {}).get("query") or {}).get("pages") or []
        if not pages: raise ValueError("Missing Commons source: "+title)
        photo=lib.validate_file(pages[0])
        if not photo: raise ValueError("Source did not pass CC license / real photo check: "+title)
        raw=lib.download_image(session,photo["photoUrl"])
        if not raw: raise ValueError("Could not download licensed photo: "+title)
        converted=lib.photo_to_webp(raw)
        if not converted: raise ValueError("Image decoding failed: "+title)
        data,modified=converted
        fingerprint=hashlib.sha256(data).hexdigest()
        entry=find(entries,old)
        old_path=entry["path"]
        old_file=IMAGE_ROOT/old
        if not old_file.is_file(): raise ValueError("Old image missing: "+old)
        (IMAGE_ROOT/new).write_bytes(data)
        old_file.unlink()
        update_entry_name(entry,new,category,summary)
        entry.update({
            "title": photo["title"].rsplit(".",1)[0].replace("_"," "),
            "creditTo":photo["creditTo"],
            "creditLine":f'Photo: {photo["creditTo"]} / Wikimedia Commons ({photo["license"]}; resized for MR Techworks)',
            "license":photo["license"],
            "licenseUrl":photo["licenseUrl"],
            "derivativeLicense":photo["license"],
            "sourceUrl":photo["sourceUrl"],
            "sourceOriginal":photo["photoUrl"],
            "modified":modified,
            "sha256":fingerprint,
            "sourceDimensions":[photo["width"],photo["height"]],
        })
        global_map.pop(old_path,None)
        global_map[entry["path"]]=entry
        print("Replaced mismatched search result",old,"with",new,entry["sourceUrl"],flush=True)
    for old,new,category,summary in RENAMES:
        entry=find(entries,old)
        old_path=entry["path"]
        src=IMAGE_ROOT/old
        if not src.is_file():raise ValueError("Image missing: "+old)
        src.rename(IMAGE_ROOT/new)
        update_entry_name(entry,new,category,summary)
        global_map.pop(old_path,None)
        global_map[entry["path"]]=entry
        print("Relabeled ambiguous source",old,"as",new,flush=True)

    paths=[e["path"] for e in entries]
    sources=[e["sourceUrl"] for e in entries]
    if len(paths)!=99 or len(set(paths))!=99 or len(set(sources))!=99:raise ValueError("Duplicate photo/source")
    if len(list(IMAGE_ROOT.glob("*.webp")))!=99:raise ValueError("Unexpected photo count")
    for e in entries:
        f=IMAGE_ROOT/e["filename"]
        if hashlib.sha256(f.read_bytes()).hexdigest()!=e["sha256"]:raise ValueError("Image SHA mismatch "+str(f))
        if not e.get("creditTo") or not e.get("license") or not e.get("licenseUrl") or not e.get("sourceUrl"):
            raise ValueError("Incomplete copyright metadata: "+str(f))
    save_json(REAL_INDEX,real)
    global_credits["entries"]=list(global_map.values())
    save_json(GLOBAL_INDEX,global_credits)
    columns=["filename","path","category","subject","creditTo","license","licenseUrl","sourceUrl","modified","sha256"]
    with open("NEWS_PHOTO_CREDITS.csv","w",newline="",encoding="utf-8-sig") as fh:
        writer=csv.DictWriter(fh,fieldnames=columns,extrasaction="ignore")
        writer.writeheader();writer.writerows(entries)
    # Rebuild gallery with corrected filenames, no broken images.
    lib.assemble_gallery(entries,Path("."))
    Path("NEWS_PHOTO_RIGHTS.md").write_text(
        "# MR Techworks real photograph reuse\n\n"
        "Contains 99 actual photos, machine-checked at download time against CC0, CC BY and CC BY-SA. "
        "Individual creator, source and original license are in NEWS_PHOTO_CREDITS.csv. "
        "Copyright and trademark rights of other content depicted in the photos may remain. "
        "For CC BY-SA adaptations, distribute the adapted photographs on the same license, "
        "include author/source/license links and state that the image was resized/cropped. "
        "Photographs must be visually reviewed for accurate product identity before placement in an article.\n"
        "Eleven misleading filenames were corrected and two unrelated/mistaken results were replaced.\n",
        encoding="utf-8")
    path=curated_zip(real)
    print(f"COMPLETE: 99 actual curated photographs; bundle={path} bytes={path.stat().st_size}",flush=True)

if __name__=="__main__":
    main()
