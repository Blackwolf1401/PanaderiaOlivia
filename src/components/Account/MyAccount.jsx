import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToastContext } from '../../context/ToastContext';
import { useCartContext } from '../../context/CartContext';
import Login from '../Auth/Login';
import './MyAccount.css';

export default function MyAccount({ onClose, initialTab = 'profile' }) {
    const { user, isAuthenticated, logout } = useAuth();
    const { showSuccess, showError } = useToastContext();
    const [activeTab, setActiveTab] = useState(initialTab);
    const [showLogin, setShowLogin] = useState(false);
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        address: ''
    });

    // Cargar órdenes completadas del localStorage
    const completedOrders = JSON.parse(localStorage.getItem('completed_orders') || '[]');

    if (!isAuthenticated) {
        return (
            <>
                <div className="account-modal-overlay" onClick={onClose}>
                    <div className="account-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="account-header">
                            <h2>Mi Cuenta</h2>
                            <button className="close-btn" onClick={onClose}>
                                <i className="fa-solid fa-times"></i>
                            </button>
                        </div>
                        <div className="account-login-prompt">
                            <i className="fa-solid fa-user-lock"></i>
                            <h3>Inicia Sesión</h3>
                            <p>Necesitas iniciar sesión para acceder a tu cuenta</p>
                            <button className="btn-login" onClick={() => setShowLogin(true)}>
                                Iniciar Sesión
                            </button>
                        </div>
                    </div>
                </div>
                {showLogin && <Login onClose={() => setShowLogin(false)} />}
            </>
        );
    }

    const handleProfileUpdate = () => {
        showSuccess('Perfil actualizado correctamente');
    };

    const handleLogout = () => {
        logout();
        showSuccess('Sesión cerrada correctamente');
        onClose();
    };

    return (
        <div className="account-modal-overlay" onClick={onClose}>
            <div className="account-modal" onClick={(e) => e.stopPropagation()}>
                <div className="account-header">
                    <h2>Mi Cuenta</h2>
                    <button className="close-btn" onClick={onClose}>
                        <i className="fa-solid fa-times"></i>
                    </button>
                </div>

                <div className="account-content">
                    <div className="account-sidebar">
                        <div className="account-user-info">
                            <div className="user-avatar">
                                <i className="fa-solid fa-user"></i>
                            </div>
                            <h3>{user.name}</h3>
                            <p>{user.email}</p>
                        </div>
                        <nav className="account-nav">
                            <button 
                                className={activeTab === 'profile' ? 'active' : ''}
                                onClick={() => setActiveTab('profile')}
                            >
                                <i className="fa-solid fa-user"></i>
                                Mi Perfil
                            </button>
                            <button 
                                className={activeTab === 'orders' ? 'active' : ''}
                                onClick={() => setActiveTab('orders')}
                            >
                                <i className="fa-solid fa-box"></i>
                                Historial de Órdenes
                            </button>
                            <button 
                                className={activeTab === 'wishlist' ? 'active' : ''}
                                onClick={() => setActiveTab('wishlist')}
                            >
                                <i className="fa-solid fa-heart"></i>
                                Lista de Deseos
                            </button>
                            <button onClick={handleLogout} className="logout-btn">
                                <i className="fa-solid fa-sign-out-alt"></i>
                                Cerrar Sesión
                            </button>
                        </nav>
                    </div>

                    <div className="account-main">
                        {activeTab === 'profile' && (
                            <div className="account-section">
                                <h3>Mi Perfil</h3>
                                <form className="profile-form" onSubmit={(e) => {
                                    e.preventDefault();
                                    handleProfileUpdate();
                                }}>
                                    <div className="form-group">
                                        <label>Nombre</label>
                                        <input
                                            type="text"
                                            value={profileData.name}
                                            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            value={profileData.email}
                                            disabled
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Teléfono</label>
                                        <input
                                            type="tel"
                                            value={profileData.phone}
                                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Dirección</label>
                                        <input
                                            type="text"
                                            value={profileData.address}
                                            onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                                        />
                                    </div>
                                    <button type="submit" className="btn-save">
                                        Guardar Cambios
                                    </button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div className="account-section">
                                <h3>Historial de Órdenes</h3>
                                {completedOrders.length === 0 ? (
                                    <div className="empty-state">
                                        <i className="fa-solid fa-box-open"></i>
                                        <p>No tienes órdenes completadas</p>
                                    </div>
                                ) : (
                                    <div className="orders-list">
                                        {completedOrders.map((order, index) => (
                                            <div key={index} className="order-card">
                                                <div className="order-header">
                                                    <div>
                                                        <strong>Orden #{order.buyOrder}</strong>
                                                        <span className="order-date">{new Date(order.date).toLocaleDateString()}</span>
                                                    </div>
                                                    <span className="order-status completed">Completada</span>
                                                </div>
                                                <div className="order-items">
                                                    {order.items.map((item, i) => (
                                                        <div key={i} className="order-item">
                                                            <span>{item.name}</span>
                                                            <span>x{item.quantity}</span>
                                                            <span>${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="order-total">
                                                    <strong>Total: ${order.total.toLocaleString('es-CL')}</strong>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'wishlist' && (
                            <div className="account-section">
                                <h3>Lista de Deseos</h3>
                                <WishlistContent />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function WishlistContent() {
    const [wishlist, setWishlist] = useState(
        JSON.parse(localStorage.getItem('wishlist') || '[]')
    );
    const { showSuccess } = useToastContext();
    const { addToCart } = useCartContext();

    const removeFromWishlist = (productId) => {
        const updated = wishlist.filter(item => item.id !== productId);
        setWishlist(updated);
        localStorage.setItem('wishlist', JSON.stringify(updated));
        showSuccess('Producto eliminado de la lista de deseos');
    };

    if (wishlist.length === 0) {
        return (
            <div className="empty-state">
                <i className="fa-solid fa-heart"></i>
                <p>Tu lista de deseos está vacía</p>
                <p className="empty-hint">Agrega productos haciendo clic en el corazón</p>
            </div>
        );
    }

    return (
        <div className="wishlist-grid">
            {wishlist.map((product) => (
                <div key={product.id} className="wishlist-item">
                    <img src={product.image} alt={product.name} />
                    <div className="wishlist-item-info">
                        <h4>{product.name}</h4>
                        <p className="wishlist-price">${product.currentPrice?.replace(/\./g, '') || '0'}</p>
                    </div>
                    <div className="wishlist-actions">
                        <button 
                            className="btn-add-cart"
                            onClick={() => {
                                addToCart(product);
                                showSuccess('Producto agregado al carrito');
                            }}
                        >
                            <i className="fa-solid fa-cart-plus"></i>
                            Agregar al Carrito
                        </button>
                        <button 
                            className="btn-remove"
                            onClick={() => removeFromWishlist(product.id)}
                        >
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

