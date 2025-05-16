import { ProductsProvider } from '../context/ProductsContext';
import { SearchProvider } from '../context/SearchContext';
import { AutocompleteInput } from './AutocompleteInput';
import { ProductList } from './ProductList';
import { ProductDetails } from './ProductDetails';
import "../App.css";

export default function App() {
    return (
        <ProductsProvider>
            <SearchProvider>
                <div className="app">
                    <header>
                        <h1>Product Search</h1>
                        <AutocompleteInput />
                    </header>
                    <div className="content">
                        <div className="product-container">
                            <ProductList />
                        </div>
                        <div className="details-container">
                            <ProductDetails />
                        </div>
                    </div>
                </div>
            </SearchProvider>
        </ProductsProvider>
    );
}