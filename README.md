# MR Techworks website

Public website: https://mrtechworks.com/  
Homepage source: [index.html](index.html)

This is a static GitHub Pages website. **Keep `index.html`, `style.css`, `CNAME`, `robots.txt`, and `sitemap.xml` at the repository root.** GitHub lists them beside top-level folders.

## File layout

| Folder / file | Purpose |
| --- | --- |
| `index.html` | Homepage (must remain at root) |
| `style.css` | Shared website styles |
| `about/`, `services/`, `pricing/`, `business/`, `contact/`, `projects/`, `certifications/` | Pages; each route contains its own `index.html` |
| `articles/`, `news/`, `gaming-news/` | Published guides and news pages |
| `assets/images/` | General site images, logos, backgrounds, badges |
| `assets/images/article-library/` | Editorial illustrations and social crops |
| `assets/images/article-library/real-photos/` | Licensed article photographs |
| `assets/data/image-credits.json` | Asset paths and attribution metadata |
| `assets/js/` | Shared client-side scripts |
| `assets/documents/` | Downloadable PDFs and documents |
| `tests/` | Repository checks |
| `.github/workflows/` | GitHub Actions automation |
| `tools/` | Media curation utilities |

Use root-relative URLs for site media, for example:
```html
<img src="/assets/images/article-library/windows-10-esu.webp" alt="Windows security updates illustration">
```
Do not upload images to the top-level repository folder. Uploading a ZIP also does **not** extract its contents on GitHub Pages. Place the actual files in `assets/images/` and keep the matching path in `assets/data/image-credits.json`.

## Checks

From a local checkout with Node.js installed:
```sh
node tests/verify-article-covers.cjs
node tests/verify-asset-library.cjs
```
GitHub Actions runs these checks on relevant updates.

## Cleanup restore point

Before reorganizing the illustration library on November 14, 2026, the repository was copied to the branch [`backup/pre-root-asset-cleanup-2026-11-14`](../../tree/backup/pre-root-asset-cleanup-2026-11-14). The backup branch is in the same repository, so keep independent backups too; see [BACKUP_AND_RESTORE.md](BACKUP_AND_RESTORE.md).
