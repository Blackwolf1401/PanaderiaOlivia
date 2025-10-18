import Banner from './Banner';
import Blogs from './Blogs';
import Categories from './Categories';
import Features from './Features';
import Gallery from './Gallery';
import Products from './Products';
import Specials from './Specials';

export default function Main() {
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