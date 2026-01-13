const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'Glixtron-secret-key-2024';

app.use(cors());
app.use(express.json());

// Mock database
const users = [];
const savedJobs = [];
const applications = [];

// Enhanced job data (50+ jobs like LinkedIn/Naukri)
const allJobs = [
  // Tech Jobs
  { id: '1', title: 'Senior React Developer', company: 'Google', location: 'Mountain View, CA', salary: '$180,000 - $250,000', type: 'Full-time', experience: '5-8 years', posted: '2 hours ago', description: 'Join Google\'s frontend team to build next-generation web applications.', requirements: ['React', 'TypeScript', 'Redux', 'GraphQL'], portal: 'linkedin', applyUrl: 'https://careers.google.com', remote: false, urgent: true, featured: true },
  { id: '2', title: 'Frontend Engineer', company: 'Meta', location: 'Remote', salary: '$160,000 - $220,000', type: 'Full-time', experience: '3-6 years', posted: '1 day ago', description: 'Build immersive user experiences for billions of users.', requirements: ['React', 'JavaScript', 'CSS3', 'Webpack'], portal: 'linkedin', applyUrl: 'https://meta.com/careers', remote: true, urgent: true, featured: true },
  { id: '3', title: 'Full Stack Developer', company: 'Microsoft', location: 'Redmond, WA', salary: '$140,000 - $200,000', type: 'Full-time', experience: '4-7 years', posted: '3 days ago', description: 'Work on Azure cloud services and enterprise solutions.', requirements: ['Node.js', 'React', 'C#', 'Azure'], portal: 'indeed', applyUrl: 'https://microsoft.com/careers', remote: false, urgent: false, featured: true },
  { id: '4', title: 'UI/UX Designer', company: 'Apple', location: 'Cupertino, CA', salary: '$130,000 - $190,000', type: 'Full-time', experience: '4-8 years', posted: '1 week ago', description: 'Design intuitive interfaces for Apple products.', requirements: ['Figma', 'Sketch', 'UI/UX', 'Prototyping'], portal: 'glassdoor', applyUrl: 'https://apple.com/jobs', remote: false, urgent: false, featured: false },
  { id: '5', title: 'DevOps Engineer', company: 'Amazon', location: 'Seattle, WA', salary: '$150,000 - $210,000', type: 'Full-time', experience: '3-5 years', posted: '2 days ago', description: 'Manage AWS infrastructure and CI/CD pipelines.', requirements: ['AWS', 'Docker', 'Kubernetes', 'Terraform'], portal: 'monster', applyUrl: 'https://amazon.jobs', remote: true, urgent: true, featured: true },
  { id: '6', title: 'Data Scientist', company: 'Netflix', location: 'Los Gatos, CA', salary: '$170,000 - $240,000', type: 'Full-time', experience: '5-9 years', posted: '4 days ago', description: 'Analyze user data to improve content recommendations.', requirements: ['Python', 'ML', 'SQL', 'Statistics'], portal: 'ziprecruiter', applyUrl: 'https://jobs.netflix.com', remote: false, urgent: false, featured: true },
  { id: '7', title: 'Mobile Developer (React Native)', company: 'Uber', location: 'San Francisco, CA', salary: '$140,000 - $200,000', type: 'Full-time', experience: '3-6 years', posted: '5 hours ago', description: 'Build the Uber driver and rider applications.', requirements: ['React Native', 'TypeScript', 'iOS', 'Android'], portal: 'linkedin', applyUrl: 'https://uber.com/careers', remote: true, urgent: true, featured: true },
  { id: '8', title: 'Backend Engineer', company: 'Stripe', location: 'Remote', salary: '$160,000 - $230,000', type: 'Full-time', experience: '4-7 years', posted: '2 days ago', description: 'Build payment processing systems at scale.', requirements: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis'], portal: 'indeed', applyUrl: 'https://stripe.com/jobs', remote: true, urgent: false, featured: true },
  { id: '9', title: 'Product Manager', company: 'Slack', location: 'Remote', salary: '$150,000 - $220,000', type: 'Full-time', experience: '5-10 years', posted: '1 day ago', description: 'Lead product development for collaboration tools.', requirements: ['Product Management', 'Agile', 'Analytics', 'UX'], portal: 'glassdoor', applyUrl: 'https://slack.com/careers', remote: true, urgent: false, featured: false },
  { id: '10', title: 'Cloud Architect', company: 'Salesforce', location: 'San Francisco, CA', salary: '$180,000 - $260,000', type: 'Full-time', experience: '8-12 years', posted: '3 days ago', description: 'Design cloud infrastructure for enterprise CRM.', requirements: ['AWS', 'GCP', 'Architecture', 'Security'], portal: 'monster', applyUrl: 'https://salesforce.com/careers', remote: false, urgent: false, featured: true },
  
  // More jobs...
  { id: '11', title: 'Software Engineer II', company: 'Adobe', location: 'San Jose, CA', salary: '$130,000 - $190,000', type: 'Full-time', experience: '2-4 years', posted: '6 hours ago', description: 'Develop creative cloud applications.', requirements: ['C++', 'JavaScript', 'Photoshop API'], portal: 'ziprecruiter', applyUrl: 'https://adobe.com/careers', remote: false, urgent: true, featured: false },
  { id: '12', title: 'QA Automation Engineer', company: 'Zoom', location: 'Remote', salary: '$120,000 - $170,000', type: 'Full-time', experience: '3-5 years', posted: '1 day ago', description: 'Ensure quality of video conferencing platform.', requirements: ['Selenium', 'Java', 'TestNG', 'API Testing'], portal: 'linkedin', applyUrl: 'https://zoom.us/careers', remote: true, urgent: false, featured: false },
  { id: '13', title: 'Machine Learning Engineer', company: 'Tesla', location: 'Palo Alto, CA', salary: '$190,000 - $280,000', type: 'Full-time', experience: '6-10 years', posted: '2 days ago', description: 'Work on autonomous driving technology.', requirements: ['Python', 'TensorFlow', 'PyTorch', 'Computer Vision'], portal: 'indeed', applyUrl: 'https://tesla.com/careers', remote: false, urgent: true, featured: true },
  { id: '14', title: 'Security Engineer', company: 'Cisco', location: 'San Jose, CA', salary: '$140,000 - $200,000', type: 'Full-time', experience: '4-8 years', posted: '1 week ago', description: 'Protect network infrastructure and systems.', requirements: ['Cybersecurity', 'Firewalls', 'Encryption', 'Networking'], portal: 'glassdoor', applyUrl: 'https://cisco.com/careers', remote: false, urgent: false, featured: false },
  { id: '15', title: 'Blockchain Developer', company: 'Coinbase', location: 'Remote', salary: '$170,000 - $250,000', type: 'Full-time', experience: '3-6 years', posted: '1 day ago', description: 'Build decentralized applications on blockchain.', requirements: ['Solidity', 'Ethereum', 'Web3.js', 'Smart Contracts'], portal: 'monster', applyUrl: 'https://coinbase.com/careers', remote: true, urgent: true, featured: true },
  
  // Indian Companies
  { id: '16', title: 'SDE 2 (Backend)', company: 'Flipkart', location: 'Bengaluru, India', salary: '₹25,00,000 - ₹40,00,000', type: 'Full-time', experience: '3-6 years', posted: '1 day ago', description: 'Build scalable e-commerce platforms.', requirements: ['Java', 'Spring', 'Microservices', 'AWS'], portal: 'naukri', applyUrl: 'https://flipkartcareers.com', remote: false, urgent: true, featured: true },
  { id: '17', title: 'Frontend Developer', company: 'Zomato', location: 'Gurgaon, India', salary: '₹18,00,000 - ₹30,00,000', type: 'Full-time', experience: '2-5 years', posted: '3 days ago', description: 'Create delightful food ordering experiences.', requirements: ['React', 'JavaScript', 'Redux', 'PWA'], portal: 'naukri', applyUrl: 'https://zomato.com/careers', remote: true, urgent: false, featured: false },
  { id: '18', title: 'Data Analyst', company: 'Paytm', location: 'Noida, India', salary: '₹12,00,000 - ₹20,00,000', type: 'Full-time', experience: '2-4 years', posted: '5 hours ago', description: 'Analyze financial transaction data.', requirements: ['SQL', 'Python', 'Tableau', 'Statistics'], portal: 'timesjobs', applyUrl: 'https://paytm.com/careers', remote: false, urgent: true, featured: true },
  { id: '19', title: 'DevOps Engineer', company: 'Swiggy', location: 'Bengaluru, India', salary: '₹20,00,000 - ₹35,00,000', type: 'Full-time', experience: '3-7 years', posted: '2 days ago', description: 'Manage delivery platform infrastructure.', requirements: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'], portal: 'shine', applyUrl: 'https://careers.swiggy.com', remote: true, urgent: false, featured: false },
  { id: '20', title: 'Product Designer', company: 'BYJU\'S', location: 'Bengaluru, India', salary: '₹15,00,000 - ₹25,00,000', type: 'Full-time', experience: '3-6 years', posted: '1 week ago', description: 'Design educational technology interfaces.', requirements: ['Figma', 'UI/UX', 'Prototyping', 'User Research'], portal: 'naukri', applyUrl: 'https://byjus.com/careers', remote: true, urgent: false, featured: false }
];

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// ============ AUTH ROUTES ============
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = {
      id: Date.now().toString(),
      email,
      name: name || email.split('@')[0],
      password: hashedPassword,
      createdAt: new Date()
    };
    
    users.push(user);
    
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ============ JOBS ROUTES (Enhanced) ============
app.get('/api/jobs', (req, res) => {
  const { search, location, type, salary, experience, page = 1, limit = 20 } = req.query;
  
  let filteredJobs = [...allJobs];
  
  // Search filter
  if (search) {
    const searchLower = search.toLowerCase();
    filteredJobs = filteredJobs.filter(job => 
      job.title.toLowerCase().includes(searchLower) ||
      job.company.toLowerCase().includes(searchLower) ||
      job.description.toLowerCase().includes(searchLower) ||
      job.requirements.some(req => req.toLowerCase().includes(searchLower))
    );
  }
  
  // Location filter
  if (location && location !== 'all') {
    if (location === 'remote') {
      filteredJobs = filteredJobs.filter(job => job.remote === true);
    } else {
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }
  }
  
  // Type filter
  if (type && type !== 'all') {
    filteredJobs = filteredJobs.filter(job => 
      job.type.toLowerCase() === type.toLowerCase()
    );
  }
  
  // Salary filter
  if (salary && salary !== 'all') {
    filteredJobs = filteredJobs.filter(job => {
      const jobSalary = job.salary;
      if (salary === '100k+') return jobSalary.includes('$100') || jobSalary.includes('₹');
      if (salary === '150k+') return jobSalary.includes('$150') || parseInt(jobSalary.replace(/[^0-9]/g, '')) > 1500000;
      if (salary === '200k+') return jobSalary.includes('$200') || parseInt(jobSalary.replace(/[^0-9]/g, '')) > 2000000;
      return true;
    });
  }
  
  // Experience filter
  if (experience && experience !== 'all') {
    filteredJobs = filteredJobs.filter(job => {
      const exp = job.experience;
      if (experience === 'entry') return exp.includes('0-2') || exp.includes('1-3');
      if (experience === 'mid') return exp.includes('3-5') || exp.includes('4-7');
      if (experience === 'senior') return exp.includes('5+') || exp.includes('8+');
      return true;
    });
  }
  
  // Sort by featured and recency
  filteredJobs.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    if (a.urgent && !b.urgent) return -1;
    if (!a.urgent && b.urgent) return 1;
    return 0;
  });
  
  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);
  
  // Get unique locations for filters
  const locations = [...new Set(allJobs.map(job => {
    if (job.remote) return 'Remote';
    return job.location.split(',')[0];
  }))].sort();
  
  res.json({
    jobs: paginatedJobs,
    total: filteredJobs.length,
    page: parseInt(page),
    totalPages: Math.ceil(filteredJobs.length / limit),
    filters: {
      locations: ['All Locations', 'Remote', ...locations],
      types: ['All Types', 'Full-time', 'Contract', 'Part-time', 'Internship'],
      salaries: ['Any Salary', '100k+', '150k+', '200k+', '₹15L+', '₹25L+'],
      experiences: ['All Levels', 'Entry Level', 'Mid Level', 'Senior Level']
    }
  });
});

