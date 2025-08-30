import React from 'react';
import { BookOpen, TrendingUp, Award, Users } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Learn Skills That
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Shape Your Future
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join millions of learners worldwide in mastering new skills with our expert-led courses.
            Start your journey today with affordable pricing in Indian Rupees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
              Browse Courses
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all">
              Free Trial
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-2xl p-4 mb-4 inline-block">
                <BookOpen className="h-8 w-8 mx-auto" />
              </div>
              <div className="text-2xl font-bold">10,000+</div>
              <div className="text-blue-200">Courses</div>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-2xl p-4 mb-4 inline-block">
                <Users className="h-8 w-8 mx-auto" />
              </div>
              <div className="text-2xl font-bold">5M+</div>
              <div className="text-blue-200">Students</div>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-2xl p-4 mb-4 inline-block">
                <Award className="h-8 w-8 mx-auto" />
              </div>
              <div className="text-2xl font-bold">50,000+</div>
              <div className="text-blue-200">Certificates</div>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-2xl p-4 mb-4 inline-block">
                <TrendingUp className="h-8 w-8 mx-auto" />
              </div>
              <div className="text-2xl font-bold">95%</div>
              <div className="text-blue-200">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};