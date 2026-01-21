import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">🛒 Shop</Link>
        </div>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={handleLinkClick}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link" onClick={handleLinkClick}>
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link" onClick={handleLinkClick}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link" onClick={handleLinkClick}>
              Contact
            </Link>
          </li>
          <li className="nav-item mobile-cart">
            <Link to="/cart" className="nav-link" onClick={handleLinkClick}>
              🛍️ Cart
            </Link>
          </li>
          <li className="nav-item mobile-account">
            <Link to="/account" className="nav-link" onClick={handleLinkClick}>
              {user ? `👤 ${user.name}` : '👤 Account'}
            </Link>
          </li>
        </ul>

        <div className="nav-icons">
          <Link to="/cart" className="cart-icon">
            🛍️ Cart {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
          </Link>
          <Link to="/account" className="account-icon">
            {user ? `👤 ${user.name}` : '👤 Account'}
          </Link>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <span className={isOpen ? 'open' : ''}></span>
          <span className={isOpen ? 'open' : ''}></span>
          <span className={isOpen ? 'open' : ''}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
