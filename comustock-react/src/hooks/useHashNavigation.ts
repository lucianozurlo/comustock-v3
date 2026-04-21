import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * useHashNavigation Hook
 *
 * Handles smooth scrolling to hash anchors in the URL.
 * Automatically scrolls to the target element when the URL hash changes.
 *
 * **Validates: Requirements 5.1**
 *
 * @param offset - Offset in pixels from the top (useful for fixed headers, default: 0)
 * @param behavior - Scroll behavior: 'smooth' or 'auto' (default: 'smooth')
 *
 * @example
 * ```tsx
 * const TemplatesPage = () => {
 *   useHashNavigation(80); // 80px offset for sticky header
 *
 *   return (
 *     <div>
 *       <section id="presentaciones">...</section>
 *       <section id="e-mails">...</section>
 *     </div>
 *   );
 * };
 * ```
 *
 * Usage with links:
 * ```tsx
 * <Link to="/sections/templates#presentaciones">Presentaciones</Link>
 * ```
 */
export const useHashNavigation = (offset: number = 0, behavior: ScrollBehavior = 'smooth') => {
  const location = useLocation();

  useEffect(() => {
    // Function to scroll to element
    const scrollToElement = (hash: string) => {
      // Remove the # from hash
      const id = hash.replace('#', '');

      if (!id) {
        // No hash - scroll to top
        window.scrollTo({
          top: 0,
          behavior,
        });
        return;
      }

      // Find the target element
      const element = document.getElementById(id);

      if (element) {
        // Calculate position with offset
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        // Scroll to element
        window.scrollTo({
          top: offsetPosition,
          behavior,
        });

        // Update focus for accessibility
        element.focus({ preventScroll: true });

        // If element is not focusable, make it temporarily focusable
        if (!element.hasAttribute('tabindex')) {
          element.setAttribute('tabindex', '-1');
          element.addEventListener(
            'blur',
            () => {
              element.removeAttribute('tabindex');
            },
            { once: true }
          );
        }
      } else {
        console.warn(`Element with id "${id}" not found for hash navigation`);
      }
    };

    // Handle hash on location change
    if (location.hash) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        scrollToElement(location.hash);
      }, 100);
    } else {
      // No hash - scroll to top
      window.scrollTo({
        top: 0,
        behavior,
      });
    }
  }, [location, offset, behavior]);

  // Return a function to manually trigger hash navigation
  return {
    scrollToHash: (hash: string) => {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);

      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior,
        });
      }
    },
  };
};
