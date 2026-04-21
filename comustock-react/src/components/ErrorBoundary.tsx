import type { ReactNode } from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * ErrorBoundary Component
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing.
 * Used at the route level to handle rendering errors gracefully.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details for debugging
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    // In production, this could be sent to an error logging service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-page">
          <h1>Algo salió mal</h1>
          <p>Lo sentimos, ha ocurrido un error inesperado.</p>
          <p>Por favor, recarga la página o vuelve al inicio.</p>
          <div style={{ marginTop: '20px' }}>
            <Link to="/" style={{ marginRight: '10px' }}>
              Volver al inicio
            </Link>
            <button onClick={() => window.location.reload()}>Recargar página</button>
          </div>
          {import.meta.env.DEV && this.state.error && (
            <details style={{ marginTop: '20px', textAlign: 'left' }}>
              <summary>Error details (development only)</summary>
              <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {this.state.error.toString()}
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
