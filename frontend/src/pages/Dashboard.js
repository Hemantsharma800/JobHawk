import React from 'react';
import './styles/dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p className="welcome-text">Welcome back! Here's your job search overview.</p>
      
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <h2>24</h2>
          <p>Total Jobs</p>
          <span className="trend up">12% ↗</span>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <h2>12</h2>
          <p>Applied</p>
          <span className="trend up">8% ↗</span>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🤝</div>
          <h2>6</h2>
          <p>Interviews</p>
          <span className="trend up">5% ↗</span>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <h2>8.3%</h2>
          <p>Success Rate</p>
          <span className="trend up">3% ↗</span>
        </div>
      </div>
      
      <div className="dashboard-sections">
        <div className="recent-jobs">
          <div className="section-header">
            <h2>Recent Job Applications</h2>
            <button className="view-all-btn">View All →</button>
          </div>
          
          <div className="job-card">
            <div className="job-header">
              <h3>Senior React Developer</h3>
              <span className="job-badge">New</span>
            </div>
            <div className="job-details">
              <span className="company">TechCorp Inc.</span>
              <span className="separator">•</span>
              <span className="location">Remote</span>
              <span className="separator">•</span>
              <span className="date">15/01/2024</span>
              <span className="separator">•</span>
              <span className="salary">$120,000 - $150,000</span>
            </div>
            <p className="job-description">Looking for an experienced React developer with 5+ years in frontend development. Must have experience with TypeScript, Redux, and modern web technologies.</p>
            <div className="tags">
              <span className="tag">React</span>
              <span className="tag">TypeScript</span>
              <span className="tag">Redux</span>
              <span className="tag">Node.js</span>
            </div>
            <div className="job-actions">
              <button className="apply-btn">Apply Now</button>
              <button className="save-btn">Save</button>
            </div>
          </div>
          
          <div className="job-card">
            <div className="job-header">
              <h3>Full Stack Developer</h3>
              <span className="job-badge interview">Interview</span>
            </div>
            <div className="job-details">
              <span className="company">StartUpXYZ</span>
              <span className="separator">•</span>
              <span className="location">Hybrid</span>
              <span className="separator">•</span>
              <span className="date">10/01/2024</span>
              <span className="separator">•</span>
              <span className="salary">$90,000 - $110,000</span>
            </div>
            <p className="job-description">Looking for a Full Stack Developer proficient in JavaScript, Python, and cloud technologies. Fast-paced startup environment.</p>
            <div className="tags">
              <span className="tag">JavaScript</span>
              <span className="tag">Python</span>
              <span className="tag">AWS</span>
              <span className="tag">MongoDB</span>
            </div>
            <div className="job-actions">
              <button className="view-btn">View Details</button>
              <button className="status-btn">Interview Scheduled</button>
            </div>
          </div>
        </div>
        
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-cards">
            <div className="action-card">
              <span className="action-icon">➕</span>
              <h3>Add New Job</h3>
              <p>Track a new job application</p>
              <button className="action-btn">Add</button>
            </div>
            <div className="action-card">
              <span className="action-icon">📊</span>
              <h3>Generate Report</h3>
              <p>Create analytics report</p>
              <button className="action-btn">Generate</button>
            </div>
            <div className="action-card">
              <span className="action-icon">🔔</span>
              <h3>Set Reminder</h3>
              <p>Set follow-up reminders</p>
              <button className="action-btn">Set</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
