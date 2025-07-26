import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AuthModal } from '../forms';
import { usePurchaseHistory } from '../../hooks/usePurchaseHistory';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { LoadingSpinner } from '../ui';
import '../../styles/Account.css';

export default function Account() {
    const { user, loading, isAuthenticated, logout } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(!isAuthenticated);
    const [activeTab, setActiveTab] = useState('overview');
    const { handleError } = useErrorHandler();
    const { purchaseHistory, loading: historyLoading } = usePurchaseHistory(handleError);

    if (loading) {
        return (
            <div className="account-loading">
                <LoadingSpinner />
                <h2>Loading account...</h2>
            </div>
        );
    }
    
    if (isAuthenticated) {
        const totalSpent = purchaseHistory.reduce((sum, purchase) => 
            sum + (parseFloat(purchase.price) * parseInt(purchase.quantity)), 0
        );
        
        const totalOrders = purchaseHistory.length;
        
        return (
            <div className="account-container">
                <button 
                    className="temp-signout-button"
                    onClick={logout}
                >
                    Sign Out
                </button>
                <div className="account-header">
                    <h1>My Account</h1>
                    <p className="account-welcome">Welcome back, {user?.first_name}!</p>
                </div>

                <div className="account-tabs">
                    <button 
                        className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'purchases' ? 'active' : ''}`}
                        onClick={() => setActiveTab('purchases')}
                    >
                        Purchase History
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('settings')}
                    >
                        Settings
                    </button>
                </div>

                <div className="account-content">
                    {activeTab === 'overview' && (
                        <div className="account-overview">
                            <div className="account-stats">
                                <div className="stat-card">
                                    <h3>Total Orders</h3>
                                    <p className="stat-number">{totalOrders}</p>
                                </div>
                                <div className="stat-card">
                                    <h3>Total Spent</h3>
                                    <p className="stat-number">${totalSpent.toFixed(2)}</p>
                                </div>
                                <div className="stat-card">
                                    <h3>Account Status</h3>
                                    <p className="stat-status">Active</p>
                                </div>
                            </div>
                            
                            <div className="account-info-section">
                                <h3>Account Information</h3>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <label>Full Name:</label>
                                        <span>{user?.first_name} {user?.last_name}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Email:</label>
                                        <span>{user?.email}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Member Since:</label>
                                        <span>July 2025</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'purchases' && (
                        <div className="purchase-history-section">
                            <h3>Purchase History</h3>
                            {historyLoading ? (
                                <LoadingSpinner />
                            ) : purchaseHistory.length > 0 ? (
                                <div className="purchase-history-table">
                                    <div className="table-header">
                                        <span>Product</span>
                                        <span>Date</span>
                                        <span>Quantity</span>
                                        <span>Price</span>
                                        <span>Total</span>
                                        <span>Status</span>
                                        <span>Download</span>
                                    </div>
                                    {purchaseHistory.map((purchase) => (
                                        <div key={purchase.purchase_id} className="table-row">
                                            <span className="product-name">{purchase.product_title}</span>
                                            <span>{new Date(purchase.purchase_date).toLocaleDateString()}</span>
                                            <span>{purchase.quantity}</span>
                                            <span>${parseFloat(purchase.price).toFixed(2)}</span>
                                            <span>${(parseFloat(purchase.price) * parseInt(purchase.quantity)).toFixed(2)}</span>
                                            <span className={`status ${purchase.order_status}`}>{purchase.order_status}</span>
                                            <span>
                                                {purchase.order_status === 'completed' ? (
                                                    <button 
                                                        className="download-button"
                                                        onClick={() => window.open('https://example.com/download', '_blank')}
                                                    >
                                                        Download
                                                    </button>
                                                ) : (
                                                    <span className="download-unavailable">Pending</span>
                                                )}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-purchases">
                                    <p>No purchase history found.</p>
                                    <p>Start shopping to see your orders here!</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="account-settings">
                            <h3>Account Settings</h3>
                            <div className="settings-section">
                                <div className="setting-item">
                                    <h4>Personal Information</h4>
                                    <p>Update your name, email, and other personal details.</p>
                                    <button className="setting-button">Edit Profile</button>
                                </div>
                                <div className="setting-item">
                                    <h4>Password & Security</h4>
                                    <p>Change your password and manage security settings.</p>
                                    <button className="setting-button">Change Password</button>
                                </div>
                                <div className="setting-item">
                                    <h4>Notification Preferences</h4>
                                    <p>Manage how you receive notifications about orders and updates.</p>
                                    <button className="setting-button">Manage Notifications</button>
                                </div>
                                <div className="setting-item danger-zone">
                                    <h4>Danger Zone</h4>
                                    <p>Permanently delete your account and all associated data. This action cannot be undone.</p>
                                    <div className="action-buttons">
                                        <button 
                                            className="delete-account-button"
                                            onClick={() => {
                                                if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                                                    alert('Account deletion functionality coming soon...');
                                                }
                                            }}
                                        >
                                            Delete Account
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
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