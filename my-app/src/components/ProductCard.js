import React from 'react';
import { useCart } from './CartContext';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    
    return (
        <div className="fractal-sonics-product-card-container">
            <div className="fractal-sonics-product-image-frame">
                <img
                    src={product.image_url || ''}
                    alt={product.title}
                    className="fractal-sonics-product-image-display"
                />
            </div>
            <div className="fractal-sonics-product-info-container">
                <h2 className="fractal-sonics-product-title-heading">{product.title}</h2>
                <p className="fractal-sonics-product-description-text">{product.description}</p>
                <p className="fractal-sonics-product-category-text">Category: {product.category}</p>
                <div className="fractal-sonics-product-price-cart-row">
                    <span className="fractal-sonics-product-price-display">${product.price}</span>
                    <button onClick={() => addToCart(product)} className="fractal-sonics-add-to-cart-button">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}