import React, { useState, useEffect, useRef } from 'react';
import '../css/GalleryPage.css';

const GalleryPage = () => {
  const [galleryData] = useState([
    { id: 1, src: '/image/gallery_1.jpg', title: 'Signature Pasta', category: 'mains' },
    { id: 2, src: '/image/gallery_2.jpg', title: 'Fresh Garden Salad', category: 'appetizers' },
    { id: 3, src: '/image/gallery_3.webp', title: 'Chocolate Lava Cake', category: 'desserts' },
    { id: 4, src: '/image/gallery_4.jpg', title: 'Mojito Cocktail', category: 'drinks' },
    { id: 5, src: '/image/gallery_5.jpg', title: 'Grilled Salmon', category: 'mains' },
    { id: 6, src: '/image/gallery_6.jpg', title: 'Bruschetta Platter', category: 'appetizers' },
    { id: 7, src: '/image/gallery_7.jpg', title: 'Tiramisu Delight', category: 'desserts' },
    { id: 8, src: '/image/gallery_8.jpg', title: 'Wine Selection', category: 'drinks' },
    { id: 9, src: '/image/gallery_9.webp', title: 'Chef Special Steak', category: 'mains' },
    { id: 10, src: '/image/gallery_10.jpg', title: 'Spring Rolls', category: 'appetizers' },
    { id: 11, src: '/image/gallery_11.jpg', title: 'Red Velvet Cake', category: 'desserts' },
    { id: 12, src: '/image/gallery_12.jpg', title: 'Craft Beer', category: 'drinks' },
    { id: 13, src: '/image/gallery_13.jpg', title: 'Vegetable Curry', category: 'mains' },
    { id: 14, src: '/image/gallery_14.jpg', title: 'Caprese Salad', category: 'appetizers' },
    { id: 15, src: '/image/gallery_15.webp', title: 'Fruit Tart', category: 'desserts' },
    { id: 16, src: '/image/gallery_16.jpg', title: 'Iced Coffee', category: 'drinks' },
    { id: 17, src: '/image/gallery_17.jpg', title: 'Beef Burger', category: 'mains' },
    { id: 18, src: '/image/gallery_18.jpg', title: 'Garlic Bread', category: 'appetizers' },
    { id: 19, src: '/image/gallery_19.jpg', title: 'Cheesecake', category: 'desserts' },
    { id: 20, src: '/image/gallery_20.jpg', title: 'Fresh Juice', category: 'drinks' },
    { id: 21, src: '/image/gallery_21.jpg', title: 'Chicken Tikka', category: 'mains' },
    { id: 22, src: '/image/gallery_22.jpg', title: 'Stuffed Mushrooms', category: 'appetizers' },
    { id: 23, src: '/image/gallery_23.jpg', title: 'Chocolate Mousse', category: 'desserts' },
    { id: 24, src: '/image/gallery_24.jpg', title: 'Craft Cocktail', category: 'drinks' },
    { id: 25, src: '/image/gallery_25.jpg', title: 'Vegetable Stir Fry', category: 'mains' },
    { id: 26, src: '/image/gallery_26.jpg', title: 'Shrimp Cocktail', category: 'appetizers' },
    { id: 27, src: '/image/gallery_27.jpg', title: 'Apple Pie', category: 'desserts' },
    { id: 28, src: '/image/gallery_28.jpg', title: 'Espresso', category: 'drinks' },
    { id: 29, src: '/image/gallery_29.jpg', title: 'BBQ Ribs', category: 'mains' },
    { id: 30, src: '/image/gallery_30.jpg', title: 'Onion Rings', category: 'appetizers' },
    { id: 31, src: '/image/gallery_31.webp', title: 'Ice Cream Sundae', category: 'desserts' },
    { id: 32, src: '/image/gallery_32.jpg', title: 'Sangria', category: 'drinks' },
    { id: 33, src: '/image/gallery_33.jpg', title: 'Margherita Pizza', category: 'mains' },
    { id: 34, src: '/image/gallery_34.jpg', title: 'Calamari', category: 'appetizers' },
    { id: 35, src: '/image/gallery_35.jpg', title: 'Creme Brulee', category: 'desserts' },
    { id: 36, src: '/image/gallery_36.jpg', title: 'Iced Tea', category: 'drinks' },
    { id: 37, src: '/image/gallery_37.jpg', title: 'Fish Tacos', category: 'mains' },
    { id: 38, src: '/image/gallery_38.jpg', title: 'Chicken Wings', category: 'appetizers' },
    { id: 39, src: '/image/gallery_39.jpg', title: 'Panna Cotta', category: 'desserts' },
    { id: 40, src: '/image/gallery_40.webp', title: 'Smoothie Bowl', category: 'drinks' },
    { id: 41, src: '/image/gallery_41.jpg', title: 'Beef Wellington', category: 'mains' },
    { id: 42, src: '/image/gallery_42.webp', title: 'Avocado Toast', category: 'appetizers' },
    { id: 43, src: '/image/gallery_43.jpg', title: 'Churros', category: 'desserts' },
    { id: 44, src: '/image/gallery_44.webp', title: 'Milkshake', category: 'drinks' },
    { id: 45, src: '/image/gallery_45.jpg', title: 'Vegetable Lasagna', category: 'mains' },
    { id: 46, src: '/image/gallery_46.jpg', title: 'Cheese Platter', category: 'appetizers' },
    { id: 47, src: '/image/gallery_47.jpg', title: 'Macarons', category: 'desserts' },
    { id: 48, src: '/image/gallery_48.jpg', title: 'Hot Chocolate', category: 'drinks' },
    { id: 49, src: '/image/gallery_49.jpg', title: 'Chicken Parmesan', category: 'mains' },
    { id: 50, src: '/image/gallery_50.jpg', title: 'Soup of the Day', category: 'appetizers' },
    { id: 51, src: '/image/gallery_51.jpg', title: 'Fruit Platter', category: 'desserts' }
  ]);

  const [filteredImages, setFilteredImages] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const navRef = useRef(null);

  useEffect(() => {
    // Initialize gallery
    setFilteredImages(galleryData);
    
    // Get cart count from localStorage
    updateCartCount();
    
    // Add scroll event listener for back to top button
    const handleScroll = () => {
      const backToTop = document.querySelector('.back_to_top');
      if (backToTop) {
        if (window.scrollY > 300) {
          backToTop.classList.add('show');
        } else {
          backToTop.classList.remove('show');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [galleryData]);

  // Filter gallery by category
  const filterGallery = (category) => {
    setActiveFilter(category);
    if (category === 'all') {
      setFilteredImages(galleryData);
    } else {
      const filtered = galleryData.filter(item => item.category === category);
      setFilteredImages(filtered);
    }
  };

  // Search gallery by title
  const searchGallery = (query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredImages(galleryData);
    } else {
      const searchTerm = query.toLowerCase();
      const filtered = galleryData.filter(item => 
        item.title.toLowerCase().includes(searchTerm) || 
        item.category.toLowerCase().includes(searchTerm)
      );
      setFilteredImages(filtered);
    }
  };

  // Open modal with selected image
  const openModal = (index) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Navigate to previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + filteredImages.length) % filteredImages.length
    );
  };

  // Navigate to next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % filteredImages.length
    );
  };

  // Update cart count
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(totalItems);
    return totalItems;
  };

  // Handle keyboard navigation in modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (modalOpen) {
        if (e.key === 'Escape') {
          closeModal();
        } else if (e.key === 'ArrowLeft') {
          prevImage();
        } else if (e.key === 'ArrowRight') {
          nextImage();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalOpen, currentImageIndex, filteredImages]);

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close mobile menu when clicking on a link
  const closeMobileMenu = () => {
    if (window.innerWidth <= 768) {
      setMenuOpen(false);
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="gallery-page">
      {/* Navigation Bar */}
      <nav>
        <div className="logo">
          <a href="/"><img src="/image/logo.png" alt="Restaurant Logo" /></a>
        </div>

        <div 
          className={`nav-toggle ${menuOpen ? 'active' : ''}`} 
          id="nav-toggle"
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={menuOpen ? 'show' : ''} id="nav-menu" ref={navRef}>
          <li><a href="/" onClick={closeMobileMenu}>Home</a></li>
          <li><a href="/about" onClick={closeMobileMenu}>About</a></li>
          <li><a href="/menu" onClick={closeMobileMenu}>Menu</a></li>
          <li><a href="/gallery" className="action" onClick={closeMobileMenu}>Gallery</a></li>
          <li><a href="/blog" onClick={closeMobileMenu}>Blog</a></li>
          <li className="login"><a href="/login" onClick={closeMobileMenu}>Login</a></li>
          <li className="cart-icon">
            <a href="/cart" onClick={closeMobileMenu}>
              <i className="fa-solid fa-cart-shopping"></i>
              <span id="cart-count">{cartCount}</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* Banner */}
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

      {/* Gallery Filter Controls */}
      <div className="gallery_controls anim">
        <div className="filter_buttons">
          <button 
            className={`filter_btn ${activeFilter === 'all' ? 'active' : ''}`} 
            onClick={() => filterGallery('all')}
          >
            All
          </button>
          <button 
            className={`filter_btn ${activeFilter === 'appetizers' ? 'active' : ''}`} 
            onClick={() => filterGallery('appetizers')}
          >
            Appetizers
          </button>
          <button 
            className={`filter_btn ${activeFilter === 'mains' ? 'active' : ''}`} 
            onClick={() => filterGallery('mains')}
          >
            Main Courses
          </button>
          <button 
            className={`filter_btn ${activeFilter === 'desserts' ? 'active' : ''}`} 
            onClick={() => filterGallery('desserts')}
          >
            Desserts
          </button>
          <button 
            className={`filter_btn ${activeFilter === 'drinks' ? 'active' : ''}`} 
            onClick={() => filterGallery('drinks')}
          >
            Drinks
          </button>
        </div>
        <div className="search_box">
          <input 
            type="text" 
            placeholder="Search dishes..." 
            value={searchQuery}
            onChange={(e) => searchGallery(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') searchGallery(e.target.value);
            }}
          />
          <button onClick={() => searchGallery(searchQuery)}>
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
        <div className="image_modal" id="image-modal" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <span className="close_modal" onClick={closeModal}>&times;</span>
          <img 
            className="modal_content" 
            src={filteredImages[currentImageIndex]?.src} 
            alt={filteredImages[currentImageIndex]?.title} 
            id="modal-image"
          />
          <div className="modal_caption" id="modal-caption">
            {filteredImages[currentImageIndex]?.title}
          </div>
          <div className="modal_nav">
            <button onClick={prevImage}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <button onClick={nextImage}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      )}


      {/* Back to Top Button */}
      <div className="back_to_top" id="back-to-top" onClick={scrollToTop}>
        <i className="fas fa-arrow-up"></i>
      </div>
    </div>
  );
};

export default GalleryPage;