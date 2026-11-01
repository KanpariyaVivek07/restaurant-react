import React from 'react';

const Footer = () => {
  return (
    <footer>
        <div class="footer_main">
            <div class="footer_tag">
                <h2>Our Locations</h2>
                <p><i class="fas fa-map-marker-alt"></i> Downtown Branch</p>
                <p><i class="fas fa-map-marker-alt"></i> Westside Plaza</p>
                <p><i class="fas fa-map-marker-alt"></i> Mall Food Court</p>
                <p><i class="fas fa-map-marker-alt"></i> University District</p>
                <p><i class="fas fa-map-marker-alt"></i> Airport Terminal</p>
            </div>

            <div class="footer_tag">
                <h2>Quick Links</h2>
                <p><a href="index.html"><i class="fas fa-home"></i> Home</a></p>
                <p><a href="about.html"><i class="fas fa-info-circle"></i> About</a></p>
                <p><a href="menu.html"><i class="fas fa-utensils"></i> Menu</a></p>
                <p><a href="gallery.html"><i class="fas fa-images"></i> Gallery</a></p>
                <p><a href="blog.html"><i class="fas fa-blog"></i> Blog</a></p>
            </div>

            <div class="footer_tag">
                <h2>Contact Us</h2>
                <p><i class="fa-solid fa-phone"></i> +91 949-966-1142</p>
                <p><i class="fa-solid fa-mobile"></i> +91 949-966-1142</p>
                <p><i class="fa-solid fa-envelope"></i> info@restaurant.com</p>
                <p><i class="fa-solid fa-truck-fast"></i> orders@restaurant.com</p>
            </div>

            <div class="footer_tag">
                <h2>Opening Hours</h2>
                <p><i class="fas fa-clock"></i> Monday-Friday: 11AM - 10PM</p>
                <p><i class="fas fa-clock"></i> Saturday: 10AM - 11PM</p>
                <p><i class="fas fa-clock"></i> Sunday: 10AM - 9PM</p>
                <p><i class="fas fa-clock"></i> Holidays: 12PM - 8PM</p>
            </div>

            <div class="footer_tag">
                <h2>Follow Us</h2>
                <div class="social_icons">
                    <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
                    <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
                    <a href="#" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
                    <a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
                </div>

                <div class="newsletter">
                    <h3><i class="fas fa-envelope-open-text"></i> Subscribe to Newsletter</h3>
                    <input type="email" placeholder="Your Email"/>
                    <button><i class="fas fa-paper-plane"></i> Subscribe</button>
                </div>
            </div>
        </div>

        <div class="footer_bottom">
            <p class="end">Design by<span><i class="fa-solid fay-heart"/>Vivek's Kitchen</span></p>

            <div class="back_to_top">
                <a href="#"><i class="fa-solid fa-arrow-up"></i></a>
            </div>
        </div>
    </footer>
  );
};

export default Footer;