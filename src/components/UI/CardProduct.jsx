export default function CardProduct({
    image,
    alt,
    discount,
    name,
    stars,
    currentPrice,
    originalPrice
    }) {
    const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
        stars.push(<i key={i} className="fa-solid fa-star"></i>);
        } else if (i - 0.5 === rating) {
        stars.push(<i key={i} className="fa-regular fa-star-half-stroke"></i>);
        } else {
        stars.push(<i key={i} className="fa-regular fa-star"></i>);
        }
    }
    return stars;
    };

    return (
    <div className="card-product">
        <div className="container-img">
        <img src={image} alt={alt} />
        <span className="discount">{discount}</span>
        <div className="button-group">
            <span><i className="fa-regular fa-eye"></i></span>
            <span><i className="fa-regular fa-heart"></i></span>
            <span><i className="fa-solid fa-code-compare"></i></span>
        </div>
        </div>
        <div className="content-card-product">
        <div className="stars">
            {renderStars(stars)}
        </div>
        <h3>{name}</h3>
        <div className="price-cart">
            <p className="price">${currentPrice} <span>${originalPrice}</span></p>
            <span className="add-cart"><i className="fa-solid fa-basket-shopping"></i></span>
        </div>
        </div>
    </div>
    );
}