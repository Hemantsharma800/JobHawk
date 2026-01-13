const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../database/db');

// Admin Dashboard Stats
router.get('/dashboard/stats', auth(['admin', 'super-admin']), async (req, res) => {
  try {
    const [
      { totalUsers },
      { totalJobs },
      { totalAdmins },
      { activeJobs },
      recentUsers,
      recentJobs
    ] = await Promise.all([
      db.getAsync('SELECT COUNT(*) as totalUsers FROM users'),
      db.getAsync('SELECT COUNT(*) as totalJobs FROM jobs'),
      db.getAsync('SELECT COUNT(*) as totalAdmins FROM users WHERE role IN ("admin", "super-admin")'),
      db.getAsync('SELECT COUNT(*) as activeJobs FROM jobs WHERE isActive = 1'),
      db.allAsync('SELECT id, fullName, email, role, createdAt FROM users ORDER BY createdAt DESC LIMIT 5'),
      db.allAsync(`
        SELECT j.*, u.fullName, u.email 
        FROM jobs j 
        LEFT JOIN users u ON j.posted_by = u.id 
        ORDER BY j.created_at DESC LIMIT 5
      `)
    ]);

    res.json({
      stats: { totalUsers, totalJobs, totalAdmins, activeJobs },
      recentUsers,
      recentJobs
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all users
router.get('/users', auth(['admin', 'super-admin']), async (req, res) => {
  try {
    const users = await db.allAsync(`
      SELECT id, fullName, email, role, isActive, createdAt, lastLogin 
      FROM users 
      ORDER BY createdAt DESC
    `);
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user role
router.put('/users/:id/role', auth(['super-admin']), async (req, res) => {
  try {
    const { role } = req.body;
    const validRoles = ['user', 'editor', 'admin', 'super-admin'];
    
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    await db.runAsync('UPDATE users SET role = ? WHERE id = ?', [role, req.params.id]);
    
    const user = await db.getAsync(
      'SELECT id, fullName, email, role FROM users WHERE id = ?',
      [req.params.id]
    );

    if (!user) return res.status(404).json({ error: 'User not found' });
    
    res.json(user);
  } catch (error) {
    console.error('Update role error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all jobs with admin controls
router.get('/jobs', auth(['editor', 'admin', 'super-admin']), async (req, res) => {
  try {
    const jobs = await db.allAsync(`
      SELECT j.*, u.fullName as postedByName, u.email as postedByEmail,
      (SELECT COUNT(*) FROM applications a WHERE a.job_id = j.id) as application_count
      FROM jobs j
      LEFT JOIN users u ON j.posted_by = u.id
      ORDER BY j.created_at DESC
    `);
    
    // Get applications for each job
    for (let job of jobs) {
      job.applications = await db.allAsync(`
        SELECT a.*, u.fullName, u.email 
        FROM applications a
        LEFT JOIN users u ON a.user_id = u.id
        WHERE a.job_id = ?
      `, [job.id]);
    }
    
    res.json(jobs);
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create job
router.post('/jobs', auth(['editor', 'admin', 'super-admin']), async (req, res) => {
  try {
    const { title, company, location, salary_min, salary_max, description, requirements, skills, category } = req.body;
    
    const result = await db.runAsync(
      `INSERT INTO jobs (title, company, location, salary_min, salary_max, description, requirements, skills, category, posted_by, isActive)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
      [title, company, location, salary_min, salary_max, description, requirements, skills, category, req.user.id]
    );

    const job = await db.getAsync(`
      SELECT j.*, u.fullName as postedByName, u.email as postedByEmail 
      FROM jobs j 
      LEFT JOIN users u ON j.posted_by = u.id 
      WHERE j.id = ?
    `, [result.id]);

    res.status(201).json(job);
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update job
router.put('/jobs/:id', auth(['editor', 'admin', 'super-admin']), async (req, res) => {
  try {
    const { title, company, location, salary_min, salary_max, description, requirements, skills, category, isActive } = req.body;
    
    await db.runAsync(
      `UPDATE jobs SET 
        title = ?, company = ?, location = ?, salary_min = ?, salary_max = ?,
        description = ?, requirements = ?, skills = ?, category = ?, isActive = ?
       WHERE id = ?`,
      [title, company, location, salary_min, salary_max, description, requirements, skills, category, isActive, req.params.id]
    );

    const job = await db.getAsync(`
      SELECT j.*, u.fullName as postedByName, u.email as postedByEmail 
      FROM jobs j 
      LEFT JOIN users u ON j.posted_by = u.id 
      WHERE j.id = ?
    `, [req.params.id]);

    if (!job) return res.status(404).json({ error: 'Job not found' });
    
    res.json(job);
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete job
router.delete('/jobs/:id', auth(['admin', 'super-admin']), async (req, res) => {
  try {
    await db.runAsync('DELETE FROM jobs WHERE id = ?', [req.params.id]);
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
