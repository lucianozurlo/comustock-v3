# Image Optimization Report

> Generated as part of Task 15.4 — Optimize images and assets
> Requirements: 3.6, 8.2, 8.6

---

## Summary

- **Total raster images (JPG/PNG):** 57 files
- **Total SVG files:** 123 files
- **Images > 500 KB:** 4 files ⚠️
- **Images 200–500 KB:** 33 files
- **Images < 200 KB:** 20 files
- **Lazy loading status:** ✅ Implemented (IntersectionObserver + native `loading="lazy"`)

---

## Image Inventory

### ⚠️ Large Images (> 500 KB) — Priority for Compression

| File                                | Size   |
| ----------------------------------- | ------ |
| `audiovisuales/reel1.jpg`           | 992 KB |
| `audiovisuales/reel3.jpg`           | 660 KB |
| `home/templates/presentaciones.jpg` | 624 KB |
| `audiovisuales/reel4.jpg`           | 588 KB |

These four images exceed 500 KB and should be prioritized for compression or WebP conversion.

---

### Medium Images (200–500 KB)

| File                                | Size                     |
| ----------------------------------- | ------------------------ |
| `audiovisuales/reel2.jpg`           | 476 KB                   |
| `home/audiovisuales/publicidad.jpg` | 452 KB                   |
| `recursos/elementos.jpg`            | 408 KB                   |
| `toolkits/disenar/diseno6.jpg`      | 396 KB                   |
| `toolkits/disenar.jpg`              | 392 KB                   |
| `home/audiovisuales/imagenes.jpg`   | 380 KB                   |
| `recursos/fuentes.jpg`              | 352 KB                   |
| `recursos/iconos.jpg`               | 348 KB                   |
| `toolkits/redactar/redactar3.jpg`   | 344 KB                   |
| `home/audiovisuales/carteleras.jpg` | 340 KB                   |
| `home/templates/tufirma.jpg`        | 332 KB                   |
| `home/home-poster.jpg`              | 328 KB                   |
| `toolkits/redactar/redactar1.jpg`   | 312 KB                   |
| `toolkits/disenar/diseno5.jpg`      | 304 KB                   |
| `toolkits/redactar/redactar2.jpg`   | 296 KB                   |
| `toolkits/disenar/diseno4.jpg`      | 288 KB                   |
| `toolkits/disenar/diseno3.jpg`      | 284 KB                   |
| `toolkits/disenar/diseno11.jpg`     | 284 KB                   |
| `recursos/fuentes/tungsten.jpg`     | 276 KB                   |
| `home/home-mobile-poster.jpg`       | 276 KB                   |
| `toolkits/disenar/diseno9.jpg`      | 256 KB                   |
| `toolkits/disenar/diseno2.jpg`      | 256 KB                   |
| `recursos/iconos/iconos.jpg`        | 256 KB                   |
| `toolkits/redactar/.jpg`            | 252 KB ⚠️ (unnamed file) |
| `toolkits/redactar.jpg`             | 252 KB                   |
| `recursos/iconos/iconos-light.jpg`  | 252 KB                   |
| `toolkits/disenar/diseno8.jpg`      | 240 KB                   |
| `toolkits/disenar/diseno10.jpg`     | 240 KB                   |
| `toolkits/disenar/diseno7.jpg`      | 236 KB                   |
| `toolkits/disenar/diseno1.jpg`      | 228 KB                   |
| `recursos/fuentes/pulso.jpg`        | 204 KB                   |
| `home/templates/e-mails.jpg`        | 196 KB                   |
| `recursos/fuentes/roboto.jpg`       | 192 KB                   |

---

### Small Images (< 200 KB)

