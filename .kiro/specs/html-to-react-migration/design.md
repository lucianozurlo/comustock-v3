# Design Document: HTML to React Migration

## Overview

Este documento define el diseño técnico para migrar el sitio web estático ComuStock (HTML/CSS/JavaScript vanilla) a una aplicación React moderna. La migración preservará completamente la experiencia de usuario existente mientras introduce una arquitectura componentizada, routing client-side, y gestión de estado reactiva.

### Objetivos del Diseño

1. **Equivalencia Funcional**: La aplicación React debe replicar exactamente toda la funcionalidad del sitio HTML
2. **Preservación Visual**: Mantener 100% de fidelidad visual con los estilos CSS existentes
3. **Arquitectura Escalable**: Establecer una estructura de componentes reutilizable y mantenible
4. **Rendimiento Óptimo**: Igualar o superar el rendimiento del sitio HTML estático
5. **Developer Experience**: Configurar un entorno de desarrollo moderno con hot reload y tooling

### Alcance de la Migración

**Incluye:**

- Conversión de todas las páginas HTML a componentes React
- Implementación de routing client-side con React Router
- Migración de JavaScript vanilla a React hooks y event handlers
- Preservación de todos los estilos CSS existentes
- Migración de assets estáticos (imágenes, fuentes, videos)
- Implementación de animaciones y efectos interactivos
- Configuración de entorno de desarrollo y build

**Excluye:**

- Rediseño visual o cambios en UX
- Refactorización de CSS a CSS-in-JS o CSS Modules
- Implementación de backend o APIs
- Cambios en la estructura de contenido

## Architecture

### Arquitectura General

La aplicación es una **Single Page Application (SPA)** basada en React con una estrategia de renderizado híbrida: la página principal está construida con componentes React nativos, mientras que el resto de las páginas utilizan un patrón de **fetch-and-render** que obtiene los archivos HTML originales y los inyecta en el DOM.

```
┌─────────────────────────────────────────────────────────┐
│                    React Application                     │
├─────────────────────────────────────────────────────────┤
│  Layout Shell (React Components)                         │
│  ├─ Header (React component)                            │
│  ├─ main#cs-main                                        │
│  │   ├─ <Outlet /> (page content)                       │
│  │   └─ Footer (React component)                        │
│  └─ .cs-backlight                                       │
├─────────────────────────────────────────────────────────┤
│  Page Rendering Strategy                                 │
│  ├─ HomePage: React components (HeroBlock, sections…)   │
│  ├─ BrandPage: fetch /brands/{slug}.html → extract      │
│  │             #banner + .brands-container              │
│  └─ Section pages: HtmlPage → fetch /sections/*.html    │
│                    → extract #cs-main .stg-container    │
├─────────────────────────────────────────────────────────┤
│  Hooks Layer                                            │
│  ├─ useScrollAnimations (MutationObserver)              │
│  ├─ useMaskedBlocks (SVG clip-path masks)               │
│  ├─ useLazyLoading (IntersectionObserver)               │
│  └─ useBrandStyles (dynamic <link> injection)           │
├─────────────────────────────────────────────────────────┤
│  Routing Layer (React Router v6)                        │
│  ├─ createBrowserRouter                                 │
│  ├─ Lazy-loaded page components (code splitting)        │
│  └─ Suspense + PageLoader fallback                      │
├─────────────────────────────────────────────────────────┤
│  Static Assets (public/)                                │
│  ├─ /assets/ — CSS, fonts, images                      │
│  ├─ /brands/ — original brand HTML files               │
│  ├─ /sections/ — original section HTML files           │
│  ├─ /mi-firma/ — original mi-firma HTML                │
│  └─ /content/ — brand content assets                   │
└─────────────────────────────────────────────────────────┘
```

### Estrategia de Renderizado por Tipo de Página

La decisión arquitectónica central es usar diferentes estrategias de renderizado según la complejidad de cada página:

| Tipo de página                                                                                            | Estrategia                             | Justificación                                                                              |
| --------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------ |
| HomePage                                                                                                  | Componentes React nativos              | Página principal con secciones bien definidas y reutilizables                              |
| BrandPage (8 marcas)                                                                                      | Fetch HTML + `dangerouslySetInnerHTML` | Contenido de marca complejo; preserva fidelidad visual sin reescribir                      |
| Páginas de sección (templates, audiovisuales, recursos, elementos, toolkits, disenar, redactar, mi-firma) | `HtmlPage` genérico                    | Páginas con contenido estático complejo; el fetch-and-render garantiza equivalencia exacta |

### Layout Structure

El Layout envuelve todas las páginas con el shell compartido:

```
<> (Fragment)
  <a class="cs-skip-link" />        ← accesibilidad
  <Header />                         ← componente React
  <main id="cs-main">
    <Outlet />                       ← contenido de página
    <Footer />                       ← componente React
  </main>
  <div class="cs-backlight" />
</>
```

Cada página gestiona su propio `body.id` y `body.class` para que los selectores CSS del sitio original funcionen correctamente.

### Body ID / Class Management

| Página                   | `body.id`            | `body.class`       |
| ------------------------ | -------------------- | ------------------ |
| HomePage                 | `home`               | `is-loaded`        |
| BrandPage (ej. personal) | `personal`           | `brands is-loaded` |
| TemplatesPage            | `main-templates`     | `is-loaded`        |
| AudiovisualesPage        | `main-audiovisuales` | `is-loaded`        |
| RecursosPage             | `main-recursos`      | `is-loaded`        |
| ElementosPage            | `main-elementos`     | `is-loaded`        |
| ToolkitsPage             | `main-toolkits`      | `is-loaded`        |
| DisenarPage              | `main-disenar`       | `is-loaded`        |
| RedactarPage             | `main-redactar`      | `is-loaded`        |
| MiFirmaPage              | `main-mi-firma`      | `is-loaded`        |

El Layout agrega `body.is-loaded` globalmente — clase requerida por el CSS para mostrar `main#cs-main`.

### Principios Arquitectónicos

1. **Visual Fidelity First**: La equivalencia visual exacta con el sitio HTML original es la prioridad máxima
2. **Fetch-and-Render for Complex Pages**: Las páginas con contenido HTML complejo se sirven directamente desde los archivos originales
3. **React Shell**: El header, footer y navegación son componentes React que se benefician del routing client-side
4. **CSS Preservation**: Todos los archivos CSS se cargan vía `<link>` en `index.html`, sin importaciones en JS
5. **Hook-Based Behavior**: Los comportamientos JavaScript del sitio original (animaciones, máscaras, lazy loading) se reimplementan como custom hooks

### Decisiones Arquitectónicas Clave

| Decisión         | Opción Elegida                                | Justificación                                                        |
| ---------------- | --------------------------------------------- | -------------------------------------------------------------------- |
| Build Tool       | Vite                                          | HMR rápido, configuración simple, soporte TypeScript nativo          |
| Routing          | React Router v6                               | `createBrowserRouter`, lazy loading, Suspense integrado              |
| Page Rendering   | Fetch-and-render (HTML) para secciones/marcas | Garantiza fidelidad visual sin reescribir HTML complejo              |
| CSS Loading      | `<link>` tags en `index.html`                 | Orden de carga garantizado, sin riesgo de reordenamiento por bundler |
| Brand CSS        | `useBrandStyles` hook (inyección dinámica)    | Carga/descarga CSS de marca al navegar entre páginas                 |
| Animations       | `useScrollAnimations` con MutationObserver    | Detecta elementos añadidos dinámicamente por HtmlPage                |
| Masked Blocks    | `useMaskedBlocks` con SVG clip-path           | Replica `cs_Masked` JS class del sitio original                      |
| State Management | useState local + body DOM manipulation        | Suficiente para la complejidad actual                                |

## Components and Interfaces

### Jerarquía de Componentes

