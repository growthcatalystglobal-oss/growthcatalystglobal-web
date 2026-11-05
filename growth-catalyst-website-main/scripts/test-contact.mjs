/**
 * Test Contact Form Submission Script
 * ------------------------------------
 * Sends a real POST to your contact form API (local or deployed)
 * to confirm the full email pipeline works end-to-end.
 *
 * Usage:
 *   Local:     node scripts/test-contact.mjs
 *   Deployed:  node scripts/test-contact.mjs https://your-site.vercel.app
 *
 * After running, check the Gmail inbox for the test email.
 */

const BASE_URL = process.argv[2] || 'http://localhost:5173';
const API_URL = `${BASE_URL}/api/contact`;

const testPayload = {
  name: 'Test User',
  email: 'test@example.com',
  message: `This is a test submission from the verify script.\nTimestamp: ${new Date().toISOString()}`,
  _honeypot: '',
  _loadedAt: Date.now() - 10000, // Simulate 10s on page (passes timing check)
};

console.log(`\n📬 Sending test submission to: ${API_URL}`);
console.log(`   Payload:`, JSON.stringify(testPayload, null, 2), '\n');

try {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testPayload),
  });

  const data = await response.json().catch(() => ({}));

  if (response.ok && data.success) {
    console.log('✅ Success! Response:', JSON.stringify(data));
    console.log('   → Check your Gmail inbox for the test email.\n');
  } else {
    console.error('❌ API returned an error:');
    console.error('   Status:', response.status);
    console.error('   Response:', JSON.stringify(data));
    console.error('\n   If you see a 500 error, check the Vercel function logs or local terminal.\n');
  }
} catch (err) {
  console.error('❌ Network error — could not reach the API:');
  console.error('   ', err.message);
  console.error(`\n   Is the dev server running? Try: npm run dev\n`);
}
