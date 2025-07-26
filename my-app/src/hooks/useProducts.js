import { useState, useEffect, useMemo } from 'react';
import { useServices } from '../contexts/ServiceContext';
import { useSearch } from '../contexts/SearchContext';

/**
 * @param {boolean} featuredOnly
 * @param {number} count
 * @param {Function} onError - Error callback
 * @returns {Object} { products, loading, error }
 */
export function useProducts(featuredOnly = false, count = 5, onError) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const { productService } = useServices();
    const { searchTerm } = useSearch();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = featuredOnly
                    ? await productService.getFeaturedProducts(count)
                    : await productService.getAllProducts();

                setProducts(data);
            } catch (err) {
                setError('Failed to load products. Please try again later.');
                if (onError) onError(err);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        
        fetchProducts();
    }, [featuredOnly, count, productService, onError]);
    
    const filteredProducts = useMemo(() => {
        if (!products.length) return products;
        return productService.searchProducts(products, searchTerm);
    }, [products, searchTerm, productService]);

    return {
        products: filteredProducts,
        loading,
        error,
        totalProducts: products.length
    };
}