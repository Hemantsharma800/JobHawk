import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './components/Dashboard';
import Jobs from './components/Jobs';
import AIJobAnalysis from './components/AIJobAnalysis';
import SavedJobs from './components/SavedJobs';
import Applications from './components/Applications';
import CareerInsights from './components/CareerInsights';
import Profile from './components/Profile';
import Network from './components/Network';
import Messages from './components/Messages';
import Settings from './components/Settings';

// For demo, set to true to see dashboard
const isAuthenticated = true;

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          } />
          
          <Route path="/login" element={
            <>
              <Header />
              <Login />
              <Footer />
            </>
          } />
          
          {/* Protected dashboard routes */}
          <Route path="/dashboard" element={
            isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
          }>
            <Route index element={<Dashboard />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="ai-analysis" element={<AIJobAnalysis />} />
            <Route path="saved-jobs" element={<SavedJobs />} />
            <Route path="applications" element={<Applications />} />
            <Route path="career-insights" element={<CareerInsights />} />
            <Route path="profile" element={<Profile />} />
            <Route path="network" element={<Network />} />
            <Route path="messages" element={<Messages />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* Redirect all other routes */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
