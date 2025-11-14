import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import CardProduct from '../UI/CardProduct';
import ProductDetail from '../Product/ProductDetail';
import './CategoryView.css';

export default function CategoryView({ category, products, onClose }) {
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Prevenir scroll del body cuando el modal está abierto
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    // Validar que category y products existan
    if (!category) {
        return null;
    }

    const categoryProducts = products || category.products || [];

    const categoryInfo = {
        'tortas': {
            name: 'Tortas y Postres',
            description: 'Deliciosas tortas y postres artesanales elaborados con los mejores ingredientes',
            icon: 'fa-solid fa-cake-candles'
        },
        'panes': {
            name: 'Panes Artesanales',
            description: 'Panes frescos y artesanales, horneados diariamente con recetas tradicionales',
            icon: 'fa-solid fa-bread-slice'
        },
        'pancito': {
            name: 'Panecillos Especiales',
            description: 'Pequeños panecillos con ingredientes especiales y sabores únicos',
            icon: 'fa-solid fa-cookie-bite'
        }
    };

    const categoryId = category.id || category.className?.replace('category-', '') || '';
    const info = categoryInfo[categoryId] || {
        name: category.name || 'Categoría',
        description: 'Productos seleccionados de la mejor calidad',
        icon: 'fa-solid fa-box'
    };

    const modalContent = (
        <div className="category-view-modal">
            <div className="category-view-overlay" onClick={onClose}></div>
            <div className="category-view-container">
                <button className="category-view-close" onClick={onClose} aria-label="Cerrar">
                    <i className="fa-solid fa-times"></i>
                </button>

                <div className="category-view-header">
                    <div className="category-header-content">
                        <div className="category-icon">
                            <i className={info.icon}></i>
                        </div>
                        <div>
                            <h1>{info.name}</h1>
                            <p>{info.description}</p>
                        </div>
                    </div>
                    <div className="category-stats">
                        <span className="stat-item">
                            <i className="fa-solid fa-box"></i>
                            {categoryProducts.length} {categoryProducts.length === 1 ? 'producto' : 'productos'}
                        </span>
                    </div>
                </div>

                {categoryProducts.length === 0 ? (
                    <div className="category-empty">
                        <i className="fa-solid fa-inbox"></i>
                        <h3>No hay productos en esta categoría</h3>
                        <p>Pronto agregaremos más productos aquí</p>
                    </div>
                ) : (
                    <>
                        <div className="category-instructions">
                            <i className="fa-solid fa-info-circle"></i>
                            <span>Haz clic en cualquier producto para ver detalles o usa el botón del carrito para agregar directamente</span>
                        </div>
                        <div className="category-products-grid">
                            {categoryProducts.map((product) => (
                                <CardProduct
                                    key={product.id || Math.random()}
                                    id={product.id}
                                    image={product.image}
                                    alt={product.alt || product.name}
                                    discount={product.discount}
                                    name={product.name}
                                    stars={product.stars}
                                    currentPrice={product.currentPrice}
                                    originalPrice={product.originalPrice}
                                    onViewDetail={() => setSelectedProduct(product)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {selectedProduct && (
                <ProductDetail 
                    product={selectedProduct} 
                    onClose={() => setSelectedProduct(null)} 
                />
            )}
        </div>
    );

    return createPortal(modalContent, document.body);
}

