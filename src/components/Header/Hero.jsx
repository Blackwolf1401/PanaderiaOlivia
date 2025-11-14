import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToastContext } from '../../context/ToastContext';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import AdminPanel from '../Admin/AdminPanel';
import './Hero.css';

export default function Hero() {
    const { user, logout, isAdmin } = useAuth();
    const { showInfo } = useToastContext();
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showAdminPanel, setShowAdminPanel] = useState(false);
    const [isSupportHovered, setIsSupportHovered] = useState(false);

    const handleLoginClick = () => {
        setShowLogin(true);
        setShowRegister(false);
    };

    const handleRegisterClick = () => {
        setShowRegister(true);
        setShowLogin(false);
    };

    const handleLogout = () => {
        logout();
        showInfo('Sesión cerrada correctamente');
    };

    const handleSupportClick = () => {
        showInfo('Llamando al soporte al cliente...');
        // Aquí puedes agregar lógica para abrir un chat o formulario de contacto
    };

    const handleLogoClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <div className="container-hero">
                <div className="container hero">
                    <div 
                        className="customer-support"
                        onMouseEnter={() => setIsSupportHovered(true)}
                        onMouseLeave={() => setIsSupportHovered(false)}
                        onClick={handleSupportClick}
                    >
                        <div className="support-icon-wrapper">
                            <i className={`fa-solid fa-headset ${isSupportHovered ? 'pulse' : ''}`}></i>
                            <div className="support-ripple"></div>
                        </div>
                        <div className="content-customer-support">
                            <span className="text">Soporte al Cliente</span>
                            <span className="number">123-456-7890</span>
                            <span className="support-hint">Click para contactar</span>
                        </div>
                    </div>

                    <div className="container-logo" onClick={handleLogoClick}>
                        <div className="logo-icon-wrapper">
                            <i className="fa-solid fa-cake-candles"></i>
                            <div className="logo-sparkle"></div>
                        </div>
                        <h1 className="logo">
                            <a href="/">Olivias Panadería & Pastelería Saludable</a>
                        </h1>
                    </div>

                    <div className="container-user">
                        {user ? (
                            <div className="user-info-container">
                                <div className="user-info">
                                    <div className="user-avatar">
                                        <i className="fa-solid fa-user"></i>
                                    </div>
                                    <div className="user-details">
                                        <span className="user-name">{user.name}</span>
                                        <span className="user-role">
                                            {user.role === 'admin' ? 'Administrador' : 'Cliente'}
                                        </span>
                                    </div>
                                </div>
                                {isAdmin() && (
                                    <button
                                        className="btn-admin"
                                        onClick={() => setShowAdminPanel(true)}
                                    >
                                        <i className="fa-solid fa-gear"></i>
                                        <span>Admin</span>
                                    </button>
                                )}
                                <button
                                    className="btn-logout"
                                    onClick={handleLogout}
                                >
                                    <i className="fa-solid fa-sign-out-alt"></i>
                                    <span>Salir</span>
                                </button>
                            </div>
                        ) : (
                            <button
                                className="btn-login"
                                onClick={handleLoginClick}
                            >
                                <i className="fa-solid fa-user"></i>
                                <span>Iniciar Sesión</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {showLogin && (
                <Login
                    onClose={() => setShowLogin(false)}
                    onShowRegister={handleRegisterClick}
                />
            )}

            {showRegister && (
                <Register
                    onClose={() => setShowRegister(false)}
                    onShowLogin={handleLoginClick}
                />
            )}

            {showAdminPanel && isAdmin() && (
                <AdminPanel onClose={() => setShowAdminPanel(false)} />
            )}
        </>
    );
}