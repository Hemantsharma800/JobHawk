const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../database/db');

// Get premium stats
router.get('/stats', async (req, res) => {
  try {
    const [
      { totalJobs },
      { totalUsers },
      { totalApplications },
      topCompanies,
      trendingJobs
    ] = await Promise.all([
      db.getAsync('SELECT COUNT(*) as totalJobs FROM jobs WHERE isActive = 1'),
      db.getAsync('SELECT COUNT(*) as totalUsers FROM users WHERE isActive = 1'),
      db.getAsync('SELECT COUNT(*) as totalApplications FROM applications'),
      db.allAsync(`
        SELECT company, COUNT(*) as job_count 
        FROM jobs 
        WHERE isActive = 1 
        GROUP BY company 
        ORDER BY job_count DESC 
        LIMIT 5
      `),
      db.allAsync(`
        SELECT j.*, COUNT(a.id) as application_count
        FROM jobs j
        LEFT JOIN applications a ON j.id = a.job_id
        WHERE j.isActive = 1
        GROUP BY j.id
        ORDER BY application_count DESC
        LIMIT 5
      `)
    ]);

    res.json({
      overview: {
        totalJobs,
        totalUsers,
        totalApplications,
        activeToday: Math.floor(Math.random() * 100) + 50
      },
      topCompanies,
      trendingJobs
    });
  } catch (error) {
    console.error('Premium stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Search jobs with advanced filters
router.get('/search', async (req, res) => {
  try {
    const { q, location, category, salary_min, salary_max, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT j.*, u.fullName as postedByName 
      FROM jobs j 
      LEFT JOIN users u ON j.posted_by = u.id 
      WHERE j.isActive = 1
    `;
    
    const params = [];
    
    if (q) {
      query += ` AND (j.title LIKE ? OR j.company LIKE ? OR j.description LIKE ?)`;
      const searchTerm = `%${q}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }
    
    if (location) {
      query += ` AND j.location LIKE ?`;
      params.push(`%${location}%`);
    }
    
    if (category) {
      query += ` AND j.category = ?`;
      params.push(category);
    }
    
    if (salary_min) {
      query += ` AND j.salary_min >= ?`;
      params.push(salary_min);
    }
    
    if (salary_max) {
      query += ` AND j.salary_max <= ?`;
      params.push(salary_max);
    }
    
    query += ` ORDER BY j.created_at DESC LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), offset);
    
    const jobs = await db.allAsync(query, params);
    
    // Get total count for pagination
    let countQuery = `SELECT COUNT(*) as total FROM jobs WHERE isActive = 1`;
    const countParams = params.slice(0, -2);
    
    const countResult = await db.getAsync(countQuery, countParams);
    
    res.json({
      jobs,
      total: countResult.total,
      page: parseInt(page),
      totalPages: Math.ceil(countResult.total / limit)
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
