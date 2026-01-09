import React, { useState, useEffect } from 'react';
import './styles/Portals.css';

function Portals() {
  const [portals, setPortals] = useState([
    { 
      id: 1, 
      name: 'LinkedIn', 
      icon: '🔗', 
      description: 'Professional networking and job platform',
      connected: false,
      apiKey: '',
      stats: { jobs: 0, applications: 0, lastSync: 'Never' },
      color: '#0A66C2'
    },
    { 
      id: 2, 
      name: 'Indeed', 
      icon: '💼', 
      description: 'Global job search engine',
      connected: true,
      apiKey: '*******',
      stats: { jobs: 245, applications: 12, lastSync: '2 hours ago' },
      color: '#2164F3'
    },
    { 
      id: 3, 
      name: 'Glassdoor', 
      icon: '🏢', 
      description: 'Company reviews and salaries',
      connected: false,
      apiKey: '',
      stats: { jobs: 0, applications: 0, lastSync: 'Never' },
      color: '#0CAA41'
    },
    { 
      id: 4, 
      name: 'AngelList', 
      icon: '👼', 
      description: 'Startup jobs and funding',
      connected: true,
      apiKey: '*******',
      stats: { jobs: 89, applications: 8, lastSync: '1 day ago' },
      color: '#000000'
    },
    { 
      id: 5, 
      name: 'Google Jobs', 
      icon: '🔍', 
      description: 'Google\'s job search aggregator',
      connected: false,
      apiKey: '',
      stats: { jobs: 0, applications: 0, lastSync: 'Never' },
      color: '#4285F4'
    },
    { 
      id: 6, 
      name: 'GitHub Jobs', 
      icon: '💻', 
      description: 'Tech jobs for developers',
      connected: true,
      apiKey: '*******',
      stats: { jobs: 156, applications: 15, lastSync: '5 hours ago' },
      color: '#24292E'
    }
  ]);

  const [selectedPortal, setSelectedPortal] = useState(null);
  const [showApiModal, setShowApiModal] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState({});

  const handleConnect = (portal) => {
    setSelectedPortal(portal);
    setShowApiModal(true);
    if (portal.connected) {
      setApiKey(portal.apiKey);
    } else {
      setApiKey('');
    }
  };

  const handleDisconnect = (portalId) => {
    setPortals(portals.map(portal => 
      portal.id === portalId 
        ? { ...portal, connected: false, apiKey: '', stats: { jobs: 0, applications: 0, lastSync: 'Never' } }
        : portal
    ));
  };

  const handleSaveApiKey = () => {
    if (selectedPortal && apiKey.trim()) {
      setPortals(portals.map(portal => 
        portal.id === selectedPortal.id 
          ? { 
              ...portal, 
              connected: true, 
              apiKey: '*******',
              stats: { ...portal.stats, lastSync: 'Just now' }
            }
          : portal
      ));
      setShowApiModal(false);
      setApiKey('');
      setSelectedPortal(null);
    }
  };

  const handleSync = async (portalId) => {
    setIsLoading(true);
    setSyncStatus(prev => ({ ...prev, [portalId]: 'syncing' }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setPortals(portals.map(portal => {
      if (portal.id === portalId) {
        const newJobs = portal.stats.jobs + Math.floor(Math.random() * 50) + 10;
        const newApplications = portal.stats.applications + Math.floor(Math.random() * 5) + 1;
        return {
          ...portal,
          stats: {
            jobs: newJobs,
            applications: newApplications,
            lastSync: 'Just now'
          }
        };
      }
      return portal;
    }));
    
    setSyncStatus(prev => ({ ...prev, [portalId]: 'success' }));
    setIsLoading(false);
    
    // Reset status after 2 seconds
    setTimeout(() => {
      setSyncStatus(prev => ({ ...prev, [portalId]: '' }));
    }, 2000);
  };

  const syncAll = async () => {
    setIsLoading(true);
    const connectedPortals = portals.filter(p => p.connected);
    
    for (const portal of connectedPortals) {
      await handleSync(portal.id);
    }
    
    setIsLoading(false);
  };

  // Google Authentication integration
  const handleGoogleAuth = () => {
    // In production, this would redirect to Google OAuth
    window.open('https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email profile', '_blank');
    
    // For demo, simulate connection
    setTimeout(() => {
      const newPortals = [...portals];
      const googlePortal = newPortals.find(p => p.name === 'Google Jobs');
      if (googlePortal) {
        googlePortal.connected = true;
        googlePortal.apiKey = '*******';
        googlePortal.stats = { jobs: 320, applications: 25, lastSync: 'Just now' };
        setPortals(newPortals);
      }
    }, 1000);
  };

  const totalJobs = portals.reduce((sum, portal) => sum + portal.stats.jobs, 0);
  const totalApplications = portals.reduce((sum, portal) => sum + portal.stats.applications, 0);
  const connectedCount = portals.filter(p => p.connected).length;

  return (
    <div className="portals-page">
      <div className="portals-header">
        <div>
          <h1>Job Portals Integration</h1>
          <p className="subtitle">Connect and sync with popular job platforms</p>
        </div>
        <div className="header-actions">
          <button 
            className="sync-all-btn"
            onClick={syncAll}
            disabled={isLoading || connectedCount === 0}
          >
            {isLoading ? 'Syncing...' : '🔄 Sync All Portals'}
          </button>
          <button 
            className="google-auth-btn"
            onClick={handleGoogleAuth}
          >
            Sign in with Google
          </button>
        </div>
      </div>

      <div className="portals-stats">
        <div className="stat-card">
          <h3>{connectedCount}</h3>
          <p>Connected Portals</p>
        </div>
        <div className="stat-card">
          <h3>{totalJobs.toLocaleString()}</h3>
          <p>Total Jobs Found</p>
        </div>
        <div className="stat-card">
          <h3>{totalApplications}</h3>
          <p>Applications Made</p>
        </div>
        <div className="stat-card">
          <h3>{portals.filter(p => p.stats.lastSync !== 'Never').length}</h3>
          <p>Active Syncs</p>
        </div>
      </div>

      <div className="portals-grid">
        {portals.map(portal => (
          <div 
            key={portal.id} 
            className={`portal-card ${portal.connected ? 'connected' : ''}`}
            style={{ borderLeftColor: portal.color }}
          >
            <div className="portal-header">
              <div className="portal-icon" style={{ backgroundColor: portal.color }}>
                {portal.icon}
              </div>
              <div className="portal-info">
                <h3>{portal.name}</h3>
                <p>{portal.description}</p>
              </div>
              <div className="portal-status">
                <span className={`status-badge ${portal.connected ? 'connected' : 'disconnected'}`}>
                  {portal.connected ? '✓ Connected' : 'Disconnected'}
                </span>
              </div>
            </div>

            <div className="portal-stats">
              <div className="stat">
                <span className="stat-label">Jobs Found</span>
                <span className="stat-value">{portal.stats.jobs.toLocaleString()}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Applications</span>
                <span className="stat-value">{portal.stats.applications}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Last Sync</span>
                <span className="stat-value">{portal.stats.lastSync}</span>
              </div>
            </div>

            <div className="portal-actions">
              {portal.connected ? (
                <>
                  <button 
                    className="action-btn sync-btn"
                    onClick={() => handleSync(portal.id)}
                    disabled={isLoading || syncStatus[portal.id]}
                  >
                    {syncStatus[portal.id] === 'syncing' ? '🔄 Syncing...' : '🔄 Sync Now'}
                  </button>
                  <button 
                    className="action-btn disconnect-btn"
                    onClick={() => handleDisconnect(portal.id)}
                  >
                    Disconnect
                  </button>
                </>
              ) : (
                <button 
                  className="action-btn connect-btn"
                  onClick={() => handleConnect(portal)}
                  style={{ backgroundColor: portal.color }}
                >
                  Connect {portal.name}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* API Key Modal */}
      {showApiModal && selectedPortal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Connect {selectedPortal.name}</h3>
              <button className="close-btn" onClick={() => setShowApiModal(false)}>×</button>
            </div>
            
            <div className="modal-content">
              <p>Enter your {selectedPortal.name} API key to connect:</p>
              
              <div className="api-input-group">
                <input
                  type="password"
                  placeholder="Enter API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <a 
                  href={`https://${selectedPortal.name.toLowerCase()}.com/developers`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="api-docs-link"
                >
                  Get API Key
                </a>
              </div>
              
              <div className="api-instructions">
                <h4>How to get your API key:</h4>
                <ol>
                  <li>Go to {selectedPortal.name} Developer Portal</li>
                  <li>Create a new application</li>
                  <li>Generate API credentials</li>
                  <li>Copy and paste the API key here</li>
                </ol>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowApiModal(false)}>
                Cancel
              </button>
              <button 
                className="btn-save" 
                onClick={handleSaveApiKey}
                disabled={!apiKey.trim()}
              >
                Save & Connect
              </button>
            </div>
          </div>
        </div>
      )}

      {/* API Documentation Section */}
      <div className="api-documentation">
        <h2>API Integration Guide</h2>
        <div className="api-endpoints">
          <div className="endpoint-card">
            <h3>🔄 Sync Jobs Endpoint</h3>
            <code>POST /api/v1/portals/{'{portalId}'}/sync</code>
            <p>Sync jobs from connected portal</p>
            <div className="endpoint-details">
              <span className="method">POST</span>
              <span className="url">/api/portals/sync</span>
            </div>
          </div>
          
          <div className="endpoint-card">
            <h3>📊 Get Portal Stats</h3>
            <code>GET /api/v1/portals/{'{portalId}'}/stats</code>
            <p>Retrieve portal statistics</p>
            <div className="endpoint-details">
              <span className="method">GET</span>
              <span className="url">/api/portals/stats</span>
            </div>
          </div>
          
          <div className="endpoint-card">
            <h3>🔐 Google OAuth</h3>
            <code>GET /api/v1/auth/google</code>
            <p>Authenticate with Google</p>
            <div className="endpoint-details">
              <span className="method">GET</span>
              <span className="url">/api/auth/google</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Portals;
