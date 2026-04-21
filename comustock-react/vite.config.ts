import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Target ES2015 for broad browser compatibility (Chrome 49+, Firefox 44+, Safari 10+, Edge 14+)
    target: 'es2015',
    // Use terser for minification with console.log removal in production
    minify: 'terser',
    terserOptions: {
      compress: {
        // Remove console.log calls in production builds
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vendor chunk: React core libraries
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router-dom/') ||
            id.includes('node_modules/@remix-run/')
          ) {
            return 'react-vendor';
          }

          // UI components chunk: layout and reusable UI components
          if (id.includes('/src/components/layout/') || id.includes('/src/components/ui/')) {
            return 'ui-components';
          }
        },
      },
    },
    // Warn when individual chunks exceed 600 kB
    chunkSizeWarningLimit: 600,
  },
  assetsInclude: ['**/*.mp4', '**/*.webm'],
});
