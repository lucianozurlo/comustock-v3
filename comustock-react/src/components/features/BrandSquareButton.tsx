import { Link } from 'react-router-dom';

/**
 * BrandSquareButton Component
 *
 * Square button with brand logo that includes zoom animations.
 * Used in the Ecosistema section of the home page to navigate to brand pages.
 *
 * **Validates: Requirements 1.1, 1.4, 1.5, 4.2, 5.7**
 *
 * @component
 * @example
 * ```tsx
 * <BrandSquareButton
 *   brandName="personal"
 *   brandSlug="personal"
 *   logoIso={<svg>...</svg>}
 *   logoImg={<svg>...</svg>}
 *   delay={200}
 * />
 * ```
 *
 * Features:
 * - Links to brand page route (/brands/{brandSlug})
 * - Displays brand logo with isotype (logoIso) and full logo (logoImg)
 * - Applies brand-specific CSS class for styling
 * - Zoom-in entrance animation with configurable delay
 * - Zoom-out exit animation on page unload
 * - CSS classes: cs-square-button, logo-wrapper with brand class
 *
 * @param {BrandSquareButtonProps} props - Component props
 * @param {string} props.brandName - Display name of the brand (e.g., "Personal")
 * @param {string} props.brandSlug - URL slug for the brand (e.g., "personal")
 * @param {React.ReactNode} props.logoIso - SVG element for the brand isotype
 * @param {React.ReactNode} props.logoImg - SVG element for the full brand logo
 * @param {number} [props.delay=0] - Animation delay in milliseconds
 *
 * @returns {JSX.Element} Brand square button with animations
 */

export interface BrandSquareButtonProps {
  brandName: string;
  brandSlug: string;
  logoIso: React.ReactNode;
  logoImg: React.ReactNode;
  delay?: number;
}

export const BrandSquareButton: React.FC<BrandSquareButtonProps> = ({
  brandName,
  brandSlug,
  logoIso,
  logoImg,
  delay = 0,
}) => {
  return (
    <Link
      to={`/brands/${brandSlug}`}
      className="cs-square-button"
      data-appear="zoom-in"
      data-delay={delay}
      data-unload="zoom-out"
      aria-label={`Navigate to ${brandName} brand page`}
    >
      <div className={`logo-wrapper ${brandSlug}`}>
        {/* logoIso is an SVG — rendered directly with className applied via the SVG element */}
        <span className="logo-iso">{logoIso}</span>
        <div className="logo-mask">
          <span className="logo-img">{logoImg}</span>
        </div>
      </div>
    </Link>
  );
};
