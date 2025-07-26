# FractalSonics E-Commerce Platform 🎵

A comprehensive full-stack e-commerce web application for unique sound products, featuring advanced user authentication, real-time payment processing, dynamic analytics, and professional UI/UX design.

## 🚀 Advanced Features

### 🔐 User Authentication & Account Management
- **Secure Registration** - Email validation, password requirements, duplicate prevention
- **Session-Based Login** - Persistent authentication with secure session management
- **User Profile Management** - Account information display and management
- **Protected Routes** - Authentication-required endpoints with proper authorization
- **Logout Functionality** - Complete session cleanup and security

### 💳 Advanced Payment Processing
- **Stripe Payment Intents** - Real payment processing with Stripe's latest API
- **Secure Checkout** - PCI-compliant payment forms with error handling
- **Order Confirmation** - Payment verification and order tracking
- **Purchase History** - Complete transaction history per user
- **Receipt Generation** - Order confirmation with unique order IDs

### 📊 Dynamic Analytics & Trending Products
- **Real-Time Trending** - Algorithm analyzes purchase data to identify top 5 products
- **Automatic Updates** - Trending status updates after every purchase
- **Purchase Analytics** - Comprehensive purchase tracking and statistics
- **Data-Driven Insights** - Sales volume analysis and trending calculations
- **Dynamic Content** - Products automatically tagged as "Trending" based on sales

### 🛍️ Enhanced E-commerce Functionality
- **Advanced Product Catalog** - Comprehensive product browsing with search
- **Smart Shopping Cart** - Persistent cart with quantity management and auto-removal
- **One-Click Checkout** - Stripe checkout buttons directly on product cards
- **Responsive Design** - Optimized for all screen sizes with adaptive layouts
- **Professional UI** - High-end styling with glitch effects and gradient themes

### 🎨 Professional User Interface
- **Luxury Design** - High-end styling with custom fonts and gradient themes
- **Glitch Effects** - Animated logo with pink/green text layers and precise positioning
- **Responsive Navigation** - Consistent button sizing (90x40px) with hover effects
- **Cart Page Optimization** - Custom navbar styling and perfect text alignment
- **Visual Feedback** - Loading states, success messages, and error handling

## 🛠️ Technology Stack

### Frontend Technologies
- **React 19.1.0** - Latest React with hooks, context API, and concurrent features
- **React Router 7.6.3** - Advanced client-side routing with nested routes
- **Stripe React SDK** - Official Stripe integration for secure payments
- **CSS3 Grid & Flexbox** - Modern layout systems with responsive design
- **Custom Fonts** - Freeday and Blackcraft for professional branding

### Backend Technologies
- **Flask 3.0.0** - Modern Python web framework with CORS support
- **Stripe API 8.5.0** - Latest Stripe server-side integration
- **CSV Data Management** - Structured data storage for products, users, and purchases
- **Session Management** - Secure user authentication and authorization
- **python-dotenv** - Environment variable management for security

### Development & Deployment
- **VS Code Integration** - Optimized development environment
- **Git Version Control** - Professional source code management
- **Environment Variables** - Secure API key and configuration management
- **Modern JavaScript** - ES6+ features with async/await patterns

## 📁 Project Structure