```
App
└── AppRouter (RouterProvider)
    └── ErrorBoundary
        └── Layout
            ├── Header (React component)
            ├── main#cs-main
            │   ├── <Outlet /> — one of:
            │   │   ├── HomePage
            │   │   │   ├── HeroBlock
            │   │   │   ├── TemplatesSection
            │   │   │   ├── AudiovisualesSection
            │   │   │   ├── RecursosSection
            │   │   │   └── ToolkitsSection
            │   │   │
            │   │   ├── BrandPage (fetch /brands/{slug}.html)
            │   │   │   ├── #banner (dangerouslySetInnerHTML)
            │   │   │   └── .brands-container (dangerouslySetInnerHTML)
            │   │   │
            │   │   ├── HtmlPage (generic fetch-and-render)
            │   │   │   └── extracted #cs-main .stg-container content
            │   │   │       (used by: TemplatesPage, AudiovisualesPage,
            │   │   │        RecursosPage, ElementosPage, ToolkitsPage,
            │   │   │        DisenarPage, RedactarPage, MiFirmaPage)
            │   │   │
            │   │   └── NotFoundPage
            │   └── Footer (React component)
            └── .cs-backlight
```

### Componentes Principales

#### 1. Layout Components

**Layout Component**

Provee el shell compartido para todas las páginas. Activa los hooks globales de comportamiento y gestiona `body.is-loaded`.

```typescript
const Layout = () => {
  const location = useLocation();

  useScrollAnimations([location.pathname]); // re-run on route change
  useMaskedBlocks([location.pathname]);     // re-run on route change
  useLazyLoading();                         // runs once on mount

  useEffect(() => {
    document.body.classList.add('is-loaded');
    return () => document.body.classList.remove('is-loaded');
  }, []);

  // Scroll to top on route change (unless hash navigation)
  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <a href="#cs-main" className="cs-skip-link">Saltar al contenido principal</a>
      <Header />
      <main id="cs-main" role="main" tabIndex={-1}>
        <Outlet />
        <Footer />
      </main>
      <div className="cs-backlight" />
    </>
  );
};
```

**Header Component**

Componente React que replica el header del sitio original con sticky behavior, menú móvil y submenús.

#### 2. Page Components

**HomePage Component**

La única página construida completamente con componentes React. Gestiona `body#home` y renderiza las secciones como componentes React nativos.

```typescript
const HomePage = () => {
  useEffect(() => {
    document.body.id = 'home';
    document.body.classList.remove('brands');
    return () => { document.body.id = ''; };
  }, []);

  return (
    <div className="stg-container">
      <HeroBlock />
      <TemplatesSection />
      <AudiovisualesSection />
      <RecursosSection />
      <ToolkitsSection />
    </div>
  );
};
```

**HtmlPage Component** _(patrón genérico para páginas de sección)_

