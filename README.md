# Fractal Sonics 🎵

A modern e-commerce web application for unique sound products, featuring a React frontend with Flask backend, integrated with Stripe for secure payments.

## 🚀 Features

### 🛍️ E-commerce Functionality
- **Product Catalog** - Browse and search through unique sound products with 5-column grid layout
- **Shopping Cart** - Add, remove, and manage items with real-time updates and quantity tracking
- **Secure Checkout** - Stripe integration with rapid checkout buttons on product cards
- **Trending Products** - Data-driven trending products based on purchase history
- **Responsive Design** - Optimized for all screen sizes with adaptive grid layouts

### 🎨 User Interface
- **Luxury Design** - High-end styling with Segoe UI typography and gradient themes
- **Enhanced Navigation** - Consistent 90x40px navigation buttons with hover effects
- **Advanced Search** - Real-time product search with context-aware display (SearchBar component, searchTerm state, and product filtering)
- **Visual Feedback** - Cart icon with item count badge and removal notifications
- **Professional Banner** - Glitch-effect logo with optimized spacing (20px top, 60px bottom)

### 🛒 Shopping Experience
- **Smart Cart Scaling** - Responsive cart adapts layout based on item count
- **Cart & Checkout** - CartContext for global state, CartPage and CheckoutPage for UI, and `/api/checkout` endpoint for order processing
- **Auto-removal** - Items automatically removed when quantity reaches zero
- **Purchase History Integration** - Trending products calculated from actual purchase data
- **One-Click Checkout** - Stripe checkout buttons directly on product cards
- **Image Consistency** - object-fit: cover ensures uniform product image display

### 📱 Responsive Design
- **Adaptive Grid** - 1-5 columns based on screen size (5 columns on 1440px+)
- **Cart Size Overrides** - Dynamic grid adjustment when cart is open
- **Mobile-Optimized** - Touch-friendly interface with optimized spacing
- **Dark Mode Scrollbars** - Custom scrollbar styling across all browsers

### 🎯 Pages & Components
- **Home Page** - Trending products showcase with purchase history integration
- **Products Page** - Full catalog with responsive 5-column grid layout
- **Cart Page** - Smart scaling cart with sidebar checkout
- **Support Page** - Enhanced contact form with improved text visibility
- **Account Management** - User authentication with visual indicators

## 🛠️ Technology Stack

### Frontend
- **React** - Modern JavaScript library with hooks and context API
- **React Router** - Client-side routing for single-page application
- **CSS3** - Professional styling with fractal-sonics-* naming convention
- **CSS Grid** - Advanced responsive layouts with breakpoint-specific columns
- **Custom Hooks** - useProducts, usePurchaseHistory, useErrorHandler

### Backend
- **Flask** - Python web framework with CORS support
- **CSV Data Store** - Products, user accounts, and purchase history
- **Session Management** - User authentication and session handling
- **REST API** - Products, purchase history, and user management endpoints

### Payment Processing
- **Stripe** - Secure payment processing with React Stripe.js
- **@stripe/stripe-js** - Official Stripe JavaScript SDK
- **@stripe/react-stripe-js** - React components for Stripe Elements

### Development Tools
- **ESLint** - Code quality and consistency
- **Custom Fonts** - Freeday and Blackcraft for brand styling
- **Dark Mode Support** - System-wide dark scrollbars and themes

## 📁 Project Structure

