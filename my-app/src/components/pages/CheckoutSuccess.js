import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

export default function CheckoutSuccess() {
    const [searchParams] = useSearchParams();
    const [sessionId, setSessionId] = useState('');
    const { clearCart } = useCart();

    useEffect(() => {
        const session_id = searchParams.get('session_id');
        if (session_id) {
            setSessionId(session_id);
            // Clear the cart after successful payment
            clearCart();
        }
    }, [searchParams, clearCart]);

    return (
        <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            maxWidth: '600px', 
            margin: '0 auto' 
        }}>
            <div style={{
                backgroundColor: '#d4edda',
                color: '#155724',
                padding: '20px',
                borderRadius: '8px',
                border: '1px solid #c3e6cb',
                marginBottom: '20px'
            }}>
                <h1>🎉 Payment Successful!</h1>
                <p>Thank you for your purchase from Fractal Sonics!</p>
                {sessionId && (
                    <p style={{ fontSize: '0.9em', opacity: '0.8' }}>
                        Order ID: {sessionId}
                    </p>
                )}
            </div>
            
            <div style={{ marginTop: '30px' }}>
                <p>Your digital sound files will be available for download shortly.</p>
                <p>A confirmation email has been sent to your email address.</p>
            </div>

            <div style={{ marginTop: '30px' }}>
                <Link 
                    to="/" 
                    style={{
                        display: 'inline-block',
                        padding: '12px 24px',
                        backgroundColor: '#764ba2',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '8px',
                        marginRight: '10px'
                    }}
                >
                    Continue Shopping
                </Link>
                <Link 
                    to="/account" 
                    style={{
                        display: 'inline-block',
                        padding: '12px 24px',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '8px'
                    }}
                >
                    View Account
                </Link>
            </div>
        </div>
    );
}