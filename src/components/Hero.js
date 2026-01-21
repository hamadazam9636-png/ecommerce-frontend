import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate('/products');
  };

  const handleLearnMore = () => {
    navigate('/about');
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Hadi Store</h1>
          <p className="hero-subtitle">
            Discover amazing products at unbeatable prices
          </p>
          <p className="hero-description">
            Shop the latest trends and find everything you need in one place. 
            Fast shipping, secure checkout, and excellent customer service.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={handleShopNow}>Shop Now</button>
            <button className="btn btn-secondary" onClick={handleLearnMore}>Learn More</button>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop"
            alt="Hero Section"
            className="hero-img"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
