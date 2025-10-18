export default function App() {
  return (
    <>
      <header>
        <div className="container-hero">
          <div className="container hero">
            <div className="customer-support">
              <i className="fa-solid fa-headset"></i>
              <div className="content-customer-support">
                <span className="text">Soporte al Cliente</span>
                <span className="number">123-456-7890</span>
              </div>
            </div>

            <div className="container-logo">
              <i className="fa-solid fa-cake-candles"></i>
              <h1 className="logo"><a href="/">Olivias Panadería & Pastelería</a></h1>
            </div>

            <div className="container-user">
              <i className="fa-solid fa-user"></i>
              <i className="fa-solid fa-basket-shopping"></i>
              <div className="content-shopping-cart">
                <span className="text">carrito</span>
                <span className="number">(0)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container-navbar">
          <nav className="navbar container">
            <i className="fa-solid fa-bars"></i>
            <ul className="menu">
              <li><a href="#">Inicio</a></li>
              <li><a href="#">Nosotros</a></li>
              <li><a href="#">Contacto</a></li>
              <li><a href="#">Tienda</a></li>
            </ul>
            <form className="search-form" onSubmit={(e)=>e.preventDefault()}>
              <input type="search" placeholder="Buscar..." />
              <button className="btn-search" aria-label="Buscar">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </nav>
        </div>
      </header>

      <section className="banner">
        <div className="content-banner">
          <p>Mejores Pasteles</p>
          <h2>Deliciosos y Frescos <br />pasteles orgánicos </h2>
          <a href="#">Compra ahora</a>
        </div>
      </section>

      <main className="main-content">
        <section className="container container-features">
          <div className="card-feature">
            <i className="fa-solid fa-plane-up"></i>
            <div className="feature-content">
              <span>Envio gratis a todo Chile</span>
              <p>todos los productos</p>
            </div>
          </div>
          <div className="card-feature">
            <i className="fa-solid fa-wallet"></i>
            <div className="feature-content">
              <span>Contra reembolso</span>
              <p>Te devolvemos el 85% de tu compra</p>
            </div>
          </div>
          <div className="card-feature">
            <i className="fa-solid fa-percent"></i>
            <div className="feature-content">
              <span>Ofertas Especiales</span>
              <p>Hasta 60% en panaderia y pasteleria</p>
            </div>
          </div>
          <div className="card-feature">
            <i className="fa-solid fa-headset"></i>
            <div className="feature-content">
              <span>Servicio al cliente 24/7</span>
              <p>Contáctanos al 123-456-7890</p>
            </div>
          </div>
        </section>

        <section className="container top-categories">
          <h1 className="heading-1">Mejores Categorias</h1>
          <div className="container-categories">
            <div className="card-category category-tortas">
              <p>Kuchen de Nuez</p>
              <span>ver más</span>
            </div>
            <div className="card-category category-panes">
              <p>Pan de centeno</p>
              <span>ver más</span>
            </div>
            <div className="card-category category-pancito">
              <p>Pancito de Multisemillas</p>
              <span>ver más</span>
            </div>
          </div>
        </section>

        <section className="container top-products">
          <h1 className="heading-1">Mejores Productos</h1>

          <div className="container-options">
            <span className="active">Destacados</span>
            <span>Más Recientes</span>
            <span>Mejores Vendidos</span>
          </div>

          <div className="container-products">
            {/* Producto 1 */}
            <div className="card-product">
              <div className="container-img">
                <img src="/img/kuchen-trocito.png" alt="Kuchen-de-Nuez" />
                <span className="discount">-13%</span>
                <div className="button-group">
                  <span><i className="fa-regular fa-eye"></i></span>
                  <span><i className="fa-regular fa-heart"></i></span>
                  <span><i className="fa-solid fa-code-compare"></i></span>
                </div>
              </div>
              <div className="content-card-product">
                <div className="stars">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <h3>Kuchen de Nuez</h3>
                <div className="price-cart">
                  <p className="price">$12.171 <span>$13.990</span></p>
                  <span className="add-cart"><i className="fa-solid fa-basket-shopping"></i></span>
                </div>
              </div>
            </div>
            {/* Producto 2 */}
            <div className="card-product">
              <div className="container-img">
                <img src="/img/pancito.png" alt="Pancito-de-Multisemillas" />
                <span className="discount">-13%</span>
                <div className="button-group">
                  <span><i className="fa-regular fa-eye"></i></span>
                  <span><i className="fa-regular fa-heart"></i></span>
                  <span><i className="fa-solid fa-code-compare"></i></span>
                </div>
              </div>
              <div className="content-card-product">
                <div className="stars">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                </div>
                <h3>Pan de Masa Madre con Multisemillas</h3>
                <div className="price-cart">
                  <p className="price">$6.960 <span>$8.000</span></p>
                  <span className="add-cart"><i className="fa-solid fa-basket-shopping"></i></span>
                </div>
              </div>
            </div>
            {/* Producto 3 */}
            <div className="card-product">
              <div className="container-img">
                <img src="/img/pan-de-centeno.png" alt="pan-de-centeno" />
                <span className="discount">-9%</span>
                <div className="button-group">
                  <span><i className="fa-regular fa-eye"></i></span>
                  <span><i className="fa-regular fa-heart"></i></span>
                  <span><i className="fa-solid fa-code-compare"></i></span>
                </div>
              </div>
              <div className="content-card-product">
                <div className="stars">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-regular fa-star-half-stroke"></i>
                  <i className="fa-regular fa-star"></i>
                </div>
                <h3>Pan de centeno</h3>
                <div className="price-cart">
                  <p className="price">$4.550 <span>$5.000</span></p>
                  <span className="add-cart"><i className="fa-solid fa-basket-shopping"></i></span>
                </div>
              </div>
            </div>
            {/* Producto 4 */}
            <div className="card-product">
              <div className="container-img">
                <img src="/img/pie-de-limon.png" alt="pie-de-limon" />
                <span className="discount">-15%</span>
                <div className="button-group">
                  <span><i className="fa-regular fa-eye"></i></span>
                  <span><i className="fa-regular fa-heart"></i></span>
                  <span><i className="fa-solid fa-code-compare"></i></span>
                </div>
              </div>
              <div className="content-card-product">
                <div className="stars">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <h3>Pie de Limon</h3>
                <div className="price-cart">
                  <p className="price">$16.141 <span>$18.990</span></p>
                  <span className="add-cart"><i className="fa-solid fa-basket-shopping"></i></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="gallery">
          <img src="/img/gallery1.jpg.png" alt="gallery img1" className="gallery-img-1" />
          <img src="/img/gallery2.jpg.png" alt="gallery img2" className="gallery-img-2" />
          <img src="/img/gallery3.jpg" alt="gallery img3" className="gallery-img-3" />
          <img src="/img/gallery4.jpg" alt="gallery img4" className="gallery-img-4" />
          <img src="/img/gallery5.jpg" alt="gallery img5" className="gallery-img-5" />
        </section>

        <section className="container specials">
          <h1 className="heading-1">Especiales</h1>

          <div className="container-products">
            <div className="card-product">
              <div className="container-img">
                <img src="/img/kuchen-trocito.png" alt="Kuchen-de-Nuez" />
                <span className="discount">-13%</span>
                <div className="button-group">
                  <span><i className="fa-regular fa-eye"></i></span>
                  <span><i className="fa-regular fa-heart"></i></span>
                  <span><i className="fa-solid fa-code-compare"></i></span>
                </div>
              </div>
              <div className="content-card-product">
                <div className="stars">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <h3>Kuchen de Nuez</h3>
                <div className="price-cart">
                  <p className="price">$12.171 <span>$13.990</span></p>
                  <span className="add-cart"><i className="fa-solid fa-basket-shopping"></i></span>
                </div>
              </div>
            </div>

            <div className="card-product">
              <div className="container-img">
                <img src="/img/croissant.jpg" alt="croissant" />
                <span className="discount">-4%</span>
                <div className="button-group">
                  <span><i className="fa-regular fa-eye"></i></span>
                  <span><i className="fa-regular fa-heart"></i></span>
                  <span><i className="fa-solid fa-code-compare"></i></span>
                </div>
              </div>
              <div className="content-card-product">
                <div className="stars">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-regular fa-star-half-stroke"></i>
                </div>
                <h3>croissant de Manjar</h3>
                <div className="price-cart">
                  <p className="price">$4.800 <span>$5.000</span></p>
                  <span className="add-cart"><i className="fa-solid fa-basket-shopping"></i></span>
                </div>
              </div>
            </div>

            <div className="card-product">
              <div className="container-img">
                <img src="/img/cheesecake.jpg" alt="cheesecake" />
                <span className="discount">-10%</span>
                <div className="button-group">
                  <span><i className="fa-regular fa-eye"></i></span>
                  <span><i className="fa-regular fa-heart"></i></span>
                  <span><i className="fa-solid fa-code-compare"></i></span>
                </div>
              </div>
              <div className="content-card-product">
                <div className="stars">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <h3>cheesecake de Arandanos y Frambuesas</h3>
                <div className="price-cart">
                  <p className="price">$15.750 <span>$17.500</span></p>
                  <span className="add-cart"><i className="fa-solid fa-basket-shopping"></i></span>
                </div>
              </div>
            </div>

            <div className="card-product">
              <div className="container-img">
                <img src="/img/pie-de-limon.png" alt="pie-de-limon" />
                <span className="discount">-15%</span>
                <div className="button-group">
                  <span><i className="fa-regular fa-eye"></i></span>
                  <span><i className="fa-regular fa-heart"></i></span>
                  <span><i className="fa-solid fa-code-compare"></i></span>
                </div>
              </div>
              <div className="content-card-product">
                <div className="stars">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <h3>Pie de Limon</h3>
                <div className="price-cart">
                  <p className="price">$16.141 <span>$18.990</span></p>
                  <span className="add-cart"><i className="fa-solid fa-basket-shopping"></i></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container blogs">
          <h1 className="heading-1">Últimos blogs</h1>

          <div className="container-blogs">
            <div className="card-blog">
              <div className="container-img">
                <img src="/img/blog-1.jpg" alt="imagen de blog 1" />
                <div className="button-group-blog">
                  <span><i className="fa-solid fa-magnifying-glass"></i></span>
                  <span><i className="fa-solid fa-link"></i></span>
                </div>
              </div>
              <div className="content-blog">
                <h3>lorem, ipsum dolor sit</h3>
                <span>29 Noviembre 2022</span>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quis ipsam dolor accusantium, expedita aperiam ut.
                  Eligendi, ipsum? Porro reiciendis ab debitis provident at, 
                  sed perferendis eius! Minus in fugit aspernatur.
                </p>
                <div className="btn-read-more">Leer Más</div>
              </div>
            </div>

            <div className="card-blog">
              <div className="container-img">
                <img src="/img/blog-2.jpg" alt="imagen de blog 2" />
                <div className="button-group-blog">
                  <span><i className="fa-solid fa-magnifying-glass"></i></span>
                  <span><i className="fa-solid fa-link"></i></span>
                </div>
              </div>
              <div className="content-blog">
                <h3>lorem, ipsum dolor sit</h3>
                <span>29 Noviembre 2022</span>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quis ipsam dolor accusantium, expedita aperiam ut.
                  Eligendi, ipsum? Porro reiciendis ab debitis provident at, 
                  sed perferendis eius! Minus in fugit aspernatur.
                </p>
                <div className="btn-read-more">Leer Más</div>
              </div>
            </div>

            <div className="card-blog">
              <div className="container-img">
                <img src="/img/blog-3.jpg" alt="imagen de blog 3" />
                <div className="button-group-blog">
                  <span><i className="fa-solid fa-magnifying-glass"></i></span>
                  <span><i className="fa-solid fa-link"></i></span>
                </div>
              </div>
              <div className="content-blog">
                <h3>lorem, ipsum dolor sit</h3>
                <span>29 Noviembre 2022</span>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quis ipsam dolor accusantium, expedita aperiam ut.
                  Eligendi, ipsum? Porro reiciendis ab debitis provident at, 
                  sed perferendis eius! Minus in fugit aspernatur.
                </p>
                <div className="btn-read-more">Leer Más</div>
              </div>
            </div>
          </div>
        </section>
      </main>

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
    </>
  )
}
