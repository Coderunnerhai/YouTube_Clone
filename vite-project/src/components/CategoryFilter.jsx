import React from 'react';
import './CategoryFilter.css';

const categories = ['All', 'Education', 'Programming', 'Design'];

function CategoryFilter({ selectedCategory, onSelectCategory }) {
  return (
    <div className="category-filter">
      {categories.map(category => (
        <button
          key={category}
          className={category === selectedCategory ? 'active' : ''}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;