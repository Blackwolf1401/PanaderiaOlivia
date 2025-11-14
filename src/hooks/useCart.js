import { useState } from 'react';

export function useCart() {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
    setCart(prevCart => {
        const existingItem = prevCart.find(item => item.id === product.id);
        if (existingItem) {
        return prevCart.map(item =>
            item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        }
        return [...prevCart, { ...product, quantity: 1 }];
    });
    };

    const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    setCart(prevCart =>
        prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
        )
    );
    };

    const getCartTotal = () => {
    return cart.reduce((total, item) => {
        const price = typeof item.currentPrice === 'string' 
            ? parseFloat(item.currentPrice.replace(/\./g, '')) 
            : item.currentPrice;
        return total + (price * item.quantity);
    }, 0);
    };

    const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
    };

    return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartItemsCount
    };
}