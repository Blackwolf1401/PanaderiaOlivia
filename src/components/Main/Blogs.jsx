import { useState } from 'react';
import CardBlog from '../UI/CardBlog';
import BlogDetail from '../Blog/BlogDetail';

export default function Blogs() {
    const [selectedBlog, setSelectedBlog] = useState(null);

    const blogPosts = [
    {
        id: 1,
        image: "/img/blog-1.jpg",
        alt: "imagen de blog 1",
        title: "El Arte de la Panadería Tradicional",
        date: "29 Noviembre 2022",
        author: "Chef María González",
        category: "Recetas",
        content: "Descubre los secretos de la panadería tradicional que han pasado de generación en generación en nuestra familia.",
        excerpt: "En este artículo exploramos las técnicas tradicionales de panadería que han sido el corazón de Olivias Panadería desde nuestros inicios."
    },
    {
        id: 2,
        image: "/img/blog-2.jpg",
        alt: "imagen de blog 2",
        title: "Ingredientes Premium: La Base de Nuestra Calidad",
        date: "15 Diciembre 2022",
        author: "Chef Carlos Martínez",
        category: "Calidad",
        content: "Conoce cómo seleccionamos los mejores ingredientes para garantizar la máxima calidad en cada producto.",
        excerpt: "La calidad comienza con los ingredientes. Te contamos cómo elegimos cada elemento que forma parte de nuestros productos."
    },
    {
        id: 3,
        image: "/img/blog-3.jpg",
        alt: "imagen de blog 3",
        title: "Recetas de Temporada: Delicias Navideñas",
        date: "1 Diciembre 2022",
        author: "Chef Ana Rodríguez",
        category: "Recetas",
        content: "Prepara deliciosas recetas navideñas con nuestros productos especiales de temporada.",
        excerpt: "Llega la temporada navideña y con ella nuestras especialidades únicas. Aprende a crear magia en tu mesa."
    }
    ];

    return (
    <>
        <section className="container blogs">
            <h1 className="heading-1">Últimos blogs</h1>
            <div className="container-blogs">
            {blogPosts.map((post) => (
                <CardBlog
                key={post.id}
                blog={post}
                onReadMore={() => setSelectedBlog(post)}
                />
            ))}
            </div>
        </section>

        {selectedBlog && (
            <BlogDetail 
                blog={selectedBlog} 
                onClose={() => setSelectedBlog(null)} 
            />
        )}
    </>
    );
}