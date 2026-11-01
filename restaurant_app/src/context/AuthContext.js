import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.name === item.name);
    let newCart;
    
    if (existingItem) {
      newCart = cart.map(cartItem =>
        cartItem.name === item.name
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      newCart = [...cart, { ...item, quantity: 1 }];
    }
    
    updateCart(newCart);
    return newCart;
  };

  const removeFromCart = (itemName) => {
    const newCart = cart.filter(item => item.name !== itemName);
    updateCart(newCart);
  };

  const updateQuantity = (itemName, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemName);
      return;
    }

    const newCart = cart.map(item =>
      item.name === itemName ? { ...item, quantity } : item
    );
    updateCart(newCart);
  };

  const clearCart = () => {
    updateCart([]);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};