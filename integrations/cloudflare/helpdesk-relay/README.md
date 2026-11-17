# Cloudflare Worker: MR Techworks Help Desk Relay

This is a small `workers.dev` endpoint. The main website remains on **GitHub Pages**. Google Apps Script continues to store tickets in the existing Google Sheet and send email notices.

## Cloudflare deployment

- Cloudflare account: `matthew@mrtechworks.com`
- Worker: `mrtechworks-helpdesk-relay`
- Endpoint: `https://mrtechworks-helpdesk-relay.mrtechworks-support.workers.dev/ticket`
- Health endpoint: `https://mrtechworks-helpdesk-relay.mrtechworks-support.workers.dev/health`
- Source: [worker.js](worker.js)
- Deployment: uploaded by API with workers.dev subdomain enabled.

## Flow

1. The Contact form gathers the customer fields and Turnstile token (site key `0x4AAAAAAGEYm4fSdMUirpGW`, action `contact`).
2. Browser `fetch()` POSTs URL-encoded form fields to `/ticket`. Only `https://mrtechworks.com` and `https://www.mrtechworks.com` are accepted as browser Origin values.
3. Worker forwards form data and the **unconsumed** Turnstile token to the existing Apps Script `/exec` deployment.
4. Apps Script's `doPost(e)` validates Turnstile using its private `TURNSTILE_SECRET`, checks hostname and action, and calls the existing `processHelpTicket()`.
5. The Worker parses a JSON response from Apps Script ContentService: `{success:true,ticketId:"MRT-####"}`. It rejects any unrecognized or failed response and never invents success.
6. The browser navigates to `/contact/thank-you/?ticket=MRT-####` only on confirmed success.

## Security and operational notes

- **No secrets** are embedded in GitHub or the Worker. The private Turnstile secret stays in Apps Script.
- Do not verify a Turnstile token twice. Apps Script performs the sole token verification against Cloudflare Siteverify.
- Worker CORS is *not* authentication; the actual anti-bot check and form validation are enforced by Apps Script.
- Apps Script must be updated to use the revised `helpDeskResponse_()` in `integrations/google-apps-script/HelpDeskWebApp.gs`, which returns JSON via ContentService. The Worker checks the JSON MIME type and requires `success:true` and an `MRT-` ID; old HTML response will be treated as unconfirmed even if a ticket was created.
- Apps Script can create a ticket and then fail while sending an email. **Do not retry blindly** when a response is uncertain.
- Review logs on both services for production issues; never log customer form details.
- The Cloudflare Worker is already updated. **Until the Apps Script project is updated and redeployed**, tickets may be created and emails sent but the form will still show 'could not confirm'. Updating GitHub does not update the Apps Script project.

## Smoke-test checklist

- GET `/health` returns JSON with status `ready`.
- Submit test ticket from deployed site with valid Turnstile token and personal email.
- Confirm branded URL, visible MRT ticket number, exactly one Sheet row, both email notifications.
- Invalid/missing/expired Turnstile token must not create a ticket.
- Confirm form is still usable on mobile and GitHub Pages serves styling correctly.
- Until all checks pass, treat the Worker integration as **unverified**.
