import type { BentoCardData } from './BentoCard';
import { BentoGrid } from './BentoGrid';

/**
 * TemplatesSection Component
 *
 * Displays the Templates section with a BentoGrid of template categories.
 * Used in the home page.
 *
 * **Validates: Requirements 1.1, 1.3, 1.4**
 */

const templateCards: BentoCardData[] = [
  {
    title: 'Presentaciones',
    subtitle: 'Tus ideas en primer plano.\nTemplates modernos, con identidad y estilo.',
    href: '/sections/templates#presentaciones',
    imageSrc: '/assets/img/home/templates/presentaciones.jpg',
    size: 'large',
    icon: 'presentation',
    delay: 0,
  },
  {
    title: 'E-mails',
    href: '/sections/templates#e-mails',
    imageSrc: '/assets/img/home/templates/e-mails.jpg',
    size: 'small',
    icon: 'email',
    delay: 300,
  },
  {
    title: 'Viva Engage',
    href: '/sections/templates#vivaengage',
    imageSrc: '/assets/img/home/templates/viva-engage.jpg',
    size: 'small',
    icon: 'post',
    delay: 300,
  },
  {
    title: 'Tu firma de e-mail',
    subtitle: 'Mensajes con un nuevo sello.\nTu firma, cada vez más Personal.',
    href: '/mi-firma',
    imageSrc: '/assets/img/home/templates/tufirma.jpg',
    size: 'medium',
    icon: 'sign',
    delay: 300,
  },
];

export const TemplatesSection: React.FC = () => {
  return (
    <section id="templates">
      <div className="stg-row cs-section-title">
        <div className="stg-col-8 stg-offset-2">
          <div className="align-center">
            <h2 data-appear="fade-up" data-unload="fade-up">
              Templates
            </h2>
            <p
              className="cs-large-text"
              data-appear="fade-up"
              data-unload="fade-up"
              data-delay="100"
            >
              Tu Marca. Nuestra Marca.
              <br />
              Ideas, recursos, herramientas. Todo para comunicar con Personal(idad).
            </p>
          </div>
        </div>
      </div>

      <div className="cs-hero-block cs-templates">
        <BentoGrid cards={templateCards} />
      </div>
    </section>
  );
};
