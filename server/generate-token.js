// generate-token.js
const jwt = require('jsonwebtoken');

const payload = {
  sub: '1234567890',
  name: 'Test User',
  iat: Math.floor(Date.now() / 1000)
};

// This secret must match the one in server/src/config/config.ts
const secret = 'your-256-bit-secret';
const token = jwt.sign(payload, secret, { expiresIn: '7d' }); // 7-day expiration

console.log(token);