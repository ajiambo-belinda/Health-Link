import React from 'react';

const MedicationGuides = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Medication Guides</h1>
      <p className="text-lg text-gray-700 mb-6">
        Important information about common medications, usage, and precautions.
      </p>
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <p className="text-yellow-700">
          <strong>Disclaimer:</strong> Always consult with your healthcare provider before taking any medication.
        </p>
      </div>
    </div>
  );
};

export default MedicationGuides;