import { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useAuth } from '../../context/AuthContext';
import { useToastContext } from '../../context/ToastContext';
import MyAccount from '../Account/MyAccount';
import InfoPages from '../Pages/InfoPages';

export default function Footer() {
    const { navigateTo } = useNavigation();
    const { isAuthenticated } = useAuth();
    const { showSuccess, showError } = useToastContext();
    const [showMyAccount, setShowMyAccount] = useState(false);
    const [showInfoPage, setShowInfoPage] = useState(null);
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [isSubscribing, setIsSubscribing] = useState(false);

    const handleSocialClick = (platform) => {
        const urls = {
            facebook: 'https://facebook.com',
            twitter: 'https://twitter.com',
            instagram: 'https://instagram.com'
        };
        window.open(urls[platform], '_blank');
    };

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (!newsletterEmail.trim()) {
            showError('Por favor ingresa un correo electrónico válido');
            return;
        }

        setIsSubscribing(true);
        // Simular suscripción
        setTimeout(() => {
            const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
            if (!subscribers.includes(newsletterEmail)) {
                subscribers.push(newsletterEmail);
                localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
                showSuccess('¡Te has suscrito exitosamente al boletín!');
                setNewsletterEmail('');
            } else {
                showError('Este correo ya está suscrito');
            }
            setIsSubscribing(false);
        }, 1000);
    };

    return (
        <>
        <footer className="footer">
            <div className="container container-footer">
            <div className="menu-footer">
                <div className="contact-info">
                <p className="title-footer">Información de Contacto</p>
                <ul>
                    <li>
                        <i className="fa-solid fa-location-dot"></i>
                        Direccion: Manuel Barrios 5006, Las Condes
                    </li>
                    <li>
                        <i className="fa-solid fa-phone"></i>
                        <a href="tel:+561234567890">Telefono: 123-456-7890</a>
                    </li>
                    <li>
                        <i className="fa-solid fa-envelope"></i>
                        <a href="mailto:OliviasPanaderia@gmail.com">Gmail: OliviasPanaderia@gmail.com</a>
                    </li>
                </ul>
                <div className="social-icons">
                    <span 
                        className="facebook" 
                        onClick={() => handleSocialClick('facebook')}
                        title="Facebook"
                    >
                        <i className="fa-brands fa-facebook"></i>
                    </span>
                    <span 
                        className="twitter" 
                        onClick={() => handleSocialClick('twitter')}
                        title="Twitter"
                    >
                        <i className="fa-brands fa-x-twitter"></i>
                    </span>
                    <span 
                        className="instagram" 
                        onClick={() => handleSocialClick('instagram')}
                        title="Instagram"
                    >
                        <i className="fa-brands fa-instagram"></i>
                    </span>
                </div>
                </div>

                <div className="information">
                <p className="title-footer">información</p>
                <ul>
                    <li>
                        <a 
                            href="#nosotros" 
                            onClick={(e) => {
                                e.preventDefault();
                                navigateTo('nosotros');
                            }}
                        >
                            Acerca de Nosotros
                        </a>
                    </li>
                    <li>
                        <a 
                            href="#" 
                            onClick={(e) => {
                                e.preventDefault();
                                setShowInfoPage('delivery');
                            }}
                        >
                            Informacion Delivery
                        </a>
                    </li>
                    <li>
                        <a 
                            href="#" 
                            onClick={(e) => {
                                e.preventDefault();
                                setShowInfoPage('privacy');
                            }}
                        >
                            Politicas De Privacidad
                        </a>
                    </li>
                    <li>
                        <a 
                            href="#" 
                            onClick={(e) => {
                                e.preventDefault();
                                setShowInfoPage('terms');
                            }}
                        >
                            Términos y condiciones
                        </a>
                    </li>
                    <li>
                        <a 
                            href="#contacto" 
                            onClick={(e) => {
                                e.preventDefault();
                                navigateTo('contacto');
                            }}
                        >
                            Contáctanos
                        </a>
                    </li>
                </ul>
                </div>

                <div className="my-account">
                <p className="title-footer">Mi Cuenta</p>
                <ul>
                    <li>
                        <a 
                            href="#" 
                            onClick={(e) => {
                                e.preventDefault();
                                setShowMyAccount(true);
                            }}
                        >
                            Mi cuenta
                        </a>
                    </li>
                    <li>
                        <a 
                            href="#" 
                            onClick={(e) => {
                                e.preventDefault();
                                if (isAuthenticated) {
                                    setShowMyAccount(true);
                                    setTimeout(() => {
                                        const ordersTab = document.querySelector('.account-nav button:nth-child(2)');
                                        if (ordersTab) ordersTab.click();
                                    }, 100);
                                } else {
                                    showError('Debes iniciar sesión para ver tu historial');
                                }
                            }}
                        >
                            Historial de ordenes
                        </a>
                    </li>
                    <li>
                        <a 
                            href="#" 
                            onClick={(e) => {
                                e.preventDefault();
                                if (isAuthenticated) {
                                    setShowMyAccount(true);
                                    setTimeout(() => {
                                        const wishlistTab = document.querySelector('.account-nav button:nth-child(3)');
                                        if (wishlistTab) wishlistTab.click();
                                    }, 100);
                                } else {
                                    showError('Debes iniciar sesión para ver tu lista de deseos');
                                }
                            }}
                        >
                            Lista de deseos
                        </a>
                    </li>
                    <li>
                        <a 
                            href="#" 
                            onClick={(e) => {
                                e.preventDefault();
                                document.querySelector('.newsletter input')?.focus();
                            }}
                        >
                            Boletín
                        </a>
                    </li>
                    <li>
                        <a 
                            href="#contacto" 
                            onClick={(e) => {
                                e.preventDefault();
                                navigateTo('contacto');
                            }}
                        >
                            Rembolsos
                        </a>
                    </li>
                </ul>
                </div>

                <div className="newsletter">
                <p className="title-footer">Regístrate Gratis</p>
                <div className="content">
                    <p>Regístrate y obtendras Descuentos y podras estar al tanto de las ofertas que tendremos para ti.</p>
                    <form onSubmit={handleNewsletterSubmit}>
                        <input 
                            type="email" 
                            placeholder="Ingresa tu correo electrónico" 
                            aria-label="Correo electrónico"
                            value={newsletterEmail}
                            onChange={(e) => setNewsletterEmail(e.target.value)}
                            disabled={isSubscribing}
                            required
                        />
                        <button type="submit" disabled={isSubscribing}>
                            {isSubscribing ? (
                                <>
                                    <i className="fa-solid fa-spinner fa-spin"></i> Suscribiendo...
                                </>
                            ) : (
                                'Regístrate'
                            )}
                        </button>
                    </form>
                </div>
                </div>
            </div>

            <div className="copyright">
                <p>
                Desarrollado por Pablo Oñate para el Proyecto de Portafolio de Titulo de Duoc Uc &copy; 2025.
                </p>
                <img src="/img/payment.png" alt="pagos" />
            </div>
            </div>
        </footer>

        {showMyAccount && (
            <MyAccount onClose={() => setShowMyAccount(false)} />
        )}

        {showInfoPage && (
            <InfoPages type={showInfoPage} onClose={() => setShowInfoPage(null)} />
        )}
        </>
    );
}