import { useState, useEffect } from 'react';

interface NavbarProps {
  language: 'en' | 'ko';
}

export default function Navbar({ language }: NavbarProps) {
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
      <div className="mx-auto flex h-[56px] max-w-5xl items-center justify-between gap-[12px] px-[12px] pb-[6px] pt-[2px] sm:gap-[32px] sm:px-[40px] lg:px-[48px]">
        {/* Brand Wordmark */}
        <a href="/" className="flex items-center shrink-0 focus-visible:outline-[#3D7EED] rounded-lg">
          <img
            src="/assets/aistudio/minds-logo-blue.svg"
            alt="Minds by Animoca Brands"
            className="h-6 w-auto object-contain sm:h-8"
          />
        </a>

        {/* Primary Action Buttons */}
        <div className="flex shrink-0 items-center gap-[10px] sm:gap-[20px]">
          <a
            href="https://blog.hellominds.ai/ko/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 whitespace-nowrap px-[4px] py-[6px] text-sm font-normal text-[#161616] transition hover:text-slate-700 sm:px-[6px] sm:text-base"
          >
            {language === 'ko' ? '블로그' : 'Blog'}
          </a>
          <button
            className="inline-flex shrink-0 whitespace-nowrap px-[8px] py-[6px] text-sm font-medium text-[#3D7EED] transition hover:text-[#4EA5F1] sm:px-[12px] sm:text-base cursor-pointer"
          >
            {language === 'ko' ? '로그인' : 'Log in'}
          </button>
          <button
            type="button"
            data-cta-id="cta_try_app"
            data-cta-position="nav"
            className="flex shrink-0 items-center gap-[4px] whitespace-nowrap rounded-full btn-lit-blue px-[12px] py-[8px] text-sm font-medium text-white transition cursor-pointer sm:gap-[8px] sm:px-[16px] sm:py-[8px] sm:text-base"
          >
            <span>{language === 'ko' ? '시작하기' : 'Get Started'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
