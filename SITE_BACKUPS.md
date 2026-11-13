# MR Techworks site backups

Updated November 13, 2026. No private backup repository has been created or linked by this document.

## Recommended arrangement

Use three independent forms of protection:

1. **Primary public site repository:** `MatthewMRoupp/MRTechworks`. Git already retains committed code and assets in its history, but a repository's history is not an independent backup of the account or host.
2. **Private backup repository:** Create an empty private `MRTechworks-backup` repository, preferably owned by a separate GitHub organization/account with appropriately restricted access. Mirror code, static assets, history, and tags. Avoid overwriting other content in that repository.
3. **Offline/cloud snapshot:** Keep periodic dated `.bundle` exports or encrypted archives in a location independent of GitHub (OneDrive, external SSD, or another cloud provider). Store domain registrar/DNS records and any deployment settings or secrets separately in a secure password manager—never commit secrets into a public repository.

## First one-time Git repository backup

Install Git on a trusted computer, then run:

```powershell
git clone --mirror https://github.com/MatthewMRoupp/MRTechworks.git
cd MRTechworks.git
git bundle create ../MRTechworks-full-2026-11-13.bundle --all
```

This makes a full Git bundle in the parent folder, including refs reachable at export time. Copy it outside GitHub; confirm it exists and is readable:

```powershell
git bundle verify ../MRTechworks-full-2026-11-13.bundle
```

A ZIP downloaded from the website or repository is useful for current files, but unlike a Git bundle, it does not include the full commit history.

## Mirroring to a second private GitHub repository

First create an **empty** private backup repository with no README or template files and confirm its exact owner and repository name. Then, in your mirrored local clone, add it as a second remote:

```powershell
git remote add backup https://github.com/REPLACE-OWNER/MRTechworks-backup.git
git push --mirror backup
```

**Important:** `git push --mirror` overwrites/deletes remote refs to match the source. Only use it with an intentionally empty, dedicated backup target. Do not point it at a working repository.

For a sustainable strategy, retain dated snapshots/tags or Git bundles so accidental deletions or malicious changes in the primary repository don't automatically erase recovery points. Schedule an offsite snapshot after major site releases, and test a restore periodically.

## Image assets and license records

Keep these alongside code in backup snapshots:
- `assets/images/`, including optimized article photos and original artwork
- `news/image-source-plan.md` and `news/media-and-attribution.md`
- Original licensed media or download proofs where license terms require preservation (these can live in private offsite storage)

A ZIP mistakenly placed in `assets/images` remains a ZIP—it will not be unpacked by GitHub Pages. To publish its images, extract the actual files and upload them into the repository, then change page references. The `MRTechworks_14_Images_Licensed_Collection_Kit.zip` is a **collection tool**, not the completed WebP image set.

## Restore test

Occasionally clone the backup repository or an exported Git bundle into a new temporary folder and verify `index.html`, `style.css`, `assets/`, `news/`, `gaming-news/`, and `articles/` exist and the site can render without broken local links. Do not keep the only recovery keys in the same location as the computer you are recovering.
