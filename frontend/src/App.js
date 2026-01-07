import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // Dashboard states
  const [backendStatus, setBackendStatus] = useState('Checking...');
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({ total_jobs: 0, active_users: 0 });
  const [loading, setLoading] = useState(true);

  // Job Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [jobResults, setJobResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard'); // or 'search' as default

  // User Authentication states
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  // Resume Analysis states
  const [resumeText, setResumeText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [jobSources, setJobSources] = useState([]);
  const [sessionData, setSessionData] = useState(null);
  const fileInputRef = useRef(null);

  // API Configuration
  const isLocal = window.location.hostname === 'localhost';
  const API_BASE = isLocal ? 'http://localhost:8000' : 'https://jobhawk-backend.onrender.com';

  // Fetch backend status and dashboard data
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await axios.get(`${API_BASE}/health`);
        setBackendStatus('Connected');

        // Fetch dashboard stats
        const statsResponse = await axios.get(`${API_BASE}/stats`);
        setStats(statsResponse.data);

        // Fetch recent jobs
        const jobsResponse = await axios.get(`${API_BASE}/jobs`);
        setJobs(jobsResponse.data);
      } catch (error) {
        setBackendStatus('Disconnected');
        console.error('Backend connection error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkBackend();
  }, [API_BASE]);

  // Search jobs function
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearchLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/search`, {
        params: { q: searchQuery }
      });
      setJobResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
      alert('Failed to search jobs');
    } finally {
      setSearchLoading(false);
    }
  };

  // Handle resume upload/analysis
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await axios.post(`${API_BASE}/analyze-resume`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setAnalysisResult(response.data);
      setResumeText(response.data.text || '');
    } catch (error) {
      console.error('Resume analysis error:', error);
      alert('Failed to analyze resume');
    }
  };

  // Handle user login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE}/login`, {
        email: userEmail,
        password: userPassword
      });

      if (response.data.success) {
        setUserLoggedIn(true);
        setSessionData(response.data.user);
        alert('Login successful!');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };

  // Handle user logout
  const handleLogout = () => {
    setUserLoggedIn(false);
    setUserEmail('');
    setUserPassword('');
    setSessionData(null);
  };

  // Render loading state
  if (loading) {
    return (
      <div className="app-loading">
        <h2>Loading JobHawk...</h2>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Header/Navigation */}
      <header className="app-header">
        <h1>JobHawk 🦅</h1>
        <div className="header-status">
          <span className={`status-dot ${backendStatus === 'Connected' ? 'connected' : 'disconnected'}`}></span>
          Backend: {backendStatus}
        </div>

        <nav className="tabs">
          <button
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={activeTab === 'search' ? 'active' : ''}
            onClick={() => setActiveTab('search')}
          >
            Job Search
          </button>
          <button
            className={activeTab === 'resume' ? 'active' : ''}
            onClick={() => setActiveTab('resume')}
          >
            Resume Analysis
          </button>
        </nav>

        {/* User Authentication */}
        <div className="auth-section">
          {userLoggedIn ? (
            <div className="user-info">
              <span>Welcome, {sessionData?.name || userEmail}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="login-form">
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
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </header>

      <main className="app-main">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="dashboard">
            <div className="stats-cards">
              <div className="stat-card">
                <h3>Total Jobs</h3>
                <p className="stat-number">{stats.total_jobs}</p>
              </div>
              <div className="stat-card">
                <h3>Active Users</h3>
                <p className="stat-number">{stats.active_users}</p>
              </div>
            </div>

            <div className="recent-jobs">
              <h2>Recent Job Listings</h2>
              {jobs.length > 0 ? (
                <ul className="job-list">
                  {jobs.slice(0, 5).map((job, index) => (
                    <li key={index} className="job-item">
                      <h4>{job.title}</h4>
                      <p>{job.company} • {job.location}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No jobs found</p>
              )}
            </div>
          </div>
        )}

        {/* Job Search Tab */}
        {activeTab === 'search' && (
          <div className="search-section">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search for jobs (keywords, title, location...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" disabled={searchLoading}>
                {searchLoading ? 'Searching...' : 'Search'}
              </button>
            </form>

            <div className="search-results">
              <h2>Search Results</h2>
              {searchLoading ? (
                <p>Loading results...</p>
              ) : jobResults.length > 0 ? (
                <ul className="results-list">
                  {jobResults.map((job, index) => (
                    <li key={index} className="result-item">
                      <h3>{job.title}</h3>
                      <p className="company">{job.company}</p>
                      <p className="location">{job.location}</p>
                      <p className="description">{job.description?.substring(0, 150)}...</p>
                      <a href={job.url} target="_blank" rel="noopener noreferrer" className="apply-btn">
                        Apply Now
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Enter a search query to find jobs</p>
              )}
            </div>
          </div>
        )}

        {/* Resume Analysis Tab */}
        {activeTab === 'resume' && (
          <div className="resume-section">
            <div className="resume-upload">
              <h2>Upload Resume for Analysis</h2>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleResumeUpload}
                ref={fileInputRef}
              />
              <p>Upload PDF, DOC, DOCX, or TXT files</p>
            </div>

            <div className="resume-text">
              <h3>Resume Text</h3>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste or edit your resume text here..."
                rows={10}
              />
            </div>

            {analysisResult && (
              <div className="analysis-results">
                <h3>Analysis Results</h3>
                <div className="result-card">
                  <h4>Skills Found:</h4>
                  <ul>
                    {analysisResult.skills?.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
                <div className="result-card">
                  <h4>Suggested Job Matches:</h4>
                  <ul>
                    {analysisResult.matches?.map((match, index) => (
                      <li key={index}>{match}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer>
        <div className="footer-bottom">
          <p>© 2024 JobHawk • Made with React & FastAPI • Deployed on GitHub Pages</p>
        </div>
      </footer>
    </div>
  );
}

export default App;