import React, { useState } from 'react';
import { X, CreditCard, Shield, Lock, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PaymentDetails } from '../types';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ isOpen, onClose }) => {
  const { items, getTotalPrice } = useCart();
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // --- PayU Integration ---
  const PAYU_MERCHANT_KEY = 'uHAcL9'; // Test key, replace with your merchant key
  const PAYU_SALT = 'LaJ6COVqqKys61CKssAEqaOvkllLPUtT'; // Test salt, NEVER expose in frontend in production
  const PAYU_BASE_URL = 'https://test.payu.in/_payment'; // Use for production: https://secure.payu.in/_payment

  // Helper to generate a random txnid
  const generateTxnId = () => 'txn' + Math.floor(Math.random() * 1000000000);

  // Helper to get hash from backend (for demo, using a placeholder)
  const getPayUHash = async (data: any) => {
    // In production, call your backend API to generate the hash
    // For demo, we'll use a simple hash generator endpoint (not secure)
    const response = await fetch('https://payu-hash-generator.vercel.app/api/hash', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result.hash;
  };

  const handlePayUPayment = async () => {
    setIsProcessing(true);

    const txnid = generateTxnId();
    const amount = Math.round(getTotalPrice() * 1.18).toString();
    const productinfo = `Purchase of ${items.length} course(s)`;
    const surl = window.location.origin + '/success'; // Success URL
    const furl = window.location.origin + '/failure'; // Failure URL

    // Get hash from backend (never generate hash on frontend in production)
    const hash = await getPayUHash({
      key: PAYU_MERCHANT_KEY,
      txnid,
      amount,
      productinfo,
      firstname: paymentDetails.name,
      email: paymentDetails.email,
      salt: PAYU_SALT
    });

    // Prepare form data
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = PAYU_BASE_URL;

    const fields: { [key: string]: string } = {
      key: PAYU_MERCHANT_KEY,
      txnid,
      amount,
      productinfo,
      firstname: paymentDetails.name,
      email: paymentDetails.email,
      phone: paymentDetails.phone,
      surl,
      furl,
      hash,
      service_provider: 'payu_paisa',
    };

    Object.entries(fields).forEach(([k, v]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = k;
      input.value = v;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();

    // No need to setIsProcessing(false) because page will redirect
  };

  const isFormValid = paymentDetails.name && paymentDetails.email && paymentDetails.phone;

  if (paymentSuccess) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75"></div>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
            <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. You now have lifetime access to your courses.
            </p>
            <p className="text-sm text-gray-500">
              Redirecting to your courses...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gray-500 bg-opacity-75" onClick={onClose}></div>
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Payment Form */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Billing Information</h3>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={paymentDetails.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={paymentDetails.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={paymentDetails.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+91 9876543210"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={paymentDetails.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your address"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={paymentDetails.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={paymentDetails.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PIN Code
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={paymentDetails.pincode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="110001"
                      />
                    </div>
                  </div>
                </form>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 text-blue-800">
                    <Shield className="h-5 w-5" />
                    <span className="font-medium">Secure Payment</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-2">
                    Your payment information is encrypted and secure. We use industry-standard security measures.
                  </p>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h3>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.course.id} className="flex items-center space-x-4">
                        <img
                          src={item.course.image}
                          alt={item.course.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 line-clamp-2">
                            {item.course.title}
                          </h4>
                          <p className="text-sm text-gray-500">{item.course.instructor}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ₹{item.course.price.toLocaleString()}
                          </p>
                          {item.course.originalPrice && (
                            <p className="text-sm text-gray-500 line-through">
                              ₹{item.course.originalPrice.toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₹{getTotalPrice().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>GST (18%)</span>
                      <span>₹{Math.round(getTotalPrice() * 0.18).toLocaleString()}</span>
                    </div>
                    <div className="border-t border-gray-300 pt-2">
                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total</span>
                        <span>₹{Math.round(getTotalPrice() * 1.18).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={handlePayUPayment}
                      disabled={!isFormValid || isProcessing}
                      className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all flex items-center justify-center space-x-2 ${
                        !isFormValid || isProcessing
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105'
                      }`}
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-5 w-5" />
                          <span>PayU: Pay ₹{Math.round(getTotalPrice() * 1.18).toLocaleString()}</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Lock className="h-4 w-4" />
                        <span>SSL Encrypted</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Shield className="h-4 w-4" />
                        <span>Secure Payment</span>
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <p className="text-xs text-gray-500">
                        By proceeding, you agree to our Terms of Service and Privacy Policy
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">What's Included:</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Lifetime access to all course materials</li>
                    <li>• Downloadable resources and assignments</li>
                    <li>• Certificate of completion</li>
                    <li>• 30-day money-back guarantee</li>
                    <li>• Access on mobile and desktop</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};