const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Sample products data
const sampleProducts = [
  {
    name: "iPhone 14 Pro",
    description: "Latest iPhone with advanced camera system, A16 Bionic chip, and stunning display. Features 48MP main camera, Dynamic Island, and all-day battery life.",
    price: 999.99,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500"
    ],
    stock: 50,
    brand: "Apple",
    rating: 4.8,
    numReviews: 125
  },
  {
    name: "Samsung Galaxy S23",
    description: "Premium Android smartphone with 200MP camera, Snapdragon 8 Gen 2, and 5000mAh battery. Features S Pen support and stunning AMOLED display.",
    price: 899.99,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500",
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500"
    ],
    stock: 45,
    brand: "Samsung",
    rating: 4.6,
    numReviews: 89
  },
  {
    name: "Nike Air Max 270",
    description: "Comfortable running shoes with Air Max technology. Perfect for daily wear and athletic activities. Available in multiple colors.",
    price: 129.99,
    category: "Clothing",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    ],
    stock: 100,
    brand: "Nike",
    rating: 4.5,
    numReviews: 234
  },
  {
    name: "Adidas Ultraboost 22",
    description: "Premium running shoes with responsive Boost midsole and Primeknit upper. Designed for maximum comfort and performance.",
    price: 179.99,
    category: "Clothing",
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500"
    ],
    stock: 75,
    brand: "Adidas",
    rating: 4.7,
    numReviews: 156
  },
  {
    name: "The Great Gatsby",
    description: "Classic American novel by F. Scott Fitzgerald. Set in the Jazz Age, it explores themes of decadence, idealism, and the American Dream.",
    price: 12.99,
    category: "Books",
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500"
    ],
    stock: 200,
    brand: "Scribner",
    rating: 4.9,
    numReviews: 567
  },
  {
    name: "To Kill a Mockingbird",
    description: "Harper Lee's masterpiece about racial injustice in the American South. A powerful story of courage, compassion, and moral growth.",
    price: 14.99,
    category: "Books",
    images: [
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500",
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500"
    ],
    stock: 150,
    brand: "Grand Central",
    rating: 4.8,
    numReviews: 432
  },
  {
    name: "IKEA MALM Bed Frame",
    description: "Modern bed frame with clean lines and under-bed storage. Perfect for contemporary bedrooms. Available in queen and king sizes.",
    price: 299.99,
    category: "Home & Garden",
    images: [
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=500",
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=500"
    ],
    stock: 25,
    brand: "IKEA",
    rating: 4.3,
    numReviews: 78
  },
  {
    name: "Philips Hue Smart Bulb",
    description: "Smart LED bulb with 16 million colors and voice control. Compatible with Alexa, Google Assistant, and Apple HomeKit.",
    price: 49.99,
    category: "Home & Garden",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500"
    ],
    stock: 80,
    brand: "Philips",
    rating: 4.6,
    numReviews: 189
  },
  {
    name: "Wilson Tennis Racket",
    description: "Professional tennis racket with graphite frame and synthetic gut strings. Perfect for intermediate to advanced players.",
    price: 89.99,
    category: "Sports",
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500"
    ],
    stock: 60,
    brand: "Wilson",
    rating: 4.4,
    numReviews: 92
  },
  {
    name: "Nike Basketball",
    description: "Official size and weight basketball with composite leather cover. Perfect for indoor and outdoor play.",
    price: 34.99,
    category: "Sports",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500"
    ],
    stock: 120,
    brand: "Nike",
    rating: 4.5,
    numReviews: 145
  },
  {
    name: "MAC Lipstick - Ruby Woo",
    description: "Iconic matte red lipstick with long-lasting formula. Perfect for any occasion and suitable for all skin tones.",
    price: 19.99,
    category: "Beauty",
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500",
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500"
    ],
    stock: 200,
    brand: "MAC",
    rating: 4.7,
    numReviews: 312
  },
  {
    name: "L'Oreal Paris Foundation",
    description: "Long-wear foundation with SPF 25. Provides full coverage and natural finish. Available in 30 shades.",
    price: 24.99,
    category: "Beauty",
    images: [
      "https://images.unsplash.com/photo-1631730359585-38a4935cbec4?w=500",
      "https://images.unsplash.com/photo-1631730359585-38a4935cbec4?w=500"
    ],
    stock: 150,
    brand: "L'Oreal",
    rating: 4.3,
    numReviews: 178
  }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for seeding'))
.catch(err => console.error('MongoDB connection error:', err));

// Seed products function
const seedProducts = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`Successfully seeded ${insertedProducts.length} products`);

    // Display some sample products
    console.log('\nSample products added:');
    insertedProducts.forEach(product => {
      console.log(`- ${product.name} ($${product.price})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

// Run the seeding
seedProducts(); 