# Full-Stack Ecommerce Application

A modern, full-stack ecommerce application built with React, Express.js, and MongoDB. This application provides a complete online shopping experience with user authentication, product management, shopping cart functionality, and order processing.

## 🚀 Features

### Frontend (React + Tailwind CSS)
- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **User Authentication**: Login, registration, and profile management
- **Product Catalog**: Browse products with search and filtering
- **Shopping Cart**: Add, remove, and update cart items
- **Checkout Process**: Complete order placement workflow
- **Order Management**: View order history and status
- **Admin Dashboard**: Product and order management (for admins)
- **Responsive Design**: Mobile-first approach

### Backend (Express.js + MongoDB)
- **RESTful API**: Complete API endpoints for all functionality
- **User Authentication**: JWT-based authentication with bcrypt
- **Product Management**: CRUD operations for products
- **Order Processing**: Complete order lifecycle management
- **Shopping Cart**: Server-side cart management
- **Admin Features**: Protected admin routes and functionality
- **Data Validation**: Input validation and error handling

## 🛠️ Tech Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **React Icons**: Icon library
- **React Hot Toast**: Toast notifications

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **express-validator**: Input validation
- **CORS**: Cross-origin resource sharing

## 📁 Project Structure

```
ecommerce-app/
├── backend/                 # Express.js backend
│   ├── models/             # MongoDB models
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/             # API routes
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   └── cart.js
│   ├── middleware/         # Custom middleware
│   │   └── auth.js
│   ├── package.json
│   └── server.js
├── frontend/               # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
├── package.json            # Root package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-app
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the `backend` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   ```

   **Note**: Replace `your_jwt_secret_key_here` with a secure secret key.

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # Start MongoDB (if using local installation)
   mongod
   ```

5. **Run the application**

   **Option 1: Run both frontend and backend together**
   ```bash
   # From the root directory
   npm run dev
   ```

   **Option 2: Run separately**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)
- `POST /api/products/:id/reviews` - Add product review

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders/myorders` - Get user orders
- `PUT /api/orders/:id/pay` - Mark order as paid
- `PUT /api/orders/:id/deliver` - Mark order as delivered (admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove/:productId` - Remove item from cart
- `DELETE /api/cart/clear` - Clear cart

## 🔧 Configuration

### MongoDB Connection
The application connects to MongoDB using the `MONGODB_URI` environment variable. You can use:
- Local MongoDB: `mongodb://localhost:27017/ecommerce`
- MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/ecommerce`

### JWT Secret
Set a secure JWT secret in the `.env` file for token generation and verification.

## 🎨 Customization

### Styling
The application uses Tailwind CSS for styling. You can customize the design by:
- Modifying `frontend/tailwind.config.js`
- Updating CSS classes in components
- Adding custom CSS in `frontend/src/index.css`

### Adding Features
- **New Pages**: Add components in `frontend/src/pages/`
- **New API Routes**: Add routes in `backend/routes/`
- **New Models**: Add models in `backend/models/`

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Deploy to platforms like Heroku, Vercel, or DigitalOcean
3. Configure MongoDB connection (use MongoDB Atlas for production)

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `build` folder to platforms like Netlify, Vercel, or AWS S3
3. Update API base URL in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

## 🔮 Future Enhancements

- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] Email notifications
- [ ] Product image upload
- [ ] Advanced search and filtering
- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] Inventory management
- [ ] Analytics dashboard
- [ ] Mobile app (React Native)

---

**Happy Coding! 🎉** 


<!-- 
tep 5: Admin Login karein
URL: http://localhost:3000/login
Email: admin@ecommerce.com
Password: admin123 -->