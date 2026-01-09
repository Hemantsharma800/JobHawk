import React, { useState } from 'react';
import './styles/Profile.css';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    title: 'Senior Frontend Developer',
    bio: 'Passionate React developer with 5+ years of experience building scalable web applications. Currently seeking new opportunities in product-driven companies.',
    skills: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'GraphQL', 'AWS', 'CI/CD'],
    experience: [
      { company: 'TechCorp Inc.', role: 'Senior React Developer', duration: '2020 - Present' },
      { company: 'StartUpXYZ', role: 'Frontend Engineer', duration: '2018 - 2020' },
      { company: 'WebDev Agency', role: 'JavaScript Developer', duration: '2016 - 2018' }
    ]
  });

  const handleSave = () => {
    setIsEditing(false);
    // In real app, save to backend here
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Profile Settings</h1>
        <div className="header-actions">
          {isEditing ? (
            <>
              <button className="btn-save" onClick={handleSave}>Save Changes</button>
              <button className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          ) : (
            <button className="btn-edit" onClick={() => setIsEditing(true)}>Edit Profile</button>
          )}
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="avatar-section">
            <div className="avatar">
              <span className="avatar-text">JD</span>
            </div>
            <div className="avatar-info">
              <h3>{profile.name}</h3>
              <p>{profile.title}</p>
              <p className="location">📍 {profile.location}</p>
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat">
              <h4>Job Applications</h4>
              <p className="stat-value">24</p>
            </div>
            <div className="stat">
              <h4>Interviews</h4>
              <p className="stat-value">6</p>
            </div>
            <div className="stat">
              <h4>Offers</h4>
              <p className="stat-value">2</p>
            </div>
          </div>

          <div className="quick-links">
            <h4>Quick Links</h4>
            <button className="link-btn">📄 Resume</button>
            <button className="link-btn">🔗 LinkedIn</button>
            <button className="link-btn">💼 Portfolio</button>
            <button className="link-btn">📧 Email Templates</button>
          </div>
        </div>

        <div className="profile-main">
          <div className="profile-section">
            <h3>Personal Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Full Name</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={profile.name} 
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                ) : (
                  <p>{profile.name}</p>
                )}
              </div>
              <div className="info-item">
                <label>Email</label>
                {isEditing ? (
                  <input 
                    type="email" 
                    value={profile.email} 
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                ) : (
                  <p>{profile.email}</p>
                )}
              </div>
              <div className="info-item">
                <label>Phone</label>
                {isEditing ? (
                  <input 
                    type="tel" 
                    value={profile.phone} 
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  />
                ) : (
                  <p>{profile.phone}</p>
                )}
              </div>
              <div className="info-item">
                <label>Location</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={profile.location} 
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                  />
                ) : (
                  <p>{profile.location}</p>
                )}
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h3>Professional Bio</h3>
            {isEditing ? (
              <textarea 
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                rows="4"
              />
            ) : (
              <p className="bio-text">{profile.bio}</p>
            )}
          </div>

          <div className="profile-section">
            <h3>Skills & Expertise</h3>
            <div className="skills-list">
              {profile.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
              {isEditing && (
                <button className="add-skill-btn">+ Add Skill</button>
              )}
            </div>
          </div>

          <div className="profile-section">
            <h3>Work Experience</h3>
            <div className="experience-list">
              {profile.experience.map((exp, index) => (
                <div key={index} className="experience-item">
                  <div className="exp-header">
                    <h4>{exp.role}</h4>
                    <span className="exp-duration">{exp.duration}</span>
                  </div>
                  <p className="exp-company">{exp.company}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
