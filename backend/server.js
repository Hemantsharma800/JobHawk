const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Mock jobs data
const mockJobs = [
  { id: 1, title: 'Frontend Developer', company: 'Tech Corp', location: 'Remote', salary: '$80k - $120k', type: 'Full-time', description: 'We are looking for a skilled Frontend Developer...' },
  { id: 2, title: 'Backend Engineer', company: 'Startup Inc', location: 'New York', salary: '$90k - $130k', type: 'Full-time', description: 'Join our backend team to build scalable APIs...' },
  { id: 3, title: 'Full Stack Developer', company: 'Digital Solutions', location: 'San Francisco', salary: '$100k - $150k', type: 'Contract', description: 'Full stack role working on modern web applications...' },
  { id: 4, title: 'DevOps Engineer', company: 'Cloud Systems', location: 'Austin', salary: '$85k - $125k', type: 'Full-time', description: 'Manage our cloud infrastructure and CI/CD pipelines...' },
  { id: 5, title: 'UX Designer', company: 'Creative Agency', location: 'Chicago', salary: '$70k - $110k', type: 'Full-time', description: 'Design beautiful and intuitive user interfaces...' },
  { id: 6, title: 'Data Scientist', company: 'Analytics Co', location: 'Remote', salary: '$95k - $140k', type: 'Full-time', description: 'Work with large datasets to extract insights...' },
  { id: 7, title: 'Mobile Developer', company: 'AppWorks', location: 'Los Angeles', salary: '$85k - $130k', type: 'Full-time', description: 'Build cross-platform mobile applications...' },
  { id: 8, title: 'Product Manager', company: 'GrowthTech', location: 'Boston', salary: '$110k - $160k', type: 'Full-time', description: 'Lead product development from ideation to launch...' },
];

// Mock users (for demo)
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', applications: 5, interviews: 2, offers: 1 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', applications: 8, interviews: 3, offers: 2 },
];

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Glixtron API is running',
    endpoints: {
      jobs: '/api/jobs',
      jobById: '/api/jobs/:id',
      user: '/api/user/:id'
    }
  });
});

// Get all jobs
app.get('/api/jobs', (req, res) => {
  res.json(mockJobs);
});

// Get single job
app.get('/api/jobs/:id', (req, res) => {
  const jobId = parseInt(req.params.id);
  const job = mockJobs.find(j => j.id === jobId);
  
  if (job) {
    res.json(job);
  } else {
    res.status(404).json({ error: 'Job not found' });
  }
});

// Get user data
app.get('/api/user/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = mockUsers.find(u => u.id === userId);
  
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Mock authentication endpoints
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Mock validation
  if (email && password) {
    res.json({
      success: true,
      user: { id: 1, name: 'Demo User', email: email },
      token: 'mock-jwt-token-' + Date.now()
    });
  } else {
    res.status(401).json({ success: false, error: 'Invalid credentials' });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  
  if (name && email && password) {
    res.json({
      success: true,
      user: { id: Date.now(), name, email },
      token: 'mock-jwt-token-' + Date.now()
    });
  } else {
    res.status(400).json({ success: false, error: 'Missing fields' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Glixtron backend running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints:`);
  console.log(`   http://localhost:${PORT}/api/jobs`);
  console.log(`   http://localhost:${PORT}/api/auth/login`);
  console.log(`   http://localhost:${PORT}/api/auth/register`);
});
