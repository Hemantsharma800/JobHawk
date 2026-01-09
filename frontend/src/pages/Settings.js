import React, { useState } from 'react';
import './styles/Settings.css';

function Settings() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      jobAlerts: true,
      applicationUpdates: true,
      weeklyDigest: false
    },
    privacy: {
      profileVisible: true,
      searchable: true,
      showEmail: false,
      showPhone: false
    },
    preferences: {
      theme: 'light',
      language: 'en',
      timezone: 'America/New_York',
      dateFormat: 'MM/DD/YYYY'
    }
  });

  const toggleNotification = (key) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key]
      }
    });
  };

  const togglePrivacy = (key) => {
    setSettings({
      ...settings,
      privacy: {
        ...settings.privacy,
        [key]: !settings.privacy[key]
      }
    });
  };

  const updatePreference = (key, value) => {
    setSettings({
      ...settings,
      preferences: {
        ...settings.preferences,
        [key]: value
      }
    });
  };

  const handleSave = () => {
    // In real app, save to backend
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    // Reset to defaults
    setSettings({
      notifications: {
        email: true,
        push: true,
        jobAlerts: true,
        applicationUpdates: true,
        weeklyDigest: false
      },
      privacy: {
        profileVisible: true,
        searchable: true,
        showEmail: false,
        showPhone: false
      },
      preferences: {
        theme: 'light',
        language: 'en',
        timezone: 'America/New_York',
        dateFormat: 'MM/DD/YYYY'
      }
    });
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <div className="header-actions">
          <button className="btn-save" onClick={handleSave}>Save Changes</button>
          <button className="btn-reset" onClick={handleReset}>Reset to Defaults</button>
        </div>
      </div>

      <div className="settings-grid">
        <div className="settings-section">
          <h3>🔔 Notifications</h3>
          <div className="settings-options">
            <div className="option">
              <div className="option-info">
                <h4>Email Notifications</h4>
                <p>Receive updates via email</p>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={settings.notifications.email}
                  onChange={() => toggleNotification('email')}
                />
                <span className="slider"></span>
              </label>
            </div>
            
            <div className="option">
              <div className="option-info">
                <h4>Push Notifications</h4>
                <p>Browser push notifications</p>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={settings.notifications.push}
                  onChange={() => toggleNotification('push')}
                />
                <span className="slider"></span>
              </label>
            </div>
            
            <div className="option">
              <div className="option-info">
                <h4>Job Alerts</h4>
                <p>New job matching your criteria</p>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={settings.notifications.jobAlerts}
                  onChange={() => toggleNotification('jobAlerts')}
                />
                <span className="slider"></span>
              </label>
            </div>
            
            <div className="option">
              <div className="option-info">
                <h4>Application Updates</h4>
                <p>Status changes on applications</p>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={settings.notifications.applicationUpdates}
                  onChange={() => toggleNotification('applicationUpdates')}
                />
                <span className="slider"></span>
              </label>
            </div>
            
            <div className="option">
              <div className="option-info">
                <h4>Weekly Digest</h4>
                <p>Weekly summary email</p>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={settings.notifications.weeklyDigest}
                  onChange={() => toggleNotification('weeklyDigest')}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>🔒 Privacy & Security</h3>
          <div className="settings-options">
            <div className="option">
              <div className="option-info">
                <h4>Profile Visibility</h4>
                <p>Make your profile visible to employers</p>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={settings.privacy.profileVisible}
                  onChange={() => togglePrivacy('profileVisible')}
                />
                <span className="slider"></span>
              </label>
            </div>
            
            <div className="option">
              <div className="option-info">
                <h4>Searchable</h4>
                <p>Allow search engines to index your profile</p>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={settings.privacy.searchable}
                  onChange={() => togglePrivacy('searchable')}
                />
                <span className="slider"></span>
              </label>
            </div>
            
            <div className="option">
              <div className="option-info">
                <h4>Show Email</h4>
                <p>Display email on public profile</p>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={settings.privacy.showEmail}
                  onChange={() => togglePrivacy('showEmail')}
                />
                <span className="slider"></span>
              </label>
            </div>
            
            <div className="option">
              <div className="option-info">
                <h4>Show Phone</h4>
                <p>Display phone number on profile</p>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={settings.privacy.showPhone}
                  onChange={() => togglePrivacy('showPhone')}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>⚙️ Preferences</h3>
          <div className="preferences-grid">
            <div className="preference">
              <label>Theme</label>
              <select 
                value={settings.preferences.theme}
                onChange={(e) => updatePreference('theme', e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto (System)</option>
              </select>
            </div>
            
            <div className="preference">
              <label>Language</label>
              <select 
                value={settings.preferences.language}
                onChange={(e) => updatePreference('language', e.target.value)}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
            
            <div className="preference">
              <label>Timezone</label>
              <select 
                value={settings.preferences.timezone}
                onChange={(e) => updatePreference('timezone', e.target.value)}
              >
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
                <option value="Europe/London">London</option>
              </select>
            </div>
            
            <div className="preference">
              <label>Date Format</label>
              <select 
                value={settings.preferences.dateFormat}
                onChange={(e) => updatePreference('dateFormat', e.target.value)}
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>📧 Email Preferences</h3>
          <div className="email-preferences">
            <div className="email-option">
              <h4>Email Frequency</h4>
              <div className="radio-group">
                <label>
                  <input 
                    type="radio" 
                    name="frequency" 
                    value="daily" 
                    defaultChecked
                  />
                  Daily Digest
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="frequency" 
                    value="weekly" 
                  />
                  Weekly Digest
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="frequency" 
                    value="monthly" 
                  />
                  Monthly Summary
                </label>
              </div>
            </div>
            
            <div className="email-option">
              <h4>Email Content</h4>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" defaultChecked />
                  Job Recommendations
                </label>
                <label>
                  <input type="checkbox" defaultChecked />
                  Application Updates
                </label>
                <label>
                  <input type="checkbox" />
                  Marketing Emails
                </label>
                <label>
                  <input type="checkbox" defaultChecked />
                  Platform Updates
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
