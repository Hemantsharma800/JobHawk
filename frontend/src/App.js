import React from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import Portals from './pages/Portals';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Help from './pages/Help';
import './App.css';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  return children;
};

function AppContent() {
  const { user, logout } = useAuth();
  
  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <nav className="sidebar">
        <div className="logo">
          <h2>JobPortal</h2>
        </div>
        <ul className="nav-menu">
          <li><Link to="/"><span>📊</span> Dashboard</Link></li>
          <li><Link to="/jobs"><span>💼</span> Jobs</Link></li>
          <li><Link to="/portals"><span>🌐</span> Portals</Link></li>
          <li><Link to="/analytics"><span>📈</span> Analytics</Link></li>
          <li><Link to="/profile"><span>👤</span> Profile</Link></li>
          <li><Link to="/settings"><span>⚙️</span> Settings</Link></li>
          <li><Link to="/help"><span>❓</span> Help</Link></li>
        </ul>
        
        {user && (
          <div className="user-profile-sidebar">
            <div className="sidebar-user-info">
              <div className="sidebar-avatar">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="sidebar-user-details">
                <h4>{user.name || 'User'}</h4>
                <p>{user.email || ''}</p>
              </div>
            </div>
            <button className="sidebar-logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <div className="search-bar">
            <input type="text" placeholder="Search jobs..." />
            <button>Search</button>
          </div>
          <div className="user-info">
            {user ? (
              <div className="user-profile">
                <span>Welcome, {user.name || 'User'}!</span>
                <button className="logout-btn" onClick={logout}>
                  Logout
                </button>
              </div>
            ) : (
              <button className="login-btn">
                Sign in with Google
              </button>
            )}
          </div>
        </header>

        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/portals" element={<Portals />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
