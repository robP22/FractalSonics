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

    const handleClear = () => {
        setInputValue('');
        setSearchTerm('');
        if (onSearch) {
            onSearch('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search-bar-container">
            <label htmlFor="product-search" className="sr-only">
                Search products
            </label>
            <button 
                onClick={handleSearch}
                className="search-submit-button"
                aria-label="Submit search"
                type="button"
            >
                Search
            </button>
            <div className="search-input-wrapper">
                <input
                    id="product-search"
                    name="search"
                    type="text"
                    placeholder="Search products..."
                    value={inputValue}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    className="search-input-field"
                    autoComplete="search"
                    aria-label="Search products"
                />
                {inputValue && (
                    <button 
                        onClick={handleClear}
                        className="search-clear-button"
                        aria-label="Clear search"
                        type="button"
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
}