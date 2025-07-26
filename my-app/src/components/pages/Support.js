import React, { useState } from 'react';
import '../../styles/Support.css';

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
                    <h2>Get In Touch</h2>

                    <div className="contact-item">
                        <div className="contact-icon">📞</div>
                        <div className="contact-details">
                            <h3>Phone Support</h3>
                            <p className="phone-number">1-800-FRACTAL</p>
                            <p className="hours">Available Monday - Friday</p>
                            <p className="hours">5:00 AM - 8:00 PM MST</p>
                            <p className="contact-note">For immediate assistance with orders and technical issues</p>
                        </div>
                    </div>

                    <div className="contact-item">
                        <div className="contact-icon">✉️</div>
                        <div className="contact-details">
                            <h3>Email Support</h3>
                            <p className="email-address">support@fractalsonics.com</p>
                            <p className="response-time">Guaranteed response within 24 hours</p>
                            <p className="contact-note">Perfect for detailed inquiries and product questions</p>
                        </div>
                    </div>



                    <div className="contact-item">
                        <div className="contact-icon">🌐</div>
                        <div className="contact-details">
                            <h3>Social Media</h3>
                            <p className="social-links">Follow us for updates and community support</p>
                            <p className="social-platforms">Twitter • Instagram • YouTube</p>
                            <p className="contact-note">Join our community of music creators</p>
                        </div>
                    </div>
                </div>

                <div className="contact-form-container">
                    <div className="form-header">
                        <h2>🎧 Technical Support Request</h2>
                    </div>
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
                                    placeholder="Your full name"
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
                                    placeholder="your.email@example.com"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="subject">Issue Category *</label>
                                <select
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="form-select"
                                >
                                    <option value="">Select an issue type...</option>
                                    <option value="download-issue">Download Problems</option>
                                    <option value="file-compatibility">File Compatibility</option>
                                    <option value="order-inquiry">Order Inquiry</option>
                                    <option value="licensing-question">Licensing Question</option>
                                    <option value="technical-support">Technical Support</option>
                                    <option value="product-question">Product Question</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="priority">Urgency Level</label>
                                <select
                                    id="priority"
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    className="form-select"
                                >
                                    <option value="low">🟢 Low - General inquiry</option>
                                    <option value="medium">🟡 Medium - Product support</option>
                                    <option value="high">🟠 High - Order issue</option>
                                    <option value="urgent">🔴 Urgent - Can't access purchase</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Detailed Description *</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="form-textarea"
                                rows="6"
                                placeholder="Please describe your issue in detail. Include:
• What you were trying to do
• What happened instead
• Any error messages you received
• Your operating system and software versions"
                            ></textarea>
                        </div>

                        <div className="form-benefits">
                            <h4>✨ Why use this form?</h4>
                            <ul>
                                <li>📎 Attach screenshots or files (coming soon)</li>
                                <li>🎯 Priority routing to specialists</li>
                                <li>📧 Automatic ticket tracking</li>
                                <li>⚡ Faster resolution for technical issues</li>
                            </ul>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="submit-button"
                        >
                            {isSubmitting ? '📤 Sending Support Request...' : '🚀 Submit Support Request'}
                        </button>
                    </form>
                </div>
            </div>

            <div className="faq-section">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-grid">
                    <div className="faq-item">
                        <h3>How quickly will I receive my digital downloads?</h3>
                        <p>Your download links are delivered instantly via email upon successful payment. You'll also find all your purchases in the 'My Account' section for easy access anytime.</p>
                    </div>
                    <div className="faq-item">
                        <h3>What file formats do you provide?</h3>
                        <p>All audio products are delivered in high-quality WAV format (24-bit/44.1kHz) for professional use. Some products may also include additional formats like MIDI files.</p>
                    </div>
                    <div className="faq-item">
                        <h3>Can I use these sounds commercially?</h3>
                        <p>Yes! All Fractal Sonics products come with full commercial licensing. You can use them in your music, videos, games, and any commercial projects without additional fees.</p>
                    </div>
                    <div className="faq-item">
                        <h3>What if I have technical issues with my purchase?</h3>
                        <p>Our technical support team is here to help! Contact us via phone (1-800-FRACTAL) or email, and we'll resolve any download or compatibility issues quickly.</p>
                    </div>
                    <div className="faq-item">
                        <h3>Do you offer refunds on digital products?</h3>
                        <p>Due to the instant nature of digital downloads, we don't offer refunds. However, if you experience technical issues, we're committed to resolving them promptly.</p>
                    </div>
                    <div className="faq-item">
                        <h3>How do I access my previous purchases?</h3>
                        <p>Simply log into your account and visit the 'My Purchases' section. All your download links are stored there permanently for easy re-downloading whenever needed.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}