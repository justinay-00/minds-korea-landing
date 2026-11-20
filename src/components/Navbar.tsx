import { useState, useEffect } from 'react';

interface NavbarProps {
  onOpenModal: () => void;
  language: 'en' | 'ko';
}

export default function Navbar({ onOpenModal, language }: NavbarProps) {
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
      className={`glass-card-v2 glass-static sticky top-0 z-50 transition-all duration-300 border-b shadow-[inset_0_2px_0_0_var(--orange)] ${
        scrolled ? 'border-[color-mix(in_srgb,var(--line-strong-cool)_90%,transparent)]' : 'border-[color-mix(in_srgb,var(--line-strong-cool)_50%,transparent)]'
      }`}
    >
      <div className="mx-auto flex h-[56px] max-w-5xl items-center justify-between gap-[8px] px-[12px] pb-[6px] pt-[2px] sm:gap-[24px] sm:px-[40px] lg:px-[48px]">
        {/* Brand Wordmark */}
        <a href="/" className="flex items-center shrink-0 focus-visible:outline-[var(--blue-lit)] rounded-lg">
          <img
            src="/assets/aistudio/minds-logo-blue.svg"
            alt="Minds by Animoca Brands"
            className="h-6 w-auto object-contain sm:h-8"
          />
        </a>

        {/* Primary Action Buttons */}
        <div className="flex shrink-0 items-center gap-[4px] sm:gap-[12px]">
          <button
            onClick={onOpenModal}
            className="inline-flex shrink-0 whitespace-nowrap px-[8px] py-[6px] text-sm font-medium text-[var(--blue-lit)] transition hover:text-[var(--blue-tint)] sm:px-[12px] sm:text-base cursor-pointer"
          >
            {language === 'ko' ? '로그인' : 'Log in'}
          </button>
          <button
            onClick={onOpenModal}
            className="flex shrink-0 items-center gap-[4px] whitespace-nowrap rounded-full btn-lit-orange-v2 px-[12px] py-[8px] text-sm font-medium text-white transition cursor-pointer sm:gap-[8px] sm:px-[16px] sm:py-[8px] sm:text-base"
          >
            <span>{language === 'ko' ? '시작하기' : 'Get Started'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
