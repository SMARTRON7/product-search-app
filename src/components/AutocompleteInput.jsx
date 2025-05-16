import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useProducts } from "../context/ProductsContext";
import { useSearch } from "../context/SearchContext";
import { useDebounce } from '../hooks/useDebounce';

export const AutocompleteInput = React.memo(() => {
    const { products } = useProducts();
    const { searchTerm, setSearchTerm, selectedCategory } = useSearch();
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const inputRef = useRef();

    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const filterSuggestions = useCallback(() => {
        if (!debouncedSearchTerm) return [];

        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
            const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
            return matchesSearch && matchesCategory;
        }).slice(0, 5);
    }, [debouncedSearchTerm, products, selectedCategory]);

    useEffect(() => {
        if (debouncedSearchTerm) {
            setSuggestions(filterSuggestions());
        } else {
            setSuggestions([]);
        }
    }, [debouncedSearchTerm, filterSuggestions]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        setActiveSuggestion(0);
    };

    const handleSelect = (product) => {
        setSearchTerm(product.name);
        setShowSuggestions(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (suggestions.length > 0) {
                handleSelect(suggestions[activeSuggestion]);
            }
        } else if (e.key === 'ArrowUp') {
            if (activeSuggestion > 0) {
                setActiveSuggestion(activeSuggestion - 1);
            }
        } else if (e.key === 'ArrowDown') {
            if (activeSuggestion < suggestions.length - 1) {
                setActiveSuggestion(activeSuggestion + 1);
            }
        }
    };

    return (
        <div className="autocomplete">
            <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Search products..."
            />
            {showSuggestions && suggestions.length > 0 && (
                <ul className="suggestions">
                    {suggestions.map((product, index) => (
                        <li
                            key={product.id}
                            className={index === activeSuggestion ? 'active' : ''}
                            onClick={() => handleSelect(product)}
                        >
                            {product.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
});