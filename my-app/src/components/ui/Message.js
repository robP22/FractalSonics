import React from 'react';
import '../../styles/Message.css';

/**
 * Unified Message component for displaying notifications
 * Consolidates message display logic used across multiple components
 */
export default function Message({ message, type = 'info', className = '', onClose }) {
    if (!message) return null;

    const getMessageClass = () => {
        const baseClass = 'message';
        const typeClass = type ? `${baseClass} ${type}` : '';
        return `${baseClass} ${typeClass} ${className}`.trim();
    };

    return (
        <div className={getMessageClass()}>
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