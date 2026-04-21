# Responsive Design Documentation

## Overview

ComuStock React uses a mobile-first responsive design system inherited from the original HTML site. All responsive behavior is handled through CSS media queries in the existing stylesheet files (`responsive.css`, `resp-cs.css`, and `config.css`). No CSS was modified during migration — the React application loads the same stylesheets in the same order.

---

## Breakpoint Definitions

The design system defines four main breakpoints, controlled via CSS custom properties in `config.css` and media queries in `responsive.css` / `resp-cs.css`.

| Name              | Range           | Media Query                                                 |
| ----------------- | --------------- | ----------------------------------------------------------- |
| Desktop (default) | 1280px – ∞      | _(no media query — base styles)_                            |
| Tablet Landscape  | 1024px – 1279px | `@media only screen and (max-width: 1279px)`                |
| Tablet Portrait   | 740px – 960px   | `@media only screen and (max-width: 960px)`                 |
| Mobile Phones     | 320px – 739px   | `@media only screen and (max-width: 739px)`                 |
| Small Mobile      | 320px – 639px   | `@media only screen and (max-width: 639px)` _(resp-cs.css)_ |

### Container Widths by Breakpoint

| Breakpoint         | `--stg-container-width`                             |
| ------------------ | --------------------------------------------------- |
| Desktop (≥ 1280px) | `1200px`                                            |
| Tablet Landscape   | `976px`                                             |
| Tablet Portrait    | `590px`                                             |
| Mobile (≤ 739px)   | `calc(100svw - 2 * 20px)` _(full width minus gaps)_ |

### Typography Scale by Breakpoint

| Heading | Desktop | Tablet Landscape | Tablet Portrait | Mobile |
| ------- | ------- | ---------------- | --------------- | ------ |
| H1      | 80px    | 64px             | 55px            | 48px   |
| H2      | 66px    | 45px             | _(inherited)_   | 32px   |
| H3      | 40px    | 32px             | _(inherited)_   | 28px   |
| H4      | 34px    | 26px             | _(inherited)_   | 24px   |
| H5      | 24px    | 22px             | _(inherited)_   | 20px   |
| H6      | 20px    | 18px             | _(inherited)_   | 18px   |

---

## Component-Level Responsive Behavior

### Header (`Header.tsx`)

- **Desktop (≥ 961px):** Shows `.cs-header-inner` with logo, full navigation, and CTA button. The `.cs-mobile-header-inner` is hidden.
- **Mobile/Tablet (≤ 960px):** Hides `.cs-header-inner` and shows `.cs-mobile-header-inner` with logo and hamburger toggle button.
- **Mobile menu trigger:** `max-width: 960px` — controlled by `responsive.css`.
- **State management:** The `Header` component toggles `show-menu` class on `<body>` via `AppContext.isMobileMenuOpen`. The CSS in `responsive.css` handles all visual transitions.
- **Sticky behavior:** The `useStickyHeader` hook adds `is-sticky` class after 100px scroll. The `is-frosted` class is always present for the glass effect.

```tsx
// Header applies is-sticky dynamically; is-frosted is always on
<header id="cs-header" className={classNames('is-frosted', { 'is-sticky': isSticky })}>
```

### Navigation (`Navigation.tsx` / `Header.tsx`)

- **Desktop:** Horizontal nav with hover-triggered dropdown submenus. Items with class `mob-no` are visible only on desktop.
- **Mobile:** Slide-in panel from the right. Items with class `mob-ok` are visible only on mobile. Submenus expand on click.
- **Active state:** Uses `useLocation` from React Router to highlight the current route.

### HeroBlock (`HeroBlock.tsx`)

- **Desktop (≥ 961px):** Shows `home.mp4` wrapped in a link to `/brands/personal`. The `<a>` has class `mob-no`.
- **Mobile (≤ 960px):** Shows `home-mobile.mp4` (portrait aspect ratio `3/4`). The `<video>` has class `mob-ok`.
- **Lazy loading:** Both videos use `IntersectionObserver` — `src` is only set when the hero enters the viewport (with 200px pre-load margin).
- **Poster images:** `home-poster.jpg` (desktop) and `home-mobile-poster.jpg` (mobile) display while video loads.

```tsx
// Desktop video (hidden on mobile via .mob-no CSS class)
<a href="/brands/personal" className="mob-no">
  <video src={shouldLoadVideos ? '/assets/img/home/home.mp4' : undefined} ... />
</a>

// Mobile video (hidden on desktop via .mob-ok CSS class)
<video className="mob-ok" src={shouldLoadVideos ? '/assets/img/home/home-mobile.mp4' : undefined} ... />
```

The `.mob-ok` / `.mob-no` visibility toggle is defined in `resp-cs.css`:

