import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { 
  FiBriefcase, 
  FiCalendar, 
  FiCheckCircle, 
  FiUser,
  FiTrendingUp,
  FiActivity,
  FiTarget,
  FiAward
} from 'react-icons/fi';
import { MdWork, MdPeople, MdAssessment } from 'react-icons/md';
import './Dashboard.css';

const Dashboard = () => {
  const { user, jobPortals } = useUser();
  
  const stats = [
    { 
      title: 'Applications', 
      value: 12, 
      change: '+2 this week',
      icon: <FiBriefcase />,
      color: '#667eea',
      link: '/applications'
    },
    { 
      title: 'Interviews', 
      value: 3, 
      change: '1 upcoming',
      icon: <FiCalendar />,
      color: '#f093fb',
      link: '/interviews'
    },
    { 
      title: 'Offers', 
      value: 1, 
      change: 'Pending review',
      icon: <FiCheckCircle />,
      color: '#4facfe',
      link: '/offers'
    },
    { 
      title: 'Profile Score', 
      value: `${user.profileCompletion}%`, 
      change: 'Complete profile',
      icon: <FiUser />,
      color: '#43e97b',
      link: '/profile/completion'
    }
  ];

  const activePortals = jobPortals.filter(p => p.status === 'active');
  const inactivePortals = jobPortals.filter(p => p.status === 'inactive');

  const recentActivities = [
    { id: 1, action: 'Applied for Senior React Developer', company: 'Tech Corp', time: '2 hours ago', type: 'application' },
    { id: 2, action: 'Profile viewed by recruiter', company: 'Google', time: 'Yesterday', type: 'view' },
    { id: 3, action: 'Skill assessment completed', score: '85%', time: '2 days ago', type: 'assessment' },
    { id: 4, action: 'Connection request accepted', person: 'Sarah Johnson', time: '3 days ago', type: 'connection' }
  ];

  const upcomingEvents = [
    { id: 1, title: 'Technical Interview', company: 'Startup Inc', time: 'Mon, 10:00 AM', type: 'interview' },
    { id: 2, title: 'Networking Event', organizer: 'Tech Meetup', time: 'Tue, 6:00 PM', type: 'event' },
    { id: 3, title: 'Career Webinar', topic: 'Remote Work Trends', time: 'Wed, 2:00 PM', type: 'webinar' }
  ];

  return (
    <div className="dashboard-container">
      {/* Welcome Section */}
      <div className="welcome-section">
        <div>
          <h1>Welcome back, {user.name}!</h1>
          <p>Here's your job search overview</p>
        </div>
        <div className="welcome-actions">
          <button className="btn-primary">
            <MdWork /> Search Jobs
          </button>
          <button className="btn-secondary">
            <FiTrendingUp /> Track Progress
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <Link to={stat.link} key={index} className="stat-card">
            <div className="stat-icon" style={{ background: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p className="stat-title">{stat.title}</p>
              <p className="stat-change">{stat.change}</p>
            </div>
            <div className="stat-arrow">→</div>
          </Link>
        ))}
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Left Column */}
        <div className="dashboard-column left">
          {/* Job Portals */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Job Portals Status</h3>
              <Link to="/jobportals" className="view-all">Manage</Link>
            </div>
            
            <div className="portals-grid">
              {jobPortals.map((portal) => (
                <div key={portal.id} className={`portal-card ${portal.status}`}>
                  <div className="portal-icon">{portal.name.charAt(0)}</div>
                  <div className="portal-info">
                    <h4>{portal.name}</h4>
                    <p>{portal.status === 'active' ? `${portal.jobs} jobs found` : 'Inactive'}</p>
                    <small>Last sync: {portal.lastSync}</small>
                  </div>
                  <div className={`portal-status ${portal.status}`}>
                    {portal.status === 'active' ? 'Active' : 'Inactive'}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="portal-summary">
              <div className="summary-item">
                <span className="active-count">{activePortals.length}</span>
                <span>Active Portals</span>
              </div>
              <div className="summary-item">
                <span className="total-jobs">
                  {jobPortals.reduce((sum, p) => sum + p.jobs, 0)}
                </span>
                <span>Total Jobs</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Recent Activity</h3>
              <Link to="/activity" className="view-all">See all</Link>
            </div>
            
            <div className="activity-list">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className={`activity-icon ${activity.type}`}>
                    {activity.type === 'application' && <FiBriefcase />}
                    {activity.type === 'view' && <FiActivity />}
                    {activity.type === 'assessment' && <MdAssessment />}
                    {activity.type === 'connection' && <MdPeople />}
                  </div>
                  <div className="activity-content">
                    <p>{activity.action}</p>
                    <div className="activity-meta">
                      <span>{activity.company || activity.person || activity.score}</span>
                      <span>•</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="dashboard-column right">
          {/* Upcoming Events */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Upcoming Events</h3>
              <Link to="/calendar" className="view-all">Calendar</Link>
            </div>
            
            <div className="events-list">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="event-item">
                  <div className="event-time">
                    <div className="event-day">{event.time.split(',')[0]}</div>
                    <div className="event-hour">{event.time.split(',')[1].trim()}</div>
                  </div>
                  <div className="event-details">
                    <h4>{event.title}</h4>
                    <p>{event.company || event.organizer || event.topic}</p>
                    <span className={`event-type ${event.type}`}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                  </div>
                  <button className="event-action">
                    {event.type === 'interview' ? 'Join' : 'View'}
                  </button>
                </div>
              ))}
            </div>
            
            <div className="events-actions">
              <button className="btn-outline">
                <FiCalendar /> Add Event
              </button>
              <button className="btn-outline">
                <FiTarget /> Set Reminder
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Quick Stats</h3>
              <FiAward className="stats-icon" />
            </div>
            
            <div className="quick-stats">
              <div className="stat-item">
                <div className="stat-circle" style={{ '--percentage': '75' }}>
                  <span>75%</span>
                </div>
                <div className="stat-info">
                  <p>Response Rate</p>
                  <small>Applications to responses</small>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-circle" style={{ '--percentage': '60' }}>
                  <span>60%</span>
                </div>
                <div className="stat-info">
                  <p>Interview Success</p>
                  <small>Applications to interviews</small>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-circle" style={{ '--percentage': '25' }}>
                  <span>25%</span>
                </div>
                <div className="stat-info">
                  <p>Offer Rate</p>
                  <small>Interviews to offers</small>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="dashboard-card recommendations">
            <h3>Recommended for You</h3>
            <ul>
              <li>Update your resume with recent projects</li>
              <li>Complete 2 more skill assessments</li>
              <li>Connect with 10 industry professionals</li>
              <li>Apply to 5 remote positions this week</li>
            </ul>
            <button className="btn-primary full-width">
              View Recommendations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
