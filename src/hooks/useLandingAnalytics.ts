import { useEffect } from 'react';
import posthog from 'posthog-js';

const PAGE = 'home';

type SeenState = { path: string; sections: Set<string> };
let seenState: SeenState | null = null;

function sectionsSeenForPath(path: string) {
  if (!seenState || seenState.path !== path) {
    seenState = { path, sections: new Set() };
  }
  return seenState.sections;
}

function trackSectionView(section: string) {
  posthog.capture('section_view', { section, page: PAGE });
}

function trackCtaClick(ctaId: string, position: string) {
  posthog.capture('cta_click', {
    cta_id: ctaId,
    position,
    surface: PAGE,
    page: PAGE,
  });
}

/** Fires section_view once per section per pageview, and cta_click on primary CTA buttons. */
export function useLandingAnalytics() {
  useEffect(() => {
    const seen = sectionsSeenForPath(window.location.pathname.replace(/\/+$/, '') || '/');

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const section = entry.target.getAttribute('data-section');
          if (!section || seen.has(section)) continue;
          seen.add(section);
          trackSectionView(section);
        }
      },
      { threshold: 0.2 },
    );

    document.querySelectorAll('[data-section]').forEach((node) => observer.observe(node));

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const el = target.closest<HTMLElement>('[data-cta-id]');
      if (!el) return;
      const ctaId = el.getAttribute('data-cta-id');
      const position = el.getAttribute('data-cta-position');
      if (!ctaId || !position) return;
      trackCtaClick(ctaId, position);
      window.fbq?.('track', 'Lead');
    };

    document.addEventListener('click', onClick);
    return () => {
      observer.disconnect();
      document.removeEventListener('click', onClick);
    };
  }, []);
}
