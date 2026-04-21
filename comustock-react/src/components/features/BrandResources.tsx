import type { Brand, BrandResource } from '../../data/brands';

/**
 * BrandResources Component
 *
 * Renders a downloadable resources grid for a brand page.
 * Displays resource cards with preview images and download links.
 * Supports different resource types: logo, guideline, asset.
 *
 * **Validates: Requirements 1.1, 1.4, 3.2**
 *
 * @param brand - The brand data object containing resources array
 */

interface BrandResourceCardProps {
  resource: BrandResource;
  brandSlug: string;
  index: number;
}

const resourceTypeLabel: Record<BrandResource['type'], string> = {
  logo: 'Logos',
  guideline: 'Lineamientos',
  asset: 'Assets',
};

const BrandResourceCard: React.FC<BrandResourceCardProps> = ({ resource, index }) => {
  return (
    <div
      className="cs-masked-block cs-grid-more-masked"
      data-appear="fade-up"
      data-delay={index * 100}
      data-unload="fade-up"
    >
      <div
        className={`cs-block stg-aspect-square stg-vertical-space-between cs-masked-media bg-brand min-scale`}
        data-delay="3000"
      >
        {resource.previewUrl ? (
          <img
            className="cs-lazy"
            src="/assets/img/null.png"
            data-src={resource.previewUrl}
            alt={resource.title}
            loading="lazy"
          />
        ) : (
          <div className={`resource-type-placeholder resource-type-${resource.type}`}>
            <span
              className={`cs-icon cs-icon-${resource.type === 'logo' ? 'comustock' : 'plus'}`}
            ></span>
          </div>
        )}
      </div>
      <div className="cs-masked-content at-bottom-right">
        <a
          href={resource.downloadUrl}
          className="cs-square-button is-secondary"
          aria-label={`Descargar ${resource.title}`}
          download
        >
          <span className="cs-icon cs-icon-comustock"></span>
        </a>
      </div>
      <div className="resource-card-info">
        <span className="resource-type-badge">{resourceTypeLabel[resource.type]}</span>
        <h5>{resource.title}</h5>
        {resource.description && <p>{resource.description}</p>}
      </div>
    </div>
  );
};

interface BrandResourcesProps {
  brand: Brand;
}

export const BrandResources: React.FC<BrandResourcesProps> = ({ brand }) => {
  if (!brand.resources || brand.resources.length === 0) {
    return null;
  }

  return (
    <section id="recursos" className="brand-section">
      <div className="section-content">
        <div className="stg-row cs-section-title">
          <div className="stg-col-11 stg-m-col-12">
            <h2 data-appear="fade-up" data-unload="fade-up">
              Recursos
            </h2>
            <div
              className="cs-grid-4cols cs-tp-grid-2cols cs-m-grid-2cols stg-m-small-gap download-square"
              data-stagger-appear="fade-up"
              data-delay="100"
              data-stagger-delay="100"
              data-unload="fade-up"
            >
              {brand.resources.map((resource, index) => (
                <BrandResourceCard
                  key={`${resource.type}-${index}`}
                  resource={resource}
                  brandSlug={brand.slug}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandResources;
