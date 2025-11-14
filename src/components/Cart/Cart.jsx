import { useState } from 'react';
import { useCartContext } from '../../context/CartContext';
import Checkout from '../Checkout/Checkout';
import './Cart.css';

export default function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);
    const { cart, removeFromCart, updateQuantity, getCartTotal, getCartItemsCount } = useCartContext();

    const formatPrice = (price) => {
        if (typeof price === 'string') {
            return price;
        }
        return price.toLocaleString('es-CL');
    };

    const total = getCartTotal();
    const formattedTotal = total.toLocaleString('es-CL');

    return (
        <>
            <button 
                className={`cart-button ${getCartItemsCount() > 0 ? 'has-items' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Abrir carrito"
            >
                <i className="fa-solid fa-basket-shopping"></i>
                {getCartItemsCount() > 0 && (
                    <span className="cart-count">{getCartItemsCount()}</span>
                )}
            </button>

            {isOpen && (
                <>
                    <div className="cart-overlay" onClick={() => setIsOpen(false)}></div>
                    <div className="cart-sidebar">
                        <div className="cart-header">
                            <h2>Carrito de Compras</h2>
                            <button 
                                className="cart-close" 
                                onClick={() => setIsOpen(false)}
                                aria-label="Cerrar carrito"
                            >
                                <i className="fa-solid fa-times"></i>
                            </button>
                        </div>

                        <div className="cart-content">
                            {cart.length === 0 ? (
                                <div className="cart-empty">
                                    <i className="fa-solid fa-basket-shopping"></i>
                                    <p>Tu carrito está vacío</p>
                                </div>
                            ) : (
                                <>
                                    <div className="cart-items">
                                        {cart.map((item) => {
                                            const price = typeof item.currentPrice === 'string' 
                                                ? parseFloat(item.currentPrice.replace(/\./g, '')) 
                                                : item.currentPrice;
                                            const itemTotal = (price * item.quantity).toLocaleString('es-CL');

                                            return (
                                                <div key={item.id} className="cart-item">
                                                    <img src={item.image} alt={item.alt} className="cart-item-image" />
                                                    <div className="cart-item-details">
                                                        <h3>{item.name}</h3>
                                                        <p className="cart-item-price">${formatPrice(item.currentPrice)}</p>
                                                        <div className="cart-item-controls">
                                                            <button 
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="quantity-btn"
                                                                aria-label="Disminuir cantidad"
                                                            >
                                                                <i className="fa-solid fa-minus"></i>
                                                            </button>
                                                            <span className="quantity">{item.quantity}</span>
                                                            <button 
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="quantity-btn"
                                                                aria-label="Aumentar cantidad"
                                                            >
                                                                <i className="fa-solid fa-plus"></i>
                                                            </button>
                                                        </div>
                                                        <p className="cart-item-total">Subtotal: ${itemTotal}</p>
                                                    </div>
                                                    <button 
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="cart-item-remove"
                                                        aria-label="Eliminar producto"
                                                    >
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="cart-footer">
                                        <div className="cart-total">
                                            <span>Total:</span>
                                            <span className="total-amount">${formattedTotal}</span>
                                        </div>
                                        <button 
                                            className="checkout-btn"
                                            onClick={() => {
                                                setIsOpen(false);
                                                setShowCheckout(true);
                                            }}
                                        >
                                            Finalizar Compra
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}

            {showCheckout && (
                <Checkout onClose={() => setShowCheckout(false)} />
            )}
        </>
    );
}


