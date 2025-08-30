import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { CourseGrid } from './components/CourseGrid';
import { CourseDetail } from './components/CourseDetail';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { FeaturedCourses } from './components/FeaturedCourses';
import { Footer } from './components/Footer';
import { courses, categories } from './data/courses';
import { Course } from './types';

function App() {
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [selectedCategory, setSelectedCategory] = useState('All Courses');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterCourses(category, searchQuery);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterCourses(selectedCategory, query);
  };

  const filterCourses = (category: string, query: string) => {
    let filtered = courses;

    if (category !== 'All Courses') {
      filtered = filtered.filter(course => course.category === category);
    }

    if (query) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.description.toLowerCase().includes(query.toLowerCase()) ||
        course.instructor.toLowerCase().includes(query.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }

    setFilteredCourses(filtered);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Header onSearch={handleSearch} onCartClick={() => setIsCartOpen(true)} />
        
        <Hero />
        
        <FeaturedCourses courses={courses} onCourseClick={setSelectedCourse} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              All Courses
            </h2>
            <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-8">
              Explore our comprehensive collection of courses designed to advance your career
            </p>
          </div>

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          <CourseGrid
            courses={filteredCourses}
            onCourseClick={setSelectedCourse}
          />
        </main>

        <Footer />

        <CourseDetail
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />

        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
        />

        <Checkout
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
        />
      </div>
    </CartProvider>
  );
}

export default App;