| File                                           | Size                             |
| ---------------------------------------------- | -------------------------------- |
| `home/templates/viva-engage.jpg`               | 168 KB                           |
| `ecosistema/personal/lineamientos/usosBG1.jpg` | 108 KB                           |
| `toolkits/disenar/diseno12.jpg`                | 104 KB                           |
| `toolkits/marca-empleadora.jpg`                | 80 KB                            |
| `home/toolkits/com-empatica.jpg`               | 64 KB                            |
| `ecosistema/flow/lineamientos/usosBG5.jpg`     | 56 KB                            |
| `ecosistema/flow/lineamientos/usosBG4.jpg`     | 56 KB                            |
| `home/toolkits/redactar.jpg`                   | 52 KB                            |
| `home/toolkits/diseniar.jpg`                   | 52 KB                            |
| `ecosistema/personal/lineamientos/usosBG4.jpg` | 52 KB                            |
| `ecosistema/personal/lineamientos/usosBG6.jpg` | 48 KB                            |
| `ecosistema/flow/lineamientos/usosBG2.jpg`     | 44 KB                            |
| `home/toolkits/marca-empleadora.jpg`           | 40 KB                            |
| `ecosistema/personal/lineamientos/usosBG3.jpg` | 40 KB                            |
| `ecosistema/personal/lineamientos/usosBG2.jpg` | 36 KB                            |
| `ecosistema/flow/lineamientos/usosBG3.jpg`     | 24 KB                            |
| `ecosistema/flow/lineamientos/usosBG1.jpg`     | 24 KB                            |
| `ecosistema/personal/lineamientos/usosBG5.jpg` | 20 KB                            |
| `null.png`                                     | 4 KB (placeholder — intentional) |
| `favicon.png`                                  | 4 KB                             |

---

## Lazy Loading Verification

### Implementation: `useLazyLoading` Hook

**File:** `src/hooks/useLazyLoading.ts`
**Status:** ✅ Correctly implemented

The hook uses `IntersectionObserver` with the following configuration:

- `rootMargin: '50px 0px'` — starts loading 50px before the image enters the viewport
- `threshold: 0.01` — triggers as soon as any part of the image is visible
- Swaps `data-src` → `src` on intersection
- Supports `data-srcset` for responsive images
- Removes `cs-lazy` class and adds `cs-loaded` on successful load
- Adds `cs-error` class and logs on failure
- Properly disconnects the observer on component unmount

### Pattern: `cs-lazy` + `data-src`

Images using this pattern start with a lightweight placeholder (`/assets/img/null.png`) and load the real image only when near the viewport.

| Component                    | Lazy Loading | Method                                    |
| ---------------------------- | ------------ | ----------------------------------------- |
| `PortfolioCard.tsx`          | ✅           | `cs-lazy` + `data-src` + `loading="lazy"` |
| `BrandResources.tsx`         | ✅           | `cs-lazy` + `data-src` + `loading="lazy"` |
| `RecursosPage.tsx` (fuentes) | ✅           | `cs-lazy` + `data-src` + `loading="lazy"` |
| `RecursosPage.tsx` (iconos)  | ✅           | `cs-lazy` + `data-src` + `loading="lazy"` |
| `ElementosPage.tsx`          | ✅           | `cs-lazy` + `data-src` + `loading="lazy"` |
| `DisenarPage.tsx`            | ✅           | `cs-lazy` + `loading="lazy"`              |
| `RedactarPage.tsx`           | ✅           | `cs-lazy` + `loading="lazy"`              |
| `BrandHeader.tsx`            | ✅           | `cs-lazy` (SVG header images)             |
| `BentoCard.tsx`              | ✅           | `data-bg-src` (CSS background images)     |

### Images Without Lazy Loading

The following components render images **without** lazy loading. These are intentional exceptions:

| Component             | Image                 | Reason                                                  |
| --------------------- | --------------------- | ------------------------------------------------------- |
| `Header.tsx`          | `logo-comustock.svg`  | Critical above-the-fold asset — should load immediately |
| `ToolkitsSection.tsx` | `home/toolkits/*.jpg` | Small images (40–64 KB) in a visible section            |
| `ToolkitsPage.tsx`    | `toolkits/*.jpg`      | Similar small images in a visible section               |
| `RecursosSection.tsx` | SVG icons/fonts       | Inline SVG references, negligible size                  |

**Recommendation:** Add `loading="lazy"` to `ToolkitsSection.tsx` and `ToolkitsPage.tsx` images as a low-effort improvement, even without the `cs-lazy` hook pattern.

---

## Anomalies Found

1. **Unnamed file:** `toolkits/redactar/.jpg` (252 KB) — a file with no base name. This should be renamed or removed to avoid confusion and potential 404 errors.

2. **Duplicate toolkit images:** `toolkits/redactar.jpg` and `home/toolkits/redactar.jpg` appear to serve the same purpose (52 KB vs 252 KB). The larger one in `toolkits/` may be a higher-resolution version used in the detail page.

