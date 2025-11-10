import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      getUserProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const getUserProfile = async () => {
    try {
      const response = await authAPI.getProfile();
      setUser(response.data.user);
    } catch (error) {
      console.error('Failed to get user profile:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

 const login = async ({email, password}) => {
  try {
    const response = await authAPI.login({ email, password });
    const { token: newToken, user: userData } = response.data;
    
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
    
    return { 
      success: true, 
      user: userData,
      message: 'Login successful' // Add this for consistency
    };
  } catch (error) {
    const errorMessage = error.response?.data?.message 
      || error.response?.data?.error 
      || error.message 
      || 'Login failed';
    
    return { 
      success: false, 
      message: errorMessage // Change from 'error' to 'message'
    };
  }
};

  const register = async (userData) => {
  try {
    console.log('AuthContext - Registering user:', userData); // Debug log
    
    const response = await authAPI.register(userData);
    const { token: newToken, user: registeredUser } = response.data;
    
    console.log('AuthContext - Registration success:', response.data); // Debug log
    
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(registeredUser);
    
    return { 
      success: true, 
      user: registeredUser,
      message: 'Registration successful' // Add this
    };
  } catch (error) {
    console.error('AuthContext - Registration error:', error); // Debug log
    
    const errorMessage = error.response?.data?.message 
      || error.response?.data?.error 
      || error.message 
      || 'Registration failed';
    
    return { 
      success: false, 
      message: errorMessage // Change from 'error' to 'message'
    };
  }
};

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
    isPatient: user?.role === 'patient',
    isDoctor: user?.role === 'doctor',
    isAdmin: user?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};