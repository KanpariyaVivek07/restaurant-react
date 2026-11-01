// Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when a link is clicked
  const closeMobileMenu = () => {
    if (window.innerWidth <= 768) {
      setIsMenuOpen(false);
    }
  };

  // Check if a path is the current active route
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={isScrolled ? 'scrolled' : ''}>
      <div className="logo">
        <Link to="/" onClick={closeMobileMenu}>
          <img src="/image/logo.png" alt="Restaurant Logo" />
        </Link>
      </div>

      <div 
        className={`nav-toggle ${isMenuOpen ? 'active' : ''}`} 
        id="nav-toggle"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`${isMenuOpen ? 'active' : ''}`} id="nav-menu">
        <li>
          <Link 
            to="/" 
            className={isActive('/') ? 'action' : ''}
            onClick={closeMobileMenu}
          >
            <i className="fas fa-home"></i> Home
          </Link>
        </li>
        <li>
          <Link 
            to="/about" 
            className={isActive('/about') ? 'action' : ''}
            onClick={closeMobileMenu}
          >
            <i className="fas fa-info-circle"></i> About
          </Link>
        </li>
        <li>
          <Link 
            to="/menu" 
            className={isActive('/menu') ? 'action' : ''}
            onClick={closeMobileMenu}
          >
            <i className="fas fa-utensils"></i> Menu
          </Link>
        </li>
        <li>
          <Link 
            to="/gallery" 
            className={isActive('/gallery') ? 'action' : ''}
            onClick={closeMobileMenu}
          >
            <i className="fas fa-images"></i> Gallery
          </Link>
        </li>
        <li>
          <Link 
            to="/blog" 
            className={isActive('/blog') ? 'action' : ''}
            onClick={closeMobileMenu}
          >
            <i className="fas fa-blog"></i> Blog
          </Link>
        </li>
        <li className="login">
          <Link to="/login" onClick={closeMobileMenu}>
            <i className="fas fa-user"></i> Login
          </Link>
        </li>
        <li className="cart-icon">
          <Link to="/cart" onClick={closeMobileMenu}>
            <i className="fas fa-shopping-cart"></i>
            <span id="cart-count">{cartCount}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;