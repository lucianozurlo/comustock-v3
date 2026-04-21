# ComuStock React

Portal de recursos de marca corporativa construido con React, TypeScript y Vite. Este proyecto es una migración del sitio HTML estático original a una aplicación React moderna que preserva completamente la experiencia de usuario existente.

## Tabla de contenidos

- [Descripción del proyecto](#descripción-del-proyecto)
- [Prerrequisitos](#prerrequisitos)
- [Instalación](#instalación)
- [Flujo de desarrollo](#flujo-de-desarrollo)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Estrategia de carga de CSS](#estrategia-de-carga-de-css)
- [Deployment](#deployment)
- [Variables de entorno](#variables-de-entorno)
- [Troubleshooting](#troubleshooting)

---

## Descripción del proyecto

ComuStock es el portal interno de recursos de marca corporativa. Centraliza lineamientos de identidad visual, templates, audiovisuales, recursos tipográficos y toolkits para los equipos de comunicación.

La aplicación React replica exactamente la experiencia del sitio HTML original, incorporando:

- Routing client-side con React Router v7
- Animaciones de scroll con IntersectionObserver
- Lazy loading de imágenes y videos
- Carga dinámica de CSS por marca
- Header sticky con efecto frosted glass
- Navegación con submenús en desktop y mobile
- Generador de firma de e-mail

**Stack tecnológico:**

| Herramienta      | Versión | Propósito               |
| ---------------- | ------- | ----------------------- |
| React            | 19.x    | UI library              |
| TypeScript       | 6.x     | Type safety             |
| Vite             | 8.x     | Build tool y dev server |
| React Router DOM | 7.x     | Client-side routing     |
| classnames       | 2.x     | Conditional CSS classes |
| web-vitals       | 5.x     | Performance monitoring  |

---

## Prerrequisitos

- **Node.js** 18.0 o superior
- **npm** 9.0 o superior

Verificar versiones instaladas:

```bash
node --version
npm --version
```

---

## Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd comustock-react

# Instalar dependencias
npm install
```

---

## Flujo de desarrollo

### Servidor de desarrollo

```bash
npm run dev
```

Inicia el servidor en [http://localhost:3000](http://localhost:3000) con hot reload automático.

### Build de producción

```bash
npm run build
```

Ejecuta la verificación de tipos TypeScript y genera los archivos optimizados en `dist/`.

### Preview del build

```bash
npm run preview
```

Sirve el build de producción localmente para verificar antes de deployar.

### Linting

```bash
npm run lint          # Verificar errores
npm run lint:fix      # Corregir automáticamente
```

### Formateo de código

```bash
npm run format        # Formatear con Prettier
npm run format:check  # Verificar formato sin modificar
```

### Tests

```bash
npm run test          # Ejecutar suite de tests
```

### Deploy

```bash
npm run deploy:netlify   # Build + deploy a producción en Netlify
npm run deploy:preview   # Build + deploy a preview en Netlify
```

---

## Estructura del proyecto

```
comustock-react/
├── public/                          # Assets estáticos (servidos sin procesar)
│   └── assets/
│       ├── css/                     # Hojas de estilo
│       │   ├── config.css           # Variables CSS y configuración global
│       │   ├── libs.css             # Estilos de librerías externas
│       │   ├── style.css            # Estilos base y tipografía
│       │   ├── base.css             # Estilos de layout y estructura
│       │   ├── content.css          # Estilos específicos de contenido
│       │   ├── responsive.css       # Media queries principales
│       │   ├── resp-cs.css          # Media queries personalizadas
│       │   └── brands/              # CSS específico por marca
│       │       ├── personal.css
│       │       ├── movil.css
│       │       ├── fibra.css
│       │       ├── flow.css
│       │       ├── pay.css
│       │       ├── tienda.css
│       │       ├── smarthome.css
│       │       └── tech.css
│       ├── fonts/                   # Familia tipográfica Pulso
│       │   ├── Pulso-Bold.*         # Formatos: .ttf, .woff, .woff2
│       │   ├── Pulso-Light.*
│       │   └── Pulso-Regular.*
│       └── img/                     # Imágenes y media
│           ├── ecosistema/          # Imágenes por marca
│           ├── home/                # Assets de la home (videos, posters)
│           ├── templates/           # Imágenes de templates
│           ├── audiovisuales/       # Imágenes de audiovisuales
│           ├── recursos/            # Imágenes de recursos
│           └── toolkits/            # Imágenes de toolkits
├── src/
│   ├── components/
│   │   ├── layout/                  # Componentes de layout
│   │   │   ├── Header.tsx           # Header con sticky y menú mobile
│   │   │   └── Layout.tsx           # Wrapper raíz con Outlet
│   │   ├── pages/                   # Componentes de página (lazy-loaded)
│   │   │   ├── HomePage.tsx
│   │   │   ├── BrandPage.tsx
│   │   │   ├── TemplatesPage.tsx
│   │   │   ├── AudiovisualesPage.tsx
│   │   │   ├── RecursosPage.tsx
│   │   │   ├── ElementosPage.tsx
│   │   │   ├── ToolkitsPage.tsx
│   │   │   ├── DisenarPage.tsx
│   │   │   ├── RedactarPage.tsx
│   │   │   ├── MiFirmaPage.tsx
│   │   │   └── NotFoundPage.tsx
│   │   ├── features/                # Componentes de funcionalidad
│   │   │   ├── HeroBlock.tsx
│   │   │   ├── BrandSquareButton.tsx
│   │   │   ├── BentoCard.tsx
│   │   │   ├── BentoGrid.tsx
│   │   │   ├── PortfolioCard.tsx
│   │   │   ├── BrandHeader.tsx
│   │   │   ├── BrandContent.tsx
│   │   │   ├── BrandResources.tsx
│   │   │   ├── EcosistemaSection.tsx
│   │   │   ├── TemplatesSection.tsx
│   │   │   ├── AudiovisualesSection.tsx
│   │   │   ├── RecursosSection.tsx
│   │   │   └── ToolkitsSection.tsx
│   │   └── ui/                      # Componentes UI reutilizables
│   │       └── PageLoader.tsx
│   ├── contexts/
│   │   └── AppContext.tsx            # Estado global (menú, scroll, marca activa)
│   ├── data/
│   │   └── brands.ts                # Datos y tipos de las 8 marcas
│   ├── hooks/                       # Custom hooks
│   │   ├── useScrollAnimations.ts
│   │   ├── useLazyLoading.ts
│   │   ├── useStickyHeader.ts
│   │   ├── useHashNavigation.ts
│   │   ├── useBrandStyles.ts
│   │   └── index.ts
│   ├── utils/
│   │   └── reportWebVitals.ts       # Métricas de performance
│   ├── routes.tsx                   # Definición de rutas con lazy loading
│   ├── App.tsx                      # Componente raíz
│   └── main.tsx                     # Entry point
├── docs/                            # Documentación adicional
│   ├── components.md                # Documentación de componentes
│   ├── hooks.md                     # Documentación de custom hooks
│   ├── migration.md                 # Mapeo HTML → React
│   ├── cross-browser-compatibility.md
│   ├── image-optimization.md
│   ├── lighthouse-audit.md
│   └── responsive-design.md
├── index.html                       # Template HTML con links CSS
├── vite.config.ts                   # Configuración de Vite
├── netlify.toml                     # Configuración de deploy en Netlify
├── vercel.json                      # Configuración de deploy en Vercel
├── tsconfig.json                    # Configuración TypeScript
├── eslint.config.js                 # Configuración ESLint
├── .prettierrc                      # Configuración Prettier
└── package.json                     # Dependencias y scripts
```

---

## Estrategia de carga de CSS

El proyecto usa **CSS via link tags** en `index.html` en lugar de importar CSS en JavaScript. Esto preserva el comportamiento del sitio HTML original y garantiza el orden de carga correcto.

### Orden de carga

Los archivos CSS se cargan en este orden específico:

1. `config.css` — Variables CSS y custom properties globales
2. `libs.css` — Estilos de librerías externas
3. `style.css` — Estilos base y tipografía
4. `base.css` — Layout y estructura
5. `content.css` — Estilos específicos de contenido
6. `responsive.css` — Media queries principales
7. `resp-cs.css` — Media queries personalizadas

```html
<!-- index.html -->
<link rel="stylesheet" href="/assets/css/config.css" />
<link rel="stylesheet" href="/assets/css/libs.css" />
<link rel="stylesheet" href="/assets/css/style.css" />
<link rel="stylesheet" href="/assets/css/base.css" />
<link rel="stylesheet" href="/assets/css/content.css" />
<link rel="stylesheet" href="/assets/css/responsive.css" />
<link rel="stylesheet" href="/assets/css/resp-cs.css" />
```

### CSS de marcas (carga dinámica)

Los estilos de cada marca se cargan dinámicamente al navegar a una página de marca, usando el hook `useBrandStyles`. Se inyecta un `<link>` en el `<head>` al montar el componente y se elimina al desmontar, evitando conflictos entre marcas.

```tsx
// En BrandPage.tsx
useBrandStyles('personal'); // Carga /assets/css/brands/personal.css
```

### Por qué link tags en lugar de CSS imports

- Garantiza el orden de carga exacto del sitio original
- Mantiene los archivos CSS separados en DevTools para debugging
- Permite cache individual por archivo
- Evita que Vite procese o modifique el CSS existente
- Reduce el riesgo de cambios visuales no intencionados durante la migración

---

## Deployment

### Netlify

El proyecto incluye `netlify.toml` con configuración lista para usar:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

La regla de redirect es esencial para el SPA routing: todas las rutas sirven `index.html` y React Router maneja la navegación client-side.

**Deploy manual:**

```bash
npm run deploy:netlify   # Deploy a producción
npm run deploy:preview   # Deploy a preview URL
```

**Deploy automático:** Conectar el repositorio en el dashboard de Netlify. Cada push a `main` dispara un deploy automático.

### Vercel

El proyecto incluye `vercel.json` con configuración lista:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Deploy:**

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Otros proveedores (AWS S3, GitHub Pages, Nginx)

El build genera archivos estáticos en `dist/`. Cualquier servidor de archivos estáticos funciona, con la condición de configurar el fallback a `index.html` para todas las rutas.

**Ejemplo Nginx:**

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

---

## Variables de entorno

Copiar `.env.example` a `.env.local` para desarrollo local:

```bash
cp .env.example .env.local
```

Variables disponibles:

```env
VITE_APP_TITLE=ComuStock
VITE_APP_VERSION=1.0.0
```

Todas las variables deben tener el prefijo `VITE_` para ser accesibles en el código:

```typescript
const title = import.meta.env.VITE_APP_TITLE;
```

**Importante:** No commitear `.env.local` ni archivos con valores reales. Solo commitear `.env.example` con valores de ejemplo.

---

## Troubleshooting

### Los estilos no se aplican correctamente

Verificar que los archivos CSS estén en `public/assets/css/` y que las rutas en `index.html` sean correctas. Los archivos CSS deben estar en la carpeta `public/` para ser servidos sin procesamiento por Vite.

### Las imágenes no cargan

Las rutas de imágenes deben comenzar con `/assets/` (ruta absoluta desde `public/`):

```tsx
// Correcto
<img src="/assets/img/logo-comustock.svg" />

// Incorrecto
<img src="assets/img/logo-comustock.svg" />
<img src="./assets/img/logo-comustock.svg" />
```

### El servidor de desarrollo no inicia

1. Verificar que el puerto 3000 no esté en uso: `lsof -i :3000`
2. Eliminar `node_modules` y reinstalar: `rm -rf node_modules && npm install`
3. Limpiar cache de Vite: `rm -rf .vite`

### El build falla

1. Ejecutar `npm run lint` para identificar errores de TypeScript/ESLint
2. Verificar que todas las importaciones sean correctas
3. Revisar la consola para errores específicos de TypeScript

### Las animaciones no funcionan

Las animaciones requieren que los elementos tengan el atributo `data-appear` y que el hook `useScrollAnimations` esté activo en el componente padre. Verificar que el hook se llame en el componente de página correspondiente.

### El CSS de una marca no carga

El hook `useBrandStyles` requiere que el archivo exista en `public/assets/css/brands/{brandName}.css`. Verificar que el slug de la marca coincida exactamente con el nombre del archivo.

### Las rutas muestran 404 en producción

Verificar que el servidor esté configurado para redirigir todas las rutas a `index.html`. Ver la sección [Deployment](#deployment) para configuraciones específicas por proveedor.

### Los videos no reproducen en mobile

Los videos requieren los atributos `muted`, `playsInline` y `autoPlay` para reproducción automática en iOS. Verificar que el componente `HeroBlock` incluya todos estos atributos.

---

## Documentación adicional

- **[docs/components.md](./docs/components.md)** — Documentación de todos los componentes
- **[docs/hooks.md](./docs/hooks.md)** — Documentación de custom hooks
- **[docs/migration.md](./docs/migration.md)** — Mapeo HTML → React y decisiones de arquitectura
- **[docs/lighthouse-audit.md](./docs/lighthouse-audit.md)** — Resultados de auditoría Lighthouse
- **[docs/responsive-design.md](./docs/responsive-design.md)** — Testing de diseño responsive
- **[docs/cross-browser-compatibility.md](./docs/cross-browser-compatibility.md)** — Compatibilidad cross-browser
- **[docs/image-optimization.md](./docs/image-optimization.md)** — Optimización de imágenes

---

## Convenciones de código

### Estructura de componentes

```tsx
import React from 'react';

interface ComponentProps {
  prop1: string;
  prop2?: number;
}

const Component: React.FC<ComponentProps> = ({ prop1, prop2 = 0 }) => {
  // 1. Hooks
  // 2. Event handlers
  // 3. Render

  return <div className="component-class">{/* JSX */}</div>;
};

export default Component;
```

### Convenciones de clases CSS

- `cs-*` — Clases del sistema ComuStock
- `is-*` — Estados (is-active, is-open, is-sticky)
- `has-*` — Modificadores (has-submenu, has-icon)
- `stg-*` — Clases de grid y espaciado

### Nomenclatura de archivos

- **Componentes**: PascalCase (`HomePage.tsx`, `BrandPage.tsx`)
- **Hooks**: camelCase con prefijo `use` (`useScrollAnimations.ts`)
- **Utilidades**: camelCase (`reportWebVitals.ts`)
- **Tipos/Interfaces**: PascalCase (`Brand`, `BentoCardData`)

### Commits

Seguir [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — Nueva funcionalidad
- `fix:` — Corrección de bug
- `docs:` — Cambios en documentación
- `style:` — Cambios de formato
- `refactor:` — Refactorización
- `test:` — Tests
- `chore:` — Build, dependencias
