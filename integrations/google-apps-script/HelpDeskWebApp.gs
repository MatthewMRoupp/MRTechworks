/**
 * MR Techworks - Public help-ticket web app adapter.
 *
 * Paste into a NEW script file in the existing, spreadsheet-bound Apps Script
 * project that already contains processHelpTicket(data).
 *
 * Script property required: TURNSTILE_SECRET (private; never put in GitHub).
 * This file contains no secrets.
 */

function doPost(e) {
  try {
    if (!e || !e.parameter || !e.postData) {
      return helpDeskResponse_(false, "Invalid request.");
    }

    // Apps Script has limited control over incoming request size and HTTP status.
    if (e.postData.length > 12000) {
      return helpDeskResponse_(false, "Your request is too long.");
    }

    var fields = [
      "name", "email", "phone", "address", "service", "problem",
      "town", "appointment", "callback", "availability",
      "cf-turnstile-response"
    ];

    // Do not silently accept duplicate keys with ambiguous values.
    for (var i = 0; i < fields.length; i++) {
      var submitted = e.parameters && e.parameters[fields[i]];
      if (submitted && submitted.length !== 1) {
        return helpDeskResponse_(false, "Invalid form submission.");
      }
    }

    // Honeypot field: must remain empty.
    if (String(e.parameter.company_website || "").trim()) {
      return helpDeskResponse_(false, "Unable to process this request.");
    }

    var token = String(e.parameter["cf-turnstile-response"] || "");
    if (!verifyHelpDeskTurnstile_(token)) {
      return helpDeskResponse_(false, "Security verification failed or expired. Return to the form and try again.");
    }

    // Server-side validation is also performed by processHelpTicket().
    var name = String(e.parameter.name || "").trim();
    var email = String(e.parameter.email || "").trim().toLowerCase();
    if (name.length < 2 || name.length > 120 ||
        email.length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return helpDeskResponse_(false, "Please check the contact information.");
    }

    // Simple repeat-request throttle; Turnstile supplies the primary bot gate.
    // CacheService is best-effort, not a guaranteed distributed rate limiter.
    var digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, email);
    var key = "helpdesk_" + Utilities.base64EncodeWebSafe(digest).slice(0, 35);
    var cache = CacheService.getScriptCache();
    if (cache.get(key)) {
      return helpDeskResponse_(false, "A ticket was recently submitted from this email address. Please wait a few minutes or contact us directly.");
    }

    var data = {};
    var acceptedFields = [
      "name", "email", "phone", "address", "service", "problem",
      "town", "appointment", "callback", "availability"
    ];
    acceptedFields.forEach(function(field) {
      data[field] = String(e.parameter[field] || "");
    });

    // Existing processor: creates MRT- ticket, writes the row, sends two emails.
    var result = processHelpTicket(data);
    if (!result || !result.success || !/^MRT-\d+$/.test(result.ticketId)) {
      throw new Error("Ticket processor did not confirm the request.");
    }

    cache.put(key, "1", 300);
    return helpDeskResponse_(true, "Your help ticket " + result.ticketId +
      " has been received. A confirmation email has been sent.");

  } catch (err) {
    console.error("Help ticket submission error: " + String(err));
    return helpDeskResponse_(false,
      "We could not confirm your request. Please check for a confirmation email or contact support@mrtechworks.com before trying again.");
  }
}

function verifyHelpDeskTurnstile_(token) {
  if (!token || token.length > 2048) return false;
  var secret = PropertiesService.getScriptProperties().getProperty("TURNSTILE_SECRET");
  if (!secret) throw new Error("TURNSTILE_SECRET has not been configured.");

  var response = UrlFetchApp.fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "post",
      payload: { secret: secret, response: token },
      muteHttpExceptions: true
    }
  );

  if (response.getResponseCode() !== 200) return false;
  var checked = JSON.parse(response.getContentText());
  return checked.success === true &&
    checked.hostname === "mrtechworks.com" &&
    checked.action === "contact";
}

/**
 * Apps Script ContentService returns a machine-readable response.
 * Google may redirect the response to script.googleusercontent.com;
 * the Cloudflare Worker follows that redirect and parses JSON.
 * The browser never navigates to Google's Apps Script page.
 */
function helpDeskResponse_(success, message) {
  var ticket = success
    ? String(message).match(/Your help ticket (MRT-\d+) has been received\./)
    : null;

  var payload = {
    success: Boolean(success) && Boolean(ticket),
    ticketId: ticket ? ticket[1] : null,
    message: String(message)
  };

  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
