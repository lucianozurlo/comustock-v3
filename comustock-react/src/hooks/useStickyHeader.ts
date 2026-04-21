import { useEffect, useState } from 'react';
import { useAppContext } from '../contexts/AppContext';

/**
 * useStickyHeader Hook
 *
 * Tracks scroll position and updates sticky header state in the global AppContext.
 * Automatically updates the isHeaderSticky state when user scrolls past the threshold.
 *
 * **Validates: Requirements 5.1, 8.2**
 *
 * @param threshold - Scroll position in pixels at which header becomes sticky (default: 100)
 *
 * @returns Object containing current scroll position and sticky state
 *
 * @example
 * ```tsx
 * const Header = () => {
 *   const { scrollPosition, isSticky } = useStickyHeader(100);
 *
 *   return (
 *     <header className={isSticky ? 'is-sticky is-frosted' : ''}>
 *       <nav>...</nav>
 *     </header>
 *   );
 * };
 * ```
 */
export const useStickyHeader = (threshold: number = 100) => {
  const { state, actions } = useAppContext();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    // Throttle scroll events for better performance
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const position = window.scrollY || window.pageYOffset;
          const sticky = position > threshold;

          // Update local state
          setScrollPosition(position);
          setIsSticky(sticky);

          // Update global context
          actions.updateScrollPosition(position);

          ticking = false;
        });

        ticking = true;
      }
    };

    // Initial check on mount
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup: remove event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold, actions]);

  return {
    scrollPosition,
    isSticky,
    // Also expose global state for convenience
    globalScrollPosition: state.scrollPosition,
    globalIsSticky: state.isHeaderSticky,
  };
};
