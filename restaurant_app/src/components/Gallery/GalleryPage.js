// src/components/Gallery/GalleryPage.js
import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import ImageModal from './ImageModal';
import { galleryData } from '../../utils/constants';
import './GalleryPage.css';

const GalleryPage = () => {
  const [filteredImages, setFilteredImages] = useState(galleryData);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Filter images based on category and search query
  useEffect(() => {
    let result = [...galleryData];
    
    if (activeFilter !== 'all') {
      result = result.filter(item => item.category === activeFilter);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredImages(result);
  }, [activeFilter, searchQuery]);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      setSearchQuery(e.target.value || document.getElementById('search-input').value);
    }
  };

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const navigateImage = (direction) => {
    if (direction === 'prev') {
      setCurrentImageIndex(prev => (prev - 1 + filteredImages.length) % filteredImages.length);
    } else {
      setCurrentImageIndex(prev => (prev + 1) % filteredImages.length);
    }
  };

  return (
    <div className="gallery-page">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="hero_banner">
        <div className="banner_content">
          <h1><span>Our</span> Gallery</h1>
          <p className="subtitle">A visual feast of our culinary creations</p>
          <div className="scroll_hint">
            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 10L12 15L17 10" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="banner_overlay"></div>
      </div>

      {/* Gallery Controls */}
      <div className="gallery_controls anim">
        <div className="filter_buttons">
          <button 
            className={`filter_btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterClick('all')}
          >
            All
          </button>
          <button 
            className={`filter_btn ${activeFilter === 'appetizers' ? 'active' : ''}`}
            onClick={() => handleFilterClick('appetizers')}
          >
            Appetizers
          </button>
          <button 
            className={`filter_btn ${activeFilter === 'mains' ? 'active' : ''}`}
            onClick={() => handleFilterClick('mains')}
          >
            Main Courses
          </button>
          <button 
            className={`filter_btn ${activeFilter === 'desserts' ? 'active' : ''}`}
            onClick={() => handleFilterClick('desserts')}
          >
            Desserts
          </button>
          <button 
            className={`filter_btn ${activeFilter === 'drinks' ? 'active' : ''}`}
            onClick={() => handleFilterClick('drinks')}
          >
            Drinks
          </button>
        </div>
        <div className="search_box">
          <input 
            type="text" 
            placeholder="Search dishes..." 
            id="search-input"
            onKeyUp={handleSearch}
          />
          <button id="search-btn" onClick={handleSearch}>
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="gallery anim">
        <div className="gallery_box" id="gallery-container">
          {filteredImages.length === 0 ? (
            <div className="no-results">
              <i className="fas fa-search"></i>
              <h3>No items found</h3>
              <p>Try a different search or filter</p>
            </div>
          ) : (
            filteredImages.map((item, index) => (
              <div 
                key={item.id} 
                className={`gallery_image anim ${item.category}`}
                onClick={() => openModal(index)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <img src={item.src} alt={item.title} loading="lazy" />
                <div className="image_caption">
                  <h3>{item.title}</h3>
                  <p>{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Image Modal */}
      {modalOpen && (
        <ImageModal 
          image={filteredImages[currentImageIndex]}
          onClose={closeModal}
          onPrev={() => navigateImage('prev')}
          onNext={() => navigateImage('next')}
          hasPrev={currentImageIndex > 0}
          hasNext={currentImageIndex < filteredImages.length - 1}
        />
      )}

      <Footer />
    </div>
  );
};

export default GalleryPage;