const express = require('express');
const { auth } = require('../middleware/auth');
const paypal = require('paypal-rest-sdk');
const Order = require('../models/Order');
const router = express.Router();

// PayPal configuration
paypal.configure({
  mode: process.env.PAYPAL_MODE || 'sandbox', // sandbox or live
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET
});

// @route   POST /api/payment/create-paypal-payment
// @desc    Create PayPal payment
// @access  Private
router.post('/create-paypal-payment', auth, async (req, res) => {
  try {
    const { amount, orderId, items } = req.body;

    const create_payment_json = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      redirect_urls: {
        return_url: `${process.env.FRONTEND_URL}/payment/success?orderId=${orderId}`,
        cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`
      },
      transactions: [{
        item_list: {
          items: items.map(item => ({
            name: item.name,
            sku: item.productId,
            price: item.price.toFixed(2),
            currency: 'USD',
            quantity: item.quantity
          }))
        },
        amount: {
          currency: 'USD',
          total: amount.toFixed(2)
        },
        description: `Order #${orderId.slice(-8)}`
      }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        console.error('PayPal payment creation error:', error);
        return res.status(500).json({ message: 'Payment creation failed' });
      } else {
        // Find approval URL
        const approvalUrl = payment.links.find(link => link.rel === 'approval_url');
        res.json({
          paymentId: payment.id,
          approvalUrl: approvalUrl.href
        });
      }
    });
  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(500).json({ message: 'Payment processing failed' });
  }
});

// @route   POST /api/payment/execute-paypal-payment
// @desc    Execute PayPal payment after approval
// @access  Private
router.post('/execute-paypal-payment', auth, async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    const execute_payment_json = {
      payer_id: payerId
    };

    paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
      if (error) {
        console.error('PayPal payment execution error:', error);
        return res.status(500).json({ message: 'Payment execution failed' });
      } else {
        if (payment.state === 'approved') {
          // Update order
          try {
            const order = await Order.findById(orderId);
            if (!order) {
              return res.status(404).json({ message: 'Order not found' });
            }

            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
              id: payment.id,
              status: payment.state,
              update_time: new Date().toISOString(),
              email_address: payment.payer.payer_info.email
            };

            await order.save();

            res.json({ 
              message: 'Payment completed successfully',
              order: order,
              payment: payment
            });
          } catch (error) {
            console.error('Order update error:', error);
            res.status(500).json({ message: 'Order update failed' });
          }
        } else {
          res.status(400).json({ message: 'Payment not approved' });
        }
      }
    });
  } catch (error) {
    console.error('Payment execution error:', error);
    res.status(500).json({ message: 'Payment execution failed' });
  }
});

// @route   GET /api/payment/paypal-webhook
// @desc    PayPal webhook for payment events
// @access  Public
router.post('/paypal-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const event = req.body;
    
    // Handle different PayPal webhook events
    switch (event.event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        console.log('Payment completed:', event.resource.id);
        // You can add additional logic here if needed
        break;
        
      case 'PAYMENT.CAPTURE.DENIED':
        console.log('Payment denied:', event.resource.id);
        break;
        
      default:
        console.log('Unhandled PayPal event:', event.event_type);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('PayPal webhook error:', error);
    res.status(500).json({ message: 'Webhook processing failed' });
  }
});

module.exports = router; 