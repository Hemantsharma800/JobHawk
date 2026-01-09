import React from 'react';
import './styles/dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Welcome back! Here's your job search overview.</p>
      <div className="stats">
        <div className="stat">
          <h3>24</h3>
          <p>Total Jobs</p>
        </div>
        <div className="stat">
          <h3>12</h3>
          <p>Applied</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
