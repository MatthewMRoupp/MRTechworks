#!/usr/bin/env python3
"""Find, license-check and package up to 99 REAL Wikimedia Commons photographs.

Never treats attribution as permission: only explicitly permitted Creative Commons
licenses are accepted; unknown, NC, ND, trademark-only or press-only terms are
rejected. Requires network access on the machine running it.
"""
from __future__ import annotations

import argparse
import csv
import datetime
import hashlib
import html
from html.parser import HTMLParser
import io
import json
import os
from pathlib import Path
import re
import sys
import time
from urllib.parse import quote, urlparse
import zipfile

import requests
from PIL import Image, ImageOps, ImageFilter, ImageDraw, ImageFont

COMMONS_API = "https://commons.wikimedia.org/w/api.php"
USER_AGENT = "MRTechworksEditorialAssetResearch/1.0 (https://mrtechworks.com/contact/; license-compliant photography collection)"
TARGET = 99
MAX_SOURCE_BYTES = 16 * 1024 * 1024
IMAGE_DIMS = (1280, 720)
# slug, search phrase, desired count, editorial section
TOPICS = [
 ("xbox-series-x", "Xbox Series X console", 3, "Gaming / Xbox"),
 ("xbox-series-s", "Xbox Series S console", 2, "Gaming / Xbox"),
 ("xbox-controller", "Xbox wireless controller", 3, "Gaming / Xbox"),
 ("xbox-one", "Xbox One console", 2, "Gaming / Xbox"),
 ("xbox-360", "Xbox 360 console", 2, "Gaming / Xbox"),
 ("ps5-console", "PlayStation 5 console", 3, "Gaming / PlayStation"),
 ("ps5-controller", "DualSense controller PlayStation 5", 2, "Gaming / PlayStation"),
 ("playstation-portal", "PlayStation Portal handheld", 2, "Gaming / PlayStation"),
 ("ps4-console", "PlayStation 4 console", 2, "Gaming / PlayStation"),
 ("nintendo-switch-2", "Nintendo Switch 2 console", 3, "Gaming / Nintendo"),
 ("nintendo-switch", "Nintendo Switch console", 3, "Gaming / Nintendo"),
 ("nintendo-controller", "Nintendo Switch Joy Con controller", 2, "Gaming / Nintendo"),
 ("steam-deck", "Steam Deck handheld", 3, "Gaming / Steam"),
 ("steam-machine", "Steam Machine Valve console", 2, "Gaming / Steam"),
 ("steam-controller", "Steam Controller Valve", 2, "Gaming / Steam"),
 ("gamepad-controllers", "video game controllers gaming", 1, "Gaming / Accessories"),
 ("gaming-tournament", "gaming LAN party esports", 2, "Gaming / Events"),
 ("gaming-pc", "gaming desktop PC RGB", 3, "Gaming / PC"),
 ("gaming-keyboard", "mechanical gaming keyboard", 2, "Gaming / PC"),
 ("gaming-headset", "gaming headset headphones", 2, "Gaming / PC"),
 ("microsoft-surface", "Microsoft Surface laptop", 3, "Microsoft / Hardware"),
 ("microsoft-office", "Microsoft campus Redmond", 2, "Microsoft / Company"),
 ("windows-computer", "Windows laptop computer", 2, "Microsoft / Windows"),
 ("apple-macbook", "Apple MacBook laptop", 2, "Apple / Hardware"),
 ("apple-mac-mini", "Apple Mac mini", 1, "Apple / Hardware"),
 ("nvidia-gpu", "Nvidia GeForce graphics card", 3, "NVIDIA / Hardware"),
 ("amd-processor", "AMD Ryzen processor", 2, "AMD / Hardware"),
 ("intel-processor", "Intel Core processor", 2, "Intel / Hardware"),
 ("motherboards", "computer motherboard electronics", 3, "Components / PC"),
 ("nvme-ssd", "NVMe solid state drive", 3, "Components / Storage"),
 ("hard-drive", "hard disk drive storage", 2, "Components / Storage"),
 ("laptop-repair", "laptop computer repair", 3, "Tech Support / Repair"),
 ("pc-assembly", "assembling computer motherboard", 2, "Tech Support / Repair"),
 ("external-backup", "external hard drive backup", 2, "Data / Backups"),
 ("wifi-router", "wireless router WiFi", 3, "Networking / Wi-Fi"),
 ("wifi-access-point", "wireless access point UniFi", 2, "Networking / Wi-Fi"),
 ("ethernet", "ethernet network cables", 1, "Networking / Ethernet"),
 ("network-server", "server rack data center", 3, "Infrastructure / Servers"),
 ("cybersecurity", "cybersecurity hardware token YubiKey", 2, "Cybersecurity / Authentication"),
 ("usb-technology", "USB C docking station", 1, "Peripherals / USB"),
 ("printers", "office laser printer", 2, "Business IT / Printing"),
 ("recycling", "computer electronics recycling", 2, "Sustainability / Recycling"),
 ("hp-laptop", "HP laptop computer", 1, "Brands / HP"),
 ("dell-laptop", "Dell laptop computer", 2, "Brands / Dell"),
 ("lenovo-thinkpad", "Lenovo ThinkPad laptop", 2, "Brands / Lenovo"),
]
assert sum(target for _, _, target, _ in TOPICS) == TARGET

