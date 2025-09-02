import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, BookOpen } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onSearch: (query: string) => void;
  onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onCartClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getItemCount } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">LearnHub</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Courses</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Categories</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Instructors</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">About</a>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </form>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile search */}
            <button className="lg:hidden p-2 text-gray-600 hover:text-blue-600">
              <Search className="h-5 w-5" />
            </button>

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </button>

            {/* Removed Auth buttons */}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Courses</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Categories</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Instructors</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">About</a>
              {/* Removed Login/Sign Up from mobile menu */}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
