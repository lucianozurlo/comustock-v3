# Feature Components

Feature components are larger, more complex components that represent specific features or sections of the application.

## HeroBlock

The HeroBlock component is the hero section with video background used on the home page.

### Features

- **Video Background**: Autoplay, muted, looping video
- **Poster Images**: Loading state with poster images
- **Lazy Loading**: Videos only load when entering viewport using IntersectionObserver
- **Responsive**: Separate videos for desktop and mobile
- **Animations**: Fade-right entrance, fade-left exit animations
- **Link Wrapper**: Desktop video links to Personal brand page

### Usage

```tsx
import { HeroBlock } from '@/components/features';

const HomePage = () => {
  return (
    <div>
      <HeroBlock />
      {/* Other sections */}
    </div>
  );
};
```

### Props

The HeroBlock component does not accept any props. It's a self-contained component with fixed content.

### CSS Classes

- `cs-hero-block` - Main hero block container
- `cs-hero-type03` - Hero type variant
- `cs-masked-block` - Masked block wrapper
- `cs-masked-media` - Masked media container
- `cs-hero-media` - Hero media element
- `mob-no` - Desktop only (hidden on mobile)
- `mob-ok` - Mobile only (hidden on desktop)

### Animation Attributes

- `data-appear="fade-right"` - Entrance animation
- `data-unload="fade-left"` - Exit animation
- `data-delay="150"` - Animation delay in milliseconds
- `data-threshold="0"` - Intersection observer threshold

### Video Files

- Desktop: `/assets/img/home/home.mp4`
- Desktop Poster: `/assets/img/home/home-poster.jpg`
- Mobile: `/assets/img/home/home-mobile.mp4`
- Mobile Poster: `/assets/img/home/home-mobile-poster.jpg`

### Performance Optimization

The component implements lazy loading for videos:

1. Videos are not loaded initially (no `src` attribute)
2. IntersectionObserver watches when the hero block enters viewport
3. When within 200px of viewport, videos start loading
4. Videos autoplay once loaded

This approach improves initial page load performance, especially on mobile devices.

### Requirements Validated

- **Requirement 1.1**: Conversión de Estructura HTML a Componentes React
- **Requirement 1.4**: Preservación de atributos data-\* para animaciones
- **Requirement 3.2**: Referenciar Assets usando paths relativos correctos
- **Requirement 5.1**: Implementar lazy loading de videos
- **Requirement 8.2**: Implementar lazy loading para optimización de rendimiento
