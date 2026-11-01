// src/components/CategoryFilter.js
import React from 'react';

const categories = [
  'all', 'indian', 'chinese', 'italian', 'mexican', 'japanese', 
  'thai', 'american', 'mediterranean', 'vegetarian', 'vegan', 
  'seafood', 'bbq', 'desserts', 'beverages', 'breakfast'
];

const CategoryFilter = ({ activeCategory, setActiveCategory }) => {
  return (
    <div className="category_filter">
      {categories.map(category => (
        <button
          key={category}
          className={`filter_btn ${activeCategory === category ? 'active' : ''}`}
          onClick={() => setActiveCategory(category)}
          data-category={category}
        >
          {category === 'all' ? 'All Items' : category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;