Componente genérico que obtiene el archivo HTML original, extrae el contenido principal y lo renderiza. Ver sección [HtmlPage: Patrón Fetch-and-Render](#htmlpage-patrón-fetch-and-render) para detalles completos.

```typescript
interface HtmlPageProps {
  htmlPath: string; // e.g. '/sections/templates.html'
  bodyId: string; // e.g. 'main-templates'
  bodyClass?: string; // optional extra body classes
}
```

Todas las páginas de sección son thin wrappers sobre `HtmlPage`:

```typescript
// TemplatesPage.tsx
const TemplatesPage = () => (
  <HtmlPage htmlPath="/sections/templates.html" bodyId="main-templates" />
);
```

**BrandPage Component**

Obtiene el HTML de la marca, extrae `#banner` y `.brands-container`, y los renderiza con `dangerouslySetInnerHTML`. Usa `useBrandStyles` para cargar el CSS específico de la marca.

```typescript
const BrandPage = () => {
  const { brandName } = useParams<{ brandName: string }>();
  useBrandStyles(brandName ?? "");

  // Sets body.id = brandName, body.classList.add('brands')
  // Fetches /brands/{brandName}.html
  // Extracts #banner and #cs-main .stg-container
  // Renders both with dangerouslySetInnerHTML
};
```

#### 3. Feature Components (HomePage)

Los siguientes componentes React nativos se usan exclusivamente en la HomePage:

- **HeroBlock**: Sección hero con video de fondo
- **TemplatesSection**: Grid de templates con BentoCards
- **AudiovisualesSection**: Portfolio cards de audiovisuales
- **RecursosSection**: Sección de recursos (fuentes, iconos, elementos)
- **ToolkitsSection**: Grid de toolkits

#### 4. Custom Hooks

**useScrollAnimations**

El CSS original oculta elementos `[data-appear]` con `opacity: 0`. Este hook elimina el atributo `data-appear` de los elementos a medida que aparecen en el DOM, usando `MutationObserver` para detectar elementos añadidos dinámicamente por `HtmlPage`.

```typescript
export const useScrollAnimations = (deps: unknown[] = []) => {
  useEffect(() => {
    const removeAppear = (el: HTMLElement) => {
      el.removeAttribute("data-appear");
      el.removeAttribute("data-unload");
    };

    // Process already-present elements
    document
      .querySelectorAll<HTMLElement>("[data-appear]")
      .forEach(removeAppear);

    // Watch for elements added by HtmlPage (lazy-loaded HTML)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          const el = node as HTMLElement;
          if (el.hasAttribute?.("data-appear")) removeAppear(el);
          el.querySelectorAll?.<HTMLElement>("[data-appear]").forEach(
            removeAppear,
          );
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, deps);
};
```

**useMaskedBlocks**

Replica la clase `cs_Masked` del JavaScript original. Crea SVG clip-path masks para elementos `.cs-masked-block`, recortando una esquina redondeada donde `.cs-masked-content` se superpone a `.cs-masked-media`. Usa `MutationObserver` para procesar bloques añadidos por `HtmlPage`.

**useLazyLoading**

Implementa lazy loading para imágenes con clase `cs-lazy` usando `IntersectionObserver`. Cuando una imagen entra en el viewport, copia `data-src` a `src` y elimina la clase `cs-lazy`.

```typescript
// Patrón de uso en HTML:
<img className="cs-lazy" src="/assets/img/null.png" data-src="/assets/img/actual.jpg" alt="..." />
```

**useBrandStyles**

Inyecta y elimina dinámicamente tags `<link>` para el CSS específico de cada marca. Se ejecuta en `BrandPage` y limpia al desmontar para evitar conflictos de estilos al navegar entre marcas.

```typescript
export const useBrandStyles = (brandName: string): void => {
  useEffect(() => {
    if (!brandName) return;
    const linkId = `brand-${brandName}-styles`;
    if (document.getElementById(linkId)) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `/assets/css/brands/${brandName}.css`;
    link.id = linkId;
    document.head.appendChild(link);

    return () => document.getElementById(linkId)?.remove();
  }, [brandName]);
};
```

## Data Models

### Brand Data Model

```typescript
interface Brand {
  id: string;
  name: string;
  slug: string;
  displayName: string;
  color: string;
  logoIso: string; // SVG content
  logoImg: string; // SVG content
  headerImage: string;
  description: string;
  resources: BrandResource[];
}

interface BrandResource {
  type: "logo" | "guideline" | "asset";
  title: string;
  description?: string;
  downloadUrl: string;
  previewUrl?: string;
}
```

### Navigation Data Model

```typescript
interface NavigationStructure {
  mainMenu: MenuItem[];
  mobileMenu: MenuItem[];
}

interface MenuItem {
  id: string;
  label: string;
  href: string;
  type: "link" | "dropdown";
  subMenu?: SubMenuItem[];
  mobileOnly?: boolean;
  desktopOnly?: boolean;
  cssClass?: string;
}

interface SubMenuItem {
  id: string;
  label: string;
  href: string;
  isDivider?: boolean;
  cssClass?: string;
}
```

### Page Content Data Model

```typescript
interface PageContent {
  id: string;
  slug: string;
  title: string;
  sections: Section[];
  metadata: PageMetadata;
}

interface Section {
  id: string;
  type: "hero" | "grid" | "bento" | "portfolio" | "content";
  title?: string;
  subtitle?: string;
  content: any; // Tipo específico según el tipo de sección
  animations?: AnimationConfig;
}

interface PageMetadata {
  title: string;
  description?: string;
  keywords?: string[];
}
```

### Animation Configuration Model

```typescript
interface AnimationConfig {
  appear:
    | "fade-up"
    | "fade-down"
    | "fade-left"
    | "fade-right"
    | "zoom-in"
    | "zoom-out";
  unload?: string;
  delay?: number;
  threshold?: number;
  stagger?: boolean;
  staggerDelay?: number;
}
```

## HtmlPage: Patrón Fetch-and-Render

### Descripción

`HtmlPage` es el componente genérico que implementa la estrategia de renderizado para todas las páginas de sección y mi-firma. En lugar de reescribir el HTML complejo de cada página como componentes React, este patrón obtiene el archivo HTML original desde `/public`, extrae el contenido relevante y lo inyecta en el DOM.

### Flujo de Renderizado

```
1. Componente monta
   ↓
2. Establece body.id y body.class (para selectores CSS)
   ↓
3. fetch(htmlPath) → archivo HTML original desde /public
   ↓
4. DOMParser.parseFromString() → documento DOM temporal
   ↓
5. Extrae #cs-main .stg-container (elimina footer interno)
   ↓
6. Corrige rutas relativas (../assets/ → /assets/)
   ↓
7. Corrige links internos (.html → rutas React Router)
   ↓
8. setHtml(content) → re-render con dangerouslySetInnerHTML
   ↓
9. Layout hooks (useScrollAnimations, useMaskedBlocks, useLazyLoading)
   detectan el nuevo contenido vía MutationObserver y lo procesan
```

### Corrección de Rutas

El componente normaliza las rutas del HTML original para que funcionen en el contexto React:

```typescript
// Rutas de assets
content = content
  .replace(/\.\.\//g, "/") // ../assets/ → /assets/
  .replace(/src="\.\//g, 'src="/') // ./assets/ → /assets/
  .replace(/href="\.\//g, 'href="/'); // ./sections/ → /sections/

// Links de navegación interna
content = content
  .replace(/href="\/brands\/([^"]+)\.html"/g, 'href="/brands/$1"')
  .replace(/href="\/sections\/([^"]+)\.html"/g, 'href="/sections/$1"')
  .replace(/href="\/mi-firma\/mi-firma\.html"/g, 'href="/mi-firma"')
  .replace(/href="\/index\.html"/g, 'href="/"');
```

**Nota**: Los links internos corregidos usan `href` estándar (no `<Link>` de React Router). El Header de React maneja la navegación SPA; los links dentro del contenido HTML causan una navegación completa que React Router intercepta correctamente.

### Estructura de Archivos Estáticos

Los archivos HTML originales se sirven desde `/public`:

```
public/
├── brands/
│   ├── personal.html
│   ├── movil.html
│   ├── fibra.html
│   ├── flow.html
│   ├── pay.html
│   ├── tienda.html
│   ├── smarthome.html
│   └── tech.html
├── sections/
│   ├── templates.html
│   ├── audiovisuales.html
│   ├── recursos.html
│   ├── elementos.html
│   ├── toolkits.html
│   ├── disenar.html
│   └── redactar.html
├── mi-firma/
│   └── mi-firma.html
├── content/          ← assets de contenido de marcas (logos, SVGs)
└── assets/           ← CSS, fuentes, imágenes
```

### BrandPage vs HtmlPage

`BrandPage` es una variante especializada del mismo patrón con diferencias clave:

| Aspecto           | HtmlPage                  | BrandPage                               |
| ----------------- | ------------------------- | --------------------------------------- |
| Selector extraído | `#cs-main .stg-container` | `#banner` + `#cs-main .stg-container`   |
| CSS adicional     | Ninguno                   | `useBrandStyles(brandName)`             |
| body.class        | Solo `is-loaded`          | `brands is-loaded`                      |
| Validación        | Ninguna                   | Valida contra lista de marcas conocidas |

### Loading State

Mientras se obtiene el HTML, ambos componentes muestran un spinner CSS:

```typescript
if (loading) {
  return (
    <div style={{ padding: '80px 0', textAlign: 'center' }}>
      <div style={{
        display: 'inline-block', width: 36, height: 36,
        border: '3px solid #eee',
        borderTopColor: 'var(--cs-s-accent, #aa3bff)',
        borderRadius: '50%',
        animation: 'cs-spin 0.8s linear infinite',
      }} />
    </div>
  );
}
```

### Consideraciones de Seguridad

El uso de `dangerouslySetInnerHTML` es seguro en este contexto porque:

1. El contenido proviene de archivos HTML estáticos propios del proyecto (no de input de usuario ni APIs externas)
2. Los archivos están en `/public` y son parte del build del proyecto
3. No hay interpolación de datos de usuario en el HTML

## Error Handling

### Error Boundary Component

```typescript
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Aquí se podría enviar a un servicio de logging
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-page">
          <h1>Algo salió mal</h1>
          <p>Por favor, recarga la página o vuelve al inicio.</p>
          <Button href="/">Volver al inicio</Button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Error Handling Strategies

1. **Component-Level Errors**
   - Usar Error Boundaries para capturar errores de renderizado
   - Mostrar UI de fallback apropiada
   - Logging de errores para debugging

2. **Asset Loading Errors**
   - Implementar fallbacks para imágenes que no cargan
   - Usar placeholder images
   - Retry logic para assets críticos

3. **Navigation Errors**
   - Implementar página 404 para rutas no encontradas
   - Redirect automático a home en caso de rutas inválidas
   - Mantener historial de navegación para "back" button

4. **Animation Errors**
   - Graceful degradation si IntersectionObserver no está disponible
   - Fallback a CSS transitions básicas
   - No bloquear renderizado por errores de animación

### Error Logging

```typescript
const logError = (error: Error, context: string) => {
  console.error(`[${context}]`, error);

  // En producción, enviar a servicio de logging
  if (process.env.NODE_ENV === "production") {
    // sendToLoggingService(error, context);
  }
};
```

## Testing Strategy

### Testing Pyramid

```
        ┌─────────────────┐
        │   E2E Tests     │  (10%)
        │   (Cypress)     │
        ├─────────────────┤
        │ Integration     │  (20%)
        │ Tests (RTL)     │
        ├─────────────────┤
        │  Unit Tests     │  (70%)
        │  (Jest + RTL)   │
        └─────────────────┘
```

### Unit Testing

**Objetivo**: Validar que cada componente individual funciona correctamente

**Herramientas**: Jest + React Testing Library

**Cobertura Mínima**: 80%

**Ejemplos de Tests**:

```typescript
// Header.test.tsx
describe('Header Component', () => {
  it('renders logo and navigation', () => {
    render(<Header />);
    expect(screen.getByAlt('ComuStock')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('toggles mobile menu on click', () => {
    render(<Header />);
    const toggler = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(toggler);
    expect(screen.getByRole('navigation')).toHaveClass('is-open');
  });

  it('applies sticky class on scroll', () => {
    render(<Header />);
    fireEvent.scroll(window, { target: { scrollY: 150 } });
    expect(screen.getByRole('banner')).toHaveClass('is-sticky');
  });
});

// BrandSquareButton.test.tsx
describe('BrandSquareButton Component', () => {
  const mockBrand = {
    name: 'Personal',
    slug: 'personal',
    logoIso: '<svg>...</svg>',
    logoImg: '<svg>...</svg>'
  };

  it('renders brand logo and links to brand page', () => {
    render(<BrandSquareButton brand={mockBrand} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/brands/personal');
  });

  it('applies animation attributes', () => {
    render(<BrandSquareButton brand={mockBrand} delay={200} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('data-appear', 'zoom-in');
    expect(link).toHaveAttribute('data-delay', '200');
  });
});
```

### Integration Testing

**Objetivo**: Validar que múltiples componentes funcionan juntos correctamente

**Ejemplos de Tests**:

```typescript
// HomePage.integration.test.tsx
describe('HomePage Integration', () => {
  it('renders all sections in correct order', () => {
    render(<HomePage />);

    const sections = screen.getAllByRole('region');
    expect(sections[0]).toHaveAttribute('id', 'intro');
    expect(sections[1]).toHaveAttribute('id', 'templates');
    expect(sections[2]).toHaveAttribute('id', 'audiovisuales');
  });

  it('navigates to brand page when clicking brand button', async () => {
    render(
      <Router>
        <App />
      </Router>
    );

    const brandButton = screen.getByRole('link', { name: /personal/i });
    fireEvent.click(brandButton);

    await waitFor(() => {
      expect(screen.getByText(/Lineamientos/i)).toBeInTheDocument();
    });
  });
});

// Navigation.integration.test.tsx
describe('Navigation Integration', () => {
  it('shows submenu on hover', async () => {
    render(<Navigation items={mockMenuItems} />);

    const menuItem = screen.getByText('Ecosistema');
    fireEvent.mouseEnter(menuItem);

    await waitFor(() => {
      expect(screen.getByText('Personal')).toBeVisible();
      expect(screen.getByText('Móvil')).toBeVisible();
    });
  });
});
```

### Snapshot Testing

**Objetivo**: Detectar cambios no intencionados en el output de componentes

```typescript
// BentoCard.snapshot.test.tsx
describe('BentoCard Snapshots', () => {
  it('matches snapshot for large card', () => {
    const { container } = render(
      <BentoCard
        title="Presentaciones"
        subtitle="Tus ideas en primer plano"
        href="/templates#presentaciones"
        imageSrc="/assets/img/home/templates/presentaciones.jpg"
        size="large"
        icon="presentation"
      />
    );
    expect(container).toMatchSnapshot();
  });
});
```

### E2E Testing

**Objetivo**: Validar flujos completos de usuario

**Herramienta**: Cypress

**Ejemplos de Tests**:

```typescript
// navigation.cy.ts
describe("Site Navigation", () => {
  it("navigates through main sections", () => {
    cy.visit("/");
    cy.get("nav a").contains("Templates").click();
    cy.url().should("include", "/sections/templates");
    cy.get("h1").should("contain", "Templates");
  });

  it("navigates to brand page and back", () => {
    cy.visit("/");
    cy.get('a[href*="brands/personal"]').click();
    cy.url().should("include", "/brands/personal");
    cy.get(".cs-logo").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
});

// animations.cy.ts
describe("Animations", () => {
  it("triggers scroll animations", () => {
    cy.visit("/");
    cy.get('[data-appear="fade-up"]').should("not.have.class", "is-visible");
    cy.scrollTo(0, 500);
    cy.get('[data-appear="fade-up"]').should("have.class", "is-visible");
  });
});
```

### Testing Best Practices

1. **Test Behavior, Not Implementation**: Testear lo que el usuario ve y hace, no detalles internos
2. **Use Semantic Queries**: Preferir `getByRole`, `getByLabelText` sobre `getByTestId`
3. **Avoid Testing Third-Party Code**: No testear React Router o bibliotecas externas
4. **Mock External Dependencies**: Mockear llamadas a APIs, timers, IntersectionObserver
5. **Test Accessibility**: Incluir tests de accesibilidad con jest-axe
6. **Keep Tests Fast**: Tests unitarios deben ejecutarse en < 1 segundo

### Continuous Integration

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm ci
      - run: npm run lint
      - run: npm run test:coverage
      - run: npm run build
```

## Routing Architecture

### React Router Configuration

La aplicación usa **React Router v6** con `createBrowserRouter`. Todas las páginas se cargan con `lazy()` para code splitting automático.

**Estructura de Rutas**:

```typescript
// routes.tsx
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <Layout />
      </ErrorBoundary>
    ),
    children: [
      { index: true, element: withSuspense(<HomePage />) },
      {
        path: 'brands',
        children: [
          { path: ':brandName', element: withSuspense(<BrandPage />) }
        ]
      },
      {
        path: 'sections',
        children: [
          { path: 'templates',           element: withSuspense(<TemplatesPage />) },
          { path: 'audiovisuales',        element: withSuspense(<AudiovisualesPage />) },
          { path: 'recursos',             element: withSuspense(<RecursosPage />) },
          { path: 'recursos/elementos',   element: withSuspense(<ElementosPage />) },
          { path: 'toolkits',             element: withSuspense(<ToolkitsPage />) },
          { path: 'toolkits/disenar',     element: withSuspense(<DisenarPage />) },
          { path: 'toolkits/redactar',    element: withSuspense(<RedactarPage />) },
        ]
      },
      { path: 'mi-firma', element: withSuspense(<MiFirmaPage />) },
      { path: '*',        element: withSuspense(<NotFoundPage />) },
    ]
  }
]);
```

### Mapeo de Rutas a Archivos HTML

| Ruta React                     | Componente                       | Archivo HTML fuente                   |
| ------------------------------ | -------------------------------- | ------------------------------------- |
| `/`                            | `HomePage`                       | _(componentes React nativos)_         |
| `/brands/:brandName`           | `BrandPage`                      | `/public/brands/{brandName}.html`     |
| `/sections/templates`          | `TemplatesPage` → `HtmlPage`     | `/public/sections/templates.html`     |
| `/sections/audiovisuales`      | `AudiovisualesPage` → `HtmlPage` | `/public/sections/audiovisuales.html` |
| `/sections/recursos`           | `RecursosPage` → `HtmlPage`      | `/public/sections/recursos.html`      |
| `/sections/recursos/elementos` | `ElementosPage` → `HtmlPage`     | `/public/sections/elementos.html`     |
| `/sections/toolkits`           | `ToolkitsPage` → `HtmlPage`      | `/public/sections/toolkits.html`      |
| `/sections/toolkits/disenar`   | `DisenarPage` → `HtmlPage`       | `/public/sections/disenar.html`       |
| `/sections/toolkits/redactar`  | `RedactarPage` → `HtmlPage`      | `/public/sections/redactar.html`      |
| `/mi-firma`                    | `MiFirmaPage` → `HtmlPage`       | `/public/mi-firma/mi-firma.html`      |

### Scroll Behavior

El Layout maneja el scroll automáticamente en cada cambio de ruta:

```typescript
useEffect(() => {
  if (!location.hash) {
    window.scrollTo(0, 0);
  }
}, [location.pathname]);
```

Para hash navigation (ej. `/sections/templates#presentaciones`), el scroll al elemento se maneja por el comportamiento nativo del navegador ya que los links internos del HTML usan `href="#section-id"`.

### Active Navigation State

El Header determina el estado activo del menú usando `useLocation()` para comparar el pathname actual con las rutas de cada item de navegación.

## State Management

### Approach: Local State + DOM Manipulation

La aplicación no usa React Context global. El estado se gestiona localmente en cada componente, y el estado que afecta al CSS (body.id, body.class) se manipula directamente en el DOM.

### Body State Management

El estado más importante de la aplicación es el `body.id` y `body.class`, que controlan qué estilos CSS se aplican. Cada componente de página lo gestiona en su propio `useEffect`:

```typescript
// Patrón estándar en cada página
useEffect(() => {
  const prevId = document.body.id;
  const prevClass = document.body.className;

  document.body.id = "main-templates";
  // body.is-loaded lo agrega el Layout

  return () => {
    document.body.id = prevId;
    document.body.className = prevClass;
  };
}, []);
```

### Component State Patterns

**Estado local para UI** (Header, menú móvil):

```typescript
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // ...
};
```

**Estado de fetch** (HtmlPage, BrandPage):

```typescript
const [html, setHtml] = useState<string>("");
const [loading, setLoading] = useState(true);
```

### No Global Context

No se implementó `AppContext` ni `React Context` global. La complejidad de estado de la aplicación no lo requiere — cada página es independiente y el estado compartido (header sticky, menú) se maneja localmente en el Header.

## CSS Migration Strategy

### Approach: CSS via `<link>` Tags in index.html

La estrategia real implementada es cargar **todos los archivos CSS vía tags `<link>` en `index.html`**, no mediante importaciones en JavaScript. Esto garantiza el orden de carga correcto y evita que el bundler reordene los estilos.

### CSS Loading Order

```html
<!-- index.html — orden exacto requerido -->
<link rel="stylesheet" href="/assets/css/config.css" />
<!-- 1. Variables y configuración -->
<link rel="stylesheet" href="/assets/css/libs.css" />
<!-- 2. Librerías externas -->
<link rel="stylesheet" href="/assets/css/stg.css" />
<!-- 3. Sistema de grid STG -->
<link rel="stylesheet" href="/assets/css/style.css" />
<!-- 4. Estilos base -->
<link rel="stylesheet" href="/assets/css/base.css" />
<!-- 5. Layout base -->
<link rel="stylesheet" href="/assets/css/content.css" />
<!-- 6. Estilos de contenido -->
<link rel="stylesheet" href="/assets/css/sections.css" />
<!-- 7. Estilos de secciones -->
<link rel="stylesheet" href="/assets/css/brands.css" />
<!-- 8. Estilos de marcas (base) -->
<link
  rel="stylesheet"
  href="/assets/css/responsive.css"
/><!-- 9. Media queries -->
<link rel="stylesheet" href="/assets/css/resp-cs.css" />
<!-- 10. Responsive custom -->
```

### Brand-Specific CSS

Los estilos específicos de marca se cargan dinámicamente mediante el hook `useBrandStyles` cuando el usuario navega a una página de marca, y se eliminan al salir:

```typescript
// Se inyecta en <head> al montar BrandPage:
<link id="brand-personal-styles" rel="stylesheet" href="/assets/css/brands/personal.css" />

// Se elimina al desmontar BrandPage (al navegar a otra página)
```

### CSS Class Application

Los componentes React aplican exactamente las mismas clases CSS que el HTML original. Para las páginas que usan `HtmlPage` o `BrandPage`, el HTML se sirve directamente con sus clases originales intactas.

Para los componentes React nativos (HomePage y sus secciones), las clases se aplican manualmente replicando el HTML original:

```typescript
// Ejemplo en HeroBlock
<section id="intro" className="stg-section">
  <div className="cs-hero-block cs-hero-type03">
    <div className="cs-hero-media-wrap cs-masked-block">
      ...
    </div>
  </div>
</section>
```

### CSS Selectors que Dependen del body

Muchos selectores CSS del sitio original usan el `body.id` o `body.class` como contexto:

```css
/* Ejemplo: solo visible en páginas de marca */
body.brands .brands-container { ... }

/* Ejemplo: solo visible en home */
body#home #intro { ... }

/* Requerido para mostrar main#cs-main */
body.is-loaded #cs-main { display: block; }
```

Por eso cada componente de página gestiona `document.body.id` y `document.body.className` en su `useEffect`.

## Static Assets Management

### Asset Organization

Mantener la estructura de carpetas existente:

```
public/
└── assets/
    ├── css/
    │   ├── base.css
    │   ├── brands/
    │   │   ├── fibra.css
    │   │   ├── flow.css
    │   │   └── ...
    │   └── ...
    ├── fonts/
    │   ├── Pulso-Bold.woff2
    │   ├── Pulso-Regular.woff2
    │   └── ...
    └── img/
        ├── favicon.png
        ├── logo-comustock.svg
        ├── home/
        │   ├── home.mp4
        │   ├── home-poster.jpg
        │   └── ...
        └── ecosistema/
            ├── personal/
            ├── movil/
            └── ...
```

### Asset Referencing

**Imágenes**:

```typescript
// Referencia absoluta desde public/
<img src="/assets/img/logo-comustock.svg" alt="ComuStock" />

// Con lazy loading
<img
  className="cs-lazy"
  src="/assets/img/null.png"
  data-src="/assets/img/home/audiovisuales/publicidad.jpg"
  alt="Publicidad"
  loading="lazy"
/>
```

**Videos**:

```typescript
<video
  src="/assets/img/home/home.mp4"
  poster="/assets/img/home/home-poster.jpg"
  playsInline
  muted
  loop
  autoPlay
  preload="auto"
/>
```

**Fuentes**:

```css
/* En config.css - sin cambios */
@font-face {
  font-family: "Pulso";
  src:
    url("/assets/fonts/Pulso-Regular.woff2") format("woff2"),
    url("/assets/fonts/Pulso-Regular.woff") format("woff");
  font-weight: 400;
  font-display: swap;
}
```

### Asset Optimization

**Build-time Optimization**:

```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
  assetsInclude: ["**/*.mp4", "**/*.webm"],
};
```

**Image Optimization** (Future Enhancement):

- Convertir JPG/PNG a WebP
- Generar múltiples tamaños para responsive images
- Implementar `<picture>` con srcset

## Development Environment Setup

### Project Initialization

```bash
# Crear proyecto con Vite
npm create vite@latest comustock-react -- --template react-ts

# Instalar dependencias
cd comustock-react
npm install

# Instalar dependencias adicionales
npm install react-router-dom
npm install classnames
npm install --save-dev @types/node

# Instalar herramientas de desarrollo
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install --save-dev prettier eslint-config-prettier
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install --save-dev vitest jsdom
npm install --save-dev cypress
```

### Project Structure

```
comustock-react/
├── public/
│   ├── assets/              # CSS, fuentes, imágenes (copiados del proyecto HTML)
│   │   ├── css/
│   │   ├── fonts/
│   │   └── img/
│   ├── brands/              # HTML originales de páginas de marca
│   ├── sections/            # HTML originales de páginas de sección
│   ├── mi-firma/            # HTML original de mi-firma
│   └── content/             # Assets de contenido de marcas
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Layout.tsx
│   │   ├── pages/
│   │   │   ├── HomePage.tsx          # React components
│   │   │   ├── HtmlPage.tsx          # Generic fetch-and-render
│   │   │   ├── BrandPage.tsx         # Brand-specific fetch-and-render
│   │   │   ├── TemplatesPage.tsx     # → HtmlPage wrapper
│   │   │   ├── AudiovisualesPage.tsx # → HtmlPage wrapper
│   │   │   ├── RecursosPage.tsx      # → HtmlPage wrapper
│   │   │   ├── ElementosPage.tsx     # → HtmlPage wrapper
│   │   │   ├── ToolkitsPage.tsx      # → HtmlPage wrapper
│   │   │   ├── DisenarPage.tsx       # → HtmlPage wrapper
│   │   │   ├── RedactarPage.tsx      # → HtmlPage wrapper
│   │   │   ├── MiFirmaPage.tsx       # → HtmlPage wrapper
│   │   │   └── NotFoundPage.tsx
│   │   ├── features/
│   │   │   ├── HeroBlock.tsx
│   │   │   ├── TemplatesSection.tsx
│   │   │   ├── AudiovisualesSection.tsx
│   │   │   ├── RecursosSection.tsx
│   │   │   └── ToolkitsSection.tsx
│   │   ├── ui/
│   │   │   └── PageLoader.tsx
│   │   └── ErrorBoundary.tsx
│   ├── hooks/
│   │   ├── useScrollAnimations.ts
│   │   ├── useMaskedBlocks.ts
│   │   ├── useLazyLoading.ts
│   │   └── useBrandStyles.ts
│   ├── routes.tsx
│   ├── App.tsx
│   └── main.tsx
├── index.html               # CSS <link> tags aquí (no en JS)
├── vite.config.ts
├── tsconfig.json
└── package.json
```

### Configuration Files

**vite.config.ts**:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
      "@types": path.resolve(__dirname, "./src/types"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
```

**tsconfig.json**:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@utils/*": ["./src/utils/*"],
      "@contexts/*": ["./src/contexts/*"],
      "@types/*": ["./src/types/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**.eslintrc.json**:

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["react", "@typescript-eslint"],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { "argsIgnorePattern": "^_" }
    ]
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

**.prettierrc**:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

**package.json scripts**:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint src --ext ts,tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:e2e": "cypress open",
    "test:e2e:headless": "cypress run"
  }
}
```

### Git Configuration

**.gitignore**:

```
# Dependencies
node_modules/

# Build output
dist/
build/

# Environment variables
.env
.env.local
.env.production

# IDE
.vscode/
.idea/
*.swp
*.swo

# Testing
coverage/
.nyc_output/

# Logs
*.log
npm-debug.log*

# OS
.DS_Store
Thumbs.db
```

## Migration Strategy

### Phase-Based Migration Approach

La migración se realizará en **fases incrementales** para minimizar riesgos y permitir validación continua.

### Phase 1: Project Setup & Infrastructure (Week 1)

**Objetivos**:

- Configurar proyecto React con Vite
- Configurar tooling (ESLint, Prettier, TypeScript)
- Copiar assets estáticos
- Importar CSS files
- Configurar routing básico

**Entregables**:

- Proyecto React inicializado
- Assets copiados y accesibles
- CSS cargando correctamente
- Routing básico funcionando
- README con instrucciones

**Validación**:

- `npm run dev` inicia sin errores
- Assets se cargan correctamente
- Estilos CSS se aplican
- Navegación básica funciona

### Phase 2: Layout Components (Week 1-2)

**Objetivos**:

- Crear componente Header
- Crear componente Navigation
- Crear componente Layout
- Implementar mobile menu
- Implementar sticky header

**Entregables**:

- `<Header />` component
- `<Navigation />` component
- `<Layout />` component
- Mobile menu funcional
- Sticky header con efecto frosted

**Validación**:

- Header se renderiza correctamente
- Menú desktop muestra submenús
- Menú móvil abre/cierra
- Sticky header activa al scroll
- Tests unitarios pasan

### Phase 3: Home Page Components (Week 2-3)

**Objetivos**:

- Crear HeroBlock component
- Crear BrandSquareButton components
- Crear BentoGrid component
- Crear PortfolioCard component
- Implementar HomePage completa

**Entregables**:

- `<HeroBlock />` con video
- `<BrandSquareButton />` con animaciones
- `<BentoGrid />` responsive
- `<PortfolioCard />` con lazy loading
- `<HomePage />` completa

**Validación**:

- Home page se ve idéntica al HTML
- Animaciones funcionan
- Videos se reproducen
- Lazy loading funciona
- Responsive en todos los breakpoints

### Phase 4: Brand Pages (Week 3-4)

**Objetivos**:

- Crear BrandPage component
- Implementar routing para todas las marcas
- Cargar CSS específico de marca
- Implementar contenido de marca

**Entregables**:

- `<BrandPage />` component
- Rutas para 8 marcas
- Brand-specific CSS loading
- Contenido de marca renderizado

**Validación**:

- Todas las páginas de marca accesibles
- CSS de marca se carga correctamente
- Contenido se muestra correctamente
- Navegación entre marcas funciona

### Phase 5: Section Pages (Week 4-5)

**Objetivos**:

- Crear TemplatesPage
- Crear AudiovisualesPage
- Crear RecursosPage
- Crear ToolkitsPage
- Implementar hash navigation

**Entregables**:

- Componentes para cada sección
- Hash navigation funcional
- Contenido de secciones completo

**Validación**:

- Todas las secciones accesibles
- Hash navigation funciona
- Contenido idéntico al HTML
- Scroll suave a secciones

### Phase 6: Interactions & Animations (Week 5-6)

**Objetivos**:

- Implementar scroll animations
- Implementar parallax effects
- Implementar lazy loading
- Implementar hover effects
- Implementar form handling

**Entregables**:

- `useScrollAnimations` hook
- `useLazyLoading` hook
- Parallax implementation
- Form components
- Todas las interacciones funcionando

**Validación**:

- Animaciones idénticas al HTML
- Parallax funciona suavemente
- Lazy loading optimiza carga
- Forms envían correctamente
- Performance es óptimo

### Phase 7: Testing & Quality Assurance (Week 6-7)

**Objetivos**:

- Escribir tests unitarios
- Escribir tests de integración
- Escribir tests E2E
- Alcanzar 80% cobertura
- Fix bugs encontrados

**Entregables**:

- Suite de tests completa
- Cobertura > 80%
- Todos los tests pasan
- Bugs críticos resueltos

**Validación**:

- `npm run test` pasa
- `npm run test:coverage` > 80%
- `npm run test:e2e` pasa
- No hay errores en consola

### Phase 8: Optimization & Deployment (Week 7-8)

**Objetivos**:

- Optimizar bundle size
- Implementar code splitting
- Optimizar assets
- Configurar deployment
- Documentación final

**Entregables**:

- Bundle optimizado
- Code splitting implementado
- Assets optimizados
- Deployment configurado
- Documentación completa

**Validación**:

- Lighthouse score > 90
- Bundle size < 500KB
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Deployment exitoso

### Migration Checklist

**Pre-Migration**:

- [ ] Backup completo del sitio HTML
- [ ] Documentar todas las funcionalidades
- [ ] Identificar dependencias externas
- [ ] Preparar entorno de desarrollo

**During Migration**:

- [ ] Seguir fases en orden
- [ ] Validar cada fase antes de continuar
- [ ] Mantener sitio HTML funcionando
- [ ] Documentar decisiones técnicas
- [ ] Realizar code reviews

**Post-Migration**:

- [ ] Validación completa de funcionalidad
- [ ] Testing cross-browser
- [ ] Testing en dispositivos móviles
- [ ] Performance testing
- [ ] Accessibility audit
- [ ] Deployment a producción
- [ ] Monitoreo post-deployment

### Risk Mitigation

| Riesgo                            | Probabilidad | Impacto | Mitigación                                   |
| --------------------------------- | ------------ | ------- | -------------------------------------------- |
| Pérdida de funcionalidad          | Media        | Alto    | Testing exhaustivo, validación fase por fase |
| Cambios visuales no intencionados | Alta         | Medio   | Snapshot testing, comparación visual         |
| Performance degradation           | Baja         | Alto    | Performance testing, optimización continua   |
| Browser compatibility issues      | Media        | Medio   | Testing cross-browser, polyfills             |
| Deadline overrun                  | Media        | Medio   | Buffer time en planning, priorización        |

### Success Criteria

La migración será considerada exitosa cuando:

1. ✅ **Equivalencia Funcional**: Todas las funcionalidades del HTML funcionan en React
2. ✅ **Equivalencia Visual**: La aplicación React se ve idéntica al HTML en todos los breakpoints
3. ✅ **Performance**: Lighthouse scores ≥ 90 en todas las categorías
4. ✅ **Testing**: Cobertura de tests ≥ 80%
5. ✅ **Cross-Browser**: Funciona en Chrome, Firefox, Safari, Edge (últimas 2 versiones)
6. ✅ **Accessibility**: No hay errores críticos de accesibilidad
7. ✅ **Documentation**: Documentación completa y actualizada
8. ✅ **Deployment**: Aplicación desplegada y funcionando en producción

## Performance Optimization

### Code Splitting Strategy

**Route-Based Code Splitting**:

```typescript
// routes.tsx
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('./components/pages/HomePage'));
const BrandPage = lazy(() => import('./components/pages/BrandPage'));
const TemplatesPage = lazy(() => import('./components/pages/TemplatesPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <HomePage />
          </Suspense>
        )
      },
      // ... más rutas con lazy loading
    ]
  }
]);
```

**Component-Based Code Splitting**:

```typescript
// Para componentes pesados que no se usan inmediatamente
const VideoPlayer = lazy(() => import('./components/VideoPlayer'));
const ImageGallery = lazy(() => import('./components/ImageGallery'));

const HeroBlock = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VideoPlayer src="/assets/img/home/home.mp4" />
    </Suspense>
  );
}
```

### Asset Optimization

**Image Optimization**:

```typescript
// Lazy loading con Intersection Observer
const LazyImage: React.FC<ImageProps> = ({ src, alt, ...props }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && imgRef.current) {
          const img = imgRef.current;
          img.src = img.dataset.src || '';
          img.onload = () => setIsLoaded(true);
          observer.unobserve(img);
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      data-src={src}
      alt={alt}
      className={isLoaded ? 'loaded' : 'loading'}
      {...props}
    />
  );
}
```

**Video Optimization**:

```typescript
const OptimizedVideo: React.FC<VideoProps> = ({ src, poster, ...props }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      poster={poster}
      playsInline
      muted
      loop
      autoPlay={shouldLoad}
      preload={shouldLoad ? 'auto' : 'none'}
      {...props}
    >
      {shouldLoad && <source src={src} type="video/mp4" />}
    </video>
  );
}
```

### React Performance Optimization

**Memoization**:

```typescript
// Memoizar componentes que se renderizan frecuentemente
const BrandSquareButton = React.memo<BrandSquareButtonProps>(({ brand, delay }) => {
  return (
    <Link to={`/brands/${brand.slug}`} className="cs-square-button">
      {/* content */}
    </Link>
  );
});

// Memoizar valores computados costosos
const BrandPage: React.FC = ({ brandName }) => {
  const brandData = useMemo(() => {
    return computeExpensiveBrandData(brandName);
  }, [brandName]);

  const handleClick = useCallback(() => {
    // handler logic
  }, []);

  return <div>{/* content */}</div>;
}
```

**Virtual Scrolling** (para listas largas):

```typescript
import { FixedSizeList } from 'react-window';

const ResourceList: React.FC = ({ items }) => {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={100}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          <ResourceItem item={items[index]} />
        </div>
      )}
    </FixedSizeList>
  );
}
```

### Bundle Optimization

**Vite Build Configuration**:

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-components": [
            "./src/components/ui/Button",
            "./src/components/ui/Modal",
            "./src/components/ui/Form",
          ],
        },
      },
    },
    chunkSizeWarningLimit: 500,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
```

### Performance Monitoring

**Web Vitals Tracking**:

```typescript
// utils/performance.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

export const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
};

// main.tsx
reportWebVitals((metric) => {
  console.log(metric);
  // Enviar a analytics en producción
});
```

### Performance Targets

| Métrica                  | Target  | Actual HTML | Target React |
| ------------------------ | ------- | ----------- | ------------ |
| First Contentful Paint   | < 1.5s  | ~1.2s       | < 1.5s       |
| Largest Contentful Paint | < 2.5s  | ~2.0s       | < 2.5s       |
| Time to Interactive      | < 3.5s  | ~2.8s       | < 3.5s       |
| Total Blocking Time      | < 300ms | ~200ms      | < 300ms      |
| Cumulative Layout Shift  | < 0.1   | ~0.05       | < 0.1        |
| Bundle Size (JS)         | < 500KB | N/A         | < 500KB      |
| Lighthouse Score         | > 90    | ~95         | > 90         |

## Accessibility

### WCAG 2.1 Compliance

La aplicación React mantendrá el mismo nivel de accesibilidad que el sitio HTML, cumpliendo con **WCAG 2.1 Level AA**.

### Semantic HTML

```typescript
// Usar elementos semánticos apropiados
const Header: React.FC = () => {
  return (
    <header role="banner">
      <nav role="navigation" aria-label="Main navigation">
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
      </nav>
    </header>
  );
}

const HomePage: React.FC = () => {
  return (
    <main role="main" id="main-content">
      <section aria-labelledby="intro-heading">
        <h1 id="intro-heading">ComuStock</h1>
      </section>
    </main>
  );
}
```

### ARIA Attributes

**Navigation**:

```typescript
const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav aria-label="Main navigation">
      <button
        aria-expanded={isOpen}
        aria-controls="main-menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        Menu
      </button>
      <ul id="main-menu" aria-hidden={!isOpen}>
        {/* menu items */}
      </ul>
    </nav>
  );
}
```

**Modal**:

```typescript
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Focus trap
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements?.[0] as HTMLElement;
      firstElement?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <h2 id="modal-title">{title}</h2>
      {children}
      <button onClick={onClose} aria-label="Close modal">
        ×
      </button>
    </div>
  );
}
```

### Keyboard Navigation

**Focus Management**:

```typescript
const useKeyboardNavigation = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key closes modals
      if (e.key === "Escape") {
        // Close modal logic
      }

      // Tab navigation
      if (e.key === "Tab") {
        // Focus trap logic
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
};
```

**Skip Links**:

```typescript
const SkipLink: React.FC = () => {
  return (
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>
  );
}

