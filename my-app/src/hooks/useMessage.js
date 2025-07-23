import { useState } from 'react';

/**
 * Custom hook for managing temporary messages
 * Consolidates message logic used across multiple components
 */
export function useMessage() {
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success', 'error', 'info', 'warning'

    /**
     * Show a message for a specified duration
     * @param {string} text - Message text
     * @param {string} type - Message type ('success', 'error', 'info', 'warning')
     * @param {number} duration - Duration in milliseconds (default: 5000)
     */
    const showMessage = (text, type = 'info', duration = 5000) => {
        setMessage(text);
        setMessageType(type);
        
        if (duration > 0) {
            setTimeout(() => {
                clearMessage();
            }, duration);
        }
    };

    /**
     * Show success message
     * @param {string} text - Success message text
     * @param {number} duration - Duration in milliseconds
     */
    const showSuccess = (text, duration = 5000) => {
        showMessage(text, 'success', duration);
    };

    /**
     * Show error message
     * @param {string} text - Error message text
     * @param {number} duration - Duration in milliseconds
     */
    const showError = (text, duration = 5000) => {
        showMessage(text, 'error', duration);
    };

    /**
     * Show info message
     * @param {string} text - Info message text
     * @param {number} duration - Duration in milliseconds
     */
    const showInfo = (text, duration = 5000) => {
        showMessage(text, 'info', duration);
    };

    /**
     * Show warning message
     * @param {string} text - Warning message text
     * @param {number} duration - Duration in milliseconds
     */
    const showWarning = (text, duration = 3000) => {
        showMessage(text, 'warning', duration);
    };

    /**
     * Clear the current message
     */
    const clearMessage = () => {
        setMessage('');
        setMessageType('');
    };

    return {
        message,
        messageType,
        showMessage,
        showSuccess,
        showError,
        showInfo,
        showWarning,
        clearMessage,
        hasMessage: !!message
    };
}