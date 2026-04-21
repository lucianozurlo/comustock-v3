import { PortfolioCard } from './PortfolioCard';

/**
 * AudiovisualesSection Component
 *
 * Displays the Audiovisuales section with a grid of PortfolioCard components.
 * Used in the home page.
 *
 * **Validates: Requirements 1.1, 1.3, 1.4**
 */

const audiovisualesCards = [
  {
    title: 'Publicidad',
    description: 'Lanzamientos, cartelería, banners, imágenes.',
    imageSrc: '/assets/img/home/audiovisuales/publicidad.jpg',
    href: '/sections/audiovisuales#publicidad',
    aspectRatio: '2 / 3',
    delay: 3000,
  },
  {
    title: 'Imágenes',
    description: 'Siempre distintas. Siempre originales. Siempre únicas.',
    imageSrc: '/assets/img/home/audiovisuales/imagenes.jpg',
    href: '/sections/audiovisuales#imagenes',
    aspectRatio: '2 / 3',
    delay: 3000,
  },
  {
    title: 'Cartelera interna',
    description: 'Lo que pasa en Personal, está acá.',
    imageSrc: '/assets/img/home/audiovisuales/carteleras.jpg',
    href: '/sections/audiovisuales#cartelera-interna',
    aspectRatio: '2 / 3',
    delay: 3000,
  },
];

export const AudiovisualesSection: React.FC = () => {
  return (
    <section id="audiovisuales" className="backlight-top backlight-bottom">
      <div className="stg-row cs-section-title">
        <div className="stg-col-8 stg-offset-2 stg-tp-col-10 stg-tp-offset-1">
          <div
            className="align-center"
            data-stagger-appear="fade-up"
            data-stagger-unload="fade-up"
            data-stagger-delay="100"
          >
            <h2>Audiovisuales</h2>
            <p className="cs-large-text">Nos renovamos. Difundilo. Compartilo.</p>
          </div>
        </div>
      </div>

      <div
        className="cs-grid-3cols cs-tp-grid-2cols cs-tp-centered-last-item stg-normal-gap cs-parallax-media"
        data-stagger-appear="fade-up"
        data-threshold="0.5"
        data-stagger-delay="150"
        data-stagger-unload="fade-up"
      >
        {audiovisualesCards.map((card) => (
          <PortfolioCard key={card.href} {...card} />
        ))}
      </div>
    </section>
  );
};
