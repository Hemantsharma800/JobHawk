import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FiHome, 
  FiBriefcase, 
  FiUser, 
  FiSettings,
  FiBell,
  FiMessageSquare,
  FiBarChart2,
  FiFileText,
  FiCalendar,
  FiStar,
  FiUsers,
  FiLogOut,
  FiSearch,
  FiGrid,
  FiPlusCircle,
  FiGlobe,
  FiExternalLink,
  FiLink,
  FiCheckCircle,
  FiXCircle,
  FiTrendingUp,
  FiBookmark,
  FiTarget,
  FiCpu
} from 'react-icons/fi';
import { MdDashboard, MdWork, MdPeople, MdBusiness } from 'react-icons/md';
import { useUser } from '../context/UserContext';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, unreadNotifications, unreadMessages, jobPortals, updatePortalStatus } = useUser();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showPortals, setShowPortals] = useState(false);
  const userMenuRef = useRef();
  const quickActionsRef = useRef();
  const portalsRef = useRef();

  const mainNavLinks = [
    { path: '/', label: 'Home', icon: <FiHome />, exact: true },
    { path: '/jobs', label: 'Jobs', icon: <FiBriefcase /> },
    { path: '/network', label: 'Network', icon: <MdPeople /> },
    { path: '/messages', label: 'Messages', icon: <FiMessageSquare /> },
    { path: '/notifications', label: 'Notifications', icon: <FiBell /> }
  ];

  const quickActions = [
    { 
      label: 'Post Job', 
      icon: <FiPlusCircle />, 
      color: '#667eea',
      onClick: () => navigate('/post-job')
    },
    { 
      label: 'Update Resume', 
      icon: <FiFileText />, 
      color: '#f093fb',
      onClick: () => navigate('/resume')
    },
    { 
      label: 'Schedule Interview', 
      icon: <FiCalendar />, 
      color: '#4facfe',
      onClick: () => navigate('/interviews/schedule')
    },
    { 
      label: 'Share Profile', 
      icon: <FiGlobe />, 
      color: '#43e97b',
      onClick: () => {
        if (navigator.share) {
          navigator.share({
            title: `${user.name}'s Profile`,
            text: `Check out ${user.name}'s professional profile`,
            url: window.location.origin + '/profile'
          });
        } else {
          navigator.clipboard.writeText(window.location.origin + '/profile');
          alert('Profile link copied to clipboard!');
        }
      }
    },
    { 
      label: 'Request Referral', 
      icon: <FiUsers />, 
      color: '#ffd166',
      onClick: () => navigate('/network/referrals')
    },
    { 
      label: 'Skill Assessment', 
      icon: <FiCpu />, 
      color: '#ff6b6b',
      onClick: () => navigate('/skills/assessment')
    }
  ];

  const userMenuItems = [
    { label: 'Profile', path: '/profile', icon: <FiUser /> },
    { label: 'Dashboard', path: '/dashboard', icon: <MdDashboard /> },
    { label: 'Applications', path: '/applications', icon: <FiFileText /> },
    { label: 'Saved Jobs', path: '/saved-jobs', icon: <FiStar /> },
    { label: 'Companies', path: '/companies', icon: <MdBusiness /> },
    { label: 'Analytics', path: '/analytics', icon: <FiTrendingUp /> },
    { label: 'Settings', path: '/settings', icon: <FiSettings /> },
    { 
      label: 'Logout', 
      path: '#', 
      icon: <FiLogOut />, 
      danger: true,
      onClick: () => {
        localStorage.clear();
        navigate('/login');
      }
    }
  ];

  const portalIcons = {
    'LinkedIn': <FiGlobe />,
    'Indeed': <FiBriefcase />,
    'Glassdoor': <FiStar />,
    'AngelList': <FiTarget />,
    'Monster': <FiBriefcase />
  };

  const portalUrls = {
    'LinkedIn': 'https://linkedin.com',
    'Indeed': 'https://indeed.com',
    'Glassdoor': 'https://glassdoor.com',
    'AngelList': 'https://angel.co',
    'Monster': 'https://monster.com'
  };

  const handlePortalToggle = (portalId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    updatePortalStatus(portalId, newStatus);
  };

  const handlePortalConnect = (portalName) => {
    const url = portalUrls[portalName];
    if (url) {
      window.open(url, '_blank');
    }
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (quickActionsRef.current && !quickActionsRef.current.contains(event.target)) {
        setShowQuickActions(false);
      }
      if (portalsRef.current && !portalsRef.current.contains(event.target)) {
        setShowPortals(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-brand">
          <Link to="/" className="logo-link">
            <div className="logo-wrapper">
              <span className="logo-icon">🚀</span>
              <span className="logo-text">CareerConnect</span>
            </div>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="nav-search">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search jobs, companies, or people..." 
            className="search-input"
            onFocus={() => navigate('/search')}
          />
        </div>

        {/* Main Navigation */}
        <div className="nav-main">
          {mainNavLinks.map((link) => {
            const isActive = link.exact 
              ? location.pathname === link.path
              : location.pathname.startsWith(link.path);
            
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive ? 'active' : ''}`}
                onClick={() => {
                  if (link.label === 'Notifications' && unreadNotifications > 0) {
                    // Mark all notifications as read
                  }
                  if (link.label === 'Messages' && unreadMessages > 0) {
                    // Mark messages as read
                  }
                }}
              >
                <div className="nav-icon-wrapper">
                  {link.icon}
                  {link.label === 'Notifications' && unreadNotifications > 0 && (
                    <span className="nav-badge">{unreadNotifications}</span>
                  )}
                  {link.label === 'Messages' && unreadMessages > 0 && (
                    <span className="nav-badge">{unreadMessages}</span>
                  )}
                </div>
                <span className="nav-label">{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right Section */}
        <div className="nav-right">
          {/* Job Portals Button */}
          <div 
            className="portals-wrapper"
            ref={portalsRef}
            onMouseEnter={() => setShowPortals(true)}
            onMouseLeave={() => setShowPortals(false)}
          >
            <button className="portals-btn">
              <FiLink />
              <span>Portals</span>
            </button>
            
            {showPortals && (
              <div className="portals-popup">
                <div className="popup-header">
                  <h4>Job Portals</h4>
                  <p>Manage your job board connections</p>
                </div>
                
                <div className="portals-list">
                  {jobPortals.map((portal) => (
                    <div key={portal.id} className={`portal-item ${portal.status}`}>
                      <div className="portal-icon">
                        {portalIcons[portal.name] || <FiExternalLink />}
                      </div>
                      <div className="portal-info">
                        <h5>{portal.name}</h5>
                        <div className="portal-stats">
                          <span className="jobs-count">{portal.jobs} jobs</span>
                          <span className="sync-time">Synced {portal.lastSync}</span>
                        </div>
                      </div>
                      <div className="portal-actions">
                        <button 
                          className={`status-toggle ${portal.status}`}
                          onClick={() => handlePortalToggle(portal.id, portal.status)}
                        >
                          {portal.status === 'active' ? <FiCheckCircle /> : <FiXCircle />}
                          <span>{portal.status === 'active' ? 'Active' : 'Inactive'}</span>
                        </button>
                        <button 
                          className="connect-btn"
                          onClick={() => handlePortalConnect(portal.name)}
                        >
                          <FiExternalLink />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="popup-footer">
                  <button 
                    className="sync-all-btn"
                    onClick={() => {
                      // Sync all active portals
                      jobPortals
                        .filter(p => p.status === 'active')
                        .forEach(p => handlePortalConnect(p.name));
                    }}
                  >
                    <FiLink /> Sync All Active
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions Button */}
          <div 
            className="quick-actions-wrapper"
            ref={quickActionsRef}
            onMouseEnter={() => setShowQuickActions(true)}
            onMouseLeave={() => setShowQuickActions(false)}
          >
            <button className="quick-actions-btn">
              <FiGrid />
              <span>Quick Actions</span>
            </button>
            
            {showQuickActions && (
              <div className="quick-actions-popup">
                <div className="popup-header">
                  <h4>Quick Actions</h4>
                  <p>Perform common tasks quickly</p>
                </div>
                <div className="actions-grid">
                  {quickActions.map((action, index) => (
                    <button 
                      key={index} 
                      className="action-btn" 
                      style={{ '--action-color': action.color }}
                      onClick={action.onClick}
                    >
                      <div className="action-icon" style={{ backgroundColor: action.color }}>
                        {action.icon}
                      </div>
                      <span>{action.label}</span>
                    </button>
                  ))}
                </div>
                <div className="popup-footer">
                  <Link to="/all-actions" onClick={() => setShowQuickActions(false)}>
                    View All Actions →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div 
            className="user-menu-wrapper"
            ref={userMenuRef}
            onMouseEnter={() => setShowUserMenu(true)}
            onMouseLeave={() => setShowUserMenu(false)}
          >
            <button 
              className="user-profile-btn"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              {user.profilePic ? (
                <img src={user.profilePic} alt={user.name} className="profile-pic" />
              ) : (
                <div className="profile-initials">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
              <span className="user-name">{user.name.split(' ')[0]}</span>
            </button>

            {showUserMenu && (
              <div className="user-menu-popup">
                {/* User Info Section */}
                <div className="user-info-section">
                  {user.profilePic ? (
                    <img src={user.profilePic} alt={user.name} className="popup-profile-pic" />
                  ) : (
                    <div className="popup-profile-initials">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                  <div className="user-details">
                    <h4>{user.name}</h4>
                    <p>{user.headline}</p>
                    <div className="user-stats">
                      <span>{user.connections} connections</span>
                      <span>•</span>
                      <span>{user.followers} followers</span>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="menu-items">
                  {userMenuItems.map((item) => (
                    item.onClick ? (
                      <button
                        key={item.label}
                        className={`menu-item ${item.danger ? 'danger' : ''}`}
                        onClick={item.onClick}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    ) : (
                      <Link
                        key={item.label}
                        to={item.path}
                        className={`menu-item ${item.danger ? 'danger' : ''}`}
                        onClick={() => setShowUserMenu(false)}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    )
                  ))}
                </div>

                {/* Profile Completion */}
                <div className="profile-completion">
                  <div className="completion-header">
                    <span>Profile Strength</span>
                    <span>{user.profileCompletion}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${user.profileCompletion}%` }}
                    />
                  </div>
                  <Link 
                    to="/profile/completion" 
                    className="complete-profile"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Complete your profile →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
