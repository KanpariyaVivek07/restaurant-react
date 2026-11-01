import React from 'react';

const Hero = () => {
  return (
    <section id="home">
      <div className="main anim">
        <div className="main_text">
          <h1>Get Fresh<span> Food</span><br />in a Easy Way</h1>
          <p>
            Experience the finest culinary delights delivered right to your doorstep.
            Our restaurant specializes in fresh, locally-sourced ingredients prepared
            by expert chefs. From gourmet burgers to authentic pizzas and refreshing
            beverages, we bring restaurant-quality meals to your home with lightning-fast
            delivery.
          </p>
          <a href="#reservation" className="main_btn">
            Table Book Now<i className="fa-solid fa-utensils"></i>
          </a>
        </div>

        <div className="main_image">
          <img src="/images/main_img.png" alt="Delicious Food" />
        </div>
      </div>
    </section>
  );
};

export default Hero;