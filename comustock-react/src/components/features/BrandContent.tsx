import type { Brand } from '../../data/brands';

/**
 * BrandContent Component
 *
 * Renders the main content area for a brand page, including the brands
 * container structure that wraps all brand-specific sections.
 * Applies brand-specific CSS classes for styling.
 *
 * **Validates: Requirements 1.1, 1.4, 3.2**
 *
 * @param brand - The brand data object
 * @param children - Optional child sections to render inside the brands container
 */

interface BrandContentProps {
  brand: Brand;
  children?: React.ReactNode;
}

export const BrandContent: React.FC<BrandContentProps> = ({ brand, children }) => {
  return (
    <main id="cs-main">
      <div className="stg-container">
        <div className="brands-container">
          <div className="brands-content">
            {children ? (
              children
            ) : (
              <section className="brand-section">
                <div className="section-content">
                  <div className="stg-row cs-section-title">
                    <div className="stg-col-11 stg-m-col-12">
                      <h2 data-appear="fade-up" data-unload="fade-up">
                        {brand.displayName}
                      </h2>
                      <p
                        className="cs-large-text"
                        data-appear="fade-up"
                        data-unload="fade-up"
                        data-delay="100"
                      >
                        {brand.description}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BrandContent;
