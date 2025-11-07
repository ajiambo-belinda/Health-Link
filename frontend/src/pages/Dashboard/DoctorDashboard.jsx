import React from 'react';
import { useAuth } from '../../context/AuthContext';

const DoctorDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dr. {user?.name}
        </h1>
        <p className="text-gray-600 mb-8">Doctor Dashboard</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Today's Appointments</h3>
            <p className="text-2xl font-bold text-blue-600">5</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Patients This Week</h3>
            <p className="text-2xl font-bold text-green-600">23</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Pending Consultations</h3>
            <p className="text-2xl font-bold text-orange-600">3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;