```css
.mob-ok {
  display: none !important;
}

@media only screen and (max-width: 960px) {
  .mob-ok {
    display: flex !important;
  }
  .mob-no {
    display: none !important;
  }
}
```

### Bento Grid (`BentoGrid.tsx` / `BentoCard.tsx`)

- **Desktop:** Multi-column grid layout with large, medium, and small card variants.
- **Tablet (≤ 960px):** Collapses to 2-column grid with specific grid-area assignments for each card type.
- **Mobile (≤ 739px):** Horizontal scroll grid with `grid-auto-flow: column`.

### Brand Pages (`BrandPage.tsx`)

- **Desktop:** Side navigation + main content layout.
- **Mobile (≤ 639px):** Side navigation hidden (`.side-menu` and `.stg-col-1.side-nav` set to `display: none`). Content takes full width with `margin-top: 125px`.

### Section Pages

- **Templates, Audiovisuales, Recursos, Toolkits:** All use the same grid system. Grids collapse from multi-column to single-column at `≤ 739px`.
- **Hash navigation:** `useHashNavigation` hook handles smooth scroll to `#section-id` anchors on all section pages.

---

## Viewport Meta Tag

The `index.html` includes the standard responsive viewport meta tag:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

This ensures:

- The layout width matches the device screen width.
- No initial zoom is applied.
- Touch interactions scale correctly on iOS and Android.

---

## How to Test Responsive Design Manually (Chrome DevTools)

### Opening Device Mode

1. Open Chrome DevTools (`F12` or `Cmd+Option+I` on Mac).
2. Click the **Toggle Device Toolbar** icon (or press `Ctrl+Shift+M` / `Cmd+Shift+M`).
3. Select a preset device or enter a custom width.

### Recommended Test Viewports

| Category         | Width  | Device Example      |
| ---------------- | ------ | ------------------- |
| Small mobile     | 320px  | iPhone SE (1st gen) |
| Standard mobile  | 375px  | iPhone 12/13/14     |
| Large mobile     | 480px  | Android large phone |
| Tablet portrait  | 768px  | iPad Mini portrait  |
| Tablet landscape | 1024px | iPad landscape      |
| Desktop          | 1280px | Standard laptop     |
| Large desktop    | 1440px | MacBook Pro 14"     |
| Wide desktop     | 1920px | Full HD monitor     |
| Ultra-wide       | 2560px | 4K / QHD monitor    |

### Key Things to Verify at Each Breakpoint

**Mobile (320px – 480px):**

- [ ] Mobile header shows (hamburger button visible, desktop nav hidden)
- [ ] Mobile video (`home-mobile.mp4`) plays in the hero section
- [ ] Bento grid collapses to horizontal scroll
- [ ] Brand page side nav is hidden
- [ ] All text is readable (no overflow)
- [ ] Touch targets are at least 44×44px

**Tablet (768px – 1024px):**

- [ ] At ≤ 960px: mobile header activates
- [ ] At > 960px: desktop header shows
- [ ] Bento grid shows 2-column layout
- [ ] Container width is 590px (portrait) or 976px (landscape)
- [ ] Hero video switches between mobile and desktop versions at 960px

**Desktop (1280px – 1920px):**

- [ ] Full desktop navigation visible
- [ ] Desktop video (`home.mp4`) plays with link to Personal brand
- [ ] Container is 1200px wide, centered
- [ ] All hover effects work (menu dropdowns, card hovers)

**Large Displays (2560px+):**

- [ ] Container stays at 1200px max-width, centered
- [ ] No layout stretching or overflow
- [ ] Background fills correctly

### Testing the Mobile Menu

1. Set viewport to ≤ 960px.
2. Click the hamburger button (top right).
3. Verify the slide-in menu appears from the right.
4. Verify the hamburger icon animates to an X.
5. Click a menu item with a submenu — verify it expands.
6. Click the X or overlay to close the menu.
7. Verify `show-menu` class is removed from `<body>`.

### Testing Touch Interactions

In Chrome DevTools Device Mode:

1. Enable **Touch** simulation (click the three-dot menu → More tools → Sensors, or use the device toolbar).
2. Verify tap targets respond correctly.
3. Test swipe/scroll behavior on mobile menu.
4. Verify no hover-only interactions are required for core functionality.

---

## Known Responsive Issues and Fixes

### Issue 1: Mobile Menu Overlay Click-Through

**Symptom:** On some mobile browsers, tapping the overlay behind the mobile menu doesn't close it.
**Fix:** The `.cs-mobile-menu-overlay` element handles this via CSS `pointer-events: all` when `show-menu` is active. The React `Header` component manages the `show-menu` body class via `useEffect`.

