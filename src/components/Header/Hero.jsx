export default function Hero() {
    return (
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
    );
}