import React from 'react';

const MentalHealth = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mental Health</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Stress Management</h2>
          <p>Techniques and strategies to manage daily stress effectively.</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Anxiety & Depression</h2>
          <p>Understanding symptoms and seeking appropriate help.</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Mindfulness</h2>
          <p>Meditation and mindfulness practices for mental wellbeing.</p>
        </div>
        <div className="bg-orange-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Crisis Resources</h2>
          <p>Emergency contacts and immediate help resources.</p>
        </div>
      </div>
    </div>
  );
};

export default MentalHealth;