```
FractalSonics/
├── my-app/                          # React application
│   ├── public/                      # Static assets and images
│   │   ├── Arbitrary Kit Art.png    # Product images
│   │   ├── beatpack.png             # Product images
│   │   ├── placeholder-image.png    # Default product image
│   │   ├── navbar-texture.png       # UI background texture
│   │   └── stripe_backup_code.txt   # Stripe backup codes
│   ├── src/                         # Source code
│   │   ├── components/              # React components
│   │   │   ├── App.js               # Main application component
│   │   │   ├── forms/               # Form components
│   │   │   │   ├── AuthModal.js     # Authentication modal with login/register
│   │   │   │   ├── LoginForm.js     # User login form
│   │   │   │   ├── RegisterForm.js  # User registration form
│   │   │   │   └── index.js         # Forms barrel file
│   │   │   ├── layout/              # Layout components
│   │   │   │   ├── Navigation.js    # Navigation bar with auth integration
│   │   │   │   ├── PageLayout.js    # Common page layout wrapper
│   │   │   │   └── index.js         # Layout barrel file
│   │   │   ├── pages/               # Page components
│   │   │   │   ├── Account.js       # User account management page
│   │   │   │   ├── CartPage.js      # Shopping cart with custom styling
│   │   │   │   ├── CheckoutSuccess.js # Payment success confirmation
│   │   │   │   ├── Home.js          # Homepage with trending products
│   │   │   │   ├── Products.js      # Products listing with search
│   │   │   │   ├── Support.js       # Customer support page
│   │   │   │   └── index.js         # Pages barrel file
│   │   │   ├── product/             # Product components
│   │   │   │   ├── ProductCard.js   # Individual product card with checkout
│   │   │   │   ├── ProductGrid.js   # Responsive product grid layout
│   │   │   │   └── index.js         # Product barrel file
│   │   │   └── ui/                  # UI components
│   │   │       ├── LoadingSpinner.js # Loading indicator
│   │   │       ├── Message.js       # Success/error messages
│   │   │       ├── SearchBar.js     # Product search functionality
│   │   │       ├── StripeCheckout.js # Stripe payment form
│   │   │       ├── StripeCheckoutButton.js # Quick checkout button
│   │   │       └── index.js         # UI barrel file
│   │   ├── contexts/                # React contexts for global state
│   │   │   ├── AuthContext.js       # User authentication state
│   │   │   ├── CartContext.js       # Shopping cart global state
│   │   │   ├── SearchContext.js     # Search functionality state
│   │   │   └── ServiceContext.js    # API services context
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useErrorHandler.js   # Centralized error handling
│   │   │   ├── useOneClickCheckout.js # Quick checkout functionality
│   │   │   ├── useProducts.js       # Products data management
│   │   │   └── usePurchaseHistory.js # Purchase history management
│   │   ├── config/                  # Application configuration
│   │   │   ├── navigation.js        # Navigation routes configuration
│   │   │   └── theme.js             # Theme and styling configuration
│   │   ├── services/                # API services
│   │   │   └── ProductService.js    # Product API integration
│   │   ├── styles/                  # CSS stylesheets
│   │   │   ├── App.css              # Main app styles with glitch effects
│   │   │   ├── AuthModal.css        # Authentication modal styles
│   │   │   ├── CartPage.css         # Cart page specific styles
│   │   │   ├── Home.css             # Homepage styles
│   │   │   ├── Products.css         # Products page styles
│   │   │   ├── Support.css          # Support page styles
│   │   │   ├── shared-utilities.css # Shared utility classes
│   │   │   └── fonts/               # Custom brand fonts
│   │   └── index.js                 # React app entry point
│   ├── package.json                 # Frontend dependencies
│   └── package-lock.json            # Dependency lock file
├── .env                            # Environment variables (Stripe keys)
├── app.py                          # Flask backend server with full API
├── userService.py                  # User authentication service
├── requirements.txt                # Python backend dependencies
├── Products.csv                    # Product catalog with trending data
├── userAccounts.csv                # User account storage
├── userPurchaseHistory.csv         # Purchase transaction history
├── DEPENDENCIES.md                 # Installation guide
├── README.md                       # This documentation
└── SETUP_GUIDE.md                  # Setup instructions
```

## 🔐 Authentication System

### User Registration Flow
1. **Modal-Based Registration** - Clean, professional registration form
2. **Email Validation** - Prevents duplicate accounts and validates format
3. **Secure Password Storage** - Server-side password validation and storage
4. **Automatic Login** - Seamless transition from registration to authenticated state
5. **Error Handling** - Comprehensive validation with user-friendly messages

### Login & Session Management
1. **Session-Based Authentication** - Secure server-side session management
2. **Persistent Login State** - User remains logged in across browser sessions
3. **Profile Access** - User account information display and management
4. **Secure Logout** - Complete session cleanup and security
5. **Protected Routes** - Authentication-required endpoints with proper authorization

## 💳 Advanced Payment System

