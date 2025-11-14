import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCartContext } from '../../context/CartContext';
import './AdminPanel.css';

export default function AdminPanel({ onClose }) {
    const { user } = useAuth();
    const { cart, getCartTotal, getCartItemsCount } = useCartContext();
    const [activeTab, setActiveTab] = useState('dashboard');

    const totalSales = getCartTotal();
    const totalItems = getCartItemsCount();
    const totalOrders = cart.length;

    return (
        <div className="admin-modal">
            <div className="admin-overlay" onClick={onClose}></div>
            <div className="admin-container">
                <div className="admin-header">
                    <h2>
                        <i className="fa-solid fa-shield-halved"></i>
                        Panel de Administración
                    </h2>
                    <button className="admin-close" onClick={onClose} aria-label="Cerrar">
                        <i className="fa-solid fa-times"></i>
                    </button>
                </div>

                <div className="admin-tabs">
                    <button
                        className={activeTab === 'dashboard' ? 'active' : ''}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        <i className="fa-solid fa-chart-line"></i> Dashboard
                    </button>
                    <button
                        className={activeTab === 'orders' ? 'active' : ''}
                        onClick={() => setActiveTab('orders')}
                    >
                        <i className="fa-solid fa-shopping-cart"></i> Pedidos
                    </button>
                    <button
                        className={activeTab === 'products' ? 'active' : ''}
                        onClick={() => setActiveTab('products')}
                    >
                        <i className="fa-solid fa-box"></i> Productos
                    </button>
                    <button
                        className={activeTab === 'users' ? 'active' : ''}
                        onClick={() => setActiveTab('users')}
                    >
                        <i className="fa-solid fa-users"></i> Usuarios
                    </button>
                </div>

                <div className="admin-content">
                    {activeTab === 'dashboard' && (
                        <div className="admin-dashboard">
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <div className="stat-icon" style={{ background: '#4CAF50' }}>
                                        <i className="fa-solid fa-dollar-sign"></i>
                                    </div>
                                    <div className="stat-info">
                                        <h3>Ventas Totales</h3>
                                        <p className="stat-value">${totalSales.toLocaleString('es-CL')}</p>
                                    </div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-icon" style={{ background: '#2196F3' }}>
                                        <i className="fa-solid fa-shopping-bag"></i>
                                    </div>
                                    <div className="stat-info">
                                        <h3>Pedidos</h3>
                                        <p className="stat-value">{totalOrders}</p>
                                    </div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-icon" style={{ background: '#FF9800' }}>
                                        <i className="fa-solid fa-box"></i>
                                    </div>
                                    <div className="stat-info">
                                        <h3>Productos Vendidos</h3>
                                        <p className="stat-value">{totalItems}</p>
                                    </div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-icon" style={{ background: '#9C27B0' }}>
                                        <i className="fa-solid fa-users"></i>
                                    </div>
                                    <div className="stat-info">
                                        <h3>Usuarios Activos</h3>
                                        <p className="stat-value">2</p>
                                    </div>
                                </div>
                            </div>

                            <div className="admin-section">
                                <h3>Bienvenido, {user?.name}</h3>
                                <p>Desde aquí puedes gestionar todos los aspectos de la panadería.</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div className="admin-section">
                            <h3>Gestión de Pedidos</h3>
                            <p>Aquí puedes ver y gestionar todos los pedidos de los clientes.</p>
                            <div className="admin-placeholder">
                                <i className="fa-solid fa-shopping-cart"></i>
                                <p>Funcionalidad de gestión de pedidos próximamente</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'products' && (
                        <div className="admin-section">
                            <h3>Gestión de Productos</h3>
                            <p>Administra el catálogo de productos de la panadería.</p>
                            <div className="admin-placeholder">
                                <i className="fa-solid fa-box"></i>
                                <p>Funcionalidad de gestión de productos próximamente</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'users' && (
                        <div className="admin-section">
                            <h3>Gestión de Usuarios</h3>
                            <p>Administra los usuarios del sistema.</p>
                            <div className="admin-placeholder">
                                <i className="fa-solid fa-users"></i>
                                <p>Funcionalidad de gestión de usuarios próximamente</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

