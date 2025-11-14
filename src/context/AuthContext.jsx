import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Usuarios de ejemplo (en producción esto estaría en una base de datos)
const defaultUsers = [
    {
        id: 1,
        email: 'admin@olivias.com',
        password: 'admin123',
        role: 'admin',
        name: 'Administrador'
    },
    {
        id: 2,
        email: 'cliente@olivias.com',
        password: 'cliente123',
        role: 'cliente',
        name: 'Cliente Demo'
    }
];

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Cargar usuario del localStorage al iniciar
    useEffect(() => {
        const savedUser = localStorage.getItem('olivias_user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error('Error al cargar usuario:', error);
                localStorage.removeItem('olivias_user');
            }
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Buscar usuario en la lista de usuarios
        const foundUser = defaultUsers.find(
            u => u.email === email && u.password === password
        );

        if (foundUser) {
            const userData = {
                id: foundUser.id,
                email: foundUser.email,
                role: foundUser.role,
                name: foundUser.name
            };
            setUser(userData);
            localStorage.setItem('olivias_user', JSON.stringify(userData));
            return { success: true, user: userData };
        }

        return { success: false, error: 'Email o contraseña incorrectos' };
    };

    const register = (email, password, name) => {
        // Verificar si el email ya existe
        const existingUser = defaultUsers.find(u => u.email === email);
        if (existingUser) {
            return { success: false, error: 'Este email ya está registrado' };
        }

        // Crear nuevo usuario (solo clientes pueden registrarse)
        const newUser = {
            id: defaultUsers.length + 1,
            email,
            password,
            role: 'cliente',
            name
        };

        defaultUsers.push(newUser);
        const userData = {
            id: newUser.id,
            email: newUser.email,
            role: newUser.role,
            name: newUser.name
        };

        setUser(userData);
        localStorage.setItem('olivias_user', JSON.stringify(userData));
        return { success: true, user: userData };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('olivias_user');
    };

    const isAdmin = () => {
        return user?.role === 'admin';
    };

    const isClient = () => {
        return user?.role === 'cliente';
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAdmin,
        isClient,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider');
    }
    return context;
}

