import { Link } from 'react-router-dom';

/**
 * RecursosSection Component
 *
 * Displays the Recursos section with content blocks for Fuentes, Íconos, and Elementos.
 * Used in the home page.
 *
 * **Validates: Requirements 1.1, 1.3, 1.4**
 */
export const RecursosSection: React.FC = () => {
  return (
    <section id="recursos" className="backlight-bottom">
      <div className="stg-row cs-section-title">
        <div className="stg-col-8 stg-offset-2">
          <div className="align-center">
            <h2 data-appear="fade-up" data-unload="fade-up">
              Recursos
            </h2>
            <p
              className="cs-large-text"
              data-appear="fade-up"
              data-delay="100"
              data-unload="fade-up"
            >
              Tenemos lo que necesitás para potenciar tu autogestión.
            </p>
          </div>
        </div>
      </div>

      <div
        className="cs-grid-3cols stg-normal-gap"
        data-stagger-appear="fade-up"
        data-stagger-delay="100"
        data-unload="fade-up"
      >
        {/* Fuentes */}
        <div id="fuentes" className="cs-masked-block cs-grid-more-masked">
          <div className="cs-block stg-aspect-square stg-vertical-space-between cs-masked-media">
            <h5>
              Fuentes<span className="cs-accent subline">_</span>
            </h5>
            <ul
              className="cs-buttons-list stg-xs-gap-recursos"
              data-stagger-appear="fade-up"
              data-stagger-delay="75"
            >
              <li>
                <Link to="/sections/recursos#pulso" className="button-medium">
                  <img src="/assets/img/home/recursos/fuentes/pulso.svg" alt="Fuente Pulso" />
                  <span className="upper-bold">Pulso</span>
                </Link>
              </li>
              <li>
                <Link to="/sections/recursos#roboto" className="button-medium">
                  <img src="/assets/img/home/recursos/fuentes/roboto.svg" alt="Fuente Roboto" />
                  <span className="upper-bold">Roboto</span>
                </Link>
              </li>
            </ul>
            <p>
              River y Boca. Fresco y Batata. Pulso y Roboto. Los clásicos más vigentes que nunca.
            </p>
          </div>
          <Link to="/sections/recursos#fuentes" className="cs-masked-content at-bottom-right">
            <span className="cs-square-button is-secondary">
              <span className="cs-icon cs-icon-asterisk"></span>
            </span>
          </Link>
        </div>

        {/* Íconos */}
        <div id="iconos" className="cs-masked-block cs-grid-more-masked">
          <div className="cs-block stg-aspect-square stg-vertical-space-between cs-masked-media">
            <h5>
              Íconos<span className="cs-accent subline">_</span>
            </h5>
            <ul
              className="cs-buttons-list stg-xs-gap-recursos"
              data-stagger-appear="fade-up"
              data-stagger-delay="75"
            >
              {Array.from({ length: 18 }, (_, i) => i + 1).map((n) => (
                <li key={n}>
                  <a href="#" className="xs">
                    <img src={`/assets/img/home/recursos/iconos/icono-${n}.svg`} alt="" />
                  </a>
                </li>
              ))}
            </ul>
            <p>A veces, la imagen vale más que mil palabras. El poder de síntesis.</p>
          </div>
          <Link to="/sections/recursos#iconos" className="cs-masked-content at-bottom-right">
            <span className="cs-square-button is-secondary">
              <span className="cs-icon cs-icon-plus"></span>
            </span>
          </Link>
        </div>

        {/* Elementos */}
        <div id="elementos" className="cs-masked-block cs-grid-more-masked">
          <div className="cs-block stg-aspect-square stg-vertical-space-between cs-masked-media">
            <h5>
              Elementos<span className="cs-accent subline">_</span>
            </h5>
            <ul
              className="cs-buttons-list stg-xs-gap-recursos"
              data-stagger-appear="fade-up"
              data-stagger-delay="75"
            >
              <li>
                <a href="#" className="s">
                  <img src="/assets/img/home/recursos/elementos/mapas.svg" alt="" />
                </a>
              </li>
              <li>
                <a href="#" className="s">
                  <img src="/assets/img/home/recursos/elementos/banderas.svg" alt="" />
                </a>
              </li>
              <li>
                <a href="#" className="s">
                  <img src="/assets/img/home/recursos/elementos/frames.svg" alt="" />
                </a>
              </li>
              <li>
                <a href="#" className="s">
                  <img src="/assets/img/home/recursos/elementos/fondos.svg" alt="" />
                </a>
              </li>
            </ul>
            <p>Materiales clave para diseño.</p>
          </div>
          <a href="#" className="cs-masked-content at-bottom-right">
            <span className="cs-square-button is-secondary">
              <span className="cs-icon cs-icon-arrow-right"></span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};
