import { useState, useEffect, useRef } from 'react';
import Cart from '../Cart/Cart';
import { useToastContext } from '../../context/ToastContext';
import { useNavigation } from '../../context/NavigationContext';
import { useSearch } from '../../context/SearchContext';
import SearchResults from '../Search/SearchResults';
import './Navbar.css';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { showInfo } = useToastContext();
    const { navigateTo, currentSection } = useNavigation();
    const { searchQuery, setSearchQuery, searchResults, showResults, setShowResults } = useSearch();
    const searchRef = useRef(null);
    const menuRef = useRef(null);

    // Detectar scroll para cambiar estilo del navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Cerrar menú móvil al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setShowResults(true);
            showInfo(`${searchResults.length} resultado(s) encontrado(s)`);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);
        setShowResults(true);
        searchRef.current?.focus();
    };

    const handleMenuClick = (sectionId, sectionName) => {
        navigateTo(sectionId);
        setIsMenuOpen(false);
        showInfo(`Navegando a: ${sectionName}`);
    };

    const menuItems = [
        { name: 'Inicio', icon: 'fa-solid fa-house', section: 'inicio' },
        { name: 'Nosotros', icon: 'fa-solid fa-users', section: 'nosotros' },
        { name: 'Contacto', icon: 'fa-solid fa-envelope', section: 'contacto' },
        { name: 'Tienda', icon: 'fa-solid fa-store', section: 'tienda' }
    ];

    return (
    <div className={`container-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <nav className="navbar container" ref={menuRef}>
            <button 
                className="menu-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
            >
                <i className={`fa-solid ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
            
            <ul className={`menu ${isMenuOpen ? 'menu-open' : ''}`}>
                {menuItems.map((item, index) => (
                    <li key={item.section}>
                        <a 
                            href={`#${item.section}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleMenuClick(item.section, item.name);
                            }}
                            className={`menu-link ${currentSection === item.section ? 'active' : ''}`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <i className={item.icon}></i>
                            <span>{item.name}</span>
                            <span className="menu-link-underline"></span>
                        </a>
                    </li>
                ))}
            </ul>

            <div className="navbar-right">
                <form 
                    className={`search-form ${isSearchFocused ? 'focused' : ''}`}
                    onSubmit={handleSearch}
                >
                    <div className="search-wrapper">
                        <input 
                            type="search" 
                            placeholder="Buscar productos..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            ref={searchRef}
                            className="search-input"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                className="search-clear"
                                onClick={() => {
                                    setSearchQuery('');
                                    setShowResults(false);
                                    searchRef.current?.focus();
                                }}
                                aria-label="Limpiar búsqueda"
                            >
                                <i className="fa-solid fa-times"></i>
                            </button>
                        )}
                        {searchQuery && searchResults.length > 0 && (
                            <span className="search-results-badge">
                                {searchResults.length}
                            </span>
                        )}
                    </div>
                    <button 
                        type="submit"
                        className="btn-search" 
                        aria-label="Buscar"
                    >
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                    {isSearchFocused && !searchQuery && (
                        <div className="search-suggestions">
                            <div className="suggestion-header">
                                <i className="fa-solid fa-lightbulb"></i>
                                <span>Sugerencias de búsqueda</span>
                            </div>
                            <div 
                                className="suggestion-item"
                                onClick={() => handleSuggestionClick('Kuchen')}
                            >
                                <i className="fa-solid fa-magnifying-glass"></i>
                                <span>Kuchen</span>
                            </div>
                            <div 
                                className="suggestion-item"
                                onClick={() => handleSuggestionClick('Pan')}
                            >
                                <i className="fa-solid fa-magnifying-glass"></i>
                                <span>Pan</span>
                            </div>
                            <div 
                                className="suggestion-item"
                                onClick={() => handleSuggestionClick('Croissant')}
                            >
                                <i className="fa-solid fa-magnifying-glass"></i>
                                <span>Croissant</span>
                            </div>
                            <div 
                                className="suggestion-item"
                                onClick={() => handleSuggestionClick('sin gluten')}
                            >
                                <i className="fa-solid fa-magnifying-glass"></i>
                                <span>Sin gluten</span>
                            </div>
                        </div>
                    )}
                </form>
                <Cart />
            </div>
        </nav>
        {showResults && <SearchResults />}
    </div>
    );
}