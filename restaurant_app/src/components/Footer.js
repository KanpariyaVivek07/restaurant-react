import React from 'react';
import { Link } from 'react-router-dom';
// import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer>
      <div className="footer_main">
        <div className="footer_tag">
          <h2>Our Locations</h2>
          <p><i className="fas fa-map-marker-alt"></i> Downtown Branch</p>
          <p><i className="fas fa-map-marker-alt"></i> Westside Plaza</p>
          <p><i className="fas fa-map-marker-alt"></i> Mall Food Court</p>
          <p><i className="fas fa-map-marker-alt"></i> University District</p>
          <p><i className="fas fa-map-marker-alt"></i> Airport Terminal</p>
        </div>

        <div className="footer_tag">
          <h2>Quick Links</h2>
          <p><Link to="/"><i className="fas fa-home"></i> Home</Link></p>
          <p><Link to="/about"><i className="fas fa-info-circle"></i> About</Link></p>
          <p><Link to="/menu"><i className="fas fa-utensils"></i> Menu</Link></p>
          <p><Link to="/gallery"><i className="fas fa-images"></i> Gallery</Link></p>
          <p><Link to="/blog"><i className="fas fa-blog"></i> Blog</Link></p>
        </div>

        <div className="footer_tag">
          <h2>Contact Us</h2>
          <p><i className="fa-solid fa-phone"></i> +1 (555) 123-4567</p>
          <p><i className="fa-solid fa-mobile"></i> +1 (555) 987-6543</p>
          <p><i className="fa-solid fa-envelope"></i> info@restaurant.com</p>
          <p><i className="fa-solid fa-truck-fast"></i> orders@restaurant.com</p>
        </div>

        <div className="footer_tag">
          <h2>Opening Hours</h2>
          <p><i className="fas fa-clock"></i> Monday-Friday: 11AM - 10PM</p>
          <p><i className="fas fa-clock"></i> Saturday: 10AM - 11PM</p>
          <p><i className="fas fa-clock"></i> Sunday: 10AM - 9PM</p>
          <p><i className="fas fa-clock"></i> Holidays: 12PM - 8PM</p>
        </div>

        <div className="footer_tag">
          <h2>Follow Us</h2>
          <div className="social_icons">
            <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>

          <div className="newsletter">
            <h3><i className="fas fa-envelope-open-text"></i> Subscribe to Newsletter</h3>
            <input type="email" placeholder="Your Email" />
            <button><i className="fas fa-paper-plane"></i> Subscribe</button>
          </div>
        </div>
      </div>

      <div className="footer_bottom">
        <p className="end">Design by<span><i className="fa-solid fa-heart"></i> Vivek's Kitchen</span></p>

        <div className="back_to_top">
          <a href="#top" onClick={scrollToTop}><i className="fa-solid fa-arrow-up"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;