# Individually identified Wikimedia Commons source pages from the earlier news
# photography research; still recheck original metadata before downloading.
EXACT_SEEDS = [
 ("Steam machine front.jpg", "steam-machine-front", "Gaming / Steam"),
 ("Steam machine back.jpg", "steam-machine-rear", "Gaming / Steam"),
 ("Xbox Series X (July 8, 2026).jpg", "xbox-series-x-2026", "Gaming / Xbox"),
 ("Xbox Series S (July 8, 2026).jpg", "xbox-series-s-2026", "Gaming / Xbox"),
 ("Playstation 5.jpg", "playstation-5", "Gaming / PlayStation"),
 ("Playstation 5 DualSense controller in Midnight Black, 2026-02-07 (front).jpg", "dualsense-2026", "Gaming / PlayStation"),
 ("PlayStation Portal.jpg", "playstation-portal", "Gaming / PlayStation"),
 ("Nintendo Switch 2 console in handheld mode.png", "switch-2-handheld", "Gaming / Nintendo"),
 ("Nintendo Switch 2 release in NYC 184.jpg", "switch-2-launch", "Gaming / Nintendo"),
 ("Steam Deck OLED framsida hemskärm.jpg", "steam-deck-oled", "Gaming / Steam"),
 ("Steam Frame front 1.jpg", "steam-frame", "Gaming / Steam"),
 ("InclusiveGameLab Current Console Generation CC-BY-SA.jpg", "console-comparison", "Gaming / Comparison"),
 ("Nintendo Switch 2 release in NYC 59.jpg", "switch-2-launch-event", "Gaming / Nintendo"),
]

