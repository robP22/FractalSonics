import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export function useOneClickCheckout() {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const quickCheckout = (product) => {
        // Add product to cart
        addToCart(product);
        
        // Navigate to cart page with auto-checkout flag
        navigate('/cart', { state: { autoCheckout: true } });
    };

    return { quickCheckout };
}
