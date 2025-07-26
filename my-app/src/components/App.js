import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from '../contexts/CartContext';
import { SearchProvider } from '../contexts/SearchContext';
import { ServiceProvider } from '../contexts/ServiceContext';
import { AuthProvider } from '../contexts/AuthContext';
import { Home, Products, CartPage, CheckoutSuccess, Support, Account } from './pages';
import { Navigation } from './layout';
import '../styles/shared-utilities.css';
import '../styles/App.css';
import '../styles/accessibility.css';

function AppContent() {
  const location = useLocation();
  const isCartPage = location.pathname === '/cart';
  
  return (
    <div className={`fractal-sonics-app-main-container ${isCartPage ? 'cart-page' : ''}`}>
      <div className="fractal-sonics-welcome-banner-fullwidth">
        <h1 className="fractal-sonics-welcome-banner-title" data-text="Fractal Sonics">
          Fractal Sonics
        </h1>
        <p className="fractal-sonics-welcome-banner-subtitle">The premier marketplace for unique sounds!</p>
      </div>

      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/support" element={<Support />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/success" element={<CheckoutSuccess />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ServiceProvider>
          <CartProvider>
            <SearchProvider>
              <AppContent />
            </SearchProvider>
          </CartProvider>
        </ServiceProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
