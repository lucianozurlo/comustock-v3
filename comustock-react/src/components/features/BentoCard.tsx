import { Link } from 'react-router-dom';

/**
 * BentoCard Component
 *
 * Card component for the bento grid layout with lazy-loaded background images.
 * Used in the Templates section to display different template categories.
 *
 * **Validates: Requirements 1.1, 1.4, 3.2, 5.7, 8.2**
 *
 * @component
 * @example
 * ```tsx
 * <BentoCard
 *   title="Presentaciones"
 *   subtitle="Tus ideas en primer plano. Templates modernos, con identidad y estilo."
 *   href="/sections/templates#presentaciones"
 *   imageSrc="/assets/img/home/templates/presentaciones.jpg"
 *   size="large"
 *   icon="presentation"
 *   delay={0}
 * />
 * ```
 *
 * Features:
 * - Supports three size variants: small, medium, large
 * - Lazy-loaded background images using data-bg-src attribute
 * - Configurable entrance/exit animations with delay
 * - Icon display in bottom-right corner
 * - Responsive layout based on size variant
 * - CSS classes: cs-masked-block, cs-bento-hero-media, cs-masked-media
 *
 * @param {BentoCardProps} props - Component props
 * @param {string} props.title - Card title (required)
 * @param {string} [props.subtitle] - Card subtitle/description (optional)
 * @param {string} props.href - Link destination URL
 * @param {string} props.imageSrc - Path to background image
 * @param {'small' | 'medium' | 'large'} props.size - Card size variant
 * @param {string} props.icon - Icon class name (e.g., "presentation", "email", "post", "sign")
 * @param {number} [props.delay=0] - Animation delay in milliseconds
 *
 * @returns {JSX.Element} Bento card with lazy-loaded image and animations
 */

export interface BentoCardData {
  title: string;
  subtitle?: string;
  href: string;
  imageSrc: string;
  size: 'small' | 'medium' | 'large';
  icon: string;
  delay?: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BentoCardProps extends BentoCardData {}

export const BentoCard: React.FC<BentoCardProps> = ({
  title,
  subtitle,
  href,
  imageSrc,
  size,
  icon,
  delay = 0,
}) => {
  // Determine heading level based on size
  const HeadingTag = size === 'large' ? 'h3' : 'h4';

  return (
    <Link
      to={href}
      className={`is-${size} cs-masked-block`}
      data-appear={size === 'large' ? 'fade-right' : 'fade-left'}
      data-delay={delay}
      data-unload={size === 'large' ? 'fade-left' : 'fade-right'}
      aria-label={`Navigate to ${title}`}
    >
      <div
        className="cs-bento-hero-media cs-masked-media"
        data-bg-src={imageSrc}
        style={{ backgroundImage: `url(${imageSrc})` }}
      >
        <HeadingTag className="cs-page-title">
          {title}
          <span className="cs-accent subline">_</span>
        </HeadingTag>
        {subtitle && <p className="cs-highlight">{subtitle}</p>}
      </div>
      <div className="cs-masked-content at-bottom-right">
        <div className="cs-square-button is-secondary">
          <span className={`cs-icon cs-icon-${icon}`}></span>
        </div>
      </div>
    </Link>
  );
};
