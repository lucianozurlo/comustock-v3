# Implementation Plan: HTML to React Migration

## Overview

This implementation plan converts the ComuStock HTML static website into a modern React application using TypeScript and Vite. The migration follows an incremental, phase-based approach to minimize risk while ensuring complete functional and visual equivalence with the original HTML site. All existing CSS, assets, and functionality will be preserved while introducing a component-based architecture, client-side routing, and reactive state management.

## Tasks

- [x] 1. Phase 1: Project Setup & Infrastructure
  - [x] 1.1 Initialize React project with Vite and TypeScript
    - Run `npm create vite@latest comustock-react -- --template react-ts`
    - Install core dependencies: react-router-dom, classnames
    - Install dev dependencies: ESLint, Prettier, TypeScript types
    - Configure tsconfig.json with path aliases (@components, @hooks, @utils, @contexts)
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7_

  - [x] 1.2 Configure development tooling and build setup
    - Create vite.config.ts with path aliases and build optimization
    - Configure ESLint with React, TypeScript, and Prettier rules
    - Create .prettierrc with project code style settings
    - Set up package.json scripts (dev, build, preview, lint, format, test)
    - Create .gitignore for React project
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [x] 1.3 Copy and organize static assets
    - Copy entire assets/ folder (css/, fonts/, img/) to public/assets/
    - Verify all CSS files are present and accessible
    - Verify all font files (Pulso-Bold, Pulso-Regular, Pulso-Light) in woff2, woff, ttf formats
    - Verify all image assets organized by brand (personal, movil, fibra, flow, pay, tienda, smarthome, tech)
    - Verify favicon.png is in correct location
    - _Requirements: 2.1, 2.2, 3.1, 3.4, 3.5, 3.6, 3.7_

  - [x] 1.4 Set up CSS import structure in main application
    - Import CSS files in correct order in main.tsx or App.tsx
    - Order: config.css → libs.css → style.css → base.css → content.css → responsive.css → resp-cs.css
    - Verify CSS variables and custom properties load correctly
    - Test that styles apply to basic HTML elements
    - _Requirements: 2.1, 2.2, 2.3, 2.5_

  - [x] 1.5 Configure React Router with basic route structure
    - Create routes.tsx with createBrowserRouter configuration
    - Define route structure for home, brands, sections, and 404
    - Set up Layout component as root route element
    - Add ErrorBoundary for route-level error handling
    - Implement basic RouterProvider in App.tsx
    - _Requirements: 4.1, 4.2, 4.7_

  - [x] 1.6 Create project documentation
    - Write README.md with installation, development, and build instructions
    - Document project structure and folder organization
    - Add quick start guide and available npm scripts
    - Document CSS loading strategy and asset organization
    - _Requirements: 12.1, 12.2, 12.4, 12.6_

- [x] 2. Checkpoint - Verify project setup
  - Ensure all tests pass, ask the user if questions arise.

- [x] 3. Phase 2: Layout Components
  - [x] 3.1 Create AppContext for global state management
    - Create src/contexts/AppContext.tsx with TypeScript interfaces
    - Define AppState interface (isMobileMenuOpen, currentBrand, scrollPosition, isHeaderSticky)
    - Implement AppProvider component with useState for state management
    - Create useAppContext custom hook with error handling
    - Export AppProvider and useAppContext
    - _Requirements: 6.1, 6.2, 6.3, 6.7_

  - [x] 3.2 Implement custom hooks for common functionality
    - Create useScrollAnimations hook with IntersectionObserver for data-appear animations
    - Create useLazyLoading hook for cs-lazy image loading
    - Create useStickyHeader hook to track scroll position and sticky state
    - Create useHashNavigation hook for smooth scroll to hash anchors
    - Place all hooks in src/hooks/ directory
    - _Requirements: 5.1, 5.7, 8.2_

  - [x] 3.3 Create Header component with sticky behavior
    - Create src/components/layout/Header.tsx component
    - Implement sticky header with frosted effect using useStickyHeader hook
    - Add mobile menu toggle button with state management
    - Apply dynamic className based on scroll state (is-sticky, is-frosted)
    - Include data-appear attributes for entrance animations
    - Integrate with AppContext for mobile menu state
    - _Requirements: 1.4, 5.2, 5.4, 6.3_

  - [x] 3.4 Create Navigation component with desktop and mobile support
    - Create src/components/layout/Navigation.tsx component
    - Define MenuItem and SubMenuItem TypeScript interfaces
    - Implement desktop navigation with hover-triggered submenus
    - Implement mobile navigation with click-triggered menu
    - Add active state highlighting based on current route using useLocation
    - Support mobileOnly and desktopOnly menu items
    - _Requirements: 1.4, 4.6, 5.2, 6.3_

  - [x] 3.5 Create Layout component as route wrapper
    - Create src/components/layout/Layout.tsx component
    - Wrap AppProvider around entire layout
    - Include Header component at top
    - Add main content area with <Outlet /> for nested routes
    - Add role="main" and id="main-content" for accessibility
    - Include skip link for keyboard navigation
    - _Requirements: 1.3, 10.1, 10.2, 10.5_

  - [x] 3.6 Write unit tests for layout components
    - Test Header renders logo and navigation
    - Test mobile menu toggle functionality
    - Test sticky header applies correct class on scroll
    - Test Navigation renders menu items correctly
    - Test Navigation shows/hides submenus
    - Test AppContext provides and updates state correctly
    - _Requirements: 11.1, 11.3, 11.5_

