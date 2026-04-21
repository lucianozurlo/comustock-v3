import './App.css';
import { AppRouter } from './routes';

/**
 * App Component
 *
 * Root application component that provides the router configuration.
 * The AppRouter component wraps the entire application with React Router's RouterProvider.
 */
function App() {
  return <AppRouter />;
}

export default App;
