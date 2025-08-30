import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Course, CartItem, CartContextType } from '../types';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (course: Course) => {
    setItems(prev => {
      const existingItem = prev.find(item => item.course.id === course.id);
      if (existingItem) {
        return prev; // Course already in cart
      }
      return [...prev, { course, quantity: 1 }];
    });
  };

  const removeFromCart = (courseId: string) => {
    setItems(prev => prev.filter(item => item.course.id !== courseId));
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.course.price * item.quantity, 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, getTotalPrice, getItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};