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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`nav-floating-v2 nav-home-v2 fixed top-0 right-0 left-0 z-50 ${
        scrolled ? '' : 'nav-rest-fill-v2'
      }`}
      aria-label={language === 'ko' ? '메인 메뉴' : 'Main'}
    >
      <div className={`nav-bar-v2 ${scrolled ? 'nav-bar-glass-v2' : ''}`}>
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-[8px] px-[12px] sm:gap-[24px] sm:px-[40px] lg:px-[48px]">
          <a href="/" className="flex shrink-0 items-center rounded-lg focus-visible:outline-[var(--blue-lit)]">
            <img
              src="/assets/aistudio/minds-logo-blue.svg"
              alt="Minds by Animoca Brands"
              className="h-6 w-auto object-contain sm:h-8"
            />
          </a>

          <div className="flex shrink-0 items-center gap-[4px] sm:gap-[12px]">
            <a
              href="https://blog.hellominds.ai/ko/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 whitespace-nowrap px-[8px] py-[6px] text-sm font-medium text-[var(--blue-lit)] transition hover:text-[var(--blue-tint)] sm:px-[12px] sm:text-base"
            >
              {language === 'ko' ? '블로그' : 'Blog'}
            </a>
            <button
              className="inline-flex shrink-0 cursor-pointer whitespace-nowrap px-[8px] py-[6px] text-sm font-medium text-[var(--blue-lit)] transition hover:text-[var(--blue-tint)] sm:px-[12px] sm:text-base"
            >
              {language === 'ko' ? '로그인' : 'Log in'}
            </button>
            <button
              type="button"
              data-cta-id="cta_try_app"
              data-cta-position="nav"
              className="flex shrink-0 cursor-pointer items-center gap-[4px] whitespace-nowrap rounded-full btn-lit-orange-v2 px-[12px] py-[8px] text-sm font-medium text-white transition sm:gap-[8px] sm:px-[16px] sm:py-[8px] sm:text-base"
            >
              <span>{language === 'ko' ? '시작하기' : 'Get Started'}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
