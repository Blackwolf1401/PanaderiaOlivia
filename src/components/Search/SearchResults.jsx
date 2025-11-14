import { useState } from 'react';
import { useSearch } from '../../context/SearchContext';
import { useNavigation } from '../../context/NavigationContext';
import ProductDetail from '../Product/ProductDetail';
import CardProduct from '../UI/CardProduct';
import './SearchResults.css';

export default function SearchResults() {
    const { searchQuery, searchResults, showResults, setShowResults, clearSearch } = useSearch();
    const { navigateTo } = useNavigation();
    const [selectedProduct, setSelectedProduct] = useState(null);

    if (!showResults || !searchQuery.trim()) {
        return null;
    }

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setShowResults(false);
    };

    const handleViewAll = () => {
        navigateTo('tienda');
        setShowResults(false);
        clearSearch();
    };

    return (
        <>
        <div className="search-results-overlay" onClick={() => setShowResults(false)}>
            <div className="search-results-container" onClick={(e) => e.stopPropagation()}>
                <div className="search-results-header">
                    <h3>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        Resultados de búsqueda
                    </h3>
                    <button 
                        className="close-results"
                        onClick={() => setShowResults(false)}
                        aria-label="Cerrar resultados"
                    >
                        <i className="fa-solid fa-times"></i>
                    </button>
                </div>

                <div className="search-query-display">
                    <span>Buscando: <strong>"{searchQuery}"</strong></span>
                    <span className="results-count">
                        {searchResults.length} {searchResults.length === 1 ? 'resultado' : 'resultados'}
                    </span>
                </div>

                {searchResults.length === 0 ? (
                    <div className="no-results">
                        <i className="fa-solid fa-search"></i>
                        <h4>No se encontraron productos</h4>
                        <p>Intenta con otros términos de búsqueda</p>
                        <div className="suggestions">
                            <p>Sugerencias:</p>
                            <button onClick={() => clearSearch()}>Kuchen</button>
                            <button onClick={() => clearSearch()}>Pan</button>
                            <button onClick={() => clearSearch()}>Torta</button>
                            <button onClick={() => clearSearch()}>Sin gluten</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="search-results-grid">
                            {searchResults.map((product) => (
                                <div 
                                    key={product.id} 
                                    className="search-result-item"
                                    onClick={() => handleProductClick(product)}
                                >
                                    <CardProduct
                                        id={product.id}
                                        image={product.image}
                                        alt={product.alt}
                                        discount={product.discount}
                                        name={product.name}
                                        stars={product.stars}
                                        currentPrice={product.currentPrice}
                                        originalPrice={product.originalPrice}
                                        onViewDetail={() => handleProductClick(product)}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="search-results-footer">
                            <button className="btn-view-all" onClick={handleViewAll}>
                                Ver todos los productos en la tienda
                                <i className="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>

        {selectedProduct && (
            <ProductDetail 
                product={selectedProduct} 
                onClose={() => setSelectedProduct(null)} 
            />
        )}
        </>
    );
}

