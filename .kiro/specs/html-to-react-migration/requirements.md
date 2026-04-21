# Requirements Document

## Introduction

Este documento define los requisitos para migrar un sitio web estático HTML existente a una aplicación ReactJS moderna. El objetivo principal es transformar el sitio HTML actual (ComuStock) en una aplicación React dinámica que preserve exactamente la misma experiencia de usuario, manteniendo toda la funcionalidad, estilos visuales, interacciones y estructura de contenido del sitio original.

El sitio actual es un portal de recursos de marca corporativa que incluye múltiples secciones (ecosistema de marcas, templates, audiovisuales, recursos, toolkits), navegación compleja con menús desplegables, animaciones, modales, formularios y assets organizados por categorías de marca (fibra, flow, movil, pay, personal, smarthome, tech, tienda).

La arquitectura implementada es una **SPA híbrida**: la página principal y el layout compartido se construyen con componentes React nativos, mientras que las páginas de sección y de marca utilizan un patrón de **fetch-and-render** que obtiene los archivos HTML originales y los inyecta en el DOM.

## Glossary

- **HTML_Site**: El sitio web estático actual construido con HTML, CSS y JavaScript vanilla
- **React_Application**: La nueva aplicación web construida con ReactJS que reemplazará al HTML_Site
- **Component**: Un elemento reutilizable de React que encapsula estructura, lógica y estilos
- **Asset**: Cualquier recurso estático (imágenes, fuentes, videos, archivos CSS) utilizado en el sitio
- **Brand**: Una de las marcas del ecosistema (fibra, flow, movil, pay, personal, smarthome, tech, tienda)
- **User_Experience**: La experiencia completa del usuario incluyendo apariencia visual, interacciones, navegación y comportamiento
- **Style_System**: El conjunto de archivos CSS y reglas de estilo que definen la apariencia visual
- **Navigation_Structure**: La jerarquía y organización de páginas, secciones y enlaces del sitio
- **Interactive_Element**: Cualquier elemento que responde a acciones del usuario (botones, menús, modales, formularios)
- **Animation**: Efectos visuales y transiciones aplicados a elementos del sitio
- **Route**: Una URL o path específico dentro de la aplicación React
- **HtmlPage**: Componente React genérico que obtiene un archivo HTML estático, extrae su contenido principal y lo inyecta en el DOM mediante `dangerouslySetInnerHTML`
- **BrandPage**: Variante especializada de HtmlPage para páginas de marca; extrae `#banner` y `.brands-container` y carga el CSS específico de la marca
- **Layout_Shell**: El conjunto de componentes React (Header, Footer, contenedor principal) que envuelven todas las páginas de la aplicación

## Requirements

### Requirement 1: Arquitectura Híbrida de Renderizado

**User Story:** Como desarrollador, quiero que la aplicación React use una estrategia de renderizado diferenciada según el tipo de página, para que la página principal sea un componente React nativo y el resto de las páginas preserven fidelidad visual exacta con el HTML original.

#### Acceptance Criteria

1. THE React_Application SHALL implementar un Layout_Shell compartido con Header y Footer como componentes React nativos que envuelven todas las páginas
2. THE React_Application SHALL construir la página principal (HomePage) completamente con componentes React nativos (HeroBlock, TemplatesSection, AudiovisualesSection, RecursosSection, ToolkitsSection)
3. WHEN un usuario navega a una página de sección (`/sections/*`), THE React_Application SHALL utilizar el componente HtmlPage para obtener el archivo HTML original desde `/public/sections/` e inyectar su contenido en el DOM
4. WHEN un usuario navega a una página de marca (`/brands/:brandName`), THE React_Application SHALL utilizar el componente BrandPage para obtener el archivo HTML original desde `/public/brands/` e inyectar los bloques `#banner` y `.brands-container` en el DOM
5. THE HtmlPage SHALL extraer el contenido del selector `#cs-main .stg-container` del archivo HTML obtenido, eliminando el footer interno del HTML original
6. THE BrandPage SHALL extraer tanto el bloque `#banner` como el bloque `#cs-main .stg-container` del archivo HTML de la marca
7. WHEN el HtmlPage o BrandPage obtiene el HTML, THE React_Application SHALL corregir las rutas relativas (`../assets/` → `/assets/`) y los links internos (`.html` → rutas React Router) antes de inyectar el contenido
8. WHILE el HtmlPage o BrandPage está obteniendo el HTML, THE React_Application SHALL mostrar un spinner de carga al usuario

### Requirement 2: Preservación de Estilos CSS

**User Story:** Como diseñador, quiero que todos los estilos CSS existentes se mantengan intactos en la aplicación React, para que la apariencia visual sea idéntica al sitio HTML original.

