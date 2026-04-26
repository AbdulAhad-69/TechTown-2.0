import { createContext, useState, useEffect } from 'react';

// 1. Create the Context
export const CartContext = createContext();

// 2. Create the Provider Component
export const CartProvider = ({ children }) => {
    // Initialize state from localStorage so the cart survives page refreshes!
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('techtown_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Every time the cart changes, automatically save the new version to localStorage
    useEffect(() => {
        localStorage.setItem('techtown_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            // Check if the item is already in the cart
            const existingItem = prevCart.find(item => item._id === product._id);

            if (existingItem) {
                // If it exists, just increase the quantity
                return prevCart.map(item =>
                    item._id === product._id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                );
            }
            // If it's a new item, add it to the array with a quantity of 1
            return [...prevCart, { ...product, qty: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item._id !== productId));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};