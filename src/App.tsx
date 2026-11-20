/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExperienceIntro from './components/ExperienceIntro';
import SecurityPrivacy from './components/SecurityPrivacy';
import Faq from './components/Faq';
import FinalCta from './components/FinalCta';
import OnboardingModal from './components/OnboardingModal';
import LegalPage from './components/LegalPage';

function currentPath() {
  return window.location.pathname.replace(/\/+$/, '') || '/';
}

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const language = 'ko';
  const path = currentPath();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

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
      <Navbar onOpenModal={handleOpenModal} language={language} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onOpenModal={handleOpenModal} language={language} />
        <ExperienceIntro onOpenModal={handleOpenModal} language={language} />
        <SecurityPrivacy onOpenModal={handleOpenModal} language={language} />
        <Faq language={language} />
        <FinalCta onOpenModal={handleOpenModal} language={language} />
      </main>

      {/* Interactive Onboarding / Demo Modal */}
      <OnboardingModal isOpen={isModalOpen} onClose={handleCloseModal} language={language} />
    </div>
  );
}
