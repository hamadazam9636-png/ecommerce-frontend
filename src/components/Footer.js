import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const paymentMethods = [
    { id: 1, icon: '💳', name: 'Visa', description: 'Secure payment with Visa' },
    { id: 2, icon: '💳', name: 'Mastercard', description: 'Secure payment with Mastercard' },
    { id: 3, icon: '🅿️', name: 'PayPal', description: 'Fast & secure PayPal checkout' },
    { id: 4, icon: '🍎', name: 'Apple Pay', description: 'One-tap payment with Apple Pay' },
  ];

  const handlePaymentClick = (method) => {
    setSelectedPayment(method);
    setTimeout(() => setSelectedPayment(null), 3000);
  };

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/products' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const customerService = [
    { name: 'FAQ', href: '/faq' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
    { name: 'Track Order', href: '/track' },
  ];

  const company = [
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Blog', href: '/blog' },
    { name: 'Partnerships', href: '/partnerships' },
  ];

  const policies = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Refund Policy', href: '/refund' },
  ];

  const socialLinks = [
    { icon: '📘', name: 'Facebook', url: 'https://facebook.com' },
    { icon: '𝕏', name: 'Twitter', url: 'https://twitter.com' },
    { icon: '📷', name: 'Instagram', url: 'https://instagram.com' },
    { icon: '▶️', name: 'YouTube', url: 'https://youtube.com' },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Newsletter Section */}
        <div className="newsletter-section">
          <h3>Subscribe to Our Newsletter</h3>
          <p>Get the latest updates on new products and upcoming sales</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
            {subscribed && <span className="success">✓ Thank you for subscribing!</span>}
          </form>
        </div>

        {/* Footer Links */}
        <div className="footer-content">
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h4>Customer Service</h4>
            <ul>
              {customerService.map((link, index) => (
                <li key={index}>
                  <Link to={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              {company.map((link, index) => (
                <li key={index}>
                  <Link to={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h4>Policies</h4>
            <ul>
              {policies.map((link, index) => (
                <li key={index}>
                  <Link to={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h4>About Hadi Store</h4>
            <p className="about-text">
              Your trusted online shopping destination. We offer quality products with excellent customer service since 2014.
            </p>
            <div className="payment-methods">
              <span>We Accept:</span>
              <div className="payment-icons">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    className="payment-btn"
                    title={method.name}
                    onClick={() => handlePaymentClick(method)}
                  >
                    {method.icon}
                  </button>
                ))}
              </div>
              {selectedPayment && (
                <div className="payment-notification">
                  ✓ {selectedPayment.description}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="social-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social.name}
                className="social-link"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2024 Hadi Store. All rights reserved.</p>
            <p>Made with ❤️ for our customers</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