// CSS
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

### Focus Indicators

```css
/* Asegurar indicadores de foco visibles */
*:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

*:focus:not(:focus-visible) {
  outline: none;
}

*:focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}
```

### Alt Text for Images

```typescript
// Todas las imágenes deben tener alt text descriptivo
<img
  src="/assets/img/ecosistema/personal/header.svg"
  alt="Logo de Personal - Marca principal del ecosistema"
/>

// Imágenes decorativas
<img
  src="/assets/img/decorative-element.svg"
  alt=""
  role="presentation"
/>
```

### Color Contrast

Mantener ratios de contraste WCAG AA:

- Texto normal: mínimo 4.5:1
- Texto grande: mínimo 3:1
- Elementos UI: mínimo 3:1

### Accessibility Testing

**Automated Testing**:

```typescript
// tests/accessibility.test.tsx
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Accessibility', () => {
  it('HomePage should not have accessibility violations', async () => {
    const { container } = render(<HomePage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Navigation should be keyboard accessible', () => {
    render(<Navigation />);
    const firstLink = screen.getAllByRole('link')[0];
    firstLink.focus();
    expect(firstLink).toHaveFocus();
  });
});
```

**Manual Testing Checklist**:

- [ ] Navegación completa con teclado (Tab, Shift+Tab, Enter, Escape)
- [ ] Screen reader testing (NVDA, JAWS, VoiceOver)
- [ ] Zoom hasta 200% sin pérdida de funcionalidad
- [ ] Contraste de colores cumple WCAG AA
- [ ] Todos los formularios tienen labels
- [ ] Todos los botones tienen texto descriptivo
- [ ] Todas las imágenes tienen alt text apropiado

