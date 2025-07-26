import { createContext, useContext, useState, useEffect } from 'react';

// Create a context for the cart state
const CartContext = createContext();

// CartProvider wraps app and provides cart state to components
export function CartProvider({ children }) {
  // Initialize cart from localStorage if available
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add item to cart (increase quantity if exists)
  const addToCart = (item) => {
    console.log('Adding to cart:', item);
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      console.log('Existing in cart:', existing);
      return existing
        ? prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...prev, { ...item, quantity: 1 }];
    });
  };

  // Remove item from cart by id
  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  // Update quantity of item in cart
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
  }
  
  // Remove all cart items
  const clearCart = () => setCart([]);

  // Provide cart state and actions to children
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// use cart context in components
export const useCart = () => useContext(CartContext);

export function getCartItemCount(cart) {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}