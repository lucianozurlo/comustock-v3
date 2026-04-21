# Cross-Browser Compatibility

## Overview

This document describes the cross-browser compatibility strategy for the ComuStock React application, including the browser support matrix, known issues, applied fixes, and instructions for manual cross-browser testing.

---

## Browser Support Matrix

| Browser         | Versions Supported | Status     | Notes                                                                    |
| --------------- | ------------------ | ---------- | ------------------------------------------------------------------------ |
| Chrome          | Latest 2           | ✅ Full    | Primary development target                                               |
| Firefox         | Latest 2           | ✅ Full    | Tested, no known issues                                                  |
| Safari          | Latest 2           | ✅ Full    | Requires vendor prefixes (handled by autoprefixer)                       |
| Edge (Chromium) | Latest 2           | ✅ Full    | Chromium-based, same as Chrome                                           |
| iOS Safari      | Latest 2           | ✅ Full    | `playsInline` required for video; IntersectionObserver fallback in place |
| Android Chrome  | Latest 2           | ✅ Full    | Tested via Chrome DevTools device emulation                              |
| IE 11           | Not supported      | ❌ Dropped | Not in browserslist target                                               |

The `browserslist` field in `package.json` defines the exact target:

```json
"browserslist": [
  "last 2 Chrome versions",
  "last 2 Firefox versions",
  "last 2 Safari versions",
  "last 2 Edge versions",
  "last 2 iOS versions",
  "last 2 Android versions",
  "not dead"
]
```

---

## Build Target

`vite.config.ts` sets `build.target: 'es2015'`, which ensures the compiled output is compatible with:

- Chrome 49+
- Firefox 44+
- Safari 10+
- Edge 14+
- iOS Safari 10+
- Android Chrome 49+

This covers all browsers in the support matrix above.

---

## CSS Vendor Prefixes — Autoprefixer

**Configuration:** `postcss.config.js` + `autoprefixer` dev dependency.

Autoprefixer is integrated into the Vite CSS pipeline via `postcss.config.js`. It automatically adds vendor prefixes to CSS properties based on the `browserslist` targets. This handles:

- `-webkit-` prefixes for Safari/iOS (e.g., `transform`, `transition`, `animation`, `flex`, `grid`)
- `-moz-` prefixes for older Firefox
- `-ms-` prefixes for Edge legacy (where applicable)

No manual vendor prefixes are needed in the source CSS files.

---

## APIs Used — Polyfill Status

### IntersectionObserver

Used in:

- `src/hooks/useScrollAnimations.ts` — scroll-triggered entrance animations
- `src/hooks/useLazyLoading.ts` — lazy image loading

**Browser support:** Chrome 51+, Firefox 55+, Safari 12.1+, Edge 15+, iOS Safari 12.2+.

**Fallback implemented:** Both hooks check `'IntersectionObserver' in window` before creating an observer. If the API is unavailable:

- `useScrollAnimations`: All animated elements are immediately made visible with their animation class applied.
- `useLazyLoading`: All lazy images are loaded immediately (no deferred loading).

This ensures the page is fully functional on browsers without IntersectionObserver support.

### requestAnimationFrame

Used in:

- `src/hooks/useStickyHeader.ts` — scroll event throttling

**Browser support:** All modern browsers. No polyfill needed for the target browser matrix.

### scrollTo with `behavior: 'smooth'`

Used in:

- `src/hooks/useHashNavigation.ts` — smooth scroll to hash anchors

**Browser support:** Chrome 61+, Firefox 36+, Safari 15.4+, Edge 79+.

**Note:** On Safari versions before 15.4, `behavior: 'smooth'` is silently ignored and the page jumps instantly to the target. This is acceptable degraded behavior — the user still reaches the correct section.

### CSS `scroll-behavior: smooth`

**Browser support:** All target browsers. Handled by autoprefixer where needed.

### Video `playsInline` attribute

Used in:

- `src/components/features/HeroBlock.tsx` — hero background video

**Required for iOS Safari** to prevent fullscreen video playback. The attribute is already applied in the component.

### `window.pageYOffset` (deprecated alias for `scrollY`)

Used in:

- `src/hooks/useStickyHeader.ts` — as fallback: `window.scrollY || window.pageYOffset`

Both are supported in all target browsers. The fallback ensures compatibility with any edge cases.

---

## Known Browser-Specific Issues and Fixes

### 1. iOS Safari — Video Autoplay

