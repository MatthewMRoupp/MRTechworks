/**
 * MR Techworks Help Desk relay
 * Website: GitHub Pages. Tickets and email: Google Apps Script.
 * Cloudflare Turnstile token is verified by Apps Script (never verified twice).
 * No secrets are stored in this Worker.
 */
const GAS_URL = "https://script.google.com/macros/s/AKfycbzMSnX3JpZSIM_7rTGGSHYJF1AH6xQHzrU5w8ojwbNMiPWntV3dmzXpBJQ6gJJ-a72kVQ/exec";
const ALLOWED_ORIGINS = new Set(["https://mrtechworks.com", "https://www.mrtechworks.com"]);
const ALLOWED_FIELDS = [
  "name","email","phone","address","service","problem","town",
  "appointment","callback","availability","cf-turnstile-response","company_website"
];
function cors(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin"
  };
}
function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status, headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...(origin ? cors(origin) : {})
    }
  });
}
export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/health" && request.method === "GET") {
      return json({status:"ready",service:"mrtechworks-helpdesk-relay"},200);
    }
    if (url.pathname !== "/ticket") return json({error:"Not found."},404);
    const origin = request.headers.get("Origin") || "";
    if (!ALLOWED_ORIGINS.has(origin)) {
      return json({error:"This request must be submitted from MR Techworks."},403);
    }
    if (request.method === "OPTIONS") return new Response(null,{status:204,headers:cors(origin)});
    if (request.method !== "POST") return json({error:"Method not allowed."},405,origin);
    const type = request.headers.get("Content-Type") || "";
    if (!type.toLowerCase().startsWith("application/x-www-form-urlencoded")) {
      return json({error:"Unexpected form format."},415,origin);
    }
    const declaredSize = Number(request.headers.get("Content-Length") || 0);
    if (declaredSize > 12000) return json({error:"Form data is too large."},413,origin);

    try {
      const body = await request.text();
      if (body.length > 12000) return json({error:"Form data is too large."},413,origin);
      const submitted = new URLSearchParams(body);
      for (const key of submitted.keys()) {
        if (!ALLOWED_FIELDS.includes(key) || submitted.getAll(key).length !== 1) {
          return json({error:"Invalid form fields."},400,origin);
        }
      }
      if (!submitted.get("cf-turnstile-response")) {
        return json({error:"Please complete the security verification."},422,origin);
      }
      // Do not consume the one-time Turnstile token here: Apps Script verifies it.
      const forwarded = new URLSearchParams();
      for (const key of ALLOWED_FIELDS) {
        if (submitted.has(key)) forwarded.set(key,submitted.get(key));
      }
      const upstream = await fetch(GAS_URL,{
        method:"POST",body:forwarded,
        headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
        redirect:"follow",
        signal:AbortSignal.timeout(25000)
      });
      if (!upstream.ok) {
        return json({error:"The ticket service is temporarily unavailable. Please check your email before retrying."},502,origin);
      }
      const html = await upstream.text();
      if (/<h1[^>]*>\s*Request received\s*<\/h1>/i.test(html)) {
        const match = html.match(/Your help ticket\s+(MRT-\d+)\b/i);
        if (match) return json({success:true,ticketId:match[1]},200,origin);
      }
      if (/Security verification failed or expired/i.test(html)) {
        return json({error:"Security verification failed or expired. Please refresh the form and try again."},422,origin);
      }
      if (/recently submitted from this email/i.test(html)) {
        return json({error:"A request from this email was recently submitted. Please check your confirmation email before trying again."},429,origin);
      }
      // Apps Script may have saved the ticket before failing during email delivery.
      return json({error:"We could not confirm the ticket. Check your email before resubmitting, or text 607-346-9349."},502,origin);
    } catch (_) {
      return json({error:"We could not confirm the ticket. Check your email before resubmitting, or text 607-346-9349."},502,origin);
    }
  }
};
