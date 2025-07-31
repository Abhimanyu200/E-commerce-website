import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimesCircle, FaShoppingCart } from 'react-icons/fa';

const PaymentCancelPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          {/* Cancel Icon */}
          <div className="mb-6">
            <FaTimesCircle className="w-16 h-16 text-red-500 mx-auto" />
          </div>

          {/* Cancel Message */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Payment Cancelled
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Your payment was cancelled. No charges have been made to your account.
          </p>

          {/* Information */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              What happens next?
            </h2>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1 text-left">
              <li>• Your order has been saved but not confirmed</li>
              <li>• You can complete the payment anytime from your cart</li>
              <li>• No charges have been made to your account</li>
              <li>• Your items are still in your shopping cart</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/cart"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <FaShoppingCart className="w-4 h-4" />
              <span>Return to Cart</span>
            </Link>
            <Link
              to="/"
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Help Section */}
          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            <p>Need help? Contact our support team</p>
            <p>Email: support@ecommerce.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage; 