**Issue:** iOS Safari requires `muted`, `autoplay`, `playsInline`, and `loop` attributes together for background video autoplay.

**Fix:** `HeroBlock.tsx` already includes all four attributes on the `<video>` element.

### 2. Safari — CSS `gap` in Flexbox

**Issue:** Older Safari versions (< 14.1) do not support `gap` in flexbox contexts.

**Fix:** Autoprefixer handles this. For any remaining issues, use `margin` as a fallback in the source CSS.

### 3. Safari — `position: sticky` in overflow containers

**Issue:** `position: sticky` does not work inside elements with `overflow: hidden` or `overflow: auto` in Safari.

**Fix:** The sticky header uses `overflow: visible` on its parent containers. If sticky behavior breaks in Safari, check parent overflow values.

### 4. Firefox — Custom Scrollbar Styling

**Issue:** Firefox does not support `::-webkit-scrollbar` pseudo-elements.

**Fix:** Use the standard `scrollbar-width` and `scrollbar-color` CSS properties alongside webkit variants. Autoprefixer does not handle scrollbar pseudo-elements — these must be written manually if custom scrollbars are needed.

### 5. Edge (Legacy, pre-Chromium) — Not Supported

Legacy Edge (EdgeHTML) is not in the browserslist target and is not supported. All modern Edge versions are Chromium-based and behave identically to Chrome.

### 6. Android Chrome — Touch Events

**Issue:** Hover states do not apply on touch devices.

**Fix:** CSS hover effects are purely visual enhancements. Core functionality does not depend on hover. Touch tap events are handled via standard React `onClick` handlers.

---

## How to Run Cross-Browser Tests Manually

### Desktop Browsers

1. Run the development server:
   ```bash
   npm run dev
   ```
2. Open `http://localhost:3000` in each target browser.
3. Test the following flows in each browser:
   - Home page loads with hero video playing
   - Navigation menu opens/closes (desktop and mobile)
   - Brand pages load with correct styles
   - Section pages load and hash navigation works
   - Scroll animations trigger correctly
   - Lazy images load as you scroll
   - Sticky header activates on scroll
   - Forms validate and submit correctly
   - Modals open, trap focus, and close with Escape

### Mobile Browsers (iOS Safari & Android Chrome)

**Option A — Chrome DevTools Device Emulation:**

1. Open Chrome DevTools (`F12`)
2. Click the device toolbar icon (or `Ctrl+Shift+M`)
3. Select a device preset (e.g., iPhone 14, Pixel 7)
4. Test all flows listed above

**Option B — Real Device Testing:**

1. Find your local IP address (e.g., `192.168.1.x`)
2. Start the dev server with host binding:
   ```bash
   npx vite --host
   ```
3. Open `http://192.168.1.x:3000` on your mobile device
4. Test all flows listed above

**Option C — BrowserStack / Sauce Labs:**

- Use a cloud testing service for real device testing across iOS and Android versions
- Run the production build (`npm run build && npm run preview`) and expose it via ngrok or similar

### Production Build Testing

Always test the production build before deployment:

```bash
npm run build
npm run preview
```

Open `http://localhost:4173` and repeat the manual test flows.

---

## CSS Compatibility Checklist

- [x] Autoprefixer configured via `postcss.config.js`
- [x] `browserslist` defined in `package.json`
- [x] Build target set to `es2015` in `vite.config.ts`
- [x] CSS custom properties (variables) used — supported in all target browsers
- [x] CSS Grid — supported in all target browsers (autoprefixer adds `-ms-` prefixes for older Edge if needed)
- [x] CSS Flexbox — supported in all target browsers (autoprefixer adds `-webkit-` prefixes)
- [x] CSS `position: sticky` — supported in all target browsers
- [x] CSS animations and transitions — supported in all target browsers (autoprefixer adds `-webkit-` prefixes)

## JavaScript Compatibility Checklist

- [x] Build target `es2015` — arrow functions, classes, template literals, destructuring all transpiled
- [x] `IntersectionObserver` — graceful fallback implemented in `useScrollAnimations` and `useLazyLoading`
- [x] `requestAnimationFrame` — supported natively in all target browsers
- [x] `scrollTo` with smooth behavior — degrades gracefully on older Safari
- [x] Video `playsInline` — applied in `HeroBlock` for iOS Safari compatibility
- [x] `window.scrollY || window.pageYOffset` — dual fallback in `useStickyHeader`
