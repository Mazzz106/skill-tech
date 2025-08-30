import React from 'react';
import { Star, Clock, Users, Award } from 'lucide-react';
import { Course } from '../types';
import { useCart } from '../context/CartContext';

interface CourseCardProps {
  course: Course;
  onCourseClick: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onCourseClick }) => {
  const { addToCart, items } = useCart();
  const isInCart = items.some(item => item.course.id === course.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isInCart) {
      addToCart(course);
    }
  };

  return (
    <div 
      onClick={() => onCourseClick(course)}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
    >
      <div className="relative overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {course.level}
          </span>
        </div>
        {course.originalPrice && (
          <div className="absolute top-3 right-3">
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="mb-2">
          <span className="text-sm text-blue-600 font-medium">{course.category}</span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="text-sm text-gray-500 mb-3">
          By <span className="font-medium text-gray-700">{course.instructor}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{course.students.toLocaleString()}</span>
            </div>
            {course.certificate && (
              <div className="flex items-center space-x-1">
                <Award className="h-4 w-4" />
                <span>Certificate</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(course.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">{course.rating}</span>
            <span className="text-sm text-gray-500">({course.reviews.toLocaleString()})</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">₹{course.price.toLocaleString()}</span>
            {course.originalPrice && (
              <span className="text-lg text-gray-500 line-through">₹{course.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isInCart}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isInCart
                ? 'bg-green-100 text-green-700 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isInCart ? 'Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};