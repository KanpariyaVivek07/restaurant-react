import React from 'react';

const Menu = ({ addToCart }) => {
  const menuItems = [
    {
      id: 1,
      name: "Classic Burger",
      description: "Juicy beef patty with fresh lettuce, tomatoes, cheese, and our special house sauce on a toasted brioche bun. Served with crispy fries.",
      price: 12.99,
      originalPrice: 15.99,
      image: "image/menu_1.jpg"
    },
    {
      id: 2,
      name: "Fresh Smoothie",
      description: "Blend of seasonal fruits with yogurt and honey. Choose from strawberry, mango, or mixed berry. Perfect refreshing drink for any time of day.",
      price: 6.99,
      originalPrice: 8.99,
      image: "image/menu_2.jpg"
    },
    {
      id: 3,
      name: "Margherita Pizza",
      description: "Traditional Italian pizza with fresh mozzarella, basil, and our signature tomato sauce on hand-tossed dough. Baked in a stone oven for perfect crust.",
      price: 18.99,
      originalPrice: 22.99,
      image: "image/menu_3.png"
    }
  ];

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  return (
    <div className="menu">
      <h1>Our<span>Menu</span></h1>

      <div className="menu_box">
        {menuItems.map(item => (
          <div className="menu_card" key={item.id}>
            <div className="menu_img">
              <img src={item.image} alt={item.name} />
            </div>

            <div className="menu_text">
              <h2>{item.name}</h2>
              <p>{item.description}</p>

              <div className="menu_icon">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star-half-stroke"></i>
              </div>

              <p className="price">${item.price}<sub><del>${item.originalPrice}</del></sub></p>

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

export default Menu;