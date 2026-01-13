require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const jobRoutes = require('./routes/jobs');
const db = require('./database/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/jobs', jobRoutes);

// Health check
app.get('/api/health', (req, res) => {
  db.get('SELECT 1 as status', (err) => {
    if (err) {
      res.json({ 
        status: 'ERROR', 
        database: 'Disconnected',
        timestamp: new Date().toISOString()
      });
    } else {
      res.json({ 
        status: 'OK', 
        database: 'Connected',
        timestamp: new Date().toISOString(),
        service: 'Glixtron API (SQLite)'
      });
    }
  });
});

// Database info endpoint
app.get('/api/db-info', async (req, res) => {
  try {
    const [users, jobs, applications] = await Promise.all([
      db.getAsync('SELECT COUNT(*) as count FROM users'),
      db.getAsync('SELECT COUNT(*) as count FROM jobs'),
      db.getAsync('SELECT COUNT(*) as count FROM applications')
    ]);

    res.json({
      users: users.count,
      jobs: jobs.count,
      applications: applications.count,
      dbPath: path.join(__dirname, 'database', 'Glixtron.db')
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Test endpoint for quick setup
app.get('/api/setup/test-data', (req, res) => {
  res.json({
    message: 'Database already initialized with test data!',
    credentials: {
      superAdmin: { email: 'superadmin@Glixtron.com', password: 'admin123', role: 'super-admin' },
      admin: { email: 'admin@Glixtron.com', password: 'admin123', role: 'admin' },
      editor: { email: 'editor@Glixtron.com', password: 'editor123', role: 'editor' },
      user: { email: 'user@Glixtron.com', password: 'user123', role: 'user' },
      additionalUsers: [
        { email: 'john@example.com', password: 'password123' },
        { email: 'jane@example.com', password: 'password123' }
      ]
    },
    sampleData: {
      jobs: 5,
      applications: 4
    }
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🗄️  Database info: http://localhost:${PORT}/api/db-info`);
  console.log(`👥 Test data: http://localhost:${PORT}/api/setup/test-data`);
  console.log(`\n🔑 Available Test Logins:`);
  console.log(`   Super Admin: superadmin@Glixtron.com / admin123`);
  console.log(`   Admin: admin@Glixtron.com / admin123`);
  console.log(`   Editor: editor@Glixtron.com / editor123`);
  console.log(`   User: user@Glixtron.com / user123`);
  console.log(`   User: john@example.com / password123`);
  console.log(`   User: jane@example.com / password123`);
  console.log(`\n💾 Database: SQLite (Glixtron.db) - No MongoDB required!`);
});
