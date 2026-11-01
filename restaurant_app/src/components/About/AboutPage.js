import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import './AboutPage.css';

const AboutPage = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Function to update cart count
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      setCartCount(totalItems);
    };

    // Initialize cart count
    updateCartCount();

    // Listen for storage events
    window.addEventListener('storage', updateCartCount);
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  return (
    <div className="about-page">
      <Navbar cartCount={cartCount} currentPage="about" />
      
      {/* Hero Banner */}
      <div className="hero_banner">
        <div className="banner_content">
          <h1><span>About</span> Us</h1>
          <p className="subtitle">Discover our story and passion for exceptional cuisine</p>
          <div className="scroll_hint">
            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 10L12 15L17 10" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div className="banner_overlay"></div>
      </div>

      {/* About Section */}
      <div className="about anim">
        <div className="about_main">
          <div className="about_image">
            <img src="/images/about.png" alt="About our restaurant" />
          </div>

          <div className="about_text">
            <h3>Why food lovers choose us?</h3>
            <p>
              At our restaurant, we combine culinary expertise with a passion for quality ingredients to create
              unforgettable dining experiences. Our chefs bring decades of international experience to every dish,
              using locally-sourced produce and traditional techniques with a modern twist.
            </p>
            <p>
              We believe food should be an adventure for the senses. From our signature dishes to seasonal
              specials, every item on our menu tells a story of flavor, craftsmanship, and dedication to
              excellence.
            </p>

            <div className="about_services">
              <div className="s_1">
                <i className="fa-solid fa-truck-fast"></i>
                <a href="#">Fast Delivery</a>
              </div>

              <div className="s_1">
                <i className="fa-brands fa-amazon-pay"></i>
                <a href="#">Easy Payment</a>
              </div>

              <div className="s_1">
                <i className="fa-solid fa-headset"></i>
                <a href="#">24/7 Service</a>
              </div>
            </div>

            <a href="/menu" className="about_btn"><i className="fas fa-utensils"></i> Order Now</a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;