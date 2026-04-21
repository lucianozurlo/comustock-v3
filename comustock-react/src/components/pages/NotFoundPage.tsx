import { Link } from 'react-router-dom';

/**
 * NotFoundPage Component
 *
 * 404 error page displayed when a route is not found.
 * Provides a link back to the home page.
 */
const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
};

export default NotFoundPage;
