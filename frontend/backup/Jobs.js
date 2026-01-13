import  { useState, useEffect } from 'react';
import { jobsAPI } from '../services/api';
import JobManager from '../utils/jobManager';
import { Job } from '../types';
import './Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetchJobs();
    setSavedJobs(JobManager.getSavedJobs());
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobsAPI.getJobs({ search, location, limit: 20 });
      setJobs(response.data.jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    fetchJobs();
  };

  const handleSaveJob = (job: Job) => {
    const result = JobManager.saveJob(job);
    if (result.success) {
      alert(result.message);
      setSavedJobs(JobManager.getSavedJobs());
    } else {
      alert(result.message);
    }
  };

  const handleApply = (job: Job) => {
    window.open(job.url, '_blank');
    alert(`Redirecting to ${job.company} application page...`);
  };

  return (
    <div className="jobs-container">
      <div className="jobs-header">
        <h1>Find Jobs</h1>
        <p className="subtitle">Browse and apply for your next opportunity</p>
        
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-inputs">
            <input
              type="text"
              placeholder="Job title, keywords, or company"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="location-input"
            />
            <button type="submit" className="search-btn">
              Search Jobs
            </button>
          </div>
        </form>
      </div>
      
      <div className="jobs-content">
        <div className="sidebar">
          <div className="job-stats">
            <h3>Job Market Insights</h3>
            <div className="stat-item">
              <span className="stat-number">1,234</span>
              <span className="stat-label">Jobs Available</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">567</span>
              <span className="stat-label">Remote Positions</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">89</span>
              <span className="stat-label">Companies Hiring</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24</span>
              <span className="stat-label">New Today</span>
            </div>
          </div>
          
          <div className="portal-filter">
            <h3>Filter by Portal</h3>
            {['linkedin', 'indeed', 'glassdoor', 'github', 'monster'].map(portal => (
              <label key={portal} className="filter-option">
                <input type="checkbox" />
                <span className="checkmark"></span>
                <span className="portal-name">{portal.charAt(0).toUpperCase() + portal.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="jobs-list">
          {loading ? (
            <div className="loading">Loading jobs...</div>
          ) : jobs.length === 0 ? (
            <div className="no-jobs">No jobs found. Try a different search.</div>
          ) : (
            jobs.map(job => {
              const isSaved = savedJobs.some(saved => saved.id === job.id);
              return (
                <div key={job.id} className="job-card">
                  <div className="job-header">
                    <div className="job-title-section">
                      <h3>{job.title}</h3>
                      <div className="job-meta">
                        <span className="company">{job.company}</span>
                        <span className="location">{job.location}</span>
                        <span className={`portal ${job.portal}`}>
                          {job.portal}
                        </span>
                      </div>
                    </div>
                    <div className="job-actions">
                      <button
                        className={`save-btn ${isSaved ? 'saved' : ''}`}
                        onClick={() => handleSaveJob(job)}
                      >
                        {isSaved ? '💾 Saved' : '💾 Save'}
                      </button>
                      <button
                        className="apply-btn"
                        onClick={() => handleApply(job)}
                      >
                        Apply Now →
                      </button>
                    </div>
                  </div>
                  <div className="job-description">
                    <p>{job.description}</p>
                  </div>
                  <div className="job-footer">
                    <div className="job-details">
                      <span className="job-type">{job.type}</span>
                      {job.salary && (
                        <span className="salary">
                          💰 ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
                        </span>
                      )}
                      <span className="posted-date">
                        📅 Posted {new Date(job.postedDate).toLocaleDateString()}
                      </span>
                    </div>
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-original"
                    >
                      View Original Posting →
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
