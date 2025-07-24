import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext';
import { SearchProvider } from '../contexts/SearchContext';
import { ServiceProvider } from '../contexts/ServiceContext';
import { AuthProvider } from '../contexts/AuthContext';
import Home from './Home';
import Products from './Products';
import CartPage from './CartPage';
import Support from './Support';
import Account from './Account';
import Navigation from './Navigation';
import '../styles/App.css';
import '../styles/accessibility.css';

function AppContent() {
  return (
    <div className="fractal-sonics-app-main-container">
      <div className="fractal-sonics-welcome-banner-fullwidth">
        <h1 className="fractal-sonics-welcome-banner-title">Welcome to Fractal Sonics</h1>
        <p className="fractal-sonics-welcome-banner-subtitle">The go-to site for unique sounds!</p>
      </div>

      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/support" element={<Support />} />
        <Route path="/cart" element={<CartPage />} />
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
