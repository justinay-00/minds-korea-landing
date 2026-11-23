import { useState, useEffect } from 'react';

interface NavbarProps {
  language: 'en' | 'ko';
  onLanguageChange: (language: 'en' | 'ko') => void;
}

export default function Navbar({ language, onLanguageChange }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`glass-card-v2 glass-static sticky top-0 z-50 transition-all duration-300 border-b shadow-[inset_0_2px_0_0_#FF6B4A] ${
        scrolled ? 'border-slate-200/90' : 'border-slate-200/50'
      }`}
    >
      <div className="mx-auto flex h-[56px] max-w-5xl items-center justify-between gap-[8px] px-[12px] pb-[6px] pt-[2px] sm:gap-[24px] sm:px-[40px] lg:px-[48px]">
        {/* Brand Wordmark */}
        <a href="/" className="flex items-center shrink-0 focus-visible:outline-[#3D7EED] rounded-lg">
          <img
            src="/assets/aistudio/minds-logo-blue.svg"
            alt="Minds by Animoca Brands"
            className="h-6 w-auto object-contain sm:h-8"
          />
        </a>

        {/* Primary Action Buttons */}
        <div className="flex shrink-0 items-center gap-[4px] sm:gap-[12px]">
          <div
            className="flex items-center rounded-full border border-slate-200 bg-white/70 p-[2px] text-[10px] font-semibold sm:text-xs"
            aria-label={language === 'ko' ? '언어 선택' : 'Select language'}
          >
            {(['ko', 'en'] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onLanguageChange(option)}
                aria-pressed={language === option}
                className={`rounded-full px-[7px] py-[4px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#3D7EED] sm:px-[9px] ${
                  language === option ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {option.toUpperCase()}
              </button>
            ))}
          </div>
          <a
            href="https://app.hellominds.ai/"
            className="hidden shrink-0 whitespace-nowrap px-[8px] py-[6px] text-sm font-medium text-[#3D7EED] transition hover:text-[#4EA5F1] sm:inline-flex sm:px-[12px] sm:text-base cursor-pointer"
          >
            {language === 'ko' ? '로그인' : 'Log in'}
          </a>
          <a
            href="https://app.hellominds.ai/"
            data-cta-id="cta_try_app"
            data-cta-position="nav"
            className="flex shrink-0 items-center gap-[4px] whitespace-nowrap rounded-full btn-lit-blue px-[12px] py-[8px] text-sm font-medium text-white transition cursor-pointer sm:gap-[8px] sm:px-[16px] sm:py-[8px] sm:text-base"
          >
            <span>{language === 'ko' ? '무료로 시작하기' : 'Get Started'}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
