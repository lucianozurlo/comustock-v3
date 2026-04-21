/**
 * HooksExample Component
 *
 * Demonstration component showing how to use all custom hooks together.
 * This component is for reference and testing purposes.
 *
 * @example
 * ```tsx
 * import { HooksExample } from '@/components/examples/HooksExample';
 *
 * <HooksExample />
 * ```
 */

import { useHashNavigation, useLazyLoading, useScrollAnimations } from '../../hooks';

export const HooksExample: React.FC = () => {
  // Enable scroll animations for all elements with data-appear
  useScrollAnimations();

  // Enable lazy loading for all images with cs-lazy class
  useLazyLoading();

  // Enable hash navigation with 80px offset for sticky header
  const { scrollToHash } = useHashNavigation(80);

  return (
    <div className="hooks-example">
      <h1>Custom Hooks Example</h1>

      {/* Navigation buttons */}
      <nav style={{ marginBottom: '2rem' }}>
        <button onClick={() => scrollToHash('#section1')}>Go to Section 1</button>
        <button onClick={() => scrollToHash('#section2')}>Go to Section 2</button>
        <button onClick={() => scrollToHash('#section3')}>Go to Section 3</button>
      </nav>

      {/* Section 1: Fade Up Animation */}
      <section
        id="section1"
        data-appear="fade-up"
        data-delay="100"
        style={{ minHeight: '100vh', padding: '2rem', marginBottom: '2rem', background: '#f0f0f0' }}
      >
        <h2>Section 1: Fade Up Animation</h2>
        <p>This section uses the useScrollAnimations hook with fade-up animation.</p>

        {/* Lazy loaded image */}
        <img
          className="cs-lazy"
          src="/assets/img/null.png"
          data-src="/assets/img/logo-comustock.svg"
          alt="ComuStock Logo"
          loading="lazy"
          style={{ maxWidth: '300px', marginTop: '1rem' }}
        />
      </section>

      {/* Section 2: Zoom In Animation */}
      <section
        id="section2"
        data-appear="zoom-in"
        data-delay="200"
        style={{ minHeight: '100vh', padding: '2rem', marginBottom: '2rem', background: '#e0e0e0' }}
      >
        <h2>Section 2: Zoom In Animation</h2>
        <p>This section uses the useScrollAnimations hook with zoom-in animation.</p>

        {/* Multiple lazy loaded images */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <img
            className="cs-lazy"
            src="/assets/img/null.png"
            data-src="/assets/img/ecosistema/personal/header.svg"
            alt="Personal"
            loading="lazy"
            style={{ maxWidth: '200px' }}
          />
          <img
            className="cs-lazy"
            src="/assets/img/null.png"
            data-src="/assets/img/ecosistema/flow/header.svg"
            alt="Flow"
            loading="lazy"
            style={{ maxWidth: '200px' }}
          />
        </div>
      </section>

      {/* Section 3: Fade Left Animation with Unload */}
      <section
        id="section3"
        data-appear="fade-left"
        data-unload="fade-right"
        data-delay="300"
        style={{ minHeight: '100vh', padding: '2rem', background: '#d0d0d0' }}
      >
        <h2>Section 3: Fade Left with Unload Animation</h2>
        <p>This section fades in from the left and fades out to the right when leaving viewport.</p>

        {/* Lazy loaded image with srcset */}
        <img
          className="cs-lazy"
          src="/assets/img/null.png"
          data-src="/assets/img/ecosistema/pay/header.svg"
          alt="Pay"
          loading="lazy"
          style={{ maxWidth: '300px', marginTop: '1rem' }}
        />
      </section>

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          padding: '1rem',
          background: '#333',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
        }}
      >
        ↑
      </button>
    </div>
  );
};
