// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import MenuPage from './pages/MenuPage';
import GalleryPage from './pages/GalleryPage';
import BlogPage from './pages/BlogPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Footer from './components/Footer';
import { AuthProvider } from './components/AuthContext';
import './App.css';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on initial load
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
    const totalItems = savedCart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(totalItems);
    setIsLoading(false);
  }, []);

  // Update cart count and localStorage when cart changes
  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    const totalItems = newCart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(totalItems);
    
    // Dispatch custom event for other components to listen to
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // Function to add item to cart
  const addToCart = (item) => {
    const newCart = [...cart];
    const existingItemIndex = newCart.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex !== -1) {
      newCart[existingItemIndex].quantity += 1;
    } else {
      newCart.push({ ...item, quantity: 1 });
    }
    
    updateCart(newCart);
    
    // Show notification
    const event = new CustomEvent('showNotification', {
      detail: {
        message: `${item.name} added to cart!`,
        type: 'success'
      }
    });
    window.dispatchEvent(event);
  };

  // Function to remove item from cart
  const removeFromCart = (itemId) => {
    const newCart = cart.filter(item => item.id !== itemId);
    updateCart(newCart);
  };

  // Function to update item quantity in cart
  const updateItemQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const newCart = cart.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    
    updateCart(newCart);
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading delicious content...</p>
      </div>
    );
  }

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar cartCount={cartCount} />
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  addToCart={addToCart}
                  bookings={bookings}
                  setBookings={setBookings}
                />
              } 
            />
            <Route path="/about" element={<AboutPage />} />
            <Route 
              path="/menu" 
              element={<MenuPage addToCart={addToCart} />} 
            />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route 
              path="/cart" 
              element={
                <CartPage 
                  cart={cart}
                  updateCart={updateCart}
                  removeFromCart={removeFromCart}
                  updateItemQuantity={updateItemQuantity}
                />
              } 
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;