import { useState, useEffect, useRef } from 'react';
import CardProduct from '../UI/CardProduct';
import ProductDetail from '../Product/ProductDetail';
import './Specials.css';

export default function Specials() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const sectionRef = useRef(null);

    const specialProducts = [
    {
        id: 5,
        image: "/img/kuchen-trocito.png",
        alt: "Kuchen-de-Nuez",
        discount: "-13%",
        name: "Kuchen de Nuez",
        stars: 5,
        currentPrice: "12.171",
        originalPrice: "13.990",
        badge: "Premium",
        description: "Elaborado con nueces seleccionadas"
    },
    {
        id: 6,
        image: "/img/croissant.jpg",
        alt: "croissant",
        discount: "-4%",
        name: "Croissant de Manjar",
        stars: 4.5,
        currentPrice: "4.800",
        originalPrice: "5.000",
        badge: "Nuevo",
        description: "Recién horneado cada mañana"
    },
    {
        id: 7,
        image: "/img/cheesecake.jpg",
        alt: "cheesecake",
        discount: "-10%",
        name: "Cheesecake de Arandanos y Frambuesas",
        stars: 5,
        currentPrice: "15.750",
        originalPrice: "17.500",
        badge: "Favorito",
        description: "Con frutos rojos frescos"
    },
    {
        id: 8,
        image: "/img/pie-de-limon.png",
        alt: "pie-de-limon",
        discount: "-15%",
        name: "Pie de Limon",
        stars: 5,
        currentPrice: "16.141",
        originalPrice: "18.990",
        badge: "Oferta",
        description: "Sabor cítrico refrescante"
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

    const totalDiscount = specialProducts.reduce((sum, p) => {
        const discount = parseInt(p.discount.replace('%', ''));
        return sum + discount;
    }, 0);
    const avgDiscount = Math.round(totalDiscount / specialProducts.length);

    return (
    <>
    <section 
        ref={sectionRef}
        className={`container specials ${isVisible ? 'visible' : ''}`}
    >
        <div className="specials-header">
            <div className="specials-title-wrapper">
                <h1 className="heading-1 specials-title">
                    <span className="title-icon special">
                        <i className="fa-solid fa-gift"></i>
                    </span>
                    Productos Especiales
                </h1>
                <p className="specials-subtitle">
                    Ofertas exclusivas y productos únicos seleccionados especialmente para ti
                </p>
            </div>
            
            <div className="specials-highlight">
                <div className="highlight-item">
                    <i className="fa-solid fa-tag"></i>
                    <span>Descuentos hasta {Math.max(...specialProducts.map(p => parseInt(p.discount.replace('%', ''))))}%</span>
                </div>
                <div className="highlight-item">
                    <i className="fa-solid fa-clock"></i>
                    <span>Ofertas limitadas</span>
                </div>
            </div>
        </div>

        <div className="specials-stats">
            <div className="stat-card special">
                <i className="fa-solid fa-gift"></i>
                <div>
                    <span className="stat-number">{specialProducts.length}</span>
                    <span className="stat-label">Productos Especiales</span>
                </div>
            </div>
            <div className="stat-card special">
                <i className="fa-solid fa-percent"></i>
                <div>
                    <span className="stat-number">{avgDiscount}%</span>
                    <span className="stat-label">Descuento Promedio</span>
                </div>
            </div>
            <div className="stat-card special">
                <i className="fa-solid fa-star"></i>
                <div>
                    <span className="stat-number">
                        {(specialProducts.reduce((sum, p) => sum + p.stars, 0) / specialProducts.length).toFixed(1)}
                    </span>
                    <span className="stat-label">Calificación</span>
                </div>
            </div>
        </div>

        <div className={`container-products specials-grid ${isVisible ? 'animate-in' : ''}`}>
            {specialProducts.map((product, index) => (
                <div 
                    key={product.id}
                    className={`special-product-wrapper ${hoveredIndex === index ? 'hovered' : ''}`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{ animationDelay: `${index * 0.15}s` }}
                >
                    <div className="special-badge-top">
                        <i className="fa-solid fa-sparkles"></i>
                        {product.badge}
                    </div>
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
                    <div className="special-description">
                        <i className="fa-solid fa-info-circle"></i>
                        <span>{product.description}</span>
                    </div>
                </div>
            ))}
        </div>

        <div className="specials-footer">
            <div className="special-offer-banner">
                <div className="offer-content">
                    <i className="fa-solid fa-fire"></i>
                    <div>
                        <h3>¡Oferta Especial!</h3>
                        <p>Compra 3 productos especiales y obtén un 10% adicional de descuento</p>
                    </div>
                </div>
                <button className="offer-btn">
                    Ver Oferta
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
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