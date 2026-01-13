import  { useState, useEffect } from 'react';
import { applicationsAPI, userAPI } from '../services/api';
import { Application } from '../types';
import './Dashboard.css';

const Dashboard = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [stats, setStats] = useState({
    totalApplications: 0,
    interviews: 0,
    offers: 0,
    rejections: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appsResponse, statsResponse] = await Promise.all([
          applicationsAPI.getApplications(),
          userAPI.getStats()
        ]);
        setApplications(appsResponse.data);
        setStats(statsResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    
    fetchData();
  }, []);

  const getStatusCount = (status) => {
    return applications.filter(app => app.status === status).length;
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <p className="welcome">Welcome back, Patch User</p>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h3>{stats.totalApplications || applications.length}</h3>
            <p>Applications</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <h3>{getStatusCount('interview')}</h3>
            <p>Interviews</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-info">
            <h3>{getStatusCount('offer')}</h3>
            <p>Offers</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📉</div>
          <div className="stat-info">
            <h3>{getStatusCount('rejected')}</h3>
            <p>Rejections</p>
          </div>
        </div>
      </div>
      
      <div className="recent-applications">
        <h2>Recent Applications</h2>
        <div className="applications-table">
          <div className="table-header">
            <div>Company</div>
            <div>Position</div>
            <div>Status</div>
            <div>Date</div>
            <div>Actions</div>
          </div>
          {applications.slice(0, 5).map(app => (
            <div key={app.id} className="table-row">
              <div className="company">{app.company}</div>
              <div className="position">{app.jobTitle}</div>
              <div className={`status status-${app.status}`}>
                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
              </div>
              <div className="date">{app.appliedDate || 'Not applied'}</div>
              <div className="actions">
                <button className="action-btn view">View</button>
                <button className="action-btn update">Update</button>
              </div>
            </div>
          ))}
        </div>
        <button className="view-all-btn">View All Applications →</button>
      </div>
      
      <div className="upcoming-interviews">
        <h2>Upcoming Interviews</h2>
        {applications.filter(app => app.interviewDate && new Date(app.interviewDate) > new Date()).length > 0 ? (
          <div className="interviews-list">
            {applications
              .filter(app => app.interviewDate && new Date(app.interviewDate) > new Date())
              .slice(0, 3)
              .map(app => (
                <div key={app.id} className="interview-card">
                  <div className="interview-info">
                    <h4>{app.company}</h4>
                    <p>{app.jobTitle}</p>
                    <span className="interview-date">
                      📅 {new Date(app.interviewDate!).toLocaleDateString()} at{' '}
                      {new Date(app.interviewDate!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="interview-actions">
                    <button className="join-btn">Join</button>
                    <button className="reschedule-btn">Reschedule</button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p className="no-interviews">No upcoming interviews scheduled.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
