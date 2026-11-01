import React from 'react';

const Offers = ({ addToCart }) => {
  const offers = [
    {
      id: 1,
      title: "Mega Burger Combo",
      description: "Get our signature burger with fries and drink at 40% off",
      originalPrice: 15.99,
      discountedPrice: 9.59,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tag: "Limited Time"
    },
    {
      id: 2,
      title: "2 Large Pizzas + Free Drink",
      description: "Order any two large pizzas and get a free soft drink",
      originalPrice: 29.98,
      discountedPrice: 24.99,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tag: "Family Pack"
    },
    {
      id: 3,
      title: "Pasta Combo for Two",
      description: "Two pasta dishes with garlic bread and salad - 30% off",
      originalPrice: 22.50,
      discountedPrice: 15.75,
      image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tag: "Weekend Special"
    },
    {
      id: 4,
      title: "Breakfast Bundle",
      description: "Pancakes, eggs, bacon and coffee - perfect morning combo",
      originalPrice: 12.99,
      discountedPrice: 8.99,
      image: "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tag: "Morning Deal"
    }
  ];

  const handleAddToCart = (offer) => {
    addToCart({
      name: offer.title,
      price: offer.discountedPrice,
      image: offer.image
    });
  };

  return (
    <div className="offer">
      <div className="section_header">
        <h1>Hot <span>Deals</span></h1>
        <p>Don't miss out on these exclusive offers</p>
      </div>

      <div className="offer_container">
        {offers.map(offer => (
          <div className="offer_card" key={offer.id}>
            <div className="offer_img">
              <img src={offer.image} alt={offer.title} />
              <div className="offer_tag">{offer.tag}</div>
            </div>
            <div className="offer_content">
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
              <div className="price">
                <span className="original_price">${offer.originalPrice}</span>
                <span className="discounted_price">${offer.discountedPrice}</span>
              </div>
              <button 
                className="offer_btn"
                onClick={() => handleAddToCart(offer)}
              >
                <i className="fa-solid fa-cart-plus"></i> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;