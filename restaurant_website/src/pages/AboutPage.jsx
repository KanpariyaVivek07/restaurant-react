import React, { useEffect, useRef, useState } from 'react';
import '../css/AboutPage.css';

const AboutPage = () => {
  const aboutRef = useRef(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Scroll to About Section when clicking scroll hint
  const handleScrollClick = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const sections = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.2 }
    );
    sections.forEach(sec => observer.observe(sec));
    
    // Add scroll event listener for back to top button
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Banner */}
      <div className="hero_banner">
        <div className="banner_content">
          <h1><span>About</span> Us</h1>
          <p className="subtitle">Discover our story and passion for exceptional cuisine</p>
          <div className="scroll_hint" onClick={handleScrollClick}>
            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M7 10L12 15L17 10"
                stroke="var(--white)" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div className="banner_overlay"></div>
      </div>

      {/* About Section */}
      <div ref={aboutRef} className="about anim">
        <div className="about_main">
          <div className="about_image reveal">
            <img src="image/about.png" alt="About our restaurant" />
          </div>

          <div className="about_text reveal">
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
              <div className="s_1 reveal">
                <i className="fa-solid fa-truck-fast"></i>
                <a href="#">Fast Delivery</a>
              </div>

              <div className="s_1 reveal">
                <i className="fa-brands fa-amazon-pay"></i>
                <a href="#">Easy Payment</a>
              </div>

              <div className="s_1 reveal">
                <i className="fa-solid fa-headset"></i>
                <a href="#">24/7 Service</a>
              </div>
            </div>

            <a href="menu.html" className="about_btn reveal">
              <i className="fas fa-utensils"></i> Order Now
            </a>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <div className="back_to_top show" onClick={scrollToTop}>
          <a href="#">
            <i className="fas fa-arrow-up"></i>
          </a>
        </div>
      )}
    </>
  );
};

export default AboutPage;