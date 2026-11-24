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
    <a href="/kr" className="inline-flex shrink-0 items-end self-end">
      <img
        src="/assets/aistudio/minds-logo-blue.svg"
        alt={language === 'ko' ? '애니모카 브랜즈의 Minds' : 'Minds by Animoca Brands'}
        width="811"
        height="384"
        className="block h-7 w-auto object-contain object-bottom md:h-8"
      />
    </a>
  );

  const copyright = (
    <p className="self-end text-xs leading-none text-slate-500 md:text-[10px] md:leading-none md:text-slate-400">
      © 2026 Animoca Brands All Rights Reserved
    </p>
  );

  return (
    <footer className="glass-card-v2 glass-static relative z-10 border-t border-slate-200/70 text-sm text-slate-700 shadow-[inset_0_-2px_0_0_#FF6B4A]">
      {/* Mobile: credit+legal one row → logo+© bottom-aligned */}
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-[16px] py-4 md:hidden">
        <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5">
          {credit}
          <span className="text-slate-300" aria-hidden="true">
            ·
          </span>
          {legal}
        </div>
        <div className="flex flex-wrap items-end gap-x-3 gap-y-2">
          {logo}
          {copyright}
        </div>
      </div>

      {/* Desktop: one row — logo + credit + legal + © (logo/© bottoms aligned via items-end) */}
      <div className="mx-auto hidden max-w-5xl flex-wrap items-end gap-x-4 gap-y-2 px-[40px] py-4 md:flex lg:px-[48px]">
        {logo}
        {credit}
        {legal}
        <div className="ml-auto flex items-end self-end">{copyright}</div>
      </div>
    </footer>
  );
}
