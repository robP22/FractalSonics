import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from './LoginForm';
import '../styles/Account.css';

export default function Account() {
    const { user, loading, isAuthenticated } = useAuth();

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
                    <p>Account management coming soon...</p>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="account-login-container">
                <LoginForm />
            </div>
        );
    }
}