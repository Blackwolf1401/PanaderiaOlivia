import CardCategory from '../UI/CardCategory';

export default function Categories() {
    const categories = [
    {
        className: 'category-tortas',
        name: 'Kuchen de Nuez',
        linkText: 'ver más'
    },
    {
        className: 'category-panes',
        name: 'Pan de centeno',
        linkText: 'ver más'
    },
    {
        className: 'category-pancito',
        name: 'Pancito de Multisemillas',
        linkText: 'ver más'
    }
    ];

    return (
    <section className="container top-categories">
        <h1 className="heading-1">Mejores Categorias</h1>
        <div className="container-categories">
        {categories.map((category, index) => (
            <CardCategory
            key={index}
            className={category.className}
            name={category.name}
            linkText={category.linkText}
            />
        ))}
        </div>
    </section>
    );
}