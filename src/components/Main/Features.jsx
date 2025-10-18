import CardFeature from '../UI/CardFeature';

export default function Features() {
    const features = [
    {
        icon: 'fa-solid fa-plane-up',
        title: 'Envio gratis a todo Chile',
        description: 'todos los productos'
    },
    {
        icon: 'fa-solid fa-wallet',
        title: 'Contra reembolso',
        description: 'Te devolvemos el 85% de tu compra'
    },
    {
        icon: 'fa-solid fa-percent',
        title: 'Ofertas Especiales',
        description: 'Hasta 60% en panaderia y pasteleria'
    },
    {
        icon: 'fa-solid fa-headset',
        title: 'Servicio al cliente 24/7',
        description: 'Contáctanos al 123-456-7890'
    }
    ];

    return (
    <section className="container container-features">
        {features.map((feature, index) => (
        <CardFeature
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
        />
        ))}
    </section>
    );
}