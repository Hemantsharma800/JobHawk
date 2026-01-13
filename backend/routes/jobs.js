const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const Application = require('../models/Application');

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', portal } = req.query;
    const query = {};
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (portal) {
      query.portal = portal;
    }
    
    const jobs = await Job.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ postedDate: -1 });
    
    const total = await Job.countDocuments(query);
    
    res.json({
      jobs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalJobs: total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single job
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save/unsave job
router.post('/:id/save', async (req, res) => {
  try {
    // In real app, you would validate user from JWT
    const { userId } = req.body;
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    const isSaved = job.savedBy.includes(userId);
    
    if (isSaved) {
      job.savedBy.pull(userId);
      await job.save();
      res.json({ saved: false, message: 'Job unsaved' });
    } else {
      job.savedBy.push(userId);
      await job.save();
      res.json({ saved: true, message: 'Job saved' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Seed demo jobs
router.post('/seed/demo', async (req, res) => {
  try {
    const demoJobs = [
      {
        title: 'Senior React Developer',
        company: 'Tech Corp Inc',
        location: 'Remote',
        description: 'Looking for experienced React developer with 5+ years experience...',
        portal: 'linkedin',
        url: 'https://linkedin.com/jobs/view/123',
        type: 'full-time',
        salary: { min: 120000, max: 180000, currency: 'USD' }
      },
      {
        title: 'Frontend Engineer',
        company: 'Startup XYZ',
        location: 'San Francisco, CA',
        description: 'Join our fast-growing startup as a Frontend Engineer...',
        portal: 'indeed',
        url: 'https://indeed.com/jobs/view/456',
        type: 'full-time',
        salary: { min: 100000, max: 150000, currency: 'USD' }
      },
      {
        title: 'Full Stack Developer',
        company: 'Digital Solutions',
        location: 'New York, NY',
        description: 'Full stack developer needed for exciting projects...',
        portal: 'glassdoor',
        url: 'https://glassdoor.com/jobs/view/789',
        type: 'contract',
        salary: { min: 80000, max: 120000, currency: 'USD' }
      }
    ];
    
    await Job.deleteMany({});
    const jobs = await Job.insertMany(demoJobs);
    
    res.json({ 
      message: 'Demo jobs seeded successfully',
      count: jobs.length,
      jobs 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
