import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from './CartContext';
import { useSearch } from '../contexts/SearchContext';
import SearchBar from './SearchBar';
import { navigationItems, shouldShowSearch } from '../config/navigation';
import { useAuth } from '../contexts/AuthContext';

export default function Navigation() {
    const location = useLocation();
    const { cart } = useCart();
    const { searchTerm, setSearchTerm, handleSearch } = useSearch();
    const { isAuthenticated } = useAuth();
    
    const showSearchBar = shouldShowSearch(location.pathname);
    const mainNavItems = navigationItems.filter(item => 
        !['cart', 'account'].includes(item.path.slice(1))
    );

    return (
        <div className="fractal-sonics-main-navigation-bar">
            <div className="fractal-sonics-search-bar-container-left">
                {location.pathname === '/cart' ? (
                    <h1 className="fractal-sonics-cart-page-logo" data-text="Fractal Sonics">
                        Fractal Sonics
                    </h1>
                ) : showSearchBar ? (
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        onSearch={handleSearch}
                    />
                ) : null}
            </div>
            
            <nav className="fractal-sonics-navigation-tiles-center-group">
                {mainNavItems.map(({ path, label }) => (
                    <Link
                        key={path}
                        to={path}
                        className={`fractal-sonics-navigation-tile-button ${
                            location.pathname === path ? 'fractal-sonics-navigation-tile-button-active' : ''
                        }`}
                    >
                        {label}
                    </Link>
                ))}
            </nav>
            
            <div className="fractal-sonics-user-icons-container-right">
                <Link to="/account" className="fractal-sonics-account-icon-link">
                    <div className={`fractal-sonics-account-icon-button ${
                        isAuthenticated ? 'logged-in' : ''
                    }`}>
                        👤
                        {isAuthenticated && (
                            <span className='auth-indicator-dot'></span>
                        )}
                    </div>
                </Link>
                <Link to="/cart" className="fractal-sonics-cart-icon-link">
                    <div className="fractal-sonics-cart-icon-button">
                        🛒
                        {cart.length > 0 && (
                            <span className="fractal-sonics-cart-item-count-badge">{cart.length}</span>
                        )}
                    </div>
                </Link>
            </div>
        </div>
    );
}