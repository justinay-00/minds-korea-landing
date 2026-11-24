/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { useLandingAnalytics } from './hooks/useLandingAnalytics';
import { getCurrentRoute } from './utils/routing';
import { getPageMetadata } from './utils/pageMetadata';
import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';

const LegalPage = lazy(() => import('./components/LegalPage'));
const ExperienceIntro = lazy(() => import('./components/ExperienceIntro'));
const SecurityPrivacy = lazy(() => import('./components/SecurityPrivacy'));
const Faq = lazy(() => import('./components/Faq'));
const FinalCta = lazy(() => import('./components/FinalCta'));
const legalPageFallback = (
  <main lang="ko-KR" className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-600">
    페이지를 불러오는 중입니다.
  </main>
);

function LazySection({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldRender(true);
        observer.disconnect();
      },
      { rootMargin: '300px 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {shouldRender ? (
        <Suspense fallback={null}>{children}</Suspense>
      ) : null}
    </div>
  );
}

export default function App() {
  const language = 'ko';
  useLandingAnalytics();
  const route = getCurrentRoute();

  useEffect(() => {
    document.documentElement.lang = 'ko-KR';
    const metadata = getPageMetadata(route, language);
    document.title = metadata.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) {
      description.content = metadata.description;
    }
    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (robots) {
      robots.content = metadata.robots ?? 'index, follow, max-image-preview:large';
    }

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical && metadata.canonical) {
      canonical.href = metadata.canonical;
    } else if (canonical) {
      canonical.remove();
    }

    const updateMeta = (selector: string, content: string) => {
      const element = document.querySelector<HTMLMetaElement>(selector);
      if (element) element.content = content;
    };
    updateMeta('meta[property="og:title"]', metadata.title);
    updateMeta('meta[property="og:description"]', metadata.description);
    if (metadata.canonical) {
      updateMeta('meta[property="og:url"]', metadata.canonical);
    }
    updateMeta('meta[name="twitter:title"]', metadata.title);
    updateMeta('meta[name="twitter:description"]', metadata.description);
  }, [route]);

  if (route === '/kr/privacy') {
    return (
      <Suspense fallback={legalPageFallback}>
        <LegalPage kind="privacy" language={language} />
      </Suspense>
    );
  }

  if (route === '/kr/terms') {
    return (
      <Suspense fallback={legalPageFallback}>
        <LegalPage kind="terms" language={language} />
      </Suspense>
    );
  }

  if (route === '/not-found') {
    return (
      <main lang="ko-KR" className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-center text-slate-900">
        <div>
          <h1 className="text-2xl font-bold">페이지를 찾을 수 없습니다</h1>
          <a href="/kr" className="mt-4 inline-block text-[#3D7EED] underline">
            홈으로 돌아가기
          </a>
        </div>
      </main>
    );
  }

  return (
    <div
      lang="ko-KR"
      translate="yes"
      data-language={language}
      className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-[#FF6B4A] selection:text-white"
    >
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero language={language} />
        <LazySection>
          <ExperienceIntro language={language} />
        </LazySection>
        <LazySection>
          <SecurityPrivacy language={language} />
        </LazySection>
        <LazySection>
          <Faq language={language} />
        </LazySection>
        <LazySection>
          <FinalCta language={language} />
        </LazySection>
      </main>

    </div>
  );
}
