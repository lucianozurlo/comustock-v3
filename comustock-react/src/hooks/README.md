# Custom Hooks Documentation

This directory contains custom React hooks for common functionality in the ComuStock application.

## Available Hooks

### 1. useScrollAnimations

Implements IntersectionObserver-based scroll animations for elements with `data-appear` attributes.

**Requirements:** 5.1

**Usage:**

```tsx
import { useScrollAnimations } from '@/hooks';

const HomePage = () => {
  useScrollAnimations();

  return (
    <div data-appear="fade-up" data-delay="200">
      Content will fade up when scrolled into view
    </div>
  );
};
```

**Supported Animations:**

- `fade-up`, `fade-down`, `fade-left`, `fade-right`
- `zoom-in`, `zoom-out`

**Optional Attributes:**

- `data-delay`: Animation delay in milliseconds
- `data-unload`: Animation to play when leaving viewport
- `data-threshold`: Custom intersection threshold (0-1)

---

### 2. useLazyLoading

Implements lazy loading for images with the `cs-lazy` class using IntersectionObserver.

**Requirements:** 5.7

**Usage:**

```tsx
import { useLazyLoading } from '@/hooks';

const ImageGallery = () => {
  useLazyLoading();

  return (
    <img
      className="cs-lazy"
      src="/assets/img/null.png"
      data-src="/assets/img/actual-image.jpg"
      alt="Description"
      loading="lazy"
    />
  );
};
```

**How it works:**

1. Images start with a placeholder `src` (e.g., null.png)
2. Actual image URL is stored in `data-src` attribute
3. When image is about to enter viewport, `data-src` is loaded into `src`
4. `cs-lazy` class is removed and `cs-loaded` class is added after loading

---

### 3. useStickyHeader

Tracks scroll position and updates sticky header state in the global AppContext.

**Requirements:** 5.1, 8.2

**Usage:**

```tsx
import { useStickyHeader } from '@/hooks';

const Header = () => {
  const { scrollPosition, isSticky } = useStickyHeader(100);

  return (
    <header className={isSticky ? 'is-sticky is-frosted' : ''}>
      <nav>...</nav>
    </header>
  );
};
```

**Parameters:**

- `threshold` (optional): Scroll position in pixels at which header becomes sticky (default: 100)

**Returns:**

- `scrollPosition`: Current scroll position in pixels
- `isSticky`: Boolean indicating if scroll position is past threshold
- `globalScrollPosition`: Scroll position from AppContext
- `globalIsSticky`: Sticky state from AppContext

---

### 4. useHashNavigation

Handles smooth scrolling to hash anchors in the URL.

**Requirements:** 5.1

**Usage:**

```tsx
import { useHashNavigation } from '@/hooks';

const TemplatesPage = () => {
  const { scrollToHash } = useHashNavigation(80); // 80px offset for sticky header

  return (
    <div>
      <section id="presentaciones">...</section>
      <section id="e-mails">...</section>

      {/* Manual trigger */}
      <button onClick={() => scrollToHash('#presentaciones')}>Go to Presentaciones</button>
    </div>
  );
};
```

**Parameters:**

- `offset` (optional): Offset in pixels from the top (useful for fixed headers, default: 0)
- `behavior` (optional): Scroll behavior: 'smooth' or 'auto' (default: 'smooth')

**Returns:**

- `scrollToHash`: Function to manually trigger hash navigation

**Usage with Links:**

```tsx
<Link to="/sections/templates#presentaciones">Presentaciones</Link>
```

---

## Complete Example

Here's an example of using multiple hooks together in a page component:

```tsx
import { useScrollAnimations, useLazyLoading, useHashNavigation } from '@/hooks';

const TemplatesPage = () => {
  // Enable scroll animations for all elements with data-appear
  useScrollAnimations();

  // Enable lazy loading for all images with cs-lazy class
  useLazyLoading();

  // Enable hash navigation with 80px offset for sticky header
  useHashNavigation(80);

  return (
    <div>
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
        <img
          className="cs-lazy"
          src="/assets/img/null.png"
          data-src="/assets/img/templates/emails.jpg"
          alt="E-mails"
          loading="lazy"
        />
      </section>
    </div>
  );
};
```

---

## Performance Considerations

All hooks use:

- **IntersectionObserver API** for efficient viewport detection
- **RequestAnimationFrame** for smooth scroll handling (useStickyHeader)
- **Passive event listeners** where applicable
- **Proper cleanup** in useEffect return functions

---

## Browser Support

These hooks require:

- IntersectionObserver API (supported in all modern browsers)
- For older browsers, consider adding a polyfill:

  ```bash
  npm install intersection-observer
  ```

  Then import in your main.tsx:

  ```tsx
  import 'intersection-observer';
  ```

---

## Testing

Tests for these hooks will be added in Phase 7 of the migration (Testing & Quality Assurance).

---

## Related Files

- **AppContext**: `src/contexts/AppContext.tsx` - Used by useStickyHeader
- **Design Document**: `.kiro/specs/html-to-react-migration/design.md`
- **Requirements**: `.kiro/specs/html-to-react-migration/requirements.md`
