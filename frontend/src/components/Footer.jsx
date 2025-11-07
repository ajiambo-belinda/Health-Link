import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">HealthLink</h3>
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
              <li>support@healthlink.com</li>
              <li>+1 (555) 123-HELP</li>
              <li>24/7 Emergency Support</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Medical Disclaimer</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 HealthLink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;