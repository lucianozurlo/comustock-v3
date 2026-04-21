import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/layout/Layout';
import PageLoader from './components/ui/PageLoader';

/**
 * Lazy-loaded page components for code splitting.
 * Each page is loaded on demand, reducing the initial bundle size.
 * Implements Requirement 8.1: code splitting for routes.
 */
const HomePage = lazy(() => import('./components/pages/HomePage'));
const BrandPage = lazy(() => import('./components/pages/BrandPage'));
const TemplatesPage = lazy(() => import('./components/pages/TemplatesPage'));
const AudiovisualesPage = lazy(() => import('./components/pages/AudiovisualesPage'));
const RecursosPage = lazy(() => import('./components/pages/RecursosPage'));
const ElementosPage = lazy(() => import('./components/pages/ElementosPage'));
const ToolkitsPage = lazy(() => import('./components/pages/ToolkitsPage'));
const DisenarPage = lazy(() => import('./components/pages/DisenarPage'));
const RedactarPage = lazy(() => import('./components/pages/RedactarPage'));
const MiFirmaPage = lazy(() => import('./components/pages/MiFirmaPage'));
const NotFoundPage = lazy(() => import('./components/pages/NotFoundPage'));

/**
 * Wraps a lazy component in a Suspense boundary with a page loader fallback.
 */
const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<PageLoader />}>{element}</Suspense>
);

/**
 * Router Configuration
 *
 * Defines the application's route structure using React Router v6's createBrowserRouter.
 * All page components are lazy-loaded for optimal performance (code splitting).
 *
 * Route Structure:
 * - / - Home page
 * - /brands/:brandName - Brand pages (personal, movil, fibra, flow, pay, tienda, smarthome, tech)
 * - /sections/templates - Templates section
 * - /sections/audiovisuales - Audiovisual resources section
 * - /sections/recursos - Resources section
 * - /sections/recursos/elementos - Elements sub-section
 * - /sections/toolkits - Toolkits section
 * - /sections/toolkits/disenar - Design toolkit sub-section
 * - /sections/toolkits/redactar - Writing toolkit sub-section
 * - /mi-firma - Signature generator page
 * - * - 404 Not Found page
 *
 * All routes are wrapped in a Layout component and protected by an ErrorBoundary.
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <Layout />
      </ErrorBoundary>
    ),
    errorElement: (
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <NotFoundPage />
        </Suspense>
      </ErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: withSuspense(<HomePage />),
      },
      {
        path: 'brands',
        children: [
          {
            // Dynamic route for all 8 brand pages:
            // personal, movil, fibra, flow, pay, tienda, smarthome, tech
            path: ':brandName',
            element: withSuspense(<BrandPage />),
          },
        ],
      },
      {
        path: 'sections',
        children: [
          {
            path: 'templates',
            element: withSuspense(<TemplatesPage />),
          },
          {
            path: 'audiovisuales',
            element: withSuspense(<AudiovisualesPage />),
          },
          {
            path: 'recursos',
            element: withSuspense(<RecursosPage />),
          },
          {
            path: 'recursos/elementos',
            element: withSuspense(<ElementosPage />),
          },
          {
            path: 'toolkits',
            element: withSuspense(<ToolkitsPage />),
          },
          {
            path: 'toolkits/disenar',
            element: withSuspense(<DisenarPage />),
          },
          {
            path: 'toolkits/redactar',
            element: withSuspense(<RedactarPage />),
          },
        ],
      },
      {
        path: 'mi-firma',
        element: withSuspense(<MiFirmaPage />),
      },
      {
        path: '*',
        element: withSuspense(<NotFoundPage />),
      },
    ],
  },
]);

/**
 * AppRouter Component
 *
 * Provides the configured router to the application.
 * This component should be rendered at the root of the application.
 */
export const AppRouter = () => <RouterProvider router={router} />;

export default router;
