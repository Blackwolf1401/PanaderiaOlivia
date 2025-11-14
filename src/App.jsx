import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { NavigationProvider } from './context/NavigationContext';
import { SearchProvider } from './context/SearchContext';
import './animations.css';

export default function App() {
  try {
    return (
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <SearchProvider>
              <NavigationProvider>
                <Header />
                <Main />
                <Footer />
              </NavigationProvider>
            </SearchProvider>
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    );
  } catch (error) {
    console.error('Error en App:', error);
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h1>Error en la aplicación</h1>
        <p>{error.message}</p>
      </div>
    );
  }
}