const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route (test this first)
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', port: process.env.PORT });
});

// Routes - wrap in try/catch to catch import errors
try {
  app.use('/api/auth', require('./routes/auth'));
  console.log('✅ Auth routes loaded');
} catch(e) {
  console.error('❌ Auth routes failed:', e.message);
}

try {
  app.use('/api/birds', require('./routes/birds'));
  console.log('✅ Birds routes loaded');
} catch(e) {
  console.error('❌ Birds routes failed:', e.message);
}

try {
  app.use('/api/contact', require('./routes/contact'));
  console.log('✅ Contact routes loaded');
} catch(e) {
  console.error('❌ Contact routes failed:', e.message);
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});