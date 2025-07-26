import React, { useState } from 'react';

export default function StripeCheckoutButton({ product, className }) {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);
        
        try {
            // Create checkout session for single product
            const response = await fetch('http://localhost:5000/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    cart_items: [{
                        ...product,
                        quantity: 1
                    }]
                }),
            });

            const data = await response.json();

            if (data.error) {
                alert(`Error: ${data.error}`);
                return;
            }

            // Redirect to Stripe checkout
            window.location.href = data.url;
            
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Failed to start checkout. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button 
            className={className} 
            onClick={handleCheckout}
            disabled={loading}
        >
            {loading ? 'Loading...' : 'Rapid Checkout'}
        </button>
    );
}