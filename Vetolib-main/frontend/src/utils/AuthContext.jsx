import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();


export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    login(token, JSON.parse(localStorage.getItem('userInfo')));
  }, []);

  const login = (token, userInfo) => {
    localStorage.setItem('token', token); 
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    const user = JSON.parse(localStorage.getItem('userInfo'));
    setIsAuthenticated(true);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');  
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};