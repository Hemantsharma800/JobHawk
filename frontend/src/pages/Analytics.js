import React from 'react';
import './styles/Analytics.css';

function Analytics() {
  const stats = [
    { label: 'Application Rate', value: '85%', change: '+5%', color: '#10B981' },
    { label: 'Interview Rate', value: '42%', change: '+12%', color: '#3B82F6' },
    { label: 'Offer Rate', value: '18%', change: '+3%', color: '#8B5CF6' },
    { label: 'Response Time', value: '3.2 days', change: '-0.5', color: '#F59E0B' }
  ];

  const monthlyData = [
    { month: 'Jan', applications: 45, interviews: 12, offers: 2 },
    { month: 'Feb', applications: 52, interviews: 18, offers: 4 },
    { month: 'Mar', applications: 48, interviews: 15, offers: 3 },
    { month: 'Apr', applications: 60, interviews: 22, offers: 5 },
    { month: 'May', applications: 55, interviews: 20, offers: 4 }
  ];

  return (
    <div className="analytics-page">
      <h1>Analytics Dashboard</h1>
      <p className="page-subtitle">Track your job search performance and insights</p>
      
      <div className="analytics-stats">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <h3>{stat.label}</h3>
              <span className="stat-change" style={{ color: stat.color }}>{stat.change}</span>
            </div>
            <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
            <div className="stat-progress">
              <div className="progress-bar" style={{ 
                width: `${parseInt(stat.value)}%`, 
                backgroundColor: stat.color 
              }}></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="analytics-charts">
        <div className="chart-container">
          <h3>Monthly Performance</h3>
          <div className="chart">
            {monthlyData.map((data, index) => (
              <div key={index} className="chart-bar-group">
                <div className="chart-bar applications" style={{ height: `${data.applications * 2}px` }}>
                  <span className="chart-value">{data.applications}</span>
                </div>
                <div className="chart-bar interviews" style={{ height: `${data.interviews * 4}px` }}>
                  <span className="chart-value">{data.interviews}</span>
                </div>
                <div className="chart-bar offers" style={{ height: `${data.offers * 10}px` }}>
                  <span className="chart-value">{data.offers}</span>
                </div>
                <div className="chart-label">{data.month}</div>
              </div>
            ))}
          </div>
          <div className="chart-legend">
            <span className="legend-item applications">Applications</span>
            <span className="legend-item interviews">Interviews</span>
            <span className="legend-item offers">Offers</span>
          </div>
        </div>
        
        <div className="insights-container">
          <h3>Key Insights</h3>
          <div className="insights-list">
            <div className="insight">
              <span className="insight-icon">📈</span>
              <div>
                <h4>Application Success</h4>
                <p>Your application-to-interview rate increased by 12% this month</p>
              </div>
            </div>
            <div className="insight">
              <span className="insight-icon">🎯</span>
              <div>
                <h4>Best Performing</h4>
                <p>Tech companies have highest response rate (65%)</p>
              </div>
            </div>
            <div className="insight">
              <span className="insight-icon">⏰</span>
              <div>
                <h4>Response Time</h4>
                <p>Average response time improved to 3.2 days</p>
              </div>
            </div>
            <div className="insight">
              <span className="insight-icon">📅</span>
              <div>
                <h4>Busiest Day</h4>
                <p>Tuesday is the most productive day for applications</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
