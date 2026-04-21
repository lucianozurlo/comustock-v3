import { useEffect } from 'react';

/**
 * useScrollAnimations Hook
 *
 * Replicates the original site's scroll animation system from main.js.
 *
 * The CSS (style.css) works as follows:
 *   [data-appear*='fade-'], [data-appear*='zoom-'] { opacity: 0; transform: ... }
 *   [data-appear*='fade-'].in-view, [data-appear*='zoom-'].in-view { opacity: 1; transform: none }
 *
 * This hook uses IntersectionObserver to add 'in-view' when elements enter
 * the viewport (triggering the CSS transition), then removes data-appear
 * after the transition completes so elements stay visible permanently.
 *
 * MutationObserver is used to handle elements injected by HtmlPage/BrandPage.
 *
 * @param deps - Pass [location.pathname] to re-run on route change
 */
export const useScrollAnimations = (deps: unknown[] = []) => {
  useEffect(() => {
    const TRANSITION_DURATION = 600; // ms — matches --stea-duration: 0.5s + buffer

    const animateElement = (el: HTMLElement) => {
      // Already processed
      if (el.dataset.animInit) return;
      el.dataset.animInit = '1';

      const delay = parseInt(el.dataset.delay || '0', 10);

      const reveal = () => {
        setTimeout(() => {
          el.classList.add('in-view');
          // After transition completes, remove data-appear so element
          // stays visible even if it scrolls out of view
          setTimeout(() => {
            el.removeAttribute('data-appear');
            el.removeAttribute('data-unload');
            el.classList.remove('in-view');
            delete el.dataset.animInit;
          }, TRANSITION_DURATION);
        }, delay);
      };

      if (!('IntersectionObserver' in window)) {
        reveal();
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            observer.unobserve(el);
            reveal();
          });
        },
        { threshold: 0, rootMargin: '0px 0px -20px 0px' }
      );

      observer.observe(el);
    };

    // Process elements already in the DOM
    document.querySelectorAll<HTMLElement>('[data-appear]').forEach(animateElement);

    // Watch for elements added dynamically by HtmlPage / BrandPage
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          const el = node as HTMLElement;
          if (el.hasAttribute?.('data-appear')) animateElement(el);
          el.querySelectorAll?.<HTMLElement>('[data-appear]').forEach(animateElement);
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
