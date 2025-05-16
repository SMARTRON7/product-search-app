import React, { createContext, useContext, useMemo, useState } from 'react';
import { products } from '../data/products';

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const categories = useMemo(() => {
        const uniqueCategories = new Set();
        products.forEach(product => uniqueCategories.add(product.category));
        return Array.from(uniqueCategories);
    }, []);

    const value = useMemo(() => ({
        products,
        categories,
        selectedProduct,
        setSelectedProduct
    }), [categories, selectedProduct]);

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductsProvider');
    }
    return context;
}