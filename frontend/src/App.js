import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [backendStatus, setBackendStatus] = useState('🔍 Checking...');
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({ total_jobs: 0, active_users: 0 });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  // API Configuration
  const isLocal = window.location.hostname === 'localhost';
  const API_BASE = isLocal ? 'http://localhost:8000' : 'https://jobhawk-backend.onrender.com';

  // Fetch all data
  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const fetchAllData = async () => {
    try {
      // Check backend
      await axios.get(`${API_BASE}/health`);
      setBackendStatus('✅ Connected');

      // Fetch jobs
      const jobsRes = await axios.get(`${API_BASE}/api/jobs`);
      setJobs(jobsRes.data.jobs || []);

      // Fetch stats
      const statsRes = await axios.get(`${API_BASE}/api/stats`);
      setStats(statsRes.data);
    } catch (error) {
      setBackendStatus('❌ Disconnected - Using Mock Data');
      // Mock data for demo
      setJobs([
        { id: 1, title: 'Frontend Developer', company: 'TechCorp', location: 'Remote', salary: '$120K', description: 'React development' },
        { id: 2, title: 'Backend Engineer', company: 'StartupXYZ', location: 'SF', salary: '$140K', description: 'Python/FastAPI' }
      ]);
      setStats({ total_jobs: 2, active_users: 42 });
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'dashboard', name: '📊 Dashboard', icon: '📊' },
    { id: 'jobs', name: '💼 Jobs', icon: '💼' },
    { id: 'api', name: '🔌 API', icon: '🔌' },
    { id: 'deploy', name: '🚀 Deploy', icon: '🚀' }
  ];

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <h1>🦅 JobHawk</h1>
          <p>Complete Job Search Assistant</p>
        </div>
        <div className="status-badge">
          <span className={`status ${backendStatus.includes('✅') ? 'online' : 'offline'}`}>
            {backendStatus.includes('✅') ? '🟢 ONLINE' : '🔴 OFFLINE'}
          </span>
          <button onClick={fetchAllData} className="refresh-btn">🔄 Refresh</button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.name}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="content">
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="dashboard">
            <div className="cards-grid">
              <div className="card stats-card">
                <h3>📈 Statistics</h3>
                <div className="stats">
                  <div className="stat-item">
                    <span className="stat-label">Total Jobs</span>
                    <span className="stat-value">{stats.total_jobs}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Active Users</span>
                    <span className="stat-value">{stats.active_users}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Backend</span>
                    <span className="stat-value">{backendStatus.includes('✅') ? 'Online' : 'Offline'}</span>
                  </div>
                </div>
              </div>

              <div className="card quick-actions">
                <h3>⚡ Quick Actions</h3>
                <div className="action-buttons">
                  <button className="action-btn" onClick={() => setActiveTab('jobs')}>
                    📋 View Jobs
                  </button>
                  <button className="action-btn" onClick={() => window.open(`${API_BASE}/docs`, '_blank')}>
                    📚 API Docs
                  </button>
                  <button className="action-btn" onClick={() => window.open('https://github.com/Hemantsharma800/JobHawk', '_blank')}>
                    💻 GitHub
                  </button>
                </div>
              </div>

              <div className="card system-info">
                <h3>🔧 System Info</h3>
                <div className="info-list">
                  <div className="info-item">
                    <span>Frontend:</span>
                    <span className="success">✅ Running</span>
                  </div>
                  <div className="info-item">
                    <span>Backend:</span>
                    <span className={backendStatus.includes('✅') ? 'success' : 'error'}>
                      {backendStatus}
                    </span>
                  </div>
                  <div className="info-item">
                    <span>Database:</span>
                    <span className="warning">📊 Mock Data</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Jobs Preview */}
            <div className="recent-jobs">
              <h3>🔥 Recent Job Listings</h3>
              <div className="jobs-preview">
                {jobs.slice(0, 3).map(job => (
                  <div key={job.id} className="job-preview-card">
                    <h4>{job.title}</h4>
                    <p>{job.company} • {job.location}</p>
                    <span className="salary">{job.salary}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* JOBS TAB */}
        {activeTab === 'jobs' && (
          <div className="jobs-tab">
            <div className="jobs-header">
              <h2>💼 Available Jobs ({jobs.length})</h2>
              <div className="filters">
                <input type="text" placeholder="🔍 Search jobs..." />
                <select>
                  <option>All Locations</option>
                  <option>Remote</option>
                  <option>San Francisco</option>
                </select>
              </div>
            </div>
            <div className="jobs-list">
              {jobs.map(job => (
                <div key={job.id} className="job-card">
                  <div className="job-header">
                    <h3>{job.title}</h3>
                    <span className="salary-badge">{job.salary}</span>
                  </div>
                  <div className="job-meta">
                    <span className="company">🏢 {job.company}</span>
                    <span className="location">📍 {job.location}</span>
                  </div>
                  <p className="job-desc">{job.description}</p>
                  <div className="job-actions">
                    <button className="apply-btn">Apply Now</button>
                    <button className="save-btn">Save</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* API TAB */}
        {activeTab === 'api' && (
          <div className="api-tab">
            <h2>🔌 API Endpoints</h2>
            <div className="endpoints">
              <div className="endpoint">
                <code>GET {API_BASE}/health</code>
                <span>Health check</span>
              </div>
              <div className="endpoint">
                <code>GET {API_BASE}/api/jobs</code>
                <span>Get all jobs</span>
              </div>
              <div className="endpoint">
                <code>POST {API_BASE}/api/auth/login</code>
                <span>User authentication</span>
              </div>
              <div className="endpoint">
                <code>GET {API_BASE}/docs</code>
                <span>Interactive API documentation</span>
              </div>
            </div>
            <div className="api-test">
              <h3>🧪 Test API</h3>
              <button onClick={() => window.open(`${API_BASE}/docs`, '_blank')} className="test-btn">
                Open Swagger UI
              </button>
            </div>
          </div>
        )}

        {/* DEPLOY TAB */}
        {activeTab === 'deploy' && (
          <div className="deploy-tab">
            <h2>🚀 Deployment Information</h2>
            <div className="deploy-cards">
              <div className="deploy-card">
                <h3>🌐 Frontend</h3>
                <p><strong>URL:</strong> https://hemantsharma800.github.io/JobHawk</p>
                <p><strong>Platform:</strong> GitHub Pages</p>
                <p><strong>Status:</strong> <span className="success">✅ Live</span></p>
              </div>
              <div className="deploy-card">
                <h3>⚙️ Backend</h3>
                <p><strong>URL:</strong> {API_BASE}</p>
                <p><strong>Platform:</strong> {isLocal ? 'Local' : 'Render.com'}</p>
                <p><strong>Status:</strong> <span className={backendStatus.includes('✅') ? 'success' : 'error'}>{backendStatus}</span></p>
              </div>
              <div className="deploy-card">
                <h3>📦 Repository</h3>
                <p><strong>URL:</strong> https://github.com/Hemantsharma800/JobHawk</p>
                <p><strong>Branch:</strong> main</p>
                <button onClick={() => window.open('https://github.com/Hemantsharma800/JobHawk', '_blank')} className="repo-btn">
                  View on GitHub
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>JobHawk v2.0</h4>
            <p>Complete full-stack job search assistant</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="https://github.com/Hemantsharma800/JobHawk" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={`${API_BASE}/docs`} target="_blank" rel="noopener noreferrer">API Docs</a>
            <button onClick={() => setActiveTab('dashboard')}>Dashboard</button>
          </div>
          <div className="footer-section">
            <h4>Status</h4>
            <p>Frontend: <span className="success">✅ Live</span></p>
            <p>Backend: <span className={backendStatus.includes('✅') ? 'success' : 'error'}>
              {backendStatus.includes('✅') ? '✅ Connected' : '❌ Disconnected'}
            </span></p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 JobHawk • Made with React & FastAPI • Deployed on GitHub Pages</p>
        </div>
      </footer>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobResults, setJobResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [activeTab, setActiveTab] = useState('search');
  const [jobSources, setJobSources] = useState([]);
  const [sessionData, setSessionData] = useState(null);
  const fileInputRef = useRef(null);

  // Mock real job data (in production, this would come from APIs)
  const REAL_JOB_DATABASE = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'Google',
      location: 'Mountain View, CA (Remote Available)',
      salary: '$150,000 - $250,000',
      description: 'Build user interfaces for Google products using React, TypeScript, and modern web technologies. Experience with state management, responsive design, and performance optimization required.',
      url: 'https://careers.google.com/jobs/results/',
      posted_date: '2024-01-07',
      type: 'Full-time',
      experience: '5+ years',
      skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'Redux'],
      matchScore: 0
    },
    {
      id: 2,
      title: 'Full Stack Engineer',
      company: 'Microsoft',
      location: 'Redmond, WA',
      salary: '$140,000 - $220,000',
      description: 'Develop end-to-end solutions for Azure services. Work with React, Node.js, Python, and cloud technologies. Experience with microservices and containerization preferred.',
      url: 'https://careers.microsoft.com/us/en/job/',
      posted_date: '2024-01-06',
      type: 'Full-time',
      experience: '3+ years',
      skills: ['React', 'Node.js', 'Python', 'Azure', 'Docker'],
      matchScore: 0
    },
    {
      id: 3,
      title: 'Backend Developer',
      company: 'Amazon Web Services',
      location: 'Seattle, WA (Hybrid)',
      salary: '$130,000 - $210,000',
      description: 'Build scalable backend services for AWS. Strong knowledge of Java, Python, distributed systems, and database design. Experience with AWS services required.',
      url: 'https://www.amazon.jobs/en/',
      posted_date: '2024-01-05',
      type: 'Full-time',
      experience: '4+ years',
      skills: ['Java', 'Python', 'AWS', 'SQL', 'NoSQL'],
      matchScore: 0
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      company: 'Netflix',
      location: 'Los Gatos, CA (Remote)',
      salary: '$160,000 - $280,000',
      description: 'Manage infrastructure and deployment pipelines. Expertise in Kubernetes, Docker, CI/CD, and cloud platforms. Experience with monitoring and alerting systems.',
      url: 'https://jobs.netflix.com/',
      posted_date: '2024-01-04',
      type: 'Full-time',
      experience: '5+ years',
      skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'CI/CD'],
      matchScore: 0
    },
    {
      id: 5,
      title: 'Data Scientist',
      company: 'Meta',
      location: 'Menlo Park, CA',
      salary: '$145,000 - $240,000',
      description: 'Analyze large datasets and build machine learning models. Strong Python skills, statistics knowledge, and experience with ML frameworks required.',
      url: 'https://www.metacareers.com/',
      posted_date: '2024-01-03',
      type: 'Full-time',
      experience: '3+ years',
      skills: ['Python', 'Machine Learning', 'SQL', 'Statistics', 'TensorFlow'],
      matchScore: 0
    },
    {
      id: 6,
      title: 'Mobile Developer',
      company: 'Apple',
      location: 'Cupertino, CA',
      salary: '$135,000 - $225,000',
      description: 'Develop iOS applications using Swift and Objective-C. Experience with UIKit, SwiftUI, and mobile architecture patterns required.',
      url: 'https://www.apple.com/careers/us/',
      posted_date: '2024-01-02',
      type: 'Full-time',
      experience: '4+ years',
      skills: ['Swift', 'iOS', 'UIKit', 'Objective-C', 'Xcode'],
      matchScore: 0
    },
    {
      id: 7,
      title: 'UX/UI Designer',
      company: 'Adobe',
      location: 'San Jose, CA (Remote Available)',
      salary: '$120,000 - $200,000',
      description: 'Design user interfaces for creative software. Proficiency in Figma, Adobe Creative Suite, and user research methodologies required.',
      url: 'https://www.adobe.com/careers.html',
      posted_date: '2024-01-01',
      type: 'Full-time',
      experience: '3+ years',
      skills: ['Figma', 'UI/UX Design', 'Adobe Creative Suite', 'Prototyping'],
      matchScore: 0
    },
    {
      id: 8,
      title: 'Cloud Architect',
      company: 'Salesforce',
      location: 'San Francisco, CA',
      salary: '$170,000 - $300,000',
      description: 'Design and implement cloud solutions. Expertise in AWS/Azure, infrastructure as code, and security best practices required.',
      url: 'https://www.salesforce.com/company/careers/',
      posted_date: '2023-12-30',
      type: 'Full-time',
      experience: '7+ years',
      skills: ['AWS', 'Azure', 'Terraform', 'Cloud Security', 'Architecture'],
      matchScore: 0
    }
  ];

  // Job portals that users can connect to (using their own accounts)
  const JOB_PORTALS = [
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', connected: false },
    { id: 'indeed', name: 'Indeed', icon: '📊', connected: false },
    { id: 'glassdoor', name: 'Glassdoor', icon: '🏢', connected: false },
    { id: 'naukri', name: 'Naukri.com', icon: '🇮🇳', connected: false },
    { id: 'monster', name: 'Monster', icon: '👾', connected: false },
    { id: 'angel', name: 'AngelList', icon: '😇', connected: false }
  ];

  // Job search function
  const searchJobs = () => {
    if (!searchQuery.trim()) {
      alert('Please enter a job title or keyword to search');
      return;
    }

    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const query = searchQuery.toLowerCase();

      // Filter jobs based on search query
      const filteredJobs = REAL_JOB_DATABASE.filter(job => {
        const searchText = `${job.title} ${job.company} ${job.description} ${job.skills.join(' ')}`.toLowerCase();
        return searchText.includes(query);
      });

      // Calculate match scores for filtered jobs
      const jobsWithScores = filteredJobs.map(job => {
        let score = 0;
        const queryWords = query.split(' ');

        queryWords.forEach(word => {
          if (job.title.toLowerCase().includes(word)) score += 30;
          if (job.skills.some(skill => skill.toLowerCase().includes(word))) score += 20;
          if (job.description.toLowerCase().includes(word)) score += 10;
          if (job.company.toLowerCase().includes(word)) score += 15;
        });

        // Bonus for exact matches
        if (job.title.toLowerCase().includes(query)) score += 40;

        return { ...job, matchScore: Math.min(score, 100) };
      });

      // Sort by match score
      jobsWithScores.sort((a, b) => b.matchScore - a.matchScore);

      setJobResults(jobsWithScores);
      setLoading(false);

      // Auto-analyze resume if available
      if (resumeText) {
        analyzeResumeWithJobs(jobsWithScores);
      }
    }, 1000);
  };

  // User login function
  const handleLogin = (e) => {
    e.preventDefault();

    if (!userEmail || !userPassword) {
      alert('Please enter both email and password');
      return;
    }

    setLoading(true);

    // Simulate login process
    setTimeout(() => {
      // In real app, this would authenticate with job portals
      const session = {
        email: userEmail,
        timestamp: new Date().toISOString(),
        portals: JOB_PORTALS.map(portal => ({
          ...portal,
          connected: true // Simulating successful connection
        }))
      };

      setSessionData(session);
      setUserLoggedIn(true);
      setJobSources(session.portals);
      setLoading(false);

      alert(`Logged in successfully! Connected to ${session.portals.length} job portals.`);
    }, 1500);
  };

  // Resume analysis function
  const analyzeResume = () => {
    if (!resumeText.trim()) {
      alert('Please paste your resume text or upload a file');
      return;
    }

    setLoading(true);

    // Simulate AI analysis
    setTimeout(() => {
      const resumeWords = resumeText.toLowerCase().split(/\s+/);
      const analysis = {
        strengths: [],
        weaknesses: [],
        suggestions: [],
        overallScore: 0,
        keywordMatches: []
      };

      // Analyze against job results if available
      if (jobResults.length > 0) {
        const topJob = jobResults[0];
        const jobKeywords = [
          ...topJob.skills,
          ...topJob.title.toLowerCase().split(' '),
          ...topJob.description.toLowerCase().split(/\s+/).slice(0, 20)
        ];

        // Find matching keywords
        const matches = jobKeywords.filter(keyword =>
          resumeWords.some(word => word.includes(keyword.toLowerCase()))
        );

        analysis.keywordMatches = [...new Set(matches)];
        analysis.overallScore = Math.min((analysis.keywordMatches.length / jobKeywords.length) * 100, 100);

        // Generate suggestions
        if (analysis.overallScore < 50) {
          analysis.suggestions = [
            'Add more relevant keywords from job descriptions',
            'Highlight your experience with specific technologies mentioned',
            'Quantify your achievements with metrics',
            'Tailor your resume for each job application'
          ];
        } else if (analysis.overallScore < 75) {
          analysis.suggestions = [
            'Good match! Consider adding certifications',
            'Highlight leadership experience',
            'Add more project details',
            'Include GitHub/portfolio links'
          ];
        } else {
          analysis.suggestions = [
            'Excellent match! Apply now',
            'Prepare for technical interviews',
            'Research the company culture',
            'Network with current employees'
          ];
        }

        // Identify strengths and weaknesses
        const missingKeywords = jobKeywords.filter(keyword =>
          !analysis.keywordMatches.some(match => match.toLowerCase().includes(keyword.toLowerCase()))
        ).slice(0, 5);

        analysis.strengths = analysis.keywordMatches.slice(0, 5);
        analysis.weaknesses = missingKeywords;
      }

      setAnalysisResult(analysis);
      setLoading(false);
    }, 2000);
  };

  const analyzeResumeWithJobs = (jobs) => {
    if (!resumeText.trim() || jobs.length === 0) return;

    const resumeWords = resumeText.toLowerCase().split(/\s+/);
    const analyzedJobs = jobs.map(job => {
      const jobKeywords = [
        ...job.skills,
        ...job.title.toLowerCase().split(' '),
        ...job.description.toLowerCase().split(/\s+/).slice(0, 20)
      ];

      const matches = jobKeywords.filter(keyword =>
        resumeWords.some(word => word.includes(keyword.toLowerCase()))
      );

      const matchScore = Math.min((matches.length / jobKeywords.length) * 100, 100);

      return {
        ...job,
        matchScore: matchScore,
        matchedKeywords: [...new Set(matches)].slice(0, 10),
        missingKeywords: jobKeywords.filter(keyword =>
          !matches.some(match => match.toLowerCase().includes(keyword.toLowerCase()))
        ).slice(0, 5)
      };
    });

    setJobResults(analyzedJobs);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setResumeText(e.target.result);
      alert('Resume uploaded successfully! You can now analyze it.');
    };
    reader.readAsText(file);
  };

  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  const tabs = [
    { id: 'search', name: '🔍 Job Search', icon: '🔍' },
    { id: 'resume', name: '📄 Resume Analysis', icon: '📄' },
    { id: 'portals', name: '🔗 Job Portals', icon: '🔗' },
    { id: 'dashboard', name: '📊 Dashboard', icon: '📊' }
  ];

  // Auto-search on Enter key
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && searchQuery.trim() && activeTab === 'search') {
        searchJobs();
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [searchQuery, activeTab]);

  return (
    <div className="App">
      {/* Header with Login */}
      <header className="header">
        <div className="logo">
          <h1>🦅 JobHawk AI</h1>
          <p>Intelligent Job Search & Resume Analysis</p>
        </div>

        <div className="auth-section">
          {userLoggedIn ? (
            <div className="user-info">
              <span className="user-email">👤 {userEmail}</span>
              <button
                className="logout-btn"
                onClick={() => {
                  setUserLoggedIn(false);
                  setSessionData(null);
                  setJobSources([]);
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <form className="login-form" onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                required
              />
              <button type="submit" className="login-btn">
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          )}
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.name}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="content">
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Processing your request...</p>
          </div>
        ) : (
          <>
            {/* JOB SEARCH TAB */}
            {activeTab === 'search' && (
              <div className="search-tab">
                <div className="search-section">
                  <div className="search-box">
                    <input
                      type="text"
                      placeholder="🔍 Search for jobs (e.g., 'React Developer', 'Python Data Scientist', 'Cloud Engineer')"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="search-input"
                    />
                    <button onClick={searchJobs} className="search-btn">
                      {loading ? 'Searching...' : 'Search Jobs'}
                    </button>
                  </div>

                  <div className="search-tips">
                    <p>💡 <strong>Search Tips:</strong> Use specific keywords like technology names, job titles, or locations</p>
                    {userLoggedIn && (
                      <p>✅ <strong>Enhanced Search:</strong> You're logged in. Results will include data from your connected job portals</p>
                    )}
                  </div>
                </div>

                {/* Search Results */}
                {jobResults.length > 0 && (
                  <div className="results-section">
                    <div className="results-header">
                      <h2>🎯 Found {jobResults.length} Jobs</h2>
                      <div className="results-stats">
                        <span className="stat">Best Match: {jobResults[0]?.matchScore || 0}%</span>
                        <span className="stat">Average Match: {Math.round(jobResults.reduce((acc, job) => acc + job.matchScore, 0) / jobResults.length)}%</span>
                      </div>
                    </div>

                    <div className="jobs-grid">
                      {jobResults.map(job => (
                        <div key={job.id} className="job-card">
                          <div className="job-card-header">
                            <div>
                              <h3>{job.title}</h3>
                              <div className="company-badge">🏢 {job.company}</div>
                            </div>
                            <div className="match-score">
                              <div className="score-circle">
                                <span>{Math.round(job.matchScore)}%</span>
                              </div>
                              <div className="score-label">Match</div>
                            </div>
                          </div>

                          <div className="job-details">
                            <div className="detail-item">
                              <span className="detail-label">📍 Location:</span>
                              <span>{job.location}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">💰 Salary:</span>
                              <span className="salary">{job.salary}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">📅 Posted:</span>
                              <span>{job.posted_date}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">📋 Type:</span>
                              <span>{job.type}</span>
                            </div>
                          </div>

                          <div className="job-skills">
                            <strong>Required Skills:</strong>
                            <div className="skills-tags">
                              {job.skills.map((skill, index) => (
                                <span key={index} className="skill-tag">{skill}</span>
                              ))}
                            </div>
                          </div>

                          <p className="job-description">{job.description}</p>

                          <div className="job-actions">
                            <button
                              className="apply-btn"
                              onClick={() => window.open(job.url, '_blank')}
                            >
                              Apply Now
                            </button>
                            <button
                              className="save-btn"
                              onClick={() => alert(`Job saved! You can view it in your dashboard.`)}
                            >
                              Save Job
                            </button>
                            {resumeText && job.matchScore < 70 && (
                              <button
                                className="improve-btn"
                                onClick={() => {
                                  setActiveTab('resume');
                                  setAnalysisResult({
                                    suggestions: [
                                      `Add these keywords to your resume: ${job.skills.slice(0, 3).join(', ')}`,
                                      'Quantify your experience with metrics',
                                      'Highlight relevant projects'
                                    ]
                                  });
                                }}
                              >
                                Improve Match
                              </button>
                            )}
                          </div>

                          {job.matchScore > 0 && (
                            <div className="match-breakdown">
                              <strong>🎯 Why this matches:</strong>
                              <ul>
                                {job.matchedKeywords?.slice(0, 3).map((keyword, idx) => (
                                  <li key={idx}>✅ Found "{keyword}" in your resume</li>
                                ))}
                                {job.missingKeywords?.slice(0, 2).map((keyword, idx) => (
                                  <li key={idx}>⚠️ Add "{keyword}" to improve match</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Initial State */}
                {jobResults.length === 0 && !loading && (
                  <div className="initial-state">
                    <div className="welcome-card">
                      <h2>🚀 Start Your Job Search</h2>
                      <p>Enter a job title, skill, or keyword above to find relevant opportunities</p>

                      <div className="quick-searches">
                        <h3>💡 Popular Searches:</h3>
                        <div className="quick-search-tags">
                          {['React Developer', 'Python Engineer', 'Data Scientist', 'DevOps', 'Cloud Architect', 'Full Stack'].map((tag, idx) => (
                            <button
                              key={idx}
                              className="quick-search-btn"
                              onClick={() => {
                                setSearchQuery(tag);
                                setTimeout(searchJobs, 100);
                              }}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>

                      {!userLoggedIn && (
                        <div className="login-reminder">
                          <p>🔑 <strong>Pro Tip:</strong> Login to connect your job portal accounts and get personalized results</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* RESUME ANALYSIS TAB */}
            {activeTab === 'resume' && (
              <div className="resume-tab">
                <div className="resume-section">
                  <h2>📄 AI Resume Analyzer</h2>
                  <p className="subtitle">Get personalized suggestions to improve your resume based on job requirements</p>

                  <div className="resume-input-section">
                    <div className="input-methods">
                      <div className="method-card">
                        <h3>📝 Paste Resume Text</h3>
                        <textarea
                          placeholder="Paste your resume text here...
Example:
• Senior Frontend Developer with 5+ years experience
• React, TypeScript, Redux, Node.js
• Built e-commerce platform serving 1M+ users
• AWS, Docker, CI/CD
• B.S. Computer Science, MIT"
                          value={resumeText}
                          onChange={(e) => setResumeText(e.target.value)}
                          rows={10}
                          className="resume-textarea"
                        />
                      </div>

                      <div className="method-card">
                        <h3>📎 Upload Resume File</h3>
                        <div className="upload-section">
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept=".txt,.pdf,.doc,.docx"
                            style={{ display: 'none' }}
                          />
                          <button onClick={triggerFileUpload} className="upload-btn">
                            📁 Choose File
                          </button>
                          <p className="file-types">Supports: .txt, .pdf, .doc, .docx</p>
                          {resumeText && (
                            <p className="upload-success">✅ Resume loaded successfully!</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={analyzeResume}
                      className="analyze-btn"
                      disabled={!resumeText.trim()}
                    >
                      {loading ? 'Analyzing...' : '🔍 Analyze Resume'}
                    </button>
                  </div>

                  {/* Analysis Results */}
                  {analysisResult && (
                    <div className="analysis-results">
                      <div className="result-card score-card">
                        <h3>📊 Overall Match Score</h3>
                        <div className="score-display">
                          <div className="score-circle-large">
                            <span>{Math.round(analysisResult.overallScore)}%</span>
                          </div>
                          <div className="score-interpretation">
                            {analysisResult.overallScore >= 80 && (
                              <p className="score-excellent">🎯 Excellent match! You're highly qualified</p>
                            )}
                            {analysisResult.overallScore >= 60 && analysisResult.overallScore < 80 && (
                              <p className="score-good">👍 Good match! Some improvements needed</p>
                            )}
                            {analysisResult.overallScore < 60 && (
                              <p className="score-poor">⚠️ Needs improvement to increase chances</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="result-grid">
                        <div className="result-card">
                          <h3>✅ Keywords Found</h3>
                          <div className="keywords-list">
                            {analysisResult.keywordMatches.length > 0 ? (
                              analysisResult.keywordMatches.map((keyword, idx) => (
                                <span key={idx} className="keyword-found">{keyword}</span>
                              ))
                            ) : (
                              <p>No matching keywords found</p>
                            )}
                          </div>
                        </div>

                        <div className="result-card">
                          <h3>⚠️ Missing Keywords</h3>
                          <div className="keywords-list">
                            {analysisResult.weaknesses.length > 0 ? (
                              analysisResult.weaknesses.map((keyword, idx) => (
                                <span key={idx} className="keyword-missing">{keyword}</span>
                              ))
                            ) : (
                              <p>All important keywords found! 🎉</p>
                            )}
                          </div>
                        </div>

                        <div className="result-card full-width">
                          <h3>💡 AI Suggestions</h3>
                          <ul className="suggestions-list">
                            {analysisResult.suggestions.map((suggestion, idx) => (
                              <li key={idx}>{suggestion}</li>
                            ))}
                          </ul>
                          <div className="action-buttons">
                            <button className="suggestion-btn" onClick={() => {
                              const newResume = resumeText + '\n\n' + analysisResult.suggestions[0];
                              setResumeText(newResume);
                            }}>
                              Apply Top Suggestion
                            </button>
                            <button className="suggestion-btn secondary" onClick={() => {
                              setResumeText('');
                              setAnalysisResult(null);
                            }}>
                              Start Over
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="pro-tips">
                        <h3>🎯 Pro Tips for Better Matches:</h3>
                        <div className="tips-grid">
                          <div className="tip-card">
                            <h4>🔍 Keyword Optimization</h4>
                            <p>Use exact keywords from job descriptions. Tools like JobScan can help identify missing keywords.</p>
                          </div>
                          <div className="tip-card">
                            <h4>📈 Quantify Achievements</h4>
                            <p>Use numbers and metrics: "Increased performance by 40%" instead of "Improved performance".</p>
                          </div>
                          <div className="tip-card">
                            <h4>🎯 Tailor for Each Job</h4>
                            <p>Customize your resume for each application. Save multiple versions for different roles.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* JOB PORTALS TAB */}
            {activeTab === 'portals' && (
              <div className="portals-tab">
                <div className="portals-header">
                  <h2>🔗 Connect Your Job Portals</h2>
                  <p className="subtitle">Login to your existing job portal accounts to fetch personalized job data</p>
                </div>

                <div className="portals-grid">
                  {JOB_PORTALS.map(portal => (
                    <div key={portal.id} className="portal-card">
                      <div className="portal-icon">{portal.icon}</div>
                      <h3>{portal.name}</h3>
                      <div className={`portal-status ${sessionData ? 'connected' : 'disconnected'}`}>
                        {sessionData ? '✅ Connected' : '🔒 Login Required'}
                      </div>
                      <p className="portal-description">
                        {portal.id === 'linkedin' && 'Connect your LinkedIn to access network-based opportunities'}
                        {portal.id === 'indeed' && 'Sync your Indeed profile for broad job search coverage'}
                        {portal.id === 'glassdoor' && 'Access company reviews and salary information'}
                        {portal.id === 'naukri' && 'Indian job market specialist'}
                        {portal.id === 'monster' && 'Global job search platform'}
                        {portal.id === 'angel' && 'Startup and tech company opportunities'}
                      </p>
                      <button
                        className={`portal-connect-btn ${sessionData ? 'connected' : ''}`}
                        onClick={() => {
                          if (!userLoggedIn) {
                            alert('Please login first to connect job portals');
                            return;
                          }
                          alert(`Connecting to ${portal.name}...\n\nIn a real application, this would:\n1. Open OAuth login for ${portal.name}\n2. Request read-only access to your job data\n3. Fetch your saved jobs and applications\n4. Sync with JobHawk for personalized recommendations`);
                        }}
                      >
                        {sessionData ? 'Reconnect' : 'Connect Account'}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="data-privacy">
                  <h3>🔒 Data Privacy & Security</h3>
                  <div className="privacy-points">
                    <div className="privacy-point">
                      <span className="privacy-icon">🔐</span>
                      <div>
                        <strong>Read-Only Access</strong>
                        <p>We only request permission to read your job data, not modify it</p>
                      </div>
                    </div>
                    <div className="privacy-point">
                      <span className="privacy-icon">🚫</span>
                      <div>
                        <strong>No Credentials Stored</strong>
                        <p>We use OAuth. Your portal passwords are never stored on our servers</p>
                      </div>
                    </div>
                    <div className="privacy-point">
                      <span className="privacy-icon">📊</span>
                      <div>
                        <strong>Personalized Only</strong>
                        <p>Data is used solely to provide personalized job recommendations</p>
                      </div>
                    </div>
                    <div className="privacy-point">
                      <span className="privacy-icon">🗑️</span>
                      <div>
                        <strong>Easy Disconnect</strong>
                        <p>You can disconnect any portal anytime from your account settings</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DASHBOARD TAB */}
            {activeTab === 'dashboard' && (
              <div className="dashboard-tab">
                <div className="dashboard-header">
                  <h2>📊 Your Job Search Dashboard</h2>
                  <div className="dashboard-stats">
                    <div className="stat-card">
                      <h3>Saved Jobs</h3>
                      <p className="stat-number">0</p>
                    </div>
                    <div className="stat-card">
                      <h3>Applications</h3>
                      <p className="stat-number">0</p>
                    </div>
                    <div className="stat-card">
                      <h3>Portals Connected</h3>
                      <p className="stat-number">{sessionData ? JOB_PORTALS.length : 0}</p>
                    </div>
                    <div className="stat-card">
                      <h3>Resume Score</h3>
                      <p className="stat-number">{analysisResult ? `${Math.round(analysisResult.overallScore)}%` : 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div className="dashboard-content">
                  <div className="dashboard-column">
                    <div className="dashboard-card">
                      <h3>📈 Search Activity</h3>
                      <div className="activity-list">
                        {searchQuery && (
                          <div className="activity-item">
                            <span className="activity-icon">🔍</span>
                            <div>
                              <strong>Last Search:</strong>
                              <p>"{searchQuery}" - {jobResults.length} results</p>
                            </div>
                          </div>
                        )}
                        {analysisResult && (
                          <div className="activity-item">
                            <span className="activity-icon">📊</span>
                            <div>
                              <strong>Resume Analysis:</strong>
                              <p>Score: {Math.round(analysisResult.overallScore)}%</p>
                            </div>
                          </div>
                        )}
                        {userLoggedIn && (
                          <div className="activity-item">
                            <span className="activity-icon">✅</span>
                            <div>
                              <strong>Account Status:</strong>
                              <p>Logged in as {userEmail}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="dashboard-card">
                      <h3>🎯 Recommended Actions</h3>
                      <ul className="action-list">
                        {!userLoggedIn && (
                          <li>🔑 Login to connect job portals</li>
                        )}
                        {!resumeText && (
                          <li>📄 Upload your resume for analysis</li>
                        )}
                        {resumeText && analysisResult?.overallScore < 70 && (
                          <li>⚡ Improve your resume score (currently {Math.round(analysisResult.overallScore)}%)</li>
                        )}
                        {jobResults.length === 0 && (
                          <li>🔍 Search for jobs to get started</li>
                        )}
                        {jobResults.length > 0 && (
                          <li>📋 Apply to top matching jobs</li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="dashboard-column">
                    <div className="dashboard-card">
                      <h3>🚀 Quick Start</h3>
                      <div className="quick-actions-dash">
                        <button
                          className="dash-btn primary"
                          onClick={() => setActiveTab('search')}
                        >
                          🔍 Search Jobs
                        </button>
                        <button
                          className="dash-btn secondary"
                          onClick={() => setActiveTab('resume')}
                        >
                          📄 Analyze Resume
                        </button>
                        <button
                          className="dash-btn tertiary"
                          onClick={() => setActiveTab('portals')}
                        >
                          🔗 Connect Portals
                        </button>
                      </div>
                    </div>

                    <div className="dashboard-card">
                      <h3>📅 Upcoming Features</h3>
                      <ul className="features-list">
                        <li>📧 Email notifications for new matching jobs</li>
                        <li>🤖 AI-powered cover letter generator</li>
                        <li>📱 Mobile app for on-the-go search</li>
                        <li>👥 Interview preparation assistant</li>
                        <li>📊 Salary negotiation guidance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>JobHawk AI v2.0</h4>
            <p>Intelligent Job Search Platform</p>
            <p className="tech-stack">Real Data • Session-Based • Resume Analysis</p>
          </div>

          <div className="footer-section">
            <h4>Key Features</h4>
            <ul className="features">
              <li>🔍 Intelligent job search</li>
              <li>📊 Resume-Job matching</li>
              <li>🔗 Multi-portal integration</li>
              <li>🎯 Personalized recommendations</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <div className="footer-links">
              <button onClick={() => setActiveTab('search')}>Job Search</button>
              <button onClick={() => setActiveTab('resume')}>Resume Analysis</button>
              <button onClick={() => setActiveTab('dashboard')}>Dashboard</button>
              <button onClick={() => window.open('https://github.com/Hemantsharma800/JobHawk', '_blank')}>GitHub</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 JobHawk AI • No Backend Required • Uses Your Existing Job Portal Accounts</p>
          <p className="disclaimer">
            ⚠️ This is a demo application. In production, real OAuth integration with job portals would be implemented.
            No user data is stored permanently.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;