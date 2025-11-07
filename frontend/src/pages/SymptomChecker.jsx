import React, { useState } from 'react';
import { symptomAPI } from '../api/apiService';

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Common symptoms database
  const commonSymptoms = [
    'Headache', 'Fever', 'Cough', 'Sore throat', 'Runny nose',
    'Nausea', 'Vomiting', 'Diarrhea', 'Fatigue', 'Body aches',
    'Chest pain', 'Shortness of breath', 'Dizziness', 'Rash',
    'Abdominal pain', 'Back pain', 'Joint pain', 'Muscle pain',
    'Loss of appetite', 'Weight loss', 'Insomnia', 'Anxiety',
    'Blurred vision', 'Ear pain', 'Toothache', 'Swelling',
    'Bleeding', 'Bruising', 'Palpitations', 'Constipation'
  ];

  const handleAddSymptom = () => {
    if (selectedSymptom && !symptoms.includes(selectedSymptom)) {
      setSymptoms([...symptoms, selectedSymptom]);
      setSelectedSymptom('');
    }
  };

  const handleRemoveSymptom = (symptomToRemove) => {
    setSymptoms(symptoms.filter(symptom => symptom !== symptomToRemove));
  };

  const handleCheckSymptoms = async () => {
    if (symptoms.length === 0) {
      setError('Please add at least one symptom');
      return;
    }

    setLoading(true);
    setError('');
    setResults(null);

    try {
      const response = await symptomAPI.check(symptoms);
      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to analyze symptoms');
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = () => {
    setSymptoms([]);
    setResults(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Symptom Checker
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Describe your symptoms and get preliminary health information. 
            This tool is for informational purposes only - always consult a healthcare professional.
          </p>
        </div>

        {/* Symptom Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Select Your Symptoms
          </h2>

          {/* Symptom Selection */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <select
              value={selectedSymptom}
              onChange={(e) => setSelectedSymptom(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a symptom...</option>
              {commonSymptoms.map((symptom) => (
                <option key={symptom} value={symptom}>
                  {symptom}
                </option>
              ))}
            </select>

            <button
              onClick={handleAddSymptom}
              disabled={!selectedSymptom}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Add Symptom
            </button>
          </div>

          {/* Selected Symptoms */}
          {symptoms.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Selected Symptoms ({symptoms.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {symptoms.map((symptom) => (
                  <span
                    key={symptom}
                    className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {symptom}
                    <button
                      onClick={() => handleRemoveSymptom(symptom)}
                      className="text-blue-600 hover:text-blue-800 text-lg"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleCheckSymptoms}
              disabled={symptoms.length === 0 || loading}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Analyzing...
                </>
              ) : (
                'Check Symptoms'
              )}
            </button>

            <button
              onClick={handleClearAll}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Clear All
            </button>
          </div>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}
        </div>

        {/* Results Section */}
        {results && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Analysis Results
            </h2>

            {/* Possible Conditions */}
            {results.possibleConditions && results.possibleConditions.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-3">
                  Possible Conditions
                </h3>
                <div className="space-y-3">
                  {results.possibleConditions.map((condition, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        {condition.name}
                      </h4>
                      <p className="text-gray-600 text-sm mb-2">
                        {condition.description}
                      </p>
                      {condition.serious && (
                        <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                          Serious Condition - Seek Immediate Care
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {results.recommendations && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-3">
                  Recommendations
                </h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {results.recommendations.map((recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Emergency Warning */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-yellow-600 text-xl">⚠️</span>
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-1">
                    Important Medical Disclaimer
                  </h4>
                  <p className="text-yellow-700 text-sm">
                    This symptom checker is for informational purposes only and is not a substitute for professional medical advice. 
                    If you have emergency symptoms like chest pain, difficulty breathing, or severe bleeding, seek immediate medical attention.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Tips Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            When to Seek Medical Attention
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 mb-2">Emergency Symptoms</h3>
              <ul className="text-red-700 text-sm space-y-1">
                <li>• Chest pain or pressure</li>
                <li>• Difficulty breathing</li>
                <li>• Severe bleeding</li>
                <li>• Sudden weakness or numbness</li>
                <li>• Loss of consciousness</li>
              </ul>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-800 mb-2">Urgent Care Needed</h3>
              <ul className="text-orange-700 text-sm space-y-1">
                <li>• High fever that doesn't improve</li>
                <li>• Severe pain anywhere</li>
                <li>• Symptoms lasting more than 3 days</li>
                <li>• Worsening condition</li>
                <li>• Difficulty swallowing or breathing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;