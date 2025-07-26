import React from 'react';
import { Message, LoadingSpinner } from '../ui';

/**
 * Reusable page layout component that provides consistent structure
 * and handles common page-level concerns like error messages and loading states
 * 
 * @param {React.ReactNode} children - The content to render inside the layout
 * @param {string} className - Additional CSS classes to apply to the container
 * @param {string|null} error - Error message to display, if any
 * @param {Function} onErrorClose - Callback function to handle error dismissal
 * @param {boolean} loading - Whether the page is in a loading state
 * @param {string} loadingMessage - Message to display during loading
 * @param {string} containerClass - Base CSS class for the container
 * @returns {React.ReactElement} The rendered page layout
 */
export default function PageLayout({ 
  children, 
  className = '', 
  error, 
  onErrorClose, 
  loading, 
  loadingMessage = 'Loading...',
  containerClass = 'page-container'
}) {
  return (
    <div className={`${containerClass} ${className}`.trim()}>
      {error && (
        <Message 
          message={error} 
          type="error" 
          onClose={onErrorClose} 
        />
      )}
      
      {loading ? (
        <LoadingSpinner message={loadingMessage} />
      ) : (
        children
      )}
    </div>
  );
}