/**
 * CSSTest Component
 *
 * Simple component to verify CSS imports are working correctly.
 * Tests CSS variables, custom properties, and basic styling.
 */

const CSSTest = () => {
  // Test if CSS variables are accessible
  const testCSSVariables = () => {
    const root = document.documentElement;
    const bodyBg = getComputedStyle(root).getPropertyValue('--cs-s-body-bg').trim();
    const heading = getComputedStyle(root).getPropertyValue('--cs-s-heading').trim();
    const accent = getComputedStyle(root).getPropertyValue('--cs-s-accent').trim();

    console.log('CSS Variables Test:');
    console.log('--cs-s-body-bg:', bodyBg || 'NOT FOUND');
    console.log('--cs-s-heading:', heading || 'NOT FOUND');
    console.log('--cs-s-accent:', accent || 'NOT FOUND');

    return { bodyBg, heading, accent };
  };

  // Run test on component mount
  React.useEffect(() => {
    testCSSVariables();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>CSS Import Test</h1>

      <section style={{ marginTop: '2rem' }}>
        <h2>CSS Variables Test</h2>
        <p>If CSS variables are loaded, the boxes below should have custom colors:</p>

        {/* Test CSS variables from config.css */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'var(--cs-s-body-bg, red)',
              border: '2px solid var(--cs-s-border, black)',
              minWidth: '150px',
            }}
          >
            <strong>Body BG</strong>
            <br />
            <small>Should be white (#fff)</small>
          </div>
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'var(--cs-s-container-bg, red)',
              border: '2px solid var(--cs-s-border, black)',
              minWidth: '150px',
            }}
          >
            <strong>Container BG</strong>
            <br />
            <small>Should be light gray (#fafafa)</small>
          </div>
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'var(--cs-s-accent, red)',
              color: 'white',
              border: '2px solid var(--cs-s-border, black)',
              minWidth: '150px',
            }}
          >
            <strong>Accent Color</strong>
            <br />
            <small>Should be pink (#d00086)</small>
          </div>
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>CSS Classes Test</h2>
        <p>Testing if CSS classes from the imported files are working:</p>

        {/* Test basic HTML elements with classes from the CSS files */}
        <div
          className="cs-block"
          style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ccc' }}
        >
          <p className="cs-text">This paragraph should have styles from the CSS files.</p>
          <button className="cs-button">Test Button</button>
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Responsive Test</h2>
        <p>Resize the browser window to test responsive styles.</p>
        <div className="cs-grid" style={{ marginTop: '1rem' }}>
          <div style={{ padding: '1rem', border: '1px solid #ccc' }}>Grid Item 1</div>
          <div style={{ padding: '1rem', border: '1px solid #ccc' }}>Grid Item 2</div>
          <div style={{ padding: '1rem', border: '1px solid #ccc' }}>Grid Item 3</div>
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Font Test</h2>
        <p style={{ fontFamily: 'Pulso, sans-serif', fontSize: '1.5rem', fontWeight: 'bold' }}>
          This text should use the Pulso font family if fonts are loaded correctly.
        </p>
      </section>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f0f0' }}>
        <strong>Check browser console for CSS variable values</strong>
      </div>
    </div>
  );
};

// Add React import for useEffect
import React from 'react';

export default CSSTest;