#### Acceptance Criteria

1. THE React_Application SHALL cargar todos los archivos CSS del Style_System mediante tags `<link>` en `index.html`, sin importaciones en JavaScript
2. THE React_Application SHALL mantener el orden de carga de archivos CSS idéntico al HTML_Site: `config.css`, `libs.css`, `stg.css`, `style.css`, `base.css`, `content.css`, `sections.css`, `brands.css`, `responsive.css`, `resp-cs.css`
3. WHEN un Component React se renderiza, THE React_Application SHALL aplicar las mismas clases CSS que el elemento HTML equivalente en el HTML_Site
4. THE React_Application SHALL preservar todos los archivos CSS específicos de Brand ubicados en `assets/css/brands/`
5. THE React_Application SHALL mantener todas las custom properties CSS y variables definidas en el Style_System
6. WHEN se visualiza la React_Application en cualquier viewport, THE React_Application SHALL aplicar los mismos estilos responsive que el HTML_Site
7. THE React_Application SHALL preservar todos los selectores CSS, pseudo-clases y pseudo-elementos del Style_System

### Requirement 3: Migración de Assets Estáticos

**User Story:** Como usuario, quiero que todas las imágenes, videos, fuentes e íconos se muestren correctamente en el sitio React, para que el contenido visual sea idéntico al sitio original.

#### Acceptance Criteria

1. THE React_Application SHALL mantener la estructura de carpetas de assets idéntica al HTML_Site (`assets/css/`, `assets/fonts/`, `assets/img/`)
2. THE React_Application SHALL referenciar todos los Assets usando paths absolutos desde `/public` en los componentes React
3. WHEN un Component necesita mostrar una imagen, THE React_Application SHALL cargar el Asset desde la misma ubicación que en el HTML_Site
4. THE React_Application SHALL incluir todos los archivos de fuentes (Pulso-Bold, Pulso-Light, Pulso-Regular) en formatos ttf, woff y woff2
5. THE React_Application SHALL preservar la organización de imágenes por Brand en `assets/img/ecosistema/{brand}/`
6. THE React_Application SHALL mantener todos los archivos SVG, JPG, PNG y MP4 en sus ubicaciones originales
7. WHEN se carga la React_Application, THE React_Application SHALL mostrar el favicon correcto (`assets/img/favicon.png`)
8. THE React_Application SHALL servir los archivos HTML originales como assets estáticos desde las rutas `/public/brands/`, `/public/sections/`, `/public/mi-firma/` y `/public/content/`

### Requirement 4: Implementación de Navegación y Routing

**User Story:** Como usuario, quiero navegar entre diferentes secciones y páginas del sitio React, para que pueda acceder al mismo contenido que en el sitio HTML original.

#### Acceptance Criteria

1. THE React_Application SHALL implementar un sistema de routing con React Router v6 (`createBrowserRouter`) que mapee todas las URLs del HTML_Site
2. WHEN un usuario hace clic en un enlace de navegación, THE React_Application SHALL navegar a la Route correspondiente sin recargar la página
3. THE React_Application SHALL crear Routes para todas las páginas de Brand (`/brands/personal`, `/brands/movil`, etc.)
4. THE React_Application SHALL crear Routes para todas las páginas de secciones (`/sections/templates`, `/sections/audiovisuales`, `/sections/recursos`, `/sections/recursos/elementos`, `/sections/toolkits`, `/sections/toolkits/disenar`, `/sections/toolkits/redactar`, `/mi-firma`)
5. WHEN un usuario accede a una URL con hash (`#presentaciones`, `#e-mails`, etc.), THE React_Application SHALL hacer scroll a la sección correspondiente mediante el comportamiento nativo del navegador
6. THE React_Application SHALL mantener el estado activo del menú de navegación según la Route actual usando `useLocation()`
7. WHEN un usuario navega usando los botones del navegador (back/forward), THE React_Application SHALL actualizar la vista correctamente
8. THE React_Application SHALL cargar todos los componentes de página con `lazy()` para code splitting automático

### Requirement 5: Conversión de Interacciones JavaScript

**User Story:** Como usuario, quiero que todas las interacciones del sitio (menús, animaciones, lazy loading, máscaras SVG) funcionen exactamente igual que en el sitio HTML, para que la experiencia de uso sea idéntica.

#### Acceptance Criteria

