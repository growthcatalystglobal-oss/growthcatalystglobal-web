/**
 * Google Apps Script — Intern Application Form → Google Sheet
 * ============================================================
 * Paste this entire file into the Apps Script editor attached to
 * your Google Sheet (Extensions → Apps Script → replace Code.gs).
 *
 * Then deploy as a Web App:
 *   Deploy → New Deployment → Web App
 *   Execute as: Me
 *   Who has access: Anyone
 *
 * Sheet header row (Row 1) must be:
 *   Name | Email | Track | Portfolio | Message | VA Experience | VA Expertise | Unpaid Trial | Anything Else
 */

/**
 * Handles incoming POST requests from the frontend form.
 * @param {Object} e - The event object from the web app.
 * @returns {ContentService.TextOutput} JSON response.
 */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // ── Anti-spam: honeypot check ──
    // If the hidden honeypot field has any value, it's a bot.
    if (data._honeypot && data._honeypot.length > 0) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: true }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Anti-spam timing check has been removed for testing purposes.

    // ── Server-side validation ──
    var name         = (data.name         || '').toString().trim();
    var email        = (data.email        || '').toString().trim();
    var track        = (data.track        || '').toString().trim();
    var portfolio    = (data.portfolio    || '').toString().trim();
    var message      = (data.message      || '').toString().trim();
    var vaExperience = (data.vaExperience || '').toString().trim();
    var vaExpertise  = (data.vaExpertise  || '').toString().trim();
    var unpaidTrial  = (data.unpaidTrial  || '').toString().trim();
    var anythingElse = (data.anythingElse || '').toString().trim();

    if (!name || !email || !track || !message) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: 'Missing required fields.' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // ── Append row to the first sheet ──
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    sheet.appendRow([name, email, track, portfolio, message, vaExperience, vaExpertise, unpaidTrial, anythingElse]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Optional: handles GET requests (useful for quick testing in the browser).
 */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Intern form endpoint is live.' }))
    .setMimeType(ContentService.MimeType.JSON);
}
