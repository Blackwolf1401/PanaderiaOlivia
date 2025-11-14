import { useState } from 'react';
import './CardBlog.css';
import './ImageAnimations.css';

export default function CardBlog({ blog, onReadMore }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
    <div 
        className="card-blog interactive-blog-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        <div className="container-img">
        <img src={blog.image} alt={blog.alt} className="blog-image" />
        <div className={`button-group-blog ${isHovered ? 'visible' : ''}`}>
            <span 
                className="icon-btn-blog" 
                onClick={(e) => {
                    e.stopPropagation();
                    onReadMore();
                }}
                title="Leer artículo completo"
            >
                <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <span 
                className="icon-btn-blog"
                onClick={(e) => {
                    e.stopPropagation();
                    if (navigator.share) {
                        navigator.share({
                            title: blog.title,
                            text: blog.excerpt || blog.content,
                            url: window.location.href
                        });
                    }
                }}
                title="Compartir"
            >
                <i className="fa-solid fa-share"></i>
            </span>
        </div>
        {blog.category && (
            <span className="blog-category-badge">{blog.category}</span>
        )}
        </div>
        <div className="content-blog">
        <div className="blog-meta">
            <span className="blog-date">
                <i className="fa-solid fa-calendar"></i>
                {blog.date}
            </span>
            {blog.author && (
                <span className="blog-author">
                    <i className="fa-solid fa-user"></i>
                    {blog.author}
                </span>
            )}
        </div>
        <h3>{blog.title}</h3>
        <p className="blog-excerpt">{blog.excerpt || blog.content}</p>
        <button 
            className="btn-read-more"
            onClick={onReadMore}
        >
            Leer Más
            <i className="fa-solid fa-arrow-right"></i>
        </button>
        </div>
    </div>
    );
}