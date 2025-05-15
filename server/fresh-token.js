// fresh-token.js
const jwt = require('jsonwebtoken');

// IMPORTANT: This must match EXACTLY what's in your server logs
const SECRET = 'your-256-bit-secret';

const payload = {
  sub: '1234567890',
  name: 'Test User',
  iat: Math.floor(Date.now() / 1000)
};

// Create token with a very long expiration
const token = jwt.sign(payload, SECRET, { expiresIn: '30d' });

console.log('Generated token:');
console.log(token);
console.log('\nSecret used:');
console.log(SECRET);
