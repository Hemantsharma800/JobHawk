const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, 'Glixtron.db');
const db = new sqlite3.Database(dbPath);

console.log('🔧 Initializing Glixtron SQLite Database...');

// Drop tables if they exist (for clean setup)
db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS users`);
  db.run(`DROP TABLE IF EXISTS jobs`);
  db.run(`DROP TABLE IF EXISTS applications`);
  db.run(`DROP TABLE IF EXISTS user_profiles`);

  // Create users table
  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT CHECK(role IN ('user', 'editor', 'admin', 'super-admin')) DEFAULT 'user',
      isActive BOOLEAN DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      lastLogin DATETIME,
      profile_complete BOOLEAN DEFAULT 0
    )
  `);

  // Create user_profiles table
  db.run(`
    CREATE TABLE user_profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      phone TEXT,
      location TEXT,
      resume_url TEXT,
      skills TEXT,
      experience INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Create jobs table
  db.run(`
    CREATE TABLE jobs (
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
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (posted_by) REFERENCES users(id)
    )
  `);

  // Create applications table
  db.run(`
    CREATE TABLE applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      job_id INTEGER,
      user_id INTEGER,
      status TEXT CHECK(status IN ('pending', 'reviewed', 'accepted', 'rejected')) DEFAULT 'pending',
      applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  console.log('✅ Database tables created successfully');

  // Create test users with hashed passwords
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
    },
    {
      fullName: 'John Doe',
      email: 'john@example.com',
      password: bcrypt.hashSync('password123', 10),
      role: 'user'
    },
    {
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      password: bcrypt.hashSync('password123', 10),
      role: 'user'
    }
  ];

  const insertUser = db.prepare(`
    INSERT INTO users (fullName, email, password, role, isActive) 
    VALUES (?, ?, ?, ?, 1)
  `);

  testUsers.forEach(user => {
    insertUser.run(user.fullName, user.email, user.password, user.role);
  });
  insertUser.finalize();

  console.log('✅ Test users created');

  // Create sample jobs
  const sampleJobs = [
    {
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      salary_min: 120000,
      salary_max: 180000,
      description: 'We are looking for an experienced Frontend Developer to join our team.',
      requirements: 'React, JavaScript, TypeScript, HTML/CSS',
      skills: 'React,Redux,JavaScript,TypeScript',
      category: 'full-time',
      posted_by: 2
    },
    {
      title: 'Backend Engineer',
      company: 'DataSystems LLC',
      location: 'Remote',
      salary_min: 100000,
      salary_max: 150000,
      description: 'Build scalable backend systems using Node.js and Python.',
      requirements: 'Node.js, Python, SQL, AWS',
      skills: 'Node.js,Python,PostgreSQL,AWS',
      category: 'remote',
      posted_by: 3
    },
    {
      title: 'UX/UI Designer',
      company: 'CreativeMinds',
      location: 'New York, NY',
      salary_min: 80000,
      salary_max: 120000,
      description: 'Design beautiful user interfaces for our web and mobile applications.',
      requirements: 'Figma, Adobe XD, Sketch, UI/UX principles',
      skills: 'Figma,UI Design,UX Research,Prototyping',
      category: 'full-time',
      posted_by: 2
    },
    {
      title: 'DevOps Engineer',
      company: 'CloudSolutions',
      location: 'Austin, TX',
      salary_min: 110000,
      salary_max: 160000,
      description: 'Manage our cloud infrastructure and CI/CD pipelines.',
      requirements: 'Docker, Kubernetes, AWS, Jenkins',
      skills: 'Docker,Kubernetes,AWS,CI/CD',
      category: 'full-time',
      posted_by: 3
    },
    {
      title: 'Marketing Intern',
      company: 'StartupXYZ',
      location: 'Chicago, IL',
      salary_min: 20000,
      salary_max: 30000,
      description: 'Summer internship for marketing students.',
      requirements: 'Marketing knowledge, Social media, Communication skills',
      skills: 'Marketing,Social Media,Content Creation',
      category: 'internship',
      posted_by: 2
    }
  ];

  const insertJob = db.prepare(`
    INSERT INTO jobs (title, company, location, salary_min, salary_max, description, requirements, skills, category, posted_by, isActive)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
  `);

  sampleJobs.forEach(job => {
    insertJob.run(
      job.title,
      job.company,
      job.location,
      job.salary_min,
      job.salary_max,
      job.description,
      job.requirements,
      job.skills,
      job.category,
      job.posted_by
    );
  });
  insertJob.finalize();

  console.log('✅ Sample jobs created');

  // Create some applications
  const insertApplication = db.prepare(`
    INSERT INTO applications (job_id, user_id, status) VALUES (?, ?, ?)
  `);

  // User 4 (Regular User) applies for jobs
  insertApplication.run(1, 4, 'pending');
  insertApplication.run(2, 4, 'reviewed');
  insertApplication.run(3, 5, 'pending');
  insertApplication.run(4, 6, 'accepted');
  insertApplication.finalize();

  console.log('✅ Sample applications created');

  console.log('\n📊 Database Summary:');
  db.get(`SELECT COUNT(*) as user_count FROM users`, (err, row) => {
    console.log(`   Users: ${row.user_count}`);
  });
  
  db.get(`SELECT COUNT(*) as job_count FROM jobs`, (err, row) => {
    console.log(`   Jobs: ${row.job_count}`);
  });
  
  db.get(`SELECT COUNT(*) as app_count FROM applications`, (err, row) => {
    console.log(`   Applications: ${row.app_count}`);
  });

  console.log('\n🔑 Test Login Credentials:');
  console.log('   Super Admin: superadmin@Glixtron.com / admin123');
  console.log('   Admin: admin@Glixtron.com / admin123');
  console.log('   Editor: editor@Glixtron.com / editor123');
  console.log('   User: user@Glixtron.com / user123');
  console.log('   User: john@example.com / password123');
  console.log('   User: jane@example.com / password123');

  console.log('\n✅ Database initialization complete!');
  db.close();
});
