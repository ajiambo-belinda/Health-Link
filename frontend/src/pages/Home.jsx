import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Welcome to{' '}
              <span className="text-yellow-400">CareSync</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Connecting patients and healthcare providers with secure, 
              efficient telemedicine solutions and comprehensive health management.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/register"
                    className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    to="/login"
                    className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 transform"
                  >
                    Sign In
                  </Link>
                </>
              ) : (
                <Link
                  to="/dashboard"
                  className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
                >
                  Go to Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">👨‍⚕️</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">
                Virtual Consultations
              </h3>
              <p className="text-gray-600">
                Connect with healthcare professionals from the comfort of your home through secure video calls.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">
                Easy Appointments
              </h3>
              <p className="text-gray-600">
                Book, manage, and reschedule appointments with your preferred doctors effortlessly.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💊</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">
                Health Records
              </h3>
              <p className="text-gray-600">
                Access your medical history, prescriptions, and test results in one secure place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
            How CareSync Works
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-900 text-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
                1
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Create Account</h3>
              <p className="text-gray-600 text-sm">Sign up as a patient or healthcare provider</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-blue-900 text-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
                2
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Book Appointment</h3>
              <p className="text-gray-600 text-sm">Choose your doctor and preferred time slot</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-blue-900 text-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
                3
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Virtual Consultation</h3>
              <p className="text-gray-600 text-sm">Connect via secure video call</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-blue-900 text-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
                4
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Follow Up</h3>
              <p className="text-gray-600 text-sm">Receive prescriptions and medical advice</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-800 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2">500+</div>
              <div className="text-blue-100">Healthcare Providers</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2">10,000+</div>
              <div className="text-blue-100">Patients Served</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2">24/7</div>
              <div className="text-blue-100">Available Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to Transform Your Healthcare Experience?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of patients and healthcare providers using CareSync today.
          </p>
          <Link
            to={isAuthenticated ? "/dashboard" : "/register"}
            className="bg-yellow-500 text-blue-900 hover:bg-yellow-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform inline-block"
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Get Started Now'}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;