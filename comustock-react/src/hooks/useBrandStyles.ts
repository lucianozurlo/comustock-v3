import { useEffect } from 'react';

/**
 * useBrandStyles Hook
 *
 * Dynamically loads brand-specific CSS from /assets/css/brands/{brandName}.css
 * and injects it into the document head. Cleans up on unmount to prevent
 * style conflicts when navigating between brand pages.
 *
 * **Validates: Requirements 2.4, 5.1**
 *
 * @param brandName - The brand slug (e.g., 'personal', 'movil', 'fibra')
 *
 * @example
 * ```tsx
 * const BrandPage = ({ brandName }) => {
 *   useBrandStyles(brandName);
 *   return <div>...</div>;
 * };
 * ```
 */
export const useBrandStyles = (brandName: string): void => {
  useEffect(() => {
    if (!brandName) return;

    const linkId = `brand-${brandName}-styles`;

    // Avoid adding duplicate link elements
    if (document.getElementById(linkId)) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = `/assets/css/brands/${brandName}.css`;
    link.id = linkId;

    link.onerror = () => {
      // Gracefully handle missing CSS files — remove the broken link element
      const failedLink = document.getElementById(linkId);
      if (failedLink) {
        failedLink.remove();
      }
    };

    document.head.appendChild(link);

    return () => {
      const existingLink = document.getElementById(linkId);
      if (existingLink) {
        existingLink.remove();
      }
    };
  }, [brandName]);
};
