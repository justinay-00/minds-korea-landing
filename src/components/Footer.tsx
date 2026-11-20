interface FooterProps {
  language: 'en' | 'ko';
}

export default function Footer({ language }: FooterProps) {
  return (
    <footer className="glass-card-v2 glass-static relative z-10 border-t border-slate-200/70 text-sm text-slate-700 shadow-[inset_0_-2px_0_0_#FF6B4A]">
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
            className="hidden border-l border-slate-200 pl-3 text-xs text-slate-400 transition-colors hover:text-slate-700 sm:inline"
          >
            Minds by Animoca Brands
          </a>
        </div>

        <div className="flex min-w-0 flex-col items-end justify-center gap-1 text-right sm:flex-row sm:items-center sm:gap-4 sm:text-left">
          <div className="flex flex-wrap items-center justify-end gap-x-3 text-xs text-slate-500 sm:justify-center">
            <a href="/privacy" className="transition-colors hover:text-slate-800">
              {language === 'ko' ? '개인정보 처리방침' : 'Privacy'}
            </a>
            <span className="text-slate-300">·</span>
            <a href="/terms" className="transition-colors hover:text-slate-800">
              {language === 'ko' ? '이용약관' : 'Terms'}
            </a>
          </div>
          <button
            className="cursor-pointer text-xs font-semibold text-[#3D7EED] transition-colors hover:text-[#4EA5F1]"
          >
            {language === 'ko' ? '나만의 마인즈 (Minds) 만나기' : 'Meet your Minds assistant'}
          </button>
          <p className="truncate text-[10px] leading-tight text-slate-400 sm:text-xs sm:leading-relaxed sm:text-slate-500">
            ©2026 Animoca Brands. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
