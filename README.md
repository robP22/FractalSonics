# Fractal Sonics 🎵

A modern e-commerce web application for unique sound products, built with React and integrated with Stripe for secure payments.

## 🚀 Features

### 🛍️ E-commerce Functionality
- **Product Catalog** - Browse and search through unique sound products
- **Shopping Cart** - Add, remove, and manage items with real-time updates
- **Secure Checkout** - Stripe integration for safe payment processing
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

### 🎨 User Interface
- **Modern Design** - Clean, professional interface with gradient themes
- **Navigation Tiles** - Square, modern navigation buttons
- **Search Functionality** - Real-time product search on Home and Products pages
- **Cart Management** - Visual cart icon with item count badge

### 🛒 Shopping Experience
- **Auto-removal** - Items automatically removed when quantity reaches zero
- **Removal Notifications** - 3-second confirmation messages
- **Horizontal Product Display** - Featured "New Products" section on homepage
- **Side-by-side Cart Layout** - Cart items on left, checkout on right

### 📱 Pages & Components
- **Home Page** - Welcome banner with featured new products
- **Products Page** - Full product catalog with search and filtering
- **Cart Page** - Complete cart management with Stripe checkout
- **Support Page** - Customer service form with FAQ section
- **Account Management** - User account access (placeholder)

## 🛠️ Technology Stack

### Frontend
- **React** - Modern JavaScript library for building user interfaces
- **React Router** - Client-side routing for single-page application
- **CSS3** - Custom styling with descriptive class naming convention
- **Responsive Design** - Mobile-first approach with flexbox layouts

### Payment Processing
- **Stripe** - Secure payment processing with React Stripe.js
- **@stripe/stripe-js** - Official Stripe JavaScript SDK
- **@stripe/react-stripe-js** - React components for Stripe Elements

### Backend Integration
- **REST API** - Connects to backend server for product data
- **JSON** - Data exchange format for API communication

## 📁 Project Structure

```
FractalSonics/
├── my-app/                          # React application
│   ├── public/                      # Static assets
│   ├── src/                         # Source code
│   │   ├── components/              # React components
│   │   │   ├── App.js              # Main application component
│   │   │   ├── Home.js             # Homepage with new products
│   │   │   ├── Products.js         # Product catalog page
│   │   │   ├── CartPage.js         # Shopping cart management
│   │   │   ├── Support.js          # Customer support page
│   │   │   ├── SearchBar.js        # Search functionality
│   │   │   ├── StripeCheckout.js   # Payment processing
│   │   │   └── CartContext.js      # Cart state management
│   │   ├── styles/                 # CSS stylesheets
│   │   │   ├── App.css             # Main application styles
│   │   │   ├── Home.css            # Homepage styles
│   │   │   ├── Products.css        # Product page styles
│   │   │   ├── CartPage.css        # Cart page styles
│   │   │   ├── Support.css         # Support page styles
│   │   │   ├── SearchBar.css       # Search component styles
│   │   │   └── StripeCheckout.css  # Checkout form styles
│   │   └── index.js                # Application entry point
│   ├── package.json                # Dependencies and scripts
│   └── README.md                   # React app documentation
├── app.py                          # Backend server (Python/Flask)
├── Products.csv                    # Product data
├── package.json                    # Root package configuration
└── README.md                       # This file
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Python** (for backend server)
- **Stripe Account** (for payment processing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/robP22/FractalSonics.git
   cd FractalSonics
   ```

2. **Install frontend dependencies**
   ```bash
   cd my-app
   npm install
   ```

3. **Install Stripe dependencies**
   ```bash
   npm install @stripe/stripe-js @stripe/react-stripe-js
   ```

4. **Configure Stripe**
   - Update `my-app/src/StripeCheckout.js` with your Stripe publishable key
   - Set up backend endpoint for payment processing

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Start the backend server**
   ```bash
   python app.py
   ```

### Environment Setup

Create a `.env` file in the `my-app` directory:
```env
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here
REACT_APP_API_URL=http://localhost:5000
```

## 🎨 Design Features

### CSS Naming Convention
All CSS classes follow a descriptive naming pattern:
- `fractal-sonics-[component]-[element]-[modifier]`
- Example: `fractal-sonics-navigation-tile-button-active`

### Color Scheme
- **Primary Gradient**: Purple to black (`#667eea` to `#764ba2`)
- **Accent Colors**: Blue (`#007bff`) for interactive elements
- **Status Colors**: Green for success, red for errors, yellow for warnings

### Typography
- **Headers**: Bold, large fonts for impact
- **Body Text**: Clean, readable fonts with proper line spacing
- **Interactive Elements**: Medium weight fonts for clarity

## 🛒 Cart Features

### Smart Cart Management
- **Auto-removal**: Items removed when quantity reaches zero
- **Real-time updates**: Instant price and count calculations
- **Visual feedback**: Confirmation messages for user actions
- **Persistent state**: Cart maintained across page navigation

### Checkout Process
1. **Review Items** - Left side cart display
2. **Checkout Summary** - Right side with totals
3. **Stripe Form** - Secure payment processing
4. **Confirmation** - Success/error messaging

## 🔧 API Integration

### Product Endpoints
- `GET /api/products` - Fetch all products
- `POST /api/create-payment-intent` - Process payments

### Data Format
```json
{
  "id": 1,
  "title": "Product Name",
  "description": "Product description",
  "price": 29.99,
  "category": "Category Name",
  "image_url": "https://example.com/image.jpg"
}
```

## 📱 Responsive Design

### Breakpoints
- **Desktop**: > 1024px - Full side-by-side layout
- **Tablet**: ≤ 1024px - Stacked layout
- **Mobile**: ≤ 768px - Single column with optimized spacing

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
