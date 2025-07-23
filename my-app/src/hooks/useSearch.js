import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Centralized search state management hook
 * Reduces coupling between App, Navigation, and page components
 */
export function useSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = useCallback((term) => {
        setSearchTerm(term);
        navigate('/products');
    }, [navigate]);

    const clearSearch = useCallback(() => {
        setSearchTerm('');
    }, []);

    return {
        searchTerm,
        setSearchTerm,
        handleSearch,
        clearSearch
    };
}