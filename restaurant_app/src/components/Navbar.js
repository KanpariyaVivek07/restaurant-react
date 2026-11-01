import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import CartIcon from './CartIcon';
import './styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle('no-scroll', !isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove('no-scroll');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'action' : '';
  };

  return (
    <nav>
      <div className="logo">
        <Link to="/" onClick={closeMenu}>
          <img src="/images/logo.png" alt="Restaurant Logo" />
        </Link>
      </div>

      <div 
        className={`nav-toggle ${isMenuOpen ? 'active' : ''}`} 
        id="nav-toggle"
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`${isMenuOpen ? 'active' : ''}`} id="nav-menu">
        <li><Link to="/" className={isActive('/')} onClick={closeMenu}>Home</Link></li>
        <li><Link to="/about" className={isActive('/about')} onClick={closeMenu}>About</Link></li>
        <li><Link to="/menu" className={isActive('/menu')} onClick={closeMenu}>Menu</Link></li>
        <li><Link to="/gallery" className={isActive('/gallery')} onClick={closeMenu}>Gallery</Link></li>
        <li><Link to="/blog" className={isActive('/blog')} onClick={closeMenu}>Blog</Link></li>
        
        {isLoggedIn ? (
          <li className="login">
            <button onClick={logout}>Logout</button>
          </li>
        ) : (
          <li className="login">
            <Link to="/login" onClick={closeMenu}>Login</Link>
          </li>
        )}
        
        <li className="cart-icon">
          <Link to="/cart" onClick={closeMenu}>
            <CartIcon />
            <span id="cart-count">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;