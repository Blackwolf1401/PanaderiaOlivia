import CardBlog from '../UI/CardBlog';

export default function Blogs() {
    const blogPosts = [
    {
        image: "/img/blog-1.jpg",
        alt: "imagen de blog 1",
        title: "lorem, ipsum dolor sit",
        date: "29 Noviembre 2022",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis ipsam dolor accusantium, expedita aperiam ut. Eligendi, ipsum? Porro reiciendis ab debitis provident at, sed perferendis eius! Minus in fugit aspernatur."
    },
    {
        image: "/img/blog-2.jpg",
        alt: "imagen de blog 2",
        title: "lorem, ipsum dolor sit",
        date: "29 Noviembre 2022",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis ipsam dolor accusantium, expedita aperiam ut. Eligendi, ipsum? Porro reiciendis ab debitis provident at, sed perferendis eius! Minus in fugit aspernatur."
    },
    {
        image: "/img/blog-3.jpg",
        alt: "imagen de blog 3",
        title: "lorem, ipsum dolor sit",
        date: "29 Noviembre 2022",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis ipsam dolor accusantium, expedita aperiam ut. Eligendi, ipsum? Porro reiciendis ab debitis provident at, sed perferendis eius! Minus in fugit aspernatur."
    }
    ];

    return (
    <section className="container blogs">
        <h1 className="heading-1">Últimos blogs</h1>
        <div className="container-blogs">
        {blogPosts.map((post, index) => (
            <CardBlog
            key={index}
            image={post.image}
            alt={post.alt}
            title={post.title}
            date={post.date}
            content={post.content}
            />
        ))}
        </div>
    </section>
    );
}