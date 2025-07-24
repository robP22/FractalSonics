import React from 'react';
import '../styles/ErrorMessage.css';

export default function ErrorMessage({ message, onClose, type = 'error' }) {
    if (!message) return null;

    return (
        <div className={`message ${type}`}>
            <span className="message-text">{message}</span>
            {onClose && (
                <button 
                    onClick={onClose}
                    className="message-close-button"
                    aria-label="Close message"
                >
                    ×
                </button>
            )}
        </div>
    );
}