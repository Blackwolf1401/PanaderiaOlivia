import { createContext, useContext, useState, useEffect } from 'react';

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
    const [currentSection, setCurrentSection] = useState('inicio');

    // Detectar cambios en el hash de la URL
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.slice(1) || 'inicio';
            setCurrentSection(hash);
        };

        // Verificar hash inicial
        handleHashChange();

        // Escuchar cambios en el hash
        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    const navigateTo = (section) => {
        setCurrentSection(section);
        window.location.hash = section;
        // Scroll suave al inicio de la página
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <NavigationContext.Provider value={{ currentSection, navigateTo }}>
            {children}
        </NavigationContext.Provider>
    );
}

export function useNavigation() {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error('useNavigation must be used within NavigationProvider');
    }
    return context;
}

