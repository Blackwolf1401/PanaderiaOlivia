import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

export default function Login({ onClose, showRegister, onShowRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = login(email, password);
        
        if (result.success) {
            onClose();
            // Limpiar formulario
            setEmail('');
            setPassword('');
        } else {
            setError(result.error);
        }
        
        setLoading(false);
    };

    return (
        <div className="auth-modal">
            <div className="auth-overlay" onClick={onClose}></div>
            <div className="auth-container">
                <button className="auth-close" onClick={onClose} aria-label="Cerrar">
                    <i className="fa-solid fa-times"></i>
                </button>
                
                <div className="auth-header">
                    <h2>Iniciar Sesión</h2>
                    <p>Ingresa tus credenciales para continuar</p>
                </div>

                {error && (
                    <div className="auth-error">
                        <i className="fa-solid fa-circle-exclamation"></i>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-field">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            disabled={loading}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="auth-submit"
                        disabled={loading}
                    >
                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>¿No tienes cuenta? <button onClick={onShowRegister} className="auth-link">Regístrate aquí</button></p>
                </div>

                <div className="auth-demo">
                    <p><strong>Credenciales de prueba:</strong></p>
                    <div className="demo-credentials">
                        <div>
                            <strong>Admin:</strong> admin@olivias.com / admin123
                        </div>
                        <div>
                            <strong>Cliente:</strong> cliente@olivias.com / cliente123
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

