import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-400">CareSync</h3>
            <p className="text-blue-100">
              Connecting healthcare providers with patients through secure, 
              efficient telemedicine solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-yellow-400">Quick Links</h4>
            <ul className="space-y-2 text-blue-100">
              <li><Link to="/" className="hover:text-yellow-300 transition-colors">Home</Link></li>
              <li><Link to="/appointments" className="hover:text-yellow-300 transition-colors">Appointments</Link></li>
              <li><Link to="/health-tips" className="hover:text-yellow-300 transition-colors">Health Tips</Link></li>
              <li><Link to="/symptom-checker" className="hover:text-yellow-300 transition-colors">Symptom Checker</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-yellow-400">Contact</h4>
            <ul className="space-y-3 text-blue-100">
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-yellow-400 flex-shrink-0" />
                <span>caresync@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-yellow-400 flex-shrink-0" />
                <span>0700235674 - Lyndah</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaFacebook className="text-yellow-400 flex-shrink-0" />
                <span>CareSync</span>
              </li>
            </ul>
          </div>

          {/* Health Information Links */}
          <div>
            <h4 className="font-semibold mb-4 text-yellow-400">Health Information</h4>
            <ul className="space-y-2 text-blue-100">
              <li><Link to="/health-articles" className="hover:text-yellow-300 transition-colors">Health Articles</Link></li>
              <li><Link to="/disease-information" className="hover:text-yellow-300 transition-colors">Disease Information</Link></li>
              <li><Link to="/medication-guides" className="hover:text-yellow-300 transition-colors">Medication Guides</Link></li>
              <li><Link to="/preventive-care" className="hover:text-yellow-300 transition-colors">Preventive Care</Link></li>
              <li><Link to="/mental-health" className="hover:text-yellow-300 transition-colors">Mental Health</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-yellow-500 mt-8 pt-8 text-center text-yellow-300">
          <p>&copy; 2025 CareSync Medical Solutions</p>
  <p className="text-sm mt-1">Committed to secure, accessible healthcare for all</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;