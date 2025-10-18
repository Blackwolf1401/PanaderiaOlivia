export default function CardFeature({ icon, title, description }) {
    return (
    <div className="card-feature">
        <i className={icon}></i>
        <div className="feature-content">
        <span>{title}</span>
        <p>{description}</p>
        </div>
    </div>
    );
}