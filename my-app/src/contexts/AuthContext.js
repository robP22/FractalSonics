import React, { createContext, useContext, useState, useEffect } from 'react';

// Step 1: Create the context
const AuthContext = createContext();

// Step 2: Create the provider component
export function AuthProvider({ children }) {
    // Step 3: Define state variables
    const [user, setUser] = useState(null);           // null = not logged in, object = user data
    const [loading, setLoading] = useState(true);     // true while checking if user is logged in
    const [error, setError] = useState('');           // stores auth error messages

    // Step 4: Check authentication status when app loads
    useEffect(() => {
        checkAuthStatus();
    }, []);

    // Step 5: Function to check if user is already logged in (from session)
    const checkAuthStatus = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/user/profile', {
                credentials: 'include' // This sends session cookies to backend
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setUser(data.user); // User is logged in, store their data
                }
            }
            // If response is not ok, user is not logged in (which is fine)
        } catch (err) {
            console.error('Auth check failed:', err);
            // Network error, but don't show error to user - just assume not logged in
        } finally {
            setLoading(false); // Done checking, show the app
        }
    };

    // Step 6: Login function
    const login = async (email, password) => {
        try {
            setError(''); // Clear any previous errors
            
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include session cookies
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            
            if (data.success) {
                setUser(data.user); // Store user data in state
                return { success: true };
            } else {
                setError(data.message); // Show error from backend
                return { success: false, message: data.message };
            }
        } catch (err) {
            const errorMsg = 'Login failed. Please check your connection and try again.';
            setError(errorMsg);
            return { success: false, message: errorMsg };
        }
    };

    // Step 7: Logout function
    const logout = async () => {
        try {
            // Tell backend to clear the session
            await fetch('http://localhost:5000/api/logout', {
                method: 'POST',
                credentials: 'include',
            });
        } catch (err) {
            console.error('Logout request failed:', err);
            // Even if backend call fails, we'll clear local state
        } finally {
            setUser(null);  // Clear user data
            setError('');   // Clear any errors
        }
    };

    // Step 8: Create the value object that components will access
    const value = {
        user,                           // Current user data (null if not logged in)
        loading,                        // Is auth check in progress?
        error,                          // Current error message
        login,                          // Function to log in
        logout,                         // Function to log out
        isAuthenticated: !!user,        // Boolean: is user logged in?
        clearError: () => setError('')  // Function to clear error messages
    };

    // Step 9: Provide the context to child components
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Step 10: Custom hook to use the auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};