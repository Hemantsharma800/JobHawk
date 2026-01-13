import React, { useState, useEffect } from 'react';
import { FiBell, FiCheck, FiX, FiExternalLink, FiFilter } from 'react-icons/fi';
import { mockUserAPI } from '../utils/mockAPI';
import './Notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const data = await mockUserAPI.getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'application':
        return '📋';
      case 'message':
        return '💬';
      case 'job':
        return '💼';
      case 'connection':
        return '🤝';
      default:
        return '🔔';
    }
  };

  const getNotificationAction = (type) => {
    switch (type) {
      case 'application':
        return 'View Application';
      case 'message':
        return 'Reply';
      case 'job':
        return 'View Job';
      case 'connection':
        return 'View Profile';
      default:
        return 'View';
    }
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(notif => notif.type === filter);

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="notifications-container">
        <div className="loading">Loading notifications...</div>
      </div>
    );
  }

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <div className="header-left">
          <h1>
            <FiBell /> Notifications
            {unreadCount > 0 && <span className="unread-count">{unreadCount}</span>}
          </h1>
          <p>Stay updated with your job search activity</p>
        </div>
        <div className="header-actions">
          <button className="mark-all-read" onClick={markAllAsRead}>
            <FiCheck /> Mark all as read
          </button>
          <button className="clear-all" onClick={clearAll}>
            <FiX /> Clear all
          </button>
        </div>
      </div>

      <div className="notifications-filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({notifications.length})
        </button>
        <button 
          className={`filter-btn ${filter === 'application' ? 'active' : ''}`}
          onClick={() => setFilter('application')}
        >
          Applications
        </button>
        <button 
          className={`filter-btn ${filter === 'message' ? 'active' : ''}`}
          onClick={() => setFilter('message')}
        >
          Messages
        </button>
        <button 
          className={`filter-btn ${filter === 'job' ? 'active' : ''}`}
          onClick={() => setFilter('job')}
        >
          Jobs
        </button>
        <button 
          className={`filter-btn ${filter === 'connection' ? 'active' : ''}`}
          onClick={() => setFilter('connection')}
        >
          Network
        </button>
      </div>

      <div className="notifications-list">
        {filteredNotifications.length === 0 ? (
          <div className="no-notifications">
            <FiBell size={48} />
            <h3>No notifications</h3>
            <p>You're all caught up!</p>
          </div>
        ) : (
          filteredNotifications.map(notification => (
            <div 
              key={notification.id} 
              className={`notification-item ${notification.read ? 'read' : 'unread'}`}
            >
              <div className="notification-icon">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="notification-content">
                <p className="notification-message">{notification.message}</p>
                <span className="notification-time">{notification.time}</span>
              </div>
              <div className="notification-actions">
                {!notification.read && (
                  <button 
                    className="mark-read-btn"
                    onClick={() => markAsRead(notification.id)}
                    title="Mark as read"
                  >
                    <FiCheck />
                  </button>
                )}
                <button 
                  className="action-btn"
                  onClick={() => window.location.href = '/jobs'}
                >
                  {getNotificationAction(notification.type)}
                  <FiExternalLink />
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => deleteNotification(notification.id)}
                  title="Delete"
                >
                  <FiX />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="notifications-stats">
        <div className="stat">
          <h3>{unreadCount}</h3>
          <p>Unread</p>
        </div>
        <div className="stat">
          <h3>{notifications.length}</h3>
          <p>Total</p>
        </div>
        <div className="stat">
          <h3>{notifications.filter(n => n.type === 'application').length}</h3>
          <p>Applications</p>
        </div>
        <div className="stat">
          <h3>{notifications.filter(n => n.type === 'job').length}</h3>
          <p>Job Alerts</p>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
