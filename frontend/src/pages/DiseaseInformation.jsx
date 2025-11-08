import React from 'react';

const DiseaseInformation = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Disease Information</h1>
      <div className="space-y-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Diabetes</h2>
          <p className="text-gray-600">Comprehensive information about Type 1 and Type 2 diabetes.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Hypertension</h2>
          <p className="text-gray-600">Understanding high blood pressure and management strategies.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Asthma</h2>
          <p className="text-gray-600">Information about asthma triggers and treatment options.</p>
        </div>
      </div>
    </div>
  );
};

export default DiseaseInformation;