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

  
