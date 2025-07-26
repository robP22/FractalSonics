# FractalSonics E-Commerce Platform 🎵

A full-stack e-commerce web application prototype for digital sound products, demonstrating modern web development practices with React, Flask, and Stripe integration.

## 🔍 Current Implementation Details

### Payment Flow
1. **Product Selection** - Users browse and add items to cart
2. **Cart Management** - Review items, adjust quantities, view totals with responsive visual scaling
3. **Stripe Checkout** - Complete customer information collection and secure payment processing
4. **Payment Verification** - Real Stripe Payment Intent confirmation and backend validation
5. **Order Recording** - Purchase data automatically saved to CSV files with order confirmation
6. **Account Integration** - Purchase history immediately available in user account dashboard

### Data Storage & Management
- **CSV Files** - File-based storage for development with proper data structure
- **Product Catalog** - Static product data with pricing, descriptions, and trending status
- **Purchase History** - Complete transaction logging with user association
- **User Authentication** - Secure user account storage with password hashing
- **Session Management** - Server-side session handling for authenticated users

### Search and Navigation
- **Real-time Product Search** - Live filtering by product name and description across catalog
- **Responsive Navigation** - React Router with conditional search bar display based on page
- **Cart Badge Integration** - Live cart item count display in navigation
- **Multi-page Application** - Proper URL management and page routing

### Authentication System
- **User Registration** - Complete signup with email validation and password requirements
- **Secure Login** - Session-based authentication with bcrypt password verification
- **Account Dashboard** - Full user profile with purchase statistics and transaction history  
- **Session Persistence** - Users remain logged in across browser sessions
- **Protected Routes** - Authentication-required endpoints with proper authorization

## 🚀 Implemented Features

### 💳 Payment Processing
- **Full Stripe Integration** - Complete payment processing using Stripe Payment Intents API with real transaction handling
- **Advanced Checkout Flow** - Customer information collection, billing address, payment confirmation
- **Order Recording & Tracking** - Purchase history automatically saved and accessible via user accounts
- **Comprehensive Error Handling** - Payment failure handling, user feedback, and recovery options

### 🛍️ Core E-commerce Functionality
- **Product Catalog** - Dynamic product display with search capability and trending indicators
- **Advanced Shopping Cart** - Add/remove items, quantity management, localStorage persistence, responsive visual scaling
- **Responsive Design** - Mobile-first design with CSS Grid (1-5 columns based on screen size)
- **Real-time Product Search** - Live filtering across product catalog by title and description

### 👤 Complete User Authentication & Account System
- **Full User Registration System** - Email validation, password hashing with bcrypt, duplicate prevention
- **Session-based Login** - Persistent authentication with secure session management
- **Comprehensive Account Dashboard** - Purchase statistics, account information, complete purchase history
- **Purchase History Management** - Detailed order history with transaction information and download access
- **Account Navigation System** - Tab-based interface for overview, purchases, and settings sections
- **Secure Authentication Flow** - Complete login/logout with proper session cleanup

### 🎨 User Interface
- **React Router Navigation** - Multi-page application with conditional navigation elements
- **Custom Styling** - Hand-coded CSS with gradient themes and hover effects
- **Visual Feedback** - Loading states, success/error messages, and interactive elements
- **Responsive Grid** - Adaptive product grid layout for different screen sizes

### 📊 Analytics & Trending System
- **Dynamic Trending Algorithm** - Automatic calculation of top 5 most purchased products
- **Real-time Updates** - Trending status updates automatically after every purchase
- **Purchase Analytics** - Complete transaction tracking and sales volume analysis
- **Visual Trending Indicators** - Dynamic badges appear on popular products based on actual sales data

## ⚠️ Development Status & Limitations

### ❌ Incomplete Features
- **File Delivery System** - Download buttons link to placeholder URL instead of actual files
- **Account Settings Functionality** - Profile editing, password changes, and notification settings show placeholder buttons  
- **Email System** - No confirmation emails or receipt delivery implemented
- **Account Deletion** - Shows confirmation dialog but doesn't actually delete accounts

### 🔧 Current Implementation Approach
- **CSV Data Storage** - Simple file-based storage for development (not production database)
- **Development Mode** - Uses Stripe test keys (not live payments)
- **Local Development** - Designed for local development environment
- **Academic Prototype** - Built to demonstrate development skills rather than production deployment

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
- **bcrypt** - Password hashing and verification for secure authentication
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
├── userAccounts.csv                # User account data storage
├── userPurchaseHistory.csv         # Purchase history storage
└── README.md                       # Project documentation
```

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

This project was developed over ~145 hours across 3 weeks as an intensive academic exercise, demonstrating:
- Full-stack development capabilities
- Modern React patterns and state management
- Payment integration with real payment processing
- Responsive design implementation
- API development and data management

## 📚 Technical References

### Core Technologies
- **React Documentation**: [React.js](https://react.dev/reference/react)
- **Stripe Integration**: [Stripe Docs](https://docs.stripe.com/)
- **Flask Framework**: [Flask Documentation](https://flask.palletsprojects.com/en/stable/)
- **bcrypt Password Hashing**: [bcrypt Documentation](https://pypi.org/project/bcrypt/)
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

##  Support

For support, email fractalsonics@gmail.com or visit our support page.

---

**Built with ❤️ for music producers and beat makers**