## Documentation

### README.md

```markdown
# ComuStock React

Portal de recursos de marca corporativa construido con React.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

\`\`\`bash
npm install
\`\`\`

### Development

\`\`\`bash
npm run dev
\`\`\`
Abre [http://localhost:3000](http://localhost:3000)

### Build

\`\`\`bash
npm run build
\`\`\`

### Preview Production Build

\`\`\`bash
npm run preview
\`\`\`

## 📁 Project Structure

\`\`\`
src/
├── components/ # React components
│ ├── layout/ # Layout components (Header, Footer)
│ ├── pages/ # Page components
│ ├── features/ # Feature components
│ └── ui/ # Reusable UI components
├── contexts/ # React contexts
├── hooks/ # Custom hooks
├── utils/ # Utility functions
├── data/ # Static data
├── types/ # TypeScript types
└── routes.tsx # Route definitions
\`\`\`

## 🧪 Testing

### Unit Tests

\`\`\`bash
npm run test
\`\`\`

### Coverage

\`\`\`bash
npm run test:coverage
\`\`\`

### E2E Tests

\`\`\`bash
npm run test:e2e
\`\`\`

## 🎨 Styling

El proyecto utiliza CSS vanilla cargado vía `<link>` tags en `index.html`.
Los archivos CSS se encuentran en `public/assets/css/`.

### CSS Loading Order

1. config.css - Variables y configuración
2. libs.css - Librerías externas
3. stg.css - Sistema de grid STG
4. style.css - Estilos base
5. base.css - Layout
6. content.css - Contenido
7. sections.css - Estilos de secciones
8. brands.css - Estilos de marcas (base)
9. responsive.css - Media queries
10. resp-cs.css - Responsive custom

Los CSS específicos de marca (`/assets/css/brands/{brand}.css`) se cargan dinámicamente vía el hook `useBrandStyles`.

## 🏗️ Architecture

### Component Hierarchy

- **Layout Components**: Header, Footer, Layout
- **Page Components**: HomePage (React), BrandPage (fetch HTML), HtmlPage (generic fetch HTML)
- **Section Page Wrappers**: TemplatesPage, AudiovisualesPage, RecursosPage, ElementosPage, ToolkitsPage, DisenarPage, RedactarPage, MiFirmaPage
- **Feature Components**: HeroBlock, TemplatesSection, AudiovisualesSection, RecursosSection, ToolkitsSection

### State Management

- useState local por componente
- DOM manipulation para body.id / body.class (requerido por selectores CSS)
- Sin React Context global

### Routing

- React Router v6
- Route-based code splitting
- Hash navigation support

## 📝 Code Style

### Linting

\`\`\`bash
npm run lint
npm run lint:fix
\`\`\`

### Formatting

\`\`\`bash
npm run format
\`\`\`

## 🚢 Deployment

### Build for Production

\`\`\`bash
npm run build
\`\`\`

Output en \`dist/\` listo para deployment.

### Environment Variables

Crear \`.env.local\` para variables de entorno:
\`\`\`
VITE_API_URL=https://api.example.com
\`\`\`

## 📚 Additional Documentation

- [Component Guide](./docs/components.md)
- [Migration Guide](./docs/migration.md)
- [Contributing](./docs/contributing.md)

## 🤝 Contributing

1. Fork el repositorio
2. Crear feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit cambios (\`git commit -m 'Add AmazingFeature'\`)
4. Push al branch (\`git push origin feature/AmazingFeature\`)
5. Abrir Pull Request

## 📄 License

[Especificar licencia]
```

