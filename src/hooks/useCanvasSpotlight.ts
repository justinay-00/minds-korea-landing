import { useEffect } from 'react';

/** Official v2 cursor spotlight: writes --cursor-x-v2 / --cursor-y-v2 for the page wash. */
export function useCanvasSpotlight() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const root = document.documentElement;
    let frame = 0;
    let x = -400;
    let y = -400;

    const onMove = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        root.style.setProperty('--cursor-x-v2', `${x}px`);
        root.style.setProperty('--cursor-y-v2', `${y}px`);
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (frame) cancelAnimationFrame(frame);
      root.style.removeProperty('--cursor-x-v2');
      root.style.removeProperty('--cursor-y-v2');
    };
  }, []);
}
