import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';
import ImageSlider from '../../components/Header/Slider'; // Correct import path and name (assuming Slider.jsx exports ImageSlider)
import { assets } from '../../assets/assets.js';

const Home = () => {
  const sliderImages = [
    assets.image1,
    assets.image2,
    assets.image3,
    assets.image4,
  ];

  const [category, setCategory] = useState("All");

  return (
    <div className="home-container">
      <Header />
      <ImageSlider images={sliderImages} /> {/* Using the imported ImageSlider */}
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
};

export default Home;