### Component Documentation

**Ejemplo de documentación de componente**:

````typescript
/**
 * BrandSquareButton Component
 *
 * Botón cuadrado con logo de marca que incluye animaciones de entrada/salida.
 * Usado en la sección de ecosistema de la página principal.
 *
 * @component
 * @example
 * ```tsx
 * <BrandSquareButton
 *   brand={{
 *     name: 'Personal',
 *     slug: 'personal',
 *     logoIso: '<svg>...</svg>',
 *     logoImg: '<svg>...</svg>'
 *   }}
 *   delay={200}
 * />
 * ```
 *
 * @param {BrandSquareButtonProps} props - Component props
 * @param {Brand} props.brand - Objeto con datos de la marca
 * @param {number} [props.delay=0] - Delay de animación en ms
 *
 * @returns {JSX.Element} Botón de marca con animaciones
 */
const BrandSquareButton: React.FC<BrandSquareButtonProps> = ({
  brand,
  delay = 0,
}) => {
  // Implementation
};
````

### Migration Documentation

**docs/migration.md**:

```markdown
# Migration Guide: HTML to React

## Overview

Este documento describe el proceso de migración del sitio HTML estático a React.

## HTML to React Component Mapping

| HTML File               | React Component      | Route               |
| ----------------------- | -------------------- | ------------------- |
| index.html              | HomePage             | /                   |
| brands/personal.html    | BrandPage (personal) | /brands/personal    |
| sections/templates.html | TemplatesPage        | /sections/templates |

## CSS Migration

Los archivos CSS se mantienen sin cambios y se importan en orden:

\`\`\`typescript
// main.tsx
import './assets/css/config.css';
import './assets/css/libs.css';
// ...
\`\`\`

## JavaScript to React Patterns

### Event Listeners → Event Handlers

\`\`\`javascript
// HTML/JS
document.querySelector('.button').addEventListener('click', handleClick);

// React
<button onClick={handleClick}>Click</button>
\`\`\`

### DOM Manipulation → State

\`\`\`javascript
// HTML/JS
element.classList.add('active');

// React
const [isActive, setIsActive] = useState(false);

<div className={isActive ? 'active' : ''}>
\`\`\`

### Scroll Listeners → useEffect

\`\`\`javascript
// HTML/JS
window.addEventListener('scroll', handleScroll);

// React
useEffect(() => {
const handleScroll = () => { /_ ... _/ };
window.addEventListener('scroll', handleScroll);
return () => window.removeEventListener('scroll', handleScroll);
}, []);
\`\`\`

## Common Patterns

### Data Attributes for Animations

\`\`\`tsx

<div
  data-appear="fade-up"
  data-delay="200"
  data-unload="fade-down"
>
  Content
</div>
\`\`\`

### Lazy Loading Images

\`\`\`tsx
<img
  className="cs-lazy"
  src="/assets/img/null.png"
  data-src="/assets/img/actual-image.jpg"
  alt="Description"
/>
\`\`\`

## Troubleshooting

### Issue: Styles not applying

**Solution**: Verificar orden de importación de CSS

### Issue: Animations not working

**Solution**: Asegurar que useScrollAnimations hook está activo

### Issue: Images not loading

**Solution**: Verificar paths relativos desde public/
```

