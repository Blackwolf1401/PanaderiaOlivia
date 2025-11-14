import { useState } from 'react';
import { useCartContext } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { createTransaction, generateBuyOrder, generateSessionId, formatAmountForWebpay } from '../../services/webpayService';
import WebpayReturn from '../Webpay/WebpayReturn';
import './Checkout.css';

export default function Checkout({ onClose }) {
    const { cart, getCartTotal, removeFromCart } = useCartContext();
    const { user, isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [webpayToken, setWebpayToken] = useState(null);
    const [showWebpayReturn, setShowWebpayReturn] = useState(false);
    const [customerData, setCustomerData] = useState({
        firstName: user?.name?.split(' ')[0] || '',
        lastName: user?.name?.split(' ').slice(1).join(' ') || '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        region: ''
    });

    const total = getCartTotal();
    const formattedTotal = total.toLocaleString('es-CL');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePayment = async () => {
        // Validaciones
        if (!isAuthenticated) {
            setError('Debes iniciar sesión para realizar una compra');
            return;
        }

        if (cart.length === 0) {
            setError('Tu carrito está vacío');
            return;
        }

        if (!customerData.firstName || !customerData.lastName || !customerData.email || 
            !customerData.phone || !customerData.address || !customerData.city) {
            setError('Por favor completa todos los campos requeridos');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const buyOrder = generateBuyOrder();
            const sessionId = generateSessionId();
            const amount = formatAmountForWebpay(total);

            // Crear transacción en Webpay
            const result = await createTransaction({
                amount,
                buyOrder,
                sessionId,
                customerData,
                cart
            });

            if (result.success) {
                // Guardar datos de la orden antes de redirigir
                const orderData = {
                    buyOrder,
                    sessionId,
                    amount: total,
                    customerData,
                    cart: cart.map(item => ({
                        id: item.id,
                        name: item.name,
                        quantity: item.quantity,
                        price: item.currentPrice
                    })),
                    timestamp: new Date().toISOString()
                };
                localStorage.setItem('pending_order', JSON.stringify(orderData));

                // Simular proceso de Webpay
                // En producción, esto redirigiría a la URL real de Webpay
                setWebpayToken(result.token);
                setShowWebpayReturn(true);
            } else {
                setError(result.error || 'Error al procesar el pago');
            }
        } catch (error) {
            console.error('Error en el proceso de pago:', error);
            setError('Ocurrió un error al procesar tu pago. Por favor intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    // Si estamos mostrando el retorno de Webpay
    if (showWebpayReturn && webpayToken) {
        return (
            <WebpayReturn 
                token={webpayToken} 
                onContinue={() => {
                    setShowWebpayReturn(false);
                    setWebpayToken(null);
                    onClose();
                    // Limpiar carrito después de pago exitoso
                    cart.forEach(item => removeFromCart(item.id));
                }}
            />
        );
    }

    return (
        <div className="checkout-modal">
            <div className="checkout-overlay" onClick={onClose}></div>
            <div className="checkout-container">
                <div className="checkout-header">
                    <h2>
                        <i className="fa-solid fa-credit-card"></i>
                        Finalizar Compra
                    </h2>
                    <button className="checkout-close" onClick={onClose} aria-label="Cerrar">
                        <i className="fa-solid fa-times"></i>
                    </button>
                </div>

                <div className="checkout-content">
                    {error && (
                        <div className="checkout-error">
                            <i className="fa-solid fa-circle-exclamation"></i>
                            {error}
                        </div>
                    )}

                    <div className="checkout-grid">
                        <div className="checkout-form-section">
                            <h3>Datos de Envío</h3>
                            <div className="form-row">
                                <div className="form-field">
                                    <label htmlFor="firstName">Nombre *</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={customerData.firstName}
                                        onChange={handleInputChange}
                                        required
                                        disabled={loading}
                                    />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="lastName">Apellido *</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={customerData.lastName}
                                        onChange={handleInputChange}
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="form-field">
                                <label htmlFor="email">Email *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={customerData.email}
                                    onChange={handleInputChange}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-field">
                                <label htmlFor="phone">Teléfono *</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={customerData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+56 9 1234 5678"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-field">
                                <label htmlFor="address">Dirección *</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={customerData.address}
                                    onChange={handleInputChange}
                                    placeholder="Calle y número"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-field">
                                    <label htmlFor="city">Ciudad *</label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={customerData.city}
                                        onChange={handleInputChange}
                                        required
                                        disabled={loading}
                                    />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="region">Región</label>
                                    <input
                                        type="text"
                                        id="region"
                                        name="region"
                                        value={customerData.region}
                                        onChange={handleInputChange}
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="checkout-summary-section">
                            <h3>Resumen de Compra</h3>
                            <div className="summary-items">
                                {cart.map((item) => {
                                    const price = typeof item.currentPrice === 'string' 
                                        ? parseFloat(item.currentPrice.replace(/\./g, '')) 
                                        : item.currentPrice;
                                    const itemTotal = (price * item.quantity).toLocaleString('es-CL');

                                    return (
                                        <div key={item.id} className="summary-item">
                                            <img src={item.image} alt={item.alt} className="summary-item-image" />
                                            <div className="summary-item-details">
                                                <h4>{item.name}</h4>
                                                <p>Cantidad: {item.quantity}</p>
                                                <p className="summary-item-price">${itemTotal}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="summary-totals">
                                <div className="summary-row">
                                    <span>Subtotal:</span>
                                    <span>${formattedTotal}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Envío:</span>
                                    <span>Gratis</span>
                                </div>
                                <div className="summary-row summary-total">
                                    <span>Total:</span>
                                    <span>${formattedTotal}</span>
                                </div>
                            </div>

                            <div className="payment-method">
                                <h4>
                                    <i className="fa-solid fa-shield-halved"></i>
                                    Pago Seguro con Webpay
                                </h4>
                                <p>Serás redirigido a Webpay para completar tu pago de forma segura.</p>
                            </div>

                            <button
                                onClick={handlePayment}
                                className="checkout-pay-button"
                                disabled={loading || cart.length === 0}
                            >
                                {loading ? (
                                    <>
                                        <i className="fa-solid fa-spinner fa-spin"></i>
                                        Procesando...
                                    </>
                                ) : (
                                    <>
                                        <i className="fa-solid fa-lock"></i>
                                        Pagar con Webpay
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

