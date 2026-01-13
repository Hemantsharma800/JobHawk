import  { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import JobManager from '../utils/jobManager';
import './Navigation.css';

const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [activePortal, setActivePortal] = useState(null);
  const [connectedPortals, setConnectedPortals] = useState({
    linkedin: true,
    indeed: true,
    glassdoor: false,
    github: false,
    monster: false
  });

  const portals = [
    { id: 'linkedin', name: 'LinkedIn', color: '#0077B5', url: 'https://www.linkedin.com/jobs' },
    { id: 'indeed', name: 'Indeed', color: '#2164F3', url: 'https://www.indeed.com' },
    { id: 'glassdoor', name: 'Glassdoor', color: '#0CAA41', url: 'https://www.glassdoor.com' },
    { id: 'github', name: 'GitHub Jobs', color: '#24292E', url: 'https://jobs.github.com' },
    { id: 'monster', name: 'Monster', color: '#6C0', url: 'https://www.monster.com' }
  ];

  const handlePortalConnect = (portalId: string) => {
    if (!connectedPortals[portalId as keyof typeof connectedPortals]) {
      const url = portals.find(p => p.id === portalId)?.url;
      if (url) {
        window.open(`${url}`, '_blank');
        setTimeout(() => {
          setConnectedPortals(prev => ({
            ...prev,
            [portalId]: true
          }));
          setActivePortal(portalId);
          alert(`Successfully connected to ${portals.find(p => p.id === portalId)?.name}!`);
        }, 1500);
      }
    } else {
      setActivePortal(portalId);
    }
  };

  const handlePortalDisconnect = (portalId: string) => {
    setConnectedPortals(prev => ({
      ...prev,
      [portalId]: false
    }));
    if (activePortal === portalId) {
      setActivePortal(null);
    }
  };

  const savedJobsCount = JobManager.getSavedJobs().length;

  return (
    
      
        
      
      
      
        <NavLink 
          to="/" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          end
        >
          Home
        
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          Dashboard
        
        <NavLink 
          to="/profile" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          Profile
        
        <NavLink 
          to="/jobs" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          Jobs
        
        
        {/* Portal Connections */}
        
          
            Job Portals ▾
          
          
            {portals.map(portal => (
              
                <button
                  className={`portal-btn ${connectedPortals[portal.id as keyof typeof connectedPortals] ? 'connected' : ''} ${activePortal === portal.id ? 'active-portal' : ''}`}
                  onClick={() => handlePortalConnect(portal.id)}
                  style={{ '--portal-color': portal.color } as CSSProperties}
                >
                  
                  {portal.name}
                  {connectedPortals[portal.id as keyof typeof connectedPortals] && (
                    
                  )}
                
                {connectedPortals[portal.id as keyof typeof connectedPortals] && (
                  <button 
                    className="disconnect-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePortalDisconnect(portal.id);
                    }}
                    title="Disconnect"
                  >
                    ✕
                  
                )}
              
            ))}
          
        
        
        {/* Saved Jobs Icon */}
        <NavLink 
          to="/saved-jobs" 
          className={({ isActive }) => `nav-link save-link ${isActive ? 'active' : ''}`}
        >
          
          Saved Jobs
          
        
      
      
      
        
          {user?.photo ? (
            
          ) : (
            
          )}
        
        
        
      
    
  );
};

export default Navigation;
