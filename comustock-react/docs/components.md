# Component Documentation

Documentación de todos los componentes React de la aplicación ComuStock.

## Tabla de contenidos

- [Layout Components](#layout-components)
  - [Layout](#layout)
  - [Header](#header)
- [Page Components](#page-components)
  - [HomePage](#homepage)
  - [BrandPage](#brandpage)
  - [TemplatesPage](#templatespage)
  - [AudiovisualesPage](#audiovisualespage)
  - [RecursosPage](#recursospage)
  - [ElementosPage](#elementospage)
  - [ToolkitsPage](#toolkitspage)
  - [DisenarPage](#disenarpage)
  - [RedactarPage](#redactarpage)
  - [MiFirmaPage](#mifirmapage)
  - [NotFoundPage](#notfoundpage)
- [Feature Components](#feature-components)
  - [HeroBlock](#heroblock)
  - [BrandSquareButton](#brandsquarebutton)
  - [BentoCard](#bentocard)
  - [BentoGrid](#bentogrid)
  - [PortfolioCard](#portfoliocard)
  - [BrandHeader](#brandheader)
  - [BrandContent](#brandcontent)
  - [BrandResources](#brandresources)
  - [EcosistemaSection](#ecosistemasection)
  - [TemplatesSection](#templatessection)
  - [AudiovisualesSection](#audiovisualessection)
  - [RecursosSection](#recursossection)
  - [ToolkitsSection](#toolkitssection)
- [UI Components](#ui-components)
  - [PageLoader](#pageloader)
- [Context](#context)
  - [AppContext / AppProvider](#appcontext--appprovider)
- [Error Handling](#error-handling)
  - [ErrorBoundary](#errorboundary)

---

## Layout Components

### Layout

**Archivo:** `src/components/layout/Layout.tsx`

Componente raíz de layout que envuelve todas las páginas. Contiene el `Header` y provee el `<Outlet />` de React Router para el contenido de cada página.

**Props:** ninguna

**Características:**

- Skip link para navegación por teclado (accesibilidad)
- `<main>` con `role="main"` e `id="cs-main"`
- Integra `Header` en la parte superior

**Uso:**

```tsx
// Usado automáticamente como elemento raíz en routes.tsx
// No se instancia directamente
```

**Estructura HTML generada:**

```html
<div class="app-layout">
  <a href="#cs-main" class="cs-skip-link">Saltar al contenido principal</a>
  <header id="cs-header">...</header>
  <main id="cs-main" role="main">
    <!-- Contenido de la página activa -->
  </main>
</div>
```

---

### Header

**Archivo:** `src/components/layout/Header.tsx`

Header principal con comportamiento sticky, efecto frosted glass, navegación desktop/mobile y toggle de menú.

**Props:** ninguna (usa `AppContext` y `useStickyHeader`)

**Características:**

- Sticky header: aplica clase `is-sticky` al hacer scroll más de 100px
- Efecto frosted glass: clase `is-frosted` siempre activa
- Toggle de menú mobile con estado en `AppContext`
- Submenús en desktop (hover) y mobile (click)
- Animación de entrada: `data-appear="fade-down"`
- Logo con link a la home

**Clases CSS aplicadas:**

- `is-frosted` — siempre presente
- `is-sticky` — cuando `scrollPosition > 100`

**Uso:**

```tsx
// Incluido automáticamente en Layout.tsx
<Header />
```

**Navegación incluida:**

| Ítem          | Tipo     | Submenú                                                           |
| ------------- | -------- | ----------------------------------------------------------------- |
| Ecosistema    | Dropdown | Personal, Móvil, Fibra, Flow, Pay, Tienda, Smarthome, Tech        |
| Templates     | Dropdown | Presentaciones, E-mails, Viva Engage, Hojas membretadas, Tu firma |
| Audiovisuales | Dropdown | Publicidad, Imágenes, Cartelera interna                           |
| Recursos      | Dropdown | Fuentes, Íconos, Elementos                                        |
| Toolkits      | Dropdown | Cómo diseñar, Cómo redactar                                       |

---

## Page Components

Todos los page components se cargan de forma lazy (code splitting). Se envuelven automáticamente en `<Suspense>` con `<PageLoader />` como fallback.

### HomePage

**Archivo:** `src/components/pages/HomePage.tsx`

Página principal que compone todas las secciones de la home.

**Props:** ninguna

**Hooks usados:** `useScrollAnimations`, `useLazyLoading`

**Secciones incluidas (en orden):**

1. `HeroBlock` — Video hero
2. `EcosistemaSection` — Grid de marcas
3. `TemplatesSection` — Bento grid de templates
4. `AudiovisualesSection` — Grid de portfolio
5. `RecursosSection` — Recursos de diseño
6. `ToolkitsSection` — Toolkits

**Uso:**

```tsx
// Ruta: /
<HomePage />
```

---

### BrandPage

**Archivo:** `src/components/pages/BrandPage.tsx`

Página dinámica para cada una de las 8 marcas del ecosistema. Lee el parámetro `brandName` de la URL.

**Props:** ninguna (lee `useParams`)

**Hooks usados:** `useBrandStyles`, `useScrollAnimations`, `useLazyLoading`

**Comportamiento:**

- Si `brandName` no existe en los datos, renderiza `NotFoundPage`
- Carga dinámicamente el CSS de la marca
- Compone `BrandHeader`, `BrandContent` y `BrandResources`

**Uso:**

```tsx
// Ruta: /brands/:brandName
// Ejemplos: /brands/personal, /brands/flow, /brands/tech
<BrandPage />
```

---

### TemplatesPage

**Archivo:** `src/components/pages/TemplatesPage.tsx`

Página de templates con secciones para cada tipo de template.

**Props:** ninguna

**Hooks usados:** `useScrollAnimations`, `useLazyLoading`, `useHashNavigation`

**Secciones con IDs para hash navigation:**

- `#presentaciones`
- `#e-mails`
- `#viva-engage`
- `#hojas-membretadas`

**Uso:**

```tsx
// Ruta: /sections/templates
// Con hash: /sections/templates#presentaciones
<TemplatesPage />
```

---

### AudiovisualesPage

**Archivo:** `src/components/pages/AudiovisualesPage.tsx`

Página de recursos audiovisuales con secciones para publicidad, imágenes y cartelera.

**Props:** ninguna

**Hooks usados:** `useScrollAnimations`, `useLazyLoading`, `useHashNavigation`

**Secciones con IDs:**

- `#publicidad`
- `#imagenes`
- `#cartelera-interna`

**Uso:**

```tsx
// Ruta: /sections/audiovisuales
<AudiovisualesPage />
```

---

### RecursosPage

**Archivo:** `src/components/pages/RecursosPage.tsx`

Página de recursos de diseño (fuentes, íconos).

**Props:** ninguna

**Secciones con IDs:**

- `#fuentes`
- `#iconos`

**Uso:**

```tsx
// Ruta: /sections/recursos
<RecursosPage />
```

---

### ElementosPage

**Archivo:** `src/components/pages/ElementosPage.tsx`

Sub-sección de recursos: elementos de diseño descargables.

**Props:** ninguna

**Uso:**

```tsx
// Ruta: /sections/recursos/elementos
<ElementosPage />
```

---

### ToolkitsPage

**Archivo:** `src/components/pages/ToolkitsPage.tsx`

Página principal de toolkits con cards para cada toolkit disponible.

**Props:** ninguna

**Uso:**

```tsx
// Ruta: /sections/toolkits
<ToolkitsPage />
```

---

### DisenarPage

**Archivo:** `src/components/pages/DisenarPage.tsx`

Toolkit de diseño: guías y recursos para diseñar comunicaciones.

**Props:** ninguna

**Uso:**

```tsx
// Ruta: /sections/toolkits/disenar
<DisenarPage />
```

---

### RedactarPage

**Archivo:** `src/components/pages/RedactarPage.tsx`

Toolkit de redacción: guías y recursos para redactar comunicaciones.

**Props:** ninguna

**Uso:**

```tsx
// Ruta: /sections/toolkits/redactar
<RedactarPage />
```

---

### MiFirmaPage

**Archivo:** `src/components/pages/MiFirmaPage.tsx`

Generador de firma de e-mail corporativa con formulario, preview y funcionalidad de copia.

**Props:** ninguna

**Características:**

- Formulario con validación
- Preview en tiempo real de la firma
- Copia al portapapeles

**Uso:**

```tsx
// Ruta: /mi-firma
<MiFirmaPage />
```

---

### NotFoundPage

**Archivo:** `src/components/pages/NotFoundPage.tsx`

Página 404 para rutas no encontradas.

**Props:** ninguna

**Uso:**

```tsx
// Ruta: * (catch-all)
// También renderizado por BrandPage cuando la marca no existe
<NotFoundPage />
```

---

## Feature Components

### HeroBlock

**Archivo:** `src/components/features/HeroBlock.tsx`

Sección hero con video de fondo. Incluye versión desktop y mobile con lazy loading.

**Props:** ninguna

**Características:**

- Video desktop: `home.mp4` con link a `/brands/personal`
- Video mobile: `home-mobile.mp4` (sin link)
- Lazy loading: los videos solo cargan cuando el hero entra al viewport
- Poster images para el estado de carga
- Animación: `data-appear="fade-right"`, `data-unload="fade-left"`
- Atributos de video: `autoPlay`, `muted`, `loop`, `playsInline`

**Clases CSS:** `cs-hero-block`, `cs-hero-type03`, `cs-masked-block`, `cs-hero-media`

**Uso:**

```tsx
<HeroBlock />
```

---

### BrandSquareButton

**Archivo:** `src/components/features/BrandSquareButton.tsx`

Botón cuadrado con logo de marca para la sección Ecosistema. Navega a la página de la marca.

**Props:**

```typescript
interface BrandSquareButtonProps {
  brandName: string; // Nombre de display (ej: "Personal")
  brandSlug: string; // Slug para la URL (ej: "personal")
  logoIso: React.ReactNode; // SVG del isotipo de la marca
  logoImg: React.ReactNode; // SVG del logo completo de la marca
  delay?: number; // Delay de animación en ms (default: 0)
}
```

**Características:**

- Renderiza como `<Link to="/brands/{brandSlug}">`
- Animación zoom-in al entrar, zoom-out al salir
- Clase CSS dinámica: `logo-wrapper {brandSlug}`

**Uso:**

```tsx
<BrandSquareButton
  brandName="Personal"
  brandSlug="personal"
  logoIso={<svg>...</svg>}
  logoImg={<svg>...</svg>}
  delay={200}
/>
```

---

### BentoCard

**Archivo:** `src/components/features/BentoCard.tsx`

Card para el grid bento con imagen de fondo lazy-loaded. Usado en la sección Templates.

**Props:**

```typescript
interface BentoCardData {
  title: string; // Título de la card (requerido)
  subtitle?: string; // Subtítulo/descripción (opcional)
  href: string; // URL de destino
  imageSrc: string; // Ruta de la imagen de fondo
  size: 'small' | 'medium' | 'large'; // Variante de tamaño
  icon: string; // Nombre del ícono (ej: "presentation")
  delay?: number; // Delay de animación en ms (default: 0)
}
```

**Características:**

- Tres variantes de tamaño: `small`, `medium`, `large`
- Imagen de fondo lazy-loaded via `data-bg-src`
- Heading dinámico: `h3` para `large`, `h4` para `small`/`medium`
- Animación: `fade-right` para large, `fade-left` para small/medium

**Clases CSS:** `cs-masked-block`, `cs-bento-hero-media`, `cs-masked-media`

**Uso:**

```tsx
<BentoCard
  title="Presentaciones"
  subtitle="Tus ideas en primer plano."
  href="/sections/templates#presentaciones"
  imageSrc="/assets/img/home/templates/presentaciones.jpg"
  size="large"
  icon="presentation"
  delay={0}
/>
```

---

### BentoGrid

**Archivo:** `src/components/features/BentoGrid.tsx`

Contenedor grid para múltiples `BentoCard`. Aplica el layout bento-box.

**Props:**

```typescript
interface BentoGridProps {
  cards: BentoCardData[]; // Array de datos de cards
}
```

**Clases CSS:** `cs-bento-grid`, `stg-bottom-gap`

**Uso:**

```tsx
<BentoGrid
  cards={[
    {
      title: 'Presentaciones',
      href: '/sections/templates#presentaciones',
      imageSrc: '/assets/img/home/templates/presentaciones.jpg',
      size: 'large',
      icon: 'presentation',
      delay: 0,
    },
    {
      title: 'E-mails',
      href: '/sections/templates#e-mails',
      imageSrc: '/assets/img/home/templates/e-mails.jpg',
      size: 'small',
      icon: 'email',
      delay: 300,
    },
  ]}
/>
```

---

### PortfolioCard

**Archivo:** `src/components/features/PortfolioCard.tsx`

Card para la sección Audiovisuales con estructura masked block, imagen lazy-loaded y overlay de link.

**Props:**

```typescript
interface PortfolioCardProps {
  title: string; // Título de la card (requerido)
  description: string; // Descripción (requerido)
  imageSrc: string; // Ruta de la imagen lazy-loaded
  href: string; // URL de destino del link overlay
  aspectRatio?: string; // CSS aspect-ratio (default: "2 / 3")
  delay?: number; // data-delay para animación del bloque interno
}
```

**Características:**

- Imagen lazy-loaded con `cs-lazy` y `data-src`
- Estructura masked block: `cs-masked-block`, `cs-grid-more-masked`
- Link overlay en esquina inferior derecha con ícono plus
- Aspect ratio configurable para el contenedor de imagen

**Uso:**

```tsx
<PortfolioCard
  title="Publicidad"
  description="Lanzamientos, cartelería, banners, imágenes."
  imageSrc="/assets/img/home/audiovisuales/publicidad.jpg"
  href="/sections/audiovisuales#publicidad"
  aspectRatio="2 / 3"
  delay={0}
/>
```

---

### BrandHeader

**Archivo:** `src/components/features/BrandHeader.tsx`

Sección hero de la página de marca con la imagen SVG del header de la marca.

**Props:**

```typescript
interface BrandHeaderProps {
  brand: Brand; // Objeto de datos de la marca
}
```

**Características:**

- Muestra `brand.headerImage` (SVG del header de la marca)
- Animaciones: `data-appear="fade-up"`, `data-unload="zoom-out"`
- Estructura: `#banner > .brand-top > #banner-section > .cs-hero-block`

**Uso:**

```tsx
<BrandHeader brand={brandData} />
```

---

### BrandContent

**Archivo:** `src/components/features/BrandContent.tsx`

Área de contenido principal de la página de marca. Muestra nombre y descripción de la marca, o acepta children para contenido personalizado.

**Props:**

```typescript
interface BrandContentProps {
  brand: Brand; // Objeto de datos de la marca
  children?: React.ReactNode; // Contenido personalizado (opcional)
}
```

**Uso:**

```tsx
// Con contenido por defecto (nombre + descripción)
<BrandContent brand={brandData} />

// Con contenido personalizado
<BrandContent brand={brandData}>
  <CustomSection />
</BrandContent>
```

---

### BrandResources

**Archivo:** `src/components/features/BrandResources.tsx`

Grid de recursos descargables de la marca (logos, lineamientos, assets).

**Props:**

```typescript
interface BrandResourcesProps {
  brand: Brand; // Objeto de datos de la marca (usa brand.resources)
}
```

**Características:**

- Renderiza `null` si `brand.resources` está vacío
- Cada recurso muestra: preview image (lazy-loaded), tipo, título, descripción y botón de descarga
- Tipos de recurso: `logo`, `guideline`, `asset`
- Animaciones staggered: `data-stagger-appear="fade-up"`

**Uso:**

```tsx
<BrandResources brand={brandData} />
```

---

### EcosistemaSection

**Archivo:** `src/components/features/EcosistemaSection.tsx`

Sección del ecosistema de marcas en la home. Grid de `BrandSquareButton` para las 8 marcas.

**Props:** ninguna

**Uso:**

```tsx
<EcosistemaSection />
```

---

### TemplatesSection

**Archivo:** `src/components/features/TemplatesSection.tsx`

Sección de templates en la home. Usa `BentoGrid` con las cards de templates.

**Props:** ninguna

**Uso:**

```tsx
<TemplatesSection />
```

---

### AudiovisualesSection

**Archivo:** `src/components/features/AudiovisualesSection.tsx`

Sección de audiovisuales en la home. Grid de `PortfolioCard`.

**Props:** ninguna

**Uso:**

```tsx
<AudiovisualesSection />
```

---

### RecursosSection

**Archivo:** `src/components/features/RecursosSection.tsx`

Sección de recursos en la home con bloques de contenido para fuentes, íconos y elementos.

**Props:** ninguna

**Uso:**

```tsx
<RecursosSection />
```

---

### ToolkitsSection

**Archivo:** `src/components/features/ToolkitsSection.tsx`

Sección de toolkits en la home con cards para cada toolkit disponible.

**Props:** ninguna

**Uso:**

```tsx
<ToolkitsSection />
```

---

## UI Components

### PageLoader

**Archivo:** `src/components/ui/PageLoader.tsx`

Spinner de carga de página completa. Usado como fallback de `<Suspense>` mientras se cargan los componentes lazy.

**Props:** ninguna

**Características:**

- `role="status"` y `aria-label` para accesibilidad
- Spinner animado con CSS keyframes
- Altura mínima de 60vh para centrado visual

**Uso:**

```tsx
// Usado automáticamente en routes.tsx como fallback de Suspense
<Suspense fallback={<PageLoader />}>
  <LazyComponent />
</Suspense>
```

---

## Context

### AppContext / AppProvider

**Archivo:** `src/contexts/AppContext.tsx`

Contexto global de la aplicación. Gestiona el estado compartido entre componentes.

**Estado (`AppState`):**

```typescript
interface AppState {
  isMobileMenuOpen: boolean; // Estado del menú mobile
  currentBrand: string | null; // Marca activa (slug)
  scrollPosition: number; // Posición de scroll actual en px
  isHeaderSticky: boolean; // Si el header está en modo sticky
}
```

**Acciones disponibles:**

```typescript
actions.toggleMobileMenu(); // Abre/cierra el menú mobile
actions.setCurrentBrand(brand | null); // Establece la marca activa
actions.updateScrollPosition(position); // Actualiza scroll y sticky state
```

**Uso:**

```tsx
// Proveer el contexto (ya incluido en Layout.tsx)
<AppProvider>
  <App />
</AppProvider>;

// Consumir el contexto en cualquier componente hijo
import { useAppContext } from '@/contexts/AppContext';

const MyComponent = () => {
  const { state, actions } = useAppContext();

  return (
    <button onClick={actions.toggleMobileMenu}>
      {state.isMobileMenuOpen ? 'Cerrar' : 'Abrir'} menú
    </button>
  );
};
```

**Nota:** `useAppContext` lanza un error si se usa fuera de `AppProvider`.

---

## Error Handling

### ErrorBoundary

**Archivo:** `src/components/ErrorBoundary.tsx`

Class component que captura errores de renderizado en el árbol de componentes hijo y muestra una UI de fallback en lugar de crashear la aplicación.

**Props:**

```typescript
interface ErrorBoundaryProps {
  children: React.ReactNode;
}
```

**Uso:**

```tsx
// Usado automáticamente en routes.tsx como wrapper del Layout
<ErrorBoundary>
  <Layout />
</ErrorBoundary>
```

---

## Datos de marcas

### Brand interface

**Archivo:** `src/data/brands.ts`

```typescript
interface Brand {
  id: string; // Identificador único
  name: string; // Nombre corto
  slug: string; // Slug para URL (ej: "personal")
  displayName: string; // Nombre de display
  color: string; // Color primario hex
  logoIso: string; // Ruta al SVG del isotipo
  logoImg: string; // Ruta al SVG del logo completo
  headerImage: string; // Ruta a la imagen del header
  description: string; // Descripción de la marca
  resources: BrandResource[]; // Recursos descargables
}

interface BrandResource {
  type: 'logo' | 'guideline' | 'asset'; // Tipo de recurso
  title: string; // Título del recurso
  description?: string; // Descripción opcional
  downloadUrl: string; // URL de descarga
  previewUrl?: string; // URL de preview (opcional)
}
```

**Funciones exportadas:**

```typescript
getBrandBySlug(slug: string): Brand | undefined
getAllBrands(): Brand[]
```

**Marcas disponibles:** `personal`, `movil`, `fibra`, `flow`, `pay`, `tienda`, `smarthome`, `tech`
