import React, { useState, useEffect } from 'react';
import { appointmentsAPI, usersAPI } from '../services/api';

const Appointments = () => {
  const [appointments, setAppointments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Starting to fetch appointments...');
        
        const response = await appointmentsAPI.getAll();
        console.log('Appointments API response:', response);
        
        setAppointments(response.data);
      } catch (err) {
        console.error('Full error object:', err);
        console.error('Error response:', err.response);
        console.error('Error message:', err.message);
        
        setError(err.response?.data?.message || err.message || 'Failed to load appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Test the API connection directly
  const testAPI = async () => {
    try {
      console.log('Testing API connection...');
      const response = await fetch('http://localhost:5000/api/appointments');
      console.log('Direct fetch response:', response);
    } catch (err) {
      console.error('Direct fetch error:', err);
    }
  };

  // Call test on component mount
  useEffect(() => {
    testAPI();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Appointments</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">My Appointments</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
        
        {appointments && appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {appointment.doctor?.name ? `Dr. ${appointment.doctor.name}` : 'Doctor'}
                    </h3>
                    <p className="text-gray-600">{appointment.date} at {appointment.time}</p>
                    <p className="text-sm text-gray-500">{appointment.purpose || 'General Consultation'}</p>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      appointment.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800'
                        : appointment.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {appointment.status || 'scheduled'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Appointments</h3>
            <p className="text-gray-500">You don't have any appointments scheduled yet.</p>
            <button className="mt-4 bg-blue-900 text-yellow-400 px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors">
              Book Your First Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;