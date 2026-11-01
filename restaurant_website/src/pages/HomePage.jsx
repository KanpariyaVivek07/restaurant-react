import React from 'react';
import About from '../components/About';
import Banner from '../components/Banner';
import Blog from '../components/Blog';
import Bookings from '../components/Bookings';
import Gallery from '../components/Gallery';
import Menu from '../components/Menu';
import Offers from '../components/Offers';
import Reservation from '../components/Reservation';

const HomePage = ({ addToCart, bookings, setBookings }) => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section id="Home">
        <div className="main anim">
          <div className="main_text">
            <h1>Get Fresh<span> Food</span><br/>in a Easy Way</h1>
            <p>
              Experience the finest culinary delights delivered right to your doorstep.
              Our restaurant specializes in fresh, locally-sourced ingredients prepared
              by expert chefs. From gourmet burgers to authentic pizzas and refreshing
              beverages, we bring restaurant-quality meals to your home with lightning-fast
              delivery.
            </p>
            <a href="#reservation" className="main_btn">Table Book Now<i className="fa-solid fa-utensils"></i></a>
          </div>

          <div className="main_image">
            <img src="image/main_img.png" alt="Delicious Food"/>
          </div>
        </div>
      </section>

      {/* All Other Components */}
      <About />
      <Menu addToCart={addToCart} />
      <Offers addToCart={addToCart} />
      <Gallery />
      <Blog />
      <Banner />
      <Reservation bookings={bookings} setBookings={setBookings} />
      <Bookings bookings={bookings} setBookings={setBookings} />
    </div>
  );
};

export default HomePage;