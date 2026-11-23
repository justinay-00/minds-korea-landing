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
import { useLandingAnalytics } from './analytics';
import { useEffect, useState } from 'react';

function currentPath() {
  return window.location.pathname.replace(/\/+$/, '') || '/';
}

export default function App() {
  const [language, setLanguage] = useState<'en' | 'ko'>(() => (
    window.localStorage.getItem('minds-language') === 'en' ? 'en' : 'ko'
  ));
  useLandingAnalytics();
  const path = currentPath();

  useEffect(() => {
    document.documentElement.lang = language === 'ko' ? 'ko-KR' : 'en';
    const title = path === '/privacy'
      ? language === 'ko' ? '개인정보 처리방침 | Minds' : 'Privacy Policy | Minds'
      : path === '/terms'
        ? language === 'ko' ? '이용약관 | Minds' : 'Terms of Use | Minds'
        : language === 'ko'
          ? '마인즈 (Minds) — 당신의 일상을 함께 움직이는 AI'
          : 'Minds — Your AI partner for everyday life';
    document.title = title;

    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) {
      description.content = language === 'ko'
        ? '마인즈는 당신의 일상을 함께하는 AI 파트너입니다. 번거로운 일은 덜고 필요한 순간 먼저 다가갑니다.'
        : 'Minds is your AI partner for everyday life, helping with the busywork and reaching out when you need a hand.';
    }
  }, [language, path]);

  const handleLanguageChange = (nextLanguage: 'en' | 'ko') => {
    setLanguage(nextLanguage);
    window.localStorage.setItem('minds-language', nextLanguage);
  };

  if (path === '/privacy') {
    return <LegalPage kind="privacy" language={language} onLanguageChange={handleLanguageChange} />;
  }

  if (path === '/terms') {
    return <LegalPage kind="terms" language={language} onLanguageChange={handleLanguageChange} />;
  }

  return (
    <div
      lang={language === 'ko' ? 'ko-KR' : 'en'}
      translate="yes"
      data-language={language}
      className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-[#FF6B4A] selection:text-white"
    >
      {/* Top Navigation */}
      <Navbar language={language} onLanguageChange={handleLanguageChange} />

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
