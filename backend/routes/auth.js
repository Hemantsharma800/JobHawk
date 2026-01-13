const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');

// Google OAuth login
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: req.user.id,
        email: req.user.email,
        name: req.user.name 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(req.user))}`);
  }
);

// Demo login for development
router.post('/demo', (req, res) => {
  const { email, name } = req.body;
  
  const demoUser = {
    id: 'demo-' + Date.now(),
    email: email || 'demo@example.com',
    name: name || 'Demo User',
    photo: 'https://ui-avatars.com/api/?name=Demo+User&background=667eea&color=fff'
  };
  
  const token = jwt.sign(
    { 
      userId: demoUser.id,
      email: demoUser.email,
      name: demoUser.name 
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  
  res.json({
    success: true,
    token,
    user: demoUser
  });
});

// Logout
router.get('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

// Verify token
router.get('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ valid: false, message: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ valid: false, message: 'Invalid token' });
  }
});

module.exports = router;
