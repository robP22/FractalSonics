import React from 'react';

export default function ErrorMessage({ message, onClose }) {
    if (!message) return null;

    return (
        <div className="error-message" style={{
            color: 'red', 
            padding: '10px', 
            marginBottom: '20px',
            backgroundColor: '#fee',
            border: '1px solid #fcc',
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <span>{message}</span>
            {onClose && (
                <button 
                    onClick={onClose}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'red',
                        cursor: 'pointer',
                        fontSize: '16px',
                        padding: '0 5px'
                    }}
                >
                    ×
                </button>
            )}
        </div>
    );
}