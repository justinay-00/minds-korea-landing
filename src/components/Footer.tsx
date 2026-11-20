interface FooterProps {
  onOpenModal: () => void;
  language: 'en' | 'ko';
}

export default function Footer({ onOpenModal, language }: FooterProps) {
  return (
    <footer className="glass-card-v2 glass-static relative z-10 border-t border-[color-mix(in_srgb,var(--line-strong-cool)_70%,transparent)] text-sm text-[var(--text-body-cool)] shadow-[inset_0_-2px_0_0_var(--orange)]">
      <div className="mx-auto flex h-[72px] max-w-5xl items-center justify-between gap-[8px] px-[12px] pb-[6px] pt-[2px] sm:h-auto sm:px-[40px] sm:py-4 lg:px-[48px]">
        <div className="flex shrink-0 items-center gap-3">
          <a href="/" className="shrink-0">
            <img
              src="/assets/aistudio/minds-logo-blue.svg"
              alt={language === 'ko' ? '애니모카 브랜즈의 Minds' : 'Minds by Animoca Brands'}
              className="h-6 w-auto object-contain sm:h-7"
            />
          </a>
          <a
            href="https://www.animocabrands.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden border-l border-[var(--line-strong-cool)] pl-3 text-xs text-[var(--text-label-cool)] transition-colors hover:text-[var(--text-body-cool)] sm:inline"
          >
            Minds by Animoca Brands
          </a>
        </div>

        <div className="flex min-w-0 flex-col items-end justify-center gap-1 text-right sm:flex-row sm:items-center sm:gap-4 sm:text-left">
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
            ©2026 Animoca Brands. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
