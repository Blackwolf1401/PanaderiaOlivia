import './Pages.css';
import '../UI/ImageAnimations.css';

export default function About() {
    return (
        <section id="nosotros" className="page-section about-section">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">
                        <i className="fa-solid fa-users"></i>
                        Sobre Nosotros
                    </h1>
                    <p className="page-subtitle">Conoce la historia de Olivias Panadería & Pastelería Saludable</p>
                </div>

                <div className="about-content">
                    <div className="about-image">
                        <img src="/img/about.jpg" alt="Panadería Olivias" />
                        <div className="image-overlay">
                            <div className="overlay-content">
                                <h3>Emprendimiento Familiar</h3>
                                <p>Productos saludables para todos</p>
                            </div>
                        </div>
                    </div>

                    <div className="about-text">
                        <div className="about-story">
                            <h2>Nuestra Historia</h2>
                            <p>
                                <strong>Olivias Panadería & Pastelería Saludable</strong> es un emprendimiento familiar 
                                que se dedica a elaborar productos saludables de panadería y pastelería, creando 
                                productos para distintas alergias alimentarias, principalmente para diabéticos y celíacos.
                            </p>
                            <p>
                                Nuestro objetivo es entregar un producto que cubra las distintas problemáticas de salud, 
                                utilizando materias primas de calidad a través de la compra de insumos locales. 
                                Desarrollamos productos personalizados para cada dolencia de salud, asegurando que 
                                cada cliente encuentre opciones deliciosas y seguras para sus necesidades específicas.
                            </p>
                            <p>
                                Cada producto que sale de nuestros hornos lleva el sello de dedicación, pasión y 
                                conocimiento especializado que nos caracteriza. Trabajamos con ingredientes frescos, 
                                naturales y de origen local, sin conservantes artificiales, para ofrecerte lo mejor 
                                en cada bocado.
                            </p>
                        </div>

                        <div className="about-values">
                            <h2>Nuestros Valores</h2>
                            <div className="values-grid">
                                <div className="value-card">
                                    <i className="fa-solid fa-heart-pulse"></i>
                                    <h3>Salud</h3>
                                    <p>Productos diseñados para cubrir distintas necesidades de salud y alergias alimentarias</p>
                                </div>
                                <div className="value-card">
                                    <i className="fa-solid fa-leaf"></i>
                                    <h3>Calidad Local</h3>
                                    <p>Materias primas de calidad a través de la compra de insumos locales</p>
                                </div>
                                <div className="value-card">
                                    <i className="fa-solid fa-user-doctor"></i>
                                    <h3>Especialización</h3>
                                    <p>Productos personalizados para cada dolencia de salud con conocimiento especializado</p>
                                </div>
                                <div className="value-card">
                                    <i className="fa-solid fa-handshake"></i>
                                    <h3>Compromiso</h3>
                                    <p>Con la satisfacción y bienestar de nuestros clientes y sus necesidades específicas</p>
                                </div>
                            </div>
                        </div>

                        <div className="about-team">
                            <h2>Nuestro Equipo</h2>
                            <div className="team-grid">
                                <div className="team-member">
                                    <div className="member-avatar">
                                        <i className="fa-solid fa-user-tie"></i>
                                    </div>
                                    <h3>Fundadora</h3>
                                    <p className="member-role">Dueña & Especialista en Celiaquía</p>
                                    <p className="member-bio">
                                        Con experiencia de varios años a nivel internacional y nacional, cuenta con 
                                        una maestría en celiaquía que le asegura entregar productos de buena calidad 
                                        de acuerdo a las necesidades de sus clientes. Es el corazón y la mente 
                                        detrás de cada receta especializada.
                                    </p>
                                </div>
                                <div className="team-member">
                                    <div className="member-avatar">
                                        <i className="fa-solid fa-users"></i>
                                    </div>
                                    <h3>Equipo Familiar</h3>
                                    <p className="member-role">Panadería & Pastelería</p>
                                    <p className="member-bio">
                                        Nuestro equipo familiar trabaja con dedicación para crear productos saludables 
                                        que satisfagan las necesidades específicas de cada cliente, especialmente 
                                        para diabéticos y celíacos.
                                    </p>
                                </div>
                                <div className="team-member">
                                    <div className="member-avatar">
                                        <i className="fa-solid fa-seedling"></i>
                                    </div>
                                    <h3>Proveedores Locales</h3>
                                    <p className="member-role">Insumos de Calidad</p>
                                    <p className="member-bio">
                                        Trabajamos en estrecha colaboración con proveedores locales para asegurar 
                                        materias primas frescas y de la más alta calidad en cada uno de nuestros productos.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="about-specialties">
                            <h2>Nuestras Especialidades</h2>
                            <div className="specialties-grid">
                                <div className="specialty-card">
                                    <i className="fa-solid fa-wheat-awn-circle-exclamation"></i>
                                    <h3>Productos para Celíacos</h3>
                                    <p>Elaborados con ingredientes libres de gluten, certificados y seguros para personas con celiaquía.</p>
                                </div>
                                <div className="specialty-card">
                                    <i className="fa-solid fa-candy-cane"></i>
                                    <h3>Productos para Diabéticos</h3>
                                    <p>Opciones sin azúcar o con endulzantes naturales, diseñadas para mantener niveles de glucosa estables.</p>
                                </div>
                                <div className="specialty-card">
                                    <i className="fa-solid fa-allergies"></i>
                                    <h3>Otras Alergias Alimentarias</h3>
                                    <p>Productos personalizados para cubrir distintas alergias e intolerancias alimentarias.</p>
                                </div>
                                <div className="specialty-card">
                                    <i className="fa-solid fa-user-gear"></i>
                                    <h3>Productos Personalizados</h3>
                                    <p>Desarrollamos productos específicos para cada dolencia de salud según las necesidades individuales.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