- [x] 4. Checkpoint - Verify layout components
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Phase 3: Home Page Components
  - [x] 5.1 Create HeroBlock component with video background
    - Create src/components/features/HeroBlock.tsx component
    - Implement video element with autoplay, muted, loop, playsInline attributes
    - Add poster image for video loading state
    - Apply cs-hero-block and cs-hero-type03 CSS classes
    - Include data-appear animation attributes
    - Implement lazy video loading with IntersectionObserver
    - _Requirements: 1.1, 1.4, 3.2, 5.1, 8.2_

  - [x] 5.2 Create BrandSquareButton component
    - Create src/components/features/BrandSquareButton.tsx component
    - Define BrandSquareButtonProps TypeScript interface
    - Render Link component to brand page route
    - Display brand logo (logoIso and logoImg SVG content)
    - Apply cs-square-button CSS class and brand-specific class
    - Add data-appear="zoom-in" and data-unload="zoom-out" attributes
    - Support delay prop for staggered animations
    - _Requirements: 1.1, 1.4, 1.5, 4.2, 5.7_

  - [x] 5.3 Create BentoCard and BentoGrid components
    - Create src/components/features/BentoCard.tsx component
    - Define BentoCardData TypeScript interface (title, subtitle, href, imageSrc, size, icon, delay)
    - Implement card with lazy-loaded image using cs-lazy class
    - Support size variants (small, medium, large)
    - Create BentoGrid.tsx component to layout cards in grid
    - Apply cs-bento-grid CSS class
    - _Requirements: 1.1, 1.4, 3.2, 5.7, 8.2_

  - [x] 5.4 Create PortfolioCard component
    - Create src/components/features/PortfolioCard.tsx component
    - Define PortfolioCardProps TypeScript interface
    - Implement masked block structure (cs-masked-block, cs-grid-more-masked)
    - Add lazy-loaded image with custom aspect ratio
    - Include title, description, and link overlay
    - Apply data-delay attribute for animation timing
    - _Requirements: 1.1, 1.4, 3.2, 5.7, 8.2_

  - [x] 5.5 Create section components for home page
    - Create EcosistemaSection component with BrandSquareButton grid
    - Create TemplatesSection component with BentoGrid
    - Create AudiovisualesSection component with PortfolioCard grid
    - Create RecursosSection component with content blocks
    - Create ToolkitsSection component with feature cards
    - Place all section components in src/components/features/
    - _Requirements: 1.1, 1.3, 1.4_

  - [x] 5.6 Assemble complete HomePage component
    - Create src/components/pages/HomePage.tsx component
    - Import and use all section components in correct order
    - Apply useScrollAnimations hook for entrance animations
    - Apply useLazyLoading hook for image optimization
    - Wrap sections in semantic HTML (main, section elements)
    - Add section IDs for hash navigation
    - _Requirements: 1.1, 1.3, 1.4, 4.5, 5.1, 5.7, 8.2_

  - [x] 5.7 Write unit tests for home page components
    - Test HeroBlock renders video with correct attributes
    - Test BrandSquareButton links to correct route
    - Test BentoGrid renders all cards
    - Test PortfolioCard displays image and content
    - Test HomePage renders all sections in correct order
    - _Requirements: 11.1, 11.3, 11.4, 11.5_

