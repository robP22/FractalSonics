import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart, getCartItemCount } from '../../contexts/CartContext';
import { useSearch } from '../../contexts/SearchContext';
import { SearchBar } from '../ui';
import { navigationItems, shouldShowSearch } from '../../config/navigation';
import { useAuth } from '../../contexts/AuthContext';

export default function Navigation() {
    const location = useLocation();
    const { cart } = useCart();
    const { searchTerm, setSearchTerm, search } = useSearch();
    const { isAuthenticated } = useAuth();
    
    const showSearchBar = shouldShowSearch(location.pathname);
    const mainNavItems = navigationItems.filter(item => 
        !['cart', 'account'].includes(item.path.slice(1))
    );

    return (
        <div className="main-nav">
            <div className="nav-search">
                {location.pathname === '/cart' ? (
                    <h1 className="cart-logo" data-text="Fractal Sonics">
                        Fractal Sonics
                    </h1>
                ) : showSearchBar ? (
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        onSearch={search}
                    />
                ) : null}
            </div>
            
            <nav className="nav-center">
                {mainNavItems.map(({ path, label }) => (
                    <Link
                        key={path}
                        to={path}
                        className={`nav-button ${
                            location.pathname === path ? 'nav-button-active' : ''
                        }`}
                    >
                        {label}
                    </Link>
                ))}
            </nav>
            
            <div className="nav-actions">
                <Link to="/account" className="account-link">
                    <div className={`account-icon ${
                        isAuthenticated ? 'logged-in' : ''
                    }`}>
                        👤
                        {isAuthenticated && (
                            <span className='auth-indicator-dot'></span>
                        )}
                    </div>
                </Link>
                <Link to="/cart" className="cart-link">
                    <div className="cart-icon">
                        🛒
                        {getCartItemCount(cart) > 0 && (
                            <span className="cart-badge">
                                {getCartItemCount(cart)}
                            </span>
                        )}
                    </div>
                </Link>
            </div>
        </div>
    );
}