# Additional searches can fill topical gaps; never relabel images as the item
# in the desired category if the source filename clearly portrays another device.
FALLBACKS = [
 ("gaming-pc", "Gaming computer case", "Gaming / PC"),
 ("gaming-tournament", "Video game convention LAN", "Gaming / Events"),
 ("nintendo-switch-2", "Nintendo Switch 2", "Gaming / Nintendo"),
 ("ps5-console", "Sony PlayStation 5", "Gaming / PlayStation"),
 ("xbox-series-x", "Xbox Series X", "Gaming / Xbox"),
 ("steam-deck", "Valve Steam Deck", "Gaming / Steam"),
 ("nvidia-gpu", "GeForce RTX graphics card", "NVIDIA / Hardware"),
 ("nvme-ssd", "M.2 solid state drive", "Components / Storage"),
 ("pc-assembly", "PC building computer parts", "Tech Support / Repair"),
 ("wifi-router", "Wi-Fi router wireless", "Networking / Wi-Fi"),
 ("network-server", "Data center racks", "Infrastructure / Servers"),
 ("microsoft-surface", "Microsoft Surface Pro tablet", "Microsoft / Hardware"),
 ("motherboards", "Computer motherboard", "Components / PC"),
 ("laptop-repair", "Computer technician repairing laptop", "Tech Support / Repair"),
 ("apple-macbook", "Apple MacBook Pro laptop", "Apple / Hardware"),
 ("gaming-pc", "Desktop gaming computer", "Gaming / PC"),
 ("xbox-controller", "Xbox gamepad", "Gaming / Xbox"),
 ("nintendo-switch", "Nintendo Switch handheld", "Gaming / Nintendo"),
 ("ps4-console", "PlayStation 4", "Gaming / PlayStation"),
 ("steam-controller", "Valve Steam Controller", "Gaming / Steam"),
 ("ethernet", "Ethernet cable", "Networking / Ethernet"),
 ("external-backup", "External hard disk", "Data / Backups"),
 ("intel-processor", "Intel processor motherboard", "Intel / Hardware"),
 ("amd-processor", "AMD processor computer", "AMD / Hardware"),
 ("lenovo-thinkpad", "Lenovo ThinkPad notebook", "Brands / Lenovo"),
 ("recycling", "E-waste computer recycling", "Sustainability / Recycling"),
]
# Exclude unlicensed artwork, software screenshots, logos and marketing renders.
BANNED_FILENAME_TERMS = (
 "logo", "screenshot", "screen shot", "artwork", "wallpaper", "illustration",
 "vector", "rendering", "render.", "diagram", "poster", "cover art",
 "gameplay", "title screen", "boxart", "box art", "icon", "emblem",
)
ACCEPTABLE_LICENSE = re.compile(r"^(CC BY(?:-SA)? (?:2\.0|2\.5|3\.0|4\.0)|CC0 1\.0)$", re.I)
SAFE_LICENSE_URL = re.compile(r"^https://creativecommons\.org/(?:licenses/(?:by|by-sa)/(?:2\.0|2\.5|3\.0|4\.0)|publicdomain/zero/1\.0)(?:/|$)", re.I)
PHOTO_EXTENSIONS = (".jpg", ".jpeg", ".png", ".webp")

class HTMLToText(HTMLParser):
    def __init__(self):
        super().__init__()
        self.parts = []
    def handle_data(self, value):
        self.parts.append(value)

def clean_html(value):
    reader = HTMLToText()
    reader.feed(html.unescape(str(value or "")))
    return " ".join(html.unescape(" ".join(reader.parts)).split())

def metadata_value(metadata, key):
    return clean_html(metadata.get(key, {}).get("value", ""))

def normalize_license(value, url):
    label = " ".join(value.split()).replace("Creative Commons ", "").strip()
    url = str(url or "").replace("http://", "https://")
    # Commons legitimately reports "CC0" and omits trailing URL slashes.
    # Verify the explicit public-domain dedication URL, not the label alone.
    if label.upper() == "CC0" and "/publicdomain/zero/1.0" in url:
        label = "CC0 1.0"
    if not ACCEPTABLE_LICENSE.fullmatch(label):
        return None
    if not SAFE_LICENSE_URL.match(url):
        return None
    return label, url

_license_debug_count = 0

