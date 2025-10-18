export default function Gallery() {
    const galleryImages = [
    {
        src: "/img/gallery1.jpg.png",
        alt: "gallery img1",
        className: "gallery-img-1"
    },
    {
        src: "/img/gallery2.jpg.png",
        alt: "gallery img2",
        className: "gallery-img-2"
    },
    {
        src: "/img/gallery3.jpg",
        alt: "gallery img3",
        className: "gallery-img-3"
    },
    {
        src: "/img/gallery4.jpg",
        alt: "gallery img4",
        className: "gallery-img-4"
    },
    {
        src: "/img/gallery5.jpg",
        alt: "gallery img5",
        className: "gallery-img-5"
    }
    ];

    return (
    <section className="gallery">
        {galleryImages.map((image, index) => (
        <img
            key={index}
            src={image.src}
            alt={image.alt}
            className={image.className}
        />
        ))}
    </section>
    );
}