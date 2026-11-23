interface FooterProps {
  language: 'en' | 'ko';
}

export default function Footer({ language }: FooterProps) {
  return (
    <footer className="glass-card-v2 glass-static relative z-10 border-t border-slate-200/70 text-sm text-slate-700 shadow-[inset_0_-2px_0_0_#FF6B4A]">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-[12px] py-3 sm:gap-3 sm:px-[40px] sm:py-4 lg:px-[48px]">
        <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
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
            className="inline border-l border-slate-200 pl-2 text-[10px] leading-tight text-slate-400 transition-colors hover:text-slate-700 sm:pl-3 sm:text-xs sm:leading-normal"
          >
            Minds by Animoca Brands
          </a>
        </div>

        <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-4 sm:gap-y-1">
          <div className="flex flex-wrap items-center gap-x-3 text-xs text-slate-500">
            <a href="/privacy" className="transition-colors hover:text-slate-800">
              {language === 'ko' ? '개인정보 처리방침' : 'Privacy'}
            </a>
            <span className="text-slate-300">·</span>
            <a href="/terms" className="transition-colors hover:text-slate-800">
              {language === 'ko' ? '이용약관' : 'Terms'}
            </a>
          </div>
          <p className="text-[10px] leading-tight text-slate-400 sm:text-xs sm:leading-relaxed sm:text-slate-500">
            ©2026 Animoca Brands. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
