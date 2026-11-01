import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CartIcon = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      setCartCount(totalItems);
    };

    updateCartCount();

    // Listen for storage events (when cart is updated from another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'cart') {
        updateCartCount();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event listener for cart updates within the same tab
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  return (
    <Link to="/cart">
      <i className="fa-solid fa-cart-shopping"></i>
      <span id="cart-count">{cartCount}</span>
    </Link>
  );
};

export default CartIcon;