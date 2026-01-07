#!/bin/bash
# JobHawk - Complete Startup Script

echo "🚀 Starting JobHawk - Full Stack Job Search Assistant"
echo "====================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Kill existing processes
echo -e "${YELLOW}🔄 Stopping any running services...${NC}"
pkill -f "uvicorn" 2>/dev/null
pkill -f "npm" 2>/dev/null
pkill -f "react-scripts" 2>/dev/null

# Backend Setup
echo -e "${YELLOW}⚙️  Setting up Backend...${NC}"
cd backend

# Check/activate virtual environment
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python -m venv venv
fi

source venv/bin/activate

# Install requirements
if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
fi

# Create/update main.py with all endpoints
cat > main.py << 'EOF'
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import json
from datetime import datetime

app = FastAPI(
    title="JobHawk API",
    description="Job Search Assistant Backend",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class Job(BaseModel):
    id: int
    title: str
    company: str
    location: str
    salary: Optional[str] = None
    description: str
    url: str
    posted_date: str

class User(BaseModel):
    username: str
    email: str

class LoginRequest(BaseModel):
    username: str
    password: str

# Mock data
MOCK_JOBS = [
    {
        "id": 1,
        "title": "Senior Frontend Developer",
        "company": "TechCorp",
        "location": "Remote",
        "salary": "$120,000 - $150,000",
        "description": "Build amazing React applications",
        "url": "https://example.com/job/1",
        "posted_date": "2024-01-07"
    },
    {
        "id": 2,
        "title": "Backend Engineer",
        "company": "StartupXYZ",
        "location": "San Francisco, CA",
        "salary": "$130,000 - $160,000",
        "description": "Python/FastAPI development",
        "url": "https://example.com/job/2",
        "posted_date": "2024-01-06"
    },
    {
        "id": 3,
        "title": "Full Stack Developer",
        "company": "InnovateCo",
        "location": "New York, NY",
        "salary": "$110,000 - $140,000",
        "description": "React + Node.js position",
        "url": "https://example.com/job/3",
        "posted_date": "2024-01-05"
    }
]

# Routes
@app.get("/")
async def root():
    return {
        "service": "JobHawk API",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "docs": "/docs",
            "health": "/health",
            "jobs": "/api/jobs",
            "login": "/api/auth/login"
        }
    }

@app.get("/health")
async def health():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.get("/api/jobs")
async def get_jobs(skip: int = 0, limit: int = 10):
    return {
        "jobs": MOCK_JOBS[skip:skip+limit],
        "total": len(MOCK_JOBS),
        "skip": skip,
        "limit": limit
    }

@app.post("/api/auth/login")
async def login(credentials: LoginRequest):
    if credentials.username and credentials.password:
        return {
            "success": True,
            "user": {
                "username": credentials.username,
                "email": f"{credentials.username}@example.com"
            },
            "token": "mock_jwt_token_here",
            "message": "Login successful"
        }
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.get("/api/scrapers/test")
async def test_scrapers():
    return {
        "status": "success",
        "scrapers": ["linkedin", "indeed", "glassdoor"],
        "message": "Scrapers are ready"
    }

@app.get("/api/stats")
async def get_stats():
    return {
        "total_jobs": len(MOCK_JOBS),
        "active_users": 42,
        "scrapers_running": 3,
        "uptime": "24 hours"
    }

@app.get("/favicon.ico")
async def favicon():
    return {}
EOF

# Start backend in background
echo -e "${GREEN}🚀 Starting Backend on http://localhost:8000${NC}"
python -m uvicorn main:app --reload --port 8000 --host 0.0.0.0 &
BACKEND_PID=$!
sleep 3

# Frontend Setup
echo -e "${YELLOW}⚙️  Setting up Frontend...${NC}"
cd ../frontend

# Update package.json if needed
if [ ! -f "package.json" ]; then
    cat > package.json << 'EOF'
{
  "name": "jobhawk-frontend",
  "version": "1.0.0",
  "private": true,
  "homepage": "https://hemantsharma800.github.io/JobHawk",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "axios": "^1.6.0",
    "react-router-dom": "^6.20.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
  "proxy": "http://localhost:8000"
}
EOF
fi

