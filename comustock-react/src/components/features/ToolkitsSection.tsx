import { Link } from 'react-router-dom';

/**
 * ToolkitsSection Component
 *
 * Displays the Toolkits section with a detailed list of feature cards.
 * Used in the home page.
 *
 * **Validates: Requirements 1.1, 1.3, 1.4**
 */

const toolkitItems = [
  {
    title: 'Contá tu historia',
    description:
      'Un consejo prático no se le niega a nadie. ¿Ya te diste cuenta del error? Excelente. ¿Todavía no? Volvé a leer. De la nada te tiramos un tip. Tenemos muchos más y los compartimos acá.',
    imageSrc: '/assets/img/home/toolkits/redactar.jpg',
    imageAlt: 'Cómo redactar',
    href: '/sections/toolkits/redactar',
  },
  {
    title: 'Nociones de diseño',
    description:
      '¿El diseño gráfico no es lo tuyo? Cero drama. Tenemos todos los tips para crear esa placa de urgencia. Y todo lo que NO tenés que hacer.',
    imageSrc: '/assets/img/home/toolkits/diseniar.jpg',
    imageAlt: 'Cómo diseñar',
    href: '/sections/toolkits/disenar',
  },
];

export const ToolkitsSection: React.FC = () => {
  return (
    <section id="toolkits">
      <div className="stg-row cs-section-title">
        <div className="stg-col-8 stg-offset-2">
          <div className="align-center">
            <h2 data-appear="fade-up" data-unload="fade-up">
              Toolkits
            </h2>
            <p
              className="cs-large-text"
              data-appear="fade-up"
              data-unload="fade-up"
              data-delay="100"
            >
              El síndrome del cursor titilando no va más. Materializá tus ideas de la forma más
              simple y clara posible. Tenemos algunos &ldquo;trucos&rdquo; para eso.
            </p>
          </div>
        </div>
      </div>

      <div
        className="cs-detailed-list-wrap"
        data-appear="fade-up"
        data-unload="fade-up"
        data-delay="200"
      >
        <ul className="cs-detailed-list">
          {toolkitItems.map((item) => (
            <li
              key={item.href}
              className="cs-detailed-list-item"
              data-appear="fade-up"
              data-unload="fade-up"
              data-delay="100"
            >
              <div className="cs-detailed-list-preview">
                <img src={item.imageSrc} alt={item.imageAlt} loading="lazy" />
              </div>
              <div className="cs-detailed-list-title">
                <h4>
                  {item.title}
                  <span className="cs-accent subline">_</span>
                </h4>
              </div>
              <div className="cs-detailed-list-description">
                <p>{item.description}</p>
              </div>
              <div className="cs-detailed-list-button">
                <span className="cs-icon cs-icon-arrow-right"></span>
              </div>
              <Link to={item.href} aria-label={`Navigate to ${item.title}`}></Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
