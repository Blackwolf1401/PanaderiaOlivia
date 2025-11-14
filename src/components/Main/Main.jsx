import { useNavigation } from '../../context/NavigationContext';
import Banner from './Banner';
import Blogs from './Blogs';
import Categories from './Categories';
import Features from './Features';
import Gallery from './Gallery';
import Products from './Products';
import Specials from './Specials';
import About from '../Pages/About';
import Contact from '../Pages/Contact';
import Shop from '../Pages/Shop';

export default function Main() {
    const { currentSection } = useNavigation();

    // Si la sección es "inicio", mostrar el contenido principal
    if (currentSection === 'inicio') {
        return (
            <main className="main-content">
                <Banner />
                <Features />
                <Categories />
                <Products />
                <Gallery />
                <Specials />
                <Blogs />
            </main>
        );
    }

    // Mostrar la sección correspondiente
    return (
        <main className="main-content">
            {currentSection === 'nosotros' && <About />}
            {currentSection === 'contacto' && <Contact />}
            {currentSection === 'tienda' && <Shop />}
        </main>
    );
}