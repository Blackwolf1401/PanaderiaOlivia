import { useState, useEffect } from 'react';
import './BlogDetail.css';

export default function BlogDetail({ blog, onClose }) {
    const [isLiked, setIsLiked] = useState(false);
    const [isShared, setIsShared] = useState(false);

    useEffect(() => {
        // Prevenir scroll del body cuando el modal está abierto
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: blog.title,
                text: blog.excerpt || blog.content,
                url: window.location.href
            }).then(() => setIsShared(true));
        } else {
            // Fallback: copiar al portapapeles
            navigator.clipboard.writeText(window.location.href);
            setIsShared(true);
            setTimeout(() => setIsShared(false), 2000);
        }
    };

    return (
        <div className="blog-detail-modal">
            <div className="blog-detail-overlay" onClick={onClose}></div>
            <div className="blog-detail-container">
                <button className="blog-detail-close" onClick={onClose} aria-label="Cerrar">
                    <i className="fa-solid fa-times"></i>
                </button>

                <article className="blog-detail-content">
                    <div className="blog-detail-header">
                        <div className="blog-detail-meta">
                            <span className="blog-date">
                                <i className="fa-solid fa-calendar"></i>
                                {blog.date}
                            </span>
                            <span className="blog-author">
                                <i className="fa-solid fa-user"></i>
                                {blog.author || 'Olivias Panadería'}
                            </span>
                            <span className="blog-category">
                                <i className="fa-solid fa-tag"></i>
                                {blog.category || 'Recetas'}
                            </span>
                        </div>
                        <div className="blog-detail-actions">
                            <button 
                                className={`action-btn ${isLiked ? 'liked' : ''}`}
                                onClick={handleLike}
                                title="Me gusta"
                            >
                                <i className={isLiked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i>
                                <span>{isLiked ? 'Te gusta' : 'Me gusta'}</span>
                            </button>
                            <button 
                                className={`action-btn ${isShared ? 'shared' : ''}`}
                                onClick={handleShare}
                                title="Compartir"
                            >
                                <i className="fa-solid fa-share"></i>
                                <span>{isShared ? 'Compartido' : 'Compartir'}</span>
                            </button>
                        </div>
                    </div>

                    <div className="blog-detail-image">
                        <img src={blog.image} alt={blog.alt} />
                    </div>

                    <div className="blog-detail-body">
                        <h1 className="blog-detail-title">{blog.title}</h1>
                        
                        <div className="blog-detail-excerpt">
                            <p>{blog.excerpt || blog.content}</p>
                        </div>

                        <div className="blog-detail-full-content">
                            {blog.fullContent ? (
                                <div dangerouslySetInnerHTML={{ __html: blog.fullContent }} />
                            ) : (
                                <div className="blog-content-sections">
                                    <section>
                                        <h2>Introducción</h2>
                                        <p>
                                            En Olivias Panadería, nos enorgullece compartir nuestras recetas y secretos 
                                            culinarios contigo. Este artículo te llevará a través de un viaje de sabores 
                                            y tradiciones que han sido parte de nuestra familia por generaciones.
                                        </p>
                                    </section>

                                    <section>
                                        <h2>Nuestra Historia</h2>
                                        <p>
                                            Desde nuestros inicios, hemos mantenido la tradición de usar ingredientes 
                                            frescos y naturales. Cada producto que sale de nuestro horno lleva el 
                                            sello de calidad y dedicación que nos caracteriza.
                                        </p>
                                        <p>
                                            Nuestros maestros panaderos trabajan con técnicas tradicionales combinadas 
                                            con innovación moderna, creando productos únicos que deleitan a nuestros 
                                            clientes día tras día.
                                        </p>
                                    </section>

                                    <section>
                                        <h2>El Proceso</h2>
                                        <p>
                                            El proceso de elaboración es cuidadoso y meticuloso. Desde la selección de 
                                            los mejores ingredientes hasta el horneado final, cada paso es supervisado 
                                            para garantizar la máxima calidad.
                                        </p>
                                        <ul>
                                            <li>Selección de ingredientes premium</li>
                                            <li>Preparación artesanal de la masa</li>
                                            <li>Fermentación natural</li>
                                            <li>Horneado a la temperatura perfecta</li>
                                            <li>Enfriado y empaquetado cuidadoso</li>
                                        </ul>
                                    </section>

                                    <section>
                                        <h2>Consejos y Recomendaciones</h2>
                                        <p>
                                            Para disfrutar al máximo nuestros productos, te recomendamos:
                                        </p>
                                        <ol>
                                            <li>Conservar en un lugar fresco y seco</li>
                                            <li>Consumir dentro de los primeros días para mejor sabor</li>
                                            <li>Calentar ligeramente antes de servir para realzar el aroma</li>
                                            <li>Compartir con familia y amigos</li>
                                        </ol>
                                    </section>

                                    <section>
                                        <h2>Conclusión</h2>
                                        <p>
                                            En Olivias Panadería, cada producto cuenta una historia. Esperamos que 
                                            disfrutes de nuestros productos tanto como nosotros disfrutamos creándolos. 
                                            ¡Gracias por ser parte de nuestra familia!
                                        </p>
                                    </section>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="blog-detail-footer">
                        <div className="blog-tags">
                            <span className="tag">Panadería</span>
                            <span className="tag">Recetas</span>
                            <span className="tag">Tradición</span>
                            <span className="tag">Calidad</span>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}

