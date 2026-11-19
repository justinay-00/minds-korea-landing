import { useState, useEffect } from 'react';

interface NavbarProps {
  onOpenModal: () => void;
  language: 'en' | 'ko';
  onLanguageChange: (language: 'en' | 'ko') => void;
}

export default function Navbar({ onOpenModal, language, onLanguageChange }: NavbarProps) {
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
      className={`glass-card-v2 glass-static sticky top-0 z-50 transition-all duration-300 border-b ${
        scrolled ? 'border-slate-200/90' : 'border-slate-200/50'
      }`}
    >
      <div className="mx-auto flex h-[48px] max-w-5xl items-center justify-between gap-[8px] px-[12px] sm:gap-[24px] sm:px-[40px] lg:px-[48px]">
        {/* Brand Wordmark */}
        <a href="#" className="flex items-center shrink-0 focus-visible:outline-sky-500 rounded-lg">
          <img
            src="/assets/aistudio/minds-logo-blue-CNYWXNj8_1cee06dc.png"
            alt="Minds by Animoca Brands"
            className="h-6 w-auto object-contain sm:h-8"
          />
        </a>

        {/* Primary Action Buttons */}
        <div className="flex shrink-0 items-center gap-[4px] sm:gap-[12px]">
          <div className="flex shrink-0 items-center rounded-full border border-slate-200 p-[2px] text-[10px] font-semibold sm:text-xs">
            {(['en', 'ko'] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onLanguageChange(option)}
                aria-pressed={language === option}
                aria-label={option === 'en' ? 'View in English' : '한국어로 보기'}
                className={`rounded-full px-[8px] py-[4px] transition ${
                  language === option ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {option === 'ko' ? 'KR' : 'EN'}
              </button>
            ))}
          </div>
          <button
            onClick={onOpenModal}
            className="hidden shrink-0 whitespace-nowrap px-[12px] py-[8px] text-sm font-medium text-slate-600 transition hover:text-slate-900 sm:inline-flex cursor-pointer"
          >
            {language === 'ko' ? '로그인' : 'Log in'}
          </button>
          <button
            onClick={onOpenModal}
            className="flex shrink-0 items-center gap-[4px] whitespace-nowrap rounded-full border border-white/50 bg-gradient-to-br from-sky-500/85 via-blue-600/85 to-cyan-700/85 px-[12px] py-[8px] text-xs font-semibold text-white shadow-md shadow-blue-900/20 transition hover:from-sky-400 hover:via-blue-500 hover:to-cyan-600 active:scale-[0.98] cursor-pointer sm:gap-[8px] sm:px-[16px] sm:text-sm"
          >
            <span>{language === 'ko' ? '시작하기' : 'Get Started'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
