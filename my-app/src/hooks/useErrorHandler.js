import { useState, useCallback } from 'react';

export function useErrorHandler() {
    const [error, setError] = useState('');

    const handleError = useCallback((errorMessage, consoleError) => {
        setError(errorMessage);
        if (consoleError) {
            console.error(consoleError);
        }
    }, []);

    const clearError = useCallback(() => {
        setError('');
    }, []);

    return {
        error,
        handleError,
        clearError,
        hasError: !!error
    };
}