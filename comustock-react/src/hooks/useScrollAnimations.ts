import { useEffect } from 'react';

/**
 * useScrollAnimations Hook
 *
 * The original CSS hides [data-appear] elements with opacity:0.
 * This hook removes data-appear from elements as they appear in the DOM,
 * using MutationObserver to catch lazy-loaded components.
 *
 * @param deps - Pass [location.pathname] to re-run on route change
 */
export const useScrollAnimations = (deps: unknown[] = []) => {
  useEffect(() => {
    const removeAppear = (el: HTMLElement) => {
      el.removeAttribute('data-appear');
      el.removeAttribute('data-unload');
    };

    // Process any already-present elements
    document.querySelectorAll<HTMLElement>('[data-appear]').forEach(removeAppear);

    // Watch for new elements added by lazy-loaded components
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          const el = node as HTMLElement;
          // Process the node itself
          if (el.hasAttribute?.('data-appear')) removeAppear(el);
          // Process all descendants
          el.querySelectorAll?.<HTMLElement>('[data-appear]').forEach(removeAppear);
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
