import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { StripeCheckoutButton } from '../ui';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <div className="product-card">
            {product.trending && (
                <div className="trending-badge">Trending</div>
            )}
            <div className="product-image">
                <img
                    src={product.image_url || ''}
                    alt={product.title}
                    className="product-image-display"
                />
            </div>
            <div className="product-info">
                <h2 className="product-title">{product.title}</h2>
                <p className="product-description text-truncate-2">{product.description}</p>
                <p className="product-category">Category: {product.category}</p>
                <div className="product-actions">
                    <div className="product-buttons">
                        <button
                            onClick={() => addToCart(product)}
                            className="add-to-cart-btn"
                        >
                            Add to Cart
                        </button>
                        <StripeCheckoutButton
                            product={product}
                            className="checkout-btn"
                        />
                    </div>
                    <span className="product-price">${product.price}</span>
                </div>
            </div>
        </div>
    );
}