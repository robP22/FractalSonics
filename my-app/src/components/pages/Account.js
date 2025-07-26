import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AuthModal } from '../forms';
import '../../styles/Account.css';

export default function Account() {
    const { user, loading, isAuthenticated, logout } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(!isAuthenticated);

    if (loading) {
        return (
            <div className="account-loading">
                <h2>Loading...</h2>
            </div>
        );
    }
    
    if (isAuthenticated) {
        return (
            <div className="account-container">
                <div className="account-welcome">
                    <h2>Welcome back, {user?.first_name}!</h2>
                    <div className="account-info">
                        <p><strong>Name:</strong> {user?.first_name} {user?.last_name}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                    </div>
                    <div className="account-actions">
                        <button 
                            className="logout-button"
                            onClick={logout}
                        >
                            Sign Out
                        </button>
                    </div>
                    <p className="account-note">Full account management coming soon...</p>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="account-login-container">
                <div className="account-prompt">
                    <h2>Account Access</h2>
                    <p>Sign in to your account or create a new one to get started.</p>
                    <button 
                        className="open-auth-button"
                        onClick={() => setShowAuthModal(true)}
                    >
                        Sign In / Create Account
                    </button>
                </div>
                
                <AuthModal 
                    isOpen={showAuthModal} 
                    onClose={() => setShowAuthModal(false)} 
                />
            </div>
        );
    }
}