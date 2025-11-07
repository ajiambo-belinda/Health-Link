import React from 'react';
import { useAuth } from '../../context/AuthContext';

const PatientDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600 mb-8">Patient Dashboard</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Upcoming Appointments</h3>
            <p className="text-2xl font-bold text-blue-600">2</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Health Tips</h3>
            <p className="text-2xl font-bold text-green-600">15</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Medical Records</h3>
            <p className="text-2xl font-bold text-purple-600">8</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
