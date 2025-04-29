import React, { useContext } from 'react';
import './SearchResults.css';
import FoodItem from '../../components/FoodItem/FoodItem';
import { StoreContext } from '../../context/StoreContext';

const SearchResults = ({ searchTerm }) => {
  const { food_list } = useContext(StoreContext);

  const filteredFoods = food_list.filter((food) =>
    food.name?.toLowerCase().includes(searchTerm?.toLowerCase() || '')
  );

  return (
    <div className='search-results'>
      <h2>Search Results</h2>
      <div className='search-results-list'>
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => (
            <FoodItem
              key={food._id}
              id={food._id}
              name={food.name}
              price={food.price}
              description={food.description}
              image={food.image}
            />
          ))
        ) : (
          <p>No matching items found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
