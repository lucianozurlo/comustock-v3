/**
 * PageLoader Component
 *
 * Full-page loading fallback used as the Suspense boundary fallback
 * while lazy-loaded route components are being fetched.
 *
 * Implements Requirement 8.1: code splitting with loading fallback.
 */
const PageLoader = () => {
  return (
    <div
      className="cs-page-loader"
      role="status"
      aria-label="Cargando página"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        width: '100%',
      }}
    >
      <div
        className="cs-page-loader-spinner"
        aria-hidden="true"
        style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(0, 0, 0, 0.1)',
          borderTopColor: 'var(--cs-color-primary, #0066cc)',
          borderRadius: '50%',
          animation: 'cs-spin 0.8s linear infinite',
        }}
      />
      <style>{`
        @keyframes cs-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
