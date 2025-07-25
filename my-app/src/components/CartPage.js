import React, { useState } from 'react';
import { useCart } from './CartContext';
import StripeCheckout from './StripeCheckout';
import '../styles/CartPage.css';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [removalMessage, setRemovalMessage] = useState('');

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // Determine cart size class for responsive scaling
  const getCartSizeClass = () => {
    const itemCount = cart.length;
    if (itemCount <= 2) return 'cart-size-small';
    if (itemCount <= 5) return 'cart-size-medium';
    if (itemCount <= 8) return 'cart-size-large';
    return 'cart-size-xlarge';
  };
  
  const shouldShowImages = cart.length <= 5;

  const handleCheckoutSuccess = (successMessage) => {
    setMessage(successMessage);
    setMessageType('success');
    setShowCheckout(false);
    // Clear message after 5 seconds
    setTimeout(() => setMessage(''), 5000);
  };

  const handleCheckoutError = (errorMessage) => {
    setMessage(errorMessage);
    setMessageType('error');
    // Clear message after 5 seconds
    setTimeout(() => setMessage(''), 5000);
  };

  if (cart.length === 0) {
    return (
      <div className='cart-tile'>
        <div className="empty-cart">
          <h2>Your Cart</h2>
          <p>Your cart is empty.</p>
          {message && (
            <div className={`message ${messageType}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className='cart-page-container'>
      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}

      {removalMessage && (
        <div className="message removal-message">
          {removalMessage}
        </div>
      )}

      <div className="cart-content-layout">
        {/* Left side - Cart Items */}
        <div className='cart-items-section'>
          <div className='cart-tile'>
            <h2>Your Cart</h2>
            <ul className={`cart-item-list ${getCartSizeClass()}`}>
              {cart.map(item => {
                console.log('Cart item id:', item.id, 'Type:', typeof item.id);
                return (
                  <li key={item.id} className='cart-item-tile'>
                    <div className='cart-item-left'>
                      <p className="cart-item-title">{item.title}</p>
                      {shouldShowImages && (
                        <img src={item.image_url} alt={item.title} className='cart-image-frame' />
                      )}
                      <p className="cart-item-description">{item.description}</p>
                    </div>
                    <div className='cart-item-right'>
                      <label htmlFor={`quantity-${item.id}`}>Qty.</label>
                      <input
                        id={`quantity-${item.id}`}
                        name={`quantity-${item.id}`}
                        type="number"
                        min="0"
                        value={item.quantity}
                        onChange={e => {
                          const qty = Number(e.target.value);
                          if (qty <= 0) {
                            setRemovalMessage(`${item.title} has been removed from your cart`);
                            removeFromCart(item.id);
                            // Clear removal message after 3 seconds
                            setTimeout(() => setRemovalMessage(''), 3000);
                          } else {
                            updateQuantity(item.id, qty);
                          }
                        }}
                        autoComplete="off"
                        aria-label={`Quantity for ${item.title}`}
                      />
                      <p>{formatter.format(item.price * item.quantity)}</p>
                      <button onClick={() => removeFromCart(item.id)} className='remove-from-cart-btn'>Remove</button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="clear-cart-section">
              <button onClick={clearCart} className='clear-cart-btn'>
                Clear Cart
              </button>
            </div>
          </div>
        </div>

        {/* Right side - Checkout Section */}
        <div className="checkout-sidebar">
          {showCheckout ? (
            <div className="checkout-section">
              <h2>Checkout</h2>
              <StripeCheckout
                total={total}
                onSuccess={handleCheckoutSuccess}
                onError={handleCheckoutError}
              />
            </div>
          ) : (
            <div className="checkout-placeholder">
              <h3>Ready to checkout?</h3>
              <p>Click "Proceed to Checkout" to complete your purchase.</p>

              <div className="checkout-summary">
                <p><strong>Items: {cart.reduce((sum, item) => sum + item.quantity, 0)}</strong></p>
                <p><strong>Total: {formatter.format(total)}</strong></p>
              </div>

              <div className="cart-actions">
                <button
                  onClick={() => setShowCheckout(!showCheckout)}
                  className='checkout-btn'
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}