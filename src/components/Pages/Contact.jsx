import { useState } from 'react';
import { useToastContext } from '../../context/ToastContext';
import './Pages.css';

export default function Contact() {
    const { showSuccess, showError } = useToastContext();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validación
        if (!formData.name || !formData.email || !formData.message) {
            showError('Por favor completa todos los campos requeridos');
            setIsSubmitting(false);
            return;
        }

        // Simular envío
        setTimeout(() => {
            showSuccess('¡Mensaje enviado correctamente! Te responderemos pronto.');
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <section id="contacto" className="page-section contact-section">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">
                        <i className="fa-solid fa-envelope"></i>
                        Contáctanos
                    </h1>
                    <p className="page-subtitle">Estamos aquí para ayudarte</p>
                </div>

                <div className="contact-content">
                    <div className="contact-info">
                        <div className="info-card">
                            <div className="info-icon">
                                <i className="fa-solid fa-location-dot"></i>
                            </div>
                            <div className="info-content">
                                <h3>Dirección</h3>
                                <p>Manuel Barrios 5006, Las Condes</p>
                                <p>Santiago, Chile</p>
                            </div>
                        </div>

                        <div className="info-card">
                            <div className="info-icon">
                                <i className="fa-solid fa-phone"></i>
                            </div>
                            <div className="info-content">
                                <h3>Teléfono</h3>
                                <p>+56 2 1234 5678</p>
                                <p>Lun - Sáb: 8:00 - 20:00</p>
                            </div>
                        </div>

                        <div className="info-card">
                            <div className="info-icon">
                                <i className="fa-solid fa-envelope"></i>
                            </div>
                            <div className="info-content">
                                <h3>Email</h3>
                                <p>OliviasPanaderia@gmail.com</p>
                                <p>Respuesta en 24 horas</p>
                            </div>
                        </div>

                        <div className="info-card">
                            <div className="info-icon">
                                <i className="fa-solid fa-share-nodes"></i>
                            </div>
                            <div className="info-content">
                                <h3>Redes Sociales</h3>
                                <div className="social-links">
                                    <a href="#" className="social-link" title="Facebook">
                                        <i className="fa-brands fa-facebook"></i>
                                    </a>
                                    <a href="#" className="social-link" title="Instagram">
                                        <i className="fa-brands fa-instagram"></i>
                                    </a>
                                    <a href="#" className="social-link" title="Twitter">
                                        <i className="fa-brands fa-x-twitter"></i>
                                    </a>
                                    <a href="#" className="social-link" title="WhatsApp">
                                        <i className="fa-brands fa-whatsapp"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-wrapper">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Nombre *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="phone">Teléfono</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="subject">Asunto</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Mensaje *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="6"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isSubmitting}
                                    placeholder="Escribe tu mensaje aquí..."
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                className="submit-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <i className="fa-solid fa-spinner fa-spin"></i>
                                        Enviando...
                                    </>
                                ) : (
                                    <>
                                        <i className="fa-solid fa-paper-plane"></i>
                                        Enviar Mensaje
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="map-section">
                    <h2>Encuéntranos</h2>
                    <div className="map-placeholder">
                        <i className="fa-solid fa-map-location-dot"></i>
                        <p>Manuel Barrios 5006, Las Condes, Santiago</p>
                        <p className="map-note">Mapa interactivo próximamente</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