1. THE React_Application SHALL implementar el hook `useScrollAnimations` que usa `MutationObserver` para eliminar el atributo `data-appear` de los elementos a medida que aparecen en el DOM, replicando el comportamiento de aparición del HTML_Site
2. THE `useScrollAnimations` hook SHALL procesar tanto los elementos ya presentes en el DOM al montar como los elementos añadidos dinámicamente por HtmlPage o BrandPage, detectándolos mediante `MutationObserver` con `{ childList: true, subtree: true }`
3. THE React_Application SHALL implementar el hook `useMaskedBlocks` que replica el sistema de clip-path SVG de la clase `cs_Masked` del JavaScript original, creando máscaras para elementos `.cs-masked-block`
4. THE `useMaskedBlocks` hook SHALL usar `MutationObserver` para procesar bloques añadidos dinámicamente por HtmlPage o BrandPage
5. WHEN un usuario interactúa con el menú móvil, THE React_Application SHALL mostrar/ocultar el menú con la misma animación que el HTML_Site
6. THE React_Application SHALL implementar el comportamiento de sticky header con efecto frosted idéntico al HTML_Site
7. THE React_Application SHALL implementar lazy loading de imágenes con la clase `cs-lazy` usando `IntersectionObserver`, copiando `data-src` a `src` cuando el elemento entra en el viewport
8. WHEN un elemento tiene atributos `data-appear`, THE `useScrollAnimations` hook SHALL eliminar dicho atributo (no añadir una clase) para activar la animación de aparición definida en el CSS

### Requirement 6: Gestión de Estado y Body ID/Class

**User Story:** Como desarrollador, quiero que la aplicación React gestione el estado de forma eficiente y que los selectores CSS dependientes del body funcionen correctamente, para que las interacciones del usuario sean fluidas y los estilos se apliquen correctamente.

#### Acceptance Criteria

1. THE React_Application SHALL gestionar el estado de cada página de forma local en cada componente, sin usar React Context global
2. WHEN el estado de un Interactive_Element cambia, THE React_Application SHALL actualizar solo los componentes afectados mediante estado local (`useState`)
3. THE React_Application SHALL mantener el estado del menú de navegación (abierto/cerrado, item activo) localmente en el componente Header
4. THE React_Application SHALL gestionar el estado de fetch (cargando/cargado/error) localmente en HtmlPage y BrandPage
5. WHEN un componente de página monta, THE React_Application SHALL establecer `document.body.id` y `document.body.className` con los valores correspondientes a esa página mediante `useEffect` con manipulación directa del DOM
6. WHEN un componente de página desmonta, THE React_Application SHALL restaurar `document.body.id` y `document.body.className` a sus valores previos para evitar conflictos entre páginas
7. THE Layout_Shell SHALL añadir la clase `is-loaded` a `document.body` al montar, clase requerida por el CSS para mostrar `main#cs-main`
8. THE React_Application SHALL asignar los siguientes valores de body por página: HomePage → `id="home"`, BrandPage → `id="{brandName}" class="brands is-loaded"`, páginas de sección → `id="main-{section}" class="is-loaded"`

### Requirement 7: Configuración del Entorno de Desarrollo React

**User Story:** Como desarrollador, quiero tener un entorno de desarrollo React configurado correctamente, para que pueda desarrollar, probar y construir la aplicación eficientemente.

#### Acceptance Criteria

1. THE React_Application SHALL utilizar Vite como herramienta de build con la plantilla `react-ts`
2. THE React_Application SHALL incluir un archivo `package.json` con todas las dependencias necesarias (`react`, `react-dom`, `react-router-dom`)
3. THE React_Application SHALL configurar scripts npm para desarrollo (`dev`), build de producción (`build`), preview (`preview`) y testing (`test`)
4. THE React_Application SHALL incluir configuración de ESLint y Prettier para mantener calidad de código
5. THE React_Application SHALL incluir un archivo `.gitignore` apropiado para proyectos React (`node_modules/`, `dist/`, `.env`)
6. WHEN un desarrollador ejecuta `npm run dev`, THE React_Application SHALL iniciar un servidor de desarrollo con hot reload
7. THE React_Application SHALL cargar los archivos CSS `stg.css`, `sections.css` y `brands.css` como parte del orden de carga de CSS en `index.html`, además de los archivos base del Style_System

### Requirement 8: Optimización de Rendimiento

**User Story:** Como usuario, quiero que el sitio React cargue rápidamente y responda de forma fluida, para que la experiencia sea igual o mejor que el sitio HTML original.

#### Acceptance Criteria

1. THE React_Application SHALL implementar code splitting mediante `lazy()` para cargar componentes de Routes bajo demanda
2. THE React_Application SHALL implementar lazy loading para imágenes con clase `cs-lazy` usando `IntersectionObserver`
3. WHEN un usuario accede a la React_Application, THE React_Application SHALL cargar los assets críticos primero (CSS, fuentes, hero image)
4. THE React_Application SHALL minimizar y comprimir todos los archivos JavaScript y CSS en el build de producción
5. THE React_Application SHALL implementar memoization (`React.memo`, `useMemo`, `useCallback`) para componentes que se renderizan frecuentemente
6. WHEN se mide el rendimiento con Lighthouse, THE React_Application SHALL obtener scores similares o superiores al HTML_Site