---

## WebP Conversion Recommendations (Optional)

Converting JPGs to WebP typically yields 25–35% size reduction with equivalent visual quality. The highest-impact candidates are:

| File                                | Current Size | Estimated WebP Size | Savings |
| ----------------------------------- | ------------ | ------------------- | ------- |
| `audiovisuales/reel1.jpg`           | 992 KB       | ~650 KB             | ~340 KB |
| `audiovisuales/reel3.jpg`           | 660 KB       | ~430 KB             | ~230 KB |
| `home/templates/presentaciones.jpg` | 624 KB       | ~405 KB             | ~219 KB |
| `audiovisuales/reel4.jpg`           | 588 KB       | ~382 KB             | ~206 KB |
| `audiovisuales/reel2.jpg`           | 476 KB       | ~309 KB             | ~167 KB |

**Total estimated savings for top 5 files:** ~1.16 MB

### How to Convert

Using [sharp](https://sharp.pixelplumbing.com/) (Node.js):

```bash
npm install sharp
```

```js
const sharp = require('sharp');
sharp('input.jpg').webp({ quality: 80 }).toFile('output.webp');
```

Or using [Squoosh CLI](https://github.com/GoogleChromeLabs/squoosh/tree/dev/cli):

```bash
npx @squoosh/cli --webp '{"quality":80}' *.jpg
```

When serving WebP, use the `<picture>` element for browser fallback:

```html
<picture>
  <source srcset="/assets/img/audiovisuales/reel1.webp" type="image/webp" />
  <img src="/assets/img/audiovisuales/reel1.jpg" alt="Reel 1" loading="lazy" />
</picture>
```

---

## Compression Recommendations

For JPG images that remain in JPG format, lossless or near-lossless compression can reduce file sizes by 10–20% without visible quality loss.

**Recommended tools:**

- [imagemin](https://github.com/imagemin/imagemin) — Node.js batch compression
- [mozjpeg](https://github.com/mozilla/mozjpeg) — Mozilla's optimized JPEG encoder
- [pngquant](https://pngquant.org/) — for PNG files (favicon.png)

**Priority targets for compression (> 300 KB):**

| File                                | Size   |
| ----------------------------------- | ------ |
| `audiovisuales/reel1.jpg`           | 992 KB |
| `audiovisuales/reel3.jpg`           | 660 KB |
| `home/templates/presentaciones.jpg` | 624 KB |
| `audiovisuales/reel4.jpg`           | 588 KB |
| `audiovisuales/reel2.jpg`           | 476 KB |
| `home/audiovisuales/publicidad.jpg` | 452 KB |
| `recursos/elementos.jpg`            | 408 KB |
| `toolkits/disenar/diseno6.jpg`      | 396 KB |
| `toolkits/disenar.jpg`              | 392 KB |
| `home/audiovisuales/imagenes.jpg`   | 380 KB |
| `recursos/fuentes.jpg`              | 352 KB |
| `recursos/iconos.jpg`               | 348 KB |
| `toolkits/redactar/redactar3.jpg`   | 344 KB |
| `home/audiovisuales/carteleras.jpg` | 340 KB |
| `home/templates/tufirma.jpg`        | 332 KB |
| `home/home-poster.jpg`              | 328 KB |
| `toolkits/redactar/redactar1.jpg`   | 312 KB |

---

## Action Items

| Priority  | Action                                                                      | Impact                                      |
| --------- | --------------------------------------------------------------------------- | ------------------------------------------- |
| 🔴 High   | Compress/convert `audiovisuales/reel*.jpg` (4 files, ~2.7 MB total)         | High — these are the largest files          |
| 🔴 High   | Rename or remove `toolkits/redactar/.jpg` (unnamed file)                    | Low size, high code quality                 |
| 🟡 Medium | Compress `home/templates/presentaciones.jpg` (624 KB)                       | Medium                                      |
| 🟡 Medium | Add `loading="lazy"` to `ToolkitsSection.tsx` and `ToolkitsPage.tsx` images | Low effort, good practice                   |
| 🟢 Low    | Convert all JPGs > 200 KB to WebP with JPG fallback                         | High savings, requires `<picture>` refactor |
| 🟢 Low    | Run `pngquant` on `favicon.png`                                             | Minimal impact                              |
