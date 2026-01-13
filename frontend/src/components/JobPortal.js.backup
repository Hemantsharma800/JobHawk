import React, { useState } from 'react';
import { 
  FiBriefcase, 
  FiGlobe, 
  FiLink, 
  FiExternalLink, 
  FiCheckCircle, 
  FiXCircle,
  FiRefreshCw
} from 'react-icons/fi';
import './JobPortal.css';

const JobPortal = () => {
  const [portals, setPortals] = useState([
    { 
      id: 1, 
      name: 'LinkedIn', 
      status: 'active', 
      jobs: 245, 
      lastSync: '2 hours ago',
      icon: <FiGlobe />,
      url: 'https://linkedin.com'
    },
    { 
      id: 2, 
      name: 'Indeed', 
      status: 'active', 
      jobs: 189, 
      lastSync: '1 day ago',
      icon: <FiBriefcase />,
      url: 'https://indeed.com'
    },
    { 
      id: 3, 
      name: 'Glassdoor', 
      status: 'inactive', 
      jobs: 76, 
      lastSync: '3 days ago',
      icon: <FiBriefcase />,
      url: 'https://glassdoor.com'
    },
    { 
      id: 4, 
      name: 'Monster', 
      status: 'active', 
      jobs: 92, 
      lastSync: '5 hours ago',
      icon: <FiBriefcase />,
      url: 'https://monster.com'
    }
  ]);

  const togglePortalStatus = (portalId) => {
    setPortals(portals.map(portal => {
      if (portal.id === portalId) {
        return {
          ...portal,
          status: portal.status === 'active' ? 'inactive' : 'active'
        };
      }
      return portal;
    }));
  };

  const connectToPortal = (url) => {
    window.open(url, '_blank');
  };

  const syncAllPortals = () => {
    portals
      .filter(portal => portal.status === 'active')
      .forEach(portal => {
        connectToPortal(portal.url);
      });
  };

  return (
    <div className="job-portal-container">
      <div className="portal-header">
        <h1><FiLink /> Job Portals</h1>
        <p>Manage your job board connections</p>
      </div>

      <div className="portal-stats">
        <div className="stat-card">
          <h3>{portals.length}</h3>
          <p>Total Portals</p>
        </div>
        <div className="stat-card">
          <h3>{portals.filter(p => p.status === 'active').length}</h3>
          <p>Active Portals</p>
        </div>
        <div className="stat-card">
          <h3>{portals.reduce((sum, p) => sum + p.jobs, 0)}</h3>
          <p>Total Jobs</p>
        </div>
      </div>

      <div className="portal-controls">
        <button className="sync-all-btn" onClick={syncAllPortals}>
          <FiRefreshCw /> Sync All Active
        </button>
      </div>

      <div className="portals-grid">
        {portals.map((portal) => (
          <div key={portal.id} className={`portal-card ${portal.status}`}>
            <div className="portal-card-header">
              <div className="portal-icon">
                {portal.icon}
              </div>
              <div className="portal-title">
                <h3>{portal.name}</h3>
                <span className={`portal-status ${portal.status}`}>
                  {portal.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            <div className="portal-stats-info">
              <div className="stat-item">
                <span className="stat-label">Jobs</span>
                <span className="stat-value">{portal.jobs}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Last Sync</span>
                <span className="stat-value">{portal.lastSync}</span>
              </div>
            </div>

            <div className="portal-actions">
              <button 
                className={`status-btn ${portal.status}`}
                onClick={() => togglePortalStatus(portal.id)}
              >
                {portal.status === 'active' ? <FiCheckCircle /> : <FiXCircle />}
                {portal.status === 'active' ? 'Active' : 'Inactive'}
              </button>
              <button 
                className="connect-btn"
                onClick={() => connectToPortal(portal.url)}
              >
                <FiExternalLink /> Visit
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="add-portal-section">
        <h3>Add New Portal</h3>
        <p>Connect to more job boards to find opportunities</p>
        <button className="add-portal-btn">
          <FiLink /> Connect New Portal
        </button>
      </div>
    </div>
  );
};

export default JobPortal;
