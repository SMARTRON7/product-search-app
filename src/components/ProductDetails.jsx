import React from 'react';
import { useProducts } from "../context/ProductsContext";

export const ProductDetails = React.memo(() => {
    const { selectedProduct } = useProducts();

    if (!selectedProduct) {
        return <div className="product-details empty">Select a product to see details</div>;
    }

    return (
        <div className="product-details">
            <h2>{selectedProduct.name}</h2>
            <div className="category">Category: {selectedProduct.category}</div>
            <div className="price">Price: ${selectedProduct.price.toFixed(2)}</div>
            <div className={`stock ${selectedProduct.inStock ? 'in-stock' : 'out-of-stock'}`}>
                {selectedProduct.inStock ? 'In Stock' : 'Out of Stock'}
            </div>
            <div className="rating">Rating: {selectedProduct.rating}/5</div>
            <p className="description">{selectedProduct.description}</p>
        </div>
    );
});