import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPaypal, FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';

const PayPalPayment = ({ order, onPaymentSuccess }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePayPalPayment = async () => {
    setLoading(true);
    try {
      // Create PayPal payment
      const response = await axios.post('/api/payment/create-paypal-payment', {
        amount: order.totalPrice,
        orderId: order._id,
        items: order.orderItems
      });

      // Redirect to PayPal
      window.location.href = response.data.approvalUrl;
    } catch (error) {
      console.error('PayPal payment error:', error);
      toast.error('Payment initialization failed');
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentId, payerId) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/payment/execute-paypal-payment', {
        paymentId,
        payerId,
        orderId: order._id
      });

      toast.success('Payment completed successfully!');
      if (onPaymentSuccess) {
        onPaymentSuccess(response.data.order);
      }
      navigate(`/order/${order._id}`);
    } catch (error) {
      console.error('Payment execution error:', error);
      toast.error('Payment completion failed');
      setLoading(false);
    }
  };

  // Check if we're returning from PayPal
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get('paymentId');
    const payerId = urlParams.get('PayerID');
    const orderId = urlParams.get('orderId');

    if (paymentId && payerId && orderId === order._id) {
      handlePaymentSuccess(paymentId, payerId);
    }
  }, [order._id]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Payment Method
      </h3>
      
      <div className="space-y-4">
        {/* PayPal Button */}
        <button
          onClick={handlePayPalPayment}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
        >
          {loading ? (
            <FaSpinner className="w-5 h-5 animate-spin" />
          ) : (
            <FaPaypal className="w-5 h-5" />
          )}
          <span>
            {loading ? 'Processing...' : 'Pay with PayPal'}
          </span>
        </button>

        {/* Order Summary */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Order Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
              <span className="text-gray-900 dark:text-white">${order.itemsPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Shipping:</span>
              <span className="text-gray-900 dark:text-white">${order.shippingPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Tax:</span>
              <span className="text-gray-900 dark:text-white">${order.taxPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold border-t border-gray-200 dark:border-gray-700 pt-2">
              <span className="text-gray-900 dark:text-white">Total:</span>
              <span className="text-gray-900 dark:text-white">${order.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          <p>🔒 Your payment is secured by PayPal</p>
          <p>You will be redirected to PayPal to complete your payment</p>
        </div>
      </div>
    </div>
  );
};

export default PayPalPayment; 