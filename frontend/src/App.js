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

export default App;