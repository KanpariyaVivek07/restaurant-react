import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { showNotification } from '../utils/notifications';

const MenuSection = () => {
  const { addToCart } = useContext(CartContext);

  const menuItems = [
    {
      id: 1,
      name: "Classic Burger",
      description: "Juicy beef patty with fresh lettuce, tomatoes, cheese, and our special house sauce on a toasted brioche bun. Served with crispy fries.",
      price: 12.99,
      originalPrice: 15.99,
      image: "/images/menu_1.jpg",
      rating: 4.5
    },
    {
      id: 2,
      name: "Fresh Smoothie",
      description: "Blend of seasonal fruits with yogurt and honey. Choose from strawberry, mango, or mixed berry. Perfect refreshing drink for any time of day.",
      price: 6.99,
      originalPrice: 8.99,
      image: "/images/menu_2.jpg",
      rating: 4.5
    },
    {
      id: 3,
      name: "Margherita Pizza",
      description: "Traditional Italian pizza with fresh mozzarella, basil, and our signature tomato sauce on hand-tossed dough. Baked in a stone oven for perfect crust.",
      price: 18.99,
      originalPrice: 22.99,
      image: "/images/menu_3.png",
      rating: 4.5
    }
  ];

  const handleAddToCart = (item) => {
    addToCart(item);
    showNotification(`${item.name} added to cart!`, 'success');
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fa-solid fa-star"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="fa-solid fa-star-half-stroke"></i>);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<i key={`empty-${i}`} className="fa-regular fa-star"></i>);
    }

    return stars;
  };

  return (
    <div className="menu">
      <h1>Our<span>Menu</span></h1>

      <div className="menu_box">
        {menuItems.map(item => (
          <div key={item.id} className="menu_card">
            <div className="menu_img">
              <img src={item.image} alt={item.name} />
            </div>

            <div className="menu_text">
              <h2>{item.name}</h2>
              <p>{item.description}</p>

              <div className="menu_icon">
                {renderStars(item.rating)}
              </div>

              <p className="price">
                ${item.price.toFixed(2)}
                <sub><del>${item.originalPrice.toFixed(2)}</del></sub>
              </p>

              <button 
                className="menu_btn"
                onClick={() => handleAddToCart(item)}
              >
                <i className="fa-solid fa-shopping-cart"></i>Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuSection;