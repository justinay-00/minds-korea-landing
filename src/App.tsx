/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExperienceIntro from './components/ExperienceIntro';
import SecurityPrivacy from './components/SecurityPrivacy';
import Faq from './components/Faq';
import FinalCta from './components/FinalCta';
import OnboardingModal from './components/OnboardingModal';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ko'>(() => {
    const savedLanguage = window.localStorage.getItem('minds-language');
    return savedLanguage === 'ko' ? 'ko' : 'en';
  });

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleLanguageChange = (nextLanguage: 'en' | 'ko') => {
    setLanguage(nextLanguage);
    window.localStorage.setItem('minds-language', nextLanguage);
  };

  return (
    <div
      data-language={language}
      className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-sky-500 selection:text-white"
    >
      {/* Top Navigation */}
      <Navbar onOpenModal={handleOpenModal} language={language} onLanguageChange={handleLanguageChange} />

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