### API Documentation (si aplica)

Si en el futuro se agregan APIs:

````typescript
/**
 * API Client for ComuStock
 *
 * @module api
 */

/**
 * Fetch brand data by slug
 *
 * @async
 * @param {string} slug - Brand slug (e.g., 'personal', 'movil')
 * @returns {Promise<Brand>} Brand data
 * @throws {Error} If brand not found
 *
 * @example
 * ```typescript
 * const brand = await getBrandData('personal');
 * console.log(brand.name); // 'Personal'
 * ```
 */
export async function getBrandData(slug: string): Promise<Brand> {
  // Implementation
}
````

## Deployment Guide

### Build Process

```bash
# 1. Install dependencies
npm ci

# 2. Run tests
npm run test

# 3. Build for production
npm run build

# 4. Output en dist/
ls dist/
```

### Deployment Options

**Option 1: Static Hosting (Netlify, Vercel)**:

```bash
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Option 2: AWS S3 + CloudFront**:

```bash
# Build
npm run build

# Upload to S3
aws s3 sync dist/ s3://comustock-bucket --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id XXXXX --paths "/*"
```

**Option 3: Docker**:

```dockerfile
# Dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Environment Configuration

```bash
# .env.production
VITE_API_URL=https://api.comustock.com
VITE_ANALYTICS_ID=UA-XXXXX-X
```

