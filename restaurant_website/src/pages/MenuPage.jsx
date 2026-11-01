import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import menuData from '../data/all.json';
import americanData from '../data/american.json';
import bbqData from '../data/bbq.json';
import beveragesData from '../data/beverages.json';
import breakfastData from '../data/breakfast.json';
import chineseData from '../data/chinese.json';
import dessertsData from '../data/desserts.json';
import indianData from '../data/indian.json';
import italianData from '../data/italian.json';
import japaneseData from '../data/japanese.json';
import mediterraneanData from '../data/mediterranean.json';
import mexicanData from '../data/mexican.json';
import seafoodData from '../data/seafood.json';
import thaiData from '../data/thai.json';
import veganData from '../data/vegan.json';
import vegetarianData from '../data/vegetarian.json';
import '../css/MenuPage.css';

const MenuPage = ({ updateCartCount }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [menuItems, setMenuItems] = useState([]);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    rating: '',
    image: '',
    category: 'all'
  });

  const navigate = useNavigate();

  // Category data mapping
  const categoryData = {
    all: menuData.items,
    american: americanData.items,
    bbq: bbqData.items,
    beverages: beveragesData.items,
    breakfast: breakfastData.items,
    chinese: chineseData.items,
    desserts: dessertsData.items,
    indian: indianData.items,
    italian: italianData.items,
    japanese: japaneseData.items,
    mediterranean: mediterraneanData.items,
    mexican: mexicanData.items,
    seafood: seafoodData.items,
    thai: thaiData.items,
    vegan: veganData.items,
    vegetarian: vegetarianData.items
  };

  useEffect(() => {
    // Load cart count from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(totalItems);

    // Check admin mode
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdminMode(adminStatus);

    // Load initial menu items
    filterMenuItems('all');
    
    // Add scroll animation
    const revealElements = () => {
      const reveals = document.querySelectorAll('.reveal');
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('active');
        }
      }
    };
    
    window.addEventListener('scroll', revealElements);
    revealElements(); // Initial check
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', revealElements);
    };
  }, []);

  const filterMenuItems = (category) => {
    setActiveCategory(category);
    setMenuItems(categoryData[category] || []);
  };

  const addToCart = (item) => {
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      alert('Please login to add items to cart');
      navigate('/login');
      return;
    }

    const cartItem = {
      id: item.id || Date.now(),
      name: item.name,
      price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
      quantity: 1,
      image: item.image,
      description: item.description,
      category: item.category
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setCartCount(prev => prev + 1);
    
    // Update cart count in parent component
    if (updateCartCount) {
      updateCartCount();
    }
    
    // Dispatch event for other components to listen to
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Show success notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-check-circle"></i>
        <span>${item.name} added to cart!</span>
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 2000);
  };

  const handleAdminLogin = async () => {
    const password = prompt("Enter admin password:");
    if (password === "vivek07") {
      try {
        const response = await fetch("http://localhost:3001/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "admin@restaurant.com",
            password: "vivek07"
          })
        });
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("token", data.token);
          localStorage.setItem("isAdmin", "true");
          setIsAdminMode(true);
          alert("Admin mode activated!");
        } else {
          alert("Backend login failed");
        }
      } catch (err) {
        console.error("Admin login error:", err);
      }
    } else {
      alert("Incorrect password");
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      originalPrice: item.originalPrice || item.original_price,
      rating: item.rating,
      image: item.image,
      category: item.category
    });
    setShowModal(true);
  };

  const handleDeleteItem = async (item) => {
    if (window.confirm(`Are you sure you want to delete ${item.name}?`)) {
      try {
        // Make API call to delete item
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3001/api/menu/${item.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          // Remove item from local state
          const updatedItems = menuItems.filter(i => i.id !== item.id);
          setMenuItems(updatedItems);
          alert(`${item.name} deleted successfully!`);
        } else {
          const error = await response.json();
          alert(error.error || 'Failed to delete item');
        }
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Failed to delete item. Please try again.');
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const newItem = {
      id: editingItem ? editingItem.id : Date.now(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      originalPrice: parseFloat(formData.originalPrice),
      rating: parseFloat(formData.rating),
      image: formData.image,
      category: formData.category
    };

    try {
      const token = localStorage.getItem('token');
      
      if (editingItem) {
        // Update existing item via API
        const response = await fetch(`http://localhost:3001/api/menu/${editingItem.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(newItem)
        });

        if (response.ok) {
          // Update local state
          const updatedItems = menuItems.map(item => 
            item.id === editingItem.id ? newItem : item
          );
          setMenuItems(updatedItems);
          alert(`${formData.name} updated successfully!`);
        } else {
          const error = await response.json();
          alert(error.error || 'Failed to update item');
        }
      } else {
        // Add new item via API
        const response = await fetch('http://localhost:3001/api/menu', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(newItem)
        });

        if (response.ok) {
          // Add to local state
          setMenuItems([...menuItems, newItem]);
          alert(`${formData.name} added successfully!`);
        } else {
          const error = await response.json();
          alert(error.error || 'Failed to add item');
        }
      }

      setShowModal(false);
      setFormData({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        rating: '',
        image: '',
        category: 'all'
      });
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Failed to save item. Please try again.');
    }
  };

  const generateRatingStars = (rating) => {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) stars += '<i class="fa-solid fa-star"></i>';
    if (hasHalfStar) stars += '<i class="fa-solid fa-star-half-stroke"></i>';

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) stars += '<i class="fa-regular fa-star"></i>';

    return { __html: stars };
  };

  return (
    <div className="menu-page">
      {/* Banner */}
      <div className="hero_banner">
        <div className="banner_content">
          <h1><span>Our</span> Menu</h1>
          <p className="subtitle">Discover our culinary delights</p>
          <div className="scroll_hint">
            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 10L12 15L17 10" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="banner_overlay"></div>
      </div>

      {/* Admin Controls */}
      {isAdminMode ? (
        <div className="admin-controls">
          <button className="admin-btn" onClick={() => setShowModal(true)}>Add New Item</button>
          <button className="admin-btn" onClick={() => {
            localStorage.setItem('isAdmin', 'false');
            setIsAdminMode(false);
          }}>Exit Admin Mode</button>
        </div>
      ) : (
        <div className="admin-controls">
          <button className="admin-btn" onClick={handleAdminLogin}>Admin Login</button>
        </div>
      )}

      {/* Add/Edit Item Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => {
              setShowModal(false);
              setEditingItem(null);
              setFormData({
                name: '',
                description: '',
                price: '',
                originalPrice: '',
                rating: '',
                image: '',
                category: 'all'
              });
            }}>&times;</span>
            <h2>{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="item-name">Name:</label>
                <input 
                  type="text" 
                  id="item-name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="item-description">Description:</label>
                <textarea 
                  id="item-description" 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required 
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="item-price">Price:</label>
                <input 
                  type="number" 
                  id="item-price" 
                  step="0.01" 
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="item-original-price">Original Price:</label>
                <input 
                  type="number" 
                  id="item-original-price" 
                  step="0.01" 
                  min="0"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="item-rating">Rating (1-5):</label>
                <input 
                  type="number" 
                  id="item-rating" 
                  min="1" 
                  max="5" 
                  step="0.1" 
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="item-category">Category:</label>
                <select 
                  id="item-category" 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                >
                  <option value="all">All</option>
                  <option value="indian">Indian</option>
                  <option value="chinese">Chinese</option>
                  <option value="italian">Italian</option>
                  <option value="mexican">Mexican</option>
                  <option value="japanese">Japanese</option>
                  <option value="thai">Thai</option>
                  <option value="american">American</option>
                  <option value="mediterranean">Mediterranean</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="seafood">Seafood</option>
                  <option value="bbq">BBQ</option>
                  <option value="desserts">Desserts</option>
                  <option value="beverages">Beverages</option>
                  <option value="breakfast">Breakfast</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="item-image">Image URL:</label>
                <input 
                  type="text" 
                  id="item-image" 
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  required 
                />
              </div>
              <button type="submit" className="admin-btn">
                {editingItem ? 'Update Item' : 'Add Item'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="category_filter">
        <button 
          className={`filter_btn ${activeCategory === 'all' ? 'active' : ''}`} 
          onClick={() => filterMenuItems('all')}
        >
          All Items
        </button>
        <button 
          className={`filter_btn ${activeCategory === 'indian' ? 'active' : ''}`} 
          onClick={() => filterMenuItems('indian')}
        >
          Indian
        </button>
        <button 
          className={`filter_btn ${activeCategory === 'chinese' ? 'active' : ''}`} 
          onClick={() => filterMenuItems('chinese')}
        >
          Chinese
        </button>
        <button 
          className={`filter_btn ${activeCategory === 'italian' ? 'active' : ''}`} 
          onClick={() => filterMenuItems('italian')}
        >
          Italian
        </button>
        <button 
          className={`filter_btn ${activeCategory === 'mexican' ? 'active' : ''}`} 
          onClick={() => filterMenuItems('mexican')}
        >
          Mexican
        </button>
        <button 
          className={`filter_btn ${activeCategory === 'japanese' ? 'active' : ''}`} 
          onClick={() => filterMenuItems('japanese')}
        >
          Japanese
        </button>
        <button 
          className={`filter_btn ${activeCategory === 'thai' ? 'active' : ''}`} 
          onClick={() => filterMenuItems('thai')}
        >
          Thai
        </button>
        <button 
          className={`filter_btn ${activeCategory === 'american' ? 'active' : ''}`} 
          onClick={() => filterMenuItems('american')}
        >
          American
        </button>
        <button 
          className={`filter_btn ${activeCategory === 'mediterranean' ? 'active' : ''}`} 
          onClick={() => filterMenuItems('mediterranean')}
        >
          Mediterranean
        </button>
        <button 
          className={`filter_btn ${activeCategory === 'vegetarian' ? 'active' : ''}`} 
          onClick={() => filterMenuItems('vegetarian')}
        >
          Vegetarian
        </button>
        <button 
          className={`filter_btn ${activeCategory === 'vegan' ? 'active' : ''}`} 
          onClick={() => filterMenuItems('vegan')}
        >
          Vegan
        </button>
        <button 
          className={`filter_btn ${activeCategory === 'seafood' ? 'active' : ''}`} 
          onClick={() => filterMenuItems('seafood')}
        >
          Seafood
        </button>
        <button 
          className={`filter_btn ${activeCategory === 'bbq' ? 'active' : ''}`} 
          onClick={() => filterMenuItems('bbq')}
        >
          BBQ
        </button>
        <button 
          className={`filter_btn ${activeCategory === 'desserts' ? 'active' : ''}`} 
          onClick={() => filterMenuItems('desserts')}
        >
          Desserts
        </button>
        <button 
          className={`filter_btn ${activeCategory === 'beverages' ? 'active' : ''}`} 
          onClick={() => filterMenuItems('beverages')}
        >
          Beverages
        </button>
        <button 
          className={`filter_btn ${activeCategory === 'breakfast' ? 'active' : ''}`} 
          onClick={() => filterMenuItems('breakfast')}
        >
          Breakfast
        </button>
      </div>

      {/* Menu Items */}
      <div className="menu_container">
        {menuItems.length > 0 ? (
          menuItems.map((item, index) => (
            <div key={item.id || index} className="menu_item reveal">
              <div className="menu_image">
                <img src={item.image} alt={item.name} />
                {item.original_price && (
                  <span className="discount_badge">
                    {Math.round((1 - item.price / item.original_price) * 100)}% OFF
                  </span>
                )}
              </div>
              <div className="menu_content">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="menu_rating" dangerouslySetInnerHTML={generateRatingStars(item.rating)}></div>
                <div className="menu_price">
                  <span className="current_price">${item.price}</span>
                  {item.original_price && (
                    <span className="original_price">${item.original_price}</span>
                  )}
                </div>
                <div className="menu_actions">
                  <button className="add_to_cart_btn" onClick={() => addToCart(item)}>
                    <i className="fas fa-shopping-cart"></i> Add to Cart
                  </button>
                  {isAdminMode && (
                    <div className="admin_actions">
                      <button className="edit_btn" onClick={() => handleEditItem(item)}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="delete_btn" onClick={() => handleDeleteItem(item)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no_items">
            <i className="fas fa-utensils"></i>
            <h3>No items found in this category</h3>
            <p>Try selecting a different category or check back later for new additions!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;