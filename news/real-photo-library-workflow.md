# MR Techworks — 99 licensed real-photo news collection

This workflow creates **actual photographs**, not AI-generated product renderings or illustrations. It fetches Wikimedia Commons source files, examines the source page's machine-readable licensing and creator attribution, refuses unknown/noncommercial/no-derivatives licenses, converts qualifying photographs to 1280 × 720 WebP, and packages no more than 99 files per ZIP.

## How it runs

The workflow is `.github/workflows/build-real-news-photos.yml`. It runs once after the workflow or builder changes are merged into `main`, or on demand from GitHub Actions. The build output is a GitHub Actions artifact containing `MRTechworks_Real_News_Photos_Upload.zip`, a report and diagnostic log. Actual acquired count is recorded in `BUILD_REPORT.json`; do not report 99 before that file confirms it.

When (and only when) 99 photos were successfully downloaded and license-filtered, the action stages their files and the central credits JSON on the **non-production** `assets/real-news-photography-99` branch. Review the photos and their credit records before merging. Nothing changes existing article hero images automatically.

The final ZIP contains:
- `assets/images/article-library/real-photos/*.webp` — actual converted photographs.
- `assets/data/image-credits.json` — compatible with the site's existing credit renderer, including `creditTo`, `creditLine`, `sourceUrl`, `license`, `licenseUrl`, a modification note and SHA-256.
- `assets/data/real-news-photo-credits.json` — full detailed source and permissions inventory.
- `NEWS_PHOTO_CREDITS.csv` — readable one-row-per-photo credit manifest.
- `NEWS_PHOTO_RIGHTS.md` and `PHOTO_REVIEW.html` — conditions and visual preview index.

## Copyright and licensing

Only explicit Commons image licenses from the accepted CC BY, CC BY-SA and CC0 whitelist with matching license URL qualify. CC BY and CC BY-SA photos require creator name, a link to the original, a license link and disclosure of crop/resize; CC BY-SA derivatives follow the same license. Screen-captured commercial game content, company press kit images without a reusable license, stock images with unclear rights, trademarks/logo design assets, and noncommercial/no-derivatives material are **not** automatically accepted.

Wikimedia metadata is community-maintained and can be wrong. Photos are subject to **editorial visual review** even if the API reports a valid license. An image's license does not grant trademark endorsement rights or permission to reproduce other copyrighted material visible in the picture.

## Brand and game specificity

The 45 topic groups prioritize Xbox, PlayStation, Nintendo, Valve/Steam, Windows/Microsoft, Apple, NVIDIA, AMD, Intel, Lenovo, Dell, HP, storage, networking, computers, security and business IT. Source photos must not be described as screenshots of a particular game, actual outage evidence, or the latest version of hardware unless the photograph can establish those facts.

For official video-game screenshots (e.g. GTA VI, Halo), source directly from the publisher's approved media kit under the exact published reuse terms; not every press image is freely redistributable.

## If the runner cannot retrieve 99

The builder writes the actual count, a partial ZIP, and a diagnostic log. No filler photos will be invented and the production website stays untouched. Run the script on a PC with Internet access, or adjust the source queries to find additional genuinely permitted photos.
