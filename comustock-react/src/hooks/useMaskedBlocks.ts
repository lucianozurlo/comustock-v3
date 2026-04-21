import { useEffect } from 'react';

/**
 * useMaskedBlocks Hook
 *
 * Replicates the cs_Masked class from classes.js.
 * Creates SVG clip-path masks for .cs-masked-block elements,
 * cutting out a rounded corner where .cs-masked-content overlaps .cs-masked-media.
 *
 * Uses MutationObserver to handle lazy-loaded components.
 *
 * @param deps - Pass [location.pathname] to re-run on route change
 */
export const useMaskedBlocks = (deps: unknown[] = []) => {
  useEffect(() => {
    const initBlock = (block: HTMLElement) => {
      const media = block.querySelector<HTMLElement>('.cs-masked-media');
      const content = block.querySelector<HTMLElement>('.cs-masked-content');

      if (!media || !content) return;
      if (block.dataset.maskInit) return;
      block.dataset.maskInit = '1';

      const maskId = 'mask_' + Math.random().toString(36).substr(2, 9);

      // Create SVG clip-path element
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '0');
      svg.setAttribute('height', '0');
      svg.classList.add('cs-mask-svg');
      svg.style.cssText = 'position:absolute;left:0;top:0;pointer-events:none;';

      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      const clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
      clipPath.setAttribute('id', maskId);
      const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');

      clipPath.appendChild(pathEl);
      defs.appendChild(clipPath);
      svg.appendChild(defs);
      block.appendChild(svg);

      media.style.clipPath = `url(#${maskId})`;

      const applyMask = () => {
        const blockRect = block.getBoundingClientRect();
        const contentRect = content.getBoundingClientRect();

        if (blockRect.width === 0 || blockRect.height === 0) return;
        if (contentRect.width === 0 || contentRect.height === 0) return;

        const tw = Math.round(blockRect.width);
        const th = Math.round(blockRect.height);
        const cw = Math.round(contentRect.width);
        const ch = Math.round(contentRect.height);

        const brStr = getComputedStyle(block).getPropertyValue('--masked-border-radius').trim();
        const br = parseInt(brStr) || 24;
        const ibr = br;

        const dTop = Math.round(contentRect.top - blockRect.top);
        const dBottom = Math.round(blockRect.bottom - contentRect.bottom);
        const dRight = Math.round(blockRect.right - contentRect.right);
        const dLeft = Math.round(contentRect.left - blockRect.left);

        const isBottom = dBottom <= 2;
        const isTop = dTop <= 2;
        const isRight = dRight <= 2;
        const isLeft = dLeft <= 2;

        let path = '';

        if (isBottom && isRight) {
          path = `M0,${br} a${br},${br} 0 0 1 ${br},-${br} L${tw - br},0 a${br},${br} 0 0 1 ${br},${br} L${tw},${th - ch - br} a${br},${br} 0 0 1 -${br},${br} L${tw - cw + ibr},${th - ch} a${ibr},${ibr} 0 0 0 -${ibr},${ibr} L${tw - cw},${th - br} a${br},${br} 0 0 1 -${br},${br} L${br},${th} a${br},${br} 0 0 1 -${br},-${br} Z`;
        } else if (isBottom && isLeft) {
          path = `M0,${br} a${br},${br} 0 0 1 ${br},-${br} L${tw - br},0 a${br},${br} 0 0 1 ${br},${br} L${tw},${th - br} a${br},${br} 0 0 1 -${br},${br} L${cw + br},${th} a${br},${br} 0 0 1 -${br},-${br} L${cw},${th - ch + ibr} a${ibr},${ibr} 0 0 0 -${ibr},-${ibr} L${br},${th - ch} a${br},${br} 0 0 1 -${br},-${br} Z`;
        } else if (isTop && isRight) {
          path = `M0,${br} a${br},${br} 0 0 1 ${br},-${br} L${tw - cw - br},0 a${br},${br} 0 0 1 ${br},${br} L${tw - cw},${ch - ibr} a${ibr},${ibr} 0 0 0 ${ibr},${ibr} L${tw - br},${ch} a${br},${br} 0 0 1 ${br},${br} L${tw},${th - br} a${br},${br} 0 0 1 -${br},${br} L${br},${th} a${br},${br} 0 0 1 -${br},-${br} Z`;
        } else {
          path = `M0,${br} a${br},${br} 0 0 1 ${br},-${br} L${tw - br},0 a${br},${br} 0 0 1 ${br},${br} L${tw},${th - br} a${br},${br} 0 0 1 -${br},${br} L${br},${th} a${br},${br} 0 0 1 -${br},-${br} Z`;
        }

        pathEl.setAttribute('d', path);
      };

      // Apply after a short delay to ensure layout is complete
      setTimeout(applyMask, 50);
      setTimeout(applyMask, 300);

      const resizeHandler = () => applyMask();
      window.addEventListener('resize', resizeHandler);

      (block as HTMLElement & { _maskCleanup?: () => void })._maskCleanup = () => {
        window.removeEventListener('resize', resizeHandler);
      };
    };

    // Process existing blocks
    document.querySelectorAll<HTMLElement>('.cs-masked-block').forEach(initBlock);

    // Watch for new blocks added by lazy-loaded components
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          const el = node as HTMLElement;
          if (el.classList?.contains('cs-masked-block')) initBlock(el);
          el.querySelectorAll?.('.cs-masked-block').forEach((b) => initBlock(b as HTMLElement));
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      document
        .querySelectorAll<HTMLElement & { _maskCleanup?: () => void }>('.cs-masked-block')
        .forEach((block) => {
          block._maskCleanup?.();
          delete block.dataset.maskInit;
          block.querySelector('svg.cs-mask-svg')?.remove();
          const media = block.querySelector<HTMLElement>('.cs-masked-media');
          if (media) media.style.clipPath = '';
        });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
