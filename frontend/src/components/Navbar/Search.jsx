import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

const SearchResults = () => {
    const { filteredFoods } = useContext(StoreContext);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Search Results</h2>
            {filteredFoods.length === 0 ? (
                <p>No food items found.</p>
            ) : (
                <ul>
                    {filteredFoods.map(food => (
                        <li key={food._id}>{food.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchResults;