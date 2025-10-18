export default function CardBlog({ image, alt, title, date, content }) {
    return (
    <div className="card-blog">
        <div className="container-img">
        <img src={image} alt={alt} />
        <div className="button-group-blog">
            <span><i className="fa-solid fa-magnifying-glass"></i></span>
            <span><i className="fa-solid fa-link"></i></span>
        </div>
        </div>
        <div className="content-blog">
        <h3>{title}</h3>
        <span>{date}</span>
        <p>{content}</p>
        <div className="btn-read-more">Leer Más</div>
        </div>
    </div>
    );
}