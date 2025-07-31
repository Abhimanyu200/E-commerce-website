const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Email templates
const emailTemplates = {
  orderConfirmation: (order, user) => ({
    subject: `Order Confirmation - #${order._id.slice(-8)}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Order Confirmation</h2>
        <p>Dear ${user.name},</p>
        <p>Thank you for your order! Your order has been confirmed and is being processed.</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Order Details</h3>
          <p><strong>Order ID:</strong> #${order._id.slice(-8)}</p>
          <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
          <p><strong>Total Amount:</strong> $${order.totalPrice.toFixed(2)}</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Shipping Address</h3>
          <p>${order.shippingAddress.address}</p>
          <p>${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}</p>
          <p>${order.shippingAddress.country}</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Order Items</h3>
          ${order.orderItems.map(item => `
            <div style="display: flex; justify-content: space-between; margin: 10px 0;">
              <span>${item.name} x ${item.quantity}</span>
              <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          `).join('')}
        </div>
        
        <p>We'll send you an email when your order ships.</p>
        <p>Thank you for shopping with us!</p>
      </div>
    `
  }),
  
  orderShipped: (order, user) => ({
    subject: `Your Order Has Shipped - #${order._id.slice(-8)}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Order Shipped!</h2>
        <p>Dear ${user.name},</p>
        <p>Great news! Your order has been shipped and is on its way to you.</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Order Details</h3>
          <p><strong>Order ID:</strong> #${order._id.slice(-8)}</p>
          <p><strong>Status:</strong> Shipped</p>
          <p><strong>Expected Delivery:</strong> 3-5 business days</p>
        </div>
        
        <p>You can track your order status in your account dashboard.</p>
        <p>Thank you for your patience!</p>
      </div>
    `
  }),
  
  orderDelivered: (order, user) => ({
    subject: `Your Order Has Been Delivered - #${order._id.slice(-8)}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Order Delivered!</h2>
        <p>Dear ${user.name},</p>
        <p>Your order has been successfully delivered!</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Order Details</h3>
          <p><strong>Order ID:</strong> #${order._id.slice(-8)}</p>
          <p><strong>Status:</strong> Delivered</p>
          <p><strong>Delivery Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        
        <p>We hope you love your purchase! Please leave us a review if you have a moment.</p>
        <p>Thank you for shopping with us!</p>
      </div>
    `
  }),
  
  passwordReset: (user, resetToken) => ({
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>Dear ${user.name},</p>
        <p>You requested a password reset for your account.</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p>Click the link below to reset your password:</p>
          <a href="${process.env.FRONTEND_URL}/reset-password/${resetToken}" 
             style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
            Reset Password
          </a>
        </div>
        
        <p>If you didn't request this, please ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
      </div>
    `
  })
};

// Send email function
const sendEmail = async (to, template, data) => {
  try {
    const emailContent = emailTemplates[template](data.order || data, data.user || data);
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: emailContent.subject,
      html: emailContent.html
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

// Specific email functions
const sendOrderConfirmation = async (order, user) => {
  return sendEmail(user.email, 'orderConfirmation', { order, user });
};

const sendOrderShipped = async (order, user) => {
  return sendEmail(user.email, 'orderShipped', { order, user });
};

const sendOrderDelivered = async (order, user) => {
  return sendEmail(user.email, 'orderDelivered', { order, user });
};

const sendPasswordReset = async (user, resetToken) => {
  return sendEmail(user.email, 'passwordReset', { user, resetToken });
};

module.exports = {
  sendEmail,
  sendOrderConfirmation,
  sendOrderShipped,
  sendOrderDelivered,
  sendPasswordReset
}; 