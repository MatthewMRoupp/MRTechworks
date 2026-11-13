# Original MR Techworks article illustration library — pending upload

Created November 13, 2026. This is the **deployment plan**, not a claim that the files are already present in the repository.

An external, upload-ready package contains **105 real WebP files**: 87 editable original vector illustrations, four AI-generated editorial visuals and 14 social-preview crops. The package also contains `assets/data/image-credits.json` (filename, `creditTo`, `creditLine`, license, creation method, accessibility alt text, and checksums). No copyrighted photos from third-party news sites were bundled.

Upload images under `assets/images/article-library/` and the credit catalog to `assets/data/image-credits.json`. GitHub Pages **does not unzip uploaded archives**. Confirm the requested paths exist before changing production pages. Keep all existing images as fallbacks until the new file URLs work.

| Article | Target image path | Deployment |
|---|---|---|
| [/news/windows-10-extended-security-updates-2026/](/news/windows-10-extended-security-updates-2026/) | `/assets/images/article-library/windows-10-esu.webp` | Pending image upload |
| [/news/windows-11-26h2-update-support-2026/](/news/windows-11-26h2-update-support-2026/) | `/assets/images/article-library/windows-11-26h2.webp` | Pending image upload |
| [/gaming-news/steam-machine-2025-2026-explained/](/gaming-news/steam-machine-2025-2026-explained/) | `/assets/images/article-library/steam-machine-editorial.webp` | Pending image upload |
| [/gaming-news/nintendo-switch-2-backwards-compatibility/](/gaming-news/nintendo-switch-2-backwards-compatibility/) | `/assets/images/article-library/switch-2-compatibility-editorial.webp` | Pending image upload |
| [/articles/bitlocker-recovery-key-guide/](/articles/bitlocker-recovery-key-guide/) | `/assets/images/article-library/bitlocker-recovery.webp` | Pending image upload |
| [/articles/nvme-ssd-failure-signs/](/articles/nvme-ssd-failure-signs/) | `/assets/images/article-library/nvme-ssd-failure.webp` | Pending image upload |
| [/articles/windows-startup-repair-before-reset/](/articles/windows-startup-repair-before-reset/) | `/assets/images/article-library/windows-startup-recovery.webp` | Pending image upload |
| [/articles/ssd-cloning-checklist/](/articles/ssd-cloning-checklist/) | `/assets/images/article-library/ssd-cloning.webp` | Pending image upload |
| [/news/nvidia-ceo-transition-november-2026/](/news/nvidia-ceo-transition-november-2026/) | `/assets/images/article-library/nvidia-chip-industry.webp` | Pending image upload |
| [/news/microsoft-365-outage-november-2026/](/news/microsoft-365-outage-november-2026/) | `/assets/images/article-library/m365-email-outage.webp` | Pending image upload |
| [/gaming-news/gta-vi-november-2026-launch/](/gaming-news/gta-vi-november-2026-launch/) | `/assets/images/article-library/gta-vi-release-editorial.webp` | Pending image upload |
| [/gaming-news/xbox-25th-anniversary-2026/](/gaming-news/xbox-25th-anniversary-2026/) | `/assets/images/article-library/xbox-25-pc-gaming-editorial.webp` | Pending image upload |
| [/gaming-news/switch-2-sales-september-2026/](/gaming-news/switch-2-sales-september-2026/) | `/assets/images/article-library/switch-2-sales-editorial.webp` | Pending image upload |
| [/articles/is-it-an-outage-or-my-device/](/articles/is-it-an-outage-or-my-device/) | `/assets/images/article-library/outage-troubleshooting.webp` | Pending image upload |

Once uploaded and verified, update:
1. The `image` and `imageAlt` fields in `assets/js/library-data.js`.
2. Each article's hero `<img>` and explanatory `<figcaption>`.
3. The article `og:image` social metadata and `BlogPosting.image` where present.
4. Optional social previews (`-social.webp` derivatives are 1200 × 630).

The site now includes `assets/js/asset-credit-lookup.js`, conditionally loaded by `assets/js/nav-hover.js` when a new article-library image is used. It automatically adds `creditLine` from the JSON credit catalog beneath editorial figures. This mechanism is intentionally inactive for existing live images.

**Editorial transparency:** these are original illustrations, not actual photographs of branded hardware, gameplay, Microsoft outage events, or real Windows screens. For actual publisher photos, use only rights-cleared images and attribute the original creator. See `news/media-and-attribution.md`.
