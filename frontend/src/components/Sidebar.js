import React from 'react';
import {
    FaHome,
    FaBriefcase,
    FaServer,
    FaChartBar,
    FaUser,
    FaCog,
    FaQuestionCircle,
    FaSignOutAlt
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ activeTab, onTabChange, collapsed = false, onToggleCollapse }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <FaHome /> },
        { id: 'jobs', label: 'Jobs', icon: <FaBriefcase /> },
        { id: 'portals', label: 'Portals', icon: <FaServer /> },
        { id: 'analytics', label: 'Analytics', icon: <FaChartBar /> },
        { id: 'profile', label: 'Profile', icon: <FaUser /> },
        { id: 'settings', label: 'Settings', icon: <FaCog /> },
        { id: 'help', label: 'Help', icon: <FaQuestionCircle /> },
    ];

    return (
        <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                {!collapsed && <h2>JobPortal</h2>}
                <button
                    className="sidebar-toggle"
                    onClick={onToggleCollapse}
                    aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {collapsed ? '→' : '←'}
                </button>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map(item => (
                    <button
                        key={item.id}
                        className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                        onClick={() => onTabChange(item.id)}
                        aria-label={item.label}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        {!collapsed && <span className="nav-label">{item.label}</span>}
                    </button>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button className="nav-item logout">
                    <span className="nav-icon"><FaSignOutAlt /></span>
                    {!collapsed && <span className="nav-label">Logout</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;