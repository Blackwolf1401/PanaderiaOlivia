import { useState } from 'react';
import './CardCategory.css';
import './ImageAnimations.css';

export default function CardCategory({ category, onClick }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
    <div 
        className={`card-category interactive-category ${category.className}`}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        <div className="category-overlay"></div>
        <div className="category-content">
            <p className="category-name">{category.name}</p>
            <button className="category-link">
                {category.linkText}
                <i className={`fa-solid fa-arrow-right ${isHovered ? 'arrow-animate' : ''}`}></i>
            </button>
            {category.products && (
                <span className="category-count">
                    <i className="fa-solid fa-box"></i>
                    {category.products.length} {category.products.length === 1 ? 'producto' : 'productos'}
                </span>
            )}
        </div>
    </div>
    );
}