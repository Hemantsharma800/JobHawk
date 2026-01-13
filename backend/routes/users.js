const express = require('express');
const router = express.Router();

// Get user profile
router.get('/profile', (req, res) => {
  // In real app, get user from JWT token
  const demoUser = {
    id: 'user-123',
    email: 'patch@example.com',
    name: 'Patch User',
    photo: 'https://ui-avatars.com/api/?name=Patch+User&background=764ba2&color=fff',
    userType: 'user',
    connectedPortals: {
      linkedin: true,
      indeed: true,
      glassdoor: false,
      github: false,
      monster: false
    },
    createdAt: '2024-01-01T00:00:00.000Z',
    lastLogin: new Date().toISOString()
  };
  
  res.json(demoUser);
});

// Update portal connections
router.put('/portals', (req, res) => {
  const { portal, connected } = req.body;
  
  // In real app, update in database
  const validPortals = ['linkedin', 'indeed', 'glassdoor', 'github', 'monster'];
  
  if (!validPortals.includes(portal)) {
    return res.status(400).json({ error: 'Invalid portal' });
  }
  
  res.json({
    success: true,
    message: `Portal ${portal} ${connected ? 'connected' : 'disconnected'}`,
    portal,
    connected
  });
});

// Get user stats
router.get('/stats', (req, res) => {
  const stats = {
    totalApplications: 12,
    interviews: 3,
    offers: 1,
    rejections: 2,
    savedJobs: 5,
    activePortals: 2
  };
  
  res.json(stats);
});

module.exports = router;
