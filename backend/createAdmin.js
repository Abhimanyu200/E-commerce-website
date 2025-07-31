const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

// Admin user data
const adminUser = {
  name: 'Admin User',
  email: 'admin@ecommerce.com',
  password: 'admin123',
  isAdmin: true,
  address: {
    street: '123 Admin St',
    city: 'Admin City',
    state: 'Admin State',
    zipCode: '12345',
    country: 'Admin Country'
  },
  phone: '+1234567890'
};

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for admin creation'))
.catch(err => console.error('MongoDB connection error:', err));

// Create admin user function
const createAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminUser.email });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Email:', existingAdmin.email);
      console.log('Is Admin:', existingAdmin.isAdmin);
      process.exit(0);
    }

    // Create new admin user
    const newAdmin = new User(adminUser);
    await newAdmin.save();
    
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email:', adminUser.email);
    console.log('🔑 Password:', adminUser.password);
    console.log('👑 Is Admin:', newAdmin.isAdmin);
    console.log('\n🔗 Login at: http://localhost:3000/login');
    console.log('🎯 Admin Dashboard: http://localhost:3000/admin');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
};

// Run the admin creation
createAdmin(); 