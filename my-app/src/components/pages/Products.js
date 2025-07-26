import React, { useCallback } from 'react';
import { ProductGrid } from '../product';
import { Message, LoadingSpinner } from '../ui';
import { useProducts } from '../../hooks/useProducts';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useSearch } from '../../contexts/SearchContext';
import '../../styles/Products.css';

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
        <div className="products-page">
            {error && (
                <Message message={error} type="error" onClose={clearError} />
            )}
            
            {loading ? (
                <LoadingSpinner message="Loading products..." />
            ) : (
                <ProductGrid 
                    products={products}
                    className="products-grid"
                    gridClass=""
                    searchTerm={searchTerm}
                    emptyMessage="No products available"
                />
            )}
        </div>
    );
}