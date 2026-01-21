import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    available: true,
  });
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token && token !== 'undefined' && token !== 'null') {
      setIsLoggedIn(true);
      fetchProducts(token); // 👈 token explicitly pass karo
    }
  }, []);
  // Fetch products from API
  const fetchProducts = async (token) => {
    setLoading(true);

    const authToken = token || localStorage.getItem('authToken');

    console.log('FETCH TOKEN:', authToken);

    try {
      const response = await axios.get(
        'http://127.0.0.1:8000/api/products/owner_products/',
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );

      setProducts(response.data);
      setError('');
    } catch (err) {
      console.error('FETCH ERROR:', err.response?.data || err);
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };


  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api-token-auth/`, {
        username: loginData.username,
        password: loginData.password
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      // Save token to localStorage
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('username', loginData.username);

      setIsLoggedIn(true);
      setLoginData({ username: '', password: '' });
      setError('');

      // Fetch products immediately
      fetchProducts(response.data.token);
    } catch (err) {
      setError('Invalid credentials');
      console.error(err);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setProducts([]);
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      available: true,
    });
    setShowForm(false);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Add or update product
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!formData.name || !formData.price) {
  //     setError('Please fill in all required fields');
  //     return;
  //   }

  //   try {
  //     const authToken = localStorage.getItem('authToken');
  //     const config = {
  //       headers: {
  //         Authorization: `Token ${authToken}`,
  //         'Content-Type': 'application/json'
  //       }
  //     };

  //     if (editingId) {
  //       await axios.put(`${API_BASE_URL}/products/${editingId}/`, formData, config);
  //     } else {
  //       await axios.post(`${API_BASE_URL}/products/`, formData, config);
  //     }

  //     setFormData({ name: '', description: '', price: '', stock: '', available: true });
  //     setEditingId(null);
  //     setShowForm(false);
  //     fetchProducts();
  //     setError('');
  //   } catch (err) {
  //     setError('Failed to save product');
  //     console.error(err);
  //   }
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.price) {
    setError('Please fill in all required fields');
    return;
  }

  try {
    const authToken = localStorage.getItem('authToken');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('stock', formData.stock);
    data.append('available', formData.available);

    if (image) {
      data.append('image', image);
    }

    const config = {
      headers: {
        Authorization: `Token ${authToken}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    if (editingId) {
      await axios.put(`${API_BASE_URL}/products/${editingId}/`, data, config);
    } else {
      await axios.post(`${API_BASE_URL}/products/`, data, config);
    }

    setFormData({ name: '', description: '', price: '', stock: '', available: true });
    setImage(null);
    setEditingId(null);
    setShowForm(false);
    fetchProducts();
    setError('');
  } catch (err) {
    setError('Failed to save product');
    console.error(err);
  }
};


  // Edit product
  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      available: product.available
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const authToken = localStorage.getItem('authToken');
      await axios.delete(`${API_BASE_URL}/products/${id}/`, {
        headers: { Authorization: `Token ${authToken}` }
      });
      fetchProducts();
      setError('');
    } catch (err) {
      setError('Failed to delete product');
      console.error(err);
    }
  };

  // **LOGIN FORM**
  if (!isLoggedIn) {
    return (
      <div className="admin-container">
        <div className="login-form">
          <h2>Admin Login</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>
            <button type="submit" className="btn-login">Login</button>
          </form>
          <p className="hint">Use your Django admin credentials</p>
        </div>
      </div>
    );
  }

  // **ADMIN DASHBOARD**
  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>📊 Product Management Dashboard</h1>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="admin-toolbar">
        <button onClick={() => {
          setShowForm(!showForm);
          setEditingId(null);
          setFormData({ name: '', description: '', price: '', stock: '', available: true });
        }} className="btn-primary">
          {showForm ? '❌ Cancel' : '➕ Add New Product'}
        </button>
      </div>

      {showForm && (
        <div className="product-form">
          <h3>{editingId ? 'Edit Product' : 'Add New Product'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Product Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" />
            </div>
            <div className="form-group">
              <label>Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Price *</label>
                <input type="number" name="price" value={formData.price} onChange={handleInputChange} step="0.01" required />
              </div>
              <div className="form-group">
                <label>Stock</label>
                <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} min="0" />
              </div>
            </div>
            <div className="form-group checkbox">
              <input type="checkbox" name="available" checked={formData.available} onChange={handleInputChange} />
              <label>Available for Sale</label>
            </div>
            <button type="submit" className="btn-submit">{editingId ? 'Update Product' : 'Add Product'}</button>
          </form>
        </div>
      )}

      <div className="products-section">
        <h2>Your Products ({products.length})</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p className="no-products">No products yet. Add your first product!</p>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-header">
                  <h3>{product.name}</h3>
                  <span className={`status ${product.available ? 'available' : 'unavailable'}`}>
                    {product.available ? '✓ Available' : '✗ Unavailable'}
                  </span>
                </div>
                <p className="description">{product.description}</p>
                <div className="product-info">
                  <div className="info-item">
                    <span className="label">Price:</span>
                    <span className="price">${parseFloat(product.price).toFixed(2)}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Stock:</span>
                    <span>{product.stock} units</span>
                  </div>
                </div>
                <div className="product-actions">
                  <button onClick={() => handleEdit(product)} className="btn-edit">✏️ Edit</button>
                  <button onClick={() => handleDelete(product.id)} className="btn-delete">🗑️ Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