### Issue 2: Video Autoplay on Mobile

**Symptom:** Some mobile browsers block autoplay even with `muted` and `playsInline`.
**Fix:** `HeroBlock.tsx` calls `video.play().catch()` after the `IntersectionObserver` fires, silently catching autoplay errors. The poster image is always shown as fallback.

### Issue 3: Hero Aspect Ratio on Mobile

**Symptom:** The hero section uses a `3/4` aspect ratio on mobile (portrait video), which may feel tall on small screens.
**Status:** This matches the original HTML site behavior. Defined in `resp-cs.css`:

```css
@media only screen and (max-width: 960px) {
  #home #intro .cs-hero-type03 .cs-hero-media {
    aspect-ratio: 3 / 4;
  }
}
```

### Issue 4: Brand Side Navigation Hidden on Mobile

**Symptom:** The brand page side navigation disappears on mobile (≤ 639px).
**Status:** Expected behavior matching the original HTML site. The main content takes full width.

### Issue 5: Bento Grid Horizontal Scroll on Mobile

**Symptom:** On mobile (≤ 739px), the bento grid uses `grid-auto-flow: column` which creates a horizontal scroll container.
**Status:** This is intentional design from the original site. Ensure the parent container has `overflow-x: auto` or `overflow-x: hidden` as appropriate.

---

## Touch Interaction Support

### CSS Touch Targets

All interactive elements meet the minimum 44×44px touch target size:

- Mobile menu toggle button: `44px × 44px`
- Navigation links: `padding: 16px 0` (minimum 44px height on mobile)
- Buttons: `cs-button-spacing: 13px 24px 14px 24px`
- Square buttons: minimum `44px × 44px` on mobile

### Touch-Specific CSS

The `resp-cs.css` file overrides the mobile menu toggler icon colors for touch states:

```css
.cs-mobile-menu-toggler span {
  background: #fff !important;
  transition: 0.3s ease-in-out;
}
body.show-menu .cs-mobile-menu-toggler span {
  background: var(--cs-c-menu) !important;
}
```

### React Touch Event Handling

- Mobile menu toggle uses `onClick` (works for both mouse and touch).
- No `onMouseEnter`/`onMouseLeave`-only interactions are required for core functionality.
- Hover-only effects (dropdown menus on desktop) are replaced by click-based interactions on mobile via the `.mob-ok` / `.mob-no` class pattern.

### iOS Safari Considerations

- `playsInline` attribute is set on all `<video>` elements to prevent fullscreen on iOS.
- `muted` is required for autoplay on iOS Safari.
- The viewport meta tag uses `initial-scale=1.0` without `user-scalable=no` to allow pinch-to-zoom (accessibility best practice).

### Android Chrome Considerations

- Autoplay with `muted` is supported on Android Chrome.
- Touch events bubble correctly through the React synthetic event system.

---

## CSS Loading Order

The stylesheets are loaded in `index.html` in this specific order (required for correct cascade):

```html
<link rel="stylesheet" href="/assets/css/config.css" />
<!-- CSS variables & breakpoint vars -->
<link rel="stylesheet" href="/assets/css/libs.css" />
<!-- Third-party library styles -->
<link rel="stylesheet" href="/assets/css/style.css" />
<!-- Base component styles -->
<link rel="stylesheet" href="/assets/css/base.css" />
<!-- Typography & element resets -->
<link rel="stylesheet" href="/assets/css/content.css" />
<!-- Content section styles -->
<link rel="stylesheet" href="/assets/css/responsive.css" />
<!-- Breakpoint overrides -->
<link rel="stylesheet" href="/assets/css/resp-cs.css" />
<!-- ComuStock-specific responsive overrides -->
```

Brand-specific CSS (`assets/css/brands/{brand}.css`) is loaded dynamically by the `useBrandStyles` hook when a brand page is active.

---

## Related Files

| File                                                    | Purpose                                                                         |
| ------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `comustock-react/public/assets/css/config.css`          | CSS custom properties, typography scale, spacing, breakpoint variable overrides |
| `comustock-react/public/assets/css/responsive.css`      | Main responsive media queries (layout, grid, components)                        |
| `comustock-react/public/assets/css/resp-cs.css`         | ComuStock-specific responsive overrides (mob-ok/mob-no, hero, bento)            |
| `comustock-react/index.html`                            | Viewport meta tag, CSS loading order                                            |
| `comustock-react/src/components/features/HeroBlock.tsx` | Mobile/desktop video switching                                                  |
| `comustock-react/src/components/layout/Header.tsx`      | Mobile menu toggle, sticky header                                               |
| `comustock-react/src/hooks/useStickyHeader.ts`          | Scroll-based sticky header state                                                |
