# Custom Hooks Documentation

Documentación de todos los custom hooks de la aplicación ComuStock React.

## Tabla de contenidos

- [useScrollAnimations](#usescrollanimations)
- [useLazyLoading](#uselazyloading)
- [useStickyHeader](#usestickyheader)
- [useHashNavigation](#usehashnavigation)
- [useBrandStyles](#usebrandstyles)
- [Uso combinado](#uso-combinado)
- [Consideraciones de performance](#consideraciones-de-performance)
- [Soporte de navegadores](#soporte-de-navegadores)

---

## useScrollAnimations

**Archivo:** `src/hooks/useScrollAnimations.ts`

**Propósito:** Implementa animaciones de scroll basadas en `IntersectionObserver`. Detecta automáticamente todos los elementos con atributo `data-appear` en el DOM y aplica clases de animación cuando entran o salen del viewport.

**Parámetros:** ninguno

**Valor de retorno:** `void`

**Animaciones soportadas (via `data-appear`):**

| Valor        | Efecto                                      |
| ------------ | ------------------------------------------- |
| `fade-up`    | Aparece desde abajo hacia arriba            |
| `fade-down`  | Aparece desde arriba hacia abajo            |
| `fade-left`  | Aparece desde la derecha hacia la izquierda |
| `fade-right` | Aparece desde la izquierda hacia la derecha |
| `zoom-in`    | Aparece con efecto de zoom de entrada       |
| `zoom-out`   | Aparece con efecto de zoom de salida        |

**Atributos HTML relacionados:**

| Atributo         | Tipo         | Descripción                                                      |
| ---------------- | ------------ | ---------------------------------------------------------------- |
| `data-appear`    | string       | Tipo de animación de entrada (requerido para activar el hook)    |
| `data-unload`    | string       | Tipo de animación al salir del viewport (opcional)               |
| `data-delay`     | string (ms)  | Delay antes de ejecutar la animación (default: `"0"`)            |
| `data-threshold` | string (0-1) | Threshold personalizado de IntersectionObserver (default: `0.1`) |

**Clases CSS aplicadas:**

- `is-visible` — Se agrega cuando el elemento entra al viewport
- `animate-{tipo}` — Se agrega con el tipo de animación (ej: `animate-fade-up`)

**Comportamiento:**

- Threshold por defecto: `0.1` (se activa cuando el 10% del elemento es visible)
- Fallback para navegadores sin `IntersectionObserver`: aplica todas las animaciones inmediatamente
- Cleanup automático: desconecta el observer al desmontar el componente

**Uso:**

```tsx
import { useScrollAnimations } from '@/hooks';

const HomePage = () => {
  useScrollAnimations();

  return (
    <div>
      {/* Animación simple */}
      <div data-appear="fade-up">Aparece con fade-up al hacer scroll</div>

      {/* Con delay */}
      <div data-appear="fade-up" data-delay="200">
        Aparece 200ms después de entrar al viewport
      </div>

      {/* Con animación de salida */}
      <div data-appear="zoom-in" data-unload="zoom-out">
        Zoom-in al entrar, zoom-out al salir
      </div>

      {/* Con threshold personalizado */}
      <div data-appear="fade-right" data-threshold="0.5">
        Se activa cuando el 50% es visible
      </div>
    </div>
  );
};
```

**Notas:**

- Llamar el hook una vez por página/componente raíz. No es necesario llamarlo en cada componente hijo.
- El hook observa todos los elementos con `data-appear` presentes en el DOM al momento del mount. Los elementos renderizados dinámicamente después del mount no serán observados automáticamente.

---

## useLazyLoading

**Archivo:** `src/hooks/useLazyLoading.ts`

**Propósito:** Implementa lazy loading para imágenes con la clase `cs-lazy`. Usa `IntersectionObserver` para cargar las imágenes solo cuando están a punto de entrar al viewport, mejorando el rendimiento de carga inicial.

**Parámetros:** ninguno

**Valor de retorno:** `void`

**Cómo funciona:**

1. Las imágenes comienzan con un placeholder en `src` (ej: `/assets/img/null.png`)
2. La URL real se almacena en el atributo `data-src`
3. Cuando la imagen está a 50px de entrar al viewport, `data-src` se copia a `src`
4. Al cargar exitosamente: se elimina `cs-lazy` y se agrega `cs-loaded`
5. Si hay error de carga: se elimina `cs-lazy` y se agrega `cs-error`

**Configuración del observer:**

- `rootMargin: '50px 0px'` — Empieza a cargar 50px antes de entrar al viewport
- `threshold: 0.01` — Se activa con cualquier porción visible

**Atributos HTML requeridos:**

| Atributo          | Descripción                                      |
| ----------------- | ------------------------------------------------ |
| `class="cs-lazy"` | Marca la imagen para lazy loading                |
| `src`             | Placeholder (ej: `/assets/img/null.png`)         |
| `data-src`        | URL real de la imagen                            |
| `data-srcset`     | Srcset real para imágenes responsive (opcional)  |
| `loading="lazy"`  | Atributo nativo de lazy loading (complementario) |

**Uso:**

```tsx
import { useLazyLoading } from '@/hooks';

const ImageGallery = () => {
  useLazyLoading();

  return (
    <div>
      {/* Imagen lazy básica */}
      <img
        className="cs-lazy"
        src="/assets/img/null.png"
        data-src="/assets/img/gallery/photo1.jpg"
        alt="Foto 1"
        loading="lazy"
      />

      {/* Imagen lazy con srcset responsive */}
      <img
        className="cs-lazy"
        src="/assets/img/null.png"
        data-src="/assets/img/gallery/photo2.jpg"
        data-srcset="/assets/img/gallery/photo2-400.jpg 400w, /assets/img/gallery/photo2-800.jpg 800w"
        alt="Foto 2"
        loading="lazy"
      />
    </div>
  );
};
```

**Notas:**

- El hook observa todas las imágenes con `cs-lazy` presentes al momento del mount.
- Fallback para navegadores sin `IntersectionObserver`: carga todas las imágenes inmediatamente.

---

## useStickyHeader

**Archivo:** `src/hooks/useStickyHeader.ts`

**Propósito:** Rastrea la posición de scroll y actualiza el estado sticky del header en el `AppContext` global. Usa `requestAnimationFrame` para throttling y `passive: true` en el event listener para mejor performance.

**Parámetros:**

| Parámetro   | Tipo     | Default | Descripción                                                             |
| ----------- | -------- | ------- | ----------------------------------------------------------------------- |
| `threshold` | `number` | `100`   | Posición de scroll en px a partir de la cual el header se vuelve sticky |

**Valor de retorno:**

```typescript
{
  scrollPosition: number; // Posición de scroll actual en px (estado local)
  isSticky: boolean; // Si el scroll supera el threshold (estado local)
  globalScrollPosition: number; // Posición de scroll desde AppContext
  globalIsSticky: boolean; // Estado sticky desde AppContext
}
```

**Comportamiento:**

- Throttling con `requestAnimationFrame` para evitar renders excesivos
- Event listener con `{ passive: true }` para no bloquear el scroll
- Actualiza tanto el estado local como el `AppContext` global
- Cleanup automático: elimina el event listener al desmontar

**Uso:**

```tsx
import { useStickyHeader } from '@/hooks';

const Header = () => {
  const { isSticky } = useStickyHeader(100);

  return (
    <header className={`is-frosted ${isSticky ? 'is-sticky' : ''}`}>
      <nav>...</nav>
    </header>
  );
};
```

**Con threshold personalizado:**

```tsx
// Header se vuelve sticky después de 200px de scroll
const { isSticky, scrollPosition } = useStickyHeader(200);
```

**Notas:**

- Este hook requiere `AppContext`. Debe usarse dentro de un componente envuelto por `AppProvider`.
- Solo debe usarse en el componente `Header`. Para acceder al estado sticky desde otros componentes, usar `useAppContext` directamente.

---

## useHashNavigation

**Archivo:** `src/hooks/useHashNavigation.ts`

**Propósito:** Maneja el scroll suave a secciones identificadas por hash en la URL. Se activa automáticamente cuando cambia `location.hash` (usando `useLocation` de React Router).

**Parámetros:**

| Parámetro  | Tipo             | Default    | Descripción                                                      |
| ---------- | ---------------- | ---------- | ---------------------------------------------------------------- |
| `offset`   | `number`         | `0`        | Offset en px desde el top (útil para compensar el header sticky) |
| `behavior` | `ScrollBehavior` | `'smooth'` | Comportamiento del scroll: `'smooth'` o `'auto'`                 |

**Valor de retorno:**

```typescript
{
  scrollToHash: (hash: string) => void; // Función para trigger manual
}
```

**Comportamiento:**

- Se activa automáticamente cuando `location.hash` cambia
- Delay de 100ms para asegurar que el DOM esté listo
- Si no hay hash, hace scroll al top de la página
- Actualiza el foco del elemento para accesibilidad
- Agrega `tabindex="-1"` temporalmente si el elemento no es focusable

**Uso:**

```tsx
import { useHashNavigation } from '@/hooks';

const TemplatesPage = () => {
  // 80px de offset para compensar el header sticky
  const { scrollToHash } = useHashNavigation(80);

  return (
    <div>
      <section id="presentaciones">
        <h2>Presentaciones</h2>
      </section>

      <section id="e-mails">
        <h2>E-mails</h2>
      </section>

      {/* Trigger manual */}
      <button onClick={() => scrollToHash('#presentaciones')}>Ir a Presentaciones</button>
    </div>
  );
};
```

**Con links de React Router:**

```tsx
// El hook se activa automáticamente al navegar a estas URLs
<Link to="/sections/templates#presentaciones">Presentaciones</Link>
<Link to="/sections/templates#e-mails">E-mails</Link>
```

**Notas:**

- Requiere `react-router-dom` (usa `useLocation`). Solo funciona dentro de un `RouterProvider`.
- El offset de 80px es el valor recomendado para compensar el header sticky de ComuStock.

---

## useBrandStyles

**Archivo:** `src/hooks/useBrandStyles.ts`

**Propósito:** Carga dinámicamente el CSS específico de una marca inyectando un elemento `<link>` en el `<head>` del documento. Limpia el link al desmontar el componente para evitar conflictos de estilos entre marcas.

**Parámetros:**

| Parámetro   | Tipo     | Descripción                                             |
| ----------- | -------- | ------------------------------------------------------- |
| `brandName` | `string` | Slug de la marca (ej: `'personal'`, `'flow'`, `'tech'`) |

**Valor de retorno:** `void`

**Comportamiento:**

- Carga `/assets/css/brands/{brandName}.css`
- Usa `id="brand-{brandName}-styles"` para evitar duplicados
- Si el link ya existe (mismo ID), no lo agrega de nuevo
- Si el archivo CSS no existe, elimina el link roto silenciosamente
- Al desmontar: elimina el `<link>` del DOM

**Uso:**

```tsx
import { useBrandStyles } from '@/hooks';

const BrandPage = ({ brandName }: { brandName: string }) => {
  useBrandStyles(brandName);

  return (
    <div className={`brand-page brand-${brandName}`}>
      {/* El CSS de la marca ya está cargado */}
    </div>
  );
};
```

**Con parámetro de ruta:**

```tsx
import { useParams } from 'react-router-dom';
import { useBrandStyles } from '@/hooks';

const BrandPage = () => {
  const { brandName } = useParams<{ brandName: string }>();
  useBrandStyles(brandName ?? '');

  return <div>...</div>;
};
```

**Archivos CSS disponibles:**

| brandName   | Archivo cargado                    |
| ----------- | ---------------------------------- |
| `personal`  | `/assets/css/brands/personal.css`  |
| `movil`     | `/assets/css/brands/movil.css`     |
| `fibra`     | `/assets/css/brands/fibra.css`     |
| `flow`      | `/assets/css/brands/flow.css`      |
| `pay`       | `/assets/css/brands/pay.css`       |
| `tienda`    | `/assets/css/brands/tienda.css`    |
| `smarthome` | `/assets/css/brands/smarthome.css` |
| `tech`      | `/assets/css/brands/tech.css`      |

**Notas:**

- El hook es idempotente: llamarlo múltiples veces con el mismo `brandName` no agrega duplicados.
- Al navegar entre páginas de marca, el CSS de la marca anterior se elimina automáticamente antes de cargar el nuevo.

---

## Uso combinado

La mayoría de las páginas usan múltiples hooks juntos. Este es el patrón estándar para páginas de sección:

```tsx
import { useScrollAnimations, useLazyLoading, useHashNavigation } from '@/hooks';

const TemplatesPage = () => {
  // Animaciones de scroll para todos los elementos con data-appear
  useScrollAnimations();

  // Lazy loading para todas las imágenes con cs-lazy
  useLazyLoading();

  // Hash navigation con 80px de offset para el header sticky
  useHashNavigation(80);

  return (
    <div id="templates-page">
      <section id="presentaciones" data-appear="fade-up" data-delay="100">
        <h2>Presentaciones</h2>
        <img
          className="cs-lazy"
          src="/assets/img/null.png"
          data-src="/assets/img/templates/presentaciones.jpg"
          alt="Presentaciones"
          loading="lazy"
        />
      </section>

      <section id="e-mails" data-appear="fade-up" data-delay="200">
        <h2>E-mails</h2>
      </section>
    </div>
  );
};
```

Para páginas de marca, agregar `useBrandStyles`:

```tsx
import { useBrandStyles, useScrollAnimations, useLazyLoading } from '@/hooks';

const BrandPage = () => {
  const { brandName } = useParams<{ brandName: string }>();

  useBrandStyles(brandName ?? '');
  useScrollAnimations();
  useLazyLoading();

  return <div>...</div>;
};
```

---

## Consideraciones de performance

Todos los hooks están optimizados para performance:

- **`useScrollAnimations`** y **`useLazyLoading`**: Usan `IntersectionObserver` que es nativo del navegador y no bloquea el hilo principal.
- **`useStickyHeader`**: Usa `requestAnimationFrame` para throttling del evento scroll y `{ passive: true }` para no bloquear el scroll.
- **`useHashNavigation`**: Solo se activa cuando cambia `location.hash`, no en cada render.
- **`useBrandStyles`**: Verifica si el link ya existe antes de agregarlo, evitando operaciones DOM innecesarias.
- Todos los hooks hacen cleanup en el return de `useEffect`, evitando memory leaks.

---

## Soporte de navegadores

Los hooks requieren `IntersectionObserver` API, soportada en:

- Chrome 58+
- Firefox 55+
- Safari 12.1+
- Edge 16+

Para navegadores más antiguos, `useScrollAnimations` y `useLazyLoading` incluyen fallbacks que aplican las animaciones/cargas inmediatamente sin observer.

Si se necesita soporte para navegadores más antiguos, instalar el polyfill:

```bash
npm install intersection-observer
```

```tsx
// src/main.tsx
import 'intersection-observer';
```
