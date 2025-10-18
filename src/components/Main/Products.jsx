import CardProduct from '../UI/CardProduct';

export default function Products() {
    const products = [
    {
        image: "/img/kuchen-trocito.png",
        alt: "Kuchen-de-Nuez",
        discount: "-13%",
        name: "Kuchen de Nuez",
        stars: 5,
        currentPrice: "12.171",
        originalPrice: "13.990"
    },
    {
        image: "/img/pancito.png",
        alt: "Pancito-de-Multisemillas",
        discount: "-13%",
        name: "Pan de Masa Madre con Multisemillas",
        stars: 4,
        currentPrice: "6.960",
        originalPrice: "8.000"
    },
    {
        image: "/img/pan-de-centeno.png",
        alt: "pan-de-centeno",
        discount: "-9%",
        name: "Pan de centeno",
        stars: 3.5,
        currentPrice: "4.550",
        originalPrice: "5.000"
    },
    {
        image: "/img/pie-de-limon.png",
        alt: "pie-de-limon",
        discount: "-15%",
        name: "Pie de Limon",
        stars: 5,
        currentPrice: "16.141",
        originalPrice: "18.990"
    }
    ];

    return (
    <section className="container top-products">
        <h1 className="heading-1">Mejores Productos</h1>

        <div className="container-options">
        <span className="active">Destacados</span>
        <span>Más Recientes</span>
        <span>Mejores Vendidos</span>
        </div>

        <div className="container-products">
        {products.map((product, index) => (
            <CardProduct
            key={index}
            image={product.image}
            alt={product.alt}
            discount={product.discount}
            name={product.name}
            stars={product.stars}
            currentPrice={product.currentPrice}
            originalPrice={product.originalPrice}
            />
        ))}
        </div>
    </section>
    );
}