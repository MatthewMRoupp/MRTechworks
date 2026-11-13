# MR Techworks news workflow

Update /news/index.html with source-checked, dated coverage; put citations under each news item. Keep /sitemap.xml current. Add image licensing and alt text. For urgent incidents edit /news/alert.json: active, title, message, observedAt, expiresAt (ISO timestamp), and source URL. The site hides expired alerts automatically. Remove or mark incidents resolved promptly. Changes should be made through pull requests before publishing, and Facebook post drafts reviewed before sending.

Gaming News is in /gaming-news/. The editorial inventory in /news/editorial-roadmap.md tracks 30 gaming, 30 tech and 40 evergreen topics and which ones are already published. Always use real publication dates; a backfilled historical recap must display its original event date separately. New news should include source URLs, researched statements, and updates when conditions change. Ensure new page URLs are in /sitemap.xml and links are reachable through Resources navigation.

The master article directory is /articles/, with three filters (tech, gaming, help). It merges existing evergreen guides from /assets/js/article-data.js with published news and other standalone guides in /assets/js/library-data.js. Add a catalog entry for every newly published article (group, topic, canonical href, title, summary, real publication date). Do not index drafts or planned articles. Preserve individual article URLs and update the sitemap. Check that the directory search, topic and category filters, and linked pages all work when publishing. /news/ and /gaming-news/ remain specialist news landing pages.

## Article Library advanced search

The /articles/ search bar stays prominent. A collapsed, keyboard-accessible `<details>` panel offers advanced search:
- **Must include all words**, **include any word**, **exact phrase**, **exclude words**. Search uses article title, summary, tags and topic; evergreen guides also have indexed body text.
- **Subject area** uses a cross-cutting taxonomy. Guides map through /assets/js/articles.js. Add suitable `subjects` arrays to new published news records in /assets/js/library-data.js.
- **Specific topic** is the existing article category; available options adapt to category and subject selection.
- **Date range** is inclusive and uses news publication `date` or guide `updated`. Do not confuse historical event dates with publication dates.
- **Sort**, **load more**, **clear advanced**, **reset all**, and top-level category buttons remain available.

Supported subject IDs: `ai`, `cloud`, `data`, `gaming`, `hardware`, `industry`, `networking`, `security`, `software`, `support`. Choose relevant subjects rather than adding filler labels. Every published article remains discoverable through All articles regardless of subjects.

No database or external search service is required. News full-body search is not provided unless article text is deliberately indexed. Consider a generated static full-text index if the library grows substantially.

## Rights and attribution

Follow [editorial sourcing and media permissions](media-and-attribution.md) for all article text, quoted material, stock photos, newsroom assets, screenshots and Creative Commons derivatives. The [first 14 image replacement source plan](image-source-plan.md) records filenames and photographer/license credits. These are candidates only; no new image paths should go live before the actual files have been uploaded and verified.
