import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchContext = createContext();

export function SearchProvider({ children }) {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (term) => {
        setSearchTerm(term);
        if (term.trim()) {
            navigate('/products');
        }
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    return (
        <SearchContext.Provider value={{
            searchTerm,
            setSearchTerm,
            handleSearch,
            clearSearch
        }}>
            {children}
        </SearchContext.Provider>
    );
}

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within SearchProvider');
    }
    return context;
};