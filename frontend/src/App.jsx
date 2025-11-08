import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Appointments from './pages/Appointments';
import HealthTips from './pages/HealthTips';
import SymptomChecker from './pages/SymptomChecker';
import Chat from './pages/Chat';
import PatientDashboard from './pages/Dashboard/PatientDashboard';
import DoctorDashboard from './pages/Dashboard/DoctorDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';

// Health Information Pages
import HealthArticles from './pages/HealthArticles';
import DiseaseInformation from './pages/DiseaseInformation';
import MedicationGuides from './pages/MedicationGuides';
import PreventiveCare from './pages/PreventiveCare';
import MentalHealth from './pages/MentalHealth';

// Dashboard selector based on user role
const DashboardSelector = () => {
  const { user } = useAuth();
  
  if (user?.role === 'admin') {
    return <AdminDashboard />;
  } else if (user?.role === 'doctor') {
    return <DoctorDashboard />;
  } else {
    return <PatientDashboard />;
  }
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="grow">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Public Health Information Routes */}
              <Route path="/health-articles" element={<HealthArticles />} />
              <Route path="/disease-information" element={<DiseaseInformation />} />
              <Route path="/medication-guides" element={<MedicationGuides />} />
              <Route path="/preventive-care" element={<PreventiveCare />} />
              <Route path="/mental-health" element={<MentalHealth />} />
              
              {/* Protected routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardSelector />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/appointments" 
                element={
                  <ProtectedRoute>
                    <Appointments />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/health-tips" 
                element={
                  <ProtectedRoute>
                    <HealthTips />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/symptom-checker" 
                element={
                  <ProtectedRoute>
                    <SymptomChecker />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/chat" 
                element={
                  <ProtectedRoute>
                    <Chat />
                  </ProtectedRoute>
                } 
              />
              
              {/* Redirect unknown routes */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;