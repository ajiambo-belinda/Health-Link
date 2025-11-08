import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg border-b border-yellow-400">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
              <span className="text-yellow-400 font-bold text-lg">CS</span>
            </div>
            <span className="text-2xl font-bold text-blue-900">CareSync</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-blue-900 hover:text-yellow-600 transition-colors font-medium">
              Home
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-blue-900 hover:text-yellow-600 transition-colors font-medium">
                  Dashboard
                </Link>
                <Link to="/appointments" className="text-blue-900 hover:text-yellow-600 transition-colors font-medium">
                  Appointments
                </Link>
                <Link to="/health-tips" className="text-blue-900 hover:text-yellow-600 transition-colors font-medium">
                  Health Tips
                </Link>
                <Link to="/symptom-checker" className="text-blue-900 hover:text-yellow-600 transition-colors font-medium">
                  Symptom Checker
                </Link>
                
                {/* Messages Link */}
                <Link to="/chat" className="text-blue-900 hover:text-yellow-600 transition-colors font-medium">
                  Messages
                </Link>
                
                {/* User Menu */}
                <div className="flex items-center space-x-4">
                  <span className="text-blue-800 font-medium">
                    Welcome, {user?.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-4 py-2 rounded-lg transition-colors font-semibold"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-blue-900 hover:text-yellow-600 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-900 hover:bg-blue-800 text-yellow-400 px-6 py-2 rounded-lg transition-colors font-semibold border border-yellow-400"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button (optional) */}
          <div className="md:hidden">
            <button className="text-blue-900 hover:text-yellow-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;