import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/user/profile');
            const data = await response.json();

            if (data.success) {
                setUser(data.user);
            } 
            else {
                setUser(null);
            }
        }
        catch (err) {
            console.error('Auth check failed:', err);
            setUser(null);
        }
        finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                setUser(data.user);
                return { success: true };
            }
            else {
                setError(data.message);
                return { success: false, message: data.message };
            }
        }
        catch (err) {
            setError('Login failed. Please try again.');
            return { success: false, message: 'Login failed. Please try again.'}
        }
    };

    const logout = async () => {
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/api/logout', {
                method: 'POST',
            });
        }
        catch (err) {
            console.error('Logout request failed:', err);
        }
        finally {
            setUser(null);
            setError(null);
        }
    };

    const register = async (email, password, firstName, lastName) => {
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, first_name: firstName, last_name: lastName }),
            });

            const data = await response.json();

            if (data.success) {
                return await login(email, password);
            }
            else {
                setError(data.message);
                return { success: false, message: data.message };
            }
        }
        catch (err) {
            setError('Registration failed. Please try again.');
            return { success: false, message: 'Registration failed. Please try again.'}
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        logout,
        register,
        isAuthenticated: !!user,
        clearError: () => setError(null)
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};