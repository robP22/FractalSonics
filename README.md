# FractalSonics E-Commerce Platform 🎵

A full-stack e-commerce web application prototype for digital sound products, developed as an academic project demonstrating modern web development practices with React, Flask, and Stripe integration.

## 🚀 Implemented Features

### � Payment Processing
- **Stripe Integration** - Secure payment processing using Stripe Payment Intents API
- **Checkout Flow** - Complete checkout process with payment confirmation
- **Order Tracking** - Purchase history recording in CSV files
- **Error Handling** - Payment failure handling and user feedback

### 🛍️ Core E-commerce Functionality
- **Product Catalog** - Display of digital sound products with search capability
- **Shopping Cart** - Add/remove items with quantity management and localStorage persistence
- **Responsive Design** - Mobile-first design with CSS Grid (1-5 columns based on screen size)
- **Product Search** - Real-time search filtering across product catalog

### 🎨 User Interface
- **React Router Navigation** - Multi-page application with conditional navigation elements
- **Custom Styling** - Hand-coded CSS with gradient themes and hover effects
- **Visual Feedback** - Loading states, success/error messages, and interactive elements
- **Responsive Grid** - Adaptive product grid layout for different screen sizes

### 📊 Basic Analytics
- **Trending Products** - Simple algorithm to identify frequently purchased items
- **Purchase Tracking** - CSV-based storage of purchase history for analytics
- **Dynamic Badges** - Visual indicators for trending products

## ⚠️ Development Status & Limitations

### � Incomplete Features
- **User Authentication** - Account system shows "Coming Soon" placeholder
- **File Delivery** - Download system not implemented (payments process but no file access)
- **User Profiles** - Account management features not developed
- **Order Management** - No order history viewing for users
- **Email System** - No confirmation emails or receipt delivery

### 🔧 Current Implementation
- **CSV Data Storage** - Simple file-based storage (not production database)
- **Development Mode** - Uses Stripe test keys (not live payments)
- **Local Development** - Designed for local development environment

## 🛠️ Technology Stack

### Frontend Technologies
- **React 19.1.0** - Modern React with hooks and context API for state management
- **React Router 7.6.3** - Client-side routing and navigation
- **Stripe React Elements** - Frontend payment form integration
- **CSS3 Grid & Flexbox** - Responsive layout systems
- **CSS Custom Properties** - Consistent design tokens and theming

### Backend Technologies
- **Flask 3.0.0** - Python web framework for API endpoints
- **Stripe API 8.5.0** - Server-side payment processing
- **CSV File Storage** - Simple data persistence (development approach)
- **Flask-CORS** - Cross-origin request handling
- **python-dotenv** - Environment variable management

### Development Tools
- **VS Code** - Primary development environment
- **Git** - Version control and project management
- **npm** - Frontend package management
- **pip** - Python package management

## 📁 Project Structure

```
FractalSonics/
├── my-app/                          # React frontend application
│   ├── public/                      # Static assets
│   │   ├── *.png                    # Product images and UI assets
│   │   └── index.html               # HTML template
│   ├── src/                         # Source code
│   │   ├── App.js                   # Main application component
│   │   ├── CartPage.js              # Shopping cart page
│   │   ├── Home.js                  # Homepage with product display
│   │   ├── Products.js              # Products listing page
│   │   ├── SearchBar.js             # Search functionality
│   │   ├── Support.js               # Support page placeholder
│   │   ├── CartContext.js           # Shopping cart state management
│   │   └── styles/                  # CSS stylesheets
│   │       ├── App.css              # Main application styles
│   │       ├── CartPage.css         # Cart-specific styles
│   │       ├── Products.css         # Product grid and card styles
│   │       └── *.css                # Additional component styles
│   ├── package.json                 # Frontend dependencies
│   └── package-lock.json            # Dependency lock file
├── .env                            # Environment variables (Stripe keys)
├── app.py                          # Flask backend API server
├── userService.py                  # User-related backend functions
├── requirements.txt                # Python dependencies
├── Products.csv                    # Product data storage
├── userAccounts.csv                # User account data (placeholder)
├── userPurchaseHistory.csv         # Purchase history storage
└── README.md                       # Project documentation
```

## � Current Implementation Details

### Payment Flow
1. **Product Selection** - Users browse and add items to cart
2. **Cart Management** - Review items, adjust quantities, view totals
3. **Stripe Checkout** - Secure payment processing with Stripe Elements
4. **Order Recording** - Purchase data saved to CSV files
5. **Confirmation** - Basic success message (no email delivery yet)
### Data Storage
- **CSV Files** - Simple file-based storage for development
- **Product Catalog** - Static product data with pricing and descriptions
- **Purchase History** - Transaction logging for analytics
- **User Data** - Basic user information storage (authentication not active)

### Search and Navigation
- **Product Search** - Real-time filtering by product name and description
- **Responsive Navigation** - React Router with conditional search bar display
- **Cart Badge** - Live cart item count in navigation
- **Page Routing** - Multi-page application with proper URL management

## � Responsive Design

### Grid Layout System
- **≥1440px**: 5 columns (optimized for large screens)
- **1200-1439px**: 4 columns (medium desktop)
- **900-1199px**: 3 columns (small desktop/tablet landscape)
- **600-899px**: 2 columns (tablet portrait)
- **≤599px**: 1 column (mobile devices)

