import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { useCart } from '../../contexts/CartContext';
import '../../styles/StripeCheckout.css';

// Replace with your actual Stripe publishable key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_stripe_publishable_key_here');

const CheckoutForm = ({ total, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, clearCart } = useCart();
  const [processing, setProcessing] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: {
      line1: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'US'
    }
  });

  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setCustomerInfo(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setCustomerInfo(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    try {
      // Create payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: customerInfo.name,
          email: customerInfo.email,
          address: customerInfo.address
        }
      });

      if (error) {
        console.error('Error creating payment method:', error);
        onError(error.message);
        setProcessing(false);
        return;
      }

      // Create payment intent on your backend
      const response = await fetch('http://localhost:5000/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          amount: Math.round(total * 100), // Convert to cents
          currency: 'usd',
          payment_method_id: paymentMethod.id,
          customer_info: customerInfo,
          cart_items: cart
        }),
      });

      const paymentIntent = await response.json();

      if (paymentIntent.error) {
        onError(paymentIntent.error);
        setProcessing(false);
        return;
      }

      // Check if this is a demo payment (for development/testing)
      const isDemoPayment = paymentIntent.client_secret && paymentIntent.client_secret.includes('pi_demo');
      
      if (isDemoPayment) {
        // Simulate a successful demo payment
        console.log('Demo payment detected, simulating success...');
        setTimeout(() => {
          clearCart();
          onSuccess('Demo payment successful! Thank you for your test purchase.');
          setProcessing(false);
        }, 1000); // Add a small delay to simulate processing
        return;
      }

      // Confirm payment with real Stripe
      const { error: confirmError } = await stripe.confirmCardPayment(
        paymentIntent.client_secret,
        {
          payment_method: paymentMethod.id
        }
      );

      if (confirmError) {
        onError(confirmError.message);
      } else {
        // Payment succeeded - now confirm with backend to save purchase history
        try {
          const confirmResponse = await fetch('http://localhost:5000/api/confirm-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
              payment_intent_id: paymentIntent.client_secret.split('_secret_')[0], // Extract payment intent ID
              customer_info: customerInfo,
              cart_items: cart,
              amount: Math.round(total * 100) // Amount in cents
            }),
          });

          const confirmResult = await confirmResponse.json();
          
          if (confirmResult.success) {
            clearCart();
            onSuccess(`Payment successful! Thank you for your purchase. Order ID: ${confirmResult.order_id}`);
          } else {
            // Payment went through Stripe but failed to save locally
            clearCart();
            onSuccess('Payment successful, but there was an issue saving your order. Please contact support.');
          }
        } catch (backendError) {
          console.error('Error confirming payment with backend:', backendError);
          clearCart();
          onSuccess('Payment successful, but there was an issue saving your order. Please contact support.');
        }
      }
    } catch (err) {
      console.error('Payment error:', err);
      onError('An unexpected error occurred. Please try again.');
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-checkout-form">
      <div className="customer-info-section">
        <h3>Customer Information</h3>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="customer-name">Full Name *</label>
            <input
              id="customer-name"
              type="text"
              name="name"
              placeholder="Full Name"
              value={customerInfo.name}
              onChange={handleCustomerInfoChange}
              required
              className="form-input"
              autoComplete="name"
              aria-describedby="customer-name-help"
            />
          </div>
          <div className="form-group">
            <label htmlFor="customer-email">Email Address *</label>
            <input
              id="customer-email"
              type="email"
              name="email"
              placeholder="Email Address"
              value={customerInfo.email}
              onChange={handleCustomerInfoChange}
              required
              className="form-input"
              autoComplete="email"
              aria-describedby="customer-email-help"
            />
          </div>
        </div>
        
        <h4>Billing Address</h4>
        <div className="form-group">
          <label htmlFor="address-line1">Address Line 1 *</label>
          <input
            id="address-line1"
            type="text"
            name="address.line1"
            placeholder="Address Line 1"
            value={customerInfo.address.line1}
            onChange={handleCustomerInfoChange}
            required
            className="form-input"
            autoComplete="address-line1"
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="address-city">City *</label>
            <input
              id="address-city"
              type="text"
              name="address.city"
              placeholder="City"
              value={customerInfo.address.city}
              onChange={handleCustomerInfoChange}
              required
              className="form-input"
              autoComplete="address-level2"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address-state">State *</label>
            <input
              id="address-state"
              type="text"
              name="address.state"
              placeholder="State"
              value={customerInfo.address.state}
              onChange={handleCustomerInfoChange}
              required
              className="form-input"
              autoComplete="address-level1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address-postal">ZIP Code *</label>
            <input
              id="address-postal"
              type="text"
              name="address.postal_code"
              placeholder="ZIP Code"
              value={customerInfo.address.postal_code}
              onChange={handleCustomerInfoChange}
              required
              className="form-input"
              autoComplete="postal-code"
            />
          </div>
        </div>
      </div>

      <div className="payment-section">
        <h3>Payment Information</h3>
        <div className="card-element-container">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || processing}
        className="stripe-pay-button"
      >
        {processing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
      </button>
    </form>
  );
};

const StripeCheckout = ({ total, onSuccess, onError }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm total={total} onSuccess={onSuccess} onError={onError} />
    </Elements>
  );
};

export default StripeCheckout;