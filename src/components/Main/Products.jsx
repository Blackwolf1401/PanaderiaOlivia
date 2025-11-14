import { useState, useEffect, useRef } from 'react';
import CardProduct from '../UI/CardProduct';
import ProductDetail from '../Product/ProductDetail';
import './Products.css';

export default function Products() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [activeFilter, setActiveFilter] = useState('destacados');
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    // Todos los productos con categorías
    const allProducts = [
        {
            id: 1,
            image: "/img/kuchen-trocito.png",
            alt: "Kuchen-de-Nuez",
            discount: "-13%",
            name: "Kuchen de Nuez",
            stars: 5,
            currentPrice: "12.171",
            originalPrice: "13.990",
            category: "destacados",
            featured: true,
            dateAdded: "2024-01-15"
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
            category: "destacados",
            featured: true,
            dateAdded: "2024-01-20"
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
            category: "recientes",
            featured: false,
            dateAdded: "2024-02-01"
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
            category: "vendidos",
            featured: true,
            dateAdded: "2024-01-10",
            sales: 150
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
            category: "recientes",
            featured: false,
            dateAdded: "2024-02-05"
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
            category: "vendidos",
            featured: true,
            dateAdded: "2024-01-08",
            sales: 200
        }
    ];

    // Efecto para detectar cuando la sección es visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    // Filtrar productos según la opción activa
    const getFilteredProducts = () => {
        switch (activeFilter) {
            case 'destacados':
                return allProducts.filter(p => p.featured);
            case 'recientes':
                return [...allProducts]
                    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
                    .slice(0, 4);
            case 'vendidos':
                return [...allProducts]
                    .filter(p => p.sales)
                    .sort((a, b) => (b.sales || 0) - (a.sales || 0));
            default:
                return allProducts.filter(p => p.featured);
        }
    };

    const filteredProducts = getFilteredProducts();

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
    };

    return (
    <>
    <section 
        ref={sectionRef}
        className={`container top-products ${isVisible ? 'visible' : ''}`}
    >
        <div className="products-header">
            <h1 className="heading-1 products-title">
                <span className="title-icon">
                    <i className="fa-solid fa-star"></i>
                </span>
                Mejores Productos
            </h1>
            <p className="products-subtitle">
                Descubre nuestra selección de productos más populares
            </p>
        </div>

        <div className="container-options interactive-filters">
            <button
                className={`filter-btn ${activeFilter === 'destacados' ? 'active' : ''}`}
                onClick={() => handleFilterChange('destacados')}
            >
                <i className="fa-solid fa-star"></i>
                <span>Destacados</span>
                <span className="filter-count">{allProducts.filter(p => p.featured).length}</span>
            </button>
            <button
                className={`filter-btn ${activeFilter === 'recientes' ? 'active' : ''}`}
                onClick={() => handleFilterChange('recientes')}
            >
                <i className="fa-solid fa-clock"></i>
                <span>Más Recientes</span>
                <span className="filter-badge">Nuevo</span>
            </button>
            <button
                className={`filter-btn ${activeFilter === 'vendidos' ? 'active' : ''}`}
                onClick={() => handleFilterChange('vendidos')}
            >
                <i className="fa-solid fa-fire"></i>
                <span>Mejores Vendidos</span>
                <span className="filter-badge hot">🔥</span>
            </button>
        </div>

        <div className="products-stats">
            <div className="stat-card">
                <i className="fa-solid fa-box"></i>
                <div>
                    <span className="stat-number">{filteredProducts.length}</span>
                    <span className="stat-label">Productos</span>
                </div>
            </div>
            <div className="stat-card">
                <i className="fa-solid fa-star"></i>
                <div>
                    <span className="stat-number">
                        {filteredProducts.length > 0 
                            ? (filteredProducts.reduce((sum, p) => sum + p.stars, 0) / filteredProducts.length).toFixed(1)
                            : '0.0'
                        }
                    </span>
                    <span className="stat-label">Calificación</span>
                </div>
            </div>
        </div>

        <div className={`container-products products-grid ${isVisible ? 'animate-in' : ''}`}>
            {filteredProducts.map((product, index) => (
                <div 
                    key={product.id} 
                    className="product-wrapper"
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
                    {product.sales && (
                        <div className="sales-badge">
                            <i className="fa-solid fa-fire"></i>
                            {product.sales}+ vendidos
                        </div>
                    )}
                    {product.dateAdded && new Date(product.dateAdded) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                        <div className="new-badge">
                            <i className="fa-solid fa-sparkles"></i>
                            Nuevo
                        </div>
                    )}
                </div>
            ))}
        </div>

        {filteredProducts.length === 0 && (
            <div className="no-products">
                <i className="fa-solid fa-inbox"></i>
                <p>No hay productos en esta categoría</p>
            </div>
        )}
    </section>

    {selectedProduct && (
        <ProductDetail 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
        />
    )}
    </>
    );
}