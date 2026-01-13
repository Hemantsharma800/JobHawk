const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Job = require('../models/Job');

router.get('/dashboard/stats', auth(['admin', 'super-admin']), async (req, res) => {
  try {
    const [totalUsers, totalJobs, totalAdmins, activeJobs] = await Promise.all([
      User.countDocuments(),
      Job.countDocuments(),
      User.countDocuments({ role: { $in: ['admin', 'super-admin'] } }),
      Job.countDocuments({ isActive: true })
    ]);
    
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5).select('fullName email role createdAt');
    const recentJobs = await Job.find().sort({ createdAt: -1 }).limit(5).populate('postedBy', 'fullName email');
    
    res.json({ stats: { totalUsers, totalJobs, totalAdmins, activeJobs }, recentUsers, recentJobs });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/users', auth(['admin', 'super-admin']), async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/users/:id/role', auth(['super-admin']), async (req, res) => {
  try {
    const { role } = req.body;
    const validRoles = ['user', 'editor', 'admin', 'super-admin'];
    if (!validRoles.includes(role)) return res.status(400).json({ error: 'Invalid role' });
    
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/jobs', auth(['editor', 'admin', 'super-admin']), async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate('postedBy', 'fullName email')
      .populate('applications.user', 'fullName email')
      .sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/jobs', auth(['editor', 'admin', 'super-admin']), async (req, res) => {
  try {
    const jobData = { ...req.body, postedBy: req.user.id };
    const job = new Job(jobData);
    await job.save();
    const populatedJob = await Job.findById(job._id).populate('postedBy', 'fullName email');
    res.status(201).json(populatedJob);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/jobs/:id', auth(['editor', 'admin', 'super-admin']), async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('postedBy', 'fullName email');
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/jobs/:id', auth(['admin', 'super-admin']), async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/test', auth(['user', 'editor', 'admin', 'super-admin']), async (req, res) => {
  res.json({ 
    message: 'Test endpoint works!',
    user: req.user,
    mode: req.headers['x-test-mode'] === 'true' ? 'test' : 'live'
  });
});

module.exports = router;
