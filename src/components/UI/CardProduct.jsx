import { useState, useEffect } from 'react';
import { useCartContext } from '../../context/CartContext';
import { useToastContext } from '../../context/ToastContext';
import './CardProduct.css';
import './ImageAnimations.css';

export default function CardProduct({
    id,
    image,
    alt,
    discount,
    name,
    stars,
    currentPrice,
    originalPrice,
    onViewDetail
    }) {
    const { addToCart } = useCartContext();
    const { showSuccess } = useToastContext();
    const [isAdding, setIsAdding] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const handleAddToCart = (e) => {
        e.stopPropagation(); // Evitar que se abra el detalle al hacer clic en el botón
        setIsAdding(true);
        addToCart({
            id,
            image,
            alt,
            discount,
            name,
            stars,
            currentPrice,
            originalPrice
        });
        
        showSuccess(`${name} agregado al carrito!`);
        
        setTimeout(() => {
            setIsAdding(false);
        }, 600);
    };

    const handleLike = (e) => {
        e.stopPropagation();
        const newLikedState = !isLiked;
        setIsLiked(newLikedState);
        
        // Guardar en localStorage
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        
        if (newLikedState) {
            // Agregar a la lista de deseos
            const product = {
                id,
                image,
                alt,
                name,
                currentPrice,
                originalPrice
            };
            wishlist.push(product);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            showSuccess('Agregado a favoritos');
        } else {
            // Remover de la lista de deseos
            const updated = wishlist.filter(item => item.id !== id);
            localStorage.setItem('wishlist', JSON.stringify(updated));
            showSuccess('Removido de favoritos');
        }
    };
    
    // Verificar si el producto está en la lista de deseos al cargar
    useEffect(() => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setIsLiked(wishlist.some(item => item.id === id));
    }, [id]);
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

    const handleCardClick = () => {
        if (onViewDetail) {
            onViewDetail();
        }
    };

    return (
    <div 
        className="card-product interactive-card"
        onClick={handleCardClick}
        style={{ cursor: onViewDetail ? 'pointer' : 'default' }}
    >
        <div className="container-img">
        <img src={image} alt={alt} className="product-image" />
        <span className="discount">{discount}</span>
        <div className="button-group">
            <span 
                className="icon-btn" 
                title="Vista rápida"
                onClick={(e) => {
                    e.stopPropagation();
                    if (onViewDetail) onViewDetail();
                }}
            >
                <i className="fa-regular fa-eye"></i>
            </span>
            <span 
                className={`icon-btn ${isLiked ? 'liked' : ''}`} 
                onClick={handleLike}
                title={isLiked ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
                <i className={isLiked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i>
            </span>
            <span className="icon-btn" title="Comparar">
                <i className="fa-solid fa-code-compare"></i>
            </span>
        </div>
        </div>
        <div className="content-card-product">
        <div className="stars">
            {renderStars(stars)}
        </div>
        <h3>{name}</h3>
        <div className="price-cart">
            <p className="price">${currentPrice} <span>${originalPrice}</span></p>
            <button 
                className={`add-cart ${isAdding ? 'adding' : ''}`} 
                onClick={handleAddToCart}
                disabled={isAdding}
                title="Agregar al carrito"
                onMouseDown={(e) => e.stopPropagation()}
            >
                {isAdding ? (
                    <i className="fa-solid fa-check"></i>
                ) : (
                    <i className="fa-solid fa-basket-shopping"></i>
                )}
            </button>
        </div>
        </div>
    </div>
    );
}