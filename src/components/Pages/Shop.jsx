import { useState } from 'react';
import CardProduct from '../UI/CardProduct';
import ProductDetail from '../Product/ProductDetail';
import CategoryView from '../Category/CategoryView';
import { useCartContext } from '../../context/CartContext';
import './Pages.css';

export default function Shop() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [activeCategory, setActiveCategory] = useState('todos');
    const { getCartItemsCount } = useCartContext();
    const cartCount = getCartItemsCount();

    // Todos los productos disponibles
    const allShopProducts = [
        {
            id: 1,
            image: "/img/kuchen-trocito.png",
            alt: "Kuchen-de-Nuez",
            discount: "-13%",
            name: "Kuchen de Nuez",
            stars: 5,
            currentPrice: "12.171",
            originalPrice: "13.990",
            category: "tortas"
        },
        {
            id: 2,
            image: "/img/pancito.png",
            alt: "Pancito-de-Multisemillas",
            discount: "-13%",
            name: "Pan de Masa Madre con Multisemillas",
            stars: 4,
            currentPrice: "6.960",
            originalPrice: "8.000",
            category: "panes"
        },
        {
            id: 3,
            image: "/img/pan-de-centeno.png",
            alt: "pan-de-centeno",
            discount: "-9%",
            name: "Pan de centeno",
            stars: 3.5,
            currentPrice: "4.550",
            originalPrice: "5.000",
            category: "panes"
        },
        {
            id: 4,
            image: "/img/pie-de-limon.png",
            alt: "pie-de-limon",
            discount: "-15%",
            name: "Pie de Limon",
            stars: 5,
            currentPrice: "16.141",
            originalPrice: "18.990",
            category: "tortas"
        },
        {
            id: 5,
            image: "/img/croissant.jpg",
            alt: "croissant",
            discount: "-4%",
            name: "Croissant de Manjar",
            stars: 4.5,
            currentPrice: "4.800",
            originalPrice: "5.000",
            category: "pancito"
        },
        {
            id: 6,
            image: "/img/cheesecake.jpg",
            alt: "cheesecake",
            discount: "-10%",
            name: "Cheesecake de Arandanos y Frambuesas",
            stars: 5,
            currentPrice: "15.750",
            originalPrice: "17.500",
            category: "tortas"
        }
    ];

    const categories = [
        { id: 'todos', name: 'Todos', icon: 'fa-solid fa-grid-2' },
        { id: 'tortas', name: 'Tortas', icon: 'fa-solid fa-cake-candles' },
        { id: 'panes', name: 'Panes', icon: 'fa-solid fa-bread-slice' },
        { id: 'pancito', name: 'Panecillos', icon: 'fa-solid fa-cookie-bite' }
    ];

    const filteredProducts = activeCategory === 'todos' 
        ? allShopProducts 
        : allShopProducts.filter(p => p.category === activeCategory);

    const categoryProducts = {
        'tortas': allShopProducts.filter(p => p.category === 'tortas'),
        'panes': allShopProducts.filter(p => p.category === 'panes'),
        'pancito': allShopProducts.filter(p => p.category === 'pancito')
    };

    return (
        <>
        <section id="tienda" className="page-section shop-section">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">
                        <i className="fa-solid fa-store"></i>
                        Nuestra Tienda
                    </h1>
                    <p className="page-subtitle">Explora nuestro catálogo completo de productos</p>
                </div>

                <div className="shop-filters">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className={`filter-category ${activeCategory === category.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category.id)}
                        >
                            <i className={category.icon}></i>
                            <span>{category.name}</span>
                            {category.id !== 'todos' && (
                                <span className="category-count">
                                    {allShopProducts.filter(p => p.category === category.id).length}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="shop-stats-bar">
                    <div className="stat-item">
                        <i className="fa-solid fa-box"></i>
                        <span>{filteredProducts.length} productos disponibles</span>
                    </div>
                    <div className="stat-item">
                        <i className="fa-solid fa-basket-shopping"></i>
                        <span>{cartCount} en tu carrito</span>
                    </div>
                </div>

                <div className="shop-products-grid">
                    {filteredProducts.map((product, index) => (
                        <div 
                            key={product.id}
                            className="shop-product-wrapper"
                            style={{ animationDelay: `${index * 0.1}s` }}
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
                                onViewDetail={() => setSelectedProduct(product)}
                            />
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="no-products-message">
                        <i className="fa-solid fa-inbox"></i>
                        <h3>No hay productos en esta categoría</h3>
                        <p>Prueba seleccionando otra categoría</p>
                    </div>
                )}
            </div>
        </section>

        {selectedProduct && (
            <ProductDetail 
                product={selectedProduct} 
                onClose={() => setSelectedProduct(null)} 
            />
        )}

        {selectedCategory && categoryProducts[selectedCategory.id] && (
            <CategoryView
                category={selectedCategory}
                products={categoryProducts[selectedCategory.id]}
                onClose={() => setSelectedCategory(null)}
            />
        )}
        </>
    );
}

