import { useState } from 'react';
import CardCategory from '../UI/CardCategory';
import CategoryView from '../Category/CategoryView';

export default function Categories() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Productos por categoría
    const categoryProducts = {
        'tortas': [
            {
                id: 1,
                image: "/img/kuchen-trocito.png",
                alt: "Kuchen-de-Nuez",
                discount: "-13%",
                name: "Kuchen de Nuez",
                stars: 5,
                currentPrice: "12.171",
                originalPrice: "13.990",
                category: "tortas"
            },
            {
                id: 4,
                image: "/img/pie-de-limon.png",
                alt: "pie-de-limon",
                discount: "-15%",
                name: "Pie de Limon",
                stars: 5,
                currentPrice: "16.141",
                originalPrice: "18.990",
                category: "tortas"
            },
            {
                id: 7,
                image: "/img/cheesecake.jpg",
                alt: "cheesecake",
                discount: "-10%",
                name: "Cheesecake de Arandanos y Frambuesas",
                stars: 5,
                currentPrice: "15.750",
                originalPrice: "17.500",
                category: "tortas"
            }
        ],
        'panes': [
            {
                id: 3,
                image: "/img/pan-de-centeno.png",
                alt: "pan-de-centeno",
                discount: "-9%",
                name: "Pan de centeno",
                stars: 3.5,
                currentPrice: "4.550",
                originalPrice: "5.000",
                category: "panes"
            },
            {
                id: 2,
                image: "/img/pancito.png",
                alt: "Pancito-de-Multisemillas",
                discount: "-13%",
                name: "Pan de Masa Madre con Multisemillas",
                stars: 4,
                currentPrice: "6.960",
                originalPrice: "8.000",
                category: "panes"
            }
        ],
        'pancito': [
            {
                id: 2,
                image: "/img/pancito.png",
                alt: "Pancito-de-Multisemillas",
                discount: "-13%",
                name: "Pan de Masa Madre con Multisemillas",
                stars: 4,
                currentPrice: "6.960",
                originalPrice: "8.000",
                category: "pancito"
            },
            {
                id: 6,
                image: "/img/croissant.jpg",
                alt: "croissant",
                discount: "-4%",
                name: "Croissant de Manjar",
                stars: 4.5,
                currentPrice: "4.800",
                originalPrice: "5.000",
                category: "pancito"
            }
        ]
    };

    const categories = [
    {
        id: 'tortas',
        className: 'category-tortas',
        name: 'Kuchen de Nuez',
        linkText: 'ver más',
        products: categoryProducts['tortas']
    },
    {
        id: 'panes',
        className: 'category-panes',
        name: 'Pan de centeno',
        linkText: 'ver más',
        products: categoryProducts['panes']
    },
    {
        id: 'pancito',
        className: 'category-pancito',
        name: 'Pancito de Multisemillas',
        linkText: 'ver más',
        products: categoryProducts['pancito']
    }
    ];

    return (
    <>
        <section className="container top-categories">
            <h1 className="heading-1">Mejores Categorias</h1>
            <div className="container-categories">
            {categories.map((category) => (
                <CardCategory
                key={category.id}
                category={category}
                onClick={() => setSelectedCategory(category)}
                />
            ))}
            </div>
        </section>

        {selectedCategory && (
            <CategoryView
                category={selectedCategory}
                products={selectedCategory.products}
                onClose={() => setSelectedCategory(null)}
            />
        )}
    </>
    );
}