### Post-Deployment Checklist

- [ ] Verificar que todas las rutas funcionan
- [ ] Verificar que assets se cargan correctamente
- [ ] Verificar performance con Lighthouse
- [ ] Verificar en múltiples navegadores
- [ ] Verificar en dispositivos móviles
- [ ] Configurar monitoring y analytics
- [ ] Configurar error tracking (Sentry, etc.)

## Monitoring and Maintenance

### Performance Monitoring

```typescript
// utils/analytics.ts
export const trackPageView = (path: string) => {
  if (window.gtag) {
    window.gtag("config", "GA_MEASUREMENT_ID", {
      page_path: path,
    });
  }
};

export const trackEvent = (
  action: string,
  category: string,
  label?: string,
) => {
  if (window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
    });
  }
};
```

### Error Tracking

```typescript
// main.tsx
import * as Sentry from "@sentry/react";

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: "YOUR_SENTRY_DSN",
    integrations: [new Sentry.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}
```

### Health Checks

```typescript
// public/health.json
{
  "status": "ok",
  "version": "1.0.0",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Conclusion

Este diseño técnico proporciona una guía completa para migrar el sitio HTML ComuStock a una aplicación React moderna. La estrategia de migración incremental por fases minimiza riesgos y permite validación continua. La preservación de CSS existente y la arquitectura componentizada aseguran equivalencia funcional y visual mientras establecen una base sólida para futuras mejoras.

### Next Steps

1. **Revisión del diseño**: Validar con stakeholders
2. **Setup del proyecto**: Inicializar proyecto React con Vite
3. **Fase 1**: Comenzar con infraestructura y layout components
4. **Iteración**: Seguir fases de migración con validación continua
5. **Testing**: Implementar tests en paralelo con desarrollo
6. **Deployment**: Configurar pipeline de CI/CD
7. **Monitoring**: Establecer monitoring post-deployment
