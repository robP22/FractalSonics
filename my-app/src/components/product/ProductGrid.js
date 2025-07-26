import React from 'react';
import ProductCard from './ProductCard';

/**
 * Reusable product grid component with consistent styling and behavior
 * 
 * @param {Array} products - Array of product objects to display
 * @param {string} className - Additional CSS classes to apply to the grid
 * @param {string} emptyMessage - Message to display when no products are available
 * @param {string} searchTerm - Current search term (used for contextual empty messages)
 * @param {string} gridClass - Base CSS class for the grid container
 * @returns {React.ReactElement} The rendered product grid
 */
export default function ProductGrid({ 
  products = [], 
  className = '', 
  emptyMessage = 'No products available',
  searchTerm = '',
  gridClass = 'product-grid'
}) {
  const getEmptyText = () => {
    if (searchTerm) {
      return `No products found for "${searchTerm}"`;
    }
    return emptyMessage;
  };

  return (
    <div className={`${gridClass} ${className}`.trim()}>
      {products.length > 0 ? (
        products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <div className="no-products-message empty-state">
          {getEmptyText()}
        </div>
      )}
    </div>
  );
}