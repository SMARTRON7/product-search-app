import React, { createContext, useContext, useState, useMemo } from 'react';

const SearchContext = createContext();

export function SearchProvider({ children }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const value = useMemo(() => ({
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory
    }), [searchTerm, selectedCategory]);

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
}
