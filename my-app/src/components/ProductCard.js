import React from 'react';
import { useCart } from './CartContext';
import StripeCheckoutButton from './StripeCheckoutButton';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <div className="fractal-sonics-product-card-container">
            {product.trending && (
                <div className="fractal-sonics-trending-banner">Trending</div>
            )}
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
                    <button
                        onClick={() => addToCart(product)}
                        className="fractal-sonics-add-to-cart-button"
                    >
                        Add to Cart
                    </button>
                    <StripeCheckoutButton
                        product={product}
                        className="fractal-sonics-checkout-btn"
                    />
                </div>
            </div>
        </div>
    );
}