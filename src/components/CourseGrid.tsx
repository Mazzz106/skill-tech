import React from 'react';
import { CourseCard } from './CourseCard';
import { Course } from '../types';

interface CourseGridProps {
  courses: Course[];
  onCourseClick: (course: Course) => void;
}

export const CourseGrid: React.FC<CourseGridProps> = ({ courses, onCourseClick }) => {
  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">No courses found matching your criteria.</div>
        <div className="text-gray-400 text-sm mt-2">Try adjusting your search or filters.</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onCourseClick={onCourseClick}
        />
      ))}
    </div>
  );
};