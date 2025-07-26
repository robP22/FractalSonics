import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

export default function StripeCheckoutButton({ product, className = "" }) {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const handleRapidCheckout = () => {
        // Add product to cart
        addToCart(product);
        
        // Navigate to cart page with auto-checkout flag
        navigate('/cart', { state: { autoCheckout: true } });
    };

    return (
        <button
            onClick={handleRapidCheckout}
            className={`rapid-checkout-btn ${className}`}
        >
            Buy Now
        </button>
    );
}
