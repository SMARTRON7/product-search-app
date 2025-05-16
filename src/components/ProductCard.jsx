import React from 'react';
import { useProducts } from "../context/ProductsContext";

export const ProductCard = React.memo(({ product }) => {
    const { setSelectedProduct } = useProducts();

    return (
        <div className="product-card" onClick={() => setSelectedProduct(product)}>
            <h3>{product.name}</h3>
            <div className="category">{product.category}</div>
            <div className="price">${product.price.toFixed(2)}</div>
            <div className={`stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
            </div>
            <div className="rating">Rating: {product.rating}/5</div>
        </div>
    );
});