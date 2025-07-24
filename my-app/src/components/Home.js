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
        7, 
        onError
    );

    // Get trending products (random selection from all products)
    const { products: allProducts, loading: trendingLoading } = useProducts(
        false, 
        0, 
        onError
    );
    
    // Select random products for trending (different from new products)
    const trendingProducts = allProducts
        .filter(product => !newProducts.some(newProduct => newProduct.id === product.id))
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);



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

            <section className="fractal-sonics-trending-products-section">
                <h2 className="fractal-sonics-trending-products-section-title">Trending Products</h2>
                
                {trendingLoading ? (
                    <LoadingSpinner message="Loading trending products..." />
                ) : trendingProducts && trendingProducts.length > 0 ? (
                    <div className="fractal-sonics-trending-products-horizontal-scroll">
                        {trendingProducts.map(product => (
                            <ProductCard key={`trending-${product.id}`} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="no-products-message">
                        No trending products available.
                    </div>
                )}
            </section>
        </div>
    );
}