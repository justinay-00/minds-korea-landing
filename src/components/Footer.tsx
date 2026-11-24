interface FooterProps {
  language: 'en' | 'ko';
}

export default function Footer({ language }: FooterProps) {
  return (
    <footer className="glass-card-v2 glass-static relative z-10 border-t border-slate-200/70 text-sm text-slate-700 shadow-[inset_0_-2px_0_0_#FF6B4A]">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-3 gap-y-2 px-[12px] py-3 sm:gap-x-4 sm:px-[40px] sm:py-4 lg:px-[48px]">
        <a href="/kr" className="shrink-0">
          <img
            src="/assets/aistudio/minds-logo-blue.svg"
            alt={language === 'ko' ? '애니모카 브랜즈의 Minds' : 'Minds by Animoca Brands'}
            className="h-6 w-auto object-contain sm:h-7"
          />
        </a>
        <p className="inline min-w-0 border-l border-slate-200 pl-2 text-[10px] leading-tight text-slate-400 sm:pl-3 sm:text-xs sm:leading-normal">
          Minds by{' '}
          <a
            href="https://www.animocabrands.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 transition-colors hover:text-slate-700"
          >
            Animoca Brands
          </a>
        </p>
        <div className="flex flex-wrap items-center gap-x-3 text-xs text-slate-500">
          <a href="/kr/privacy" className="transition-colors hover:text-slate-800">
            {language === 'ko' ? '개인정보 처리방침' : 'Privacy'}
          </a>
          <span className="text-slate-300">·</span>
          <a href="/kr/terms" className="transition-colors hover:text-slate-800">
            {language === 'ko' ? '이용약관' : 'Terms'}
          </a>
        </div>
        <p className="ml-auto text-[10px] leading-tight text-slate-400 sm:text-xs sm:leading-relaxed sm:text-slate-500">
          ©2026 Animoca Brands. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
