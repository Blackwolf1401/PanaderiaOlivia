import { useState, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import './Banner.css';

export default function Banner() {
    const { navigateTo } = useNavigation();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const banner = document.querySelector('.banner');
            if (banner) {
                const rect = banner.getBoundingClientRect();
                setMousePosition({
                    x: ((e.clientX - rect.left) / rect.width) * 100,
                    y: ((e.clientY - rect.top) / rect.height) * 100
                });
            }
        };

        const banner = document.querySelector('.banner');
        if (banner) {
            banner.addEventListener('mousemove', handleMouseMove);
            return () => banner.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);

    return (
        <section className="banner" style={{
            '--mouse-x': `${mousePosition.x}%`,
            '--mouse-y': `${mousePosition.y}%`
        }}>
            <div className="banner-particles">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="particle"></div>
                ))}
            </div>
            <div className="content-banner">
                <p>Productos Saludables</p>
                <h2>
                    <span>Panadería y Pastelería</span>
                    <br />
                    <span>para Diabéticos y Celíacos</span>
                </h2>
                <a 
                    href="#tienda" 
                    onClick={(e) => {
                        e.preventDefault();
                        navigateTo('tienda');
                    }}
                >
                    Compra ahora
                    <i className="fa-solid fa-arrow-right"></i>
                </a>
            </div>
        </section>
    );
}