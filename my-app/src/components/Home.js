import React, { useCallback } from "react";
import ProductCard from './ProductCard';
import { useProducts } from '../hooks/useProducts';
import { useErrorHandler } from '../hooks/useErrorHandler';
import ErrorMessage from './ErrorMessage';
import LoadingSpinner from './LoadingSpinner';
import '../styles/Home.css';

export default function Home() {
    const { error, handleError, clearError } = useErrorHandler();
    
    const onError = useCallback((err) => {
        handleError('Failed to load featured products. Make sure Flask backend is running on port 5000.', err);
    }, [handleError]);
    
    const { products: newProducts, loading } = useProducts(
        true, 
        5, 
        onError
    );



    return (
        <div className="fractal-sonics-home-page-container">
            <ErrorMessage message={error} onClose={clearError} />
            
            <section className="fractal-sonics-new-products-section">
                <h2 className="fractal-sonics-new-products-section-title">New Products</h2>
                
                {loading ? (
                    <LoadingSpinner message="Loading featured products..." />
                ) : newProducts && newProducts.length > 0 ? (
                    <div className="fractal-sonics-new-products-horizontal-scroll">
                        {newProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="no-products-message">
                        No featured products available. Check if the Flask backend is running.
                    </div>
                )}
            </section>
        </div>
    );
}