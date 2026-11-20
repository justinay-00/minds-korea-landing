interface FooterProps {
  onOpenModal: () => void;
  language: 'en' | 'ko';
}

export default function Footer({ onOpenModal, language }: FooterProps) {
  return (
    <footer className="glass-card-v2 glass-static glass-accent-bottom relative z-10 border-t border-[color-mix(in_srgb,var(--line-strong-cool)_70%,transparent)] text-sm text-[var(--text-body-cool)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-[12px] sm:px-[40px] lg:px-[48px]">
        <a
          href="/"
          className="shrink-0 rounded-lg focus-visible:outline-[var(--blue-lit)]"
          style={{ padding: 'var(--logo-clear-m)' }}
        >
          <img
            src="/assets/aistudio/minds-logo-blue.svg"
            alt="Minds"
            className="h-auto w-[var(--logo-lockup-min)] max-w-none object-contain"
          />
        </a>

        <div className="flex min-w-0 flex-col items-end justify-center gap-1 py-[var(--logo-clear-m)] text-right sm:flex-row sm:items-center sm:gap-4 sm:text-left">
          <div className="flex flex-wrap items-center justify-end gap-x-3 text-xs text-[var(--text-muted-cool)] sm:justify-center">
            <a href="/privacy" className="transition-colors hover:text-[var(--text-body-cool)]">
              {language === 'ko' ? '개인정보 처리방침' : 'Privacy'}
            </a>
            <span className="text-[var(--line-strong-cool)]">·</span>
            <a href="/terms" className="transition-colors hover:text-[var(--text-body-cool)]">
              {language === 'ko' ? '이용약관' : 'Terms'}
            </a>
          </div>
          <button
            onClick={onOpenModal}
            className="cursor-pointer text-xs font-semibold text-[var(--blue-lit)] transition-colors hover:text-[var(--blue-tint)]"
          >
            {language === 'ko' ? '나만의 마인즈 (Minds) 만나기' : 'Meet your Minds assistant'}
          </button>
          <p className="truncate text-[10px] leading-tight text-[var(--text-label-cool)] sm:text-xs sm:leading-relaxed sm:text-[var(--text-muted-cool)]">
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
