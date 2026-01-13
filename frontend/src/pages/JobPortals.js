import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { 
  FiLink, 
  FiExternalLink, 
  FiCheckCircle, 
  FiXCircle,
  FiRefreshCw,
  FiPlus,
  FiSearch,
  FiFilter
} from 'react-icons/fi';
import { SiLinkedin, SiIndeed, SiGlassdoor, SiAngelist, SiMonster } from 'react-icons/si';
import './JobPortals.css';

const JobPortals = () => {
  const { jobPortals, updatePortalStatus, syncAllPortals, addNewPortal } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddPortal, setShowAddPortal] = useState(false);
  const [newPortalName, setNewPortalName] = useState('');

  const portalIcons = {
    'LinkedIn': <SiLinkedin className="portal-logo" />,
    'Indeed': <SiIndeed className="portal-logo" />,
    'Glassdoor': <SiGlassdoor className="portal-logo" />,
    'AngelList': <SiAngelist className="portal-logo" />,
    'Monster': <SiMonster className="portal-logo" />
  };

  const portalUrls = {
    'LinkedIn': 'https://linkedin.com/jobs',
    'Indeed': 'https://indeed.com',
    'Glassdoor': 'https://glassdoor.com/Jobs',
    'AngelList': 'https://angel.co/jobs',
    'Monster': 'https://monster.com'
  };

  const filteredPortals = jobPortals.filter(portal =>
    portal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activePortals = jobPortals.filter(p => p.status === 'active');
  const totalJobs = jobPortals.reduce((sum, p) => sum + p.jobs, 0);

  const handleAddPortal = () => {
    if (newPortalName.trim()) {
      addNewPortal(newPortalName);
      setNewPortalName('');
      setShowAddPortal(false);
    }
  };

  const handleSyncPortal = (portalId) => {
    const portal = jobPortals.find(p => p.id === portalId);
    if (portal && portal.status === 'active') {
      window.open(portalUrls[portal.name], '_blank');
      updatePortalStatus(portalId, 'active'); // This will update lastSync
    }
  };

  return (
    <div className="portals-container">
      <div className="portals-header">
        <div>
          <h1>Job Portals Management</h1>
          <p>Connect and manage all your job search platforms</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary" onClick={syncAllPortals}>
            <FiRefreshCw /> Sync All
          </button>
          <button className="btn-secondary" onClick={() => setShowAddPortal(true)}>
            <FiPlus /> Add Portal
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="portals-stats">
        <div className="stat-card">
          <div className="stat-icon active">
            <FiCheckCircle />
          </div>
          <div className="stat-content">
            <h3>{activePortals.length}</h3>
            <p>Active Portals</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon total">
            <FiLink />
          </div>
          <div className="stat-content">
            <h3>{jobPortals.length}</h3>
            <p>Total Portals</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon jobs">
            <FiSearch />
          </div>
          <div className="stat-content">
            <h3>{totalJobs}</h3>
            <p>Total Jobs</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon sync">
            <FiRefreshCw />
          </div>
          <div className="stat-content">
            <h3>{activePortals.length}</h3>
            <p>Ready to Sync</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="search-section">
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search portals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-options">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Active</button>
          <button className="filter-btn">Inactive</button>
        </div>
      </div>

      {/* Add Portal Modal */}
      {showAddPortal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Job Portal</h3>
              <button className="close-btn" onClick={() => setShowAddPortal(false)}>×</button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                placeholder="Enter portal name (e.g., LinkedIn, Indeed)"
                value={newPortalName}
                onChange={(e) => setNewPortalName(e.target.value)}
                className="portal-input"
              />
              <div className="suggested-portals">
                <p>Popular portals:</p>
                <div className="suggestions">
                  {['LinkedIn', 'Indeed', 'Glassdoor', 'AngelList', 'Monster']
                    .filter(name => !jobPortals.some(p => p.name === name))
                    .map(name => (
                      <button
                        key={name}
                        className="suggestion-btn"
                        onClick={() => {
                          setNewPortalName(name);
                          handleAddPortal();
                        }}
                      >
                        {portalIcons[name] || <FiLink />}
                        {name}
                      </button>
                    ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowAddPortal(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleAddPortal}>
                Add Portal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Portals Grid */}
      <div className="portals-grid">
        {filteredPortals.map((portal) => (
          <div key={portal.id} className={`portal-card ${portal.status}`}>
            <div className="portal-card-header">
              <div className="portal-logo-container">
                {portalIcons[portal.name] || <FiLink className="portal-logo" />}
              </div>
              <div className="portal-status-badge">
                <span className={`status-dot ${portal.status}`} />
                {portal.status === 'active' ? 'Active' : 'Inactive'}
              </div>
            </div>
            
            <div className="portal-card-body">
              <h3>{portal.name}</h3>
              <div className="portal-stats">
                <div className="stat">
                  <span className="value">{portal.jobs}</span>
                  <span className="label">Jobs</span>
                </div>
                <div className="stat">
                  <span className="value">{portal.lastSync}</span>
                  <span className="label">Last Sync</span>
                </div>
              </div>
            </div>

            <div className="portal-card-footer">
              <div className="portal-actions">
                <button
                  className={`toggle-btn ${portal.status}`}
                  onClick={() => updatePortalStatus(portal.id, portal.status)}
                >
                  {portal.status === 'active' ? (
                    <>
                      <FiCheckCircle /> Active
                    </>
                  ) : (
                    <>
                      <FiXCircle /> Inactive
                    </>
                  )}
                </button>
                
                <div className="action-buttons">
                  <button
                    className="sync-btn"
                    onClick={() => handleSyncPortal(portal.id)}
                    disabled={portal.status === 'inactive'}
                  >
                    <FiRefreshCw />
                  </button>
                  <button
                    className="visit-btn"
                    onClick={() => window.open(portalUrls[portal.name], '_blank')}
                  >
                    <FiExternalLink />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Tips */}
      <div className="tips-section">
        <h3>💡 Quick Tips</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <h4>Keep Portals Active</h4>
            <p>Active portals sync automatically and show latest jobs</p>
          </div>
          <div className="tip-card">
            <h4>Sync Regularly</h4>
            <p>Sync portals daily to get fresh job listings</p>
          </div>
          <div className="tip-card">
            <h4>Multiple Portals</h4>
            <p>Connect to multiple portals for maximum opportunities</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPortals;