### Stripe Integration Architecture
- **Payment Intents API** - Latest Stripe payment processing with enhanced security
- **Real-Time Processing** - Immediate payment confirmation and order creation
- **Error Handling** - Comprehensive payment error management and user feedback
- **Order Tracking** - Unique order ID generation with payment intent integration
- **Receipt System** - Payment confirmation with detailed transaction information

### Payment Flow
1. **Cart Review** - User reviews items and total before checkout
2. **Customer Information** - Billing details collection with validation
3. **Stripe Processing** - Secure payment processing with real-time status
4. **Order Confirmation** - Payment verification and purchase history storage
5. **Success Redirect** - User-friendly confirmation with order details

## 📊 Analytics & Trending System

### Dynamic Trending Algorithm
```python
def update_trending_products():
    # Analyze all purchase history data
    # Calculate top 5 most purchased products
    # Update product catalog with trending tags
    # Automatic execution after every purchase
```

### Data-Driven Features
- **Purchase Analytics** - Real-time analysis of all user purchases
- **Trending Calculation** - Top 5 products based on quantity sold
- **Automatic Updates** - Trending status updates after every transaction
- **Visual Indicators** - Trending badges on popular products
- **Statistics API** - `/api/trending-stats` endpoint for analytics data

## 🎨 Advanced UI/UX Features

### Cart Page Styling Enhancements
- **Custom Navbar** - Cart-specific navigation with gradient background
- **Glitch Text Positioning** - Precisely aligned pink/green text effects
- **Responsive Design** - Perfect alignment across all screen sizes
- **Visual Polish** - Professional typography and spacing optimization

### Interactive Elements
- **Loading States** - Smooth loading indicators for all async operations
- **Success Messages** - User feedback for successful actions
- **Error Handling** - Graceful error display with recovery options
- **Hover Effects** - Interactive button and card hover animations

## 🔧 API Documentation

### Authentication Endpoints
- **POST /api/register** - User registration with validation
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword",
    "firstName": "John",
    "lastName": "Doe"
  }
  ```

- **POST /api/login** - User authentication with session creation
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```

- **POST /api/logout** - Session termination and cleanup
- **GET /api/user/profile** - Authenticated user profile information

### E-commerce Endpoints
- **GET /api/products** - Fetch all products with trending status
- **POST /api/create-payment-intent** - Create Stripe payment intent
- **POST /api/confirm-payment** - Verify payment and create order
- **GET /api/purchase-history** - User-specific purchase history

### Analytics Endpoints
- **POST /api/update-trending** - Manually trigger trending calculation
- **GET /api/trending-stats** - Get trending products statistics

### Data Structures

#### Product Data
```json
{
  "id": "1",
  "title": "robP Beat Pack",
  "description": "High-quality beats and loops",
  "price": "20.00",
  "category": "Beat Packs",
  "tags": "Hip-hop, Trending",
  "image_url": "/beatpack.png",
  "download_link": "https://example.com/download"
}
```

#### User Account Data
```json
{
  "user_id": "1",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "registration_date": "2025-01-15"
}
```

#### Purchase History Data
```json
{
  "purchase_id": "1",
  "user_id": "1",
  "product_id": "1",
  "product_title": "robP Beat Pack",
  "price": "20.00",
  "quantity": "1",
  "purchase_date": "2025-01-15",
  "order_status": "completed"
}
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher) - JavaScript runtime
- **npm** (v6 or higher) - Package manager
- **Python** (v3.8 or higher) - Backend runtime
- **pip** - Python package manager
- **Stripe Account** - For payment processing

### Quick Installation

#### Option 1: Clone and Install
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
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
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

## 🎨 Design Features

### CSS Architecture
- **Naming Convention**: `fractal-sonics-*` prefix for all custom classes
- **Design Tokens**: CSS custom properties in `shared-utilities.css`
- **Responsive Grid**: CSS Grid with breakpoint-specific column counts (1-5 columns)
- **Typography**: Segoe UI font stack with custom brand fonts (Freeday, Blackcraft)
- **Glitch Effects**: Animated text with pink and green color layers

### Visual Design
- **5-Column Grid**: Optimized for 1440px+ screens (MacBook Pro 15.4")
- **Smart Scaling**: Product cards adapt based on cart size
- **Luxury Styling**: High-end typography with letter-spacing and weight variations
- **Consistent Spacing**: Optimized padding and margin calculations
- **Image Consistency**: object-fit: cover ensures uniform product display

### Color Scheme
- **Primary Gradient**: Black to purple (`#000000` to `#764ba2`)
- **Accent Colors**: Blue (`#007bff`) for interactive elements
- **Status Colors**: Green for success, red for errors, orange for trending
- **Glitch Colors**: Pink (`#ff0080`) and Green (`#00ff80`) for text effects

