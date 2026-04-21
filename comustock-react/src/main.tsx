import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AppProvider } from './contexts/AppContext';
import './index.css';
import reportWebVitals from './utils/reportWebVitals';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
);

// Report Core Web Vitals. In development, metrics are logged to the console.
// In production, pass a callback to send metrics to an analytics endpoint:
// reportWebVitals((metric) => sendToAnalytics(metric));
reportWebVitals();
