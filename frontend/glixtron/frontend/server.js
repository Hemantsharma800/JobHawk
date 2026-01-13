require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const jobRoutes = require('./routes/jobs');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/jobs', jobRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Glixtron API'
  });
});

app.get('/api/setup/test-data', async (req, res) => {
  try {
    const User = require('./models/User');
    const testUsers = [
      { fullName: 'Super Admin', email: 'superadmin@Glixtron.com', password: 'admin123', role: 'super-admin' },
      { fullName: 'Admin User', email: 'admin@Glixtron.com', password: 'admin123', role: 'admin' },
      { fullName: 'Editor User', email: 'editor@Glixtron.com', password: 'editor123', role: 'editor' },
      { fullName: 'Regular User', email: 'user@Glixtron.com', password: 'user123', role: 'user' }
    ];
    
    for (const userData of testUsers) {
      const exists = await User.findOne({ email: userData.email });
      if (!exists) {
        const user = new User(userData);
        await user.save();
      }
    }
    
    res.json({ 
      message: 'Test users created/verified',
      users: testUsers.map(u => ({ email: u.email, role: u.role, password: u.password }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`👥 Test data: http://localhost:${PORT}/api/setup/test-data`);
  console.log(`\n🔑 Test Logins:`);
  console.log(`   Super Admin: superadmin@Glixtron.com / admin123`);
  console.log(`   Admin: admin@Glixtron.com / admin123`);
  console.log(`   Editor: editor@Glixtron.com / editor123`);
  console.log(`   User: user@Glixtron.com / user123`);
});
