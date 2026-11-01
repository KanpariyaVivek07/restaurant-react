import React from 'react';
import Hero from './Hero';
import About from './About';
import MenuSection from './MenuSection';
import Banner from './Banner';
import GallerySection from './GallerySection';
import OfferSection from './OfferSection';
import Team from './Team';
import BlogSection from './BlogSection';
import Reservation from './Reservation';
import BookingsTable from './BookingsTable';

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <About />
      <MenuSection />
      <Banner />
      <GallerySection />
      <OfferSection />
      <Team />
      <BlogSection />
      <Reservation />
      <BookingsTable />
    </div>
  );
};

export default Home;