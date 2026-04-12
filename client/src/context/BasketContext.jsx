import React, { createContext, useContext, useState } from 'react';

const BasketContext = createContext();

export const useBasket = () => useContext(BasketContext);

export const BasketProvider = ({ children }) => {
    const [basketItems, setBasketItems] = useState([]);

    const addToBasket = (dish) => {
        setBasketItems(prev => {
            const existing = prev.find(item => item.name === dish.name);
            if (existing) {
                return prev.map(item =>
                    item.name === dish.name
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...dish, quantity: 1, addedAt: new Date().toISOString() }];
        });
    };

    const removeFromBasket = (dishName) => {
        setBasketItems(prev => prev.filter(item => item.name !== dishName));
    };

    const updateQuantity = (dishName, delta) => {
        setBasketItems(prev =>
            prev
                .map(item =>
                    item.name === dishName
                        ? { ...item, quantity: item.quantity + delta }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    const clearBasket = () => setBasketItems([]);

    const totalItems = basketItems.reduce((sum, item) => sum + item.quantity, 0);

    const totalPrice = basketItems.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('₹', ''));
        return sum + price * item.quantity;
    }, 0);

    return (
        <BasketContext.Provider value={{
            basketItems,
            addToBasket,
            removeFromBasket,
            updateQuantity,
            clearBasket,
            totalItems,
            totalPrice
        }}>
            {children}
        </BasketContext.Provider>
    );
};
