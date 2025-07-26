import React from 'react';
import '../../styles/LoadingSpinner.css';

export default function LoadingSpinner({ message = 'Loading...', size = 'normal' }) {
    return (
        <div className={`loading-spinner ${size}`}>
            <div className="spinner"></div>
            <div className="loading-message">{message}</div>
        </div>
    );
}