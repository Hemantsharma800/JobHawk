const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, 'Glixtron.db');
const db = new sqlite3.Database(dbPath);

console.log('🔧 Initializing Glixtron SQLite Database...');

db.serialize(() => {
  // Create tables
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT CHECK(role IN ('user', 'editor', 'admin', 'super-admin')) DEFAULT 'user',
    isActive BOOLEAN DEFAULT 1,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    lastLogin DATETIME
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    salary_min DECIMAL(10,2),
    salary_max DECIMAL(10,2),
    salary_currency TEXT DEFAULT 'USD',
    description TEXT NOT NULL,
    requirements TEXT,
    skills TEXT,
    category TEXT CHECK(category IN ('full-time', 'part-time', 'contract', 'internship', 'remote')),
    posted_by INTEGER,
    isActive BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    job_id INTEGER,
    user_id INTEGER,
    status TEXT CHECK(status IN ('pending', 'reviewed', 'accepted', 'rejected')) DEFAULT 'pending',
    applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Create test users
  const testUsers = [
    {
      fullName: 'Super Admin',
      email: 'superadmin@Glixtron.com',
      password: bcrypt.hashSync('admin123', 10),
      role: 'super-admin'
    },
    {
      fullName: 'Admin User',
      email: 'admin@Glixtron.com',
      password: bcrypt.hashSync('admin123', 10),
      role: 'admin'
    },
    {
      fullName: 'Editor User',
      email: 'editor@Glixtron.com',
      password: bcrypt.hashSync('editor123', 10),
      role: 'editor'
    },
    {
      fullName: 'Regular User',
      email: 'user@Glixtron.com',
      password: bcrypt.hashSync('user123', 10),
      role: 'user'
    }
  ];

  testUsers.forEach(user => {
    db.run(
      'INSERT OR IGNORE INTO users (fullName, email, password, role) VALUES (?, ?, ?, ?)',
      [user.fullName, user.email, user.password, user.role]
    );
  });

  // Create sample jobs
  const sampleJobs = [
    {
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      salary_min: 120000,
      salary_max: 180000,
      description: 'Looking for experienced React developer.',
      requirements: 'React, JavaScript, TypeScript',
      skills: 'React,JavaScript,TypeScript',
      category: 'full-time',
      posted_by: 2
    },
    {
      title: 'Backend Engineer',
      company: 'DataSystems LLC',
      location: 'Remote',
      salary_min: 100000,
      salary_max: 150000,
      description: 'Node.js and Python developer needed.',
      requirements: 'Node.js, Python, SQL',
      skills: 'Node.js,Python,SQL',
      category: 'remote',
      posted_by: 3
    }
  ];

  sampleJobs.forEach(job => {
    db.run(
      `INSERT OR IGNORE INTO jobs (title, company, location, salary_min, salary_max, description, requirements, skills, category, posted_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [job.title, job.company, job.location, job.salary_min, job.salary_max, job.description, job.requirements, job.skills, job.category, job.posted_by]
    );
  });

  console.log('✅ Database initialized successfully!');
  console.log('📊 Check database at:', dbPath);
  
  db.close();
});
