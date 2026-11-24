import { useEffect } from 'react';

const PAGE = 'home';
const posthogKey = import.meta.env.VITE_POSTHOG_PROJECT_TOKEN;

type PostHog = typeof import('posthog-js').default;
type Capture = { event: string; properties: Record<string, string> };

let posthogLoad: Promise<PostHog> | null = null;
let loadTimer: ReturnType<typeof setTimeout> | null = null;
const pendingCaptures: Capture[] = [];

function loadPosthog() {
  const key = posthogKey;
  if (!key) {
    throw new Error('PostHog project token is required to initialize analytics.');
  }
  if (!posthogLoad) {
    posthogLoad = import('posthog-js')
      .then(({ default: posthog }) => {
        posthog.init(key, {
          api_host: import.meta.env.VITE_POSTHOG_HOST,
          defaults: '2026-08-30',
        });
        return posthog;
      })
      .catch((error: unknown) => {
        posthogLoad = null;
        throw error;
      });
  }
  return posthogLoad;
}

function flushCaptures(posthog: PostHog) {
  for (const capture of pendingCaptures.splice(0)) {
    posthog.capture(capture.event, capture.properties);
  }
}

function requestPosthogLoad(immediate = false) {
  if (!posthogKey) return;
  if (loadTimer !== null) {
    if (!immediate) return;
    clearTimeout(loadTimer);
    loadTimer = null;
  }
  if (!immediate) {
    loadTimer = setTimeout(() => {
      loadTimer = null;
      requestPosthogLoad(true);
    }, 1000);
    return;
  }
  void loadPosthog()
    .then(flushCaptures)
    .catch((error: unknown) => console.error('Unable to load PostHog analytics.', error));
}

function capture(event: string, properties: Record<string, string>, immediate = false) {
  if (!posthogKey) return;
  pendingCaptures.push({ event, properties });
  requestPosthogLoad(immediate);
}

type SeenState = { path: string; sections: Set<string> };
let seenState: SeenState | null = null;

function sectionsSeenForPath(path: string) {
  if (!seenState || seenState.path !== path) {
    seenState = { path, sections: new Set() };
  }
  return seenState.sections;
}

function trackSectionView(section: string) {
  capture('section_view', { section, page: PAGE });
}

function trackCtaClick(ctaId: string, position: string) {
  capture('cta_click', {
    cta_id: ctaId,
    position,
    surface: PAGE,
    page: PAGE,
  }, true);
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
