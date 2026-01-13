import React, { useState } from 'react';
import { FiSearch, FiFilter, FiMapPin, FiBriefcase, FiStar, FiClock } from 'react-icons/fi';
import './Search.css';

const Search = () => {
  const [searchResults, setSearchResults] = useState([
    { id: 1, type: 'job', title: 'Senior React Developer', company: 'TechCorp', location: 'Remote', match: 95 },
    { id: 2, type: 'job', title: 'Frontend Engineer', company: 'StartupXYZ', location: 'San Francisco', match: 88 },
    { id: 3, type: 'people', name: 'Sarah Johnson', title: 'Engineering Manager', company: 'Google', mutual: 15 },
    { id: 4, type: 'company', name: 'DataSystems', industry: 'Technology', employees: '500-1000' },
    { id: 5, type: 'job', title: 'Full Stack Developer', company: 'CreativeMinds', location: 'New York', match: 92 },
    { id: 6, type: 'people', name: 'Mike Chen', title: 'Product Director', company: 'Meta', mutual: 8 }
  ]);

  const [searchType, setSearchType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // In a real app, this would call an API
    console.log('Searching for:', searchQuery, 'Type:', searchType);
  };

  const filteredResults = searchResults.filter(result => {
    if (searchType !== 'all' && result.type !== searchType) return false;
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    if (result.type === 'job') {
      return result.title.toLowerCase().includes(query) || 
             result.company.toLowerCase().includes(query);
    } else if (result.type === 'people') {
      return result.name.toLowerCase().includes(query) ||
             result.title.toLowerCase().includes(query);
    } else if (result.type === 'company') {
      return result.name.toLowerCase().includes(query) ||
             result.industry.toLowerCase().includes(query);
    }
    return false;
  });

  return (
    <div className="search-container">
      <div className="search-header">
        <h1>Search</h1>
        <p>Find jobs, people, and companies</p>
      </div>

      <div className="search-box-container">
        <div className="search-type-tabs">
          <button 
            className={`type-tab ${searchType === 'all' ? 'active' : ''}`}
            onClick={() => setSearchType('all')}
          >
            All
          </button>
          <button 
            className={`type-tab ${searchType === 'job' ? 'active' : ''}`}
            onClick={() => setSearchType('job')}
          >
            Jobs
          </button>
          <button 
            className={`type-tab ${searchType === 'people' ? 'active' : ''}`}
            onClick={() => setSearchType('people')}
          >
            People
          </button>
          <button 
            className={`type-tab ${searchType === 'company' ? 'active' : ''}`}
            onClick={() => setSearchType('company')}
          >
            Companies
          </button>
        </div>

        <div className="search-input-group">
          <div className="search-input">
            <FiSearch />
            <input
              type="text"
              placeholder={`Search ${searchType === 'all' ? 'everything' : searchType + 's'}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
          <button className="filter-button">
            <FiFilter /> Filters
          </button>
        </div>

        <div className="quick-filters">
          <span className="filter-label">Quick filters:</span>
          <button className="quick-filter">Remote</button>
          <button className="quick-filter">Full-time</button>
          <button className="quick-filter">Engineering</button>
          <button className="quick-filter">Management</button>
          <button className="quick-filter">Recent</button>
        </div>
      </div>

      <div className="search-results">
        <div className="results-header">
          <h2>{filteredResults.length} Results Found</h2>
          <div className="sort-options">
            <select>
              <option>Relevance</option>
              <option>Most Recent</option>
              <option>Best Match</option>
            </select>
          </div>
        </div>

        <div className="results-grid">
          {filteredResults.map(result => (
            <div key={result.id} className={`result-card ${result.type}`}>
              {result.type === 'job' && (
                <>
                  <div className="result-header">
                    <div className="company-icon">
                      {result.company.charAt(0)}
                    </div>
                    <div className="result-info">
                      <h3>{result.title}</h3>
                      <p className="company-name">{result.company}</p>
                      <div className="result-meta">
                        <span><FiMapPin /> {result.location}</span>
                        <span><FiBriefcase /> Full-time</span>
                        <span><FiClock /> 2 days ago</span>
                      </div>
                    </div>
                    <div className="match-score">
                      <div className="score-circle">
                        {result.match}%
                      </div>
                      <span>Match</span>
                    </div>
                  </div>
                  <div className="result-actions">
                    <button className="save-btn">
                      <FiStar /> Save
                    </button>
                    <button className="apply-btn">
                      Apply Now
                    </button>
                  </div>
                </>
              )}

              {result.type === 'people' && (
                <>
                  <div className="result-header">
                    <div className="people-avatar">
                      {result.name.charAt(0)}
                    </div>
                    <div className="result-info">
                      <h3>{result.name}</h3>
                      <p className="people-title">{result.title}</p>
                      <p className="people-company">{result.company}</p>
                      <div className="mutual-connections">
                        {result.mutual} mutual connections
                      </div>
                    </div>
                  </div>
                  <div className="result-actions">
                    <button className="connect-btn">
                      Connect
                    </button>
                    <button className="message-btn">
                      Message
                    </button>
                  </div>
                </>
              )}

              {result.type === 'company' && (
                <>
                  <div className="result-header">
                    <div className="company-logo">
                      {result.name.charAt(0)}
                    </div>
                    <div className="result-info">
                      <h3>{result.name}</h3>
                      <p className="company-industry">{result.industry}</p>
                      <div className="company-meta">
                        <span>{result.employees} employees</span>
                        <span>50+ open positions</span>
                      </div>
                    </div>
                  </div>
                  <div className="result-actions">
                    <button className="follow-btn">
                      Follow
                    </button>
                    <button className="view-jobs-btn">
                      View Jobs
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {filteredResults.length === 0 && (
          <div className="no-results">
            <FiSearch size={48} />
            <h3>No results found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
