import React from 'react';
import { X, Star, Clock, Users, Award, PlayCircle, CheckCircle } from 'lucide-react';
import { Course } from '../types';
import { useCart } from '../context/CartContext';

interface CourseDetailProps {
  course: Course | null;
  onClose: () => void;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({ course, onClose }) => {
  const { addToCart, items } = useCart();
  
  if (!course) return null;

  const isInCart = items.some(item => item.course.id === course.id);

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(course);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>

        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>

            <div className="relative h-64 md:h-80">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <button className="bg-white bg-opacity-90 p-4 rounded-full hover:bg-opacity-100 transition-all group">
                  <PlayCircle className="h-12 w-12 text-blue-600 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>

            <div className="p-8">
              <div className="flex flex-col lg:flex-row lg:space-x-8">
                <div className="flex-1">
                  <div className="mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                      {course.category}
                    </span>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
                    <p className="text-gray-600 text-lg leading-relaxed">{course.description}</p>
                  </div>

                  <div className="flex items-center space-x-6 mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(course.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-medium text-gray-700">{course.rating}</span>
                      <span className="text-gray-500">({course.reviews.toLocaleString()} reviews)</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 mb-6">
                    Created by <span className="font-medium text-gray-800">{course.instructor}</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="h-5 w-5" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Users className="h-5 w-5" />
                      <span>{course.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <PlayCircle className="h-5 w-5" />
                      <span>{course.lessons} lessons</span>
                    </div>
                    {course.certificate && (
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Award className="h-5 w-5" />
                        <span>Certificate</span>
                      </div>
                    )}
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">What you'll learn</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.tags.map((tag, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-gray-700">{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:w-80">
                  <div className="bg-gray-50 rounded-2xl p-6 sticky top-8">
                    <div className="mb-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-3xl font-bold text-gray-900">₹{course.price.toLocaleString()}</span>
                        {course.originalPrice && (
                          <span className="text-xl text-gray-500 line-through">₹{course.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                      {course.originalPrice && (
                        <div className="text-sm text-red-600 font-medium">
                          Save ₹{(course.originalPrice - course.price).toLocaleString()}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleAddToCart}
                      disabled={isInCart}
                      className={`w-full py-3 px-6 rounded-xl font-bold text-lg transition-all ${
                        isInCart
                          ? 'bg-green-100 text-green-700 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105'
                      }`}
                    >
                      {isInCart ? 'Added to Cart' : 'Add to Cart'}
                    </button>

                    <div className="mt-6 space-y-3 text-sm text-gray-600">
                      <div className="flex items-center justify-between">
                        <span>Duration</span>
                        <span className="font-medium">{course.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Lessons</span>
                        <span className="font-medium">{course.lessons}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Level</span>
                        <span className="font-medium">{course.level}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Certificate</span>
                        <span className="font-medium">{course.certificate ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};