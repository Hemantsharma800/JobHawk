import React from 'react';
import './styles/Portals.css';

function Portals() {
  return (
    <div className="portals">
      <h1>Job Portals</h1>
      <p className="subtitle">Connect with various job platforms</p>
      <div className="portals-grid">
        <div className="portal-card">
          <h3>LinkedIn</h3>
          <p>Professional networking</p>
          <button className="connect-btn">Connect</button>
        </div>
        <div className="portal-card">
          <h3>Indeed</h3>
          <p>Job search engine</p>
          <button className="connect-btn">Connect</button>
        </div>
        <div className="portal-card">
          <h3>Glassdoor</h3>
          <p>Company reviews</p>
          <button className="connect-btn">Connect</button>
        </div>
      </div>
    </div>
  );
}

export default Portals;
