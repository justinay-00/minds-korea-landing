/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExperienceIntro from './components/ExperienceIntro';
import SecurityPrivacy from './components/SecurityPrivacy';
import Faq from './components/Faq';
import FinalCta from './components/FinalCta';
import LegalPage from './components/LegalPage';

function currentPath() {
  return window.location.pathname.replace(/\/+$/, '') || '/';
}

export default function App() {
  const language = 'ko';
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
      className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-[#FF6B4A] selection:text-white"
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
