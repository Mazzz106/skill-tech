import React from 'react';
import { X, Trash2, ShoppingBag, Clock, Users } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose, onCheckout }) => {
  const { items, removeFromCart, getTotalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        
        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl">
              <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
                  <div className="ml-3 h-7 flex items-center">
                    <button
                      onClick={onClose}
                      className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  {items.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Your cart is empty</p>
                      <p className="text-sm text-gray-400 mt-2">Add some courses to get started!</p>
                    </div>
                  ) : (
                    <div className="flow-root">
                      <ul className="-my-6 divide-y divide-gray-200">
                        {items.map((item) => (
                          <li key={item.course.id} className="py-6 flex">
                            <div className="flex-shrink-0 w-20 h-20 border border-gray-200 rounded-md overflow-hidden">
                              <img
                                src={item.course.image}
                                alt={item.course.title}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div className="ml-4 flex-1 flex flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3 className="line-clamp-2">{item.course.title}</h3>
                                  <p className="ml-4">₹{item.course.price.toLocaleString()}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">{item.course.instructor}</p>
                                <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                                  <div className="flex items-center space-x-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{item.course.duration}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Users className="h-4 w-4" />
                                    <span>{item.course.lessons} lessons</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-1 flex items-end justify-between text-sm">
                                <button
                                  onClick={() => removeFromCart(item.course.id)}
                                  className="flex items-center space-x-1 text-red-600 hover:text-red-800 transition-colors"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span>Remove</span>
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {items.length > 0 && (
                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                    <p>Subtotal</p>
                    <p>₹{getTotalPrice().toLocaleString()}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500 mb-6">
                    Lifetime access to all course materials
                  </p>
                  <div className="space-y-3">
                  <button
                    onClick={onCheckout}
                     className="w-full bg-blue-600 border border-transparent rounded-md py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      >
                        Proceed to Checkout
                      </button>
                      <button
                        onClick={onClose}
                        className="w-full bg-gray-100 border border-gray-300 rounded-md py-3 px-4 text-base font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                      >
                        Continue Shopping
                      </button>
                    </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};