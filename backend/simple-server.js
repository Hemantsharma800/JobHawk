const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

console.log('🚀 Simple API Server Running');

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'MongoDB installing in other tab...',
    timestamp: new Date() 
  });
});

// Mock endpoints for frontend testing
app.post('/api/auth/login', (req, res) => {
  console.log('Mock login attempt:', req.body.email);
  res.json({
    success: true,
    token: 'mock-jwt-token-for-testing',
    user: {
      id: 1,
      email: req.body.email || 'admin@Glixtron.com',
      name: 'Test User',
      role: req.body.email === 'admin@Glixtron.com' ? 'admin' : 'user'
    }
  });
});

app.get('/api/auth/me', (req, res) => {
  res.json({
    success: true,
    user: {
      id: 1,
      email: 'admin@Glixtron.com',
      name: 'Admin User',
      role: 'admin'
    }
  });
});

const PORT = 5001; // Different port since 5000 might conflict
app.listen(PORT, () => {
  console.log(`📡 API running on http://localhost:${PORT}`);
  console.log(`🔗 Test login with any email/password`);
});
