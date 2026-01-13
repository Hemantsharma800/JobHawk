import React from 'react';
import { FiTrendingUp, FiEye, FiMousePointer, FiCalendar, FiTarget, FiBarChart2 } from 'react-icons/fi';
import './Analytics.css';

const Analytics = () => {
  const stats = [
    { label: 'Profile Views', value: '1,245', change: '+12%', icon: <FiEye />, color: '#3b82f6' },
    { label: 'Application Views', value: '89', change: '+8%', icon: <FiMousePointer />, color: '#10b981' },
    { label: 'Interview Rate', value: '25%', change: '+5%', icon: <FiCalendar />, color: '#8b5cf6' },
    { label: 'Response Rate', value: '68%', change: '+15%', icon: <FiTarget />, color: '#f59e0b' }
  ];

  const applicationsByStatus = [
    { status: 'Applied', count: 45, color: '#3b82f6' },
    { status: 'Reviewed', count: 32, color: '#10b981' },
    { status: 'Interview', count: 18, color: '#8b5cf6' },
    { status: 'Offered', count: 5, color: '#f59e0b' },
    { status: 'Rejected', count: 12, color: '#ef4444' }
  ];

  const weeklyActivity = [
    { day: 'Mon', applications: 8, views: 45 },
    { day: 'Tue', applications: 12, views: 68 },
    { day: 'Wed', applications: 7, views: 52 },
    { day: 'Thu', applications: 15, views: 89 },
    { day: 'Fri', applications: 10, views: 76 },
    { day: 'Sat', applications: 3, views: 34 },
    { day: 'Sun', applications: 5, views: 41 }
  ];

  const topSkills = [
    { skill: 'React', demand: 95, jobs: 245 },
    { skill: 'JavaScript', demand: 92, jobs: 312 },
    { skill: 'Node.js', demand: 88, jobs: 187 },
    { skill: 'TypeScript', demand: 85, jobs: 156 },
    { skill: 'AWS', demand: 82, jobs: 134 }
  ];

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h1><FiBarChart2 /> Analytics Dashboard</h1>
        <p>Track your job search performance and insights</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
            <div className="stat-change positive">
              <FiTrendingUp /> {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Applications Status */}
        <div className="chart-card">
          <h3>Applications by Status</h3>
          <div className="status-chart">
            {applicationsByStatus.map((item, index) => (
              <div key={index} className="status-item">
                <div className="status-bar">
                  <div 
                    className="status-fill" 
                    style={{ 
                      width: `${(item.count / 112) * 100}%`,
                      backgroundColor: item.color
                    }}
                  />
                </div>
                <div className="status-info">
                  <span className="status-label">{item.status}</span>
                  <span className="status-count">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="chart-card">
          <h3>Weekly Activity</h3>
          <div className="activity-chart">
            {weeklyActivity.map((day, index) => (
              <div key={index} className="activity-day">
                <div className="day-label">{day.day}</div>
                <div className="day-bars">
                  <div 
                    className="application-bar"
                    style={{ height: `${(day.applications / 15) * 100}%` }}
                    title={`${day.applications} applications`}
                  />
                  <div 
                    className="view-bar"
                    style={{ height: `${(day.views / 100) * 100}%` }}
                    title={`${day.views} profile views`}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color applications"></div>
              <span>Applications</span>
            </div>
            <div className="legend-item">
              <div className="legend-color views"></div>
              <span>Profile Views</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Analysis */}
      <div className="skills-section">
        <h3>In-Demand Skills Analysis</h3>
        <div className="skills-list">
          {topSkills.map((skill, index) => (
            <div key={index} className="skill-item">
              <div className="skill-header">
                <span className="skill-name">{skill.skill}</span>
                <span className="skill-demand">{skill.demand}% demand</span>
              </div>
              <div className="skill-progress">
                <div 
                  className="progress-bar"
                  style={{ width: `${skill.demand}%` }}
                />
              </div>
              <div className="skill-footer">
                <span>{skill.jobs} jobs available</span>
                <button className="improve-btn">Improve Skill</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="recommendations-section">
        <h3>Recommendations</h3>
        <div className="recommendations-grid">
          <div className="recommendation-card">
            <h4>📈 Increase Applications</h4>
            <p>Apply to 5 more jobs this week to increase your chances by 40%</p>
            <button className="action-btn">Set Goal</button>
          </div>
          <div className="recommendation-card">
            <h4>📝 Improve Profile</h4>
            <p>Add 3 more skills to increase profile views by 25%</p>
            <button className="action-btn">Add Skills</button>
          </div>
          <div className="recommendation-card">
            <h4>🤝 Expand Network</h4>
            <p>Connect with 10 industry professionals this month</p>
            <button className="action-btn">Find Connections</button>
          </div>
          <div className="recommendation-card">
            <h4>🎯 Target Companies</h4>
            <p>Research and follow 5 target companies</p>
            <button className="action-btn">Explore Companies</button>
          </div>
        </div>
      </div>

      {/* Export Section */}
      <div className="export-section">
        <h3>Export Analytics</h3>
        <p>Download your analytics data for detailed analysis</p>
        <div className="export-options">
          <button className="export-btn">📊 PDF Report</button>
          <button className="export-btn">📈 Excel Data</button>
          <button className="export-btn">📋 Summary</button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
