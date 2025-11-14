import { useState, useEffect } from 'react';
import { useCartContext } from '../../context/CartContext';
import { useToastContext } from '../../context/ToastContext';
import './ProductDetail.css';

export default function ProductDetail({ product, onClose }) {
    const { addToCart } = useCartContext();
    const { showSuccess } = useToastContext();
    const [isAdding, setIsAdding] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(product.image);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleAddToCart = () => {
        setIsAdding(true);
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        showSuccess(`${quantity} ${product.name} agregado${quantity > 1 ? 's' : ''} al carrito!`);
        setTimeout(() => {
            setIsAdding(false);
        }, 600);
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
        if (!isLiked) {
            showSuccess('Agregado a favoritos');
        }
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<i key={i} className="fa-solid fa-star"></i>);
            } else if (i - 0.5 === rating) {
                stars.push(<i key={i} className="fa-regular fa-star-half-stroke"></i>);
            } else {
                stars.push(<i key={i} className="fa-regular fa-star"></i>);
            }
        }
        return stars;
    };

    const price = typeof product.currentPrice === 'string' 
        ? parseFloat(product.currentPrice.replace(/\./g, '')) 
        : product.currentPrice;
    const originalPrice = typeof product.originalPrice === 'string' 
        ? parseFloat(product.originalPrice.replace(/\./g, '')) 
        : product.originalPrice;
    const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

    return (
        <div className="product-detail-modal">
            <div className="product-detail-overlay" onClick={onClose}></div>
            <div className="product-detail-container">
                <button className="product-detail-close" onClick={onClose} aria-label="Cerrar">
                    <i className="fa-solid fa-times"></i>
                </button>

                <div className="product-detail-content">
                    <div className="product-detail-images">
                        <div className="product-main-image">
                            <img src={selectedImage} alt={product.alt} />
                            {product.discount && (
                                <span className="product-discount-badge">{product.discount}</span>
                            )}
                        </div>
                    </div>

                    <div className="product-detail-info">
                        <div className="product-detail-header">
                            <div className="product-stars">
                                {renderStars(product.stars)}
                                <span className="product-rating">({product.stars})</span>
                            </div>
                            <button 
                                className={`product-like-btn ${isLiked ? 'liked' : ''}`}
                                onClick={handleLike}
                                title={isLiked ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                            >
                                <i className={isLiked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i>
                            </button>
                        </div>

                        <h1 className="product-detail-title">{product.name}</h1>

                        <div className="product-detail-price">
                            <span className="current-price">${product.currentPrice}</span>
                            <span className="original-price">${product.originalPrice}</span>
                            {discount > 0 && (
                                <span className="discount-percent">-{discount}%</span>
                            )}
                        </div>

                        <div className="product-detail-description">
                            <h3>Descripción</h3>
                            <p>
                                {product.description || `Disfruta de nuestro delicioso ${product.name}, elaborado 
                                con los mejores ingredientes y siguiendo recetas tradicionales. Este producto 
                                ha sido cuidadosamente preparado para ofrecerte el mejor sabor y calidad que 
                                caracteriza a Olivias Panadería.`}
                            </p>
                        </div>

                        <div className="product-detail-features">
                            <h3>Características</h3>
                            <ul>
                                <li><i className="fa-solid fa-check"></i> Ingredientes 100% naturales</li>
                                <li><i className="fa-solid fa-check"></i> Elaborado artesanalmente</li>
                                <li><i className="fa-solid fa-check"></i> Sin conservantes artificiales</li>
                                <li><i className="fa-solid fa-check"></i> Fresco del día</li>
                            </ul>
                        </div>

                        <div className="product-detail-quantity">
                            <label>Cantidad:</label>
                            <div className="quantity-controls">
                                <button 
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                >
                                    <i className="fa-solid fa-minus"></i>
                                </button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)}>
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </div>

                        <div className="product-detail-actions">
                            <button 
                                className={`add-to-cart-btn ${isAdding ? 'adding' : ''}`}
                                onClick={handleAddToCart}
                                disabled={isAdding}
                            >
                                {isAdding ? (
                                    <>
                                        <i className="fa-solid fa-check"></i>
                                        Agregado
                                    </>
                                ) : (
                                    <>
                                        <i className="fa-solid fa-basket-shopping"></i>
                                        Agregar al Carrito
                                    </>
                                )}
                            </button>
                            <button className="buy-now-btn">
                                <i className="fa-solid fa-bolt"></i>
                                Comprar Ahora
                            </button>
                        </div>

                        <div className="product-detail-meta">
                            <div className="meta-item">
                                <i className="fa-solid fa-truck"></i>
                                <span>Envío gratis en compras sobre $15.000</span>
                            </div>
                            <div className="meta-item">
                                <i className="fa-solid fa-shield-halved"></i>
                                <span>Pago 100% seguro</span>
                            </div>
                            <div className="meta-item">
                                <i className="fa-solid fa-rotate-left"></i>
                                <span>Devolución en 7 días</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

