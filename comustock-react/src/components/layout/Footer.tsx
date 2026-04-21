/**
 * Footer Component
 *
 * Matches the original HTML footer with contact form and footer line.
 * Located inside <main> as in the original HTML.
 */
const Footer = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement)?.value;
    if (message) {
      window.location.href = `mailto:?body=${encodeURIComponent(message)}`;
    }
  };

  return (
    <footer id="HacemosLaComuFacil">
      <div className="cs-footer-widgets">
        <div className="stg-container">
          <div className="stg-row">
            <div className="stg-col-4 stg-tp-col-6 stg-m-bottom-gap">
              <div className="cs-block stg-aspect-square stg-vertical-space-between">
                <a href="#" className="cs-grid-item-link"></a>
                <div>
                  <h4>
                    Comunicación Interna<span className="cs-accent subline">_</span>
                  </h4>
                  <p className="lead">¿Necesitás algo puntual? ¿Querés dejarnos tu opinión?</p>
                </div>
                <p>
                  El equipo de Comu Interna está lista para recibir cualquier duda o sugerencia.
                  <br />
                  Tu feedback es muy importante.
                </p>
              </div>
            </div>
            <div className="stg-col-7 stg-offset-1 stg-tp-col-6 flex-vc">
              <h3 className="cs-page-title m-align-left">Acá tenés tu espacio</h3>
              <p className="cs-highlight align-left tp-align-left">Dejanos tu mensaje.</p>
              <form
                id="contactMailtoForm"
                className="cs-contact-form is-short"
                noValidate
                onSubmit={handleSubmit}
              >
                <div className="cs-form-content cs-hero-form">
                  <div className="form-inputs">
                    <textarea id="message" name="message" placeholder="Tu mensaje" required />
                    <button id="sendMailtoBtn" type="submit">
                      Enviar comentario
                    </button>
                  </div>
                  <div className="cs-contact-form__response" aria-live="polite" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="cs-footer-line stg-container">
        <div className="align-center">Personal · 2026</div>
      </div>
    </footer>
  );
};

export default Footer;
