import { useEffect } from 'react';

/**
 * useLazyLoading Hook
 *
 * Implements lazy loading for images with the cs-lazy class.
 * Uses IntersectionObserver to load images only when they're about to enter the viewport,
 * improving initial page load performance.
 *
 * **Validates: Requirements 5.7**
 *
 * @example
 * ```tsx
 * const ImageGallery = () => {
 *   useLazyLoading();
 *
 *   return (
 *     <img
 *       className="cs-lazy"
 *       src="/assets/img/null.png"
 *       data-src="/assets/img/actual-image.jpg"
 *       alt="Description"
 *       loading="lazy"
 *     />
 *   );
 * };
 * ```
 *
 * How it works:
 * 1. Images start with a placeholder src (e.g., null.png)
 * 2. Actual image URL is stored in data-src attribute
 * 3. When image is about to enter viewport, data-src is loaded into src
 * 4. cs-lazy class is removed after loading
 */
export const useLazyLoading = () => {
  useEffect(() => {
    // Select all images with cs-lazy class
    const lazyImages = document.querySelectorAll<HTMLImageElement>('img.cs-lazy');

    // If no lazy images found, exit early
    if (lazyImages.length === 0) {
      return;
    }

    // Configuration for IntersectionObserver
    const observerOptions: IntersectionObserverInit = {
      // Start loading images 50px before they enter viewport
      rootMargin: '50px 0px',
      threshold: 0.01, // Trigger as soon as any part is visible
    };

    // Callback when images intersect with viewport
    const imageObserverCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;

          if (src) {
            // Load the actual image
            img.src = src;

            // Optional: Handle srcset for responsive images
            const srcset = img.dataset.srcset;
            if (srcset) {
              img.srcset = srcset;
            }

            // Remove cs-lazy class after loading
            img.onload = () => {
              img.classList.remove('cs-lazy');
              img.classList.add('cs-loaded');
            };

            // Handle loading errors
            img.onerror = () => {
              img.classList.remove('cs-lazy');
              img.classList.add('cs-error');
              console.error(`Failed to load image: ${src}`);
            };

            // Stop observing this image
            observer.unobserve(img);
          }
        }
      });
    };

    // Graceful fallback for browsers that don't support IntersectionObserver
    // (e.g., older iOS Safari < 12.2, older Android WebView)
    if (!('IntersectionObserver' in window)) {
      lazyImages.forEach((img) => {
        const src = img.dataset.src;
        if (src) {
          img.src = src;
          const srcset = img.dataset.srcset;
          if (srcset) img.srcset = srcset;
          img.classList.remove('cs-lazy');
          img.classList.add('cs-loaded');
        }
      });
      return;
    }

    // Create observer instance
    const imageObserver = new IntersectionObserver(imageObserverCallback, observerOptions);

    // Observe all lazy images
    lazyImages.forEach((img) => imageObserver.observe(img));

    // Cleanup: disconnect observer when component unmounts
    return () => {
      imageObserver.disconnect();
    };
  }, []); // Empty dependency array - only run once on mount
};
