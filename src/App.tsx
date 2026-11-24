/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LegalPage from './components/LegalPage';
import { useLandingAnalytics } from './hooks/useLandingAnalytics';
import { getCurrentRoute } from './utils/routing';
import { getPageMetadata } from './utils/pageMetadata';
import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';

const ExperienceIntro = lazy(() => import('./components/ExperienceIntro'));
const SecurityPrivacy = lazy(() => import('./components/SecurityPrivacy'));
const Faq = lazy(() => import('./components/Faq'));
const FinalCta = lazy(() => import('./components/FinalCta'));

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
  }, [route]);

  if (route === '/privacy') {
    return <LegalPage kind="privacy" language={language} />;
  }

  if (route === '/terms') {
    return <LegalPage kind="terms" language={language} />;
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