def validate_file(page):
    global _license_debug_count
    title = page.get("title", "")
    if _license_debug_count < 15:
        sample = (page.get("imageinfo") or [None])[0] or {}
        meta = sample.get("extmetadata") or {}
        print("LICENSE_DIAGNOSTIC", json.dumps({
            "title": title,
            "mime": sample.get("mime"),
            "dimensions": [sample.get("width"), sample.get("height")],
            "licenseShortName": (meta.get("LicenseShortName") or {}).get("value"),
            "licenseUrl": (meta.get("LicenseUrl") or {}).get("value"),
            "artist": str((meta.get("Artist") or {}).get("value",""))[:100]
        },ensure_ascii=False),flush=True)
        _license_debug_count += 1
    file_name = title.removeprefix("File:")
    low = file_name.lower().replace("_", " ")
    if not low.endswith(PHOTO_EXTENSIONS):
        return None
    if any(term in low for term in BANNED_FILENAME_TERMS):
        return None
    info = (page.get("imageinfo") or [None])[0]
    if not info or info.get("mime") not in ("image/jpeg", "image/png", "image/webp"):
        return None
    width, height = int(info.get("width", 0)), int(info.get("height", 0))
    if width < 850 or height < 400:
        return None
    data = info.get("extmetadata") or {}
    license_pair = normalize_license(metadata_value(data, "LicenseShortName"),
                                     metadata_value(data, "LicenseUrl"))
    if not license_pair:
        return None
    artist = metadata_value(data, "Artist") or metadata_value(data, "Attribution")
    artist = artist[:180].strip()
    if not artist or artist.lower() in ("unknown", "anonymous", "own work"):
        return None
    image_url = info.get("thumburl") or info.get("url") or ""
    uri = urlparse(image_url)
    if uri.scheme != "https" or uri.hostname not in ("upload.wikimedia.org", "thumb.wikimedia.org"):
        return None
    source_url = info.get("descriptionurl") or "https://commons.wikimedia.org/wiki/" + quote(title.replace(" ", "_"), safe=":_()")
    return {
        "title": file_name, "sourceUrl": source_url, "photoUrl": image_url,
        "creditTo": artist, "license": license_pair[0],
        "licenseUrl": license_pair[1], "width": width, "height": height,
        "mime": info.get("mime")
    }

def request_json(session, params, attempts=3):
    for attempt in range(attempts):
        try:
            r = session.get(COMMONS_API, params=params, timeout=35)
            if r.status_code == 429 or r.status_code >= 500:
                time.sleep(3 + attempt * 5)
                continue
            r.raise_for_status()
            return r.json()
        except (requests.RequestException, ValueError) as exc:
            print(f"API retry {attempt+1}/{attempts}: {exc}", file=sys.stderr)
            time.sleep(2 + attempt * 4)
    return None

def search_pages(session, query, limit=38):
    params = {
        "action": "query", "generator": "search", "gsrsearch": query,
        "gsrnamespace": 6, "gsrlimit": limit,
        "prop": "imageinfo", "iiprop": "url|size|mime|extmetadata",
        "iiurlwidth": 1480, "format": "json", "formatversion": 2,
    }
    response = request_json(session, params)
    if not response:
        return []
    pages = (response.get("query") or {}).get("pages") or []
    pages.sort(key=lambda p: p.get("index", 99999))
    return pages

def download_image(session, url):
    try:
        with session.get(url, timeout=45, stream=True) as response:
            response.raise_for_status()
            if "image/" not in response.headers.get("content-type", ""):
                return None
            data = bytearray()
            for piece in response.iter_content(chunk_size=128 * 1024):
                data.extend(piece)
                if len(data) > MAX_SOURCE_BYTES:
                    return None
        return bytes(data)
    except requests.RequestException as exc:
        print(f"  image download failed: {exc}", file=sys.stderr)
        return None

