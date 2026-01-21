import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Account.css';

const Account = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user, signUp, signIn, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError('');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const result = signUp(formData.email, formData.password, formData.name);
    if (result.success) {
      setSuccess(result.message);
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } else {
      setError(result.message);
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email');
      return;
    }
    if (!formData.password) {
      setError('Password is required');
      return;
    }

    const result = signIn(formData.email, formData.password);
    if (result.success) {
      setSuccess(result.message);
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } else {
      setError(result.message);
    }
  };

  const handleLogOut = () => {
    logOut();
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setSuccess('Logged out successfully!');
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  if (user) {
    return (
      <section className="account">
        <div className="account-container">
          <div className="account-card">
            <div className="user-info">
              <div className="user-avatar">👤</div>
              <h2>Welcome, {user.name}!</h2>
              <p className="user-email">{user.email}</p>
            </div>
            <div className="user-details">
              <div className="detail-item">
                <span className="label">Name:</span>
                <span className="value">{user.name}</span>
              </div>
              <div className="detail-item">
                <span className="label">Email:</span>
                <span className="value">{user.email}</span>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogOut}>
              Logout
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="account">
      <div className="account-container">
        <div className="account-form-container">
          <div className="form-toggle">
            <button
              className={`toggle-btn ${!isSignUp ? 'active' : ''}`}
              onClick={() => {
                setIsSignUp(false);
                setError('');
                setSuccess('');
              }}
            >
              Sign In
            </button>
            <button
              className={`toggle-btn ${isSignUp ? 'active' : ''}`}
              onClick={() => {
                setIsSignUp(true);
                setError('');
                setSuccess('');
              }}
            >
              Sign Up
            </button>
          </div>

          <form className="account-form" onSubmit={isSignUp ? handleSignUp : handleSignIn}>
            <h2>{isSignUp ? 'Create Account' : 'Sign In'}</h2>

            {isSignUp && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
              />
            </div>

            {isSignUp && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                />
              </div>
            )}

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <button type="submit" className="submit-btn">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="form-footer">
            <p>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button
                type="button"
                className="toggle-link"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setSuccess('');
                }}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Account;