// ============ APPLICATIONS ROUTES ============
app.get('/api/applications', authenticateToken, (req, res) => {
  const userApplications = applications.filter(app => app.userId === req.user.userId);
  
  // Mock applications if none
  if (userApplications.length === 0) {
    const mockApps = allJobs.slice(0, 5).map((job, index) => ({
      id: `app_${index}`,
      userId: req.user.userId,
      jobId: job.id,
      company: job.company,
      position: job.title,
      status: ['applied', 'interview', 'offer', 'rejected'][index % 4],
      appliedDate: new Date(Date.now() - index * 86400000).toISOString().split('T')[0],
      lastUpdate: new Date().toISOString(),
      portal: job.portal,
      notes: index === 0 ? 'Technical interview scheduled for next week' : '',
      nextStep: index === 1 ? 'Follow up with HR' : ''
    }));
    applications.push(...mockApps);
    res.json(mockApps);
  } else {
    res.json(userApplications);
  }
});

app.post('/api/applications', authenticateToken, (req, res) => {
  const application = {
    ...req.body,
    id: `app_${Date.now()}`,
    userId: req.user.userId,
    appliedDate: new Date().toISOString().split('T')[0],
    lastUpdate: new Date().toISOString(),
    status: 'applied'
  };
  
  applications.push(application);
  res.json({ success: true, application });
});