### UI Optimization
- **Mobile-First Design** - Optimized for small screens with scaling up
- **Touch-Friendly** - Adequate button sizes and spacing for mobile use
- **Performance** - Efficient CSS Grid implementation for smooth scrolling

## 🔧 API Endpoints (Implemented)

### Product Management
- **GET /api/products** - Retrieve product catalog with trending indicators
- **GET /api/trending-stats** - Get trending products analytics

### Payment Processing
- **POST /api/create-payment-intent** - Initialize Stripe payment session
- **POST /api/confirm-payment** - Process payment and record purchase

### Data Operations
- **POST /api/update-trending** - Recalculate trending products based on purchases

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher) - For React development
- **Python** (v3.8 or higher) - For Flask backend
- **Stripe Account** - For payment processing (test mode)

### Installation

```bash
# Clone the repository
git clone https://github.com/robP22/FractalSonics.git
cd FractalSonics

# Install frontend dependencies
cd my-app
npm install

# Install backend dependencies
cd ..
pip install -r requirements.txt
```

### Environment Setup

Create a `.env` file in the root directory:
```env
STRIPE_SECRET_KEY=sk_test_your_stripe_test_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_test_key_here
```

### Running the Application

1. **Start the Flask backend** (Terminal 1):
   ```bash
   cd FractalSonics
   python app.py
   ```

2. **Start the React frontend** (Terminal 2):
   ```bash
   cd FractalSonics/my-app
   npm start
   ```

3. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🎨 Design Implementation

### CSS Architecture
- **Component-based Styling** - Individual CSS files for each major component
- **CSS Custom Properties** - Consistent colors and spacing variables
- **Responsive Grid** - CSS Grid with mobile-first responsive breakpoints
- **Typography** - System font stack with web-safe fallbacks

### Layout Features
- **Responsive Grid System** - 1-5 columns based on screen width
- **Cart Size Adaptation** - Visual adjustments based on cart contents
- **Mobile Optimization** - Touch-friendly interface for all screen sizes
### Performance Considerations
- **Lightweight Dependencies** - Minimal external libraries for faster loading
- **CSS Grid Performance** - Hardware-accelerated layouts
- **Component Optimization** - Efficient React state management

## 🔄 Development Timeline

This project was developed over approximately 145 hours across 3 weeks as an intensive academic exercise, demonstrating:
- Full-stack development capabilities
- Modern React patterns and state management
- Payment integration with real payment processing
- Responsive design implementation
- API development and data management

## � Technical References

### Core Technologies
- **React Documentation**: [React.js](https://react.dev/reference/react)
- **Stripe Integration**: [Stripe Docs](https://docs.stripe.com/)
- **Flask Framework**: [Flask Documentation](https://flask.palletsprojects.com/en/stable/)
- **CSS Grid & Flexbox**: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)

### Additional Resources
- **React Router**: [React Router Documentation](https://reactrouter.com/en/main)
- **REST API Design**: [AWS REST API Guide](https://aws.amazon.com/what-is/restful-api/)
- **Flask API Development**: [GeeksforGeeks Flask Guide](https://www.geeksforgeeks.org/python/python-build-a-rest-api-using-flask/)

## 🏫 Academic Context

This project was developed as part of an academic assignment demonstrating:
- **Full-stack development skills**
- **Modern web development practices**
- **Payment system integration**
- **Responsive design implementation**
- **Version control and project management**

**Note**: This is an academic prototype designed to showcase development skills. It is not intended for production use without significant additional development for security, scalability, and user management features.

## 🤝 Contributing

This project is currently not accepting external contributions as it's part of an academic assignment.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments & Core Technology Documentation
React Router Documentation

https://reactrouter.com/en/main - Essential for implementing the routing system with BrowserRouter, Routes, Route, Link, useLocation, and useNavigate hooks used throughout your App.js
React Context API

https://react.dev/reference/react/createContext - For implementing the CartContext and state management patterns used in your application
Node.js and npm

https://docs.npmjs.com/ - For package management and dependency installation (package.json management)
https://nodejs.org/en/docs/ - For the JavaScript runtime environment
CSS and Styling Resources
CSS Flexbox and Grid

https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout - For navigation layout and responsive design
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout - For product grid layouts
CSS Animations and Transitions

https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations - For the glitch effects and hover animations in your styling
Backend and Data Management
Python CSV Module

https://docs.python.org/3/library/csv.html - For handling CSV file operations in your data storage system
CORS (Cross-Origin Resource Sharing)

https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS - For handling frontend-backend communication
Flask-CORS

https://flask-cors.readthedocs.io/en/latest/ - For enabling cross-origin requests between React and Flask
Payment Processing
Stripe Elements

https://stripe.com/docs/stripe-js - For frontend payment form integration
https://stripe.com/docs/payments/payment-intents - For server-side payment processing
Development Tools
Create React App

https://create-react-app.dev/docs/getting-started/ - For initial project setup and build configuration
Git Documentation

https://git-scm.com/doc - For version control and repository management
VS Code Documentation

https://code.visualstudio.com/docs - For development environment setup and debugging
JavaScript ES6+ Features
MDN JavaScript Reference

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference - For modern JavaScript features like arrow functions, destructuring, and async/await
Fetch API

https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API - For making HTTP requests between frontend and backend
These documentation sources have been critical references during the development process, providing the technical foundation for implementing the routing, state management, payment processing, and responsive design features evident in the application.


## 📞 Support

For support, email support@fractalsonics.com or visit our support page.

---

**Built with ❤️ for music producers and beat makers**

