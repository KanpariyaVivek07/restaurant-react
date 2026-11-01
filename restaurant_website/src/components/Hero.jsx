import React from 'react';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home">
      <div className="main">
        <div className="main_text">
          <h1 className="anim">Experience the <span>Finest</span> Culinary Delights</h1>
          <p className="anim">
            Indulge in a gastronomic journey with our exquisite menu crafted by award-winning chefs. 
            Using only the freshest ingredients, we create unforgettable dining experiences that 
            tantalize your taste buds and leave you craving for more.
          </p>
          
          <div className="hero_buttons anim">
            <a href="#menu" className="main_btn" onClick={(e) => {
              e.preventDefault();
              scrollToSection('menu');
            }}>
              Explore Our Menu <i className="fa-solid fa-arrow-right"></i>
            </a>
            
            <a href="#reservation" className="secondary_btn" onClick={(e) => {
              e.preventDefault();
              scrollToSection('reservation');
            }}>
              <i className="fa-solid fa-calendar-days"></i> Book a Table
            </a>
          </div>

          <div className="hero_stats anim">
            <div className="stat">
              <h3>500+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat">
              <h3>50+</h3>
              <p>Menu Items</p>
            </div>
            <div className="stat">
              <h3>10+</h3>
              <p>Years Experience</p>
            </div>
          </div>
        </div>

        <div className="main_image">
          <img src="image/main_img.png" alt="Delicious Food" className="anim" />
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-arrow">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p>Scroll to explore</p>
      </div>
    </section>
  );
};

export default Hero;