// ============ PORTALS ROUTES ============
app.get('/api/portals', (req, res) => {
  const portals = [
    { 
      id: 'linkedin', 
      name: 'LinkedIn Jobs', 
      color: '#0077B5', 
      icon: '💼',
      url: 'https://linkedin.com/jobs',
      description: 'Professional network with premium job listings',
      connected: false,
      stats: { jobs: '25M+', companies: '30K+' }
    },
    { 
      id: 'indeed', 
      name: 'Indeed', 
      color: '#2164F3', 
      icon: '🔍',
      url: 'https://indeed.com',
      description: 'World\'s #1 job site with aggregated listings',
      connected: false,
      stats: { jobs: '10M+', companies: '1M+' }
    },
    { 
      id: 'glassdoor', 
      name: 'Glassdoor', 
      color: '#0CAA41', 
      icon: '🏢',
      url: 'https://glassdoor.com',
      description: 'Job listings with company reviews and salaries',
      connected: false,
      stats: { jobs: '8M+', reviews: '70M+' }
    },
    { 
      id: 'naukri', 
      name: 'Naukri.com', 
      color: '#FF6B00', 
      icon: '🇮🇳',
      url: 'https://naukri.com',
      description: 'India\'s leading job portal',
      connected: false,
      stats: { jobs: '5M+', resumes: '65M+' }
    },
    { 
      id: 'monster', 
      name: 'Monster', 
      color: '#6D00A8', 
      icon: '👾',
      url: 'https://monster.com',
      description: 'Global career opportunities',
      connected: false,
      stats: { jobs: '1M+', countries: '40+' }
    },
    { 
      id: 'ziprecruiter', 
      name: 'ZipRecruiter', 
      color: '#FF6B00', 
      icon: '⚡',
      url: 'https://ziprecruiter.com',
      description: 'AI-powered job matching',
      connected: false,
      stats: { jobs: '3M+', matches: '10M/day' }
    },
    { 
      id: 'shine', 
      name: 'Shine.com', 
      color: '#00B0FF', 
      icon: '✨',
      url: 'https://shine.com',
      description: 'Indian job portal for all experience levels',
      connected: false,
      stats: { jobs: '2M+', companies: '75K+' }
    },
    { 
      id: 'timesjobs', 
      name: 'TimesJobs', 
      color: '#E60023', 
      icon: '📰',
      url: 'https://timesjobs.com',
      description: 'Leading Indian job portal by Times Group',
      connected: false,
      stats: { jobs: '1M+', recruiters: '50K+' }
    }
  ];
  
  res.json(portals);
});