### Requirement 9: Compatibilidad Cross-Browser

**User Story:** Como usuario, quiero que el sitio React funcione correctamente en todos los navegadores modernos, para que pueda acceder al contenido independientemente del navegador que use.

#### Acceptance Criteria

1. THE React_Application SHALL funcionar correctamente en las últimas dos versiones de Chrome, Firefox, Safari y Edge
2. THE React_Application SHALL incluir polyfills necesarios para características de JavaScript no soportadas en navegadores antiguos
3. WHEN se visualiza en diferentes navegadores, THE React_Application SHALL mostrar el mismo layout y estilos
4. THE React_Application SHALL manejar prefijos CSS vendor automáticamente mediante autoprefixer
5. THE React_Application SHALL funcionar correctamente en dispositivos móviles iOS y Android
6. WHEN se detectan características no soportadas, THE React_Application SHALL proporcionar fallbacks apropiados
7. THE React_Application SHALL ser responsive y funcionar correctamente en viewports desde 320px hasta 2560px de ancho

### Requirement 10: Mantenimiento de Accesibilidad

**User Story:** Como usuario con necesidades de accesibilidad, quiero que el sitio React sea accesible mediante teclado y lectores de pantalla, para que pueda navegar y usar todas las funcionalidades.

#### Acceptance Criteria

1. THE React_Application SHALL mantener todos los atributos ARIA presentes en el HTML_Site
2. THE React_Application SHALL asegurar que todos los Interactive_Elements sean accesibles mediante teclado (tab, enter, escape)
3. WHEN un modal se abre, THE React_Application SHALL mover el foco al modal y prevenir navegación fuera de él (focus trap)
4. THE React_Application SHALL incluir atributos alt descriptivos para todas las imágenes
5. THE React_Application SHALL mantener una jerarquía semántica de headings (h1, h2, h3, etc.)
6. WHEN se navega con teclado, THE React_Application SHALL mostrar indicadores visuales de foco claros
7. THE React_Application SHALL incluir un skip link (`<a href="#cs-main">`) visible al recibir foco para permitir saltar al contenido principal

### Requirement 11: Testing y Validación

**User Story:** Como desarrollador, quiero tener tests automatizados que validen la equivalencia funcional entre el sitio HTML y React, para asegurar que la migración sea exitosa.

#### Acceptance Criteria

1. THE React_Application SHALL incluir tests unitarios para todos los componentes principales usando Vitest y React Testing Library
2. THE React_Application SHALL incluir tests de integración que validen el flujo de navegación completo
3. WHEN se ejecutan los tests, THE React_Application SHALL validar que cada Component renderiza el HTML esperado
4. THE React_Application SHALL incluir tests de snapshot para detectar cambios no intencionados en el output de componentes
5. THE React_Application SHALL incluir tests que validen el comportamiento de Interactive_Elements (clicks, hovers, form submissions)
6. THE React_Application SHALL alcanzar al menos 80% de cobertura de código en tests
7. WHEN se ejecuta el build de producción, THE React_Application SHALL pasar todos los tests sin errores

### Requirement 12: Documentación del Patrón HtmlPage y Gestión de Body

**User Story:** Como desarrollador, quiero tener documentación clara sobre la arquitectura React, el patrón HtmlPage y el sistema de gestión de body ID/class, para que pueda mantener y extender la aplicación en el futuro.

#### Acceptance Criteria

1. THE React_Application SHALL incluir un archivo `README.md` con instrucciones de instalación, desarrollo y deployment
2. THE React_Application SHALL documentar el patrón HtmlPage: flujo de fetch, extracción de contenido, corrección de rutas e inyección con `dangerouslySetInnerHTML`
3. THE React_Application SHALL documentar la diferencia entre HtmlPage y BrandPage: selectores extraídos, CSS adicional cargado y clases de body aplicadas
4. THE React_Application SHALL documentar el sistema de gestión de `body.id` y `body.class`: qué valores establece cada página y por qué son necesarios para los selectores CSS
5. THE React_Application SHALL documentar la estructura de carpetas `/public/brands/`, `/public/sections/`, `/public/mi-firma/` y `/public/content/` y su relación con el patrón fetch-and-render
6. THE React_Application SHALL documentar las dependencias externas y su propósito
7. THE React_Application SHALL incluir comentarios en código para la lógica de corrección de rutas en HtmlPage y para los hooks `useScrollAnimations` y `useMaskedBlocks`
