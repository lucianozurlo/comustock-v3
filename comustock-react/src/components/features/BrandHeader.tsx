import type { Brand } from '../../data/brands';

/**
 * BrandHeader Component
 *
 * Displays the brand hero section with the header SVG image, brand name,
 * and description. Mirrors the HTML brand page banner structure with
 * data-appear animations.
 *
 * **Validates: Requirements 1.1, 1.4, 3.2, 5.7**
 *
 * @param brand - The brand data object
 */

interface BrandHeaderProps {
  brand: Brand;
}

export const BrandHeader: React.FC<BrandHeaderProps> = ({ brand }) => {
  return (
    <div id="banner" className="stg-container">
      <div className="brand-top backlight-top" data-appear="fade-up" data-unload="zoom-out">
        <section id="banner-section" className="divider-bottom">
          <div className="cs-hero-block cs-type">
            <div className="cs-hero-media-wrap" data-appear="fade-up" data-unload="zoom-out">
              <img src={brand.headerImage} alt={brand.displayName} className="cs-lazy" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BrandHeader;
