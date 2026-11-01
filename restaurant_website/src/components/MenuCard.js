// src/components/MenuCard.js
import React from 'react';

const MenuCard = ({ item, isAdminMode, addToCart }) => {
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

  const handleAddToCart = () => {
    addToCart(item);
  };

  return (
    <div className="menu_card" data-category={item.category}>
      {isAdminMode && (
        <div className="admin-actions">
          <button className="edit-btn" data-id={item.id}>
            <i className="fas fa-edit"></i>
          </button>
          <button className="delete-btn" data-id={item.id}>
            <i className="fas fa-trash"></i>
          </button>
        </div>
      )}
      <div className="menu_img">
        <img src={item.image} alt={item.name} onError={(e) => {
          e.target.src = 'image/default_food.jpg';
        }} />
      </div>
      <div className="menu_text">
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <div 
          className="menu_icon"
          dangerouslySetInnerHTML={generateRatingStars(item.rating)}
        />
        <p className="price">
          ${parseFloat(item.price).toFixed(2)}
          <sub><del>${parseFloat(item.originalPrice).toFixed(2)}</del></sub>
        </p>
        <button className="menu_btn" onClick={handleAddToCart}>
          <i className="fa-solid fa-shopping-cart"></i>Order Now
        </button>
      </div>
    </div>
  );
};

export default MenuCard;