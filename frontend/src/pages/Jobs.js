import React from 'react';
import './styles/Jobs.css';

function Jobs() {
  const jobs = [
    { id: 1, title: 'Senior React Developer', company: 'TechCorp Inc.', location: 'Remote', salary: '$120k-$150k', status: 'active' },
    { id: 2, title: 'Full Stack Engineer', company: 'StartUpXYZ', location: 'NYC', salary: '$100k-$130k', status: 'applied' },
    { id: 3, title: 'Frontend Developer', company: 'DesignCo', location: 'Remote', salary: '$90k-$110k', status: 'interview' },
    { id: 4, title: 'React Native Developer', company: 'MobileFirst', location: 'SF', salary: '$130k-$160k', status: 'active' },
    { id: 5, title: 'UI/UX Engineer', company: 'CreativeLabs', location: 'Remote', salary: '$95k-$115k', status: 'applied' },
  ];

  return (
    <div className="jobs-page">
      <div className="page-header">
        <h1>Job Listings</h1>
        <div className="header-actions">
          <button className="add-job-btn">+ Add New Job</button>
          <button className="filter-btn">Filter</button>
        </div>
      </div>
      
      <div className="jobs-filters">
        <div className="filter-tabs">
          <button className="filter-tab active">All Jobs</button>
          <button className="filter-tab">Applied</button>
          <button className="filter-tab">Interviews</button>
          <button className="filter-tab">Saved</button>
        </div>
        
        <div className="search-filter">
          <input type="text" placeholder="Search jobs by title, company..." />
          <select>
            <option>All Locations</option>
            <option>Remote</option>
            <option>On-site</option>
            <option>Hybrid</option>
          </select>
        </div>
      </div>
      
      <div className="jobs-list">
        {jobs.map(job => (
          <div key={job.id} className="job-listing">
            <div className="job-info">
              <div className="job-title-section">
                <h3>{job.title}</h3>
                <span className={`job-status ${job.status}`}>
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </span>
              </div>
              <div className="job-details">
                <span className="company">{job.company}</span>
                <span className="location">📍 {job.location}</span>
                <span className="salary">💰 {job.salary}</span>
              </div>
            </div>
            <div className="job-actions">
              <button className="view-btn">View</button>
              <button className="apply-btn">Apply</button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="jobs-stats">
        <div className="stat">
          <h4>Total Tracked</h4>
          <p>24 Jobs</p>
        </div>
        <div className="stat">
          <h4>Applications</h4>
          <p>12 Submitted</p>
        </div>
        <div className="stat">
          <h4>Response Rate</h4>
          <p>42%</p>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
