import React from 'react';
import './About.css';
import { useNavigate } from 'react-router-dom';
const About = () => {
   const navigate = useNavigate();

  const handleShopNow = () => {
    navigate('/products');
  };
  const features = [
    {
      id: 1,
      icon: '🚚',
      title: 'Fast Shipping',
      description: 'Get your orders delivered quickly with our reliable shipping partners worldwide.'
    },
    {
      id: 2,
      icon: '🔒',
      title: 'Secure Checkout',
      description: 'Your payment information is encrypted and protected with industry-standard security.'
    },
    {
      id: 3,
      icon: '💰',
      title: 'Best Prices',
      description: 'We offer competitive pricing and regular discounts on all our products.'
    },
    {
      id: 4,
      icon: '⭐',
      title: 'Quality Products',
      description: 'All our products are carefully selected and quality-tested before shipment.'
    },
    {
      id: 5,
      icon: '👥',
      title: '24/7 Support',
      description: 'Our dedicated customer support team is always available to help you.'
    },
    {
      id: 6,
      icon: '✅',
      title: 'Easy Returns',
      description: 'Hassle-free returns within 30 days if you are not satisfied with your purchase.'
    }
  ];

  return (
    <section className="about">
      <div className="about-container">
        <div className="about-header">
          <h2 className="about-title">About Our Store</h2>
          <p className="about-subtitle">Your Trusted Online Shopping Destination</p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <h3>Welcome to Hadi Store</h3>
            <p>
              We are a leading e-commerce platform dedicated to providing you with the best shopping experience. 
              With over 10 years of experience in the industry, we have served millions of satisfied customers 
              worldwide.
            </p>
            <p>
              Our mission is to make online shopping accessible, affordable, and enjoyable for everyone. 
              We carefully curate our product selection to ensure quality and value for money.
            </p>
            <p>
              Whether you're looking for the latest electronics, fashion items, or everyday essentials, 
              we have everything you need in one place.
            </p>
          </div>

          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop" 
              alt="About our store"
              className="about-img"
            />
          </div>
        </div>

        <div className="features-section">
          <h3 className="features-title">Why Choose Us?</h3>
          <div className="features-grid">
            {features.map((feature) => (
              <div key={feature.id} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h4 className="feature-title">{feature.title}</h4>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about-cta">
          <h3>Ready to Start Shopping?</h3>
          <p>Explore our wide range of products and find exactly what you're looking for.</p>
          <button className="cta-btn" onClick={handleShopNow}>Browse Products</button>
        </div>
      </div>
    </section>
  );
};

export default About;