app.post('/api/portals/connect', authenticateToken, (req, res) => {
  const { portalId } = req.body;
  
  // Simulate connection
  setTimeout(() => {
    res.json({ 
      success: true, 
      message: `Connected to ${portalId} successfully!`,
      connected: true,
      importUrl: `http://localhost:5000/api/portals/${portalId}/import`
    });
  }, 1000);
});

// ============ PROFILE ENHANCEMENTS ============
app.get('/api/profile/experience', authenticateToken, (req, res) => {
  const experiences = [
    {
      id: '1',
      company: 'Google',
      position: 'Senior Frontend Developer',
      duration: '2020 - Present',
      description: 'Led frontend development for Google Drive web application. Implemented micro-frontend architecture.',
      skills: ['React', 'TypeScript', 'GraphQL', 'Microservices'],
      location: 'Mountain View, CA',
      type: 'Full-time'
    },
    {
      id: '2',
      company: 'Microsoft',
      position: 'Software Engineer',
      duration: '2018 - 2020',
      description: 'Developed Azure portal features. Improved performance by 40%.',
      skills: ['C#', '.NET', 'Azure', 'SQL'],
      location: 'Redmond, WA',
      type: 'Full-time'
    },
    {
      id: '3',
      company: 'Amazon',
      position: 'SDE Intern',
      duration: 'Summer 2017',
      description: 'Built internal tools for AWS monitoring.',
      skills: ['Java', 'AWS', 'DynamoDB'],
      location: 'Seattle, WA',
      type: 'Internship'
    }
  ];
  
  res.json(experiences);
});

