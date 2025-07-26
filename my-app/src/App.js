import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Home from './Home';
import Products from './Products';
import CartPage from './CartPage';
import SearchBar from './SearchBar';
import { useCart } from './CartContext';
import './App.css';

function AppContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = useCart();

  // Show search bar only on home and products pages
  const showSearchBar = location.pathname === '/home' || location.pathname === '/products';

  const handleSearch = (term) => {
    setSearchTerm(term);
    // Navigate to products page when searching
    if (location.pathname !== '/products') {
      navigate('/products');
    }
  };

  return (
    <div className="App">
      <div className="header-banner">
        <h1>Welcome to Fractal Sonics</h1>
        <p>The go-to site for unique sounds!</p>
      </div>
      <div className="nav-container">
        <div className="search-container">
          {showSearchBar && (
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onSearch={handleSearch}
            />
          )}
        </div>
        <nav className="nav-tiles">
          <Link
            to="/home"
            className={`nav-tile ${location.pathname === '/home' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`nav-tile ${location.pathname === '/products' ? 'active' : ''}`}
          >
            Products
          </Link>
          <Link
            to="/support"
            className={`nav-tile ${location.pathname === '/support' ? 'active' : ''}`}
          >
            Support
          </Link>
        </nav>
        <div className="cart-icon-container">
          <Link to="/account" className="account-icon-link">
            <div className="account-icon">
              👤
            </div>
          </Link>
          <Link to="/cart" className="cart-icon-link">
            <div className="cart-icon">
              🛒
              {cart.length > 0 && (
                <span className="cart-count">{cart.length}</span>
              )}
            </div>
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/home" element={<Home searchTerm={searchTerm} />} />
        <Route path="/products" element={<Products searchTerm={searchTerm} />} />
        <Route path="/support" element={<Support />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/account" element={<div style={{padding: '20px', textAlign: 'center'}}><h2>Account Page</h2><p>Coming Soon - User Account Management</p></div>} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
