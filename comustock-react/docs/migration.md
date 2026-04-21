# Migration Guide: HTML to React

Documentación del proceso de migración del sitio HTML estático ComuStock a la aplicación React.

## Tabla de contenidos

- [Mapeo de páginas HTML → componentes React](#mapeo-de-páginas-html--componentes-react)
- [Mapeo de JavaScript → React hooks](#mapeo-de-javascript--react-hooks)
- [Patrones de clases CSS](#patrones-de-clases-css)
- [Atributos data-\* preservados](#atributos-data--preservados)
- [Decisiones de arquitectura](#decisiones-de-arquitectura)
- [Estructura de rutas](#estructura-de-rutas)
- [Cómo crear nuevos componentes](#cómo-crear-nuevos-componentes)

---

## Mapeo de páginas HTML → componentes React

| Página HTML original               | Componente React                  | Ruta                           |
| ---------------------------------- | --------------------------------- | ------------------------------ |
| `index.html`                       | `HomePage`                        | `/`                            |
| `brands/personal.html`             | `BrandPage` (brandName=personal)  | `/brands/personal`             |
| `brands/movil.html`                | `BrandPage` (brandName=movil)     | `/brands/movil`                |
| `brands/fibra.html`                | `BrandPage` (brandName=fibra)     | `/brands/fibra`                |
| `brands/flow.html`                 | `BrandPage` (brandName=flow)      | `/brands/flow`                 |
| `brands/pay.html`                  | `BrandPage` (brandName=pay)       | `/brands/pay`                  |
| `brands/tienda.html`               | `BrandPage` (brandName=tienda)    | `/brands/tienda`               |
| `brands/smarthome.html`            | `BrandPage` (brandName=smarthome) | `/brands/smarthome`            |
| `brands/tech.html`                 | `BrandPage` (brandName=tech)      | `/brands/tech`                 |
| `sections/templates.html`          | `TemplatesPage`                   | `/sections/templates`          |
| `sections/audiovisuales.html`      | `AudiovisualesPage`               | `/sections/audiovisuales`      |
| `sections/recursos.html`           | `RecursosPage`                    | `/sections/recursos`           |
| `sections/recursos/elementos.html` | `ElementosPage`                   | `/sections/recursos/elementos` |
| `sections/toolkits.html`           | `ToolkitsPage`                    | `/sections/toolkits`           |
| `sections/toolkits/disenar.html`   | `DisenarPage`                     | `/sections/toolkits/disenar`   |
| `sections/toolkits/redactar.html`  | `RedactarPage`                    | `/sections/toolkits/redactar`  |
| `mi-firma.html`                    | `MiFirmaPage`                     | `/mi-firma`                    |
| _(no existía)_                     | `NotFoundPage`                    | `*` (catch-all)                |

### Mapeo de secciones dentro de páginas

Las secciones dentro de una página HTML que usaban anchor links (`<a href="#seccion">`) se preservan como IDs en los componentes React, con hash navigation manejado por `useHashNavigation`.

| Anchor HTML          | ID en React              | Página            |
| -------------------- | ------------------------ | ----------------- |
| `#presentaciones`    | `id="presentaciones"`    | TemplatesPage     |
| `#e-mails`           | `id="e-mails"`           | TemplatesPage     |
| `#viva-engage`       | `id="viva-engage"`       | TemplatesPage     |
| `#hojas-membretadas` | `id="hojas-membretadas"` | TemplatesPage     |
| `#publicidad`        | `id="publicidad"`        | AudiovisualesPage |
| `#imagenes`          | `id="imagenes"`          | AudiovisualesPage |
| `#cartelera-interna` | `id="cartelera-interna"` | AudiovisualesPage |
| `#fuentes`           | `id="fuentes"`           | RecursosPage      |
| `#iconos`            | `id="iconos"`            | RecursosPage      |

---

## Mapeo de JavaScript → React hooks

| JavaScript vanilla                                 | Hook React                                            | Descripción                                                      |
| -------------------------------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------- |
| `IntersectionObserver` para animaciones            | `useScrollAnimations`                                 | Detecta elementos con `data-appear` y aplica clases de animación |
| `IntersectionObserver` para imágenes               | `useLazyLoading`                                      | Carga imágenes `cs-lazy` cuando entran al viewport               |
| `window.addEventListener('scroll')` para header    | `useStickyHeader`                                     | Rastrea scroll y actualiza estado sticky en AppContext           |
| `window.location.hash` + `scrollIntoView`          | `useHashNavigation`                                   | Scroll suave a secciones por hash en la URL                      |
| `document.createElement('link')` para CSS de marca | `useBrandStyles`                                      | Inyecta/elimina CSS de marca dinámicamente                       |
| `document.body.classList.toggle('show-menu')`      | `AppContext.toggleMobileMenu` + `useEffect` en Header | Estado del menú mobile en contexto global                        |
| `window.pageYOffset` para parallax                 | _(no implementado — ver nota)_                        | Efectos parallax en elementos `cs-parallax-media`                |

**Nota sobre parallax:** El hook `useParallax` fue planificado en el diseño pero no se implementó en esta versión. Los elementos con clase `cs-parallax-media` mantienen su apariencia estática. Se puede implementar en una iteración futura.

### Gestión de estado: JavaScript global → React Context

El sitio HTML original usaba variables globales y manipulación directa del DOM para el estado. En React, este estado se centraliza en `AppContext`:

| Estado HTML (global/DOM)                        | Estado React (AppContext) |
| ----------------------------------------------- | ------------------------- |
| `document.body.classList.contains('show-menu')` | `state.isMobileMenuOpen`  |
| Variable global de marca activa                 | `state.currentBrand`      |
| `window.scrollY`                                | `state.scrollPosition`    |
| `header.classList.contains('is-sticky')`        | `state.isHeaderSticky`    |

---

## Patrones de clases CSS

Todas las clases CSS del sitio original se preservan sin modificación. Los componentes React aplican las mismas clases que el HTML original.

### Clases del sistema ComuStock (`cs-*`)

| Clase                    | Uso                               |
| ------------------------ | --------------------------------- |
| `cs-hero-block`          | Contenedor del bloque hero        |
| `cs-hero-type03`         | Variante de hero con video        |
| `cs-hero-media`          | Media del hero                    |
| `cs-masked-block`        | Contenedor con efecto masked      |
| `cs-masked-media`        | Media dentro de masked block      |
| `cs-masked-content`      | Contenido overlay en masked block |
| `cs-bento-grid`          | Grid bento para cards             |
| `cs-bento-hero-media`    | Media de card bento               |
| `cs-square-button`       | Botón cuadrado (marca, recursos)  |
| `cs-grid-more-masked`    | Grid con masked blocks            |
| `cs-portfolio-card`      | Card de portfolio                 |
| `cs-lazy`                | Imagen con lazy loading pendiente |
| `cs-loaded`              | Imagen lazy loading completado    |
| `cs-page-loader`         | Loader de página completa         |
| `cs-nav`                 | Navegación principal              |
| `cs-logo`                | Logo en header                    |
| `cs-button`              | Botón CTA                         |
| `cs-header-inner`        | Inner del header desktop          |
| `cs-mobile-header-inner` | Inner del header mobile           |
| `cs-mobile-menu-toggler` | Botón toggle menú mobile          |
| `cs-skip-link`           | Skip link de accesibilidad        |

### Clases de estado (`is-*`)

| Clase          | Cuándo se aplica                                |
| -------------- | ----------------------------------------------- |
| `is-sticky`    | Header cuando `scrollPosition > 100`            |
| `is-frosted`   | Header siempre (efecto frosted glass)           |
| `is-visible`   | Elemento cuando entra al viewport (animaciones) |
| `is-secondary` | Variante secundaria de botón cuadrado           |

### Clases de grid (`stg-*`)

| Clase                        | Uso                                    |
| ---------------------------- | -------------------------------------- |
| `stg-container`              | Contenedor con max-width y padding     |
| `stg-row`                    | Fila del grid                          |
| `stg-col-*`                  | Columna del grid (1-12)                |
| `stg-m-col-*`                | Columna en mobile                      |
| `stg-bottom-gap`             | Espaciado inferior                     |
| `stg-aspect-square`          | Aspect ratio 1:1                       |
| `stg-vertical-space-between` | Justify content space-between vertical |

### Clases responsive

| Clase    | Comportamiento                       |
| -------- | ------------------------------------ |
| `mob-no` | Oculto en mobile, visible en desktop |
| `mob-ok` | Visible en mobile, oculto en desktop |

---

## Atributos data-\* preservados

Todos los atributos `data-*` del HTML original se preservan en los componentes React como props JSX.

### Atributos de animación

| Atributo              | Valores                                                                  | Descripción                                       |
| --------------------- | ------------------------------------------------------------------------ | ------------------------------------------------- |
| `data-appear`         | `fade-up`, `fade-down`, `fade-left`, `fade-right`, `zoom-in`, `zoom-out` | Animación de entrada al viewport                  |
| `data-unload`         | Mismos valores que `data-appear`                                         | Animación de salida del viewport                  |
| `data-delay`          | Número en ms (ej: `"200"`)                                               | Delay antes de ejecutar la animación              |
| `data-threshold`      | Número 0-1 (ej: `"0.5"`)                                                 | Threshold personalizado para IntersectionObserver |
| `data-stagger-appear` | Mismo que `data-appear`                                                  | Animación staggered para múltiples hijos          |
| `data-stagger-delay`  | Número en ms                                                             | Delay entre cada elemento staggered               |

### Atributos de lazy loading

| Atributo      | Descripción                                       |
| ------------- | ------------------------------------------------- |
| `data-src`    | URL real de la imagen (reemplaza `src` al cargar) |
| `data-srcset` | Srcset real para imágenes responsive              |
| `data-bg-src` | URL de imagen de fondo (para background-image)    |

### Ejemplo de uso en JSX

```tsx
// Animación de entrada con delay
<div data-appear="fade-up" data-delay="200" data-unload="fade-up">
  Contenido animado
</div>

// Imagen lazy
<img
  className="cs-lazy"
  src="/assets/img/null.png"
  data-src="/assets/img/real-image.jpg"
  alt="Descripción"
  loading="lazy"
/>

// Animación staggered en lista
<ul data-stagger-appear="fade-down" data-stagger-delay="75">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
```

---

## Decisiones de arquitectura

### Build tool: Vite en lugar de Create React App

Vite ofrece HMR más rápido, configuración más simple y mejor rendimiento en desarrollo. CRA está en modo mantenimiento y no es recomendado para proyectos nuevos.

### CSS via link tags en lugar de CSS imports

Los archivos CSS se cargan en `index.html` como `<link>` tags en lugar de importarlos en JavaScript. Esto garantiza:

- El orden de carga exacto del sitio original
- Que Vite no procese ni modifique el CSS existente
- Compatibilidad total con los selectores y custom properties existentes

### React Context en lugar de Redux/Zustand

El estado global de la aplicación es simple (menú, scroll, marca activa). React Context con `useState` es suficiente y evita dependencias adicionales. Si la complejidad crece, se puede migrar a Zustand sin cambios en los componentes consumidores.

### React Router v7 con createBrowserRouter

`createBrowserRouter` es la API recomendada en React Router v6+. Permite definir rutas como objetos de configuración, soporta loaders/actions para data fetching futuro, y tiene mejor soporte para error boundaries.

### Lazy loading de páginas con React.lazy

Todas las páginas se cargan bajo demanda con `React.lazy` y `Suspense`. Esto reduce el bundle inicial y mejora el tiempo de carga percibido. El `PageLoader` actúa como fallback durante la carga.

### TypeScript strict mode

El proyecto usa TypeScript con `strict: true`. Esto detecta errores en tiempo de compilación y mejora la experiencia de desarrollo con autocompletado preciso.

### Assets en `public/` en lugar de `src/assets/`

Los assets (CSS, imágenes, fuentes) se ubican en `public/` para que Vite los sirva sin procesamiento. Esto preserva las rutas originales y evita que Vite renombre o transforme los archivos.

---

## Estructura de rutas

```
/                              → HomePage
├── /brands
│   └── /:brandName            → BrandPage (personal|movil|fibra|flow|pay|tienda|smarthome|tech)
├── /sections
│   ├── /templates             → TemplatesPage
│   │   └── #presentaciones    → (hash navigation)
│   │   └── #e-mails
│   │   └── #viva-engage
│   │   └── #hojas-membretadas
│   ├── /audiovisuales         → AudiovisualesPage
│   │   └── #publicidad
│   │   └── #imagenes
│   │   └── #cartelera-interna
│   ├── /recursos              → RecursosPage
│   │   ├── #fuentes
│   │   ├── #iconos
│   │   └── /elementos         → ElementosPage
│   └── /toolkits              → ToolkitsPage
│       ├── /disenar           → DisenarPage
│       └── /redactar          → RedactarPage
├── /mi-firma                  → MiFirmaPage
└── /*                         → NotFoundPage
```

Todas las rutas están envueltas en `Layout` (Header + Outlet) y protegidas por `ErrorBoundary`.

---

## Cómo crear nuevos componentes

Seguir estos patrones para mantener consistencia con el proyecto.

### Componente de página nuevo

```tsx
// src/components/pages/NuevaPagina.tsx
import { useScrollAnimations } from '@/hooks';
import { useLazyLoading } from '@/hooks';
import { useHashNavigation } from '@/hooks';

const NuevaPagina = () => {
  useScrollAnimations();
  useLazyLoading();
  useHashNavigation(80); // 80px offset para el header sticky

  return (
    <div id="nueva-pagina">
      <section id="seccion-1" data-appear="fade-up">
        <h1>Título</h1>
      </section>
    </div>
  );
};

export default NuevaPagina;
```

Agregar la ruta en `src/routes.tsx`:

```tsx
const NuevaPagina = lazy(() => import('./components/pages/NuevaPagina'));

// En el array de children del router:
{
  path: 'nueva-pagina',
  element: withSuspense(<NuevaPagina />),
}
```

### Componente de feature nuevo

```tsx
// src/components/features/NuevoFeature.tsx

interface NuevoFeatureProps {
  title: string;
  href: string;
  delay?: number;
}

export const NuevoFeature: React.FC<NuevoFeatureProps> = ({ title, href, delay = 0 }) => {
  return (
    <div
      className="cs-nuevo-feature"
      data-appear="fade-up"
      data-delay={delay}
      data-unload="fade-up"
    >
      <h3>{title}</h3>
      <a href={href}>Ver más</a>
    </div>
  );
};
```

### Agregar una nueva marca

1. Agregar los datos en `src/data/brands.ts`:

```typescript
{
  id: 'nueva-marca',
  name: 'Nueva Marca',
  slug: 'nueva-marca',
  displayName: 'Nueva Marca',
  color: '#hexcolor',
  logoIso: '/assets/img/ecosistema/nueva-marca/header.svg',
  logoImg: '/assets/img/ecosistema/nueva-marca/header.svg',
  headerImage: '/assets/img/ecosistema/nueva-marca/header.svg',
  description: 'Descripción de la nueva marca.',
  resources: [],
}
```

2. Agregar el CSS de la marca en `public/assets/css/brands/nueva-marca.css`

3. Agregar los assets en `public/assets/img/ecosistema/nueva-marca/`

4. La ruta `/brands/nueva-marca` funciona automáticamente gracias al parámetro dinámico `:brandName`