def photo_to_webp(raw):
    try:
        with Image.open(io.BytesIO(raw)) as opened:
            if opened.format not in ("JPEG", "PNG", "WEBP"):
                return None
            img = ImageOps.exif_transpose(opened).convert("RGB")
            if img.width < 800 or img.height < 380:
                return None
            # Use a blurred background for portrait photographs, retaining the
            # original hardware rather than crop away meaningful features.
            ratio = img.width / img.height
            if 1.25 <= ratio <= 2.5:
                finished = ImageOps.fit(img, IMAGE_DIMS, method=Image.Resampling.LANCZOS)
                modification = "Resized and cropped to 1280×720 WebP"
            else:
                base = ImageOps.fit(img, IMAGE_DIMS).filter(ImageFilter.GaussianBlur(20))
                foreground = ImageOps.contain(img, IMAGE_DIMS, method=Image.Resampling.LANCZOS)
                base.paste(foreground, ((1280 - foreground.width)//2, (720 - foreground.height)//2))
                finished = base
                modification = "Resized and padded to 1280×720 WebP with a blurred copy of the original"
            output = io.BytesIO()
            finished.save(output, format="WEBP", quality=83, method=6)
            return output.getvalue(), modification
    except Exception as exc:
        print(f"  invalid image: {exc}", file=sys.stderr)
        return None

def assemble_gallery(records, root):
    # Local preview only; never assume all source photos have been editorially reviewed.
    tiles = []
    for item in records:
        rel = item["path"].lstrip("/")
        tiles.append(
            '<figure><img src="' + html.escape(rel, quote=True) + '" loading="lazy" '
            'alt="' + html.escape(item["alt"], quote=True) + '"><figcaption>'
            + html.escape(item["category"] + " · " + item["creditTo"] + " · " + item["license"])
            + '<p><a href="' + html.escape(item["sourceUrl"], quote=True) + '">Original and license</a></p>'
            + '</figcaption></figure>'
        )
    page = """<!doctype html><html lang="en"><meta charset="utf-8"><title>Real News Photography Review</title>
    <style>body{background:#091b2d;color:#ecf4ff;font:15px system-ui;margin:2rem}h1{font-size:1.5rem}
    main{display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:15px}
    figure{border:1px solid #29465c;border-radius:12px;overflow:hidden;margin:0}
    img{width:100%;aspect-ratio:16/9;object-fit:cover}figcaption{padding:12px}
    a{color:#8ad0ff}p{margin:.4rem 0 0}</style>
    <h1>MR Techworks — real photographs for editorial review</h1>
    <p>Photos were license-filtered but must be visually checked for subject accuracy and embedded third-party copyrights before publication.</p>
    <main>""" + "\n".join(tiles) + "</main></html>"
    (root / "PHOTO_REVIEW.html").write_text(page, encoding="utf-8")

def build(out_dir, target):
    out_dir = Path(out_dir)
    photo_dir = out_dir / "assets/images/article-library/real-photos"
    data_dir = out_dir / "assets/data"
    photo_dir.mkdir(parents=True, exist_ok=True)
    data_dir.mkdir(parents=True, exist_ok=True)
    session = requests.Session()
    session.headers.update({"User-Agent": USER_AGENT, "Accept": "application/json, image/webp, image/jpeg, image/png; q=0.9"})
    seen_source = set()
    seen_bytes = set()
    records = []
    log = []
    deficit = 0

    def collect(slug, query, desired, category):
        successes = 0
        pages = search_pages(session, query)
        print(f"{slug}: {len(pages)} candidates, target {desired}", flush=True)
        for page in pages:
            if successes >= desired or len(records) >= target:
                break
            photo = validate_file(page)
            if not photo or photo["sourceUrl"] in seen_source:
                continue
            seen_source.add(photo["sourceUrl"])
            raw = download_image(session, photo["photoUrl"])
            if not raw:
                continue
            transformed = photo_to_webp(raw)
            if not transformed:
                continue
            webp, modification = transformed
            fingerprint = hashlib.sha256(webp).hexdigest()
            if fingerprint in seen_bytes:
                continue
            seen_bytes.add(fingerprint)
            successes += 1
            file_name = f"news-photo-{slug}-{successes:02d}.webp"
            path = photo_dir / file_name
            path.write_bytes(webp)
            source_title = photo["title"].rsplit(".", 1)[0].replace("_", " ")
            label = f'{photo["creditTo"]} / Wikimedia Commons'
            credit_line = f'Photo: {label} ({photo["license"]}; resized for MR Techworks)'
            source_data = {
                "filename": file_name,
                "path": "/assets/images/article-library/real-photos/" + file_name,
                "type": "real photograph",
                "subject": query,
                "category": category,
                "title": source_title,
                "alt": source_title + " (photograph; verify depicted product before publishing)",
                "creditTo": photo["creditTo"],
                "creditLine": credit_line,
                "license": photo["license"],
                "licenseUrl": photo["licenseUrl"],
                "derivativeLicense": photo["license"],
                "sourceUrl": photo["sourceUrl"],
                "sourceOriginal": photo["photoUrl"],
                "modified": modification,
                "sha256": fingerprint,
                "sourceDimensions": [photo["width"], photo["height"]],
                "editorialReviewRequired": True,
                "noBrandEndorsement": True
            }
            records.append(source_data)
            print(f"  [{len(records):03d}/{target}] {file_name}: {photo['license']} / {photo['creditTo'][:60]}", flush=True)
        log.append({"topic": slug, "query": query, "target": desired, "acquired": successes})
        return successes


    # Seed the collection with relevant real gaming hardware and launch photos
    # rather than relying entirely on fuzzy search relevance.
    seed_titles = [ "File:" + name for name, _, _ in EXACT_SEEDS ]
    response = request_json(session, {
        "action": "query", "prop": "imageinfo",
        "iiprop": "url|size|mime|extmetadata", "iiurlwidth": 1480,
        "titles": "|".join(seed_titles),
        "format": "json", "formatversion": 2,
    }) or {}
    seed_pages = {p.get("title","").removeprefix("File:"): p
                  for p in ((response.get("query") or {}).get("pages") or [])}
    for name, key, category in EXACT_SEEDS:
        page = seed_pages.get(name)
        if not page:
            continue
        photo = validate_file(page)
        if not photo or photo["sourceUrl"] in seen_source:
            continue
        raw = download_image(session, photo["photoUrl"])
        if not raw:
            continue
        transformed = photo_to_webp(raw)
        if not transformed:
            continue
        webp, modification = transformed
        fingerprint = hashlib.sha256(webp).hexdigest()
        if fingerprint in seen_bytes:
            continue
        seen_source.add(photo["sourceUrl"])
        seen_bytes.add(fingerprint)
        file_name = "news-photo-featured-" + key + ".webp"
        (photo_dir / file_name).write_bytes(webp)
        records.append({
            "filename": file_name,
            "path": "/assets/images/article-library/real-photos/" + file_name,
            "type": "real photograph",
            "subject": key.replace("-", " "),
            "category": category,
            "title": photo["title"].rsplit(".",1)[0].replace("_"," "),
            "alt": key.replace("-", " ") + " (actual hardware/event photograph)",
            "creditTo": photo["creditTo"],
            "creditLine": f'Photo: {photo["creditTo"]} / Wikimedia Commons ({photo["license"]}; resized for MR Techworks)',
            "license": photo["license"],
            "licenseUrl": photo["licenseUrl"],
            "derivativeLicense": photo["license"],
            "sourceUrl": photo["sourceUrl"],
            "sourceOriginal": photo["photoUrl"],
            "modified": modification,
            "sha256": fingerprint,
            "sourceDimensions": [photo["width"], photo["height"]],
            "editorialReviewRequired": True,
            "noBrandEndorsement": True
        })
        print(f"  [SEED {len(records):03d}/{target}] {file_name}: {photo['creditTo'][:60]}", flush=True)

    for slug, query, desired, category in TOPICS:
        got = collect(slug, query, desired, category)
        deficit += max(0, desired - got)
        if len(records) >= target:
            break
        time.sleep(0.28)
    if len(records) < target:
        print(f"Primary searches acquired {len(records)}; filling gaps with related subjects.", flush=True)
        for slug, query, category in FALLBACKS:
            if len(records) >= target:
                break
            # Keep article relevance; don't silently label unrelated stock.
            collect("extra-" + slug, query, min(5, target-len(records)), category)
            time.sleep(0.28)

    acquired = len(records)
    manifest_file = data_dir / "real-news-photo-credits.json"
    manifest = {
        "schemaVersion": 1,
        "collection": "MR Techworks real editorial photography",
        "dateCompiledUTC": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "requested": target,
        "acquired": acquired,
        "licensePolicy": "CC0, CC BY or CC BY-SA with verified Creative Commons license URL only; no NC/ND and no news-publisher fair-use assumptions",
        "notes": "Genuine Wikimedia Commons photographs. Preview all products, brands, people and incidental screen imagery before use. An image license is not a trademark endorsement or permission to republish embedded copyrighted game artwork.",
        "entries": records
    }
    manifest_file.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    # Main site's existing credits file is kept separately and merged by path.
    credits_file = data_dir / "image-credits.json"
    existing = {"entries": []}
    if Path("assets/data/image-credits.json").exists():
        try:
            existing = json.loads(Path("assets/data/image-credits.json").read_text(encoding="utf-8"))
        except Exception:
            pass
    prior = [x for x in existing.get("entries",[]) if x.get("path") not in {r["path"] for r in records}]
    credits_file.write_text(json.dumps({"entries": prior+records}, indent=2, ensure_ascii=False)+"\n", encoding="utf-8")
    columns = ["filename","path","category","subject","creditTo","license","licenseUrl","sourceUrl","modified","sha256"]
    with (out_dir/"NEWS_PHOTO_CREDITS.csv").open("w",newline="",encoding="utf-8-sig") as fh:
        writer=csv.DictWriter(fh,fieldnames=columns,extrasaction="ignore");writer.writeheader();writer.writerows(records)
    with (out_dir/"BUILD_REPORT.json").open("w",encoding="utf-8") as fh:
        json.dump({"requested":target,"acquired":acquired,"queries":log,"allLicenseChecked":all(r["licenseUrl"].startswith("https://creativecommons.org/") for r in records)},fh,indent=2)
    rights = (
        "# Actual photographs / editorial rights\n\n"
        "Each image was fetched from Wikimedia Commons and screened against machine-readable metadata. "
        "Only CC0, CC BY and CC BY-SA entries with corresponding Creative Commons license URLs were accepted; "
        "the author and exact source page for each file are in NEWS_PHOTO_CREDITS.csv and assets/data/real-news-photo-credits.json.\n\n"
        "IMPORTANT: You must visually check the photograph before use. Automated metadata is not infallible, "
        "and some photos may depict additional copyrighted works, trademarks, people, or logos. "
        "The package does not grant endorsement or additional rights.\n\n"
        "Every converted image includes cropping or padding; preserve creator credit, source, linked CC license, "
        "modification note and CC BY-SA share-alike condition where applicable. "
        "Do not present an illustrated PC as a named console, or an unrelated photo as evidence of a specific outage. "
        "Do not replace approved license information with a generic © MR Techworks claim.\n\n"
        f"Acquired {acquired} of requested {target} actual source photographs. "
        "Images are already compressed to 1280 × 720 WebP.\n"
    )
    (out_dir/"NEWS_PHOTO_RIGHTS.md").write_text(rights,encoding="utf-8")
    assemble_gallery(records,out_dir)
    zip_path=out_dir/"MRTechworks_Real_News_Photos_Upload.zip"
    with zipfile.ZipFile(zip_path,"w",compression=zipfile.ZIP_DEFLATED,compresslevel=5) as archive:
        for file in out_dir.rglob("*"):
            if file.is_file() and file != zip_path:
                archive.write(file,arcname=file.relative_to(out_dir))
    # ZIP integrity and path uniqueness.
    with zipfile.ZipFile(zip_path) as archive:
        if archive.testzip() is not None:
            raise RuntimeError("ZIP integrity failure")
        paths = [x.filename for x in archive.infolist()]
        if len(paths) != len(set(paths)):
            raise RuntimeError("Duplicate ZIP member path")
    print(f"RESULT: {acquired}/{target} photos; ZIP: {zip_path}",flush=True)
    return acquired

if __name__ == "__main__":
    parser=argparse.ArgumentParser()
    parser.add_argument("--output",default="real-photo-output")
    parser.add_argument("--target",type=int,default=99)
    args=parser.parse_args()
    if args.target<1 or args.target>99:
        parser.error("target must be 1-99")
    n=build(args.output,args.target)
    if n!=args.target:
        print(f"WARNING: Only {n} real, license-checked photos available; never invent missing photos.",file=sys.stderr)
        sys.exit(2)
