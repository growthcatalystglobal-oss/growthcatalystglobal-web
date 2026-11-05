// Vercel Serverless Function — Internship Application Handler
// Sends emails via Gmail SMTP using Nodemailer
// Requires GMAIL_USER and GMAIL_APP_PASSWORD environment variables

import nodemailer from 'nodemailer';

// --- Validation helpers ---

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateFields({ name, email, track, portfolio, message }) {
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return 'Name is required.';
  }
  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    return 'Email is required.';
  }
  if (!EMAIL_REGEX.test(email.trim())) {
    return 'Please provide a valid email address.';
  }
  if (!track || typeof track !== 'string' || track.trim().length === 0) {
    return 'Please select a track/role.';
  }
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return 'Message is required.';
  }
  if (name.trim().length > 200) {
    return 'Name is too long (max 200 characters).';
  }
  if (email.trim().length > 320) {
    return 'Email is too long.';
  }
  if (portfolio && portfolio.trim().length > 500) {
    return 'Portfolio link is too long (max 500 characters).';
  }
  if (message.trim().length > 5000) {
    return 'Message is too long (max 5000 characters).';
  }
  return null;
}

// Simple HTML escaping to prevent XSS in email HTML body
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// --- Handler ---

export default async function handler(req, res) {
  // Return friendly status on GET for easy browser testing
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      message: 'Growth Catalyst Internship Application API is online. Use POST to submit applications.',
    });
  }

  // Only allow POST for submissions
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ success: false, error: 'Method not allowed.' });
  }

  try {
    const { name, email, track, portfolio, message, vaExperience, vaExpertise, unpaidTrial, anythingElse, _honeypot, _elapsed } = req.body || {};

    // Honeypot check — bots auto-fill hidden fields.
    // If filled, pretend success so the bot thinks it worked.
    if (_honeypot) {
      return res.status(200).json({ success: true });
    }

    // Timing-based rate limiting has been removed for testing purposes.

    // Validate fields
    const validationError = validateFields({ name, email, track, portfolio, message });
    if (validationError) {
      return res.status(400).json({ success: false, error: validationError });
    }

    // Ensure env vars are configured
    const userEnv = process.env.GMAIL_USER || process.env.VITE_GMAIL_USER;
    const passEnv = process.env.GMAIL_APP_PASSWORD || process.env.VITE_GMAIL_APP_PASSWORD;

    const gmailUser = userEnv ? userEnv.trim() : null;
    const gmailPass = passEnv ? passEnv.replace(/['"]/g, '').replace(/\s+/g, '') : null;

    if (!gmailUser || !gmailPass) {
      console.error(
        `Configuration Error: GMAIL_USER (${gmailUser ? 'set' : 'MISSING'}) or GMAIL_APP_PASSWORD (${gmailPass ? 'set' : 'MISSING'}) is not configured in environment.`
      );
      return res.status(500).json({
        success: false,
        error: 'Server configuration error. Please try again later.',
      });
    }

    // Create Nodemailer transporter
    // family: 4 forces IPv4 to avoid ENETUNREACH on networks with broken IPv6
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
      dnsOptions: { family: 4 },
    });

    const safeName = name.trim();
    const safeEmail = email.trim();
    const safeTrack = track.trim();
    const safePortfolio = portfolio ? portfolio.trim() : 'Not provided';
    const safeMessage = message.trim();
    const safeVaExperience = vaExperience ? vaExperience.trim() : 'Not provided';
    const safeVaExpertise = vaExpertise ? vaExpertise.trim() : 'Not provided';
    const safeUnpaidTrial = unpaidTrial ? unpaidTrial.trim() : 'Not provided';
    const safeAnythingElse = anythingElse ? anythingElse.trim() : 'Not provided';

    // Compose & send email
    await transporter.sendMail({
      from: `"Growth Catalyst Website" <${gmailUser}>`,
      replyTo: `"${safeName}" <${safeEmail}>`,
      to: gmailUser,
      subject: `🎓 New Internship Application: ${safeName} (${safeTrack})`,
      text: [
        `=== NEW INTERNSHIP APPLICATION ===`,
        `Name: ${safeName}`,
        `Email: ${safeEmail}`,
        `Track / Role: ${safeTrack}`,
        `Portfolio / Resume: ${safePortfolio}`,
        `VA Experience: ${safeVaExperience}`,
        `VA Expertise: ${safeVaExpertise}`,
        `Unpaid Trial: ${safeUnpaidTrial}`,
        `Anything Else: ${safeAnythingElse}`,
        '',
        `Message:`,
        safeMessage,
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
          <div style="background-color: #031b4e; padding: 20px 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: #ffffff; margin: 0; font-size: 20px;">
              🎓 New Internship Application
            </h2>
            <p style="color: #a3b8cc; margin: 6px 0 0; font-size: 14px;">
              Applied for <strong>${escapeHtml(safeTrack)}</strong>
            </p>
          </div>
          
          <div style="padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px; background-color: #ffffff;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 10px 12px; font-weight: bold; color: #4a5568; width: 140px; border-bottom: 1px solid #edf2f7;">Applicant Name</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #edf2f7; color: #1a202c; font-weight: 600;">${escapeHtml(safeName)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; font-weight: bold; color: #4a5568; border-bottom: 1px solid #edf2f7;">Email Address</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #edf2f7;">
                  <a href="mailto:${escapeHtml(safeEmail)}" style="color: #0052cc; text-decoration: none;">${escapeHtml(safeEmail)}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; font-weight: bold; color: #4a5568; border-bottom: 1px solid #edf2f7;">Track / Role</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #edf2f7; color: #031b4e; font-weight: 600;">
                  <span style="background-color: #e8f0fe; color: #0a2463; padding: 3px 8px; border-radius: 4px; font-size: 13px;">${escapeHtml(safeTrack)}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; font-weight: bold; color: #4a5568; border-bottom: 1px solid #edf2f7;">Portfolio / Resume</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #edf2f7;">
                  ${
                    portfolio && portfolio.trim().startsWith('http')
                      ? `<a href="${escapeHtml(safePortfolio)}" target="_blank" rel="noopener noreferrer" style="color: #0052cc; text-decoration: underline; word-break: break-all;">${escapeHtml(safePortfolio)}</a>`
                      : escapeHtml(safePortfolio)
                  }
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; font-weight: bold; color: #4a5568; border-bottom: 1px solid #edf2f7;">VA Experience</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #edf2f7; color: #1a202c;">${escapeHtml(safeVaExperience)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; font-weight: bold; color: #4a5568; border-bottom: 1px solid #edf2f7;">VA Expertise</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #edf2f7; color: #1a202c;">${escapeHtml(safeVaExpertise)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; font-weight: bold; color: #4a5568; border-bottom: 1px solid #edf2f7;">Unpaid Trial</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #edf2f7; color: #1a202c;">${escapeHtml(safeUnpaidTrial)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; font-weight: bold; color: #4a5568; border-bottom: 1px solid #edf2f7;">Anything Else</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #edf2f7; color: #1a202c;">${escapeHtml(safeAnythingElse)}</td>
              </tr>
            </table>

            <div style="margin-top: 20px;">
              <p style="margin: 0 0 8px; font-weight: bold; color: #4a5568; font-size: 14px;">Short Message / Cover Note:</p>
              <div style="padding: 16px; background-color: #f7fafc; border-left: 4px solid #031b4e; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #2d3748; white-space: pre-wrap;">${escapeHtml(safeMessage)}</div>
            </div>

            <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #edf2f7; font-size: 12px; color: #a0aec0; text-align: center;">
              Sent automatically from the Growth Catalyst Internship Portal.
            </div>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Internship application sendMail error:', {
      timestamp: new Date().toISOString(),
      name: err.name,
      message: err.message,
      code: err.code,
      command: err.command,
      responseCode: err.responseCode,
      stack: err.stack,
    });

    return res.status(500).json({
      success: false,
      error: 'Failed to send application. Please try again later.',
    });
  }
}
