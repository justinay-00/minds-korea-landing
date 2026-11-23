interface FooterProps {
  language: 'en' | 'ko';
}

export default function Footer({ language }: FooterProps) {
  return (
    <footer className="glass-card-v2 glass-static glass-accent-bottom relative z-10 border-t border-[color-mix(in_srgb,var(--line-strong-cool)_70%,transparent)] text-sm text-[var(--text-body-cool)]">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-[12px] py-3 sm:gap-3 sm:px-[40px] sm:py-4 lg:px-[48px]">
        <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
          <a
            href="/"
            className="shrink-0 rounded-lg focus-visible:outline-[var(--blue-lit)]"
          >
            <img
              src="/assets/aistudio/minds-logo-blue.svg"
              alt="Minds"
              className="h-auto w-[var(--logo-lockup-min)] max-w-none object-contain"
            />
          </a>
          <a
            href="https://www.animocabrands.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline border-l border-[color-mix(in_srgb,var(--line-strong-cool)_70%,transparent)] pl-2 text-[10px] leading-tight text-[var(--text-label-cool)] transition-colors hover:text-[var(--text-body-cool)] sm:pl-3 sm:text-xs sm:leading-normal"
          >
            Minds by Animoca Brands
          </a>
        </div>

        <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-4 sm:gap-y-1">
          <div className="flex flex-wrap items-center gap-x-3 text-xs text-[var(--text-muted-cool)]">
            <a href="/privacy" className="transition-colors hover:text-[var(--text-body-cool)]">
              {language === 'ko' ? '개인정보 처리방침' : 'Privacy'}
            </a>
            <span className="text-[var(--line-strong-cool)]">·</span>
            <a href="/terms" className="transition-colors hover:text-[var(--text-body-cool)]">
              {language === 'ko' ? '이용약관' : 'Terms'}
            </a>
          </div>
          <p className="text-[10px] leading-tight text-[var(--text-label-cool)] sm:text-xs sm:leading-relaxed sm:text-[var(--text-muted-cool)]">
            ©2026{' '}
            <a
              href="https://www.animocabrands.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[var(--text-body-cool)]"
            >
              Animoca Brands
            </a>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
