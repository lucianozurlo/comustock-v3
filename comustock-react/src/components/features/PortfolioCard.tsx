import { Link } from 'react-router-dom';

/**
 * PortfolioCard Component
 *
 * Card component for the Audiovisuales section with a masked block structure,
 * lazy-loaded image, title, description, and a link overlay.
 *
 * **Validates: Requirements 1.1, 1.4, 3.2, 5.7, 8.2**
 *
 * @component
 * @example
 * ```tsx
 * <PortfolioCard
 *   title="Publicidad"
 *   description="Lanzamientos, cartelería, banners, imágenes."
 *   imageSrc="/assets/img/home/audiovisuales/publicidad.jpg"
 *   href="/sections/audiovisuales#publicidad"
 *   aspectRatio="2 / 3"
 *   delay={0}
 * />
 * ```
 *
 * Features:
 * - Masked block structure using cs-masked-block and cs-grid-more-masked classes
 * - Lazy-loaded image using cs-lazy class and data-src attribute
 * - Custom aspect ratio for the image container
 * - Title with accent underscore and description in footer
 * - Link overlay positioned at bottom-right with plus icon
 * - data-delay attribute for animation timing on the inner block
 *
 * @param {PortfolioCardProps} props - Component props
 * @param {string} props.title - Card title (required)
 * @param {string} props.description - Card description text (required)
 * @param {string} props.imageSrc - Path to the lazy-loaded image
 * @param {string} props.href - Link destination URL
 * @param {string} [props.aspectRatio='2 / 3'] - CSS aspect-ratio value for the image container
 * @param {number} [props.delay] - Animation delay in milliseconds for the inner block (data-delay)
 *
 * @returns {JSX.Element} Portfolio card with masked structure, lazy image, and link overlay
 */

export interface PortfolioCardProps {
  title: string;
  description: string;
  imageSrc: string;
  href: string;
  aspectRatio?: string;
  delay?: number;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  title,
  description,
  imageSrc,
  href,
  aspectRatio = '2 / 3',
  delay,
}) => {
  return (
    <div className="cs-masked-block cs-grid-more-masked">
      <div
        className="cs-block cs-masked-media bg-brand cs-portfolio-card"
        data-delay={delay !== undefined ? delay : 3000}
      >
        <div className="cs-portfolio-card-image" style={{ aspectRatio }}>
          <img
            className="cs-lazy"
            src="/assets/img/null.png"
            data-src={imageSrc}
            alt={title}
            loading="lazy"
          />
        </div>
        <div className="cs-portfolio-card-footer">
          <div className="cs-portfolio-card-title">
            <h5>
              {title}
              <span className="cs-accent subline">_</span>
            </h5>
            <p>{description}</p>
          </div>
        </div>
      </div>
      <Link to={href} className="cs-masked-content at-bottom-right">
        <span className="cs-square-button is-secondary">
          <span className="cs-icon cs-icon-plus"></span>
        </span>
      </Link>
    </div>
  );
};
