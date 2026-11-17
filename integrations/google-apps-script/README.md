# MR Techworks help desk — Cloudflare Turnstile + Apps Script

This directory contains the **website submission adapter**. It is not deployed simply by merging this PR.

1. In the existing spreadsheet-bound Apps Script project, verify that the original `processHelpTicket(data)` still works.
2. Add a **new script file**, `HelpDeskWebApp.gs`, and paste the contents of [HelpDeskWebApp.gs](./HelpDeskWebApp.gs).
3. In **Project Settings → Script Properties**, store the private Turnstile key as `TURNSTILE_SECRET`. Never add its value to GitHub.
4. Deploy → **New deployment** → **Web app**, execute as your account, with access to **Anyone**. Review the Google authorization prompt and remember the endpoint is publicly reachable.
5. Copy the deployment URL ending in `/exec`. In `contact/index.html`, replace `action="#"` with that URL. Remove `disabled` from the Submit button **only after** end-to-end testing using a safe test endpoint or a staging copy of the page.
6. The website uses the public widget site key `0x4AAAAAAGEYm4fSdMUirpGW` and action `contact`. The server strictly checks both `action` and `hostname` against `mrtechworks.com`.
7. Submit a test using your own email. Confirm the sheet row and both email notifications. Test missing/expired token, missing required fields, and duplicate submissions.

**Current status:** Website Submit remains disabled while the backend deployment URL and real-world testing are pending.

**Notes:** Apps Script's web app response does not reliably support custom HTTP error status codes. The adapter returns an HTML result page; do not use it as a JSON API. It uses a best-effort email-based 5-minute throttle, not an IP-based distributed rate limit. The main `processHelpTicket` processor saves the sheet entry before sending emails; if a delivery error occurs, check the sheet before retrying to avoid duplicate tickets. Token verification is mandatory and fails closed.
