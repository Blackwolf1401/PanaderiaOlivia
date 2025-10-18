export default function CardCategory({ className, name, linkText }) {
    return (
    <div className={`card-category ${className}`}>
        <p>{name}</p>
        <span>{linkText}</span>
    </div>
    );
}