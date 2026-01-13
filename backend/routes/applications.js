const express = require('express');
const router = express.Router();

// Get user applications
router.get('/', (req, res) => {
  const applications = [
    {
      id: 'app-1',
      jobTitle: 'Senior React Developer',
      company: 'Tech Corp Inc',
      status: 'interview',
      appliedDate: '2024-01-10',
      interviewDate: '2024-01-20',
      portal: 'linkedin'
    },
    {
      id: 'app-2',
      jobTitle: 'Frontend Engineer',
      company: 'Startup XYZ',
      status: 'applied',
      appliedDate: '2024-01-09',
      portal: 'indeed'
    },
    {
      id: 'app-3',
      jobTitle: 'Full Stack Developer',
      company: 'Digital Solutions',
      status: 'saved',
      portal: 'glassdoor'
    }
  ];
  
  res.json(applications);
});

// Create application
router.post('/', (req, res) => {
  const { jobId, jobTitle, company, portal } = req.body;
  
  const newApplication = {
    id: 'app-' + Date.now(),
    jobTitle,
    company,
    status: 'saved',
    date: new Date().toISOString().split('T')[0],
    portal
  };
  
  res.status(201).json({
    success: true,
    message: 'Application saved',
    application: newApplication
  });
});

// Update application status
router.put('/:id', (req, res) => {
  const { status, notes } = req.body;
  
  res.json({
    success: true,
    message: 'Application updated',
    application: {
      id: req.params.id,
      status,
      notes,
      updatedAt: new Date().toISOString()
    }
  });
});

module.exports = router;
