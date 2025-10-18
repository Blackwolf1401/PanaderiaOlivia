export default function Navbar() {
    return (
    <div className="container-navbar">
        <nav className="navbar container">
        <i className="fa-solid fa-bars"></i>
        <ul className="menu">
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Nosotros</a></li>
            <li><a href="#">Contacto</a></li>
            <li><a href="#">Tienda</a></li>
        </ul>
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
            <input type="search" placeholder="Buscar..." />
            <button className="btn-search" aria-label="Buscar">
            <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </form>
        </nav>
    </div>
    );
}