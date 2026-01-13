const express = require('express');
const router = express.Router();

// Simulated email service
router.post('/send-welcome', (req, res) => {
  const { email, name } = req.body;
  
  console.log(`📧 Welcome email sent to: ${email}`);
  console.log(`👋 Welcome ${name} to Glixtron!`);
  console.log(`📝 Email content: Welcome to Glixtron! Your job search journey begins now.`);
  
  res.json({
    success: true,
    message: 'Welcome email sent successfully',
    recipient: email,
    timestamp: new Date().toISOString()
  });
});

router.post('/send-application', (req, res) => {
  const { email, company, position } = req.body;
  
  console.log(`📧 Application confirmation sent to: ${email}`);
  console.log(`🏢 Application for ${position} at ${company} confirmed`);
  
  res.json({
    success: true,
    message: 'Application confirmation sent',
    recipient: email,
    company,
    position
  });
});

module.exports = router;
