export default function Footer() {
    return (
    <footer className="footer">
        <div className="container container-footer">
        <div className="menu-footer">
            <div className="contact-info">
            <p className="title-footer">Información de Contacto</p>
            <ul>
                <li>Direccion: Manuel Barrios 5006, Las Condes</li>
                <li>Telefono: 123-456-7890</li>
                <li>Gmail: OliviasPanaderia@gmail.com</li>
            </ul>
            <div className="social-icons">
                <span className="facebook"><i className="fa-brands fa-facebook"></i></span>
                <span className="twitter"><i className="fa-brands fa-x-twitter"></i></span>
                <span className="instagram"><i className="fa-brands fa-instagram"></i></span>
            </div>
            </div>

            <div className="information">
            <p className="title-footer">información</p>
            <ul>
                <li><a href="#">Acerca de Nosotros</a></li>
                <li><a href="#">Informacion Delivery</a></li>
                <li><a href="#">Politicas De Privacidad</a></li>
                <li><a href="#">Términos y condiciones</a></li>
                <li><a href="#">Contáctanos</a></li>
            </ul>
            </div>

            <div className="my-account">
            <p className="title-footer">Mi Cuenta</p>
            <ul>
                <li><a href="#">Mi cuenta</a></li>
                <li><a href="#">Historial de ordenes</a></li>
                <li><a href="#">Lista de deseos</a></li>
                <li><a href="#">Boletín</a></li>
                <li><a href="#">Rembolsos</a></li>
            </ul>
            </div>

            <div className="newsletter">
            <p className="title-footer">Regístrate Gratis</p>
            <div className="content">
                <p>Regístrate y obtendras Descuentos y podras estar al tanto de las ofertas que tendremos para ti.</p>
                <input type="email" placeholder="Ingresa tu correo electrónico" aria-label="Correo electrónico" />
                <button>Regístrate</button>
            </div>
            </div>
        </div>

        <div className="copyright">
            <p>
            Desarrollado por Pablo Oñate para el Proyecto de Portafolio de Titulo de Duoc Uc &copy; 2025.
            </p>
            <img src="/img/payment.png" alt="pagos" />
        </div>
        </div>
    </footer>
    );
}