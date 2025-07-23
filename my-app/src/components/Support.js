import React, { useState } from 'react';
import '../styles/Support.css';

export default function Support() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        priority: 'medium'
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitted(true);
            setIsSubmitting(false);
            // Reset form after 3 seconds
            setTimeout(() => {
                setIsSubmitted(false);
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                    priority: 'medium'
                });
            }, 3000);
        }, 1000);
    };

    if (isSubmitted) {
        return (
            <div className="support-page">
                <div className="success-message">
                    <h2>✅ Message Sent Successfully!</h2>
                    <p>Thank you for contacting Fractal Sonics. We've received your message and will get back to you within 24 hours.</p>
                    <p>Your ticket reference: #FS{Math.floor(Math.random() * 10000)}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="support-page">
            <div className="support-header">
                <h1>Customer Support</h1>
                <p>We're here to help! Get in touch with our support team.</p>
            </div>

            <div className="support-content">
                <div className="contact-info">
                    <h2>Contact Information</h2>
                    <div className="contact-item">
                        <div className="contact-icon">📞</div>
                        <div className="contact-details">
                            <h3>Phone Support</h3>
                            <p className="phone-number">1-800-FRACTAL</p>
                            <p className="phone-number">(1-800-372-2825)</p>
                            <p className="hours">Monday - Friday: 5:00 AM - 8:00 PM MST</p>
                        </div>
                    </div>

                    <div className="contact-item">
                        <div className="contact-icon">✉️</div>
                        <div className="contact-details">
                            <h3>Email Support</h3>
                            <p>support@fractalsonics.com</p>
                            <p className="response-time">Response within 24 hours</p>
                        </div>
                    </div>

                    <div className="contact-item">
                        <div className="contact-icon">🕒</div>
                        <div className="contact-details">
                            <h3>Business Hours</h3>
                            <p>Monday - Friday: 5:00 AM - 8:00 PM MST</p>
                            <p>Saturday & Sunday: Closed</p>
                        </div>
                    </div>
                </div>

                <div className="contact-form-container">
                    <h2>Send us a Message</h2>
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">Full Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    autoComplete="name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject">Subject *</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="form-input"
                                placeholder="Brief description of your inquiry"
                                autoComplete="off"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="priority">Priority Level</label>
                            <select
                                id="priority"
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="form-select"
                            >
                                <option value="low">Low - General inquiry</option>
                                <option value="medium">Medium - Product support</option>
                                <option value="high">High - Order issue</option>
                                <option value="urgent">Urgent - Technical problem</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message *</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="form-textarea"
                                rows="6"
                                placeholder="Please provide details about your inquiry..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="submit-button"
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>

            <div className="faq-section">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-grid">
                    <div className="faq-item">
                        <h3>How long until I receive my product download link?</h3>
                        <p>Once you place your order, you'll receive a download link via email within 24 hours. You can also visit 'My Purchases' in your account to access your download.</p>
                    </div>
                    <div className="faq-item">
                        <h3>What's your return policy?</h3>
                        <p>As these are digital products, we offer no return policy.</p>
                    </div>
                    <div className="faq-item">
                        <h3>Do you offer technical support?</h3>
                        <p>Yes! Our technical team provides support for all products. Contact us via phone or email for assistance.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}