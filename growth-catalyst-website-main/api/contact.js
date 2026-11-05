// Vercel Serverless Function — Contact Form Handler
// Sends emails via Gmail SMTP using Nodemailer
// Requires GMAIL_USER and GMAIL_APP_PASSWORD environment variables

import nodemailer from 'nodemailer';

// --- Validation helpers ---

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateFields({ name, email, message }) {
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return 'Name is required.';
  }
  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    return 'Email is required.';
  }
  if (!EMAIL_REGEX.test(email.trim())) {
    return 'Please provide a valid email address.';
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
  if (message.trim().length > 5000) {
    return 'Message is too long (max 5000 characters).';
  }
  return null;
}

// --- Handler ---

export default async function handler(req, res) {
  // Return friendly status on GET for easy browser testing
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      message: 'Growth Catalyst Contact API is online. Use POST to send messages.',
    });
  }

  // Only allow POST for submissions
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ success: false, error: 'Method not allowed.' });
  }

  try {
    const { name, email, message, _honeypot, _loadedAt } = req.body || {};

    // Honeypot check — bots auto-fill hidden fields.
    // If filled, pretend success so the bot thinks it worked.
    if (_honeypot) {
      return res.status(200).json({ success: true });
    }

    // Timestamp-based rate limiting — reject if submitted too fast (< 2s)
    if (_loadedAt) {
      const elapsed = Date.now() - Number(_loadedAt);
      if (elapsed < 2000) {
        return res.status(200).json({ success: true }); // silent rejection
      }
    }

    // Validate fields
    const validationError = validateFields({ name, email, message });
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
      // Force IPv4 — some networks advertise IPv6 but can't route to Google
      dnsOptions: { family: 4 },
    });

    const safeName = name.trim();
    const safeEmail = email.trim();
    const safeMessage = message.trim();

    // Compose & send email
    await transporter.sendMail({
      from: `"Growth Catalyst Website" <${gmailUser}>`,
      replyTo: `"${safeName}" <${safeEmail}>`,
      to: gmailUser,
      subject: `📬 New Contact Message from ${safeName}`,
      text: [
        `=== NEW CONTACT MESSAGE ===`,
        `Name: ${safeName}`,
        `Email: ${safeEmail}`,
        '',
        `Message:`,
        safeMessage,
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
          <div style="background-color: #031b4e; padding: 20px 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: #ffffff; margin: 0; font-size: 20px;">
              📬 New Contact Message
            </h2>
            <p style="color: #a3b8cc; margin: 6px 0 0; font-size: 14px;">
              Received via <strong>Growth Catalyst Contact Form</strong>
            </p>
          </div>
          
          <div style="padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px; background-color: #ffffff;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 10px 12px; font-weight: bold; color: #4a5568; width: 140px; border-bottom: 1px solid #edf2f7;">Sender Name</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #edf2f7; color: #1a202c; font-weight: 600;">${escapeHtml(safeName)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; font-weight: bold; color: #4a5568; border-bottom: 1px solid #edf2f7;">Email Address</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #edf2f7;">
                  <a href="mailto:${escapeHtml(safeEmail)}" style="color: #0052cc; text-decoration: none;">${escapeHtml(safeEmail)}</a>
                </td>
              </tr>
            </table>

            <div style="margin-top: 20px;">
              <p style="margin: 0 0 8px; font-weight: bold; color: #4a5568; font-size: 14px;">Message:</p>
              <div style="padding: 16px; background-color: #f7fafc; border-left: 4px solid #031b4e; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #2d3748; white-space: pre-wrap;">${escapeHtml(safeMessage)}</div>
            </div>

            <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #edf2f7; font-size: 12px; color: #a0aec0; text-align: center;">
              Sent automatically from the Growth Catalyst website contact form.
            </div>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    // Log the full Nodemailer error for server-side diagnosis
    // (auth failures, connection timeouts, Gmail rate limits, etc.)
    console.error('Contact form sendMail error:', {
      timestamp: new Date().toISOString(),
      name: err.name,
      message: err.message,
      code: err.code,
      command: err.command,
      responseCode: err.responseCode,
      stack: err.stack,
    });
    // Return generic error to client — never leak SMTP details
    return res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again later.',
    });
  }
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
