import React, { createContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Clear user if going back to signin
  useEffect(() => {
    if (location.pathname === '/signin') {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, [location]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};