## 📱 Responsive Design

### Grid Layout System
- **≥1440px**: 5 columns (MacBook Pro 15.4" optimized)
- **1200-1439px**: 4 columns (medium desktop)
- **900-1199px**: 3 columns (small desktop)
- **600-899px**: 2 columns (tablet)
- **≤599px**: 1 column (mobile)

### Cart Size Overrides
- **Medium Cart (3-5 items)**: Forces 4 columns
- **Large Cart (6-8 items)**: Forces 3 columns  
- **XL Cart (9+ items)**: Forces 2 columns

## 🚀 Performance Features

### Optimization Techniques
- **CSS Grid**: Hardware-accelerated layouts
- **object-fit: cover**: Consistent image rendering without distortion
- **Lazy Loading**: Images load as needed
- **CSS Custom Properties**: Centralized design tokens
- **Minimal Re-renders**: Optimized React state management

### Bundle Optimization
- **Tree Shaking**: Unused code elimination
- **Code Splitting**: Component-based loading
- **CSS Minification**: Reduced stylesheet sizes
- **Font Display Swap**: Non-blocking font loading

## 🛒 Smart Cart Features

### Adaptive Cart Management
- **Size-Based Scaling**: Cart adjusts product grid (4→3→2 columns based on cart size)
- **Real-time Updates**: Instant price calculations and quantity tracking
- **Visual Feedback**: 3-second removal confirmations with product names
- **Persistent Storage**: Cart maintained in localStorage across sessions

### Trending Products Integration
- **Purchase History Analysis**: Trending products calculated from actual purchase data
- **Dynamic Display**: Trending badges appear on popular products
- **Fallback Logic**: Shows default products when no purchase history available

## 🔗 Links & Resources

- **Repository**: [GitHub - FractalSonics](https://github.com/robP22/FractalSonics)
- **React Documentation**: [React.js](https://reactjs.org/docs)
- **Flask Documentation**: [Flask](https://flask.palletsprojects.com/)
- **Stripe Integration**: [Stripe React](https://stripe.com/docs/stripe-js/react)

## 📚 Additional Documentation

### Component Architecture
- **AuthContext** - Global authentication state with login/logout methods
- **CartContext** - Shopping cart state with add/remove/update functionality
- **SearchContext** - Product search state with real-time filtering
- **ServiceContext** - API service management and error handling

### Custom Hooks
- **useProducts** - Product data fetching and management
- **usePurchaseHistory** - User purchase history management
- **useErrorHandler** - Centralized error handling and user feedback
- **useOneClickCheckout** - Quick checkout functionality with Stripe

### Styling System
- **App.css** - Main application styles with glitch effects and navbar
- **CartPage.css** - Cart-specific styling with custom navbar alignment
- **shared-utilities.css** - Reusable utility classes and design tokens
- **Component CSS** - Individual component styling with BEM-like naming

## 🚀 Deployment

### Frontend Deployment
```bash
cd my-app
npm run build
# Deploy build folder to your hosting service
```

### Backend Deployment
- Configure your Python/Flask server
- Set up environment variables for production
- Configure Stripe webhook endpoints for live payments

## 🤝 Contributing

This project is currently not accepting external contributions as it's part of an academic assignment.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Stripe** - For secure payment processing
- **Flask** - For the lightweight Python web framework
- **Community** - For inspiration and support

## 📞 Support

For support, email support@fractalsonics.com or visit our support page.

---

**Built with ❤️ for music producers and beat makers**

