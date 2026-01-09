import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import './App.css';

function App() {
  return (
    <HashRouter>
      <div className="app">
        <nav>
          <h2>JobPortal</h2>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/portals">Portals</Link></li>
          </ul>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/portals" element={<div><h1>Portals</h1><p>Coming soon</p></div>} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
