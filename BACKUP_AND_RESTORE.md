# MR Techworks Backup & Restoration

This repo has a weekly and post-commit snapshot workflow: `.github/workflows/site-backup.yml`.

## Safeguards currently in place

- **Dated Git snapshot branch:** `backup/snapshot-2026-11-13` preserves the site as of November 13, 2026. This is a same-repository restore point, not an independent copy.
- **GitHub Actions archive:** The workflow runs after pushes to `main`, each Sunday (08:17 UTC), or manually via Actions → MR Techworks Site Snapshot → Run workflow. It exports a full Git bundle plus a compressed copy of the website, with SHA-256 checksums, as a downloadable Actions artifact retained for 90 days (subject to GitHub policy and repository Actions settings).
- **Original media/credits:** Article source and attribution records live in `news/media-and-attribution.md`. Preserve originals and source URLs separately.

## Strongly recommended: a second, private repository

A backup stored only in the original repository is not an independent backup. Make a private GitHub repository named `MRTechworks-Backup` in your account or a separate account. This chat's GitHub connector can inspect and update existing repositories but cannot create a new repository with the currently available actions; the private repository is **not yet created**.

When it exists, run on a trusted computer:

```powershell
git clone --mirror https://github.com/MatthewMRoupp/MRTechworks.git
cd MRTechworks.git
git remote add backup https://github.com/<YOUR-OWNER>/MRTechworks-Backup.git
git push --mirror backup
```

**Warning:** `--mirror` force-updates/deletes destination refs to match the source. Only point it at a dedicated, empty backup repository. To protect against accidental deletion, also keep dated offline Git bundles.

## Restore using an Actions artifact

1. Open GitHub → Actions → `MR Techworks Site Snapshot` → a successful run → Artifacts, and download the backup.
2. Verify SHA-256 against `SHA256SUMS.txt`.
3. To inspect a historical snapshot, unpack the site `.tar.gz` into a temporary directory.
4. To recover full Git history, use `git clone MRTechworks-history-YYYY-MM-DD.bundle restored-MRTechworks`, inspect the branches, and carefully restore only desired files/commits.

## Offsite copy

Download at least monthly and store the dated artifact in a separate cloud account or external drive. Periodically verify a restore. GitHub Actions artifacts and backup branches are recovery aids, but are **not** offsite backups until exported to independent storage.
