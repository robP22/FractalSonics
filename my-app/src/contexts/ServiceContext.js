import React, { createContext, useContext } from 'react';
import ProductService from '../services/ProductService';

const ServiceContext = createContext();

export function ServiceProvider({ children, services = {} }) {
    const defaultServices = {
        productService: new ProductService(),
        ...services
    };

    return (
        <ServiceContext.Provider value={defaultServices}>
            {children}
        </ServiceContext.Provider>
    );
}

export const useServices = () => {
    const context = useContext(ServiceContext);
    if (!context) {
        throw new Error('useServices must be used within ServiceProvider');
    }
    return context;
};