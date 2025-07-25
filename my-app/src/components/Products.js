import React, { useCallback } from 'react';
import ProductCard from './ProductCard';
import { useProducts } from '../hooks/useProducts';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { useSearch } from '../contexts/SearchContext';
import ErrorMessage from './ErrorMessage';
import LoadingSpinner from './LoadingSpinner';
import '../styles/Products.css';

export default function Products() {
    const { error, handleError, clearError } = useErrorHandler();
    const { searchTerm } = useSearch();
    
    const onError = useCallback((err) => {
        handleError('Failed to load products. Please try again later.', err);
    }, [handleError]);
    
    const { products, loading } = useProducts(
        false, 
        0, 
        onError
    );

    return (
        <div className="fractal-sonics-products-page-container">
            <ErrorMessage message={error} onClose={clearError} />
            
            {loading ? (
                <LoadingSpinner message="Loading products..." />
            ) : (
                <div className="fractal-sonics-products-grid-container">
                    {products.length > 0 ? (
                        products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <div className="fractal-sonics-no-products-message">
                            {searchTerm ? `No products found for "${searchTerm}"` : 'No products available'}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}