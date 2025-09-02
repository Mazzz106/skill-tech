import React from 'react';
import { BookOpen, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">LearnHub</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Empowering millions of learners worldwide with quality education and affordable pricing.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Details</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>meetvaland2306@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>+91 81286 23189</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Vadodara, Gujarat, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2025 LearnHub. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-sm text-gray-300">Prices in Indian Rupees (₹)</span>
              <span className="text-sm text-gray-300">Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};




        