app.get('/api/profile/education', authenticateToken, (req, res) => {
  const education = [
    {
      id: '1',
      institution: 'Stanford University',
      degree: 'M.S. Computer Science',
      duration: '2015 - 2017',
      gpa: '3.8/4.0',
      description: 'Specialized in Human-Computer Interaction'
    },
    {
      id: '2',
      institution: 'IIT Delhi',
      degree: 'B.Tech Computer Science',
      duration: '2011 - 2015',
      gpa: '9.2/10.0',
      description: 'Graduated with Honors'
    }
  ];
  
  res.json(education);
});

app.get('/api/profile/skills', authenticateToken, (req, res) => {
  const skills = {
    technical: [
      { name: 'React', level: 95, years: 5 },
      { name: 'JavaScript', level: 98, years: 7 },
      { name: 'TypeScript', level: 90, years: 4 },
      { name: 'Node.js', level: 85, years: 4 },
      { name: 'AWS', level: 80, years: 3 },
      { name: 'Docker', level: 75, years: 2 },
      { name: 'Python', level: 70, years: 2 },
      { name: 'GraphQL', level: 85, years: 3 }
    ],
    soft: ['Leadership', 'Communication', 'Problem Solving', 'Team Management', 'Agile Methodology']
  };
  
  res.json(skills);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    jobsCount: allJobs.length,
    usersCount: users.length
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Enhanced Backend running on http://localhost:${PORT}`);
  console.log(`📊 Jobs loaded: ${allJobs.length}`);
});
