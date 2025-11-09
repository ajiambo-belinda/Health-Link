import React, { useState } from 'react';
import { appointmentsAPI, usersAPI } from "../../Api/Apiserver";
import { useApi } from '../hooks/useApi';

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');

  const { data: appointments, loading, error, refetch } = useApi(() => 
    appointmentsAPI.getAll()
  );
  
  const { data: doctors } = useApi(() => 
    usersAPI.getDoctors()
  );

  const handleCreateAppointment = async (appointmentData) => {
    try {
      await appointmentsAPI.create(appointmentData);
      refetch(); // Refresh the appointments list
    } catch (error) {
      console.error('Failed to create appointment:', error);
    }
  };

  if (loading) return <div className="text-center py-8">Loading appointments...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">My Appointments</h1>
      
      {/* Appointments list and creation form would go here */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Your appointments UI */}
      </div>
    </div>
  );
};

export default Appointments;