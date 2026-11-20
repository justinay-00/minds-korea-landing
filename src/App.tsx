/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCanvasSpotlight } from './hooks/useCanvasSpotlight';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExperienceIntro from './components/ExperienceIntro';
import SecurityPrivacy from './components/SecurityPrivacy';
import Faq from './components/Faq';
import FinalCta from './components/FinalCta';
import LegalPage from './components/LegalPage';
import { useLandingAnalytics } from './analytics';

function currentPath() {
  return window.location.pathname.replace(/\/+$/, '') || '/';
}

export default function App() {
  const language = 'ko';
  useCanvasSpotlight();
  useLandingAnalytics();
  const path = currentPath();

  if (path === '/privacy') {
    return <LegalPage kind="privacy" language={language} />;
  }

  if (path === '/terms') {
    return <LegalPage kind="terms" language={language} />;
  }

  return (
    <div
      data-language={language}
      className="min-h-screen page-wash text-[var(--text-title-cool)] flex flex-col justify-between selection:bg-[var(--orange)] selection:text-white"
    >
      {/* Top Navigation */}
      <Navbar language={language} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero language={language} />
        <ExperienceIntro language={language} />
        <SecurityPrivacy language={language} />
        <Faq language={language} />
        <FinalCta language={language} />
      </main>

    </div>
  );
}
