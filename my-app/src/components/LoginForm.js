import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/LoginForm.css';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login, error, clearError } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        clearError();

        const result = await login(email, password);

        if (result.success) {
            console.log('Login successful!');
        }

        setIsLoading(false);
    };

    return (
        <div className="login-form-container">
            <h3>Login to Your Account</h3>
            {error && (
                <div className="login-error">
                    {error}
                </div>
            )}
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-input"
                        autoComplete="email"
                        aria-describedby="email-help"
                        placeholder="Enter your email address"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-input"
                        autoComplete="current-password"
                        aria-describedby="password-help"
                        placeholder="Enter your password"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="login-button"
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}