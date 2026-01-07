import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('Loading...');
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Test backend connection
    axios.get('http://localhost:8000/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        setMessage('Error connecting to backend');
        console.error(error);
      });

    // Fetch jobs
    axios.get('http://localhost:8000/api/jobs/')
      .then(response => {
        setJobs(response.data.jobs || []);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>JobHawk - Job Search Assistant</h1>
      <p>Backend Status: <strong>{message}</strong></p>
      
      <div style={{ marginTop: '30px' }}>
        <h2>Quick Links:</h2>
        <ul>
          <li><a href="http://localhost:8000/docs" target="_blank" rel="noopener noreferrer">API Documentation</a></li>
          <li><a href="http://localhost:8000/api/scraping/test">Test Scraping API</a></li>
          <li><a href="http://localhost:8000/api/auth/login">Login Endpoint</a></li>
        </ul>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h2>Jobs ({jobs.length})</h2>
        {jobs.length === 0 ? (
          <p>No jobs found. The backend is running but job data needs to be set up.</p>
        ) : (
          <ul>
            {jobs.map((job, index) => (
              <li key={index}>{job.title} - {job.company}</li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <h3>Next Steps:</h3>
        <ol>
          <li>Set up database migrations: <code>cd backend && alembic upgrade head</code></li>
          <li>Create user accounts via API</li>
          <li>Configure scrapers for real job sites</li>
          <li>Build frontend components</li>
        </ol>
      </div>
    </div>
  );
}

export default App;
