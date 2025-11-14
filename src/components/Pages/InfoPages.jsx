import { useNavigation } from '../../context/NavigationContext';
import './InfoPages.css';

export default function InfoPages({ type, onClose }) {
    const { navigateTo } = useNavigation();

    const content = {
        delivery: {
            title: 'Información de Delivery',
            icon: 'fa-solid fa-truck',
            sections: [
                {
                    heading: 'Zonas de Entrega',
                    content: 'Realizamos entregas en las siguientes zonas: Las Condes, Providencia, Ñuñoa, Vitacura y comunas aledañas. Para otras zonas, contáctanos para verificar disponibilidad.'
                },
                {
                    heading: 'Horarios de Entrega',
                    content: 'Las entregas se realizan de lunes a sábado de 9:00 a 20:00 horas. Los pedidos realizados antes de las 14:00 horas pueden ser entregados el mismo día (sujeto a disponibilidad).'
                },
                {
                    heading: 'Costo de Envío',
                    content: 'El costo de envío varía según la zona y el monto de la compra. Para compras superiores a $30.000, el envío es gratuito en las zonas principales. Consulta el costo exacto al finalizar tu compra.'
                },
                {
                    heading: 'Tiempo de Entrega',
                    content: 'El tiempo estimado de entrega es de 2-4 horas para pedidos del mismo día, y de 24-48 horas para pedidos programados. Te notificaremos cuando tu pedido esté en camino.'
                },
                {
                    heading: 'Productos Especiales',
                    content: 'Para productos personalizados (sin gluten, sin azúcar, etc.), el tiempo de preparación puede ser mayor. Te contactaremos para coordinar la fecha de entrega.'
                }
            ]
        },
        privacy: {
            title: 'Políticas de Privacidad',
            icon: 'fa-solid fa-shield-halved',
            sections: [
                {
                    heading: 'Recopilación de Información',
                    content: 'Recopilamos información que nos proporcionas directamente, como nombre, dirección de correo electrónico, dirección postal, número de teléfono e información de pago cuando realizas una compra.'
                },
                {
                    heading: 'Uso de la Información',
                    content: 'Utilizamos tu información para procesar pedidos, comunicarnos contigo sobre productos y servicios, y mejorar tu experiencia de compra. No compartimos tu información con terceros sin tu consentimiento.'
                },
                {
                    heading: 'Seguridad de Datos',
                    content: 'Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra acceso no autorizado, alteración, divulgación o destrucción.'
                },
                {
                    heading: 'Cookies',
                    content: 'Utilizamos cookies para mejorar tu experiencia en nuestro sitio web. Puedes configurar tu navegador para rechazar cookies, aunque esto puede afectar algunas funcionalidades.'
                },
                {
                    heading: 'Tus Derechos',
                    content: 'Tienes derecho a acceder, rectificar, eliminar o limitar el procesamiento de tus datos personales. Para ejercer estos derechos, contáctanos a OliviasPanaderia@gmail.com'
                }
            ]
        },
        terms: {
            title: 'Términos y Condiciones',
            icon: 'fa-solid fa-file-contract',
            sections: [
                {
                    heading: 'Aceptación de Términos',
                    content: 'Al acceder y utilizar este sitio web, aceptas cumplir con estos términos y condiciones. Si no estás de acuerdo, por favor no utilices nuestro sitio.'
                },
                {
                    heading: 'Productos y Precios',
                    content: 'Nos reservamos el derecho de modificar precios, productos y disponibilidad en cualquier momento. Los precios mostrados están en pesos chilenos e incluyen IVA cuando corresponda.'
                },
                {
                    heading: 'Pedidos y Pagos',
                    content: 'Todos los pedidos están sujetos a disponibilidad. El pago se procesa de forma segura a través de Webpay. Una vez confirmado el pago, recibirás un correo de confirmación.'
                },
                {
                    heading: 'Cancelaciones y Reembolsos',
                    content: 'Puedes cancelar tu pedido antes de que sea procesado. Para productos personalizados, las cancelaciones deben realizarse dentro de las 24 horas posteriores al pedido. Los reembolsos se procesarán según nuestras políticas.'
                },
                {
                    heading: 'Alergias e Información Nutricional',
                    content: 'Aunque nos especializamos en productos para personas con alergias alimentarias, es responsabilidad del cliente informarnos sobre alergias específicas. No nos hacemos responsables de reacciones alérgicas no comunicadas.'
                },
                {
                    heading: 'Propiedad Intelectual',
                    content: 'Todo el contenido de este sitio web, incluyendo textos, imágenes, logotipos y diseño, es propiedad de Olivias Panadería & Pastelería Saludable y está protegido por leyes de propiedad intelectual.'
                }
            ]
        }
    };

    const pageContent = content[type] || content.delivery;

    return (
        <div className="info-page-overlay" onClick={onClose}>
            <div className="info-page-modal" onClick={(e) => e.stopPropagation()}>
                <div className="info-page-header">
                    <div className="info-page-title">
                        <i className={pageContent.icon}></i>
                        <h2>{pageContent.title}</h2>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <i className="fa-solid fa-times"></i>
                    </button>
                </div>
                <div className="info-page-content">
                    {pageContent.sections.map((section, index) => (
                        <div key={index} className="info-section">
                            <h3>{section.heading}</h3>
                            <p>{section.content}</p>
                        </div>
                    ))}
                </div>
                <div className="info-page-footer">
                    <p>¿Tienes preguntas? <a href="#contacto" onClick={(e) => {
                        e.preventDefault();
                        navigateTo('contacto');
                        onClose();
                    }}>Contáctanos</a></p>
                </div>
            </div>
        </div>
    );
}

