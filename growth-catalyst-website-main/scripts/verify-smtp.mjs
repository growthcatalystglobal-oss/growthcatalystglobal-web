/**
 * SMTP Connection Verification Script
 * ------------------------------------
 * Run this ONCE locally to confirm your Gmail App Password works
 * before deploying to Vercel. This is NOT used in production.
 *
 * Usage:
 *   1. Make sure your .env or .env.local has GMAIL_USER and GMAIL_APP_PASSWORD
 *   2. Run:  node scripts/verify-smtp.mjs
 *
 * Expected output on success:
 *   ✅ SMTP connection verified! Gmail credentials are working.
 *
 * If it fails, you'll see the exact Nodemailer error (auth failure,
 * connection timeout, blocked account, etc.)
 */

import nodemailer from 'nodemailer';
import { config } from 'dotenv';
import { existsSync } from 'fs';

// Load environment variables — try .env.local first, fall back to .env
if (existsSync('.env.local')) {
  config({ path: '.env.local' });
  console.log('📂 Loaded .env.local');
} else if (existsSync('.env')) {
  config({ path: '.env' });
  console.log('📂 Loaded .env');
} else {
  console.error('❌ No .env or .env.local file found. Create one first.');
  process.exit(1);
}

const GMAIL_USER = (process.env.GMAIL_USER || '').trim();
const GMAIL_APP_PASSWORD = (process.env.GMAIL_APP_PASSWORD || '')
  .replace(/['"]/g, '')
  .replace(/\s+/g, '');

if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
  console.error('❌ Missing GMAIL_USER or GMAIL_APP_PASSWORD in environment.');
  console.error('   GMAIL_USER:', GMAIL_USER ? '✓ set' : '✗ MISSING');
  console.error('   GMAIL_APP_PASSWORD:', GMAIL_APP_PASSWORD ? '✓ set' : '✗ MISSING');
  process.exit(1);
}

console.log(`\n🔌 Connecting to smtp.gmail.com:465 as ${GMAIL_USER}...`);
console.log(`   App Password: ${'*'.repeat(GMAIL_APP_PASSWORD.length - 4)}${GMAIL_APP_PASSWORD.slice(-4)}\n`);

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
  // Force IPv4 — some networks advertise IPv6 but can't route to Google
  dnsOptions: { family: 4 },
});

try {
  await transporter.verify();
  console.log('✅ SMTP connection verified! Gmail credentials are working.');
  console.log('   You can now deploy to Vercel with confidence.\n');
} catch (err) {
  console.error('❌ SMTP verification FAILED:\n');
  console.error('   Error:', err.message);
  console.error('   Code:', err.code);
  if (err.command) console.error('   Command:', err.command);
  if (err.responseCode) console.error('   Response Code:', err.responseCode);
  console.error('\n🔍 Troubleshooting:');
  console.error('   1. Is 2-Step Verification enabled on your Google Account?');
  console.error('      → https://myaccount.google.com/security');
  console.error('   2. Did you generate an App Password (not your regular password)?');
  console.error('      → https://myaccount.google.com/apppasswords');
  console.error('   3. If using Google Workspace, ask your admin to allow App Passwords.');
  console.error('   4. Check if your account is temporarily locked due to suspicious activity.\n');
  process.exit(1);
}
