# BrandSquareButton Component

## Overview

The `BrandSquareButton` component is a square button with brand logo that includes zoom animations. It's used in the Ecosistema section of the home page to navigate to brand pages.

## Features

- Links to brand page route (`/brands/{brandSlug}`)
- Displays brand logo with isotype (logoIso) and full logo (logoImg)
- Applies brand-specific CSS class for styling
- Zoom-in entrance animation with configurable delay
- Zoom-out exit animation on page unload
- Accessible with ARIA labels

## Props

| Prop      | Type            | Required | Default | Description                                  |
| --------- | --------------- | -------- | ------- | -------------------------------------------- |
| brandName | string          | Yes      | -       | Display name of the brand (e.g., "Personal") |
| brandSlug | string          | Yes      | -       | URL slug for the brand (e.g., "personal")    |
| logoIso   | React.ReactNode | Yes      | -       | SVG element for the brand isotype            |
| logoImg   | React.ReactNode | Yes      | -       | SVG element for the full brand logo          |
| delay     | number          | No       | 0       | Animation delay in milliseconds              |

## Usage Example

```tsx
import { BrandSquareButton } from '@/components/features';

const EcosistemaSection = () => {
  const movilLogoIso = (
    <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M75,27.31c-17.52,0-31.71,14.28-31.71,31.71s14.28,31.71,31.71,31.71,31.71-14.28,31.71-31.71-14.19-31.71-31.71-31.71ZM75,78.17c-10.57,0-19.14-8.57-19.14-19.14s8.57-19.14,19.14-19.14,19.14,8.57,19.14,19.14-8.57,19.14-19.14,19.14Z"
        fill="#8d9ba9"
      />
      <rect x="63.01" y="57.45" width="5.76" height="7.97" fill="#8d9ba9" />
      <rect x="72.19" y="53.26" width="5.76" height="12.16" fill="#8d9ba9" />
      <rect x="81.23" y="49.48" width="5.76" height="15.94" fill="#8d9ba9" />
    </svg>
  );

  const movilLogoImg = (
    <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M43.93,103.91h2.57v2.64h.18c.56-1.69,2.23-3.03,4.54-3.03s3.64,1.36,4.16,3.36h.18c.69-1.95,2.31-3.36,4.7-3.36,2.95,0,4.59,2.08,4.59,5.47v8.65h-2.8v-8.26c0-2-.69-3.49-2.67-3.49-2.44,0-3.59,2.52-3.59,4.36v7.39h-2.8v-8.26c0-2.44-1.1-3.49-2.85-3.49-2.34,0-3.41,2.64-3.41,4.59v7.16h-2.8v-13.73Z"
        fill="#8d9ba9"
      />
      {/* Additional paths... */}
    </svg>
  );

  return (
    <div id="ecosistema" className="stg-row">
      <div className="stg-col-x7">
        <BrandSquareButton
          brandName="Móvil"
          brandSlug="movil"
          logoIso={movilLogoIso}
          logoImg={movilLogoImg}
          delay={200}
        />
      </div>
      {/* More brand buttons... */}
    </div>
  );
};
```

## CSS Classes Applied

- `cs-square-button` - Main button styling
- `logo-wrapper` - Container for logos
- `{brandSlug}` - Brand-specific class (e.g., `movil`, `fibra`, `personal`)
- `logo-iso` - Isotype logo container
- `logo-mask` - Mask container for full logo
- `logo-img` - Full logo container

## Animation Attributes

- `data-appear="zoom-in"` - Entrance animation
- `data-delay={delay}` - Animation delay in milliseconds
- `data-unload="zoom-out"` - Exit animation

## Accessibility

The component includes an `aria-label` attribute that provides a descriptive label for screen readers:

```
aria-label="Navigate to {brandName} brand page"
```

## Brand Slugs

The following brand slugs are supported:

- `personal`
- `movil`
- `fibra`
- `flow`
- `pay`
- `tienda`
- `smarthome`
- `tech`

## Requirements Validated

This component validates the following requirements:

- **1.1** - Conversion of HTML structure to React components
- **1.4** - Preservation of data attributes for animations
- **1.5** - Conversion of JavaScript interactions to React
- **4.2** - Implementation of navigation and routing
- **5.7** - Support for staggered animations with delay prop

## Related Components

- `HeroBlock` - Hero section with video background
- `HomePage` - Main page that uses BrandSquareButton in Ecosistema section

## Notes

- The SVG content for logos should be extracted from the original HTML files in `assets/img/ecosistema/{brand}/`
- The component uses React Router's `Link` component for client-side navigation
- Brand-specific CSS is loaded from `assets/css/brands/{brand}.css`
- Animations are handled by the global scroll animation system via data attributes