- [x] 6. Checkpoint - Verify home page implementation
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Phase 4: Brand Pages
  - [x] 7.1 Create brand data model and configuration
    - Create src/data/brands.ts file
    - Define Brand TypeScript interface (id, name, slug, displayName, color, logoIso, logoImg, headerImage, description, resources)
    - Define BrandResource interface (type, title, description, downloadUrl, previewUrl)
    - Export brand data for all 8 brands (personal, movil, fibra, flow, pay, tienda, smarthome, tech)
    - _Requirements: 1.1, 1.3_

  - [x] 7.2 Implement dynamic brand-specific CSS loading
    - Create useBrandStyles custom hook in src/hooks/
    - Dynamically load brand CSS file from assets/css/brands/{brandName}.css
    - Add link element to document head on mount
    - Remove link element on unmount to prevent style conflicts
    - Handle CSS loading errors gracefully
    - _Requirements: 2.4, 5.1_

  - [x] 7.3 Create BrandHeader component
    - Create src/components/features/BrandHeader.tsx component
    - Display brand header image from assets/img/ecosistema/{brand}/header.svg
    - Show brand display name and description
    - Apply brand-specific CSS classes
    - Include data-appear animations
    - _Requirements: 1.1, 1.4, 3.2, 5.7_

  - [x] 7.4 Create BrandContent and BrandResources components
    - Create BrandContent.tsx for brand-specific content sections
    - Create BrandResources.tsx for downloadable resources grid
    - Display resource cards with preview images and download links
    - Support different resource types (logo, guideline, asset)
    - Apply appropriate CSS classes for brand styling
    - _Requirements: 1.1, 1.4, 3.2_

  - [x] 7.5 Create BrandPage component with routing
    - Create src/components/pages/BrandPage.tsx component
    - Accept brandName prop from route params
    - Use useBrandData hook to fetch brand configuration
    - Apply useBrandStyles hook for brand-specific CSS
    - Compose BrandHeader, BrandContent, and BrandResources
    - Apply brand-specific className to wrapper div
    - _Requirements: 1.1, 1.3, 4.3, 6.6_

  - [x] 7.6 Configure routes for all 8 brand pages
    - Add brand routes to routes.tsx under /brands path
    - Create routes for personal, movil, fibra, flow, pay, tienda, smarthome, tech
    - Pass brandName prop to BrandPage component
    - Ensure navigation updates active state correctly
    - _Requirements: 4.2, 4.3, 4.6_

  - [x] 7.7 Write unit tests for brand pages
    - Test useBrandStyles loads and unloads CSS correctly
    - Test BrandPage renders correct brand data
    - Test brand-specific CSS classes are applied
    - Test navigation between brand pages works
    - _Requirements: 11.1, 11.3, 11.5_

