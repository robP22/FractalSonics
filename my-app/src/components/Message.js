import React from 'react';

/**
 * Reusable Message component for displaying notifications
 * Consolidates message display logic used across multiple components
 */
export default function Message({ message, type, className = '', onClose }) {
    if (!message) return null;

    const getMessageClass = () => {
        const baseClass = 'message';
        const typeClass = type ? `${baseClass}-${type}` : '';
        return `${baseClass} ${typeClass} ${className}`.trim();
    };

    return (
        <div className={getMessageClass()}>
            {message}
            {onClose && (
                <button 
                    onClick={onClose}
                    className="message-close-btn"
                    aria-label="Close message"
                >
                    ×
                </button>
            )}
        </div>
    );
}