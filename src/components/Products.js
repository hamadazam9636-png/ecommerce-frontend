import React, { useContext,useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Products.css';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import axios from "axios";

const Products = () => {
  const { addToCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    if (!isLoggedIn()) {
      navigate('/account');
      return;
    }
    addToCart(product);
    alert('Product added to cart!');
  };
  
  // const products = [
   
  //   {
  //     id: 1,
  //     title: 'Smart Watch',
  //     price: '$199.99',
  //     rating: 4.8,
  //     image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
  //   },
  //    {
  //     id: 2,
  //     title: 'Wireless Headphones',
  //     price: '$79.99',
  //     rating: 4.5,
  //     image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
  //   },
  //   {
  //     id: 3,
  //     title: 'Camera',
  //     price: '$599.99',
  //     rating: 4.6,
  //     image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=300&fit=crop',
  //   },
  //   {
  //     id: 4,
  //     title: 'Laptop',
  //     price: '$999.99',
  //     rating: 4.7,
  //     image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
  //   },
  //   {
  //     id: 5,
  //     title: 'Smartphone',
  //     price: '$799.99',
  //     rating: 4.9,
  //     image: 'https://up.yimg.com/ib/th/id/OIP.5D7assw4utpqSa6Dt1njawHaEK?pid=Api&rs=1&c=1&qlt=95&w=200&h=112',
  //   },
  //   {
  //     id: 6,
  //     title: 'Tablet',
  //     price: '$449.99',
  //     rating: 4.4,
  //     image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=300&fit=crop',
  //   },
  //   {
  //     id: 7,
  //     title: 'Keyboard',
  //     price: '$89.99',
  //     rating: 4.3,
  //     image: 'https://tse1.mm.bing.net/th/id/OIF.0sx4bs719uQV7S6T1No3GQ?pid=Api&P=0&h=220',
  //   },
  //   {
  //     id: 8,
  //     title: 'Mouse',
  //     price: '$49.99',
  //     rating: 4.2,
  //     image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop',
  //   },
  // ];
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState('');
   const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
 useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${REACT_APP_API_BASE_URL}/products/`);
      console.log(response.data);  // debug here
      setProducts(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products from server');
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);
  //   const renderStars = (rating) => {
  //   const fullStars = Math.floor(rating);
  //   const hasHalfStar = rating % 1 !== 0;
  //   const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  //   let starsHTML = [];
    
  //   // Add full stars
  //   for (let i = 0; i < fullStars; i++) {
  //     starsHTML.push(<span key={`full-${i}`} className="star full">★</span>);
  //   }
    
  //   // Add half star
  //   if (hasHalfStar) {
  //     starsHTML.push(<span key="half" className="star half">★</span>);
  //   }
    
  //   // Add empty stars
  //   for (let i = 0; i < emptyStars; i++) {
  //     starsHTML.push(<span key={`empty-${i}`} className="star empty">★</span>);
  //   }
    
  //   return starsHTML;
  // };

  return (
    <section className="products">
      <div className="products-container">
        <h2 className="products-title">Featured Products</h2>
        <p className="products-subtitle">Check out our amazing collection</p>
        
        {/* <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.title} />
                <div className="product-overlay">
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <div className="product-rating">
                  <span className="stars">{renderStars(product.rating)}</span>
                  <span className="rating-value">({product.rating})</span>
                </div>
                <p className="product-price">{product.price}</p>
              </div>
            </div>
          ))}
        </div> */}
        {/* {loading && <p>Loading products...</p>}
        {error && <p className="error-message">{error}</p>}

        {products.map(product => (
  <div key={product.id} className="product-card">
    <div className="product-image">
      <img src={product.image || 'https://via.placeholder.com/300'} alt={product.name} />
      <div className="product-overlay">
        <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
          🛒 Add to Cart
        </button>
      </div>
    </div>
    <div className="product-info">
      <h3 className="product-title">{product.name}</h3>
      <p className="product-price">${parseFloat(product.price).toFixed(2)}</p>
      <p className="product-description">{product.description}</p>
      <span className={`status ${product.available ? 'available' : 'unavailable'}`}>
        {product.available ? '✓ Available' : '✗ Unavailable'}
      </span>
    </div>
  </div>
))} */}
    <div className="products-grid">
  {loading && <p>Loading products...</p>}
  {error && <p className="error-message">{error}</p>}

  {products.map((product) => (
    <div key={product.id} className="product-card">
      {/* Product Image */}
      <div className="product-image">
        <img
          src={product.image || 'https://via.placeholder.com/300'}
          alt={product.name || 'Product'}
        />
        <div className="product-overlay">
          <button
            className="add-to-cart-btn"
            onClick={() => handleAddToCart(product)}
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        {/* <div className="product-rating">
          <span className="stars">{renderStars(product.rating || 0)}</span>
          <span className="rating-value">({product.rating || 0})</span>
        </div> */}
        <p className="product-price">${parseFloat(product.price || 0).toFixed(2)}</p>
        <p className="product-description">{product.description || ''}</p>
        <span className={`status ${product.available ? 'available' : 'unavailable'}`}>
          {product.available ? '✓ Available' : '✗ Unavailable'}
        </span>
      </div>
    </div>
  ))}
</div>


      </div>
    </section>
  );
};

export default Products;