- [x] 8. Checkpoint - Verify brand pages
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Phase 5: Section Pages
  - [x] 9.1 Create TemplatesPage component
    - Create src/components/pages/TemplatesPage.tsx component
    - Implement sections for different template types (presentaciones, e-mails, documentos, etc.)
    - Add section IDs for hash navigation (#presentaciones, #e-mails, etc.)
    - Use BentoGrid component for template cards
    - Apply useHashNavigation hook for smooth scrolling
    - _Requirements: 1.1, 1.3, 4.4, 4.5_

  - [x] 9.2 Create AudiovisualesPage component
    - Create src/components/pages/AudiovisualesPage.tsx component
    - Implement sections for audiovisual content (publicidad, reel, motion graphics, etc.)
    - Add section IDs for hash navigation
    - Use PortfolioCard component for video/image previews
    - Include lazy loading for media assets
    - _Requirements: 1.1, 1.3, 4.4, 4.5, 8.2_

  - [x] 9.3 Create RecursosPage and ElementosPage components
    - Create RecursosPage.tsx for main resources section
    - Create ElementosPage.tsx for design elements subsection
    - Implement resource grids with download links
    - Add filtering or categorization if present in HTML
    - Apply appropriate CSS classes for styling
    - _Requirements: 1.1, 1.3, 4.4_

  - [x] 9.4 Create ToolkitsPage with subsections
    - Create ToolkitsPage.tsx for main toolkits section
    - Create DisenarPage.tsx for design toolkit subsection
    - Create RedactarPage.tsx for writing toolkit subsection
    - Implement toolkit cards with icons and descriptions
    - Add download or external links for toolkit resources
    - _Requirements: 1.1, 1.3, 4.4_

  - [x] 9.5 Create MiFirmaPage component
    - Create src/components/pages/MiFirmaPage.tsx component
    - Implement email signature generator form
    - Add form validation and preview functionality
    - Include copy-to-clipboard functionality
    - Apply form styling from existing CSS
    - _Requirements: 1.1, 1.3, 5.5_

  - [x] 9.6 Configure routes for all section pages
    - Add section routes to routes.tsx under /sections path
    - Add route for /mi-firma page
    - Ensure hash navigation works for subsections
    - Test navigation from home page to section pages
    - _Requirements: 4.2, 4.4, 4.5, 4.6_

  - [x] 9.7 Write unit tests for section pages
    - Test TemplatesPage renders all template sections
    - Test hash navigation scrolls to correct section
    - Test AudiovisualesPage loads media correctly
    - Test ToolkitsPage displays all toolkit options
    - Test MiFirmaPage form validation works
    - _Requirements: 11.1, 11.2, 11.3, 11.5_

- [x] 10. Checkpoint - Verify section pages
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Phase 6: Interactions & Animations
  - [x] 11.1 Implement scroll-based animations system
    - Enhance useScrollAnimations hook with full animation support
    - Support all animation types: fade-up, fade-down, fade-left, fade-right, zoom-in, zoom-out
    - Implement delay timing from data-delay attributes
    - Add threshold and rootMargin configuration
    - Support staggered animations for multiple elements
    - Handle data-unload animations for exit effects
    - _Requirements: 5.1, 5.7, 8.1_

  - [x] 11.2 Implement parallax effects
    - Create useParallax custom hook
    - Detect elements with cs-parallax-media class
    - Apply transform based on scroll position
    - Optimize performance with requestAnimationFrame
    - Support different parallax speeds
    - _Requirements: 5.8_

  - [x] 11.3 Implement hover effects and interactions
    - Ensure all interactive elements respond to hover states
    - Implement button hover effects from CSS
    - Add card hover animations (scale, shadow, etc.)
    - Implement menu item hover states
    - Test hover effects work correctly with touch devices
    - _Requirements: 5.3, 9.5_

  - [x] 11.4 Create Modal component with focus trap
    - Create src/components/ui/Modal.tsx component
    - Implement modal open/close state management
    - Add focus trap to keep keyboard navigation within modal
    - Handle Escape key to close modal
    - Prevent body scroll when modal is open
    - Add ARIA attributes (role="dialog", aria-modal, aria-labelledby)
    - _Requirements: 5.1, 6.4, 10.1, 10.2, 10.3_

  - [x] 11.5 Create Form components with validation
    - Create src/components/ui/Form.tsx base component
    - Create Input, Textarea, Select field components
    - Implement form validation logic
    - Add error message display
    - Ensure all form fields have proper labels
    - Implement contact form submission logic from contact_form.js
    - _Requirements: 5.5, 10.7_

  - [x] 11.6 Create Button component with variants
    - Create src/components/ui/Button.tsx component
    - Support variant prop (primary, secondary)
    - Support size prop (small, medium, large)
    - Support href prop to render as Link component
    - Support onClick prop for button actions
    - Apply cs-button CSS classes
    - _Requirements: 1.1, 1.4_

  - [x] 11.7 Write unit tests for interactions
    - Test scroll animations trigger at correct scroll position
    - Test parallax effects apply correct transforms
    - Test modal opens, closes, and traps focus
    - Test form validation displays errors correctly
    - Test button renders as link or button based on props
    - _Requirements: 11.1, 11.3, 11.5_

- [x] 12. Checkpoint - Verify interactions and animations
  - Ensure all tests pass, ask the user if questions arise.

- [x] 13. Phase 7: Testing & Quality Assurance
  - [x] 13.1 Set up testing infrastructure
    - Install Vitest and React Testing Library
    - Configure vitest.config.ts
    - Install jest-dom for additional matchers
    - Install user-event for interaction testing
    - Set up test utilities and custom render function
    - _Requirements: 11.1, 11.6_

  - [x] 13.2 Write comprehensive unit tests for all components
    - Write tests for all layout components (Header, Navigation, Layout)
    - Write tests for all page components (HomePage, BrandPage, section pages)
    - Write tests for all feature components (HeroBlock, BentoGrid, PortfolioCard, etc.)
    - Write tests for all UI components (Button, Modal, Form)
    - Write tests for all custom hooks
    - _Requirements: 11.1, 11.3, 11.5, 11.6_

  - [x] 13.3 Write integration tests for user flows
    - Test complete navigation flow from home to brand pages
    - Test navigation from home to section pages
    - Test hash navigation within section pages
    - Test mobile menu open/close flow
    - Test form submission flow
    - _Requirements: 11.2, 11.5_

  - [x] 13.4 Create snapshot tests for components
    - Create snapshots for all major components
    - Ensure snapshots capture different component states
    - Document when snapshots should be updated
    - _Requirements: 11.4_

  - [x] 13.5 Set up Cypress for E2E testing
    - Install Cypress
    - Configure cypress.config.ts
    - Create E2E tests for main navigation flows
    - Create E2E tests for animations and interactions
    - Create E2E tests for form submissions
    - _Requirements: 11.1, 11.2, 11.5_

  - [x] 13.6 Implement accessibility testing
    - Install jest-axe for automated accessibility testing
    - Add accessibility tests to all page components
    - Test keyboard navigation works correctly
    - Verify all interactive elements are keyboard accessible
    - Test focus indicators are visible
    - _Requirements: 10.1, 10.2, 10.3, 10.6, 11.1_

  - [x] 13.7 Achieve 80% test coverage
    - Run test coverage report
    - Identify untested code paths
    - Write additional tests to reach 80% coverage
    - Document any intentionally untested code
    - _Requirements: 11.6, 11.7_

- [x] 14. Checkpoint - Verify testing suite
  - Ensure all tests pass, ask the user if questions arise.

- [x] 15. Phase 8: Optimization & Deployment
  - [x] 15.1 Implement code splitting for routes
    - Convert all page component imports to lazy imports
    - Wrap lazy components in Suspense with loading fallback
    - Create LoadingSpinner and PageLoader components
    - Test that code splitting reduces initial bundle size
    - Verify lazy-loaded routes work correctly
    - _Requirements: 8.1_

  - [x] 15.2 Optimize bundle size and build output
    - Configure Vite build options for production
    - Implement manual chunks for vendor code (react, react-dom, react-router-dom)
    - Separate UI components into separate chunk
    - Enable minification with terser
    - Configure terser to remove console.log in production
    - Set chunk size warning limit
    - _Requirements: 8.4, 8.5_

  - [x] 15.3 Implement performance monitoring
    - Install web-vitals package
    - Create performance tracking utility
    - Implement reportWebVitals function
    - Track CLS, FID, FCP, LCP, TTFB metrics
    - Add performance logging in development
    - _Requirements: 8.7_

  - [x] 15.4 Optimize images and assets
    - Audit all images for size and format
    - Compress large images without quality loss
    - Consider converting JPG/PNG to WebP format (optional)
    - Ensure all images have appropriate dimensions
    - Verify lazy loading is working for all images
    - _Requirements: 3.6, 8.2, 8.6_

  - [x] 15.5 Run Lighthouse audits and fix issues
    - Run Lighthouse audit on all major pages
    - Address performance issues (target score > 90)
    - Address accessibility issues (target score > 90)
    - Address best practices issues (target score > 90)
    - Address SEO issues (target score > 90)
    - Document any issues that cannot be fixed
    - _Requirements: 8.7, 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_

  - [x] 15.6 Test cross-browser compatibility
    - Test in Chrome (latest 2 versions)
    - Test in Firefox (latest 2 versions)
    - Test in Safari (latest 2 versions)
    - Test in Edge (latest 2 versions)
    - Test on iOS Safari (mobile)
    - Test on Android Chrome (mobile)
    - Document any browser-specific issues and fixes
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

  - [x] 15.7 Test responsive design across devices
    - Test on mobile devices (320px - 480px)
    - Test on tablets (768px - 1024px)
    - Test on desktop (1280px - 1920px)
    - Test on large displays (2560px+)
    - Verify all breakpoints work correctly
    - Ensure touch interactions work on mobile
    - _Requirements: 9.7_

  - [x] 15.8 Configure deployment setup
    - Choose deployment platform (Netlify, Vercel, AWS S3, etc.)
    - Create deployment configuration file
    - Configure redirects for SPA routing
    - Set up environment variables for production
    - Create deployment script in package.json
    - Test deployment process
    - _Requirements: 7.7, 12.1_

  - [x] 15.9 Create comprehensive documentation
    - Complete README.md with all sections
    - Create docs/components.md with component documentation
    - Create docs/migration.md with HTML to React mapping
    - Document all custom hooks and their usage
    - Document deployment process
    - Add troubleshooting guide
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7_

  - [x] 15.10 Final validation and deployment
    - Run full test suite and ensure all tests pass
    - Run production build and verify no errors
    - Perform final visual comparison with HTML site
    - Verify all functionality works in production build
    - Deploy to production environment
    - Monitor for errors post-deployment
    - _Requirements: 8.7, 11.7_

- [x] 16. Final checkpoint - Complete migration validation
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional testing tasks and can be skipped for faster MVP delivery
- Each task references specific requirements from the requirements document for traceability
- The migration follows the 8-phase strategy defined in the design document
- TypeScript is used throughout for type safety and better developer experience
- All existing CSS is preserved without modification to ensure visual equivalence
- Checkpoints are placed after each major phase to validate progress before continuing
- Testing tasks are integrated throughout to catch issues early
- The final phase focuses on optimization, cross-browser testing, and deployment readiness
