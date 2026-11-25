interface FooterProps {
  language: 'en' | 'ko';
}

export default function Footer({ language }: FooterProps) {
  const credit = (
    <p className="inline min-w-0 text-xs leading-snug text-slate-500 md:border-l md:border-slate-200 md:pl-3 md:leading-normal md:text-slate-400">
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
  );

  const legal = (
    <div className="flex flex-wrap items-center gap-x-2.5 text-xs font-medium text-slate-600 md:gap-x-3 md:text-xs md:font-normal md:text-slate-500">
      <a href="/kr/privacy" className="transition-colors hover:text-slate-800">
        {language === 'ko' ? '개인정보 처리방침' : 'Privacy'}
      </a>
      <span className="text-slate-300">·</span>
      <a href="/kr/terms" className="transition-colors hover:text-slate-800">
        {language === 'ko' ? '이용약관' : 'Terms'}
      </a>
    </div>
  );

  const logo = (
    <a href="/kr" className="inline-flex shrink-0 items-center">
      <img
        src="/assets/aistudio/minds-logo-blue.svg"
        alt={language === 'ko' ? '애니모카 브랜즈의 Minds' : 'Minds by Animoca Brands'}
        width="811"
        height="384"
        className="block h-7 w-auto object-contain md:h-9"
      />
    </a>
  );

  const copyright = (
    <p className="text-right text-xs leading-none text-slate-500 md:text-[11px] md:text-slate-400">
      © 2026 Animoca Brands All Rights Reserved
    </p>
  );

  return (
    <footer className="glass-card-v2 glass-static relative z-10 border-t border-slate-200/70 text-sm text-slate-700 shadow-[inset_0_-2px_0_0_#FF6B4A]">
      {/* Mobile: match header px; credit left + legal right; logo left + © right, vertically centered */}
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-[12px] py-3 sm:px-[40px] lg:px-[48px] md:hidden">
        <div className="flex w-full min-w-0 items-center justify-between gap-3">
          <div className="min-w-0 shrink">{credit}</div>
          <div className="shrink-0 text-right">{legal}</div>
        </div>
        <div className="flex w-full flex-wrap items-center justify-between gap-x-3 gap-y-2">
          {logo}
          {copyright}
        </div>
      </div>

      {/* Desktop: one row — logo + credit + legal + ©; same horizontal padding as header */}
      <div className="mx-auto hidden max-w-5xl flex-wrap items-center gap-x-4 gap-y-2 px-[12px] py-4 sm:px-[40px] md:flex lg:px-[48px]">
        {logo}
        {credit}
        {legal}
        <div className="ml-auto flex items-center">{copyright}</div>
      </div>
    </footer>
  );
}
