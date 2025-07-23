/**
 * ProductService - Centralized API service for product operations
 * Object-oriented approach to handle all product-related API calls
 */
class ProductService {
    constructor(baseURL = 'http://localhost:5000/api') {
        this.baseURL = baseURL;
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; //5 minutes * 60 minutes per hour * 1000 to convert to ms
    }

    /**
     * @param {string} cacheKey - key to check
     * @returns {Object|null} cached data if valid | null if expired/missing
     */
    getCachedData(cacheKey) {
        if (!this.cache.has(cacheKey)) {
            return null;
        }

        const cached = this.cache.get(cacheKey);
        const isExpired = Date.now() - cached.timestamp > this.cacheTimeout;

        if (isExpired) {
            this.cache.delete(cacheKey);
            return null;
        }

        return cached.data;
    }

    /**
     * @param {string} cacheKey
     * @param {any} data
     */
    setCachedData(cacheKey, data) {
        this.cache.set(cacheKey, {
            data: data,
            timestamp: Date.now()
        });
    }


    /**
     * Fetch all products from the API
     * @param {boolean} useCache - Whether to use cached data
     * @returns {Promise<Array>} Array of products
     */
    async getAllProducts(useCache = true) {
        const cacheKey = 'all_products';

        if (useCache) {
            const cachedData = this.getCachedData(cacheKey);
            if (cachedData) {
    
                return cachedData;
            }
        }
        try {
            const response = await fetch(`${this.baseURL}/products`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const products = await response.json();

            this.setCachedData(cacheKey, products);

            return products;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }

    /**
     * Get featured/new products (first N products)
     * @param {number} count - Number of products to return
     * @returns {Promise<Array>} Array of featured products
     */
    async getFeaturedProducts(count = 5) {
        try {
            const products = await this.getAllProducts();
            return products.slice(0, count);
        } catch (error) {
            console.error('Error fetching featured products:', error);
            throw error;
        }
    }

    /**
     * Search products by term
     * @param {Array} products - Array of products to search
     * @param {string} searchTerm - Search term
     * @returns {Array} Filtered products
     */
    searchProducts(products, searchTerm) {
        if (!searchTerm || searchTerm.trim() === '') {
            return products;
        }

        const term = searchTerm.toLowerCase();
        return products.filter(product =>
            product.title.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term) ||
            product.category.toLowerCase().includes(term)
        );
    }

    /**
     * Get product by ID
     * @param {string|number} id - Product ID
     * @returns {Promise<Object|null>} Product object or null if not found
     */
    async getProductById(id) {
        try {
            const products = await this.getAllProducts();
            return products.find(product => product.id === id) || null;
        } catch (error) {
            console.error('Error fetching product by ID:', error);
            throw error;
        }
    }
}

// Export the class for dependency injection
export default ProductService;