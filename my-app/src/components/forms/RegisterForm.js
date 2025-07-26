import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/LoginForm.css'; // Reuse the same styles

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const { register, error, clearError } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear validation error for this field
        if (validationErrors[name]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.firstName.trim()) {
            errors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            errors.lastName = 'Last name is required';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        clearError();

        const result = await register(
            formData.email,
            formData.password,
            formData.firstName,
            formData.lastName
        );

        if (result.success) {
            console.log('Registration successful!');
        }

        setIsLoading(false);
    };

    return (
        <div className="login-form-container">
            <h3>Create Your Account</h3>
            {error && (
                <div className="login-error">
                    {error}
                </div>
            )}
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className={`form-input ${validationErrors.firstName ? 'error' : ''}`}
                            autoComplete="given-name"
                            placeholder="Enter your first name"
                        />
                        {validationErrors.firstName && (
                            <div className="field-error">{validationErrors.firstName}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className={`form-input ${validationErrors.lastName ? 'error' : ''}`}
                            autoComplete="family-name"
                            placeholder="Enter your last name"
                        />
                        {validationErrors.lastName && (
                            <div className="field-error">{validationErrors.lastName}</div>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address:</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`form-input ${validationErrors.email ? 'error' : ''}`}
                        autoComplete="email"
                        placeholder="Enter your email address"
                    />
                    {validationErrors.email && (
                        <div className="field-error">{validationErrors.email}</div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className={`form-input ${validationErrors.password ? 'error' : ''}`}
                        autoComplete="new-password"
                        placeholder="Create a password (min. 6 characters)"
                    />
                    {validationErrors.password && (
                        <div className="field-error">{validationErrors.password}</div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className={`form-input ${validationErrors.confirmPassword ? 'error' : ''}`}
                        autoComplete="new-password"
                        placeholder="Confirm your password"
                    />
                    {validationErrors.confirmPassword && (
                        <div className="field-error">{validationErrors.confirmPassword}</div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="login-button"
                >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
            </form>
        </div>
    );
}