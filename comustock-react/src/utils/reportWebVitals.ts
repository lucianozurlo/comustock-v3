/**
 * Performance monitoring utility using web-vitals.
 *
 * Tracks Core Web Vitals metrics:
 * - CLS  (Cumulative Layout Shift)
 * - INP  (Interaction to Next Paint) — replaces FID in web-vitals v3+
 * - FCP  (First Contentful Paint)
 * - LCP  (Largest Contentful Paint)
 * - TTFB (Time to First Byte)
 *
 * In development mode, metrics are logged to the console.
 * In production, an optional callback can be provided to send metrics
 * to an analytics endpoint.
 */

import type { Metric } from 'web-vitals';

export type ReportHandler = (metric: Metric) => void;

/**
 * Reports Core Web Vitals metrics.
 *
 * @param onPerfEntry - Optional callback invoked with each metric.
 *   In development, metrics are always logged to the console regardless
 *   of whether a callback is provided.
 */
const reportWebVitals = (onPerfEntry?: ReportHandler): void => {
  const isDev = import.meta.env.DEV;

  // Combine dev console logging with any provided callback
  const handler: ReportHandler = (metric: Metric) => {
    if (isDev) {
      console.log(`[Web Vitals] ${metric.name}:`, {
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
        navigationType: metric.navigationType,
      });
    }

    if (onPerfEntry) {
      onPerfEntry(metric);
    }
  };

  // Dynamically import to avoid adding to the critical bundle path
  import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
    onCLS(handler);
    onINP(handler);
    onFCP(handler);
    onLCP(handler);
    onTTFB(handler);
  });
};

export default reportWebVitals;
