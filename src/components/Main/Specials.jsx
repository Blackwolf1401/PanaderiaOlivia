import CardProduct from '../UI/CardProduct';

export default function Specials() {
    const specialProducts = [
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
        image: "/img/croissant.jpg",
        alt: "croissant",
        discount: "-4%",
        name: "croissant de Manjar",
        stars: 4.5,
        currentPrice: "4.800",
        originalPrice: "5.000"
    },
    {
        image: "/img/cheesecake.jpg",
        alt: "cheesecake",
        discount: "-10%",
        name: "cheesecake de Arandanos y Frambuesas",
        stars: 5,
        currentPrice: "15.750",
        originalPrice: "17.500"
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
    <section className="container specials">
        <h1 className="heading-1">Especiales</h1>
        <div className="container-products">
        {specialProducts.map((product, index) => (
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