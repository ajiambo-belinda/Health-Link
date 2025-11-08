import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">CareSync</h3>
            <p className="text-gray-300">
              Connecting healthcare providers with patients through secure, 
              efficient telemedicine solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/appointments" className="hover:text-white transition-colors">Appointments</Link></li>
              <li><Link to="/health-tips" className="hover:text-white transition-colors">Health Tips</Link></li>
              <li><Link to="/symptom-checker" className="hover:text-white transition-colors">Symptom Checker</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>caresync@gmail.com</li>
              <li>0700235674 - Lyndah</li>
              <li>Facebook: CareSync</li>
            </ul>
          </div>

          {/* Health Information Links */}
          <div>
            <h4 className="font-semibold mb-4">Health Information</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/health-articles" className="hover:text-white transition-colors">Health Articles</Link></li>
              <li><Link to="/disease-information" className="hover:text-white transition-colors">Disease Information</Link></li>
              <li><Link to="/medication-guides" className="hover:text-white transition-colors">Medication Guides</Link></li>
              <li><Link to="/preventive-care" className="hover:text-white transition-colors">Preventive Care</Link></li>
              <li><Link to="/mental-health" className="hover:text-white transition-colors">Mental Health</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 CareSync. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;