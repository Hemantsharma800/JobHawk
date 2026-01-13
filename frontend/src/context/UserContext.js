import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Patch User',
    profilePic: '',
    headline: 'Software Developer',
    connections: 120,
    followers: 45,
    profileCompletion: 85,
    applications: 12,
    interviews: 3,
    offers: 1,
    profileScore: 85
  });
  
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [unreadMessages, setUnreadMessages] = useState(5);
  const [jobPortals, setJobPortals] = useState([
    { id: 1, name: 'LinkedIn', status: 'active', jobs: 12, lastSync: '2 hours ago' },
    { id: 2, name: 'Indeed', status: 'active', jobs: 8, lastSync: '1 day ago' },
    { id: 3, name: 'Glassdoor', status: 'inactive', jobs: 0, lastSync: '1 week ago' }
  ]);

  const updatePortalStatus = (portalId, newStatus) => {
    setJobPortals(portals => 
      portals.map(portal => 
        portal.id === portalId ? { ...portal, status: newStatus } : portal
      )
    );
  };

  return (
    <UserContext.Provider value={{
      user,
      unreadNotifications,
      unreadMessages,
      jobPortals,
      updatePortalStatus,
      setUser
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
