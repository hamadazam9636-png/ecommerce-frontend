import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { emailJSConfig } from '../config/emailConfig';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Send email using EmailJS with new template
      const result = await emailjs.send(
        emailJSConfig.SERVICE_ID,
        emailJSConfig.TEMPLATE_ID,
        {
          to_email: emailJSConfig.RECIPIENT_EMAIL,
          from_name: `${formData.firstName} ${formData.lastName}`,
          from_email: formData.email,
          phone: formData.phone || 'Not provided',
          subject: formData.subject,
          message: formData.message,
        },
        emailJSConfig.PUBLIC_KEY
      );

      console.log('Email sent successfully:', result);
      setSubmitted(true);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error('Email send error details:', err);
      const errorMessage = err.text || err.message || 'Unknown error occurred';
      setError(`Failed to send message: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      id: 1,
      icon: '📍',
      title: 'Address',
      details: '12 Shopping Street,Near GT Road Okara'
    },
    {
      id: 2,
      icon: '📞',
      title: 'Phone',
      details: '+92 300 1234567'
    },
    {
      id: 3,
      icon: '✉️',
      title: 'Email',
      details: 'support@hadistore.com'
    },
    {
      id: 4,
      icon: '🕐',
      title: 'Hours',
      details: 'Mon - Fri: 9:00 AM - 6:00 PM'
    }
  ];

  return (
    <section className="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">Get in Touch</h2>
          <p className="contact-subtitle">We'd love to hear from you. Send us a message!</p>
        </div>

        <div className="contact-content">
          {/* Contact Information */}
          <div className="contact-info-section">
            <h3>Contact Information</h3>
            <div className="contact-info-grid">
              {contactInfo.map((info) => (
                <div key={info.id} className="info-card">
                  <div className="info-icon">{info.icon}</div>
                  <h4>{info.title}</h4>
                  <p>{info.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <h3>Send us a Message</h3>
            {submitted ? (
              <div className="success-message">
                <p>✅ Thank you for your message! We'll get back to you soon.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                {error && <div className="error-message">{error}</div>}

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is this about?"
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