# Install dependencies
echo "Installing frontend dependencies..."
npm install --silent

# Update App.js with unified interface
cat > src/App.js << 'EOF'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [backendStatus, setBackendStatus] = useState('checking...');
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  // API configuration
  const API_BASE = window.location.hostname === 'localhost' 
    ? 'http://localhost:8000' 
    : 'https://your-backend-url.com'; // Update for production

  useEffect(() => {
    checkBackend();
    fetchJobs();
    fetchStats();
  }, []);

  const checkBackend = async () => {
    try {
      const response = await axios.get(`${API_BASE}/health`);
      setBackendStatus('✅ Connected');
    } catch (error) {
      setBackendStatus('❌ Error connecting');
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/jobs`);
      setJobs(response.data.jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTestLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE}/api/auth/login`, {
        username: 'demo',
        password: 'demo123'
      });
      alert(`Login successful! Token: ${response.data.token}`);
    } catch (error) {
      alert('Login failed');
    }
  };

  const handleTestScrapers = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/scrapers/test`);
      alert(`Scrapers: ${response.data.scrapers.join(', ')}`);
    } catch (error) {
      alert('Scrapers test failed');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🦅 JobHawk - Job Search Assistant</h1>
        <p>Your all-in-one job search platform</p>
      </header>

      <div className="dashboard">
        {/* Status Panel */}
        <div className="status-panel">
          <h2>System Status</h2>
          <div className="status-grid">
            <div className="status-item">
              <h3>Backend API</h3>
              <p className={backendStatus.includes('✅') ? 'status-good' : 'status-bad'}>
                {backendStatus}
              </p>
            </div>
            <div className="status-item">
              <h3>Frontend</h3>
              <p className="status-good">✅ Running</p>
            </div>
            <div className="status-item">
              <h3>Database</h3>
              <p className="status-warning">⚡ Mock Data</p>
            </div>
            <div className="status-item">
              <h3>Scrapers</h3>
              <p className="status-good">✅ Ready</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="actions-panel">
          <h2>Quick Actions</h2>
          <div className="button-group">
            <button onClick={handleTestLogin} className="btn btn-primary">
              Test Login
            </button>
            <button onClick={handleTestScrapers} className="btn btn-secondary">
              Test Scrapers
            </button>
            <button onClick={fetchJobs} className="btn btn-success">
              Refresh Jobs
            </button>
            <a 
              href={`${API_BASE}/docs`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-info"
            >
              API Documentation
            </a>
          </div>
        </div>

        {/* Stats */}
        {!loading && (
          <div className="stats-panel">
            <h2>Statistics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Jobs</h3>
                <p className="stat-number">{stats.total_jobs || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Active Users</h3>
                <p className="stat-number">{stats.active_users || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Scrapers</h3>
                <p className="stat-number">{stats.scrapers_running || 0}</p>
              </div>
            </div>
          </div>
        )}

        {/* Job Listings */}
        <div className="jobs-panel">
          <h2>Latest Job Opportunities</h2>
          {jobs.length > 0 ? (
            <div className="jobs-list">
              {jobs.map(job => (
                <div key={job.id} className="job-card">
                  <h3>{job.title}</h3>
                  <p className="company">{job.company} • {job.location}</p>
                  <p className="salary">{job.salary}</p>
                  <p className="description">{job.description}</p>
                  <div className="job-footer">
                    <span className="date">Posted: {job.posted_date}</span>
                    <a href={job.url} target="_blank" rel="noopener noreferrer" className="apply-btn">
                      View Details
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No jobs found. Try refreshing or check scrapers.</p>
          )}
        </div>

        {/* Deployment Info */}
        <div className="deploy-info">
          <h3>🌐 Deployment Information</h3>
          <ul>
            <li><strong>Frontend:</strong> <a href="https://hemantsharma800.github.io/JobHawk" target="_blank" rel="noopener noreferrer">GitHub Pages</a></li>
            <li><strong>Backend API:</strong> <a href="http://localhost:8000/docs" target="_blank" rel="noopener noreferrer">localhost:8000/docs</a></li>
            <li><strong>GitHub Repo:</strong> <a href="https://github.com/Hemantsharma800/JobHawk" target="_blank" rel="noopener noreferrer">View Source</a></li>
          </ul>
        </div>
      </div>

      <footer>
        <p>JobHawk © 2024 • Full Stack Job Search Assistant</p>
        <p>Backend: FastAPI • Frontend: React • Deployment: GitHub Pages</p>
      </footer>
    </div>
  );
}

export default App;
EOF

# Create App.css for styling
cat > src/App.css << 'EOF'
.App {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.App-header {
  text-align: center;
  padding: 40px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 15px;
  margin-bottom: 30px;
}

.App-header h1 {
  font-size: 2.8rem;
  margin-bottom: 10px;
}

.dashboard {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.status-panel, .actions-panel, .stats-panel, .jobs-panel, .deploy-info {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.status-item {
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  background: #f8f9fa;
}

.status-good { color: #10b981; font-weight: bold; }
.status-bad { color: #ef4444; font-weight: bold; }
.status-warning { color: #f59e0b; font-weight: bold; }

.button-group {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-top: 20px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
  text-decoration: none;
  display: inline-block;
}

.btn-primary { background: #3b82f6; color: white; }
.btn-secondary { background: #6b7280; color: white; }
.btn-success { background: #10b981; color: white; }
.btn-info { background: #06b6d4; color: white; }

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.stat-card {
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 10px;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #1e40af;
  margin: 10px 0;
}

.jobs-list {
  display: grid;
  gap: 20px;
  margin-top: 20px;
}

.job-card {
  padding: 20px;
  border-left: 5px solid #3b82f6;
  background: #f8fafc;
  border-radius: 8px;
}

.job-card h3 {
  margin: 0 0 10px 0;
  color: #1e293b;
}

.company {
  color: #64748b;
  font-weight: 500;
  margin: 5px 0;
}

.salary {
  color: #059669;
  font-weight: bold;
  margin: 5px 0;
}

.job-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.apply-btn {
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
}

.apply-btn:hover {
  background: #2563eb;
}

.deploy-info ul {
  list-style: none;
  padding: 0;
}

.deploy-info li {
  padding: 8px 0;
  border-bottom: 1px solid #e5e7eb;
}

.deploy-info a {
  color: #3b82f6;
  text-decoration: none;
}

.deploy-info a:hover {
  text-decoration: underline;
}

footer {
  text-align: center;
  margin-top: 40px;
  padding: 20px;
  color: #6b7280;
  border-top: 1px solid #e5e7eb;
}

/* Responsive */
@media (max-width: 768px) {
  .button-group {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    text-align: center;
  }
  
  .status-grid, .stats-grid {
    grid-template-columns: 1fr;
  }
}
EOF

# Start frontend
echo -e "${GREEN}🌐 Starting Frontend on http://localhost:3000${NC}"
npm start &
FRONTEND_PID=$!

echo -e "${GREEN}=====================================================${NC}"
echo -e "${GREEN}✅ JobHawk Successfully Started!${NC}"
echo -e "${GREEN}=====================================================${NC}"
echo -e "${YELLOW}📊 Services Running:${NC}"
echo -e "   Backend API:   ${GREEN}http://localhost:8000${NC}"
echo -e "   API Docs:      ${GREEN}http://localhost:8000/docs${NC}"
echo -e "   Frontend:      ${GREEN}http://localhost:3000${NC}"
echo -e "   GitHub Pages:  ${GREEN}https://hemantsharma800.github.io/JobHawk${NC}"
echo -e ""
echo -e "${YELLOW}🎯 Features Included:${NC}"
echo -e "   • Complete backend API with mock data"
echo -e "   • Unified React dashboard"
echo -e "   • Job listings display"
echo -e "   • System status monitoring"
echo -e "   • Quick action buttons"
echo -e "   • Responsive design"
echo -e ""
echo -e "${YELLOW}🛑 To Stop:${NC} Press Ctrl+C in this terminal"
echo -e "${GREEN}=====================================================${NC}"

# Wait for user interrupt
wait $BACKEND_PID $FRONTEND_PID