import React from 'react';

export default function StripeCheckoutButton({ product, className }) {
    const handleCheckout = () => {
        // Your Stripe logic here
        alert(`Rapid checkout for ${product.title}`);
    };

    return (
        <button className={className} onClick={handleCheckout}>
            Rapid Checkout
        </button>
    );
}