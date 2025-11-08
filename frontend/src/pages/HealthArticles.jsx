import React from 'react';

const HealthArticles = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Health Articles</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Nutrition & Diet</h2>
          <p className="text-gray-600">Learn about balanced diets, superfoods, and healthy eating habits.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Exercise & Fitness</h2>
          <p className="text-gray-600">Discover workout routines and fitness tips for all levels.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Sleep Health</h2>
          <p className="text-gray-600">Improve your sleep quality with our expert tips.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Healthy Aging</h2>
          <p className="text-gray-600">Guidance for maintaining health as you age.</p>
        </div>
      </div>
    </div>
  );
};

export default HealthArticles;