```
FractalSonics/
├── my-app/                          # React application
│   ├── public/                      # Static assets and images
│   │   ├── Arbitrary Kit Art.png    # Product images
│   │   ├── beatpack.png            # Product images
│   │   └── navbar-texture.png      # UI background texture
│   ├── src/                         # Source code
│   │   ├── components/              # React components
│   │   │   ├── App.js              # Main application component
│   │   │   ├── Home.js             # Homepage with trending products
│   │   │   ├── Products.js         # Product catalog with 5-column grid
│   │   │   ├── ProductCard.js      # Individual product card with checkout
│   │   │   ├── CartPage.js         # Smart scaling shopping cart (uses CartContext)
│   │   │   ├── CartContext.js      # Cart state management (add, remove, update, clear)
│   │   │   ├── Support.js          # Customer support page
│   │   │   ├── Navigation.js       # Enhanced navigation bar
│   │   │   ├── SearchBar.js        # Search bar component for product filtering
│   │   │   ├── StripeCheckout.js   # Stripe payment processing
│   │   │   └── StripeCheckoutButton.js # Rapid checkout buttons
│   │   ├── hooks/                  # Custom React hooks
│   │   │   ├── useProducts.js      # Product data fetching
│   │   │   ├── usePurchaseHistory.js # Purchase history integration
│   │   │   ├── useErrorHandler.js  # Error state management
│   │   │   └── useSearch.js        # Search functionality (optional, not required for basic search bar)
│   │   ├── contexts/               # React context providers
│   │   │   ├── AuthContext.js      # User authentication
│   │   │   ├── SearchContext.js    # Search state management
│   │   │   └── ServiceContext.js   # API service context
│   │   ├── styles/                 # CSS stylesheets
│   │   │   ├── App.css             # Main application & navigation styles
│   │   │   ├── Home.css            # Homepage grid layout
│   │   │   ├── Products.css        # 5-column responsive grid
│   │   │   ├── CartPage.css        # Smart cart scaling styles
│   │   │   ├── Support.css         # Support page styling
│   │   │   ├── shared-utilities.css # Design tokens & utilities
│   │   │   └── fonts/              # Custom brand fonts
│   │   │       ├── freeday/        # Freeday font files
│   │   │       └── blackcraft/     # Blackcraft font files
│   │   ├── config/                 # Configuration files
│   │   │   └── navigation.js       # Navigation configuration
│   │   └── services/               # API service modules
│   │       └── ProductService.js   # Product API integration
│   ├── package.json                # Frontend dependencies
│   └── package-lock.json           # Dependency lock file
├── app.py                          # Flask backend server
├── userService.py                  # User authentication service
├── Products.csv                    # Product catalog data
├── userAccounts.csv                # User account data
├── userPurchaseHistory.csv         # Purchase history for trending
├── package.json                    # Root package configuration
├── requirements.txt                # Python dependencies (generated)
└── README.md                       # This documentation
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher) - JavaScript runtime
- **npm** (v6 or higher) - Package manager
- **Python** (v3.8 or higher) - Backend runtime
- **pip** - Python package manager
- **Stripe Account** - For payment processing

### Quick Installation

#### Option 1: Using Dependencies File (Recommended)
```bash
# Clone the repository
git clone https://github.com/robP22/FractalSonics.git
cd FractalSonics

# Install all dependencies at once
npm run install-all
```

#### Option 2: Manual Installation
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

Create a `.env` file in the `my-app` directory:
```env
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here
REACT_APP_API_URL=http://localhost:5000
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
- **Dark Mode Scrollbars**: Cross-browser custom scrollbar styling

### Visual Design
- **5-Column Grid**: Optimized for 1440px+ screens (MacBook Pro 15.4")
- **Smart Scaling**: Product cards adapt based on cart size
- **Luxury Styling**: High-end typography with letter-spacing and weight variations
- **Consistent Spacing**: Optimized padding (banner: 20px top, 60px bottom)
- **Image Consistency**: object-fit: cover ensures uniform product display

### Color Scheme
- **Primary Gradient**: Black to purple (`#000000` to `#764ba2`)
- **Accent Colors**: Blue (`#007bff`) for interactive elements
- **Status Colors**: Green for success, red for errors, orange for trending

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

## 🔧 API Integration

### Backend Endpoints
- `GET /api/products` - Fetch all products with image URLs
- `POST /api/checkout` - Order processing with customer data (cart and customer info)
- (Other endpoints: `/api/purchase-history`, `/api/login`, `/api/register`)

### Data Structure
```json
{
  "id": 1,
  "title": "robP Beat Pack",
  "description": "High-quality beats and loops",
  "price": 20.00,
  "category": "Beat Packs",
  "image_url": "/beatpack.png"
  // ...other fields (tags, download_link, etc.)
}
```

## 📱 Responsive Breakpoints

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

## 📚 Documentation

### Additional Resources
- **DEPENDENCIES.md**: Complete dependency installation guide
- **requirements.txt**: Python backend dependencies
- **package.json**: NPM scripts and frontend dependencies

### Recent Updates
- Added SearchBar component and searchTerm state for real-time product filtering
- Implemented CartContext, CartPage, and CheckoutPage for cart and checkout functionality
- Cleaned up codebase for redundant imports and improved prop passing

### Component Documentation
Each component includes:
- JSDoc comments for functions
- CSS class naming conventions
- Responsive design considerations
- Accessibility features

## 🔗 Links & Resources

- **Repository**: [GitHub - FractalSonics](https://github.com/robP22/FractalSonics)
- **React Documentation**: [React.js](https://reactjs.org/docs)
- **Flask Documentation**: [Flask](https://flask.palletsprojects.com/)
- **Stripe Integration**: [Stripe React](https://stripe.com/docs/stripe-js/react)

---

**Built with ❤️ for music producers and beat makers**

### Mobile Optimizations
- Touch-friendly button sizes
- Simplified navigation
- Optimized form layouts
- Compressed content spacing

## 🚀 Deployment

### Frontend Deployment
```bash
cd my-app
npm run build
# Deploy build folder to your hosting service
```

### Backend Deployment
- Configure your Python/Flask server
- Set up database connections
- Configure Stripe webhook endpoints

## 🤝 Contributing

1. Currently not accepting contributions.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Stripe** - For secure payment processing
- **Community** - For inspiration and support

## 📞 Support

For support, email support@fractalsonics.com or visit our support page.

---

**Built with ❤️ by the Fractal Sonics Team**
