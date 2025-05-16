import React, { useMemo } from 'react';
import { useProducts } from "../context/ProductsContext";
import { useSearch } from "../context/SearchContext";
import { ProductCard } from './ProductCard';

export const ProductList = React.memo(() => {
    const { products } = useProducts();
    const { searchTerm, selectedCategory } = useSearch();

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchTerm, selectedCategory]);

    return (
        <div className="product-list">
            {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))
            ) : (
                <div className="no-results">No products found</div>
            )}
        </div>
    );
});