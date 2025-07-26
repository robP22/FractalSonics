import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import '../../styles/AuthModal.css';

export default function AuthModal({ isOpen, onClose }) {
    const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
    const { isAuthenticated } = useAuth();

    // Close modal when user successfully authenticates
    useEffect(() => {
        if (isAuthenticated && isOpen) {
            onClose();
        }
    }, [isAuthenticated, isOpen, onClose]);

    // Handle ESC key to close modal
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscKey);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="auth-modal-overlay" onClick={handleOverlayClick}>
            <div className="auth-modal-container">
                <button className="auth-modal-close" onClick={onClose}>
                    ×
                </button>
                


                <div className="auth-modal-content">
                    {activeTab === 'login' ? (
                        <div className="auth-form-wrapper">
                            <LoginForm />
                            <div className="auth-switch-prompt">
                                <p>Don't have an account? 
                                    <button 
                                        className="auth-switch-link"
                                        onClick={() => setActiveTab('register')}
                                    >
                                        Create one here
                                    </button>
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="auth-form-wrapper">
                            <RegisterForm />
                            <div className="auth-switch-prompt">
                                <p>Already have an account? 
                                    <button 
                                        className="auth-switch-link"
                                        onClick={() => setActiveTab('login')}
                                    >
                                        Sign in here
                                    </button>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}