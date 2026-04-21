import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useLazyLoading, useMaskedBlocks, useScrollAnimations } from '../../hooks';
import Footer from './Footer';
import Header from './Header';

/**
 * Layout Component
 *
 * Provides the shared shell: Header + main#cs-main + Footer + cs-backlight.
 *
 * Page components (HtmlPage, BrandPage, HomePage) manage their own
 * stg-container wrapping to match the original HTML structure exactly.
 */
const Layout = () => {
  const location = useLocation();

  useScrollAnimations([location.pathname]);
  useMaskedBlocks([location.pathname]);
  useLazyLoading();

  // body.id and body.class are managed by each page component.
  // Layout only ensures is-loaded is present.
  useEffect(() => {
    document.body.classList.add('is-loaded');
    return () => {
      document.body.classList.remove('is-loaded');
    };
  }, []);

  // Scroll to top on route change (unless there's a hash)
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <>
      <a
        href="#cs-main"
        className="cs-skip-link"
        style={{
          position: 'absolute',
          top: '-40px',
          left: '0',
          background: 'var(--cs-color-primary, #0066cc)',
          color: '#fff',
          padding: '8px 16px',
          zIndex: 9999,
          textDecoration: 'none',
          fontWeight: 'bold',
          transition: 'top 0.2s',
        }}
        onFocus={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.top = '0';
        }}
        onBlur={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.top = '-40px';
        }}
      >
        Saltar al contenido principal
      </a>

      <Header />

      <main id="cs-main" role="main" tabIndex={-1}>
        <Outlet />
        <Footer />
      </main>

      <div className="cs-backlight" />
    </>
  );
};

export default Layout;
