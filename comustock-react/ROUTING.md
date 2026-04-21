# Routing Configuration

This document describes the routing structure implemented for the ComuStock React application.

## Router Type

The application uses **React Router v6** with `createBrowserRouter` for client-side routing.

## Route Structure

### Home

- **Path:** `/`
- **Component:** `HomePage`
- **Description:** Main landing page

### Brand Pages

All brand pages use the same `BrandPage` component with dynamic routing:

- `/brands/personal` - Personal brand page
- `/brands/movil` - Móvil brand page
- `/brands/fibra` - Fibra brand page
- `/brands/flow` - Flow brand page
- `/brands/pay` - Pay brand page
- `/brands/tienda` - Tienda brand page
- `/brands/smarthome` - Smart Home brand page
- `/brands/tech` - Tech brand page

### Section Pages

#### Templates

- **Path:** `/sections/templates`
- **Component:** `TemplatesPage`

#### Audiovisuales

- **Path:** `/sections/audiovisuales`
- **Component:** `AudiovisualesPage`

#### Recursos

- **Path:** `/sections/recursos`
- **Component:** `RecursosPage`

#### Elementos (Recursos sub-section)

- **Path:** `/sections/recursos/elementos`
- **Component:** `ElementosPage`

#### Toolkits

- **Path:** `/sections/toolkits`
- **Component:** `ToolkitsPage`

#### Diseñar (Toolkits sub-section)

- **Path:** `/sections/toolkits/disenar`
- **Component:** `DisenarPage`

#### Redactar (Toolkits sub-section)

- **Path:** `/sections/toolkits/redactar`
- **Component:** `RedactarPage`

### Mi Firma

- **Path:** `/mi-firma`
- **Component:** `MiFirmaPage`
- **Description:** Signature generator page

### 404 Not Found

- **Path:** `*` (catch-all)
- **Component:** `NotFoundPage`
- **Description:** Displayed for any unmatched routes

## Layout Structure

All routes are wrapped in a `Layout` component that will contain:

- Header (to be implemented)
- Navigation (to be implemented)
- Main content area (using `<Outlet />`)
- Footer (to be implemented)

## Error Handling

All routes are protected by an `ErrorBoundary` component that:

- Catches JavaScript errors in child components
- Displays a user-friendly error page
- Provides options to return home or reload the page
- Shows error details in development mode

## Implementation Details

### Router Configuration

The router is configured in `src/routes.tsx` using `createBrowserRouter`.

### Router Provider

The `AppRouter` component wraps the `RouterProvider` and is used in `App.tsx`.

### TypeScript Types

All components use proper TypeScript typing for route parameters (e.g., `useParams<{ brandName: string }>()`).

## Future Enhancements

The following features will be added in later tasks:

- Hash navigation for in-page sections (e.g., `/sections/templates#presentaciones`)
- Active navigation state management
- Route transitions and animations
- Lazy loading for route components
- Navigation guards if needed

## Testing Routes

To test the routing:

1. Start the dev server: `npm run dev`
2. Navigate to different routes in the browser
3. Verify that each route displays the correct placeholder component
4. Test the 404 page by navigating to an invalid route
5. Test the error boundary by triggering a component error (in development)

## Route Mapping from HTML

| Original HTML File                 | React Route                    |
| ---------------------------------- | ------------------------------ |
| `index.html`                       | `/`                            |
| `brands/personal.html`             | `/brands/personal`             |
| `brands/movil.html`                | `/brands/movil`                |
| `brands/fibra.html`                | `/brands/fibra`                |
| `brands/flow.html`                 | `/brands/flow`                 |
| `brands/pay.html`                  | `/brands/pay`                  |
| `brands/tienda.html`               | `/brands/tienda`               |
| `brands/smarthome.html`            | `/brands/smarthome`            |
| `brands/tech.html`                 | `/brands/tech`                 |
| `sections/templates.html`          | `/sections/templates`          |
| `sections/audiovisuales.html`      | `/sections/audiovisuales`      |
| `sections/recursos.html`           | `/sections/recursos`           |
| `sections/recursos/elementos.html` | `/sections/recursos/elementos` |
| `sections/toolkits.html`           | `/sections/toolkits`           |
| `sections/toolkits/disenar.html`   | `/sections/toolkits/disenar`   |
| `sections/toolkits/redactar.html`  | `/sections/toolkits/redactar`  |
| `mi-firma.html`                    | `/mi-firma`                    |
