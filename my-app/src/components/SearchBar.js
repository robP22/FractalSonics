import React, { useState } from "react";
import '../styles/SearchBar.css';

export default function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
    const [inputValue, setInputValue] = useState(searchTerm);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearch = () => {
        setSearchTerm(inputValue);
        if (onSearch) {
            onSearch(inputValue);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="fractal-sonics-search-bar-container">
            <label htmlFor="product-search" className="sr-only">
                Search products
            </label>
            <input
                id="product-search"
                name="search"
                type="text"
                placeholder="Search products..."
                value={inputValue}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className="fractal-sonics-search-input-field"
                autoComplete="search"
                aria-label="Search products"
            />
            <button 
                onClick={handleSearch}
                className="fractal-sonics-search-submit-button"
                aria-label="Submit search"
            >
                Search
            </button>
        </div>
    );
}