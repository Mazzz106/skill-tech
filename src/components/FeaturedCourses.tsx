import React from 'react';
import { CourseCard } from './CourseCard';
import { Course } from '../types';

interface FeaturedCoursesProps {
  courses: Course[];
  onCourseClick: (course: Course) => void;
}

export const FeaturedCourses: React.FC<FeaturedCoursesProps> = ({ courses, onCourseClick }) => {
  const featuredCourses = courses.slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Courses
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most popular courses, carefully selected by our expert instructors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onCourseClick={onCourseClick}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
            View All Courses
          </button>
        </div>
      </div>
    </section>
  );
};