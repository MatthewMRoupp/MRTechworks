# MR Techworks search visibility update

## Upload this version

This package is a static website for your existing mrtechworks.com hosting. It has not been deployed to your live domain.

1. Back up the current repository or hosting files.
2. Upload the CONTENTS of MRTechworks-main to the same publishing root as the current index.html. Do not nest the folder inside the live root.
3. Preserve CNAME and your existing domain/HTTPS configuration. No build command or new hosting provider is required.
4. Confirm the homepage, /services/computer-repair/, /articles/home-wifi-basics/, /robots.txt, and /sitemap.xml load on the public domain.
5. Check the existing phone, email, address, and $50 diagnostic / $50 hourly pricing before publication. The diagnostic fee was raised from $25 to $50 with your authorization; standard labor remains $50/hour. Service availability is confirmed by contact; no opening hours or guaranteed response times were invented.

## What changed

- Customer-focused Corning homepage with visible rates and contact buttons.
- Four detailed service pages with distinct content and links from home and services.
- Thirteen complete article HTML pages, retaining original text, references, and update dates.
- Article library content and links available without JavaScript; live search retained.
- Old /articles/read/?id= links redirect to the new article URLs when JavaScript is enabled. Without JavaScript, the legacy reader links to the complete article library. These are browser redirects, not HTTP 301 redirects.
- 25 canonical URLs in sitemap.xml; robots.txt advertises the sitemap.
- Local business, service, and article structured data; consistent metadata and business contact details.
- Six frequently used artwork files converted to WebP; originals retained. Image dimensions added where local image paths resolve.
- Existing portfolio, certifications, documents, and demos retained.

## After publication

Verify the domain in Google Search Console and submit https://mrtechworks.com/sitemap.xml. Use URL Inspection on the homepage, a service page, and a guide. Establish a baseline for impressions, clicks, queries, and contact inquiries, then compare results after several weeks.

Create or update your Google Business Profile if eligible, using the real business information and accurate service arrangements. Ask actual customers for honest reviews, and keep business name, phone, and URL consistent in listings. If customers do not visit your address, check Google's service-area business guidance before displaying it in a listing.

These changes do not guarantee rankings, indexing, or increased traffic. No Search Console, analytics, business profile, DNS, or live hosting accounts were accessed or changed.

## Editing the guides later

The full text is now stored in /articles/<article-id>/index.html. Edit that HTML when changing a guide. Keep summaries, images, and search metadata in assets/js/article-data.js synchronized, along with the static cards in articles/index.html. Add new canonical article URLs to sitemap.xml. Do not change modification dates unless the content actually changes.

## Verification

Browser-checked homepage rendering and article search (mesh produces 2 of 13 guides). Main-site local links and image/script/stylesheet paths, one main heading per canonical page, JSON structured data, and all 25 sitemap destinations were checked. Mobile styling uses the existing responsive breakpoints but was not independently checked at a phone viewport. Live domain indexing, Core Web Vitals, rich-result eligibility, and traffic were not measured.

The supplied C++ payroll demo already references a missing payroll.js and contains an empty index.js. That separate demo issue is retained and is not covered by the main-site checks.

## Pricing page update

/pricing/ is now the central rates and estimates page. Diagnostics are $50 for up to one hour, credited toward labor for the same issue; standard labor remains $50/hour. Remote sessions are $25 for the first 30 minutes and $12.50 per additional 15 minutes. Agreed local home visits are $75 for the first hour, then $50/hour in 15-minute increments; additional travel charges require advance agreement. Standard diagnostics are not automatically added to remote or home-visit charges. Estimates include clearly described scope and exclusions. Rates are linked from every site header/footer and key service/contact areas. The CPE business referral page was added in a later update.


## Business solutions page (November 2026)

Added /business/ explaining when customers should contact CPE IT Solutions for managed support, networks, security, backups, cloud migrations, consulting, and business hardware. CPE is publicly listed as a Corning Area Chamber of Commerce member; the page does not identify the Chamber as a customer. Added navigation and footer links throughout the customer-facing site, internal cross-links on the homepage, services, and contact pages, and an entry in sitemap.xml. External CPE links point directly to the CPE website.
