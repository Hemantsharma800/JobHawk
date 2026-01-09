import React from 'react';
import { FaBriefcase, FaBell, FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';
import './Header.css';

const Header = ({ user, onLogout, onNotificationsClick }) => {
    return (
        <header className="header">
            <div className="header-left">
                <div className="logo">
                    <FaBriefcase className="logo-icon" />
                    <h1>JobPortal</h1>
                </div>
                <nav className="nav">
                    <a href="/dashboard" className="nav-link active">Dashboard</a>
                    <a href="/jobs" className="nav-link">Jobs</a>
                    <a href="/portals" className="nav-link">Portals</a>
                    <a href="/analytics" className="nav-link">Analytics</a>
                </nav>
            </div>

            <div className="header-right">
                <div className="search-box">
                    <input type="text" placeholder="Search jobs..." />
                </div>

                <div className="header-actions">
                    <button
                        className="icon-btn notification-btn"
                        onClick={onNotificationsClick}
                        aria-label="Notifications"
                    >
                        <FaBell />
                        <span className="notification-count">3</span>
                    </button>

                    <button className="icon-btn" aria-label="Settings">
                        <FaCog />
                    </button>

                    <div className="user-dropdown">
                        <div className="user-avatar">
                            {user?.avatar ? (
                                <img src={user.avatar} alt={user.name} />
                            ) : (
                                <FaUser />
                            )}
                        </div>
                        <span className="user-name">{user?.name || 'User'}</span>
                        <div className="dropdown-menu">
                            <a href="/profile" className="dropdown-item">
                                <FaUser /> Profile
                            </a>
                            <a href="/settings" className="dropdown-item">
                                <FaCog /> Settings
                            </a>
                            <button onClick={onLogout} className="dropdown-item logout">
                                <FaSignOutAlt /> Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;