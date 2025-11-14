import { createContext, useContext, useState, useEffect } from 'react';

const SearchContext = createContext();

// Función para obtener todos los productos de la aplicación
const getAllProducts = () => {
    // Productos de la sección Products
    const productsSection = [
        {
            id: 1,
            image: "/img/kuchen-trocito.png",
            alt: "Kuchen-de-Nuez",
            discount: "-13%",
            name: "Kuchen de Nuez",
            stars: 5,
            currentPrice: "12.171",
            originalPrice: "13.990",
            category: "tortas",
            tags: ["kuchen", "nuez", "torta", "postre", "sin gluten"]
        },
        {
            id: 2,
            image: "/img/pancito.png",
            alt: "Pancito-de-Multisemillas",
            discount: "-13%",
            name: "Pan de Masa Madre con Multisemillas",
            stars: 4,
            currentPrice: "6.960",
            originalPrice: "8.000",
            category: "panes",
            tags: ["pan", "masa madre", "multisemillas", "saludable", "sin gluten"]
        },
        {
            id: 3,
            image: "/img/pan-de-centeno.png",
            alt: "pan-de-centeno",
            discount: "-9%",
            name: "Pan de centeno",
            stars: 3.5,
            currentPrice: "4.550",
            originalPrice: "5.000",
            category: "panes",
            tags: ["pan", "centeno", "integral", "saludable"]
        },
        {
            id: 4,
            image: "/img/pie-de-limon.png",
            alt: "pie-de-limon",
            discount: "-15%",
            name: "Pie de Limon",
            stars: 5,
            currentPrice: "16.141",
            originalPrice: "18.990",
            category: "tortas",
            tags: ["pie", "limon", "torta", "postre", "sin azucar"]
        },
        {
            id: 5,
            image: "/img/croissant.jpg",
            alt: "croissant",
            discount: "-4%",
            name: "Croissant de Manjar",
            stars: 4.5,
            currentPrice: "4.800",
            originalPrice: "5.000",
            category: "pancito",
            tags: ["croissant", "manjar", "dulce", "panecillo"]
        },
        {
            id: 6,
            image: "/img/cheesecake.jpg",
            alt: "cheesecake",
            discount: "-10%",
            name: "Cheesecake de Arandanos y Frambuesas",
            stars: 5,
            currentPrice: "15.750",
            originalPrice: "17.500",
            category: "tortas",
            tags: ["cheesecake", "arandanos", "frambuesas", "torta", "postre", "sin azucar"]
        }
    ];

    return productsSection;
};

export function SearchProvider({ children }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const allProducts = getAllProducts();

    // Función de búsqueda
    const searchProducts = (query) => {
        if (!query || query.trim().length === 0) {
            setSearchResults([]);
            setShowResults(false);
            return;
        }

        setIsSearching(true);
        const normalizedQuery = query.toLowerCase().trim();

        const results = allProducts.filter(product => {
            // Buscar en el nombre
            const nameMatch = product.name.toLowerCase().includes(normalizedQuery);
            
            // Buscar en las etiquetas
            const tagsMatch = product.tags?.some(tag => 
                tag.toLowerCase().includes(normalizedQuery)
            ) || false;

            // Buscar en la categoría
            const categoryMatch = product.category?.toLowerCase().includes(normalizedQuery) || false;

            // Buscar en el alt text
            const altMatch = product.alt?.toLowerCase().includes(normalizedQuery) || false;

            return nameMatch || tagsMatch || categoryMatch || altMatch;
        });

        // Ordenar resultados por relevancia
        const sortedResults = results.sort((a, b) => {
            const aNameMatch = a.name.toLowerCase().startsWith(normalizedQuery);
            const bNameMatch = b.name.toLowerCase().startsWith(normalizedQuery);
            
            if (aNameMatch && !bNameMatch) return -1;
            if (!aNameMatch && bNameMatch) return 1;
            
            return a.name.localeCompare(b.name);
        });

        setSearchResults(sortedResults);
        setShowResults(true);
        setIsSearching(false);
    };

    // Búsqueda en tiempo real con debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchQuery) {
                searchProducts(searchQuery);
            } else {
                setSearchResults([]);
                setShowResults(false);
            }
        }, 300); // Debounce de 300ms

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
        setShowResults(false);
    };

    const value = {
        searchQuery,
        setSearchQuery,
        searchResults,
        isSearching,
        showResults,
        setShowResults,
        searchProducts,
        clearSearch,
        allProducts
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within SearchProvider');
    }
    return context;
}

